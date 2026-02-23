import type {
  WeekProgress,
  InsertWeekProgress,
  QuizResult,
  InsertQuizResult,
  QuizSession,
  InsertQuizSession,
  FlashcardMastery,
  InsertFlashcardMastery,
  PracticeExam,
  InsertPracticeExam,
  PracticeExamResult,
  InsertPracticeExamResult,
  PretestResult,
  InsertPretestResult,
  PretestQuestionResult,
  InsertPretestQuestionResult,
  StudyNote,
  InsertStudyNote,
  ReadingProgress,
  InsertReadingProgress,
  StudyReadingProgress,
  InsertStudyReadingProgress,
  QuizDraft,
  InsertQuizDraft,
  ExamDraft,
  InsertExamDraft,
  DailyActivity,
  InsertDailyActivity,
  Achievement,
  InsertAchievement,
  AchievementType,
  CustomWeek,
  InsertCustomWeek,
  UserPreferences,
  InsertUserPreferences,
  DailyLog,
  InsertDailyLog,
  User,
  UpsertUser,
  StudyStreak,
  InsertStudyCycle,
  StudyCycle,
  Lesson,
  InsertLesson,
  LessonQuestion,
  InsertLessonQuestion,
  LessonProgress,
  InsertLessonProgress,
  DomainProgressSnapshot,
  InsertDomainProgressSnapshot,
  Feedback,
  InsertFeedback,
  Testimonial,
  InsertTestimonial,
  ApplyChallengeAttempt,
  InsertApplyChallengeAttempt,
  RetentionReview,
  InsertRetentionReview,
  XpGrant,
  FlashcardFeynmanScore,
  InsertFlashcardFeynmanScore,
  FlashcardMnemonic,
  InsertFlashcardMnemonic,
  FlashcardTriadProgress,
  InsertFlashcardTriadProgress,
  FlashcardReviewSession,
  InsertFlashcardReviewSession,
  FlashcardReviewEvent,
  InsertFlashcardReviewEvent,
  FlashcardSessionState,
  FlashcardChallengeSession,
  InsertFlashcardChallengeSession,
  DailyQuest,
  InsertDailyQuest,
  ReviewSchedule,
  InsertReviewSchedule,
  UserDifficultySettings,
  InsertUserDifficultySettings,
  LeaderboardEntry,
  ForgettingCurvePoint,
  DifficultyLevel
} from "@shared/schema";
import { SURVEYOR_RANKS, getSurveyorRank } from "@shared/schema";
import { db } from "./db";
import {
  users,
  weekProgress,
  quizResults,
  quizSessions,
  flashcardMastery,
  practiceExams,
  practiceExamResults,
  pretestResults,
  pretestQuestionResults,
  studyNotes,
  readingProgress,
  quizDrafts,
  examDrafts,
  dailyActivity,
  achievements,
  customWeeks,
  userPreferences,
  dailyLogs,
  studyCycles,
  lessons,
  lessonQuestions,
  lessonProgress,
  domainProgressSnapshots,
  applyChallengeAttempts,
  feedback,
  testimonials,
  retentionReviews,
  xpGrants,
  flashcardFeynmanScores,
  flashcardMnemonics,
  flashcardTriadProgress,
  flashcardReviewSessions,
  flashcardReviewEvents,
  dailyFlashcardProgress,
  flashcardChallengeSessions,
  dailyQuests,
  reviewSchedule,
  userDifficultySettings,
  studyReadingProgress,
  DOMAINS
} from "@shared/schema";
import { eq, and, desc, gte, lte, lt, sql, inArray } from "drizzle-orm";

/**
 * Get today's midnight and tomorrow's midnight in the user's timezone.
 * This ensures quests reset at the user's local midnight, not UTC midnight.
 * @param timezone IANA timezone string (e.g., 'America/Chicago')
 * @returns { today: Date, tomorrow: Date } - Both in UTC but representing local midnight
 */
function getLocalMidnight(timezone: string = 'America/Chicago'): { today: Date; tomorrow: Date } {
  const now = new Date();
  
  // Format the current time in the user's timezone to get the local date
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // Get the local date string (YYYY-MM-DD format)
  const localDateStr = formatter.format(now);
  
  // Calculate today's midnight in user's timezone
  const todayParts = localDateStr.split('-');
  const todayYear = parseInt(todayParts[0]);
  const todayMonth = parseInt(todayParts[1]) - 1;
  const todayDay = parseInt(todayParts[2]);
  
  // Calculate tomorrow's date (handles month/year rollover)
  const tomorrowLocal = new Date(todayYear, todayMonth, todayDay + 1);
  const tomorrowYear = tomorrowLocal.getFullYear();
  const tomorrowMonth = tomorrowLocal.getMonth();
  const tomorrowDay = tomorrowLocal.getDate();
  
  // Helper to get UTC time for local midnight in timezone
  // This correctly handles DST by calculating each day's offset independently
  function getUtcMidnight(year: number, month: number, day: number): Date {
    const tempDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
    const localMidnightInTz = new Date(tempDate.toLocaleString('en-US', { timeZone: timezone }));
    const utcMidnight = new Date(tempDate.toLocaleString('en-US', { timeZone: 'UTC' }));
    const offsetMs = utcMidnight.getTime() - localMidnightInTz.getTime();
    return new Date(tempDate.getTime() + offsetMs);
  }
  
  const today = getUtcMidnight(todayYear, todayMonth, todayDay);
  const tomorrow = getUtcMidnight(tomorrowYear, tomorrowMonth, tomorrowDay);
  
  return { today, tomorrow };
}

export interface IStorage {
  // User methods (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserName(id: string, firstName?: string, lastName?: string): Promise<User>;

  // Week Progress methods
  getWeekProgress(userId: string, week: number, examTrack?: string): Promise<WeekProgress | undefined>;
  getAllWeekProgress(userId: string, examTrack?: string): Promise<WeekProgress[]>;
  upsertWeekProgress(progress: InsertWeekProgress): Promise<WeekProgress>;

  // Quiz Results methods
  getQuizResults(userId: string): Promise<QuizResult[]>;
  getQuizResultsByDomain(userId: string, domain: string): Promise<QuizResult[]>;
  getQuizResultsBySession(sessionId: string): Promise<QuizResult[]>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  deleteAllQuizResults(userId: string): Promise<void>;
  
  // FOCUS Weakness Scanner methods
  getRecentMisses(userId: string, limit?: number, examTrack?: string): Promise<QuizResult[]>;
  getDomainStats(userId: string, examTrack?: string): Promise<{ domain: string; total: number; correct: number; accuracy: number }[]>;
  getCorrectStreak(userId: string, examTrack?: string): Promise<{ current: number; best: number }>;

  // Quiz Session methods
  getQuizSessions(userId: string, examTrack?: string): Promise<QuizSession[]>;
  getQuizSessionsByDomain(userId: string, domain: string): Promise<QuizSession[]>;
  getQuizSessionWithResults(sessionId: string): Promise<{ session: QuizSession; results: QuizResult[] } | undefined>;
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;

  // Flashcard Mastery methods
  getFlashcardMastery(userId: string, flashcardId: string): Promise<FlashcardMastery | undefined>;
  getAllFlashcardMastery(userId: string): Promise<FlashcardMastery[]>;
  upsertFlashcardMastery(mastery: InsertFlashcardMastery): Promise<FlashcardMastery>;
  deleteAllFlashcardMastery(userId: string): Promise<void>;
  
  // Flashcard Feynman Mode methods
  getFlashcardFeynmanScore(userId: string, flashcardId: string): Promise<FlashcardFeynmanScore | undefined>;
  getAllFlashcardFeynmanScores(userId: string): Promise<FlashcardFeynmanScore[]>;
  upsertFlashcardFeynmanScore(score: InsertFlashcardFeynmanScore): Promise<FlashcardFeynmanScore>;
  
  // Flashcard Mnemonic methods
  getFlashcardMnemonic(userId: string, flashcardId: string): Promise<FlashcardMnemonic | undefined>;
  getAllFlashcardMnemonics(userId: string): Promise<FlashcardMnemonic[]>;
  upsertFlashcardMnemonic(mnemonic: InsertFlashcardMnemonic): Promise<FlashcardMnemonic>;
  deleteFlashcardMnemonic(userId: string, flashcardId: string): Promise<void>;
  
  // Flashcard Triad Drill methods
  getFlashcardTriadProgress(userId: string, flashcardId: string): Promise<FlashcardTriadProgress | undefined>;
  getAllFlashcardTriadProgress(userId: string): Promise<FlashcardTriadProgress[]>;
  upsertFlashcardTriadProgress(progress: InsertFlashcardTriadProgress): Promise<FlashcardTriadProgress>;
  
  // Flashcard Review Sessions methods (timestamped tracking)
  getFlashcardReviewSessions(userId: string, date?: Date): Promise<FlashcardReviewSession[]>;
  getTodayFlashcardSessions(userId: string): Promise<FlashcardReviewSession[]>;
  createFlashcardReviewSession(session: InsertFlashcardReviewSession): Promise<FlashcardReviewSession>;
  completeFlashcardReviewSession(sessionId: string, data: { cardsReviewed: number; avgMasteryRating?: number; domainBreakdown?: Record<string, { reviewed: number; avgRating: number }>; timeSpentSeconds: number }): Promise<FlashcardReviewSession>;
  
  // Active session state management (for resume functionality)
  getActiveFlashcardSession(userId: string, examTrack: string): Promise<FlashcardReviewSession | undefined>;
  updateFlashcardSessionState(sessionId: string, state: FlashcardSessionState): Promise<FlashcardReviewSession>;
  autoCompleteStaleFlashcardSessions(userId: string, examTrack: string): Promise<void>;
  
  // Flashcard Review Events (tracks each individual card review)
  logFlashcardReviewEvent(event: InsertFlashcardReviewEvent): Promise<FlashcardReviewEvent>;
  getFlashcardReviewEventCount(userId: string, date?: Date): Promise<number>;
  
  // Daily Flashcard Progress (for quest tracking - idempotent per card per day)
  recordFlashcardProgress(userId: string, cardId: string, mode: string, examTrack?: string, timezone?: string): Promise<{ isNew: boolean; todayCount: number }>;
  getTodayFlashcardProgressCount(userId: string, timezone?: string): Promise<number>;

  // Flashcard Challenge Sessions (proficiency tracking)
  createFlashcardChallengeSession(session: InsertFlashcardChallengeSession): Promise<FlashcardChallengeSession>;
  getFlashcardChallengeSessions(userId: string, examTrack?: string): Promise<FlashcardChallengeSession[]>;
  getFlashcardChallengeStats(userId: string, examTrack?: string): Promise<{
    totalSessions: number;
    totalCards: number;
    overallAccuracy: number;
    domainStats: Record<string, { sessions: number; accuracy: number; totalCards: number }>;
  }>;

  // Practice Exam methods
  getPracticeExams(userId: string): Promise<PracticeExam[]>;
  getLatestPracticeExam(userId: string): Promise<PracticeExam | undefined>;
  getPracticeExamWithResults(examId: string): Promise<{ exam: PracticeExam; results: PracticeExamResult[] } | undefined>;
  createPracticeExam(exam: InsertPracticeExam): Promise<PracticeExam>;
  createPracticeExamResult(result: InsertPracticeExamResult): Promise<PracticeExamResult>;

  // Study Notes methods (enhanced with multi-page support)
  getStudyNote(userId: string, noteId: string): Promise<StudyNote | undefined>;
  getAllStudyNotes(userId: string): Promise<StudyNote[]>;
  getStudyNotesByWeek(userId: string, week: number): Promise<StudyNote[]>;
  getStudyNotesByDay(userId: string, week: number, dayOfWeek: string): Promise<StudyNote[]>;
  createStudyNote(note: InsertStudyNote): Promise<StudyNote>;
  updateStudyNote(userId: string, noteId: string, updates: Partial<InsertStudyNote>): Promise<StudyNote>;
  deleteStudyNote(userId: string, noteId: string): Promise<void>;

  // Reading Progress methods (Comprehension Checkpoint)
  getReadingProgress(userId: string, week: number, examTrack?: string): Promise<ReadingProgress[]>;
  getAllReadingProgress(userId: string, examTrack?: string): Promise<ReadingProgress[]>;
  upsertReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress>;

  // APPLY Challenge Attempts methods (Scenario Lab)
  getApplyChallengeAttempts(userId: string, week?: number, examTrack?: string): Promise<ApplyChallengeAttempt[]>;
  createApplyChallengeAttempt(attempt: InsertApplyChallengeAttempt): Promise<ApplyChallengeAttempt>;
  updateApplyChallengeAttempt(userId: string, attemptId: string, updates: Partial<InsertApplyChallengeAttempt>): Promise<ApplyChallengeAttempt>;

  // REINFORCE Retention Reviews methods (Spaced Repetition)
  getRetentionReviews(userId: string, week?: number, examTrack?: string): Promise<RetentionReview[]>;
  getRetentionReviewById(reviewId: string): Promise<RetentionReview | null>;
  getDueRetentionReviews(userId: string, week?: number, examTrack?: string): Promise<RetentionReview[]>;
  createRetentionReview(review: InsertRetentionReview): Promise<RetentionReview>;
  updateRetentionReview(userId: string, reviewId: string, updates: Partial<InsertRetentionReview>): Promise<RetentionReview>;
  getRetentionStats(userId: string, week?: number, examTrack?: string): Promise<{ totalReviews: number; dueToday: number; averageMastery: number; retentionScore: number }>;

  // Daily Activity methods
  getDailyActivity(userId: string, days: number): Promise<DailyActivity[]>;
  logDailyActivity(userId: string, activityType: string): Promise<void>;
  calculateStreak(userId: string): Promise<StudyStreak>;

  // Achievement methods
  getUserAchievements(userId: string): Promise<Achievement[]>;
  checkAndAwardAchievements(userId: string): Promise<Achievement[]>;
  awardAchievement(userId: string, achievementType: AchievementType): Promise<Achievement | null>;

  // Custom Week methods
  getCustomWeeks(userId: string): Promise<CustomWeek[]>;
  createCustomWeek(customWeek: InsertCustomWeek): Promise<CustomWeek>;
  deleteCustomWeek(userId: string, id: string): Promise<void>;

  // Quiz Draft methods (for resume functionality)
  getActiveQuizDraft(userId: string, examTrack?: string): Promise<QuizDraft | undefined>;
  saveQuizDraft(draft: InsertQuizDraft): Promise<QuizDraft>;
  deleteQuizDraft(userId: string, examTrack?: string): Promise<void>;

  // Exam Draft methods (for resume functionality)
  getActiveExamDraft(userId: string): Promise<ExamDraft | undefined>;
  saveExamDraft(draft: InsertExamDraft): Promise<ExamDraft>;
  deleteExamDraft(userId: string): Promise<void>;

  // Pretest methods
  getLatestPretestResult(userId: string): Promise<PretestResult | undefined>;
  getPretestWithResults(pretestId: string): Promise<{ pretest: PretestResult; results: PretestQuestionResult[] } | undefined>;
  savePretestResult(result: InsertPretestResult): Promise<PretestResult>;
  createPretestQuestionResult(result: InsertPretestQuestionResult): Promise<PretestQuestionResult>;

  // User Preferences methods
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  upsertUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences>;

  // Daily Log methods
  getDailyLogs(userId: string): Promise<DailyLog[]>;
  getDailyLog(userId: string, id: string): Promise<DailyLog | undefined>;
  createDailyLog(log: InsertDailyLog): Promise<DailyLog>;
  updateDailyLog(userId: string, id: string, log: Partial<InsertDailyLog>): Promise<DailyLog>;
  deleteDailyLog(userId: string, id: string): Promise<void>;

  // Study Cycle methods
  getStudyCycles(userId: string): Promise<StudyCycle[]>;
  getCurrentStudyCycle(userId: string): Promise<StudyCycle | undefined>;
  completeCurrentCycle(userId: string): Promise<StudyCycle>;
  startNewCycle(userId: string): Promise<StudyCycle>;

  // Interactive Lesson methods
  getAllLessons(examTrack?: string): Promise<Lesson[]>;
  getLessonsByWeek(week: number, examTrack?: string): Promise<Lesson[]>;
  getLessonsByDomain(domainNumber: number, examTrack?: string): Promise<Lesson[]>;
  getLessonWithQuestions(lessonId: string): Promise<{ lesson: Lesson; questions: LessonQuestion[] } | undefined>;
  getLessonWithRandomizedQuestions(userId: string, lessonId: string): Promise<{ lesson: Lesson; questions: LessonQuestion[] } | undefined>;
  getQuestionsByIds(questionIds: string[]): Promise<LessonQuestion[]>;
  getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | undefined>;
  getAllLessonProgress(userId: string, examTrack?: string): Promise<LessonProgress[]>;
  upsertLessonProgress(progress: InsertLessonProgress): Promise<LessonProgress>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  createLessonQuestion(question: InsertLessonQuestion): Promise<LessonQuestion>;

  // Feedback methods
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;

  // Testimonials methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;

  // XP System methods
  getUserXp(userId: string): Promise<{ xp: number; level: number }>;
  awardXp(userId: string, amount: number, activityKey: string): Promise<{ xp: number; level: number; leveledUp: boolean; awarded: boolean }>;
  hasXpGrant(userId: string, activityKey: string): Promise<boolean>;

