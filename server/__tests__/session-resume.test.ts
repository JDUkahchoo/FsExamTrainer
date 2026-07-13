import { test } from "node:test";
import assert from "node:assert/strict";
import {
  reconstructQuizSession,
  reconstructExamSession,
  createExamShuffledOptionsMap,
} from "../../client/src/lib/session-resume";
import { shuffleQuestionOptions } from "../../client/src/lib/shuffleOptions";
import { insertQuizDraftSchema, insertExamDraftSchema } from "../../shared/schema";
import { QUIZ_QUESTIONS } from "../../shared/data/quizQuestions";
import { EXAM_QUESTIONS } from "../../shared/data/examQuestions";
import { TX_EXAM_QUESTIONS } from "../../shared/data/txExamQuestions";
import { NCEES_STYLE_QUESTIONS } from "../../shared/data/nceesStyleQuestions";
import { storage } from "../storage";

// ---------------------------------------------------------------------------
// Resume-on-leave integration tests. These drive the full cycle with the real
// question pools and the exact logic the pages use:
//   start session -> answer questions -> snapshot draft (as saved on
//   pagehide/visibilitychange via sendBeacon) -> JSON round-trip -> server
//   schema validation -> reconstruct on "reload" -> assert EXACT restoration
//   of question order, option ordering, answers (including select-all and
//   priority-ranking), question index, and elapsed/remaining time.
// A DB-backed section verifies the draft lifecycle: save -> fetch -> delete
// on submit/finish so a new session is never blocked.
// ---------------------------------------------------------------------------

const INT32_MAX = 2147483647;
const newSeed = () => Date.now() % INT32_MAX;

/** Simulate the leave-time save: sendBeacon serializes the snapshot to JSON. */
function leaveAndReload<T>(snapshot: T): T {
  return JSON.parse(JSON.stringify(snapshot));
}

// --- Quiz: start, answer, leave, reload, restore ---------------------------

test("quiz resumes exactly where the user left off (index, answers, options, time)", () => {
  // Start a quiz the way handleStartQuiz does: questions carry `quiz-${i}`
  // ids from the pool, options shuffled with seedBase + index.
  const pickedIndices = [3, 17, 42, 108, 256];
  const questions = pickedIndices.map((i) => ({ ...QUIZ_QUESTIONS[i], id: `quiz-${i}` }));
  const seedBase = newSeed();
  const startShuffled = questions.map((q, index) => shuffleQuestionOptions(q, seedBase + index));

  // Answer the first two questions (selections are shuffled-option indices):
  // Q0 answered correctly, Q1 answered with a wrong option.
  const q0Correct = startShuffled[0].shuffledCorrectIndex;
  const q1Wrong = (startShuffled[1].shuffledCorrectIndex + 1) % startShuffled[1].shuffledOptions.length;
  const userAnswers: Record<number, number> = { 0: q0Correct, 1: q1Wrong };

  // The page's draft snapshot at leave time (user is now viewing question 3).
  const snapshot = {
    domain: "all",
    examTrack: "fs",
    sessionId: "session-quiz-resume-test",
    questionIds: questions.map((q) => q.id),
    currentQuestionIndex: 2,
    userAnswers,
    timeSpentSeconds: 47,
    shuffleSeed: seedBase,
  };

  // Leave: pagehide -> sendBeacon JSON; server validates before saving.
  const saved = leaveAndReload(snapshot);
  const parsed = insertQuizDraftSchema.safeParse({ ...saved, userId: "u" });
  assert.ok(parsed.success, `draft must pass server validation: ${JSON.stringify(parsed.success ? [] : parsed.error.issues)}`);

  // Reload: reconstruct the session from the stored draft.
  const restored = reconstructQuizSession(saved, QUIZ_QUESTIONS);

  // Exact question set and order.
  assert.deepEqual(restored.questions.map((q) => q.id), snapshot.questionIds);
  restored.questions.forEach((q, i) => {
    assert.equal(q.question, questions[i].question, `question text at ${i}`);
  });

  // Exact position and elapsed time.
  assert.equal(restored.currentQuestionIndex, 2);
  assert.equal(restored.elapsedSeconds, 47);

  // Identical seeded option ordering to the original session.
  restored.questions.forEach((_, i) => {
    assert.deepEqual(
      restored.shuffledOptionsMap[i].options,
      startShuffled[i].shuffledOptions,
      `option ordering at ${i} must match the original session`,
    );
    assert.equal(restored.shuffledOptionsMap[i].correctIndex, startShuffled[i].shuffledCorrectIndex);
  });

  // Answers restored exactly, with correctness recomputed correctly.
  assert.deepEqual(Object.keys(restored.answeredQuestions).map(Number).sort(), [0, 1]);
  assert.equal(restored.answeredQuestions[0].selected, q0Correct);
  assert.equal(restored.answeredQuestions[0].correct, true);
  assert.equal(restored.answeredQuestions[1].selected, q1Wrong);
  assert.equal(restored.answeredQuestions[1].correct, false);
});

