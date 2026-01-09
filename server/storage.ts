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
  InsertFlashcardTriadProgress
} from "@shared/schema";
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
  flashcardTriadProgress
} from "@shared/schema";
import { eq, and, desc, gte, sql, inArray } from "drizzle-orm";

export interface IStorage {
  // User methods (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Week Progress methods
  getWeekProgress(userId: string, week: number): Promise<WeekProgress | undefined>;
  getAllWeekProgress(userId: string): Promise<WeekProgress[]>;
  upsertWeekProgress(progress: InsertWeekProgress): Promise<WeekProgress>;

  // Quiz Results methods
  getQuizResults(userId: string): Promise<QuizResult[]>;
  getQuizResultsByDomain(userId: string, domain: string): Promise<QuizResult[]>;
  getQuizResultsBySession(sessionId: string): Promise<QuizResult[]>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  deleteAllQuizResults(userId: string): Promise<void>;
  
  // FOCUS Weakness Scanner methods
  getRecentMisses(userId: string, limit?: number): Promise<QuizResult[]>;
  getDomainStats(userId: string): Promise<{ domain: string; total: number; correct: number; accuracy: number }[]>;
  getCorrectStreak(userId: string): Promise<{ current: number; best: number }>;

  // Quiz Session methods
  getQuizSessions(userId: string): Promise<QuizSession[]>;
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
  getReadingProgress(userId: string, week: number): Promise<ReadingProgress[]>;
  getAllReadingProgress(userId: string): Promise<ReadingProgress[]>;
  upsertReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress>;

  // APPLY Challenge Attempts methods (Scenario Lab)
  getApplyChallengeAttempts(userId: string, week?: number): Promise<ApplyChallengeAttempt[]>;
  createApplyChallengeAttempt(attempt: InsertApplyChallengeAttempt): Promise<ApplyChallengeAttempt>;
  updateApplyChallengeAttempt(userId: string, attemptId: string, updates: Partial<InsertApplyChallengeAttempt>): Promise<ApplyChallengeAttempt>;

  // REINFORCE Retention Reviews methods (Spaced Repetition)
  getRetentionReviews(userId: string, week?: number): Promise<RetentionReview[]>;
  getDueRetentionReviews(userId: string, week?: number): Promise<RetentionReview[]>;
  createRetentionReview(review: InsertRetentionReview): Promise<RetentionReview>;
  updateRetentionReview(userId: string, reviewId: string, updates: Partial<InsertRetentionReview>): Promise<RetentionReview>;
  getRetentionStats(userId: string, week?: number): Promise<{ totalReviews: number; dueToday: number; averageMastery: number; retentionScore: number }>;

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
  getActiveQuizDraft(userId: string): Promise<QuizDraft | undefined>;
  saveQuizDraft(draft: InsertQuizDraft): Promise<QuizDraft>;
  deleteQuizDraft(userId: string): Promise<void>;

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
  getLessonsByWeek(week: number): Promise<Lesson[]>;
  getLessonWithQuestions(lessonId: string): Promise<{ lesson: Lesson; questions: LessonQuestion[] } | undefined>;
  getLessonWithRandomizedQuestions(userId: string, lessonId: string): Promise<{ lesson: Lesson; questions: LessonQuestion[] } | undefined>;
  getQuestionsByIds(questionIds: string[]): Promise<LessonQuestion[]>;
  getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | undefined>;
  getAllLessonProgress(userId: string): Promise<LessonProgress[]>;
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

  // Week Progress methods
  async getWeekProgress(userId: string, week: number): Promise<WeekProgress | undefined> {
    const [progress] = await db
      .select()
      .from(weekProgress)
      .where(and(eq(weekProgress.userId, userId), eq(weekProgress.week, week)));
    return progress || undefined;
  }

  async getAllWeekProgress(userId: string): Promise<WeekProgress[]> {
    return await db
      .select()
      .from(weekProgress)
      .where(eq(weekProgress.userId, userId));
  }

