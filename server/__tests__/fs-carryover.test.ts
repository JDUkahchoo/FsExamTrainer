import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FS_TO_PS_DOMAIN_MAP,
  hasFsHistory,
  computeFsCarryoverScores,
  type FsDomainMasteryLike,
} from '../../shared/lib/fsCarryover';

function row(
  domainNumber: number,
  currentScore: number,
  questionsAnswered = 0,
  lessonsCompleted = 0,
  overallProgress = 0
): FsDomainMasteryLike {
  return { domainNumber, currentScore, questionsAnswered, lessonsCompleted, overallProgress };
}

test('hasFsHistory is false for a fresh user with no activity', () => {
  const fresh = [row(1, 50), row(2, 50), row(3, 50)];
  assert.equal(hasFsHistory(fresh), false);
});

test('hasFsHistory is true when any domain shows activity', () => {
  assert.equal(hasFsHistory([row(1, 50), row(3, 70, 12)]), true);
  assert.equal(hasFsHistory([row(1, 50, 0, 2)]), true);
  assert.equal(hasFsHistory([row(1, 50, 0, 0, 10)]), true);
});

test('computeFsCarryoverScores averages only active mapped FS domains', () => {
  // PS 1 ← FS [3, 6]; FS 3 active at 40, FS 6 active at 80 → 60
  const mastery = [row(3, 40, 10), row(6, 80, 10)];
  const scores = computeFsCarryoverScores(mastery);
  assert.equal(scores[1], 60);
  // PS 4 ← FS [6] → 80
  assert.equal(scores[4], 80);
});

test('computeFsCarryoverScores omits PS domains with no active FS data', () => {
  // Only FS 6 active: PS 1 (←3,6) uses just 6; PS 3 (←2,4) and PS 5 (←1,2,3) omitted
  const mastery = [row(6, 70, 5), row(2, 90), row(4, 90)];
  const scores = computeFsCarryoverScores(mastery);
  assert.equal(scores[1], 70);
  assert.equal(scores[4], 70);
  assert.equal(scores[3], undefined);
  assert.equal(scores[5], undefined);
});

test('computeFsCarryoverScores returns empty object with no activity at all', () => {
  const scores = computeFsCarryoverScores([row(1, 50), row(2, 50)]);
  assert.deepEqual(scores, {});
});

test('computeFsCarryoverScores clamps and rounds to 0-100 integers', () => {
  const mastery = [row(3, 33.4, 1), row(6, 66.7, 1)];
  const scores = computeFsCarryoverScores(mastery);
  for (const v of Object.values(scores)) {
    assert.ok(Number.isInteger(v));
    assert.ok(v >= 0 && v <= 100);
  }
});

test('every PS domain (1-5) has an FS mapping', () => {
  for (let ps = 1; ps <= 5; ps++) {
    assert.ok(Array.isArray(FS_TO_PS_DOMAIN_MAP[ps]) && FS_TO_PS_DOMAIN_MAP[ps].length > 0);
  }
});
