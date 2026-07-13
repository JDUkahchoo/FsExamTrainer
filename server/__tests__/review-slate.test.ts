import { test } from "node:test";
import assert from "node:assert/strict";
import { getLocalWeekStart, computeWeeklyReviewSlate } from "../storage";

const DAY_MS = 24 * 60 * 60 * 1000;

// Format an instant in a given IANA timezone into easy-to-assert parts.
function partsInTz(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const out: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) {
    if (p.type !== "literal") out[p.type] = p.value;
  }
  // Intl can emit "24" for midnight; normalize to "00".
  if (out.hour === "24") out.hour = "00";
  return out;
}

// Assert a getLocalWeekStart result is Monday 00:00:00 local and lands in the
// correct week relative to `now` (start of week, never in the future, < 7 days back).
function assertMondayMidnight(weekStart: Date, now: Date, tz: string, label: string) {
  const p = partsInTz(weekStart, tz);
  assert.equal(p.weekday, "Mon", `${label}: expected Monday local, got ${p.weekday} (${weekStart.toISOString()})`);
  assert.equal(p.hour, "00", `${label}: expected 00 hour local, got ${p.hour}`);
  assert.equal(p.minute, "00", `${label}: expected 00 minute local, got ${p.minute}`);
  assert.equal(p.second, "00", `${label}: expected 00 second local, got ${p.second}`);

  const delta = now.getTime() - weekStart.getTime();
  assert.ok(delta >= 0, `${label}: week start must not be after now`);
  assert.ok(delta < 7 * DAY_MS, `${label}: week start must be within 7 days of now (got ${delta / DAY_MS}d)`);
}

// ---------------------------------------------------------------------------
// getLocalWeekStart — timezone coverage
// ---------------------------------------------------------------------------

test("getLocalWeekStart returns Monday 00:00 local across many timezones", () => {
  const timezones = [
    "America/Chicago",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Berlin",
    "Asia/Kolkata", // UTC+5:30
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Kiritimati", // UTC+14
    "Pacific/Pago_Pago", // UTC-11
    "UTC",
  ];
  // A spread of arbitrary "now" instants throughout a week.
  const nows = [
    new Date("2026-06-29T00:00:00Z"), // Monday
    new Date("2026-06-30T12:34:56Z"), // Tuesday
    new Date("2026-07-04T18:00:00Z"), // Saturday
    new Date("2026-07-05T23:30:00Z"), // Sunday
    new Date("2026-01-15T09:00:00Z"),
    new Date("2026-12-31T22:00:00Z"),
  ];
  for (const tz of timezones) {
    for (const now of nows) {
      const ws = getLocalWeekStart(tz, now);
      assertMondayMidnight(ws, now, tz, `${tz} @ ${now.toISOString()}`);
    }
  }
});

// ---------------------------------------------------------------------------
// getLocalWeekStart — DST transitions
// ---------------------------------------------------------------------------

test("getLocalWeekStart is DST-safe when the week spans a US spring-forward", () => {
  // US DST begins Sunday 2026-03-08. That Sunday is the LAST day of the week
  // starting Monday 2026-03-02 (which is still CST/-6), while `now` is CDT/-5.
  const tz = "America/Chicago";
  const now = new Date("2026-03-08T18:00:00Z"); // Sunday afternoon, CDT
  const ws = getLocalWeekStart(tz, now);
  assertMondayMidnight(ws, now, tz, "US spring-forward");
  const p = partsInTz(ws, tz);
  assert.equal(`${p.year}-${p.month}-${p.day}`, "2026-03-02", "should resolve to Mon 2026-03-02 local");
});

test("getLocalWeekStart is DST-safe when the week spans a US fall-back", () => {
  // US DST ends Sunday 2026-11-01. That Sunday closes the week starting
  // Monday 2026-10-26 (CDT/-5), while `now` on that Sunday is CST/-6.
  const tz = "America/Chicago";
  const now = new Date("2026-11-01T17:00:00Z"); // Sunday, CST
  const ws = getLocalWeekStart(tz, now);
  assertMondayMidnight(ws, now, tz, "US fall-back");
  const p = partsInTz(ws, tz);
  assert.equal(`${p.year}-${p.month}-${p.day}`, "2026-10-26", "should resolve to Mon 2026-10-26 local");
});