// --- Standard exam: remaining time and answer restoration ------------------

test("standard exam resumes with exact index, answers, and remaining time", () => {
  const pickedIndices = [0, 5, 9, 12];
  const questions = pickedIndices.map((i) => ({ ...EXAM_QUESTIONS[i], id: `exam-${i}` }));
  const seedBase = newSeed();
  const startMap = createExamShuffledOptionsMap(questions, seedBase);

  // Answers are stored as ORIGINAL option indices (page maps shuffled->original).
  const snapshot = {
    examTrack: "fs",
    examMode: "standard",
    questionIds: questions.map((q) => q.id),
    currentQuestionIndex: 3,
    userAnswers: { 0: 2, 1: 0, 2: 3 } as Record<number, number>,
    timeSpentSeconds: 754,
    timeSpentMinutes: 12,
    shuffleSeed: seedBase,
  };

  const saved = leaveAndReload(snapshot);
  const parsed = insertExamDraftSchema.safeParse({ ...saved, userId: "u" });
  assert.ok(parsed.success, "exam draft must pass server validation");

  const FS_DURATION_MINUTES = 360;
  const restored = reconstructExamSession(
    saved,
    {
      examQuestions: EXAM_QUESTIONS,
      quizQuestions: QUIZ_QUESTIONS,
      txExamQuestions: TX_EXAM_QUESTIONS,
      nceesQuestions: NCEES_STYLE_QUESTIONS,
    },
    FS_DURATION_MINUTES,
  );

  assert.equal(restored.examMode, "standard");
  assert.deepEqual(restored.questions.map((q: any) => q.id), snapshot.questionIds);
  assert.equal(restored.currentQuestionIndex, 3);
  assert.deepEqual(restored.answers, { 0: 2, 1: 0, 2: 3 });

  // Remaining time is exact: duration - elapsed seconds (not reset).
  assert.equal(restored.timeRemaining, FS_DURATION_MINUTES * 60 - 754);

  // Option ordering reproduced exactly from the saved seed.
  Object.keys(startMap).forEach((k) => {
    const i = Number(k);
    assert.deepEqual(restored.shuffledOptionsMap[i].options, startMap[i].options);
    assert.deepEqual(restored.shuffledOptionsMap[i].shuffledToOriginal, startMap[i].shuffledToOriginal);
  });
});

