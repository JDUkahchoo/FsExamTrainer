import { db } from './db';
import { readingProgress } from '@shared/schema';
import { and, eq, sql } from 'drizzle-orm';
import { log } from './vite';

/**
 * One-time migration to:
 * 1. Deduplicate interactive reading_progress rows that share the same
 *    (userId, week, examTrack, readingId) — keeping the most progressed row.
 * 2. Create a partial unique index enforcing this uniqueness going forward.
 *
 * Safe to run multiple times (idempotent). Throws on failure so the caller
 * can decide how to handle the error.
 */
export async function migrateReadingProgressUnique(): Promise<void> {
  // Step 1: Find and resolve duplicate (userId, week, examTrack, readingId) groups
  // where readingId IS NOT NULL.
  const duplicates = await db.execute(sql`
    SELECT user_id, week, exam_track, reading_id, COUNT(*) AS cnt
    FROM reading_progress
    WHERE reading_id IS NOT NULL
    GROUP BY user_id, week, exam_track, reading_id
    HAVING COUNT(*) > 1
  `);

  let deduped = 0;
  for (const dup of duplicates.rows as Array<{
    user_id: string;
    week: number;
    exam_track: string;
    reading_id: string;
  }>) {
    const rows = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, dup.user_id),
          eq(readingProgress.week, Number(dup.week)),
          eq(readingProgress.examTrack, dup.exam_track),
          eq(readingProgress.readingId, dup.reading_id)
        )
      )
      .orderBy(readingProgress.updatedAt);

    if (rows.length <= 1) continue;

    // Pick the "winner": prefer completed rows; among equals, take the most recently updated.
    // Because winner is always chosen from the completed set when any completed row exists,
    // no separate merge step is needed — the winner already carries completion data.
    const completed = rows.filter((r) => r.completed);
    const winner = completed.length > 0
      ? completed.reduce((a, b) => (a.updatedAt >= b.updatedAt ? a : b))
      : rows.reduce((a, b) => (a.updatedAt >= b.updatedAt ? a : b));

    // Delete all losers.
    const loserIds = rows.filter((r) => r.id !== winner.id).map((r) => r.id);
    for (const loserId of loserIds) {
      await db.delete(readingProgress).where(eq(readingProgress.id, loserId));
      deduped++;
    }
  }

  if (deduped > 0) {
    log(`Reading progress dedup: removed ${deduped} duplicate interactive reading row(s)`);
  }

  // Step 2: Create the partial unique index if it doesn't already exist.
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS reading_progress_unique_reading_id_idx
    ON reading_progress (user_id, week, exam_track, reading_id)
    WHERE reading_id IS NOT NULL
  `);

  log('Reading progress unique index ensured.');
}