test("getLocalWeekStart is DST-safe for southern-hemisphere transitions", () => {
  // Australia/Sydney DST ends Sunday 2026-04-05 and begins Sunday 2026-10-04.
  const tz = "Australia/Sydney";
  for (const iso of ["2026-04-05T02:00:00Z", "2026-10-04T02:00:00Z"]) {
    const now = new Date(iso);
    const ws = getLocalWeekStart(tz, now);
    assertMondayMidnight(ws, now, tz, `Sydney DST @ ${iso}`);
  }
});

// ---------------------------------------------------------------------------
// getLocalWeekStart — Sunday-night -> Monday-morning rollover
// ---------------------------------------------------------------------------

test("getLocalWeekStart rolls the week over at the Sunday->Monday boundary", () => {
  const tz = "America/Chicago"; // June => CDT (UTC-5)
  // Sunday 2026-06-28 23:59 local == 2026-06-29T04:59:00Z
  const sundayNight = new Date("2026-06-29T04:59:00Z");
  // Monday 2026-06-29 00:01 local == 2026-06-29T05:01:00Z
  const mondayMorning = new Date("2026-06-29T05:01:00Z");

  // Sanity-check the chosen instants actually straddle midnight Sun->Mon.
  assert.equal(partsInTz(sundayNight, tz).weekday, "Sun", "fixture should be Sunday local");
  assert.equal(partsInTz(mondayMorning, tz).weekday, "Mon", "fixture should be Monday local");

  const wsSun = getLocalWeekStart(tz, sundayNight);
  const wsMon = getLocalWeekStart(tz, mondayMorning);

  // Sunday night still belongs to the PRIOR week (Mon 2026-06-22).
  assert.equal(`${(() => { const p = partsInTz(wsSun, tz); return `${p.year}-${p.month}-${p.day}`; })()}`,
    "2026-06-22", "Sunday night -> week starting Mon 2026-06-22");
  // One minute later (Monday) flips to the new week (Mon 2026-06-29).
  assert.equal(`${(() => { const p = partsInTz(wsMon, tz); return `${p.year}-${p.month}-${p.day}`; })()}`,
    "2026-06-29", "Monday morning -> week starting Mon 2026-06-29");

  // The two week starts are exactly 7 days apart.
  assert.equal(wsMon.getTime() - wsSun.getTime(), 7 * DAY_MS, "week starts are 7 days apart");
  assert.ok(wsMon.getTime() > wsSun.getTime(), "new week start is later");
});

// ---------------------------------------------------------------------------
// computeWeeklyReviewSlate — fresh-slate filtering math
// ---------------------------------------------------------------------------

// Build a minimal review row; only nextReviewAt / lastReviewedAt are read.
function row(id: string, nextReviewAt: Date, lastReviewedAt: Date): any {
  return { id, itemId: id, nextReviewAt, lastReviewedAt };
}

test("computeWeeklyReviewSlate excludes items due before this week", () => {
  const weekStart = new Date("2026-06-29T05:00:00Z"); // Mon 00:00 CDT
  const now = new Date("2026-07-01T15:00:00Z"); // Wed
  const lastWeek = new Date("2026-06-25T12:00:00Z"); // due before weekStart

  const rows = [row("a", lastWeek, lastWeek)];
  const slate = computeWeeklyReviewSlate(rows, weekStart, now);

  assert.equal(slate.items.length, 0, "items due before the week are cleared from the slate");
  assert.equal(slate.remaining, 0);
});

test("computeWeeklyReviewSlate includes items due during this week", () => {
  const weekStart = new Date("2026-06-29T05:00:00Z");
  const now = new Date("2026-07-01T15:00:00Z");
  const thisWeek = new Date("2026-06-30T09:00:00Z"); // between weekStart and now

  const rows = [row("a", thisWeek, new Date("2026-06-20T00:00:00Z"))];
  const slate = computeWeeklyReviewSlate(rows, weekStart, now);

  assert.equal(slate.items.length, 1, "item due this week is on the slate");
  assert.equal(slate.items[0].id, "a");
  assert.equal(slate.remaining, 1);
});

