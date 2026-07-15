import { test } from "node:test";
import assert from "node:assert/strict";
import { storage } from "../storage";
import { db } from "../db";
import { weekMemoryHealth, weekProgress } from "../../shared/schema";
import { and, eq } from "drizzle-orm";
import { domainSetKey, computeWeekKeys, sameDomainSet } from "../../shared/lib/weekKey";

// When the study plan resizes (exam date moves), topics shift to different week
// numbers. Progress and completion records now carry a stable domainKey so they
// follow their CONTENT instead of staying glued to a week number.

test("domainSetKey is order-independent and handles the empty set", () => {
  assert.equal(domainSetKey(["B", "A"]), domainSetKey(["A", "B"]));
  assert.equal(domainSetKey([]), "~generic");
  assert.equal(domainSetKey(["  A ", ""]), "A");
});

test("computeWeekKeys numbers repeated domain sets by occurrence in week order", () => {
  const keys = computeWeekKeys([
    { week: 3, domains: ["Boundary Law"] },
    { week: 1, domains: ["Geodesy"] },
    { week: 8, domains: ["Boundary Law"] },
  ]);
  assert.equal(keys.get(1), "Geodesy#1");
  assert.equal(keys.get(3), "Boundary Law#1");
  assert.equal(keys.get(8), "Boundary Law#2");
});

test("sameDomainSet compares as sets", () => {
  assert.ok(sameDomainSet(["A", "B"], ["B", "A"]));
  assert.ok(!sameDomainSet(["A"], ["A", "B"]));
});

const TEST_USER_ID = "test-week-rekey-user";
const TRACK = "fs";

async function cleanUp() {
  await db.delete(weekMemoryHealth).where(eq(weekMemoryHealth.userId, TEST_USER_ID));
  await db.delete(weekProgress).where(eq(weekProgress.userId, TEST_USER_ID));
}

test("completion record follows its content when the plan resizes (keyed match)", async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "week-rekey@test.local" });
  await cleanUp();

  const key = "Geodesy#1";
  const first = await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 5, ["Geodesy"], key);
  assert.equal(first.weekNumber, 5);
  assert.equal(first.domainKey, key);

  // Plan resized: Geodesy now lives at week 7. Same key, new week number.
  const moved = await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 7, ["Geodesy"], key);
  assert.equal(moved.id, first.id, "must update the same record, not create a duplicate");
  assert.equal(moved.weekNumber, 7);

  const all = await storage.getWeekMemoryHealth(TEST_USER_ID, TRACK);
  assert.equal(all.length, 1);
  await cleanUp();
});

test("legacy (un-keyed) record with matching domains is stamped and moved, keeping history", async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "week-rekey@test.local" });
  await cleanUp();

  // Legacy record created before domain keys existed, with review history.
  const legacy = await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 4, ["Boundary Law"]);
  await storage.recordWeekReview(TEST_USER_ID, TRACK, 4);

  // Plan resized: Boundary Law now sits at week 6; client re-stamps with a key.
  const stamped = await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 6, ["Boundary Law"], "Boundary Law#1");
  assert.equal(stamped.id, legacy.id, "legacy record must be reused, not duplicated");
  assert.equal(stamped.weekNumber, 6);
  assert.equal(stamped.domainKey, "Boundary Law#1");
  assert.equal(stamped.reviewCount, 1, "review history must be preserved");
  await cleanUp();
});

test("a week number vacated by moved content accepts a fresh completion for its new content", async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "week-rekey@test.local" });
  await cleanUp();

  const a = await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 5, ["Geodesy"], "Geodesy#1");
  // New content (different domains) completed at week 5 gets its own record.
  const b = await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 5, ["Photogrammetry"], "Photogrammetry#1");
  assert.notEqual(a.id, b.id);

  const all = await storage.getWeekMemoryHealth(TEST_USER_ID, TRACK);
  assert.equal(all.length, 2);
  await cleanUp();
});