test("TX-track standard exam draft resolves questions from the TX pool", () => {
  const questions = [0, 1].map((i) => ({ ...TX_EXAM_QUESTIONS[i], id: `tx-exam-${i}` }));
  const snapshot = {
    examTrack: "tx",
    examMode: "standard",
    questionIds: questions.map((q) => q.id),
    currentQuestionIndex: 1,
    userAnswers: { 0: 1 },
    timeSpentSeconds: 60,
    timeSpentMinutes: 1,
    shuffleSeed: newSeed(),
  };
  const restored = reconstructExamSession(
    leaveAndReload(snapshot),
    {
      examQuestions: EXAM_QUESTIONS,
      quizQuestions: QUIZ_QUESTIONS,
      txExamQuestions: TX_EXAM_QUESTIONS,
      nceesQuestions: NCEES_STYLE_QUESTIONS,
    },
    120,
  );
  assert.deepEqual(restored.questions.map((q: any) => q.id), snapshot.questionIds);
  assert.equal((restored.questions[0] as any).question, TX_EXAM_QUESTIONS[0].question);
  assert.equal(restored.timeRemaining, 120 * 60 - 60);
});

// --- NCEES-style exam: select-all and priority-ranking answers -------------

test("NCEES-style exam resumes select-all and priority-ranking answers exactly", () => {
  const mcq = NCEES_STYLE_QUESTIONS.find((q) => q.questionType === "multiple_choice");
  const selectAll = NCEES_STYLE_QUESTIONS.find((q) => q.questionType === "select_all");
  const ranking = NCEES_STYLE_QUESTIONS.find((q) => q.questionType === "priority_ranking");
  assert.ok(mcq && selectAll && ranking, "pool must contain all three question types");

  const questions = [mcq!, selectAll!, ranking!];
  const seedBase = newSeed();
  const startMap = createExamShuffledOptionsMap(questions, seedBase);

  // MCQ answered with an original index; select-all with a set of indices;
  // priority ranking with a full ordering of its options.
  const rankingOrder = ranking!.options.map((_, i) => i).reverse();
  const snapshot = {
    examTrack: "fs",
    examMode: "ncees-style",
    questionIds: questions.map((q) => q.id),
    currentQuestionIndex: 2,
    userAnswers: {
      0: 1,
      1: [0, 2],
      2: rankingOrder,
    } as Record<number, number | number[]>,
    timeSpentSeconds: 305,
    timeSpentMinutes: 5,
    shuffleSeed: seedBase,
  };

  const saved = leaveAndReload(snapshot);
  const parsed = insertExamDraftSchema.safeParse({ ...saved, userId: "u" });
  assert.ok(parsed.success, "NCEES draft must pass server validation");

  const restored = reconstructExamSession(
    saved,
    {
      examQuestions: EXAM_QUESTIONS,
      quizQuestions: QUIZ_QUESTIONS,
      txExamQuestions: TX_EXAM_QUESTIONS,
      nceesQuestions: NCEES_STYLE_QUESTIONS,
    },
    360,
  );

  assert.equal(restored.examMode, "ncees-style");
  assert.deepEqual(restored.questions.map((q: any) => q.id), snapshot.questionIds);
  assert.equal(restored.currentQuestionIndex, 2);

  // Answer shapes survive intact: number, number[], ordered number[].
  assert.equal(restored.answers[0], 1);
  assert.deepEqual(restored.answers[1], [0, 2]);
  assert.deepEqual(restored.answers[2], rankingOrder);

  // MCQ options are re-shuffled identically; select-all and priority-ranking
  // keep authored order (never shuffled) so index-based answers stay aligned.
  assert.deepEqual(restored.shuffledOptionsMap[0]?.options, startMap[0]?.options);
  assert.equal(restored.shuffledOptionsMap[1], undefined, "select-all must not be shuffled");
  assert.equal(restored.shuffledOptionsMap[2], undefined, "priority-ranking must not be shuffled");
});

// --- DB lifecycle: drafts persist and are deleted on submit/finish ---------

const hasDb = !!process.env.DATABASE_URL;
const TEST_USER_ID = "test-resume-lifecycle-user";