test("computeWeeklyReviewSlate excludes items due in the future", () => {
  const weekStart = new Date("2026-06-29T05:00:00Z");
  const now = new Date("2026-07-01T15:00:00Z");
  const future = new Date("2026-07-05T00:00:00Z"); // after now

  const rows = [row("a", future, new Date("2026-06-30T00:00:00Z"))];
  const slate = computeWeeklyReviewSlate(rows, weekStart, now);

  assert.equal(slate.items.length, 0, "not-yet-due items are excluded from items");
});

test("computeWeeklyReviewSlate counts items refreshed this week as done", () => {
  const weekStart = new Date("2026-06-29T05:00:00Z");
  const now = new Date("2026-07-01T15:00:00Z");

  const rows = [
    // Reviewed this week + scheduled ahead -> done.
    row("done1", new Date("2026-07-08T00:00:00Z"), new Date("2026-06-30T10:00:00Z")),
    // Reviewed last week -> not done.
    row("old", new Date("2026-07-09T00:00:00Z"), new Date("2026-06-24T10:00:00Z")),
    // Due this week, not yet reviewed -> remaining (not done).
    row("todo", new Date("2026-06-30T08:00:00Z"), new Date("2026-06-10T10:00:00Z")),
  ];
  const slate = computeWeeklyReviewSlate(rows, weekStart, now);

  assert.equal(slate.done, 1, "only the item refreshed this week counts as done");
  assert.equal(slate.remaining, 1, "one item still due this week");
  assert.equal(slate.target, 2, "target = remaining + done");
});

test("computeWeeklyReviewSlate target equals remaining + done", () => {
  const weekStart = new Date("2026-06-29T05:00:00Z");
  const now = new Date("2026-07-02T15:00:00Z");

  const rows = [
    row("r1", new Date("2026-06-29T06:00:00Z"), new Date("2026-06-01T00:00:00Z")), // remaining
    row("r2", new Date("2026-06-30T06:00:00Z"), new Date("2026-06-01T00:00:00Z")), // remaining
    row("d1", new Date("2026-07-09T00:00:00Z"), new Date("2026-06-29T12:00:00Z")), // done
    row("d2", new Date("2026-07-10T00:00:00Z"), new Date("2026-07-01T12:00:00Z")), // done
  ];
  const slate = computeWeeklyReviewSlate(rows, weekStart, now);

  assert.equal(slate.remaining, 2);
  assert.equal(slate.done, 2);
  assert.equal(slate.target, slate.remaining + slate.done);
  assert.equal(slate.target, 4);
});

test("computeWeeklyReviewSlate sorts items by soonest due first", () => {
  const weekStart = new Date("2026-06-29T05:00:00Z");
  const now = new Date("2026-07-02T15:00:00Z");

  const rows = [
    row("late", new Date("2026-07-01T00:00:00Z"), new Date("2026-06-01T00:00:00Z")),
    row("early", new Date("2026-06-29T06:00:00Z"), new Date("2026-06-01T00:00:00Z")),
    row("mid", new Date("2026-06-30T12:00:00Z"), new Date("2026-06-01T00:00:00Z")),
  ];
  const slate = computeWeeklyReviewSlate(rows, weekStart, now);

  assert.deepEqual(slate.items.map((i) => i.id), ["early", "mid", "late"]);
});

test("computeWeeklyReviewSlate treats the week-start boundary as inclusive", () => {
  const weekStart = new Date("2026-06-29T05:00:00Z");
  const now = new Date("2026-07-02T15:00:00Z");

  // Due exactly at weekStart -> included this week (not cleared).
  const rows = [row("boundary", new Date(weekStart.getTime()), new Date("2026-06-01T00:00:00Z"))];
  const slate = computeWeeklyReviewSlate(rows, weekStart, now);

  assert.equal(slate.items.length, 1, "item due exactly at week start is included");
});