  async upsertWeekProgress(progress: InsertWeekProgress): Promise<WeekProgress> {
    const existing = await this.getWeekProgress(progress.userId, progress.week);
    
    if (existing) {
      const [updated] = await db
        .update(weekProgress)
        .set({ ...progress, updatedAt: new Date() })
        .where(and(
          eq(weekProgress.userId, progress.userId),
          eq(weekProgress.week, progress.week)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(weekProgress)
        .values({ ...progress, updatedAt: new Date() })
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
  async getRecentMisses(userId: string, limit: number = 20): Promise<QuizResult[]> {
    return await db
      .select()
      .from(quizResults)
      .where(and(eq(quizResults.userId, userId), eq(quizResults.isCorrect, false)))
      .orderBy(desc(quizResults.completedAt))
      .limit(limit);
  }

  async getDomainStats(userId: string): Promise<{ domain: string; total: number; correct: number; accuracy: number }[]> {
    const results = await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId));
    
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

  async getCorrectStreak(userId: string): Promise<{ current: number; best: number }> {
    const results = await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId))
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
  async getQuizSessions(userId: string): Promise<QuizSession[]> {
    return await db
      .select()
      .from(quizSessions)
      .where(eq(quizSessions.userId, userId))
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
  async getReadingProgress(userId: string, week: number): Promise<ReadingProgress[]> {
    return await db
      .select()
      .from(readingProgress)
      .where(and(eq(readingProgress.userId, userId), eq(readingProgress.week, week)));
  }

  async getAllReadingProgress(userId: string): Promise<ReadingProgress[]> {
    return await db
      .select()
      .from(readingProgress)
      .where(eq(readingProgress.userId, userId));
  }

  async upsertReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress> {
    const existing = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, progress.userId),
          eq(readingProgress.week, progress.week),
          eq(readingProgress.chapterIndex, progress.chapterIndex)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(readingProgress)
        .set({
          completed: progress.completed,
          confidenceRating: progress.confidenceRating,
          takeawayNote: progress.takeawayNote,
          completedAt: progress.completed ? new Date() : null,
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
  async getApplyChallengeAttempts(userId: string, week?: number): Promise<ApplyChallengeAttempt[]> {
    if (week !== undefined) {
      return await db
        .select()
        .from(applyChallengeAttempts)
        .where(and(eq(applyChallengeAttempts.userId, userId), eq(applyChallengeAttempts.week, week)))
        .orderBy(desc(applyChallengeAttempts.startedAt));
    }
    return await db
      .select()
      .from(applyChallengeAttempts)
      .where(eq(applyChallengeAttempts.userId, userId))
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
  async getRetentionReviews(userId: string, week?: number): Promise<RetentionReview[]> {
    if (week !== undefined) {
      return await db
        .select()
        .from(retentionReviews)
        .where(and(eq(retentionReviews.userId, userId), eq(retentionReviews.week, week)))
        .orderBy(desc(retentionReviews.createdAt));
    }
    return await db
      .select()
      .from(retentionReviews)
      .where(eq(retentionReviews.userId, userId))
      .orderBy(desc(retentionReviews.createdAt));
  }

  async getDueRetentionReviews(userId: string, week?: number): Promise<RetentionReview[]> {
    const now = new Date();
    if (week !== undefined) {
      return await db
        .select()
        .from(retentionReviews)
        .where(and(
          eq(retentionReviews.userId, userId),
          eq(retentionReviews.week, week),
          sql`${retentionReviews.nextReviewAt} IS NULL OR ${retentionReviews.nextReviewAt} <= ${now}`
        ))
        .orderBy(retentionReviews.nextReviewAt);
    }
    return await db
      .select()
      .from(retentionReviews)
      .where(and(
        eq(retentionReviews.userId, userId),
        sql`${retentionReviews.nextReviewAt} IS NULL OR ${retentionReviews.nextReviewAt} <= ${now}`
      ))
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

  async getRetentionStats(userId: string, week?: number): Promise<{ totalReviews: number; dueToday: number; averageMastery: number; retentionScore: number }> {
    const allReviews = await this.getRetentionReviews(userId, week);
    const dueReviews = await this.getDueRetentionReviews(userId, week);
    
    if (allReviews.length === 0) {
      return { totalReviews: 0, dueToday: 0, averageMastery: 0, retentionScore: 100 };
    }

    const totalMastery = allReviews.reduce((sum, r) => sum + r.masteryLevel, 0);
    const averageMastery = totalMastery / allReviews.length;
    
    // Calculate retention score based on decay from last review
    const now = Date.now();
    let totalRetention = 0;
    for (const review of allReviews) {
      if (!review.lastReviewedAt) {
        totalRetention += 0; // Never reviewed = 0 retention
      } else {
        const daysSinceReview = (now - new Date(review.lastReviewedAt).getTime()) / (1000 * 60 * 60 * 24);
        // Exponential decay formula based on interval
        const expectedInterval = review.intervalDays || 1;
        const decayRate = 0.5; // Memory halves after expected interval
        const retention = Math.pow(decayRate, daysSinceReview / expectedInterval) * 100;
        totalRetention += Math.min(100, Math.max(0, retention));
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

    // Check if there's already an entry for today
    const [existing] = await db
      .select()
      .from(dailyActivity)
      .where(and(
        eq(dailyActivity.userId, userId),
        eq(dailyActivity.date, today)
      ));

    if (existing) {
      // Update existing entry with new activity type if not already included
      if (!existing.activityTypes.includes(activityType)) {
        await db
          .update(dailyActivity)
          .set({
            activityTypes: [...existing.activityTypes, activityType]
          })
          .where(and(
            eq(dailyActivity.userId, userId),
            eq(dailyActivity.date, today)
          ));
      }
    } else {
      // Create new entry for today
      await db
        .insert(dailyActivity)
        .values({
          userId,
          date: today,
          activityTypes: [activityType]
        });
    }
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
  async getActiveQuizDraft(userId: string): Promise<QuizDraft | undefined> {
    const [draft] = await db
      .select()
      .from(quizDrafts)
      .where(eq(quizDrafts.userId, userId))
      .orderBy(desc(quizDrafts.startedAt))
      .limit(1);
    return draft || undefined;
  }

  async saveQuizDraft(draftData: InsertQuizDraft): Promise<QuizDraft> {
    // Delete any existing draft for this user first (one draft at a time)
    await this.deleteQuizDraft(draftData.userId);
    
    const [draft] = await db
      .insert(quizDrafts)
      .values(draftData)
      .returning();
    return draft;
  }

  async deleteQuizDraft(userId: string): Promise<void> {
    await db
      .delete(quizDrafts)
      .where(eq(quizDrafts.userId, userId));
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
  async getLessonsByDomain(domainNumber: number): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.domainNumber, domainNumber))
      .orderBy(lessons.orderIndex);
  }

  async getLessonsByWeek(week: number): Promise<Lesson[]> {
    // For backward compatibility and Standard mode
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.suggestedWeek, week))
      .orderBy(lessons.orderIndex);
  }

  async getAllLessons(): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .orderBy(lessons.domainNumber, lessons.orderIndex);
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

  async getAllLessonProgress(userId: string): Promise<LessonProgress[]> {
    return await db
      .select()
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, userId));
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

  // Domain mastery tracking
  async getDomainMastery(userId: string): Promise<Array<{
    domainNumber: number;
    domain: string;
    currentScore: number;
    isStagnant: boolean;
    alert?: string;
  }>> {
    const DOMAINS_LIST = ['Math & Basic Science', 'Field Data Acquisition', 'Mapping, GIS, and CAD', 'Boundary Law & PLSS', 'Surveying Principles', 'Survey Computations & Applications', 'Professional Practice', 'Applied Mathematics & Statistics'];
    
    const result: Array<any> = [];
    
    for (let i = 0; i < 8; i++) {
      const domain = DOMAINS_LIST[i];
      
      // Get quiz results for this domain
      const domainResults = await db.select()
        .from(quizResults)
        .where(and(eq(quizResults.userId, userId), eq(quizResults.domain, domain)));
      
      let currentScore = 0;
      if (domainResults.length > 0) {
        const correct = domainResults.filter((r: any) => r.isCorrect).length;
        currentScore = Math.round((correct / domainResults.length) * 100);
      }
      
      let isStagnant = false;
      let alert: string | undefined;
      
      // Check if domain hasn't improved in 2 weeks
      if (currentScore > 0 && currentScore < 70) {
        alert = currentScore < 50 ? 'Needs focus' : 'Keep practicing';
      }
      
      if (currentScore >= 85) {
        alert = 'Mastered!';
      }
      
      result.push({
        domainNumber: i,
        domain,
        currentScore,
        isStagnant,
        alert
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
}

export const storage = new DatabaseStorage();
