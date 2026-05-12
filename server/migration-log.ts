import { db } from './db';
import { migrationLog } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';
import { log } from './vite';

let tableEnsured = false;

async function ensureMigrationLogTable(): Promise<void> {
  if (tableEnsured) return;
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS migration_log (
      name varchar PRIMARY KEY,
      executed_at timestamp NOT NULL DEFAULT now()
    )
  `);
  tableEnsured = true;
}

export async function hasMigrationRun(name: string): Promise<boolean> {
  await ensureMigrationLogTable();
  const rows = await db
    .select()
    .from(migrationLog)
    .where(eq(migrationLog.name, name))
    .limit(1);
  return rows.length > 0;
}

export async function markMigrationRun(name: string): Promise<void> {
  await ensureMigrationLogTable();
  await db
    .insert(migrationLog)
    .values({ name })
    .onConflictDoNothing({ target: migrationLog.name });
}

// Hash a string into a stable 32-bit signed integer for pg_advisory_lock.
function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (Math.imul(31, h) + name.charCodeAt(i)) | 0;
  }
  return h;
}

/**
 * Run `fn` at most once per database, identified by `name`.
 *
 * Uses a postgres advisory lock keyed on the migration name so that if
 * multiple app instances start at the same time, only one will execute
 * the migration body — the others will wait, then see the recorded entry
 * and skip.
 */
export async function runOnce(
  name: string,
  fn: () => Promise<void>
): Promise<void> {
  if (await hasMigrationRun(name)) {
    return;
  }

  const lockKey = hashName(name);
  await db.execute(sql`SELECT pg_advisory_lock(${lockKey})`);
  try {
    // Re-check inside the lock: another instance may have just finished it.
    if (await hasMigrationRun(name)) {
      return;
    }
    await fn();
    await markMigrationRun(name);
    log(`Migration "${name}" completed and recorded.`);
  } finally {
    await db.execute(sql`SELECT pg_advisory_unlock(${lockKey})`);
  }
}