test("draft lifecycle: save -> fetch -> delete on finish unblocks new sessions", { skip: !hasDb }, async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "resume-lifecycle@test.local" });

  // Clean slate.
  await storage.deleteQuizDraft(TEST_USER_ID, "fs");
  await storage.deleteExamDraft(TEST_USER_ID, "fs");

  // Quiz: save a draft mid-session, fetch it back byte-exact.
  const quizDraft = {
    userId: TEST_USER_ID,
    domain: "all",
    examTrack: "fs",
    sessionId: "lifecycle-session-1",
    questionIds: ["quiz-3", "quiz-17"],
    currentQuestionIndex: 1,
    userAnswers: { 0: 2 },
    timeSpentSeconds: 33,
    shuffleSeed: newSeed(),
  };
  await storage.saveQuizDraft(insertQuizDraftSchema.parse(quizDraft));
  const fetched = await storage.getActiveQuizDraft(TEST_USER_ID, "fs");
  assert.ok(fetched, "quiz draft must be retrievable after save");
  assert.equal(fetched!.currentQuestionIndex, 1);
  assert.deepEqual(fetched!.questionIds, quizDraft.questionIds);
  assert.deepEqual(fetched!.userAnswers, { 0: 2 });
  assert.equal(fetched!.timeSpentSeconds, 33);
  assert.equal(fetched!.shuffleSeed, quizDraft.shuffleSeed);

  // Finish the quiz: the page deletes the draft — a new session is unblocked.
  await storage.deleteQuizDraft(TEST_USER_ID, "fs");
  assert.equal(await storage.getActiveQuizDraft(TEST_USER_ID, "fs"), undefined);

  // Exam: NCEES-style answers (arrays) round-trip through jsonb exactly.
  const examDraft = {
    userId: TEST_USER_ID,
    examTrack: "fs",
    examMode: "ncees-style",
    questionIds: ["ncees-1", "ncees-2", "ncees-3"],
    currentQuestionIndex: 2,
    userAnswers: { 0: 1, 1: [0, 2], 2: [3, 1, 0, 2] },
    timeSpentSeconds: 615,
    timeSpentMinutes: 10,
    shuffleSeed: newSeed(),
  };
  await storage.saveExamDraft(insertExamDraftSchema.parse(examDraft));
  const fetchedExam = await storage.getActiveExamDraft(TEST_USER_ID, "fs");
  assert.ok(fetchedExam, "exam draft must be retrievable after save");
  assert.deepEqual(fetchedExam!.userAnswers, { 0: 1, 1: [0, 2], 2: [3, 1, 0, 2] });
  assert.equal(fetchedExam!.currentQuestionIndex, 2);
  assert.equal(fetchedExam!.timeSpentSeconds, 615);
  assert.equal(fetchedExam!.examMode, "ncees-style");

  // Submit the exam: draft is deleted so a new exam can start.
  await storage.deleteExamDraft(TEST_USER_ID, "fs");
  assert.equal(await storage.getActiveExamDraft(TEST_USER_ID, "fs"), undefined);
});

test("saving a new draft replaces the old one (one active draft per track)", { skip: !hasDb }, async () => {
  await storage.upsertUser({ id: TEST_USER_ID, email: "resume-lifecycle@test.local" });
  await storage.deleteQuizDraft(TEST_USER_ID, "fs");

  const base = {
    userId: TEST_USER_ID,
    domain: "all",
    examTrack: "fs",
    questionIds: ["quiz-1"],
    currentQuestionIndex: 0,
    userAnswers: {},
    timeSpentSeconds: 5,
    shuffleSeed: 1,
  };
  await storage.saveQuizDraft(insertQuizDraftSchema.parse({ ...base, sessionId: "first" }));
  await storage.saveQuizDraft(insertQuizDraftSchema.parse({ ...base, sessionId: "second", currentQuestionIndex: 4 }));

  const active = await storage.getActiveQuizDraft(TEST_USER_ID, "fs");
  assert.equal(active!.sessionId, "second");
  assert.equal(active!.currentQuestionIndex, 4);

  await storage.deleteQuizDraft(TEST_USER_ID, "fs");
});
