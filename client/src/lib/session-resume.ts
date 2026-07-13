import { shuffleQuestionOptions } from './shuffleOptions';

// ---------------------------------------------------------------------------
// Pure resume-reconstruction logic shared by practice-quiz.tsx and
// practice-exam.tsx. Keeping this free of React/browser dependencies lets the
// automated test suite drive the exact save -> leave -> restore cycle
// (see server/__tests__/session-resume.test.ts).
// ---------------------------------------------------------------------------

// --- Quiz ---

export type QuizDraftLike = {
  questionIds: string[];
  currentQuestionIndex: number;
  userAnswers: unknown;
  timeSpentSeconds: number;
  shuffleSeed: number | null;
};

export type QuizPoolQuestion = { options: string[]; correctAnswer: number };

export type ReconstructedQuizSession<Q extends QuizPoolQuestion> = {
  questions: Array<Q & { id: string }>;
  shuffledOptionsMap: Record<number, { options: string[]; correctIndex: number }>;
  answeredQuestions: Record<number, { selected: number; correct: boolean }>;
  currentQuestionIndex: number;
  elapsedSeconds: number;
  shuffleSeed: number;
};

/**
 * Rebuild an in-progress quiz session from a saved draft, exactly as the
 * quiz page does on resume: same questions in the same order, identical
 * seeded option ordering, restored answers with recomputed correctness,
 * and the exact question index / elapsed time the user left at.
 */
export function reconstructQuizSession<Q extends QuizPoolQuestion>(
  draft: QuizDraftLike,
  questionPool: Q[],
): ReconstructedQuizSession<Q> {
  // Stable ids are `quiz-${index}` into the pool.
  const questionMap = new Map(questionPool.map((q, i) => [`quiz-${i}`, q]));

  const questions = draft.questionIds
    .map((id) => {
      const question = questionMap.get(id);
      if (!question) {
        console.error(`Question ${id} not found in question pool`);
        return null;
      }
      return { ...question, id };
    })
    .filter(Boolean) as Array<Q & { id: string }>;

  const shuffleSeed = draft.shuffleSeed || 0;
  const shuffledOptionsMap: Record<number, { options: string[]; correctIndex: number }> = {};
  questions.forEach((q, index) => {
    const shuffled = shuffleQuestionOptions(q, shuffleSeed + index);
    shuffledOptionsMap[index] = {
      options: shuffled.shuffledOptions,
      correctIndex: shuffled.shuffledCorrectIndex,
    };
  });

  const answeredQuestions: Record<number, { selected: number; correct: boolean }> = {};
  Object.entries((draft.userAnswers || {}) as Record<string, number>).forEach(
    ([indexStr, selectedAnswer]) => {
      const index = parseInt(indexStr);
      const question = questions[index];
      const shuffledData = shuffledOptionsMap[index];
      if (question && shuffledData) {
        answeredQuestions[index] = {
          selected: selectedAnswer,
          correct: selectedAnswer === shuffledData.correctIndex,
        };
      }
    },
  );

  return {
    questions,
    shuffledOptionsMap,
    answeredQuestions,
    currentQuestionIndex: draft.currentQuestionIndex,
    elapsedSeconds: draft.timeSpentSeconds,
    shuffleSeed,
  };
}

// --- Exam ---

export type ExamDraftLike = {
  questionIds: string[];
  currentQuestionIndex: number;
  userAnswers: unknown;
  timeSpentSeconds: number;
  timeSpentMinutes: number;
  examMode: string | null;
  shuffleSeed: number | null;
};

export type ExamAnswer = number | number[];

type MaybeNCEES = {
  options?: unknown;
  correctAnswer?: number;
  questionType?: string;
};

/** NCEES-style questions carry a questionType; base pool questions do not. */
export function isNCEESQuestion(q: unknown): q is { questionType: string } {
  return !!q && typeof q === 'object' && 'questionType' in (q as object);
}

export type ExamShuffledOptionsMap = Record<
  number,
  { options: string[]; shuffledToOriginal: number[] }
>;

/**
 * Seeded option shuffling for an exam question set. Only standard MCQ-style
 * questions are shuffled — select-all and priority-ranking keep their
 * authored option order. Identical to the exam page's start-time shuffling,
 * so replaying it with the draft's saved seed reproduces the exact ordering.
 */