  // Study Reading Progress methods
  getStudyReadingProgress(userId: string, readingId: string): Promise<StudyReadingProgress[]>;
  getAllStudyReadingProgress(userId: string): Promise<StudyReadingProgress[]>;
  markStudyReadingSectionComplete(userId: string, readingId: string, sectionId: string): Promise<StudyReadingProgress>;
}

export class DatabaseStorage implements IStorage {
  // User methods (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserName(id: string, firstName?: string, lastName?: string): Promise<User> {
    const updateData: Partial<UpsertUser> = { updatedAt: new Date() };
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    
    const [user] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Week Progress methods
  async getWeekProgress(userId: string, week: number, examTrack?: string): Promise<WeekProgress | undefined> {
    const conditions = [eq(weekProgress.userId, userId), eq(weekProgress.week, week)];
    if (examTrack) {
      conditions.push(eq(weekProgress.examTrack, examTrack));
    }
    const [progress] = await db
      .select()
      .from(weekProgress)
      .where(and(...conditions));
    return progress || undefined;
  }

  async getAllWeekProgress(userId: string, examTrack?: string): Promise<WeekProgress[]> {
    const conditions = [eq(weekProgress.userId, userId)];
    if (examTrack) {
      conditions.push(eq(weekProgress.examTrack, examTrack));
    }
    return await db
      .select()
      .from(weekProgress)
      .where(and(...conditions));
  }

  async upsertWeekProgress(progress: InsertWeekProgress): Promise<WeekProgress> {
    const trackFilter = progress.examTrack || 'fs';
    const existing = await this.getWeekProgress(progress.userId, progress.week, trackFilter);
    
    if (existing) {
      const [updated] = await db
        .update(weekProgress)
        .set({ ...progress, updatedAt: new Date() })
        .where(and(
          eq(weekProgress.userId, progress.userId),
          eq(weekProgress.week, progress.week),
          eq(weekProgress.examTrack, trackFilter)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(weekProgress)
        .values({ ...progress, examTrack: trackFilter, updatedAt: new Date() })
        .returning();
      return created;
    }
  }

  // Quiz Results methods
  async getQuizResults(userId: string): Promise<QuizResult[]> {
    return await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId));
  }

  async getQuizResultsByDomain(userId: string, domain: string): Promise<QuizResult[]> {
    return await db
      .select()
      .from(quizResults)
      .where(and(eq(quizResults.userId, userId), eq(quizResults.domain, domain)));
  }

