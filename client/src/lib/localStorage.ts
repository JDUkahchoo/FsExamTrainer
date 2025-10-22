// LocalStorage utility functions with type safety

const STORAGE_KEYS = {
  WEEK_PROGRESS: 'fs-exam-week-progress',
  QUIZ_RESULTS: 'fs-exam-quiz-results',
  FLASHCARD_MASTERY: 'fs-exam-flashcard-mastery',
  PRACTICE_EXAMS: 'fs-exam-practice-exams',
  STUDY_NOTES: 'fs-exam-study-notes',
} as const;

export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

export function setInStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

// Week Progress
export function getWeekProgress(): Record<string, Set<string>> {
  const data = getFromStorage(STORAGE_KEYS.WEEK_PROGRESS, {});
  // Convert arrays back to Sets
  const result: Record<string, Set<string>> = {};
  Object.entries(data).forEach(([key, value]) => {
    result[key] = new Set(value as string[]);
  });
  return result;
}

export function saveWeekProgress(progress: Record<string, Set<string>>): void {
  // Convert Sets to arrays for storage
  const data: Record<string, string[]> = {};
  Object.entries(progress).forEach(([key, value]) => {
    data[key] = Array.from(value);
  });
  setInStorage(STORAGE_KEYS.WEEK_PROGRESS, data);
}

// Quiz Results
export interface QuizResultStorage {
  questionId: string;
  domain: string;
  selectedAnswer: number;
  isCorrect: boolean;
  completedAt: string;
}

export function getQuizResults(): QuizResultStorage[] {
  return getFromStorage(STORAGE_KEYS.QUIZ_RESULTS, []);
}

export function saveQuizResult(result: QuizResultStorage): void {
  const results = getQuizResults();
  results.push(result);
  setInStorage(STORAGE_KEYS.QUIZ_RESULTS, results);
}

export function clearQuizResults(): void {
  setInStorage(STORAGE_KEYS.QUIZ_RESULTS, []);
}

// Flashcard Mastery
export interface FlashcardMasteryStorage {
  flashcardId: number;
  isMastered: boolean;
  lastReviewed: string;
}

export function getFlashcardMastery(): Set<number> {
  const data = getFromStorage<number[]>(STORAGE_KEYS.FLASHCARD_MASTERY, []);
  return new Set(data);
}

export function saveFlashcardMastery(mastered: Set<number>): void {
  setInStorage(STORAGE_KEYS.FLASHCARD_MASTERY, Array.from(mastered));
}

// Practice Exams
export interface PracticeExamStorage {
  totalQuestions: number;
  correctAnswers: number;
  timeSpentMinutes: number;
  domainScores: Record<string, { correct: number; total: number }>;
  completedAt: string;
}

export function getPracticeExams(): PracticeExamStorage[] {
  return getFromStorage(STORAGE_KEYS.PRACTICE_EXAMS, []);
}

export function savePracticeExam(exam: PracticeExamStorage): void {
  const exams = getPracticeExams();
  exams.push(exam);
  setInStorage(STORAGE_KEYS.PRACTICE_EXAMS, exams);
}

// Study Notes
export function getStudyNotes(): Record<number, string> {
  return getFromStorage(STORAGE_KEYS.STUDY_NOTES, {});
}

export function saveStudyNotes(notes: Record<number, string>): void {
  setInStorage(STORAGE_KEYS.STUDY_NOTES, notes);
}

export function saveStudyNote(week: number, content: string): void {
  const notes = getStudyNotes();
  notes[week] = content;
  saveStudyNotes(notes);
}