export function createExamShuffledOptionsMap(
  questions: Array<MaybeNCEES>,
  seedBase: number,
): ExamShuffledOptionsMap {
  const shuffledMap: ExamShuffledOptionsMap = {};

  questions.forEach((q, index) => {
    const isStandardMCQ =
      !isNCEESQuestion(q) ||
      q.questionType === 'multiple_choice' ||
      q.questionType === 'scenario_based' ||
      q.questionType === 'computational';
    if (isStandardMCQ && Array.isArray(q.options) && q.options.length > 0) {
      const seed = seedBase + index;
      const fakeQuestion = { options: q.options as string[], correctAnswer: q.correctAnswer || 0 };
      const shuffled = shuffleQuestionOptions(fakeQuestion, seed);

      const shuffledToOriginal: number[] = [];
      shuffled.originalToShuffledMap.forEach((shuffledIdx, originalIdx) => {
        shuffledToOriginal[shuffledIdx] = originalIdx;
      });

      shuffledMap[index] = {
        options: shuffled.shuffledOptions,
        shuffledToOriginal,
      };
    }
  });

  return shuffledMap;
}

export type ExamQuestionPools<StdQ, NceesQ extends { id: string }> = {
  /** FS standard pool; ids are `exam-${index}`. */
  examQuestions: StdQ[];
  /** PS pool (reuses quiz questions); ids are `quiz-${index}`. */
  quizQuestions: StdQ[];
  /** TX pool; ids are `tx-exam-${index}`. */
  txExamQuestions: StdQ[];
  /** NCEES-style pool; questions carry their own stable ids. */
  nceesQuestions: NceesQ[];
};

export type ReconstructedExamSession<StdQ, NceesQ> = {
  examMode: string;
  questions: Array<(StdQ & { id: string }) | NceesQ>;
  shuffledOptionsMap: ExamShuffledOptionsMap;
  answers: Record<number, ExamAnswer>;
  currentQuestionIndex: number;
  timeRemaining: number;
  shuffleSeed: number;
};

/**
 * Rebuild an in-progress exam session (standard or NCEES-style) from a saved
 * draft, exactly as the exam page does on resume: same questions in the same
 * order, identical seeded option ordering, restored answers (numbers for MCQ,
 * arrays for select-all / priority-ranking), and remaining time computed from
 * the saved elapsed time.
 */
export function reconstructExamSession<StdQ extends MaybeNCEES, NceesQ extends { id: string }>(
  draft: ExamDraftLike,
  pools: ExamQuestionPools<StdQ, NceesQ>,
  examDurationMinutes: number,
): ReconstructedExamSession<StdQ, NceesQ> {
  const examMode = draft.examMode || 'standard';

  let questions: Array<(StdQ & { id: string }) | NceesQ>;

  if (examMode === 'ncees-style') {
    const nceesMap = new Map(pools.nceesQuestions.map((q) => [q.id, q]));
    questions = draft.questionIds
      .map((id) => {
        const question = nceesMap.get(id);
        if (!question) {
          console.error(`NCEES question ${id} not found`);
          return null;
        }
        return question;
      })
      .filter(Boolean) as NceesQ[];
  } else {
    const examQuestionMap = new Map(pools.examQuestions.map((q, i) => [`exam-${i}`, q]));
    const quizQuestionMap = new Map(pools.quizQuestions.map((q, i) => [`quiz-${i}`, q]));
    const txExamQuestionMap = new Map(pools.txExamQuestions.map((q, i) => [`tx-exam-${i}`, q]));

    questions = draft.questionIds
      .map((id) => {
        const question = examQuestionMap.get(id) || quizQuestionMap.get(id) || txExamQuestionMap.get(id);
        if (!question) {
          console.error(`Question ${id} not found`);
          return null;
        }
        return { ...question, id };
      })
      .filter(Boolean) as Array<StdQ & { id: string }>;
  }

  const shuffleSeed = draft.shuffleSeed || 0;
  const shuffledOptionsMap = createExamShuffledOptionsMap(questions as MaybeNCEES[], shuffleSeed);

  // Prefer second-precision elapsed time, falling back to legacy minutes.
  const elapsedSeconds = draft.timeSpentSeconds || draft.timeSpentMinutes * 60;
  const timeRemaining = Math.max(0, examDurationMinutes * 60 - elapsedSeconds);

  return {
    examMode,
    questions,
    shuffledOptionsMap,
    answers: (draft.userAnswers || {}) as Record<number, ExamAnswer>,
    currentQuestionIndex: draft.currentQuestionIndex,
    timeRemaining,
    shuffleSeed,
  };
}