  async getQuizResultsBySession(sessionId: string): Promise<QuizResult[]> {
    return await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.sessionId, sessionId));
  }

  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const [created] = await db
      .insert(quizResults)
      .values({ ...result, completedAt: new Date() })
      .returning();
    return created;
  }

  async deleteAllQuizResults(userId: string): Promise<void> {
    await db.delete(quizResults).where(eq(quizResults.userId, userId));
  }

  // FOCUS Weakness Scanner methods
  async getRecentMisses(userId: string, limit: number = 20, examTrack?: string): Promise<QuizResult[]> {
    const validDomains = examTrack === 'ps' 
      ? ['Legal Principles', 'Professional Survey Practices', 'Standards and Specifications', 'Business Practices', 'Areas of Practice']
      : ['Math & Basic Science', 'Field Data Acquisition', 'Mapping, GIS, and CAD', 'Boundary Law & PLSS', 'Surveying Principles', 'Survey Computations & Applications', 'Professional Practice', 'Applied Mathematics & Statistics'];
    
    const conditions = [eq(quizResults.userId, userId), eq(quizResults.isCorrect, false)];
    if (examTrack) {
      conditions.push(inArray(quizResults.domain, validDomains));
    }
    return await db
      .select()
      .from(quizResults)
      .where(and(...conditions))
      .orderBy(desc(quizResults.completedAt))
      .limit(limit);
  }

  async getDomainStats(userId: string, examTrack?: string): Promise<{ domain: string; total: number; correct: number; accuracy: number }[]> {
    const validDomains = examTrack === 'ps' 
      ? ['Legal Principles', 'Professional Survey Practices', 'Standards and Specifications', 'Business Practices', 'Areas of Practice']
      : ['Math & Basic Science', 'Field Data Acquisition', 'Mapping, GIS, and CAD', 'Boundary Law & PLSS', 'Surveying Principles', 'Survey Computations & Applications', 'Professional Practice', 'Applied Mathematics & Statistics'];
    
    const conditions = [eq(quizResults.userId, userId)];
    if (examTrack) {
      conditions.push(inArray(quizResults.domain, validDomains));
    }
    const results = await db
      .select()
      .from(quizResults)
      .where(and(...conditions));
    
    const domainMap = new Map<string, { total: number; correct: number }>();
    
    for (const result of results) {
      const current = domainMap.get(result.domain) || { total: 0, correct: 0 };
      current.total += 1;
      if (result.isCorrect) current.correct += 1;
      domainMap.set(result.domain, current);
    }
    
    return Array.from(domainMap.entries()).map(([domain, stats]) => ({
      domain,
      total: stats.total,
      correct: stats.correct,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }));
  }

  async getCorrectStreak(userId: string, examTrack?: string): Promise<{ current: number; best: number }> {
    const validDomains = examTrack === 'ps' 
      ? ['Legal Principles', 'Professional Survey Practices', 'Standards and Specifications', 'Business Practices', 'Areas of Practice']
      : ['Math & Basic Science', 'Field Data Acquisition', 'Mapping, GIS, and CAD', 'Boundary Law & PLSS', 'Surveying Principles', 'Survey Computations & Applications', 'Professional Practice', 'Applied Mathematics & Statistics'];
    
    const conditions = [eq(quizResults.userId, userId)];
    if (examTrack) {
      conditions.push(inArray(quizResults.domain, validDomains));
    }
    const results = await db
      .select()
      .from(quizResults)
      .where(and(...conditions))
      .orderBy(desc(quizResults.completedAt));
    
    let current = 0;
    let best = 0;
    let tempStreak = 0;
    
    for (let i = results.length - 1; i >= 0; i--) {
      if (results[i].isCorrect) {
        tempStreak++;
        best = Math.max(best, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
    
    for (const result of results) {
      if (result.isCorrect) {
        current++;
      } else {
        break;
      }
    }
    
    return { current, best };
  }

  // Quiz Session methods
  async getQuizSessions(userId: string, examTrack?: string): Promise<QuizSession[]> {
    const conditions = [eq(quizSessions.userId, userId)];
    if (examTrack) {
      conditions.push(eq(quizSessions.examTrack, examTrack));
    }
    return await db
      .select()
      .from(quizSessions)
      .where(and(...conditions))
      .orderBy(desc(quizSessions.completedAt));
  }

  async getQuizSessionsByDomain(userId: string, domain: string): Promise<QuizSession[]> {
    return await db
      .select()
      .from(quizSessions)
      .where(and(eq(quizSessions.userId, userId), eq(quizSessions.domain, domain)))
      .orderBy(desc(quizSessions.completedAt));
  }

  async getQuizSessionWithResults(sessionId: string): Promise<{ session: QuizSession; results: QuizResult[] } | undefined> {
    const [session] = await db
      .select()
      .from(quizSessions)
      .where(eq(quizSessions.id, sessionId));
    
    if (!session) return undefined;

    const results = await this.getQuizResultsBySession(sessionId);
    
    return { session, results };
  }

  async createQuizSession(session: InsertQuizSession): Promise<QuizSession> {
    const [created] = await db
      .insert(quizSessions)
      .values({ ...session, completedAt: new Date() })
      .returning();
    return created;
  }

  // Flashcard Mastery methods
  async getFlashcardMastery(userId: string, flashcardId: string): Promise<FlashcardMastery | undefined> {
    const [mastery] = await db
      .select()
      .from(flashcardMastery)
      .where(and(
        eq(flashcardMastery.userId, userId),
        eq(flashcardMastery.flashcardId, flashcardId)
      ));
    return mastery || undefined;
  }

  async getAllFlashcardMastery(userId: string): Promise<FlashcardMastery[]> {
    return await db
      .select()
      .from(flashcardMastery)
      .where(eq(flashcardMastery.userId, userId));
  }

  async upsertFlashcardMastery(mastery: InsertFlashcardMastery): Promise<FlashcardMastery> {
    console.log("[Storage] upsertFlashcardMastery called with:", mastery);
    const existing = await this.getFlashcardMastery(mastery.userId, mastery.flashcardId);
    console.log("[Storage] Existing record:", existing, "typeof:", typeof existing, "isArray:", Array.isArray(existing));
    
    // Check if existing is a valid object (not null, undefined, or array)
    const hasExisting = existing && typeof existing === 'object' && !Array.isArray(existing) && existing.id;
    console.log("[Storage] Has existing:", hasExisting);
    
    if (hasExisting) {
      console.log("[Storage] Updating existing record");
      const [updated] = await db
        .update(flashcardMastery)
        .set({
          masteryLevel: mastery.masteryLevel,
          reviewCount: (existing.reviewCount || 0) + 1,
          lastReviewedAt: new Date()
        })
        .where(and(
          eq(flashcardMastery.userId, mastery.userId),
          eq(flashcardMastery.flashcardId, mastery.flashcardId)
        ))
        .returning();
      console.log("[Storage] Updated record:", updated);
      return updated;
    } else {
      console.log("[Storage] Creating new record");
      const valuesToInsert = {
        ...mastery,
        reviewCount: 1,
        lastReviewedAt: new Date()
      };
      console.log("[Storage] Values to insert:", valuesToInsert);
      const result = await db
        .insert(flashcardMastery)
        .values(valuesToInsert)
        .returning();
      console.log("[Storage] Insert result:", result);
      const [created] = result;
      console.log("[Storage] Created record:", created);
      return created;
    }
  }

  async deleteAllFlashcardMastery(userId: string): Promise<void> {
    await db.delete(flashcardMastery).where(eq(flashcardMastery.userId, userId));
  }

  // Flashcard Feynman Mode methods
  async getFlashcardFeynmanScore(userId: string, flashcardId: string): Promise<FlashcardFeynmanScore | undefined> {
    const [score] = await db
      .select()
      .from(flashcardFeynmanScores)
      .where(and(
        eq(flashcardFeynmanScores.userId, userId),
        eq(flashcardFeynmanScores.flashcardId, flashcardId)
      ));
    return score || undefined;
  }

  async getAllFlashcardFeynmanScores(userId: string): Promise<FlashcardFeynmanScore[]> {
    return db
      .select()
      .from(flashcardFeynmanScores)
      .where(eq(flashcardFeynmanScores.userId, userId));
  }

  async upsertFlashcardFeynmanScore(score: InsertFlashcardFeynmanScore): Promise<FlashcardFeynmanScore> {
    const existing = await this.getFlashcardFeynmanScore(score.userId, score.flashcardId);
    
    if (existing) {
      const [updated] = await db
        .update(flashcardFeynmanScores)
        .set({
          explanation: score.explanation,
          clarityRating: score.clarityRating,
          updatedAt: new Date(),
        })
        .where(and(
          eq(flashcardFeynmanScores.userId, score.userId),
          eq(flashcardFeynmanScores.flashcardId, score.flashcardId)
        ))
        .returning();
      return updated;
    }
    
    const [created] = await db
      .insert(flashcardFeynmanScores)
      .values(score)
      .returning();
    return created;
  }

  // Flashcard Mnemonic methods
  async getFlashcardMnemonic(userId: string, flashcardId: string): Promise<FlashcardMnemonic | undefined> {
    const [mnemonic] = await db
      .select()
      .from(flashcardMnemonics)
      .where(and(
        eq(flashcardMnemonics.userId, userId),
        eq(flashcardMnemonics.flashcardId, flashcardId)
      ));
    return mnemonic || undefined;
  }

  async getAllFlashcardMnemonics(userId: string): Promise<FlashcardMnemonic[]> {
    return db
      .select()
      .from(flashcardMnemonics)
      .where(eq(flashcardMnemonics.userId, userId));
  }

  async upsertFlashcardMnemonic(mnemonic: InsertFlashcardMnemonic): Promise<FlashcardMnemonic> {
    const existing = await this.getFlashcardMnemonic(mnemonic.userId, mnemonic.flashcardId);
    
    if (existing) {
      const [updated] = await db
        .update(flashcardMnemonics)
        .set({ mnemonic: mnemonic.mnemonic })
        .where(and(
          eq(flashcardMnemonics.userId, mnemonic.userId),
          eq(flashcardMnemonics.flashcardId, mnemonic.flashcardId)
        ))
        .returning();
      return updated;
    }
    
    const [created] = await db
      .insert(flashcardMnemonics)
      .values(mnemonic)
      .returning();
    return created;
  }

  async deleteFlashcardMnemonic(userId: string, flashcardId: string): Promise<void> {
    await db
      .delete(flashcardMnemonics)
      .where(and(
        eq(flashcardMnemonics.userId, userId),
        eq(flashcardMnemonics.flashcardId, flashcardId)
      ));
  }

  // Flashcard Triad Drill methods
  async getFlashcardTriadProgress(userId: string, flashcardId: string): Promise<FlashcardTriadProgress | undefined> {
    const [progress] = await db
      .select()
      .from(flashcardTriadProgress)
      .where(and(
        eq(flashcardTriadProgress.userId, userId),
        eq(flashcardTriadProgress.flashcardId, flashcardId)
      ));
    return progress || undefined;
  }

  async getAllFlashcardTriadProgress(userId: string): Promise<FlashcardTriadProgress[]> {
    return db
      .select()
      .from(flashcardTriadProgress)
      .where(eq(flashcardTriadProgress.userId, userId));
  }

  async upsertFlashcardTriadProgress(progress: InsertFlashcardTriadProgress): Promise<FlashcardTriadProgress> {
    const existing = await this.getFlashcardTriadProgress(progress.userId, progress.flashcardId);
    
    if (existing) {
      const recallComplete = progress.recallComplete ?? existing.recallComplete;
      const applyComplete = progress.applyComplete ?? existing.applyComplete;
      const reverseComplete = progress.reverseComplete ?? existing.reverseComplete;
      const allComplete = recallComplete && applyComplete && reverseComplete;
      
      const [updated] = await db
        .update(flashcardTriadProgress)
        .set({
          recallComplete,
          applyComplete,
          reverseComplete,
          completedAt: allComplete ? new Date() : null,
          updatedAt: new Date(),
        })
        .where(and(
          eq(flashcardTriadProgress.userId, progress.userId),
          eq(flashcardTriadProgress.flashcardId, progress.flashcardId)
        ))
        .returning();
      return updated;
    }
    
    const [created] = await db
      .insert(flashcardTriadProgress)
      .values(progress)
      .returning();
    return created;
  }

  // Practice Exam methods
  async getPracticeExams(userId: string): Promise<PracticeExam[]> {
    return await db
      .select()
      .from(practiceExams)
      .where(eq(practiceExams.userId, userId))
      .orderBy(desc(practiceExams.completedAt));
  }

  async getLatestPracticeExam(userId: string): Promise<PracticeExam | undefined> {
    const exams = await this.getPracticeExams(userId);
    return exams[0];
  }

  async createPracticeExam(exam: InsertPracticeExam): Promise<PracticeExam> {
    const [created] = await db
      .insert(practiceExams)
      .values({ ...exam, completedAt: new Date() })
      .returning();
    return created;
  }

  async getPracticeExamWithResults(examId: string): Promise<{ exam: PracticeExam; results: PracticeExamResult[] } | undefined> {
    const [exam] = await db
      .select()
      .from(practiceExams)
      .where(eq(practiceExams.id, examId));
    
    if (!exam) return undefined;

    const results = await db
      .select()
      .from(practiceExamResults)
      .where(eq(practiceExamResults.examId, examId));
    
    return { exam, results };
  }

  async createPracticeExamResult(result: InsertPracticeExamResult): Promise<PracticeExamResult> {
    const [created] = await db
      .insert(practiceExamResults)
      .values(result)
      .returning();
    return created;
  }

  // Study Notes methods (enhanced with multi-page support)
  async getStudyNote(userId: string, noteId: string): Promise<StudyNote | undefined> {
    const [note] = await db
      .select()
      .from(studyNotes)
      .where(and(eq(studyNotes.userId, userId), eq(studyNotes.id, noteId)));
    return note || undefined;
  }

  async getAllStudyNotes(userId: string): Promise<StudyNote[]> {
    return await db
      .select()
      .from(studyNotes)
      .where(eq(studyNotes.userId, userId))
      .orderBy(desc(studyNotes.updatedAt));
  }

  async getStudyNotesByWeek(userId: string, week: number): Promise<StudyNote[]> {
    return await db
      .select()
      .from(studyNotes)
      .where(and(eq(studyNotes.userId, userId), eq(studyNotes.week, week)))
      .orderBy(desc(studyNotes.updatedAt));
  }

  async getStudyNotesByDay(userId: string, week: number, dayOfWeek: string): Promise<StudyNote[]> {
    return await db
      .select()
      .from(studyNotes)
      .where(and(
        eq(studyNotes.userId, userId),
        eq(studyNotes.week, week),
        eq(studyNotes.dayOfWeek, dayOfWeek)
      ))
      .orderBy(desc(studyNotes.updatedAt));
  }

  async createStudyNote(note: InsertStudyNote): Promise<StudyNote> {
    const [created] = await db
      .insert(studyNotes)
      .values({ ...note, createdAt: new Date(), updatedAt: new Date() })
      .returning();
    return created;
  }

  async updateStudyNote(userId: string, noteId: string, updates: Partial<InsertStudyNote>): Promise<StudyNote> {
    const [updated] = await db
      .update(studyNotes)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(studyNotes.userId, userId), eq(studyNotes.id, noteId)))
      .returning();
    return updated;
  }

  async deleteStudyNote(userId: string, noteId: string): Promise<void> {
    await db
      .delete(studyNotes)
      .where(and(eq(studyNotes.userId, userId), eq(studyNotes.id, noteId)));
  }

  // Reading Progress methods (Comprehension Checkpoint)
  async getReadingProgress(userId: string, week: number, examTrack?: string): Promise<ReadingProgress[]> {
    const conditions = [eq(readingProgress.userId, userId), eq(readingProgress.week, week)];
    if (examTrack) {
      conditions.push(eq(readingProgress.examTrack, examTrack));
    }
    return await db
      .select()
      .from(readingProgress)
      .where(and(...conditions));
  }

  async getAllReadingProgress(userId: string, examTrack?: string): Promise<ReadingProgress[]> {
    const conditions = [eq(readingProgress.userId, userId)];
    if (examTrack) {
      conditions.push(eq(readingProgress.examTrack, examTrack));
    }
    return await db
      .select()
      .from(readingProgress)
      .where(and(...conditions));
  }

  async upsertReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress> {
    const trackFilter = progress.examTrack || 'fs';
    const existing = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, progress.userId),
          eq(readingProgress.week, progress.week),
          eq(readingProgress.chapterIndex, progress.chapterIndex),
          eq(readingProgress.examTrack, trackFilter)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // IMMUTABLE: Never reset completedAt once set (prevents XP farming via toggle)
      // Only set completedAt if completing for the first time
      const shouldSetCompletedAt = progress.completed && !existing[0].completedAt;
      
      const [updated] = await db
        .update(readingProgress)
        .set({
          completed: progress.completed,
          confidenceRating: progress.confidenceRating,
          takeawayNote: progress.takeawayNote,
          // Preserve existing completedAt, only set on first completion
          completedAt: shouldSetCompletedAt ? new Date() : existing[0].completedAt,
          updatedAt: new Date(),
        })
        .where(eq(readingProgress.id, existing[0].id))
        .returning();
      return updated;
    }

    const [created] = await db
      .insert(readingProgress)
      .values({
        ...progress,
        completedAt: progress.completed ? new Date() : null,
      })
      .returning();
    return created;
  }

  // APPLY Challenge Attempts methods (Scenario Lab)
  async getApplyChallengeAttempts(userId: string, week?: number, examTrack?: string): Promise<ApplyChallengeAttempt[]> {
    const conditions: any[] = [eq(applyChallengeAttempts.userId, userId)];
    if (week !== undefined) {
      conditions.push(eq(applyChallengeAttempts.week, week));
    }
    if (examTrack) {
      conditions.push(eq(applyChallengeAttempts.examTrack, examTrack));
    }
    return await db
      .select()
      .from(applyChallengeAttempts)
      .where(and(...conditions))
      .orderBy(desc(applyChallengeAttempts.startedAt));
  }

  async createApplyChallengeAttempt(attempt: InsertApplyChallengeAttempt): Promise<ApplyChallengeAttempt> {
    const [created] = await db
      .insert(applyChallengeAttempts)
      .values({ ...attempt, startedAt: new Date() })
      .returning();
    return created;
  }

  async updateApplyChallengeAttempt(userId: string, attemptId: string, updates: Partial<InsertApplyChallengeAttempt>): Promise<ApplyChallengeAttempt> {
    const [updated] = await db
      .update(applyChallengeAttempts)
      .set({ ...updates, completedAt: updates.completedAt || new Date() })
      .where(and(eq(applyChallengeAttempts.id, attemptId), eq(applyChallengeAttempts.userId, userId)))
      .returning();
    return updated;
  }

  // REINFORCE Retention Reviews methods (Spaced Repetition)
  async getRetentionReviews(userId: string, week?: number, examTrack?: string): Promise<RetentionReview[]> {
    const conditions: any[] = [eq(retentionReviews.userId, userId)];
    if (week !== undefined) {
      conditions.push(eq(retentionReviews.week, week));
    }
    if (examTrack) {
      conditions.push(eq(retentionReviews.examTrack, examTrack));
    }
    return await db
      .select()
      .from(retentionReviews)
      .where(and(...conditions))
      .orderBy(desc(retentionReviews.createdAt));
  }

  async getRetentionReviewById(reviewId: string): Promise<RetentionReview | null> {
    const [review] = await db
      .select()
      .from(retentionReviews)
      .where(eq(retentionReviews.id, reviewId))
      .limit(1);
    return review || null;
  }

  async getDueRetentionReviews(userId: string, week?: number, examTrack?: string): Promise<RetentionReview[]> {
    const now = new Date();
    const conditions: any[] = [
      eq(retentionReviews.userId, userId),
      sql`${retentionReviews.nextReviewAt} IS NULL OR ${retentionReviews.nextReviewAt} <= ${now}`
    ];
    if (week !== undefined) {
      conditions.push(eq(retentionReviews.week, week));
    }
    if (examTrack) {
      conditions.push(eq(retentionReviews.examTrack, examTrack));
    }
    return await db
      .select()
      .from(retentionReviews)
      .where(and(...conditions))
      .orderBy(retentionReviews.nextReviewAt);
  }

  async createRetentionReview(review: InsertRetentionReview): Promise<RetentionReview> {
    const [created] = await db
      .insert(retentionReviews)
      .values({ ...review, createdAt: new Date() })
      .returning();
    return created;
  }

  async updateRetentionReview(userId: string, reviewId: string, updates: Partial<InsertRetentionReview>): Promise<RetentionReview> {
    const [updated] = await db
      .update(retentionReviews)
      .set(updates)
      .where(and(eq(retentionReviews.id, reviewId), eq(retentionReviews.userId, userId)))
      .returning();
    return updated;
  }

  async getRetentionStats(userId: string, week?: number, examTrack?: string): Promise<{ totalReviews: number; dueToday: number; averageMastery: number; retentionScore: number }> {
    const allReviews = await this.getRetentionReviews(userId, week, examTrack);
    const dueReviews = await this.getDueRetentionReviews(userId, week, examTrack);
    
    if (allReviews.length === 0) {
      return { totalReviews: 0, dueToday: 0, averageMastery: 0, retentionScore: 100 };
    }

    const totalMastery = allReviews.reduce((sum, r) => sum + r.masteryLevel, 0);
    const averageMastery = totalMastery / allReviews.length;
    
    const now = Date.now();
    let totalRetention = 0;
    for (const review of allReviews) {
      if (!review.lastReviewedAt) {
        totalRetention += 0;
      } else {
        const daysSinceReview = (now - new Date(review.lastReviewedAt).getTime()) / (1000 * 60 * 60 * 24);
        const expectedInterval = review.intervalDays || 1;
        if (daysSinceReview <= expectedInterval) {
          totalRetention += 100;
        } else {
          const overdueDays = daysSinceReview - expectedInterval;
          const decayRate = 0.5;
          const retention = Math.pow(decayRate, overdueDays / expectedInterval) * 100;
          totalRetention += Math.min(100, Math.max(0, retention));
        }
      }
    }
    const retentionScore = Math.round(totalRetention / allReviews.length);

    return {
      totalReviews: allReviews.length,
      dueToday: dueReviews.length,
      averageMastery: Math.round(averageMastery * 10) / 10,
      retentionScore
    };
  }

  // Daily Activity methods
  async getDailyActivity(userId: string, days: number): Promise<DailyActivity[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

    return await db
      .select()
      .from(dailyActivity)
      .where(and(
        eq(dailyActivity.userId, userId),
        gte(dailyActivity.date, cutoffDateStr)
      ))
      .orderBy(desc(dailyActivity.date));
  }

  async logDailyActivity(userId: string, activityType: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    // Use atomic upsert with array_append to prevent race conditions
    // The unique index on (userId, date) ensures only one row per user per day
    await db.execute(sql`
      INSERT INTO daily_activity (id, user_id, date, activity_types, created_at)
      VALUES (gen_random_uuid(), ${userId}, ${today}, ARRAY[${activityType}]::text[], NOW())
      ON CONFLICT (user_id, date)
      DO UPDATE SET activity_types = 
        CASE 
          WHEN ${activityType} = ANY(daily_activity.activity_types) THEN daily_activity.activity_types
          ELSE array_append(daily_activity.activity_types, ${activityType})
        END
    `);
  }

  async calculateStreak(userId: string): Promise<StudyStreak> {
    const allActivity = await db
      .select()
      .from(dailyActivity)
      .where(eq(dailyActivity.userId, userId))
      .orderBy(desc(dailyActivity.date));

    if (allActivity.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: ''
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Calculate current streak
    const latestDate = allActivity[0].date;
    if (latestDate === today || latestDate === yesterdayStr) {
      let expectedDate = new Date(latestDate);
      for (const activity of allActivity) {
        const activityDate = activity.date;
        if (activityDate === expectedDate.toISOString().split('T')[0]) {
          currentStreak++;
          tempStreak++;
          expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    tempStreak = 1;
    let previousDate = new Date(allActivity[0].date);
    
    for (let i = 1; i < allActivity.length; i++) {
      const currentDate = new Date(allActivity[i].date);
      const dayDiff = Math.floor((previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
      previousDate = currentDate;
    }

    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    return {
      currentStreak,
      longestStreak,
      lastStudyDate: allActivity[0].date
    };
  }

  // Achievement methods
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId))
      .orderBy(desc(achievements.earnedAt));
  }

  async awardAchievement(userId: string, achievementType: AchievementType): Promise<Achievement | null> {
    // Check if achievement already earned
    const [existing] = await db
      .select()
      .from(achievements)
      .where(and(
        eq(achievements.userId, userId),
        eq(achievements.achievementType, achievementType)
      ));

    if (existing) {
      return null; // Already earned
    }

    // Award new achievement
    const [achievement] = await db
      .insert(achievements)
      .values({
        userId,
        achievementType
      })
      .returning();

    return achievement;
  }

  async checkAndAwardAchievements(userId: string): Promise<Achievement[]> {
    const newAchievements: Achievement[] = [];

    // Get user data
    const [weekProgressData, quizResults, flashcardData, practiceExams, streak] = await Promise.all([
      this.getAllWeekProgress(userId),
      this.getQuizResults(userId),
      this.getAllFlashcardMastery(userId),
      this.getPracticeExams(userId),
      this.calculateStreak(userId)
    ]);

    // Check Week 1 Complete
    const week1 = weekProgressData.find(w => w.week === 1);
    if (week1 && (
      week1.readCompleted.length > 0 ||
      week1.focusCompleted.length > 0 ||
      week1.applyCompleted.length > 0 ||
      week1.reinforceCompleted.length > 0
    )) {
      const achievement = await this.awardAchievement(userId, 'week_1_complete');
      if (achievement) newAchievements.push(achievement);
    }

    // Check Week 8 Complete (Halfway)
    const week8 = weekProgressData.find(w => w.week === 8);
    if (week8 && (
      week8.readCompleted.length > 0 ||
      week8.focusCompleted.length > 0 ||
      week8.applyCompleted.length > 0 ||
      week8.reinforceCompleted.length > 0
    )) {
      const achievement = await this.awardAchievement(userId, 'week_8_complete');
      if (achievement) newAchievements.push(achievement);
    }

    // Check All Weeks Complete
    const completedWeeks = weekProgressData.filter(w => {
      const allCompleted = [
        ...w.readCompleted,
        ...w.focusCompleted,
        ...w.applyCompleted,
        ...w.reinforceCompleted
      ];
      return allCompleted.length > 0;
    });
    if (completedWeeks.length >= 16) {
      const achievement = await this.awardAchievement(userId, 'all_weeks_complete');
      if (achievement) newAchievements.push(achievement);
    }

    // Check Quiz Master (85%+ accuracy with at least 50 questions)
    if (quizResults.length >= 50) {
      const correctAnswers = quizResults.filter(r => r.isCorrect).length;
      const accuracy = (correctAnswers / quizResults.length) * 100;
      if (accuracy >= 85) {
        const achievement = await this.awardAchievement(userId, 'quiz_master');
        if (achievement) newAchievements.push(achievement);
      }
    }

    // Check Perfect Quiz (100% accuracy on a quiz session)
    const sessions = await this.getQuizSessions(userId);
    const perfectSession = sessions.find(s => s.correctAnswers === s.totalQuestions && s.totalQuestions >= 10);
    if (perfectSession) {
      const achievement = await this.awardAchievement(userId, 'perfect_quiz');
      if (achievement) newAchievements.push(achievement);
    }

    // Check Flashcard Champion (50+ cards mastered)
    const masteredCards = flashcardData.filter(f => f.masteryLevel >= 4);
    if (masteredCards.length >= 50) {
      const achievement = await this.awardAchievement(userId, 'flashcard_champion');
      if (achievement) newAchievements.push(achievement);
    }

    // Check Practice Exam Pro (completed at least one full exam)
    if (practiceExams.length >= 1) {
      const achievement = await this.awardAchievement(userId, 'practice_exam_pro');
      if (achievement) newAchievements.push(achievement);
    }

    // Check Streak achievements
    if (streak.currentStreak >= 7) {
      const achievement = await this.awardAchievement(userId, 'streak_7_days');
      if (achievement) newAchievements.push(achievement);
    }
    if (streak.currentStreak >= 14) {
      const achievement = await this.awardAchievement(userId, 'streak_14_days');
      if (achievement) newAchievements.push(achievement);
    }
    if (streak.currentStreak >= 30) {
      const achievement = await this.awardAchievement(userId, 'streak_30_days');
      if (achievement) newAchievements.push(achievement);
    }

    return newAchievements;
  }

  // Custom Week methods
  async getCustomWeeks(userId: string): Promise<CustomWeek[]> {
    return await db
      .select()
      .from(customWeeks)
      .where(eq(customWeeks.userId, userId))
      .orderBy(customWeeks.weekNumber);
  }

  async createCustomWeek(customWeek: InsertCustomWeek): Promise<CustomWeek> {
    const [created] = await db
      .insert(customWeeks)
      .values(customWeek)
      .returning();
    return created;
  }

  async deleteCustomWeek(userId: string, id: string): Promise<void> {
    await db
      .delete(customWeeks)
      .where(and(
        eq(customWeeks.userId, userId),
        eq(customWeeks.id, id)
      ));
  }

  // Quiz Draft methods (for resume functionality)
  async getActiveQuizDraft(userId: string, examTrack?: string): Promise<QuizDraft | undefined> {
    const conditions = [eq(quizDrafts.userId, userId)];
    if (examTrack) {
      conditions.push(eq(quizDrafts.examTrack, examTrack));
    }
    const [draft] = await db
      .select()
      .from(quizDrafts)
      .where(and(...conditions))
      .orderBy(desc(quizDrafts.startedAt))
      .limit(1);
    return draft || undefined;
  }

  async saveQuizDraft(draftData: InsertQuizDraft): Promise<QuizDraft> {
    await this.deleteQuizDraft(draftData.userId, draftData.examTrack);
    
    const [draft] = await db
      .insert(quizDrafts)
      .values(draftData)
      .returning();
    return draft;
  }

  async deleteQuizDraft(userId: string, examTrack?: string): Promise<void> {
    const conditions = [eq(quizDrafts.userId, userId)];
    if (examTrack) {
      conditions.push(eq(quizDrafts.examTrack, examTrack));
    }
    await db
      .delete(quizDrafts)
      .where(and(...conditions));
  }

  // Exam Draft methods (for resume functionality)
  async getActiveExamDraft(userId: string): Promise<ExamDraft | undefined> {
    const [draft] = await db
      .select()
      .from(examDrafts)
      .where(eq(examDrafts.userId, userId))
      .orderBy(desc(examDrafts.startedAt))
      .limit(1);
    return draft || undefined;
  }

  async saveExamDraft(draftData: InsertExamDraft): Promise<ExamDraft> {
    // Delete any existing draft for this user first (one draft at a time)
    await this.deleteExamDraft(draftData.userId);
    
    const [draft] = await db
      .insert(examDrafts)
      .values(draftData)
      .returning();
    return draft;
  }

  async deleteExamDraft(userId: string): Promise<void> {
    await db
      .delete(examDrafts)
      .where(eq(examDrafts.userId, userId));
  }

  // Pretest methods
  async getLatestPretestResult(userId: string): Promise<PretestResult | undefined> {
    const [result] = await db
      .select()
      .from(pretestResults)
      .where(eq(pretestResults.userId, userId))
      .orderBy(desc(pretestResults.completedAt))
      .limit(1);
    return result || undefined;
  }

  async savePretestResult(resultData: InsertPretestResult): Promise<PretestResult> {
    const [result] = await db
      .insert(pretestResults)
      .values(resultData)
      .returning();
    return result;
  }

  async getPretestWithResults(pretestId: string): Promise<{ pretest: PretestResult; results: PretestQuestionResult[] } | undefined> {
    const [pretest] = await db
      .select()
      .from(pretestResults)
      .where(eq(pretestResults.id, pretestId));
    
    if (!pretest) return undefined;

    const results = await db
      .select()
      .from(pretestQuestionResults)
      .where(eq(pretestQuestionResults.pretestId, pretestId));
    
    return { pretest, results };
  }

  async createPretestQuestionResult(result: InsertPretestQuestionResult): Promise<PretestQuestionResult> {
    const [created] = await db
      .insert(pretestQuestionResults)
      .values(result)
      .returning();
    return created;
  }

  // User Preferences methods
  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    const [prefs] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));
    return prefs || undefined;
  }

  async upsertUserPreferences(prefsData: InsertUserPreferences): Promise<UserPreferences> {
    const [prefs] = await db
      .insert(userPreferences)
      .values(prefsData)
      .onConflictDoUpdate({
        target: userPreferences.userId,
        set: {
          ...prefsData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return prefs;
  }

  // Daily Log methods
  async getDailyLogs(userId: string): Promise<DailyLog[]> {
    const logs = await db
      .select()
      .from(dailyLogs)
      .where(eq(dailyLogs.userId, userId))
      .orderBy(desc(dailyLogs.date));
    return logs;
  }

  async getDailyLog(userId: string, id: string): Promise<DailyLog | undefined> {
    const [log] = await db
      .select()
      .from(dailyLogs)
      .where(and(eq(dailyLogs.id, id), eq(dailyLogs.userId, userId)));
    return log || undefined;
  }

  async createDailyLog(logData: InsertDailyLog): Promise<DailyLog> {
    const [log] = await db
      .insert(dailyLogs)
      .values(logData)
      .returning();
    
    // Also create/update dailyActivity for streak tracking
    const dateStr = new Date(logData.date).toISOString().split('T')[0];
    const existingActivity = await db
      .select()
      .from(dailyActivity)
      .where(and(
        eq(dailyActivity.userId, logData.userId),
        eq(dailyActivity.date, dateStr)
      ))
      .limit(1);
    
    if (existingActivity.length === 0) {
      await db.insert(dailyActivity).values({
        userId: logData.userId,
        date: dateStr,
      });
    }
    
    return log;
  }

  async updateDailyLog(userId: string, id: string, logData: Partial<InsertDailyLog>): Promise<DailyLog> {
    const [log] = await db
      .update(dailyLogs)
      .set({
        ...logData,
        updatedAt: new Date(),
      })
      .where(and(eq(dailyLogs.id, id), eq(dailyLogs.userId, userId)))
      .returning();
    return log;
  }

  async deleteDailyLog(userId: string, id: string): Promise<void> {
    await db
      .delete(dailyLogs)
      .where(and(eq(dailyLogs.id, id), eq(dailyLogs.userId, userId)));
  }

  // Study Cycle methods
  async getStudyCycles(userId: string): Promise<StudyCycle[]> {
    const cycles = await db
      .select()
      .from(studyCycles)
      .where(eq(studyCycles.userId, userId))
      .orderBy(desc(studyCycles.cycleNumber));
    return cycles;
  }

  async getCurrentStudyCycle(userId: string): Promise<StudyCycle | undefined> {
    // Get user preferences to check current cycle number
    const prefs = await this.getUserPreferences(userId);
    const currentCycleNumber = prefs?.currentCycle || 1;

    // Find the active cycle (one without completedAt)
    const [cycle] = await db
      .select()
      .from(studyCycles)
      .where(
        and(
          eq(studyCycles.userId, userId),
          eq(studyCycles.cycleNumber, currentCycleNumber)
        )
      );

    // If no cycle exists for this number, create one
    if (!cycle) {
      const [newCycle] = await db
        .insert(studyCycles)
        .values({
          userId,
          cycleNumber: currentCycleNumber,
        })
        .returning();
      return newCycle;
    }

    return cycle || undefined;
  }

  async completeCurrentCycle(userId: string): Promise<StudyCycle> {
    const currentCycle = await this.getCurrentStudyCycle(userId);
    if (!currentCycle) {
      throw new Error("No active cycle found");
    }

    const cycleStartDate = new Date(currentCycle.startedAt);

    // Calculate completion stats from week progress
    const weekProgressData = await this.getAllWeekProgress(userId);
    // Count total checklist items completed
    const totalCompleted = weekProgressData.reduce((sum, week) => {
      return sum + 
        week.readCompleted.length + 
        week.focusCompleted.length + 
        week.applyCompleted.length + 
        week.reinforceCompleted.length;
    }, 0);
    
    // For 16 weeks, assume ~4 items per section average = 256 total items
    // This is approximate - adjust based on actual study plan structure
    const estimatedMaxItems = 256; 
    const completionPercentage = Math.min(100, Math.round((totalCompleted / estimatedMaxItems) * 100));

    // Calculate study time from daily logs DURING THIS CYCLE
    const allLogs = await this.getDailyLogs(userId);
    const cycleLogS = allLogs.filter(log => new Date(log.date) >= cycleStartDate);
    const totalStudyMinutes = cycleLogS.reduce((sum, log) => sum + (log.timeSpent || 0), 0);

    // Count quizzes DURING THIS CYCLE
    const allQuizzes = await this.getQuizSessions(userId);
    const cycleQuizzes = allQuizzes.filter(quiz => new Date(quiz.completedAt) >= cycleStartDate);

    // Count exams DURING THIS CYCLE
    const allExams = await this.getPracticeExams(userId);
    const cycleExams = allExams.filter(exam => new Date(exam.completedAt) >= cycleStartDate);

    // Update cycle as completed
    const [completedCycle] = await db
      .update(studyCycles)
      .set({
        completedAt: new Date(),
        completionPercentage,
        totalStudyMinutes,
        quizzesTaken: cycleQuizzes.length,
        examsTaken: cycleExams.length,
      })
      .where(eq(studyCycles.id, currentCycle.id))
      .returning();

    return completedCycle;
  }

  async startNewCycle(userId: string): Promise<StudyCycle> {
    // Complete current cycle first
    await this.completeCurrentCycle(userId);

    // Get current preferences
    const prefs = await this.getUserPreferences(userId);
    const newCycleNumber = (prefs?.currentCycle || 1) + 1;

    // Update user preferences with new cycle number
    await this.upsertUserPreferences({
      userId,
      currentCycle: newCycleNumber,
    });

    // Reset week progress (clear all checkboxes for fresh start)
    const existingProgress = await this.getAllWeekProgress(userId);
    for (const progress of existingProgress) {
      await db
        .update(weekProgress)
        .set({
          readCompleted: [],
          focusCompleted: [],
          applyCompleted: [],
          reinforceCompleted: [],
          updatedAt: new Date(),
        })
        .where(eq(weekProgress.id, progress.id));
    }

    // Create new cycle record
    const [newCycle] = await db
      .insert(studyCycles)
      .values({
        userId,
        cycleNumber: newCycleNumber,
      })
      .returning();

    return newCycle;
  }

  // Interactive Lesson methods
  async getLessonsByDomain(domainNumber: number, examTrack: string = 'fs'): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(and(eq(lessons.domainNumber, domainNumber), eq(lessons.examTrack, examTrack)))
      .orderBy(lessons.orderIndex);
  }

  async getLessonsByWeek(week: number, examTrack: string = 'fs'): Promise<Lesson[]> {
    // For backward compatibility and Standard mode
    return await db
      .select()
      .from(lessons)
      .where(and(eq(lessons.suggestedWeek, week), eq(lessons.examTrack, examTrack)))
      .orderBy(lessons.orderIndex);
  }

  async getAllLessons(examTrack?: string): Promise<Lesson[]> {
    if (examTrack) {
      return await db
        .select()
        .from(lessons)
        .where(eq(lessons.examTrack, examTrack))
        .orderBy(lessons.domainNumber, lessons.orderIndex);
    }
    return await db
      .select()
      .from(lessons)
      .orderBy(lessons.examTrack, lessons.domainNumber, lessons.orderIndex);
  }

  async getLessonWithQuestions(lessonId: string): Promise<{ lesson: Lesson; questions: LessonQuestion[] } | undefined> {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId));

    if (!lesson) return undefined;

    const questions = await db
      .select()
      .from(lessonQuestions)
      .where(eq(lessonQuestions.lessonId, lessonId))
      .orderBy(lessonQuestions.orderIndex);

    return { lesson, questions };
  }

  async getQuestionsByIds(questionIds: string[]): Promise<LessonQuestion[]> {
    if (questionIds.length === 0) return [];
    
    const questions = await db
      .select()
      .from(lessonQuestions)
      .where(inArray(lessonQuestions.id, questionIds));
    
    // Preserve the order of questionIds
    const questionMap = new Map(questions.map(q => [q.id, q]));
    return questionIds.map(id => questionMap.get(id)).filter((q): q is LessonQuestion => q !== undefined);
  }

  async getLessonWithRandomizedQuestions(userId: string, lessonId: string): Promise<{ lesson: Lesson; questions: LessonQuestion[] } | undefined> {
    console.log(`[Storage] getLessonWithRandomizedQuestions called with lessonId: ${lessonId}`);
    
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId));

    if (!lesson) {
      console.log(`[Storage] Lesson not found for ID: ${lessonId}`);
      return undefined;
    }
    
    console.log(`[Storage] Found lesson: ${lesson.title}`);

    // Get all question variations for this lesson
    const allQuestions = await db
      .select()
      .from(lessonQuestions)
      .where(eq(lessonQuestions.lessonId, lessonId))
      .orderBy(lessonQuestions.orderIndex, lessonQuestions.variationNumber);

    // Safety check: if no questions found, return empty
    if (allQuestions.length === 0) {
      return { lesson, questions: [] };
    }

    // Get user's lesson progress to see which variations they've already seen
    const progress = await this.getLessonProgress(userId, lessonId);
    const seenVariations = (progress?.seenQuestionVariations as Record<string, string[]>) || {};

    // Group questions by variationGroup
    const questionGroups: Map<number, LessonQuestion[]> = new Map();
    allQuestions.forEach(q => {
      const group = questionGroups.get(q.variationGroup) || [];
      group.push(q);
      questionGroups.set(q.variationGroup, group);
    });

    // Safety check: if grouping failed or all questions have same group, fall back to ordered list
    if (questionGroups.size === 1 && questionGroups.has(1) && allQuestions.length > 1) {
      // This likely means variation_group wasn't properly set (all defaulted to 1)
      // Fall back to returning all questions in order to prevent breaking lessons
      console.warn(`Lesson ${lessonId}: All questions have variationGroup=1. Falling back to full question list.`);
      return { lesson, questions: allQuestions };
    }

    // For each group, select one variation (prioritize unseen)
    const selectedQuestions: LessonQuestion[] = [];
    
    questionGroups.forEach((variations, groupNum) => {
      const groupKey = groupNum.toString();
      const seenIds = seenVariations[groupKey] || [];
      
      // Filter to unseen variations, or use all if all have been seen
      let availableVariations = variations.filter(v => !seenIds.includes(v.id));
      if (availableVariations.length === 0) {
        // All variations seen, reset and use all
        availableVariations = variations;
      }
      
      // Randomly select one variation
      const randomIndex = Math.floor(Math.random() * availableVariations.length);
      selectedQuestions.push(availableVariations[randomIndex]);
    });

    // Sort selected questions by their original orderIndex
    selectedQuestions.sort((a, b) => a.orderIndex - b.orderIndex);

    return { lesson, questions: selectedQuestions };
  }

  async getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | undefined> {
    const [progress] = await db
      .select()
      .from(lessonProgress)
      .where(and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.lessonId, lessonId)
      ));
    return progress || undefined;
  }

  async getAllLessonProgress(userId: string, examTrack?: string): Promise<LessonProgress[]> {
    const allProgress = await db
      .select()
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, userId));
    
    // If examTrack is specified, filter to only lessons belonging to that exam
    if (examTrack) {
      const examLessons = await this.getAllLessons(examTrack);
      const examLessonIds = new Set(examLessons.map(l => l.id));
      return allProgress.filter(p => examLessonIds.has(p.lessonId));
    }
    
    return allProgress;
  }

  async upsertLessonProgress(progressData: InsertLessonProgress): Promise<LessonProgress> {
    const operationId = Date.now().toString(36);
    console.log(`[Storage:${operationId}] upsertLessonProgress ENTRY`, JSON.stringify({
      userId: progressData.userId,
      lessonId: progressData.lessonId,
      completed: progressData.completed,
      score: progressData.score,
      totalPoints: progressData.totalPoints,
      attempts: progressData.attempts,
    }));
    
    try {
      if (!progressData.userId || typeof progressData.userId !== 'string') {
        throw new Error(`Invalid userId: ${progressData.userId}`);
      }
      if (!progressData.lessonId || typeof progressData.lessonId !== 'string') {
        throw new Error(`Invalid lessonId: ${progressData.lessonId}`);
      }
      
      const savedProgress = await db.transaction(async (tx) => {
        const [existing] = await tx
          .select()
          .from(lessonProgress)
          .where(and(
            eq(lessonProgress.userId, progressData.userId),
            eq(lessonProgress.lessonId, progressData.lessonId)
          ));
        
        console.log(`[Storage:${operationId}] Existing record check: ${existing ? 'FOUND id=' + existing.id : 'NOT_FOUND'}`);

        if (existing) {
          console.log(`[Storage:${operationId}] Executing UPDATE...`);
          const result = await tx
            .update(lessonProgress)
            .set({
              completed: progressData.completed,
              score: progressData.score,
              totalPoints: progressData.totalPoints,
              attempts: progressData.attempts,
              timeSpentSeconds: progressData.timeSpentSeconds,
              seenQuestionVariations: progressData.seenQuestionVariations,
              lastAttemptAt: progressData.lastAttemptAt,
              completedAt: progressData.completedAt,
            })
            .where(and(
              eq(lessonProgress.userId, progressData.userId),
              eq(lessonProgress.lessonId, progressData.lessonId)
            ))
            .returning();
          
          if (!result || result.length === 0) {
            throw new Error(`UPDATE returned 0 rows for userId=${progressData.userId}, lessonId=${progressData.lessonId}`);
          }
          
          console.log(`[Storage:${operationId}] UPDATE SUCCESS: id=${result[0].id}, rows=${result.length}`);
          return result[0];
        } else {
          console.log(`[Storage:${operationId}] Executing INSERT...`);
          const result = await tx
            .insert(lessonProgress)
            .values(progressData)
            .returning();
          
          if (!result || result.length === 0) {
            throw new Error(`INSERT returned 0 rows for userId=${progressData.userId}, lessonId=${progressData.lessonId}`);
          }
          
          console.log(`[Storage:${operationId}] INSERT SUCCESS: id=${result[0].id}, rows=${result.length}`);
          return result[0];
        }
      });
      
      console.log(`[Storage:${operationId}] upsertLessonProgress EXIT SUCCESS: id=${savedProgress.id}`);
      return savedProgress;
    } catch (error: any) {
      console.error(`[Storage:${operationId}] ERROR:`, {
        message: error?.message,
        code: error?.code,
        detail: error?.detail,
        stack: error?.stack?.split('\n').slice(0, 3).join('\n'),
      });
      const wrappedError = new Error(`Failed to save lesson progress: ${error?.message || 'Unknown error'}`);
      (wrappedError as any).cause = error;
      throw wrappedError;
    }
  }

  async createLesson(lessonData: InsertLesson): Promise<Lesson> {
    const [lesson] = await db
      .insert(lessons)
      .values(lessonData)
      .returning();
    return lesson;
  }

  async createLessonQuestion(questionData: InsertLessonQuestion): Promise<LessonQuestion> {
    const [question] = await db
      .insert(lessonQuestions)
      .values(questionData)
      .returning();
    return question;
  }

  // Domain mastery tracking with comprehensive progress from all activity sources
  async getDomainMastery(userId: string, examTrack: string = 'fs'): Promise<Array<{
    domainNumber: number;
    domain: string;
    currentScore: number;
    lessonsCompleted: number;
    lessonsTotal: number;
    lessonProgress: number;
    quizAccuracy: number;
    questionsAnswered: number;
    flashcardMasteryPct: number;
    challengeAccuracy: number;
    examAccuracy: number;
    retentionScore: number;
    readingProgress: number;
    applyScore: number;
    overallProgress: number;
    isStagnant: boolean;
    alert?: string;
    sources: string[];
  }>> {
    const result: Array<any> = [];
    
    const allLessons = await db.select()
      .from(lessons)
      .where(eq(lessons.examTrack, examTrack));
    
    const domainMap = new Map<number, string>();
    allLessons.forEach(l => {
      if (!domainMap.has(l.domainNumber)) {
        domainMap.set(l.domainNumber, l.domain);
      }
    });
    
    const domainNumbers = Array.from(domainMap.keys()).sort((a, b) => a - b);
    
    const userLessonProg = await db.select()
      .from(lessonProgress)
      .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
      .where(and(
        eq(lessonProgress.userId, userId),
        eq(lessons.examTrack, examTrack)
      ));
    
    const allQuizResults = await db.select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId));

    const allFlashcardMastery = await db.select()
      .from(flashcardMastery)
      .where(eq(flashcardMastery.userId, userId));

    const { FLASHCARDS } = await import('@shared/data/flashcards');
    const trackFlashcards = FLASHCARDS.filter(f => f.examTrack === examTrack);
    const flashcardIdToDomain = new Map<string, string>();
    trackFlashcards.forEach((f, i) => {
      flashcardIdToDomain.set(`comp-card-${i}`, f.domain);
      flashcardIdToDomain.set(`card-${i}`, f.domain);
    });

    const allChallengeSessions = await db.select()
      .from(flashcardChallengeSessions)
      .where(and(
        eq(flashcardChallengeSessions.userId, userId),
        eq(flashcardChallengeSessions.examTrack, examTrack)
      ));

    const allExams = await db.select()
      .from(practiceExams)
      .where(eq(practiceExams.userId, userId));

    const allRetention = await db.select()
      .from(retentionReviews)
      .where(and(
        eq(retentionReviews.userId, userId),
        eq(retentionReviews.examTrack, examTrack)
      ));

    const allApply = await db.select()
      .from(applyChallengeAttempts)
      .where(and(
        eq(applyChallengeAttempts.userId, userId),
        eq(applyChallengeAttempts.examTrack, examTrack)
      ));

    const allReadingProg = await db.select()
      .from(studyReadingProgress)
      .where(eq(studyReadingProgress.userId, userId));

    const { STUDY_PLAN, PS_STUDY_PLAN } = await import('@shared/data/studyPlan');
    const studyPlan = examTrack === 'ps' ? PS_STUDY_PLAN : STUDY_PLAN;
    const weekToDomains = new Map<number, string[]>();
    studyPlan.forEach(w => {
      weekToDomains.set(w.week, w.domains as string[]);
    });

    const stopWords = ['and', 'the', 'for', 'with', 'from'];
    const matchDomain = (testName: string, domainName: string): boolean => {
      const norm = domainName.toLowerCase();
      const test = testName.toLowerCase();
      if (test === norm) return true;
      if (test.includes(norm) || norm.includes(test)) return true;
      const dWords = norm.split(/[\s,&]+/).filter(w => w.length > 2 && !stopWords.includes(w));
      const tWords = test.split(/[\s,&]+/).filter(w => w.length > 2 && !stopWords.includes(w));
      const matching = dWords.filter(w => tWords.includes(w));
      const minReq = Math.min(dWords.length, Math.max(1, Math.floor(dWords.length / 2)));
      return matching.length >= minReq;
    };
    
    for (const domainNumber of domainNumbers) {
      const domainName = domainMap.get(domainNumber) || `Domain ${domainNumber}`;
      const sources: string[] = [];
      
      // 1. Lesson progress
      const domainLessons = allLessons.filter(l => l.domainNumber === domainNumber);
      const lessonsTotal = domainLessons.length;
      const completedLessons = userLessonProg.filter(
        p => p.lessons.domainNumber === domainNumber && p.lesson_progress?.completed
      );
      const lessonsCompleted = completedLessons.length;
      const lessonProg = lessonsTotal > 0 ? Math.round((lessonsCompleted / lessonsTotal) * 100) : 0;
      if (lessonsCompleted > 0) sources.push('Lessons');
      
      // 2. Quiz accuracy
      const domainResults = allQuizResults.filter(r => r.domain && matchDomain(r.domain, domainName));
      const questionsAnswered = domainResults.length;
      let quizAccuracy = 0;
      if (questionsAnswered > 0) {
        const correct = domainResults.filter((r: any) => r.isCorrect).length;
        quizAccuracy = Math.round((correct / questionsAnswered) * 100);
        sources.push('Quizzes');
      }
      
      // 3. Flashcard mastery (Quick Review) - % of cards at mastery level 4+
      const domainFlashcardIds = new Set<string>();
      flashcardIdToDomain.forEach((dom, id) => {
        if (matchDomain(dom, domainName)) domainFlashcardIds.add(id);
      });
      const domainFcMastery = allFlashcardMastery.filter(m => {
        const fcDomain = flashcardIdToDomain.get(m.flashcardId);
        return fcDomain && matchDomain(fcDomain, domainName);
      });
      let flashcardMasteryPct = 0;
      if (domainFlashcardIds.size > 0 && domainFcMastery.length > 0) {
        const mastered = domainFcMastery.filter(m => m.masteryLevel >= 4).length;
        flashcardMasteryPct = Math.round((mastered / domainFlashcardIds.size) * 100);
        sources.push('Flashcards');
      }
      
      // 4. Challenge Mode accuracy per domain
      let challengeAccuracy = 0;
      const domainChallenges = allChallengeSessions.filter(s => {
        if (s.domain && matchDomain(s.domain, domainName)) return true;
        if (s.domainBreakdown && typeof s.domainBreakdown === 'object') {
          const breakdown = s.domainBreakdown as Record<string, any>;
          return Object.keys(breakdown).some(k => matchDomain(k, domainName));
        }
        return false;
      });
      if (domainChallenges.length > 0) {
        let totalCorrect = 0;
        let totalAttempted = 0;
        domainChallenges.forEach(s => {
          if (s.domainBreakdown && typeof s.domainBreakdown === 'object') {
            const breakdown = s.domainBreakdown as Record<string, any>;
            Object.entries(breakdown).forEach(([k, v]) => {
              if (matchDomain(k, domainName) && v && typeof v === 'object') {
                totalCorrect += (v as any).correct || (v as any).correctFirstTry || 0;
                totalAttempted += (v as any).total || (v as any).totalCards || 0;
              }
            });
          } else {
            totalCorrect += s.correctFirstTry;
            totalAttempted += s.totalCards;
          }
        });
        if (totalAttempted > 0) {
          challengeAccuracy = Math.round((totalCorrect / totalAttempted) * 100);
          sources.push('Challenge Mode');
        }
      }
      
      // 5. Practice exam domain scores
      let examAccuracy = 0;
      let examCount = 0;
      allExams.forEach(ex => {
        if (ex.domainScores && typeof ex.domainScores === 'object') {
          const scores = ex.domainScores as Record<string, any>;
          Object.entries(scores).forEach(([k, v]) => {
            if (matchDomain(k, domainName) && v && typeof v === 'object') {
              const correct = (v as any).correct || 0;
              const total = (v as any).total || 0;
              if (total > 0) {
                examAccuracy += Math.round((correct / total) * 100);
                examCount++;
              }
            }
          });
        }
      });
      if (examCount > 0) {
        examAccuracy = Math.round(examAccuracy / examCount);
        sources.push('Practice Exams');
      }
      
      // 6. Retention booster - average mastery level (0-5 scale -> 0-100%)
      const domainRetention = allRetention.filter(r => r.domain === domainNumber && r.reviewCount > 0);
      let retentionScore = 0;
      if (domainRetention.length > 0) {
        const avgMastery = domainRetention.reduce((sum, r) => sum + r.masteryLevel, 0) / domainRetention.length;
        retentionScore = Math.round((avgMastery / 5) * 100);
        sources.push('Retention Booster');
      }
      
      // 7. Reading progress - % of completed sections for this domain
      const domainPrefix = `${examTrack}-d${domainNumber}-`;
      const domainReadings = allReadingProg.filter(r => r.readingId.startsWith(domainPrefix));
      let readingProg = 0;
      if (domainReadings.length > 0) {
        const completedSections = domainReadings.filter(r => r.completed).length;
        readingProg = Math.round((completedSections / domainReadings.length) * 100);
        if (completedSections > 0) sources.push('Readings');
      }
      
      // 8. Apply scenario completion per domain (via week-to-domain mapping)
      let applyScore = 0;
      const domainApply = allApply.filter(a => {
        if (!a.week) return false;
        const weekDomains = weekToDomains.get(a.week) || [];
        return weekDomains.some(wd => matchDomain(wd, domainName));
      });
      const completedApply = domainApply.filter(a => a.completedAt);
      if (domainApply.length > 0 && completedApply.length > 0) {
        applyScore = Math.round((completedApply.length / domainApply.length) * 100);
        sources.push('Apply Scenarios');
      }

      // Weighted composite score - performance metrics weighted higher
      // Quiz/Exam: 30%, Lessons: 20%, Flashcards: 15%, Challenge: 10%, Retention: 10%, Reading: 10%, Apply: 5%
      let totalWeight = 0;
      let weightedSum = 0;

      if (questionsAnswered > 0) { weightedSum += quizAccuracy * 30; totalWeight += 30; }
      if (lessonsCompleted > 0) { weightedSum += lessonProg * 20; totalWeight += 20; }
      if (domainFcMastery.length > 0) { weightedSum += flashcardMasteryPct * 15; totalWeight += 15; }
      if (challengeAccuracy > 0) { weightedSum += challengeAccuracy * 10; totalWeight += 10; }
      if (examCount > 0) { weightedSum += examAccuracy * 15; totalWeight += 15; }
      if (domainRetention.length > 0) { weightedSum += retentionScore * 10; totalWeight += 10; }
      if (domainReadings.length > 0) { weightedSum += readingProg * 5; totalWeight += 5; }
      if (completedApply.length > 0) { weightedSum += applyScore * 5; totalWeight += 5; }

      const overallProgress = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
      const currentScore = questionsAnswered > 0 ? quizAccuracy : overallProgress;
      
      let isStagnant = false;
      let alert: string | undefined;
      
      if (overallProgress >= 85) {
        alert = 'Mastered!';
      } else if (overallProgress >= 70) {
        alert = 'Good progress';
      } else if (overallProgress > 0 && overallProgress < 50) {
        alert = 'Needs focus';
      } else if (overallProgress >= 50 && overallProgress < 70) {
        alert = 'Keep practicing';
      }
      
      result.push({
        domainNumber,
        domain: domainName,
        currentScore,
        lessonsCompleted,
        lessonsTotal,
        lessonProgress: lessonProg,
        quizAccuracy,
        questionsAnswered,
        flashcardMasteryPct,
        challengeAccuracy,
        examAccuracy,
        retentionScore,
        readingProgress: readingProg,
        applyScore,
        overallProgress,
        isStagnant,
        alert,
        sources
      });
    }
    
    return result;
  }

  // Feedback methods
  async createFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const [newFeedback] = await db.insert(feedback).values(feedbackData).returning();
    return newFeedback;
  }

  // Testimonials methods
  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonialData).returning();
    return newTestimonial;
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.approved, true))
      .orderBy(desc(testimonials.createdAt));
  }

  // XP System methods
  async getUserXp(userId: string): Promise<{ xp: number; level: number }> {
    const user = await this.getUser(userId);
    return { xp: user?.xp ?? 0, level: user?.level ?? 1 };
  }

  async hasXpGrant(userId: string, activityKey: string): Promise<boolean> {
    const existing = await db
      .select()
      .from(xpGrants)
      .where(and(eq(xpGrants.userId, userId), eq(xpGrants.activityKey, activityKey)))
      .limit(1);
    return existing.length > 0;
  }

  async awardXp(userId: string, amount: number, activityKey: string): Promise<{ xp: number; level: number; leveledUp: boolean; awarded: boolean }> {
    // Check if XP was already granted for this activity (idempotency)
    const alreadyGranted = await this.hasXpGrant(userId, activityKey);
    if (alreadyGranted) {
      const user = await this.getUser(userId);
      return { xp: user?.xp ?? 0, level: user?.level ?? 1, leveledUp: false, awarded: false };
    }
    
    const user = await this.getUser(userId);
    const currentXp = user?.xp ?? 0;
    const currentLevel = user?.level ?? 1;
    const newXp = currentXp + amount;
    
    // Calculate new level based on XP thresholds
    const SURVEYOR_RANKS = [
      { level: 1, minXp: 0 },
      { level: 2, minXp: 500 },
      { level: 3, minXp: 1500 },
      { level: 4, minXp: 3500 },
      { level: 5, minXp: 6500 },
      { level: 6, minXp: 10500 },
      { level: 7, minXp: 15500 },
      { level: 8, minXp: 22000 },
      { level: 9, minXp: 30000 },
      { level: 10, minXp: 40000 },
    ];
    
    let newLevel = 1;
    for (const rank of SURVEYOR_RANKS) {
      if (newXp >= rank.minXp) {
        newLevel = rank.level;
      }
    }
    
    // Record the XP grant for idempotency
    await db.insert(xpGrants).values({
      userId,
      activityKey,
      amount
    });
    
    await db
      .update(users)
      .set({ xp: newXp, level: newLevel, updatedAt: new Date() })
      .where(eq(users.id, userId));
    
    return { xp: newXp, level: newLevel, leveledUp: newLevel > currentLevel, awarded: true };
  }

  // Personal Analytics Dashboard
  async getPersonalAnalytics(userId: string): Promise<{
    learningVelocity: Array<{
      domain: string;
      domainNumber: number;
      weeklyImprovement: number;
      currentAccuracy: number;
      previousAccuracy: number;
      trend: 'improving' | 'stable' | 'declining';
    }>;
    timeInvestmentROI: Array<{
      domain: string;
      domainNumber: number;
      timeSpentMinutes: number;
      accuracyGain: number;
      roi: number; // accuracy gain per hour
    }>;
    weaknessPredictions: Array<{
      domain: string;
      domainNumber: number;
      predictedStruggle: boolean;
      reason: string;
      confidence: number;
    }>;
    studyPatterns: {
      mostActiveDay: string;
      mostActiveHour: number;
      averageSessionMinutes: number;
      totalStudyHours: number;
    };
    progressTrajectory: {
      currentScore: number;
      predictedExamScore: number;
      daysUntilReady: number;
      onTrack: boolean;
    };
  }> {
    // Get all quiz results with timestamps
    const allQuizResults = await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId))
      .orderBy(quizResults.completedAt);

    // Get lesson progress for time tracking
    const allLessonProgress = await db
      .select()
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, userId));

    // Get quiz sessions for time data
    const allQuizSessions = await db
      .select()
      .from(quizSessions)
      .where(eq(quizSessions.userId, userId));

    // Get practice exams
    const allExams = await db
      .select()
      .from(practiceExams)
      .where(eq(practiceExams.userId, userId))
      .orderBy(practiceExams.completedAt);

    // Get daily logs for study patterns
    const allDailyLogs = await db
      .select()
      .from(dailyLogs)
      .where(eq(dailyLogs.userId, userId));

    // Domain names matching the actual stored values in the database
    const DOMAIN_NAMES: Record<number, string> = {
      1: 'Math & Basic Science',
      2: 'Field Data Acquisition',
      3: 'Mapping, GIS, and CAD',
      4: 'Boundary Law & PLSS',
      5: 'Surveying Principles',
      6: 'Survey Computations & Applications',
      7: 'Professional Practice',
      8: 'Applied Mathematics & Statistics'
    };

    // Create reverse lookup from domain name to number
    const DOMAIN_TO_NUMBER: Record<string, number> = {};
    Object.entries(DOMAIN_NAMES).forEach(([num, name]) => {
      DOMAIN_TO_NUMBER[name] = parseInt(num);
    });

    // Calculate Learning Velocity per domain
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const learningVelocity = [];
    for (let d = 1; d <= 8; d++) {
      const domainResults = allQuizResults.filter(r => DOMAIN_TO_NUMBER[r.domain] === d);
      const recentResults = domainResults.filter(r => r.completedAt >= oneWeekAgo);
      const previousResults = domainResults.filter(r => r.completedAt >= twoWeeksAgo && r.completedAt < oneWeekAgo);

      const currentAccuracy = recentResults.length > 0
        ? (recentResults.filter(r => r.isCorrect).length / recentResults.length) * 100
        : 0;
      const previousAccuracy = previousResults.length > 0
        ? (previousResults.filter(r => r.isCorrect).length / previousResults.length) * 100
        : 0;

      // Only calculate improvement if there's activity in both weeks, otherwise show 0
      // This prevents misleading negative values when there's no recent activity
      let weeklyImprovement = 0;
      if (recentResults.length > 0 && previousResults.length > 0) {
        weeklyImprovement = currentAccuracy - previousAccuracy;
      }
      // Floor at 0% - negative values are confusing (show stable instead)
      const displayImprovement = Math.max(0, weeklyImprovement);
      
      let trend: 'improving' | 'stable' | 'declining' = 'stable';
      if (weeklyImprovement > 5) trend = 'improving';
      else if (weeklyImprovement < -5) trend = 'declining';

      learningVelocity.push({
        domain: DOMAIN_NAMES[d],
        domainNumber: d,
        weeklyImprovement: Math.round(displayImprovement * 10) / 10,
        currentAccuracy: Math.round(currentAccuracy * 10) / 10,
        previousAccuracy: Math.round(previousAccuracy * 10) / 10,
        trend
      });
    }

    // Calculate Time Investment ROI
    const timeInvestmentROI = [];
    for (let d = 1; d <= 8; d++) {
      const domainLessons = allLessonProgress.filter(l => l.lessonId?.startsWith(`d${d}-`));
      const timeSpentMinutes = domainLessons.reduce((sum, l) => sum + ((l.timeSpentSeconds || 0) / 60), 0);
      
      const domainResults = allQuizResults.filter(r => DOMAIN_TO_NUMBER[r.domain] === d);
      const firstHalf = domainResults.slice(0, Math.floor(domainResults.length / 2));
      const secondHalf = domainResults.slice(Math.floor(domainResults.length / 2));
      
      const firstAccuracy = firstHalf.length > 0
        ? (firstHalf.filter(r => r.isCorrect).length / firstHalf.length) * 100
        : 0;
      const secondAccuracy = secondHalf.length > 0
        ? (secondHalf.filter(r => r.isCorrect).length / secondHalf.length) * 100
        : 0;
      
      const accuracyGain = secondAccuracy - firstAccuracy;
      const hoursSpent = timeSpentMinutes / 60;
      const roi = hoursSpent > 0 ? accuracyGain / hoursSpent : 0;

      timeInvestmentROI.push({
        domain: DOMAIN_NAMES[d],
        domainNumber: d,
        timeSpentMinutes,
        accuracyGain: Math.round(accuracyGain * 10) / 10,
        roi: Math.round(roi * 10) / 10
      });
    }

    // Weakness Predictions based on patterns
    const weaknessPredictions = [];
    for (let d = 1; d <= 8; d++) {
      const domainResults = allQuizResults.filter(r => DOMAIN_TO_NUMBER[r.domain] === d);
      const accuracy = domainResults.length > 0
        ? (domainResults.filter(r => r.isCorrect).length / domainResults.length) * 100
        : 0;
      
      const recentResults = domainResults.slice(-10);
      const recentAccuracy = recentResults.length > 0
        ? (recentResults.filter(r => r.isCorrect).length / recentResults.length) * 100
        : 0;

      let predictedStruggle = false;
      let reason = '';
      let confidence = 0;

      if (domainResults.length < 5) {
        predictedStruggle = true;
        reason = 'Not enough practice - needs more exposure';
        confidence = 60;
      } else if (accuracy < 50) {
        predictedStruggle = true;
        reason = 'Low overall accuracy - focus area needed';
        confidence = 85;
      } else if (recentAccuracy < accuracy - 10) {
        predictedStruggle = true;
        reason = 'Recent performance declining - review fundamentals';
        confidence = 70;
      } else if (accuracy < 70) {
        predictedStruggle = true;
        reason = 'Below passing threshold - needs improvement';
        confidence = 75;
      }

      weaknessPredictions.push({
        domain: DOMAIN_NAMES[d],
        domainNumber: d,
        predictedStruggle,
        reason: reason || 'On track',
        confidence: predictedStruggle ? confidence : 0
      });
    }

    // Study Patterns
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const hourCounts: Record<number, number> = {};
    
    for (let h = 0; h < 24; h++) hourCounts[h] = 0;

    allDailyLogs.forEach(log => {
      const day = new Date(log.date).getDay();
      dayCounts[day]++;
    });

    allQuizResults.forEach(result => {
      const hour = result.completedAt.getHours();
      hourCounts[hour]++;
    });

    const mostActiveDay = dayNames[Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as unknown as number || 0];
    const mostActiveHour = parseInt(Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '9');

    const totalTimeMinutes = allLessonProgress.reduce((sum, l) => sum + ((l.timeSpentSeconds || 0) / 60), 0) +
      allQuizSessions.reduce((sum, s) => sum + (s.timeSpentSeconds || 0) / 60, 0);

    const studyPatterns = {
      mostActiveDay,
      mostActiveHour,
      averageSessionMinutes: allQuizSessions.length > 0
        ? Math.round(allQuizSessions.reduce((sum, s) => sum + (s.timeSpentSeconds || 0), 0) / allQuizSessions.length / 60)
        : 0,
      totalStudyHours: Math.round(totalTimeMinutes / 60 * 10) / 10
    };

    // Progress Trajectory
    const overallAccuracy = allQuizResults.length > 0
      ? (allQuizResults.filter(r => r.isCorrect).length / allQuizResults.length) * 100
      : 0;

    const recentOverall = allQuizResults.slice(-50);
    const recentAccuracy = recentOverall.length > 0
      ? (recentOverall.filter(r => r.isCorrect).length / recentOverall.length) * 100
      : overallAccuracy;

    const latestExam = allExams[allExams.length - 1];
    const latestExamScore = latestExam
      ? (latestExam.correctAnswers / latestExam.totalQuestions) * 100
      : recentAccuracy;

    // Predict based on improvement rate
    const improvementRate = learningVelocity.reduce((sum, v) => sum + v.weeklyImprovement, 0) / 8;
    const weeksToPass = latestExamScore >= 70 ? 0 : Math.ceil((70 - latestExamScore) / Math.max(improvementRate, 1));

    const progressTrajectory = {
      currentScore: Math.round(latestExamScore * 10) / 10,
      predictedExamScore: Math.round(Math.min(100, latestExamScore + improvementRate * 4) * 10) / 10,
      daysUntilReady: weeksToPass * 7,
      onTrack: latestExamScore >= 65 || improvementRate > 2
    };

    return {
      learningVelocity,
      timeInvestmentROI,
      weaknessPredictions,
      studyPatterns,
      progressTrajectory
    };
  }

  // --- Daily Quests Methods ---

  async getDailyQuests(userId: string, examTrack: string = 'fs', timezone: string = 'America/Chicago'): Promise<DailyQuest[]> {
    const { today, tomorrow } = getLocalMidnight(timezone);
    
    return db
      .select()
      .from(dailyQuests)
      .where(and(
        eq(dailyQuests.userId, userId),
        eq(dailyQuests.examTrack, examTrack),
        gte(dailyQuests.date, today),
        lt(dailyQuests.date, tomorrow)
      ))
      .orderBy(dailyQuests.createdAt);
  }

  async generateDailyQuests(userId: string, examTrack: string = 'fs', timezone: string = 'America/Chicago'): Promise<DailyQuest[]> {
    const { today, tomorrow } = getLocalMidnight(timezone);

    // Check if quests already exist for today (strictly today only in user's timezone)
    // Uses lt(tomorrow) to create half-open interval [today, tomorrow) avoiding midnight overlap
    const existingQuests = await db
      .select()
      .from(dailyQuests)
      .where(and(
        eq(dailyQuests.userId, userId),
        eq(dailyQuests.examTrack, examTrack),
        gte(dailyQuests.date, today),
        lt(dailyQuests.date, tomorrow)
      ));

    if (existingQuests.length > 0) {
      const newQuests: DailyQuest[] = [];
      
      // Check if flashcard quest exists - if not, add it (for backwards compatibility)
      const hasFlashcardQuest = existingQuests.some(q => q.questType === 'complete_flashcards');
      if (!hasFlashcardQuest) {
        const [flashcardQuest] = await db
          .insert(dailyQuests)
          .values({
            userId,
            examTrack,
            date: today,
            questType: 'complete_flashcards',
            title: 'Flashcard Master',
            description: 'Review 15 flashcards to reinforce your memory',
            targetCount: 15,
            xpReward: 50,
            currentCount: 0,
            isCompleted: false
          })
          .returning();
        newQuests.push(flashcardQuest);
      }
      
      // Check if weak domain quest exists - if not, add it (for backwards compatibility)
      const hasWeakDomainQuest = existingQuests.some(q => q.questType === 'review_weak_domain');
      if (!hasWeakDomainQuest) {
        const analytics = await this.getPersonalAnalytics(userId);
        // Prioritize domains with real data and confirmed struggle (confidence >= 70)
        const domainsWithRealData = analytics.weaknessPredictions
          .filter(w => w.predictedStruggle && w.confidence >= 70);
        const domainsLowData = analytics.weaknessPredictions
          .filter(w => w.predictedStruggle && w.confidence < 70);
        
        let weakDomains: string[] = [];
        if (domainsWithRealData.length > 0) {
          domainsWithRealData.sort((a, b) => b.confidence - a.confidence);
          weakDomains = [domainsWithRealData[0].domain];
        } else if (domainsLowData.length > 0 && domainsLowData.length < analytics.weaknessPredictions.length) {
          const shuffled = domainsLowData.sort(() => Math.random() - 0.5);
          weakDomains = [shuffled[0].domain];
        }
        
        if (weakDomains.length > 0) {
          const weakDomain = weakDomains[0];
          const [weakDomainQuest] = await db
            .insert(dailyQuests)
            .values({
              userId,
              examTrack,
              date: today,
              questType: 'review_weak_domain',
              title: `${weakDomain} Focus`,
              description: `Practice 5 questions in your weak area: ${weakDomain}`,
              targetCount: 5,
              xpReward: 75,
              currentCount: 0,
              isCompleted: false
            })
            .returning();
          newQuests.push(weakDomainQuest);
          console.log(`[DailyQuests] Added weak domain quest retroactively: ${weakDomain}`);
        }
      }
      
      return [...existingQuests, ...newQuests];
    }

    // Get user's weak domains from analytics - prioritize domains with actual quiz data
    const analytics = await this.getPersonalAnalytics(userId);
    
    // First, find domains with real data and low accuracy (most meaningful)
    const domainsWithData = analytics.weaknessPredictions
      .filter(w => w.predictedStruggle && w.confidence >= 70);
    
    // Then domains with some data but not enough (confidence 60 = less than 5 questions)
    const domainsLowData = analytics.weaknessPredictions
      .filter(w => w.predictedStruggle && w.confidence < 70);
    
    // Prioritize domains where user has practiced but struggles, over untested domains
    let weakDomains: string[] = [];
    if (domainsWithData.length > 0) {
      // Sort by confidence descending (higher confidence = more certain weakness)
      domainsWithData.sort((a, b) => b.confidence - a.confidence);
      weakDomains = domainsWithData.map(w => w.domain);
    } else if (domainsLowData.length > 0 && domainsLowData.length < analytics.weaknessPredictions.length) {
      // Some domains have data but all are low-data: pick randomly from them
      const shuffled = domainsLowData.sort(() => Math.random() - 0.5);
      weakDomains = [shuffled[0].domain];
    }
    // If ALL domains are low-data (new user), don't add the quest at all

    // Core quests that are always included
    const coreQuests = [
      {
        questType: 'complete_flashcards',
        title: 'Flashcard Master',
        description: 'Review 15 flashcards to reinforce your memory',
        targetCount: 15,
        xpReward: 50
      }
    ];

    // Optional quests to randomly select from
    const optionalQuests = [
      {
        questType: 'complete_lesson',
        title: 'Lesson Learner',
        description: 'Complete 1 interactive lesson',
        targetCount: 1,
        xpReward: 40
      },
      {
        questType: 'complete_quiz',
        title: 'Quiz Champion',
        description: 'Complete a practice quiz with 10+ questions',
        targetCount: 1,
        xpReward: 60
      },
      {
        questType: 'complete_all_pillars',
        title: 'Daily Discipline',
        description: 'Complete a Reading, Quiz, Apply Scenario, and Lesson today',
        targetCount: 4,
        xpReward: 100
      }
    ];

    // Add a weak domain quest if applicable
    if (weakDomains.length > 0) {
      const weakDomain = weakDomains[0];
      optionalQuests.push({
        questType: 'review_weak_domain',
        title: `${weakDomain} Focus`,
        description: `Practice 5 questions in your weak area: ${weakDomain}`,
        targetCount: 5,
        xpReward: 75
      });
    }

    // Select 2-3 optional quests randomly, then combine with core quests
    const shuffled = optionalQuests.sort(() => Math.random() - 0.5);
    const selectedOptional = shuffled.slice(0, 3);
    const selectedQuests = [...coreQuests, ...selectedOptional];

    const createdQuests: DailyQuest[] = [];
    for (const quest of selectedQuests) {
      const [created] = await db
        .insert(dailyQuests)
        .values({
          userId,
          examTrack,
          date: today,
          questType: quest.questType,
          title: quest.title,
          description: quest.description,
          targetCount: quest.targetCount,
          xpReward: quest.xpReward,
          currentCount: 0,
          isCompleted: false
        })
        .returning();
      createdQuests.push(created);
    }

    return createdQuests;
  }

  async updateQuestProgress(userId: string, questType: string, increment: number = 1, examTrack: string = 'fs', timezone: string = 'America/Chicago'): Promise<DailyQuest | null> {
    const { today, tomorrow } = getLocalMidnight(timezone);

    console.log(`[QuestProgress] Looking for quest: userId=${userId}, type=${questType}, track=${examTrack}, tz=${timezone}, today=${today.toISOString()}, tomorrow=${tomorrow.toISOString()}`);

    const [quest] = await db
      .select()
      .from(dailyQuests)
      .where(and(
        eq(dailyQuests.userId, userId),
        eq(dailyQuests.examTrack, examTrack),
        eq(dailyQuests.questType, questType),
        gte(dailyQuests.date, today),
        lt(dailyQuests.date, tomorrow),
        eq(dailyQuests.isCompleted, false)
      ))
      .limit(1);

    console.log(`[QuestProgress] Found quest: ${quest ? `id=${quest.id}, date=${quest.date}, currentCount=${quest.currentCount}` : 'null'}`);

    if (!quest) return null;

    const newCount = quest.currentCount + increment;
    const isNowComplete = newCount >= quest.targetCount;

    const [updated] = await db
      .update(dailyQuests)
      .set({
        currentCount: newCount,
        isCompleted: isNowComplete,
        completedAt: isNowComplete ? new Date() : null
      })
      .where(eq(dailyQuests.id, quest.id))
      .returning();

    // Award XP when quest is completed
    if (isNowComplete && updated) {
      const dateKey = today.toISOString().split('T')[0];
      const activityKey = `daily_quest:${examTrack}:${dateKey}:${questType}`;
      await this.awardXp(userId, quest.xpReward, activityKey);
    }

    return updated;
  }

  async updatePillarQuestProgress(userId: string, pillar: 'read' | 'focus' | 'apply' | 'reinforce', examTrack: string = 'fs', timezone: string = 'America/Chicago'): Promise<DailyQuest | null> {
    const { today, tomorrow } = getLocalMidnight(timezone);
    const pillarKey = `pillar_quest:${examTrack}:${today.toISOString().split('T')[0]}:${pillar}`;

    const [existing] = await db
      .select()
      .from(xpGrants)
      .where(and(
        eq(xpGrants.userId, userId),
        eq(xpGrants.activityKey, pillarKey)
      ))
      .limit(1);

    if (existing) return null;

    await db.insert(xpGrants).values({
      userId,
      amount: 0,
      activityKey: pillarKey,
    });

    return this.updateQuestProgress(userId, 'complete_all_pillars', 1, examTrack, timezone);
  }

  async updateWeakDomainQuestProgress(userId: string, quizDomain: string, correctAnswerCount: number, examTrack: string = 'fs', sessionId?: string, timezone: string = 'America/Chicago'): Promise<DailyQuest | null> {
    console.log(`[WeakDomainQuest] Called with: userId=${userId}, domain=${quizDomain}, count=${correctAnswerCount}, track=${examTrack}, session=${sessionId}, tz=${timezone}`);
    
    const { today, tomorrow } = getLocalMidnight(timezone);

    // Session-based idempotency: check if this session already contributed to quest
    let sessionKey: string | null = null;
    if (sessionId) {
      sessionKey = `weak_domain_quest:${sessionId}`;
      const [existingCredit] = await db
        .select()
        .from(xpGrants)
        .where(and(
          eq(xpGrants.userId, userId),
          eq(xpGrants.activityKey, sessionKey)
        ))
        .limit(1);
      
      if (existingCredit) {
        // This session already contributed to the quest
        return null;
      }
      // Note: We'll record the session marker AFTER successful quest update
    }

    // Find active weak domain quest for today (half-open interval [today, tomorrow))
    const [quest] = await db
      .select()
      .from(dailyQuests)
      .where(and(
        eq(dailyQuests.userId, userId),
        eq(dailyQuests.examTrack, examTrack),
        eq(dailyQuests.questType, 'review_weak_domain'),
        gte(dailyQuests.date, today),
        lt(dailyQuests.date, tomorrow),
        eq(dailyQuests.isCompleted, false)
      ))
      .limit(1);

    if (!quest) {
      console.log(`[WeakDomainQuest] No active review_weak_domain quest found for user ${userId}, examTrack ${examTrack}`);
      return null;
    }
    
    console.log(`[WeakDomainQuest] Found quest: id=${quest.id}, title="${quest.title}", current=${quest.currentCount}/${quest.targetCount}`);

    // Extract weak domain from multiple sources for robustness:
    // 1. Title format: "{domain} Focus"
    // 2. Description format: "Practice 5 questions in your weak area: {domain}"
    let weakDomain = '';
    
    // Try title first (more reliable - format: "Domain Name Focus")
    const titleMatch = quest.title?.match(/^(.+)\s+Focus$/i);
    if (titleMatch) {
      weakDomain = titleMatch[1].trim();
    }
    
    // Fallback to description
    if (!weakDomain) {
      const descMatch = quest.description?.match(/weak area:\s*(.+)$/i);
      if (descMatch) {
        weakDomain = descMatch[1].trim();
      }
    }
    
    if (!weakDomain) return null;

    const normalizedWeakDomain = weakDomain.toLowerCase();
    const normalizedQuizDomain = quizDomain.toLowerCase();

    // Flexible matching: check if domains match, contain each other, or share significant words
    // Filter out very common words that don't help with matching
    const stopWords = ['and', 'the', 'for', 'with', 'from', 'basic', 'foundations', 'principles', 'practices', 'concepts'];
    const weakDomainWords = normalizedWeakDomain.split(/[\s,&]+/).filter(w => w.length > 2 && !stopWords.includes(w));
    const quizDomainWords = normalizedQuizDomain.split(/[\s,&]+/).filter(w => w.length > 2 && !stopWords.includes(w));
    
    // Check for exact match, containment, or significant word overlap (at least 1 key word)
    const matchingWords = weakDomainWords.filter(w => quizDomainWords.includes(w));
    const isMatch = normalizedQuizDomain === normalizedWeakDomain ||
                    normalizedQuizDomain.includes(normalizedWeakDomain) || 
                    normalizedWeakDomain.includes(normalizedQuizDomain) ||
                    matchingWords.length >= 1; // At least one meaningful word matches

    console.log(`[WeakDomainQuest] Matching: quest="${weakDomain}" vs quiz="${quizDomain}"`);
    console.log(`[WeakDomainQuest] Words: weak=[${weakDomainWords}] quiz=[${quizDomainWords}] matching=[${matchingWords}]`);
    console.log(`[WeakDomainQuest] Result: ${isMatch ? 'MATCH' : 'NO MATCH'}`);

    if (!isMatch) return null;

    // Update quest progress (using correct answer count, not total questions)
    const newCount = Math.min(quest.currentCount + correctAnswerCount, quest.targetCount);
    const isNowComplete = newCount >= quest.targetCount;

    const [updated] = await db
      .update(dailyQuests)
      .set({
        currentCount: newCount,
        isCompleted: isNowComplete,
        completedAt: isNowComplete ? new Date() : null
      })
      .where(eq(dailyQuests.id, quest.id))
      .returning();

    // Record session marker AFTER successful quest update (prevents blocking legitimate retries)
    if (updated && sessionKey) {
      await db.insert(xpGrants).values({
        userId,
        amount: 0,
        activityKey: sessionKey,
      });
    }

    // Award XP when quest is completed
    if (isNowComplete && updated) {
      const dateKey = today.toISOString().split('T')[0];
      const activityKey = `daily_quest:${examTrack}:${dateKey}:review_weak_domain`;
      await this.awardXp(userId, quest.xpReward, activityKey);
    }

    return updated;
  }

  // --- Review Schedule Methods (Spaced Repetition) ---

  async getUpcomingReviews(userId: string, limit: number = 10, examTrack: string = 'fs'): Promise<ReviewSchedule[]> {
    const now = new Date();
    
    return db
      .select()
      .from(reviewSchedule)
      .where(and(
        eq(reviewSchedule.userId, userId),
        eq(reviewSchedule.examTrack, examTrack),
        gte(reviewSchedule.nextReviewAt, new Date(now.getTime() - 24 * 60 * 60 * 1000)) // Include past due
      ))
      .orderBy(reviewSchedule.nextReviewAt)
      .limit(limit);
  }

  async getDueReviews(userId: string, examTrack: string = 'fs'): Promise<ReviewSchedule[]> {
    const now = new Date();
    
    return db
      .select()
      .from(reviewSchedule)
      .where(and(
        eq(reviewSchedule.userId, userId),
        eq(reviewSchedule.examTrack, examTrack),
        lte(reviewSchedule.nextReviewAt, now)
      ))
      .orderBy(reviewSchedule.nextReviewAt);
  }

  async createOrUpdateReviewItem(
    userId: string, 
    itemType: string, 
    itemId: string, 
    itemTitle: string,
    domain?: string,
    quality: number = 3, // 0-5 quality rating for SM-2
    examTrack: string = 'fs'
  ): Promise<ReviewSchedule> {
    // Check if item already exists
    const [existing] = await db
      .select()
      .from(reviewSchedule)
      .where(and(
        eq(reviewSchedule.userId, userId),
        eq(reviewSchedule.examTrack, examTrack),
        eq(reviewSchedule.itemId, itemId)
      ))
      .limit(1);

    const now = new Date();

    if (existing) {
      // Update using SM-2 algorithm
      let { easeFactor, intervalDays, reviewCount } = existing;
      
      // SM-2 algorithm implementation
      // Update ease factor based on quality
      easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
      
      if (quality < 3) {
        // Reset interval AND reviewCount for poor performance (per SM-2 spec)
        intervalDays = 1;
        reviewCount = 0; // Reset to start of learning phase
      } else {
        // Good response - advance through intervals
        if (reviewCount === 0) {
          intervalDays = 1;
        } else if (reviewCount === 1) {
          intervalDays = 6;
        } else {
          intervalDays = Math.round(intervalDays * easeFactor);
        }
        reviewCount = reviewCount + 1;
      }

      const nextReview = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

      const [updated] = await db
        .update(reviewSchedule)
        .set({
          lastReviewedAt: now,
          nextReviewAt: nextReview,
          intervalDays,
          easeFactor,
          reviewCount
        })
        .where(eq(reviewSchedule.id, existing.id))
        .returning();

      return updated;
    } else {
      // Create new review item
      const nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000); // First review in 1 day

      const [created] = await db
        .insert(reviewSchedule)
        .values({
          userId,
          examTrack,
          itemType,
          itemId,
          itemTitle,
          domain,
          lastReviewedAt: now,
          nextReviewAt: nextReview,
          intervalDays: 1,
          easeFactor: 2.5,
          reviewCount: 0
        })
        .returning();

      return created;
    }
  }

  // --- AI Study Coach Briefing ---

  async getStudyCoachBriefing(userId: string, examTrack: string = 'fs'): Promise<{
    greeting: string;
    focusRecommendation: string;
    progressInsight: string;
    motivationalMessage: string;
    todaysPriorities: string[];
    dueReviews: ReviewSchedule[];
  }> {
    const analytics = await this.getPersonalAnalytics(userId);
    const dueReviews = await this.getDueReviews(userId, examTrack);
    const todaysQuests = await this.getDailyQuests(userId, examTrack);
    const todaysFlashcardSessions = await this.getTodayFlashcardSessions(userId);
    
    // Get user preferences for exam date
    const [prefs] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    // Time-based greeting
    const hour = new Date().getHours();
    let greeting = "Good morning";
    if (hour >= 12 && hour < 17) greeting = "Good afternoon";
    else if (hour >= 17) greeting = "Good evening";

    // Find weakest domain
    const weakestDomain = analytics.weaknessPredictions
      .sort((a, b) => b.confidence - a.confidence)[0];

    // Focus recommendation based on weakness
    let focusRecommendation = "";
    if (weakestDomain && weakestDomain.predictedStruggle) {
      focusRecommendation = `Based on your recent performance, focus on ${weakestDomain.domain} today. ${weakestDomain.reason}`;
    } else {
      focusRecommendation = "You're doing well across all domains! Consider reviewing your strongest areas to maintain your edge.";
    }

    // Progress insight - include flashcard session data
    let progressInsight = "";
    const { currentScore, predictedExamScore, onTrack } = analytics.progressTrajectory;
    const totalCardsReviewedToday = todaysFlashcardSessions.reduce((sum, s) => sum + (s.cardsReviewed || 0), 0);
    const sessionCount = todaysFlashcardSessions.length;
    
    if (onTrack) {
      progressInsight = `Great news! Your current trajectory puts you at ${predictedExamScore}% (passing is 70%). Keep up the momentum!`;
    } else {
      progressInsight = `Current estimated score: ${currentScore}%. With consistent practice, you can reach ${predictedExamScore}% by exam day.`;
    }
    
    // Add flashcard session context
    if (sessionCount > 0 && totalCardsReviewedToday > 0) {
      const periodsCompleted = todaysFlashcardSessions.map(s => s.period).join(', ');
      progressInsight += ` You've reviewed ${totalCardsReviewedToday} flashcard${totalCardsReviewedToday !== 1 ? 's' : ''} today (${periodsCompleted} session${sessionCount > 1 ? 's' : ''}).`;
    }

    // Motivational message based on velocity and flashcard activity
    const avgVelocity = analytics.learningVelocity.reduce((sum, v) => sum + v.weeklyImprovement, 0) / analytics.learningVelocity.length;
    let motivationalMessage = "";
    if (avgVelocity > 5) {
      motivationalMessage = "You're making excellent progress! Your improvement rate is above average.";
    } else if (avgVelocity > 0) {
      motivationalMessage = "You're on the right track. Every study session brings you closer to your goal.";
    } else {
      motivationalMessage = "Remember: consistency beats intensity. Even 20 minutes of focused study makes a difference.";
    }

    // Today's priorities
    const todaysPriorities: string[] = [];
    if (dueReviews.length > 0) {
      todaysPriorities.push(`Review ${dueReviews.length} concept${dueReviews.length > 1 ? 's' : ''} due for spaced repetition`);
    }
    if (weakestDomain && weakestDomain.predictedStruggle) {
      todaysPriorities.push(`Practice ${weakestDomain.domain} questions to improve weak area`);
    }
    
    // Check for missing flashcard review periods today
    const currentHour = new Date().getHours();
    const completedPeriods = new Set(todaysFlashcardSessions.map(s => s.period));
    if (currentHour >= 5 && currentHour < 12 && !completedPeriods.has('morning')) {
      todaysPriorities.push("Complete your morning flashcard review for 15 XP");
    } else if (currentHour >= 12 && currentHour < 17 && !completedPeriods.has('afternoon')) {
      todaysPriorities.push("Complete your afternoon flashcard review for 15 XP");
    } else if (currentHour >= 17 && !completedPeriods.has('evening')) {
      todaysPriorities.push("Complete your evening flashcard review for 15 XP");
    }
    
    const incompleteQuests = todaysQuests.filter(q => !q.isCompleted);
    if (incompleteQuests.length > 0) {
      todaysPriorities.push(`Complete ${incompleteQuests.length} daily quest${incompleteQuests.length > 1 ? 's' : ''} for bonus XP`);
    }
    if (todaysPriorities.length === 0) {
      todaysPriorities.push("Continue your study plan at your own pace");
    }

    return {
      greeting,
      focusRecommendation,
      progressInsight,
      motivationalMessage,
      todaysPriorities,
      dueReviews
    };
  }

  // --- Adaptive Difficulty Methods ---

  async getUserDifficultySettings(userId: string, domain: string): Promise<UserDifficultySettings | undefined> {
    const [result] = await db
      .select()
      .from(userDifficultySettings)
      .where(and(
        eq(userDifficultySettings.userId, userId),
        eq(userDifficultySettings.domain, domain)
      ))
      .limit(1);
    return result;
  }

  async getAllUserDifficultySettings(userId: string): Promise<UserDifficultySettings[]> {
    return db
      .select()
      .from(userDifficultySettings)
      .where(eq(userDifficultySettings.userId, userId));
  }

  async updateDifficultyAfterAnswer(
    userId: string, 
    domain: string, 
    isCorrect: boolean
  ): Promise<{ difficulty: DifficultyLevel; adjusted: boolean }> {
    const now = new Date();
    
    // Get or create difficulty settings for this domain
    let settings = await this.getUserDifficultySettings(userId, domain);
    
    if (!settings) {
      // Create new settings starting at medium
      const [created] = await db
        .insert(userDifficultySettings)
        .values({
          userId,
          domain,
          currentDifficulty: 'medium',
          consecutiveCorrect: isCorrect ? 1 : 0,
          consecutiveIncorrect: isCorrect ? 0 : 1,
          totalAttempts: 1,
          correctAttempts: isCorrect ? 1 : 0,
          updatedAt: now
        })
        .returning();
      return { difficulty: 'medium' as DifficultyLevel, adjusted: false };
    }

    // Update counters
    let { consecutiveCorrect, consecutiveIncorrect, totalAttempts, correctAttempts, currentDifficulty } = settings;
    totalAttempts += 1;
    
    if (isCorrect) {
      consecutiveCorrect += 1;
      consecutiveIncorrect = 0;
      correctAttempts += 1;
    } else {
      consecutiveCorrect = 0;
      consecutiveIncorrect += 1;
    }

    // Adaptive difficulty logic: 
    // - 3 correct in a row: increase difficulty
    // - 2 wrong in a row: decrease difficulty
    let adjusted = false;
    let newDifficulty = currentDifficulty as DifficultyLevel;

    if (consecutiveCorrect >= 3) {
      if (currentDifficulty === 'easy') {
        newDifficulty = 'medium';
        adjusted = true;
      } else if (currentDifficulty === 'medium') {
        newDifficulty = 'hard';
        adjusted = true;
      }
      if (adjusted) {
        consecutiveCorrect = 0; // Reset after adjustment
      }
    } else if (consecutiveIncorrect >= 2) {
      if (currentDifficulty === 'hard') {
        newDifficulty = 'medium';
        adjusted = true;
      } else if (currentDifficulty === 'medium') {
        newDifficulty = 'easy';
        adjusted = true;
      }
      if (adjusted) {
        consecutiveIncorrect = 0; // Reset after adjustment
      }
    }

    // Update settings
    await db
      .update(userDifficultySettings)
      .set({
        currentDifficulty: newDifficulty,
        consecutiveCorrect,
        consecutiveIncorrect,
        totalAttempts,
        correctAttempts,
        lastAdjustedAt: adjusted ? now : settings.lastAdjustedAt,
        updatedAt: now
      })
      .where(eq(userDifficultySettings.id, settings.id));

    return { difficulty: newDifficulty, adjusted };
  }

  async getRecommendedDifficulty(userId: string, domain: string): Promise<DifficultyLevel> {
    const settings = await this.getUserDifficultySettings(userId, domain);
    return (settings?.currentDifficulty as DifficultyLevel) || 'medium';
  }

  // --- Weekly Leaderboard Methods ---

  async getWeeklyLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    // Get start of current week (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    // Aggregate XP from xpGrants table for this week
    const weeklyXpResults = await db
      .select({
        userId: xpGrants.userId,
        weeklyXp: sql<number>`CAST(COALESCE(SUM(${xpGrants.amount}), 0) AS INTEGER)`
      })
      .from(xpGrants)
      .where(gte(xpGrants.grantedAt, startOfWeek))
      .groupBy(xpGrants.userId)
      .orderBy(sql`SUM(${xpGrants.amount}) DESC`)
      .limit(limit);

    if (weeklyXpResults.length === 0) {
      return [];
    }

    // Get user details for the leaderboard
    const userIds = weeklyXpResults.map(r => r.userId);
    const userDetails = await db
      .select()
      .from(users)
      .where(inArray(users.id, userIds));

    const userMap = new Map(userDetails.map(u => [u.id, u]));

    // Build leaderboard entries
    return weeklyXpResults.map((result, index) => {
      const user = userMap.get(result.userId);
      const rankInfo = getSurveyorRank(user?.xp ?? 0);
      
      return {
        rank: index + 1,
        userId: result.userId,
        displayName: user?.firstName 
          ? `${user.firstName}${user.lastName ? ` ${user.lastName.charAt(0)}.` : ''}`
          : 'Anonymous Surveyor',
        profileImageUrl: user?.profileImageUrl ?? null,
        weeklyXp: result.weeklyXp,
        level: rankInfo.level,
        rankName: rankInfo.name
      };
    });
  }

  async getUserWeeklyRank(userId: string): Promise<{ rank: number; weeklyXp: number } | null> {
    const leaderboard = await this.getWeeklyLeaderboard(100);
    const userEntry = leaderboard.find(e => e.userId === userId);
    
    if (userEntry) {
      return { rank: userEntry.rank, weeklyXp: userEntry.weeklyXp };
    }

    // User not in top 100, calculate their position
    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    const [userXp] = await db
      .select({
        weeklyXp: sql<number>`CAST(COALESCE(SUM(${xpGrants.amount}), 0) AS INTEGER)`
      })
      .from(xpGrants)
      .where(and(
        eq(xpGrants.userId, userId),
        gte(xpGrants.grantedAt, startOfWeek)
      ));

    if (!userXp || userXp.weeklyXp === 0) {
      return null;
    }

    // Count users with more XP
    const [rankResult] = await db
      .select({
        rank: sql<number>`COUNT(*) + 1`
      })
      .from(
        db
          .select({
            userId: xpGrants.userId,
            total: sql<number>`SUM(${xpGrants.amount})`
          })
          .from(xpGrants)
          .where(gte(xpGrants.grantedAt, startOfWeek))
          .groupBy(xpGrants.userId)
          .having(sql`SUM(${xpGrants.amount}) > ${userXp.weeklyXp}`)
          .as('higher_users')
      );

    return { rank: rankResult.rank, weeklyXp: userXp.weeklyXp };
  }

  // --- Forgetting Curve Methods ---

  async getForgettingCurveData(userId: string, examTrack: string = 'fs'): Promise<{
    items: Array<{
      itemId: string;
      itemTitle: string;
      domain: string | null;
      daysSinceReview: number;
      retentionPercent: number;
      nextReviewIn: number;
      easeFactor: number;
      reviewCount: number;
    }>;
    summary: {
      avgRetention: number;
      itemsDue: number;
      itemsAtRisk: number;
    };
  }> {
    const now = new Date();
    
    // Get all review items for this user filtered by exam track
    const reviews = await db
      .select()
      .from(reviewSchedule)
      .where(and(
        eq(reviewSchedule.userId, userId),
        eq(reviewSchedule.examTrack, examTrack)
      ));

    if (reviews.length === 0) {
      return {
        items: [],
        summary: { avgRetention: 100, itemsDue: 0, itemsAtRisk: 0 }
      };
    }

    // Calculate forgetting curve for each item
    // Using Ebbinghaus formula: R = e^(-t/S) where S is stability based on easeFactor
    const items = reviews.map(review => {
      const lastReview = new Date(review.lastReviewedAt);
      const daysSinceReview = Math.max(0, Math.floor((now.getTime() - lastReview.getTime()) / (1000 * 60 * 60 * 24)));
      
      // Stability factor based on ease factor and review count
      // Higher ease factor and more reviews = slower forgetting
      const stability = review.easeFactor * Math.pow(1.5, review.reviewCount);
      
      // Retention percentage using exponential decay
      const retentionPercent = Math.round(100 * Math.exp(-daysSinceReview / stability));
      
      // Days until next review
      const nextReviewDate = new Date(review.nextReviewAt);
      const nextReviewIn = Math.max(0, Math.ceil((nextReviewDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

      return {
        itemId: review.itemId,
        itemTitle: review.itemTitle,
        domain: review.domain,
        daysSinceReview,
        retentionPercent,
        nextReviewIn,
        easeFactor: review.easeFactor,
        reviewCount: review.reviewCount
      };
    });

    // Calculate summary stats
    const avgRetention = Math.round(items.reduce((sum, i) => sum + i.retentionPercent, 0) / items.length);
    const itemsDue = items.filter(i => i.nextReviewIn <= 0).length;
    const itemsAtRisk = items.filter(i => i.retentionPercent < 50).length;

    return {
      items: items.sort((a, b) => a.retentionPercent - b.retentionPercent),
      summary: { avgRetention, itemsDue, itemsAtRisk }
    };
  }

  // --- Flashcard Review Sessions Methods ---

  async getFlashcardReviewSessions(userId: string, date?: Date): Promise<FlashcardReviewSession[]> {
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      return await db
        .select()
        .from(flashcardReviewSessions)
        .where(and(
          eq(flashcardReviewSessions.userId, userId),
          gte(flashcardReviewSessions.startedAt, startOfDay),
          lte(flashcardReviewSessions.startedAt, endOfDay)
        ))
        .orderBy(desc(flashcardReviewSessions.startedAt));
    }
    
    return await db
      .select()
      .from(flashcardReviewSessions)
      .where(eq(flashcardReviewSessions.userId, userId))
      .orderBy(desc(flashcardReviewSessions.startedAt));
  }

  async getTodayFlashcardSessions(userId: string): Promise<FlashcardReviewSession[]> {
    return this.getFlashcardReviewSessions(userId, new Date());
  }

  async createFlashcardReviewSession(session: InsertFlashcardReviewSession): Promise<FlashcardReviewSession> {
    const [created] = await db
      .insert(flashcardReviewSessions)
      .values(session)
      .returning();
    return created;
  }

  async completeFlashcardReviewSession(
    sessionId: string, 
    data: { 
      cardsReviewed: number; 
      avgMasteryRating?: number; 
      domainBreakdown?: Record<string, { reviewed: number; avgRating: number }>; 
      timeSpentSeconds: number;
    }
  ): Promise<FlashcardReviewSession> {
    const [updated] = await db
      .update(flashcardReviewSessions)
      .set({
        cardsReviewed: data.cardsReviewed,
        avgMasteryRating: data.avgMasteryRating,
        domainBreakdown: data.domainBreakdown,
        timeSpentSeconds: data.timeSpentSeconds,
        completedAt: new Date(),
        userState: null // Clear state on completion
      })
      .where(eq(flashcardReviewSessions.id, sessionId))
      .returning();
    return updated;
  }

  // Get active (incomplete) flashcard session for resume functionality
  async getActiveFlashcardSession(userId: string, examTrack: string): Promise<FlashcardReviewSession | undefined> {
    const [session] = await db
      .select()
      .from(flashcardReviewSessions)
      .where(and(
        eq(flashcardReviewSessions.userId, userId),
        eq(flashcardReviewSessions.examTrack, examTrack),
        sql`${flashcardReviewSessions.completedAt} IS NULL`
      ))
      .orderBy(desc(flashcardReviewSessions.startedAt))
      .limit(1);
    return session;
  }

  // Update session state (for resume persistence)
  async updateFlashcardSessionState(sessionId: string, state: FlashcardSessionState): Promise<FlashcardReviewSession> {
    const [updated] = await db
      .update(flashcardReviewSessions)
      .set({ userState: state })
      .where(eq(flashcardReviewSessions.id, sessionId))
      .returning();
    return updated;
  }

  // Auto-complete stale sessions older than 24 hours
  async autoCompleteStaleFlashcardSessions(userId: string, examTrack: string): Promise<void> {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    // Get stale sessions
    const staleSessions = await db
      .select()
      .from(flashcardReviewSessions)
      .where(and(
        eq(flashcardReviewSessions.userId, userId),
        eq(flashcardReviewSessions.examTrack, examTrack),
        sql`${flashcardReviewSessions.completedAt} IS NULL`,
        lte(flashcardReviewSessions.startedAt, oneDayAgo)
      ));
    
    for (const session of staleSessions) {
      // Get review event count for this session
      const events = await db
        .select({ count: sql<number>`count(*)` })
        .from(flashcardReviewEvents)
        .where(eq(flashcardReviewEvents.sessionId, session.id));
      
      const cardsReviewed = Number(events[0]?.count || 0);
      const timeSpent = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000);
      
      // Complete the stale session with review event data
      await db
        .update(flashcardReviewSessions)
        .set({
          cardsReviewed,
          timeSpentSeconds: Math.min(timeSpent, 86400), // Cap at 24 hours
          completedAt: new Date(),
          userState: null
        })
        .where(eq(flashcardReviewSessions.id, session.id));
      
      // Award XP if threshold met (5+ cards)
      if (cardsReviewed >= 5 && !session.xpAwarded) {
        await this.awardFlashcardReviewXp(userId, session.id, session.period);
      }
    }
  }

  // Log individual flashcard review event
  async logFlashcardReviewEvent(event: InsertFlashcardReviewEvent): Promise<FlashcardReviewEvent> {
    const [created] = await db
      .insert(flashcardReviewEvents)
      .values(event)
      .returning();
    
    // Log daily activity on first review event of the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    
    const todayEvents = await db
      .select({ count: sql<number>`count(*)` })
      .from(flashcardReviewEvents)
      .where(and(
        eq(flashcardReviewEvents.userId, event.userId),
        gte(flashcardReviewEvents.createdAt, today),
        lte(flashcardReviewEvents.createdAt, endOfDay)
      ));
    
    // Log daily activity if this is the first review of the day
    if (Number(todayEvents[0]?.count || 0) === 1) {
      await this.logDailyActivity(event.userId, 'flashcard_review');
    }
    
    return created;
  }

  // Get flashcard review event count for stats
  async getFlashcardReviewEventCount(userId: string, date?: Date): Promise<number> {
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(flashcardReviewEvents)
        .where(and(
          eq(flashcardReviewEvents.userId, userId),
          gte(flashcardReviewEvents.createdAt, startOfDay),
          lte(flashcardReviewEvents.createdAt, endOfDay)
        ));
      return Number(result[0]?.count || 0);
    }
    
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(flashcardReviewEvents)
      .where(eq(flashcardReviewEvents.userId, userId));
    return Number(result[0]?.count || 0);
  }

  // Award XP for flashcard review session (idempotent per period per day)
  async awardFlashcardReviewXp(userId: string, sessionId: string, period: string): Promise<{ awarded: boolean; xp: number }> {
    const today = new Date().toISOString().split('T')[0];
    const activityKey = `flashcard-review:${today}:${period}`;
    
    // Check if XP was already awarded for this period today
    const hasGrant = await this.hasXpGrant(userId, activityKey);
    if (hasGrant) {
      return { awarded: false, xp: 0 };
    }
    
    // Award XP (15 XP for flashcard review session)
    const result = await this.awardXp(userId, 15, activityKey);
    
    // Mark session as XP awarded
    await db
      .update(flashcardReviewSessions)
      .set({ xpAwarded: true })
      .where(eq(flashcardReviewSessions.id, sessionId));
    
    return { awarded: result.awarded, xp: result.awarded ? 15 : 0 };
  }

  // --- Daily Flashcard Progress Methods (for quest tracking) ---

  async recordFlashcardProgress(userId: string, cardId: string, mode: string, examTrack: string = 'fs', timezone: string = 'America/Chicago'): Promise<{ isNew: boolean; todayCount: number }> {
    const { today, tomorrow } = getLocalMidnight(timezone);

    // Check if this card was already recorded today for this mode
    const existing = await db
      .select()
      .from(dailyFlashcardProgress)
      .where(and(
        eq(dailyFlashcardProgress.userId, userId),
        eq(dailyFlashcardProgress.cardId, cardId),
        eq(dailyFlashcardProgress.mode, mode),
        gte(dailyFlashcardProgress.date, today),
        lt(dailyFlashcardProgress.date, tomorrow)
      ))
      .limit(1);

    let isNew = false;
    if (existing.length === 0) {
      // Record this card progress
      await db.insert(dailyFlashcardProgress).values({
        userId,
        cardId,
        mode,
        date: today
      });
      isNew = true;
      
      // Update the daily quest for flashcards (pass examTrack and timezone for correct quest matching)
      await this.updateQuestProgress(userId, 'complete_flashcards', 1, examTrack, timezone);
    }

    // Get today's total count (use same timezone)
    const todayCount = await this.getTodayFlashcardProgressCount(userId, timezone);
    
    return { isNew, todayCount };
  }

  async getTodayFlashcardProgressCount(userId: string, timezone: string = 'America/Chicago'): Promise<number> {
    const { today, tomorrow } = getLocalMidnight(timezone);

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(dailyFlashcardProgress)
      .where(and(
        eq(dailyFlashcardProgress.userId, userId),
        gte(dailyFlashcardProgress.date, today),
        lt(dailyFlashcardProgress.date, tomorrow)
      ));

    return Number(result[0]?.count || 0);
  }

  async createFlashcardChallengeSession(session: InsertFlashcardChallengeSession): Promise<FlashcardChallengeSession> {
    const [result] = await db.insert(flashcardChallengeSessions).values(session).returning();
    return result;
  }

  async getFlashcardChallengeSessions(userId: string, examTrack?: string): Promise<FlashcardChallengeSession[]> {
    const conditions = [eq(flashcardChallengeSessions.userId, userId)];
    if (examTrack) {
      conditions.push(eq(flashcardChallengeSessions.examTrack, examTrack));
    }
    return db
      .select()
      .from(flashcardChallengeSessions)
      .where(and(...conditions))
      .orderBy(desc(flashcardChallengeSessions.completedAt));
  }

  async getFlashcardChallengeStats(userId: string, examTrack?: string): Promise<{
    totalSessions: number;
    totalCards: number;
    overallAccuracy: number;
    domainStats: Record<string, { sessions: number; accuracy: number; totalCards: number }>;
  }> {
    const sessions = await this.getFlashcardChallengeSessions(userId, examTrack);
    
    if (sessions.length === 0) {
      return { totalSessions: 0, totalCards: 0, overallAccuracy: 0, domainStats: {} };
    }

    let totalCards = 0;
    let totalCorrectFirstTry = 0;
    let totalAttempts = 0;
    const domainMap: Record<string, { sessions: number; totalCards: number; totalCorrectFirstTry: number; totalAttempts: number }> = {};

    for (const session of sessions) {
      totalCards += session.totalCards;
      totalCorrectFirstTry += session.correctFirstTry;
      totalAttempts += session.totalAttempts;

      const domain = session.domain || 'All Domains';
      if (!domainMap[domain]) {
        domainMap[domain] = { sessions: 0, totalCards: 0, totalCorrectFirstTry: 0, totalAttempts: 0 };
      }
      domainMap[domain].sessions += 1;
      domainMap[domain].totalCards += session.totalCards;
      domainMap[domain].totalCorrectFirstTry += session.correctFirstTry;
      domainMap[domain].totalAttempts += session.totalAttempts;
    }

    const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrectFirstTry / totalAttempts) * 100) : 0;

    const domainStats: Record<string, { sessions: number; accuracy: number; totalCards: number }> = {};
    for (const [domain, data] of Object.entries(domainMap)) {
      domainStats[domain] = {
        sessions: data.sessions,
        accuracy: data.totalAttempts > 0 ? Math.round((data.totalCorrectFirstTry / data.totalAttempts) * 100) : 0,
        totalCards: data.totalCards,
      };
    }

    return {
      totalSessions: sessions.length,
      totalCards,
      overallAccuracy,
      domainStats,
    };
  }

  async resetUserStudyData(userId: string): Promise<{ success: boolean; tablesCleared: string[] }> {
    const tablesCleared: string[] = [];
    
    try {
      // Delete all user-specific study data (but keep the user account)
      await db.delete(weekProgress).where(eq(weekProgress.userId, userId));
      tablesCleared.push('weekProgress');
      
      await db.delete(quizResults).where(eq(quizResults.userId, userId));
      tablesCleared.push('quizResults');
      
      await db.delete(quizSessions).where(eq(quizSessions.userId, userId));
      tablesCleared.push('quizSessions');
      
      await db.delete(flashcardMastery).where(eq(flashcardMastery.userId, userId));
      tablesCleared.push('flashcardMastery');
      
      await db.delete(flashcardFeynmanScores).where(eq(flashcardFeynmanScores.userId, userId));
      tablesCleared.push('flashcardFeynmanScores');
      
      await db.delete(flashcardMnemonics).where(eq(flashcardMnemonics.userId, userId));
      tablesCleared.push('flashcardMnemonics');
      
      await db.delete(flashcardTriadProgress).where(eq(flashcardTriadProgress.userId, userId));
      tablesCleared.push('flashcardTriadProgress');
      
      await db.delete(flashcardReviewSessions).where(eq(flashcardReviewSessions.userId, userId));
      tablesCleared.push('flashcardReviewSessions');
      
      await db.delete(dailyFlashcardProgress).where(eq(dailyFlashcardProgress.userId, userId));
      tablesCleared.push('dailyFlashcardProgress');
      
      await db.delete(practiceExams).where(eq(practiceExams.userId, userId));
      tablesCleared.push('practiceExams');
      
      await db.delete(practiceExamResults).where(eq(practiceExamResults.userId, userId));
      tablesCleared.push('practiceExamResults');
      
      await db.delete(pretestResults).where(eq(pretestResults.userId, userId));
      tablesCleared.push('pretestResults');
      
      await db.delete(pretestQuestionResults).where(eq(pretestQuestionResults.userId, userId));
      tablesCleared.push('pretestQuestionResults');
      
      await db.delete(studyNotes).where(eq(studyNotes.userId, userId));
      tablesCleared.push('studyNotes');
      
      await db.delete(readingProgress).where(eq(readingProgress.userId, userId));
      tablesCleared.push('readingProgress');
      
      await db.delete(quizDrafts).where(eq(quizDrafts.userId, userId));
      tablesCleared.push('quizDrafts');
      
      await db.delete(examDrafts).where(eq(examDrafts.userId, userId));
      tablesCleared.push('examDrafts');
      
      await db.delete(dailyActivity).where(eq(dailyActivity.userId, userId));
      tablesCleared.push('dailyActivity');
      
      await db.delete(achievements).where(eq(achievements.userId, userId));
      tablesCleared.push('achievements');
      
      await db.delete(customWeeks).where(eq(customWeeks.userId, userId));
      tablesCleared.push('customWeeks');
      
      await db.delete(dailyLogs).where(eq(dailyLogs.userId, userId));
      tablesCleared.push('dailyLogs');
      
      await db.delete(studyCycles).where(eq(studyCycles.userId, userId));
      tablesCleared.push('studyCycles');
      
      await db.delete(lessonProgress).where(eq(lessonProgress.userId, userId));
      tablesCleared.push('lessonProgress');
      
      await db.delete(domainProgressSnapshots).where(eq(domainProgressSnapshots.userId, userId));
      tablesCleared.push('domainProgressSnapshots');
      
      await db.delete(applyChallengeAttempts).where(eq(applyChallengeAttempts.userId, userId));
      tablesCleared.push('applyChallengeAttempts');
      
      await db.delete(retentionReviews).where(eq(retentionReviews.userId, userId));
      tablesCleared.push('retentionReviews');
      
      await db.delete(xpGrants).where(eq(xpGrants.userId, userId));
      tablesCleared.push('xpGrants');
      
      await db.delete(dailyQuests).where(eq(dailyQuests.userId, userId));
      tablesCleared.push('dailyQuests');
      
      await db.delete(reviewSchedule).where(eq(reviewSchedule.userId, userId));
      tablesCleared.push('reviewSchedule');
      
      await db.delete(userDifficultySettings).where(eq(userDifficultySettings.userId, userId));
      tablesCleared.push('userDifficultySettings');
      
      // Reset XP on user record but keep preferences
      await db.update(users).set({ xp: 0 }).where(eq(users.id, userId));
      tablesCleared.push('userXpReset');
      
      return { success: true, tablesCleared };
    } catch (error) {
      console.error('Error resetting user study data:', error);
      throw error;
    }
  }

  async getStudyReadingProgress(userId: string, readingId: string): Promise<StudyReadingProgress[]> {
    return db.select().from(studyReadingProgress).where(
      and(
        eq(studyReadingProgress.userId, userId),
        eq(studyReadingProgress.readingId, readingId)
      )
    );
  }

  async getAllStudyReadingProgress(userId: string): Promise<StudyReadingProgress[]> {
    return db.select().from(studyReadingProgress).where(
      eq(studyReadingProgress.userId, userId)
    );
  }

  async markStudyReadingSectionComplete(userId: string, readingId: string, sectionId: string): Promise<StudyReadingProgress> {
    const existing = await db.select().from(studyReadingProgress).where(
      and(
        eq(studyReadingProgress.userId, userId),
        eq(studyReadingProgress.readingId, readingId),
        eq(studyReadingProgress.sectionId, sectionId)
      )
    );

    if (existing.length > 0) {
      return existing[0];
    }

    const [progress] = await db.insert(studyReadingProgress).values({
      userId,
      readingId,
      sectionId,
      completed: true,
      completedAt: new Date(),
    }).returning();

    return progress;
  }
}

export const storage = new DatabaseStorage();
