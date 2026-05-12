import { db } from './db';
import { readingProgress } from '@shared/schema';
import { and, eq, isNull, gte, inArray } from 'drizzle-orm';
import { STUDY_PLAN, PS_STUDY_PLAN } from '@shared/data/studyPlan';
import { FS_WEEK_TO_READING_IDS, PS_WEEK_TO_READING_IDS } from '@shared/lib/week-reading-map';
import { log } from './vite';

function buildChapterLengthMap(
  plan: Array<{ week: number; read: string[] }>
): Record<number, number> {
  const map: Record<number, number> = {};
  for (const week of plan) {
    map[week.week] = week.read.length;
  }
  return map;
}

export async function backfillInteractiveReadingIds(): Promise<void> {
  const fsChapters = buildChapterLengthMap(STUDY_PLAN);
  const psChapters = buildChapterLengthMap(PS_STUDY_PLAN);

  const legacyRows = await db
    .select()
    .from(readingProgress)
    .where(
      and(
        isNull(readingProgress.readingId),
        gte(readingProgress.chapterIndex, 0)
      )
    );

  if (legacyRows.length === 0) {
    return;
  }

  let updated = 0;
  let merged = 0;
  let skipped = 0;

  for (const row of legacyRows) {
    const track = row.examTrack || 'fs';
    const chaptersLength = track === 'ps'
      ? (psChapters[row.week] ?? 0)
      : (fsChapters[row.week] ?? 0);

    if (row.chapterIndex < chaptersLength) {
      skipped++;
      continue;
    }

    const readingIds = track === 'ps'
      ? (PS_WEEK_TO_READING_IDS[row.week] || [])
      : (FS_WEEK_TO_READING_IDS[row.week] || []);

    const readingIndex = row.chapterIndex - chaptersLength;
    const readingId = readingIds[readingIndex];

    if (!readingId) {
      skipped++;
      continue;
    }

    const existingNew = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, row.userId),
          eq(readingProgress.week, row.week),
          eq(readingProgress.examTrack, track),
          eq(readingProgress.readingId, readingId)
        )
      )
      .limit(1);

    if (existingNew.length > 0) {
      const newRow = existingNew[0];
      if (row.completed && !newRow.completed) {
        await db
          .update(readingProgress)
          .set({
            completed: true,
            completedAt: row.completedAt ?? newRow.completedAt ?? new Date(),
            updatedAt: new Date(),
          })
          .where(eq(readingProgress.id, newRow.id));
      }
      await db
        .delete(readingProgress)
        .where(eq(readingProgress.id, row.id));
      merged++;
    } else {
      await db
        .update(readingProgress)
        .set({ readingId, chapterIndex: -1 })
        .where(eq(readingProgress.id, row.id));
      updated++;
    }
  }

  if (updated > 0 || merged > 0 || skipped > 0) {
    log(`Reading ID migration: ${updated} rows backfilled, ${merged} legacy rows merged into new rows, ${skipped} rows skipped`);
  }
}

/**
 * Delete reading_progress rows that cannot be matched to any known chapter
 * or interactive reading for their (week, examTrack). These are truly
 * orphaned legacy rows: readingId IS NULL and chapterIndex is beyond the
 * combined length of the chapter list and the interactive reading list for
 * that week. They don't correspond to any visible item in the UI and would
 * otherwise inflate completion counts.
 */
export async function cleanupOrphanedReadingProgress(): Promise<void> {
  const fsChapters = buildChapterLengthMap(STUDY_PLAN);
  const psChapters = buildChapterLengthMap(PS_STUDY_PLAN);

  const candidates = await db
    .select()
    .from(readingProgress)
    .where(
      and(
        isNull(readingProgress.readingId),
        gte(readingProgress.chapterIndex, 0)
      )
    );

  if (candidates.length === 0) {
    return;
  }

  const orphanIds: string[] = [];

  for (const row of candidates) {
    const track = row.examTrack || 'fs';
    const chaptersLength = track === 'ps'
      ? (psChapters[row.week] ?? 0)
      : (fsChapters[row.week] ?? 0);
    const readingIds = track === 'ps'
      ? (PS_WEEK_TO_READING_IDS[row.week] || [])
      : (FS_WEEK_TO_READING_IDS[row.week] || []);

    const totalKnown = chaptersLength + readingIds.length;

    if (row.chapterIndex >= totalKnown) {
      orphanIds.push(row.id);
    }
  }

  if (orphanIds.length === 0) {
    return;
  }

  const BATCH_SIZE = 500;
  let deleted = 0;
  for (let i = 0; i < orphanIds.length; i += BATCH_SIZE) {
    const batch = orphanIds.slice(i, i + BATCH_SIZE);
    await db
      .delete(readingProgress)
      .where(inArray(readingProgress.id, batch));
    deleted += batch.length;
  }

  log(`Reading progress cleanup: ${deleted} orphaned rows deleted (no matching chapter or interactive reading)`);
}