test("week review and delete target the record by domainKey", async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "week-rekey@test.local" });
  await cleanUp();

  await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 3, ["Geodesy"], "Geodesy#1");
  // Review addressed by key even with a stale week number from the client.
  const reviewed = await storage.recordWeekReview(TEST_USER_ID, TRACK, 99, "Geodesy#1");
  assert.equal(reviewed.reviewCount, 1);

  await storage.deleteWeekCompletion(TEST_USER_ID, TRACK, 99, "Geodesy#1");
  const all = await storage.getWeekMemoryHealth(TEST_USER_ID, TRACK);
  assert.equal(all.length, 0);
  await cleanUp();
});

test("content-aware restart only resets the targeted content, not week-number neighbors", async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "week-rekey@test.local" });
  await cleanUp();

  // Two records transiently share week 5 after a resize.
  await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 5, ["Geodesy"], "Geodesy#1");
  await storage.upsertWeekCompletion(TEST_USER_ID, TRACK, 5, ["Photogrammetry"], "Photogrammetry#1");
  await storage.upsertWeekProgress({
    userId: TEST_USER_ID, week: 5, examTrack: TRACK, domainKey: "Geodesy#1",
    readCompleted: ["0"], focusCompleted: [], applyCompleted: [], reinforceCompleted: [],
  });
  await storage.upsertWeekProgress({
    userId: TEST_USER_ID, week: 5, examTrack: TRACK, domainKey: "Photogrammetry#1",
    readCompleted: ["0"], focusCompleted: ["1"], applyCompleted: [], reinforceCompleted: [],
  });

  await storage.resetWeekProgress(TEST_USER_ID, 5, TRACK, "Geodesy#1");

  const health = await storage.getWeekMemoryHealth(TEST_USER_ID, TRACK);
  assert.equal(health.length, 1, "only the targeted completion is deleted");
  assert.equal(health[0].domainKey, "Photogrammetry#1");

  const rows = await db.select().from(weekProgress).where(
    and(eq(weekProgress.userId, TEST_USER_ID), eq(weekProgress.examTrack, TRACK))
  );
  const geo = rows.find(r => r.domainKey === "Geodesy#1");
  const photo = rows.find(r => r.domainKey === "Photogrammetry#1");
  assert.deepEqual(geo?.readCompleted, [], "targeted content is cleared");
  assert.deepEqual(photo?.readCompleted, ["0"], "other content at the same week is untouched");
  assert.deepEqual(photo?.focusCompleted, ["1"]);
  await cleanUp();
});

test("week progress follows its domainKey across a resize", async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "week-rekey@test.local" });
  await cleanUp();

  const first = await storage.upsertWeekProgress({
    userId: TEST_USER_ID, week: 5, examTrack: TRACK, domainKey: "Geodesy#1",
    readCompleted: ["0"], focusCompleted: [], applyCompleted: [], reinforceCompleted: [],
  });

  // Same content saved at its new position after a resize.
  const moved = await storage.upsertWeekProgress({
    userId: TEST_USER_ID, week: 7, examTrack: TRACK, domainKey: "Geodesy#1",
    readCompleted: ["0", "1"], focusCompleted: [], applyCompleted: [], reinforceCompleted: [],
  });
  assert.equal(moved.id, first.id, "keyed progress row must move, not duplicate");
  assert.equal(moved.week, 7);
  assert.deepEqual(moved.readCompleted, ["0", "1"]);

  // Different content saved at week 7 must NOT hijack the keyed row.
  const other = await storage.upsertWeekProgress({
    userId: TEST_USER_ID, week: 7, examTrack: TRACK, domainKey: "Photogrammetry#1",
    readCompleted: [], focusCompleted: ["2"], applyCompleted: [], reinforceCompleted: [],
  });
  assert.notEqual(other.id, moved.id);

  const rows = await db.select().from(weekProgress).where(
    and(eq(weekProgress.userId, TEST_USER_ID), eq(weekProgress.examTrack, TRACK))
  );
  assert.equal(rows.length, 2);
  await cleanUp();
});
