import { test } from "node:test";
import assert from "node:assert/strict";
import { insertQuizDraftSchema, insertExamDraftSchema } from "../../shared/schema";

// ---------------------------------------------------------------------------
// Draft payload validation — mirrors the exact payload shapes the quiz/exam
// pages POST to /api/quiz/draft and /api/exam/draft. Routes run these through
// insertQuizDraftSchema / insertExamDraftSchema before saving, so if a payload
// shape here stops validating, resume-on-leave silently breaks in production
// (every save returns 400 and users lose their in-progress sessions).
// ---------------------------------------------------------------------------

const INT32_MAX = 2147483647;

// Client-side seed generation (practice-quiz.tsx / practice-exam.tsx):
// must stay within the int32 range of the shuffle_seed column.
const clientSeed = () => Date.now() % INT32_MAX;

function quizDraftPayload(overrides: Record<string, unknown> = {}) {
  // Same fields the quiz page snapshots into quizDraftSnapshotRef.
  return {
    userId: "user-test",
    domain: "all",
    examTrack: "fs",
    sessionId: "11111111-2222-3333-4444-555555555555",
    questionIds: ["quiz-0", "quiz-17", "quiz-342"],
    currentQuestionIndex: 2,
    userAnswers: { 0: 1, 1: 3 },
    timeSpentSeconds: 95,
    shuffleSeed: clientSeed(),
    ...overrides,
  };
}

function examDraftPayload(overrides: Record<string, unknown> = {}) {
  // Same fields the exam page snapshots into draftSnapshotRef.
  return {
    userId: "user-test",
    examTrack: "fs",
    examMode: "standard",
    questionIds: ["exam-0", "exam-5", "exam-9"],
    currentQuestionIndex: 1,
    userAnswers: { 0: 2 },
    timeSpentSeconds: 610,
    timeSpentMinutes: 10,
    shuffleSeed: clientSeed(),
    ...overrides,
  };
}

test("quiz draft payload in the exact client shape validates", () => {
  const result = insertQuizDraftSchema.safeParse(quizDraftPayload());
  assert.ok(
    result.success,
    `quiz draft payload must validate; issues: ${JSON.stringify(
      result.success ? [] : result.error.issues
    )}`
  );
});

test("exam draft payload (standard mode) validates", () => {
  const result = insertExamDraftSchema.safeParse(examDraftPayload());
  assert.ok(
    result.success,
    `exam draft payload must validate; issues: ${JSON.stringify(
      result.success ? [] : result.error.issues
    )}`
  );
});

test("NCEES-style exam draft with select-all and priority-ranking answers validates", () => {
  // NCEES mode mixes answer shapes: number (MCQ), number[] (select-all
  // selections), and ordered number[] (priority ranking).
  const result = insertExamDraftSchema.safeParse(
    examDraftPayload({
      examMode: "ncees-style",
      questionIds: ["ncees-1", "ncees-2", "ncees-3"],
      userAnswers: { 0: 2, 1: [0, 2, 3], 2: [3, 1, 0, 2] },
    })
  );
  assert.ok(
    result.success,
    `NCEES exam draft must validate; issues: ${JSON.stringify(
      result.success ? [] : result.error.issues
    )}`
  );
});

test("client shuffle seed always fits the int32 draft column", () => {
  // Regression: seeds were generated with a raw Date.now(), which exceeds the
  // int32 max of the shuffle_seed column — Zod rejected EVERY draft save with
  // 400, silently breaking resume for all quizzes and exams.
  const seed = clientSeed();
  assert.ok(Number.isInteger(seed) && seed >= 0 && seed <= INT32_MAX);

  const quiz = insertQuizDraftSchema.safeParse(quizDraftPayload({ shuffleSeed: seed }));
  assert.ok(quiz.success, "int32-bounded seed must pass quiz draft validation");
  const exam = insertExamDraftSchema.safeParse(examDraftPayload({ shuffleSeed: seed }));
  assert.ok(exam.success, "int32-bounded seed must pass exam draft validation");
});

test("raw Date.now() seed is rejected (documents the overflow trap)", () => {
  const rawNow = Date.now(); // ~1.75e12 in 2026, far beyond int32
  assert.ok(rawNow > INT32_MAX, "sanity: Date.now() exceeds int32");

  const quiz = insertQuizDraftSchema.safeParse(quizDraftPayload({ shuffleSeed: rawNow }));
  assert.equal(quiz.success, false, "raw Date.now() seed must fail quiz validation");
  const exam = insertExamDraftSchema.safeParse(examDraftPayload({ shuffleSeed: rawNow }));
  assert.equal(exam.success, false, "raw Date.now() seed must fail exam validation");
});

test("draft payload survives the sendBeacon JSON round-trip intact", () => {
  // Leave-time saves go through navigator.sendBeacon with a JSON blob; the
  // parsed body must still validate and preserve answer shapes exactly.
  const original = examDraftPayload({
    examMode: "ncees-style",
    userAnswers: { 0: 1, 3: [2, 0], 7: [1, 3, 0, 2] },
    currentQuestionIndex: 7,
    timeSpentSeconds: 1234,
  });
  const roundTripped = JSON.parse(JSON.stringify(original));
  const result = insertExamDraftSchema.safeParse(roundTripped);
  assert.ok(result.success, "round-tripped payload must validate");
  assert.deepEqual(roundTripped.userAnswers, {
    0: 1,
    3: [2, 0],
    7: [1, 3, 0, 2],
  });
  assert.equal(roundTripped.currentQuestionIndex, 7);
  assert.equal(roundTripped.timeSpentSeconds, 1234);
});
