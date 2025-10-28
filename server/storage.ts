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
  StudyNote,
  InsertStudyNote,
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
  PretestResult,
  InsertPretestResult,
  UserPreferences,
  InsertUserPreferences,
  User,
  UpsertUser,
  StudyStreak
} from "@shared/schema";
import { db } from "./db";
import {
  users,
  weekProgress,
  quizResults,
  quizSessions,
  flashcardMastery,
  practiceExams,
  studyNotes,
  quizDrafts,
  examDrafts,
  dailyActivity,
  achievements,
  customWeeks,
  pretestResults,
  userPreferences
} from "@shared/schema";
import { eq, and, desc, gte, sql } from "drizzle-orm";

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
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  deleteAllQuizResults(userId: string): Promise<void>;

  // Quiz Session methods
  getQuizSessions(userId: string): Promise<QuizSession[]>;
  getQuizSessionsByDomain(userId: string, domain: string): Promise<QuizSession[]>;
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;

  // Flashcard Mastery methods
  getFlashcardMastery(userId: string, flashcardId: string): Promise<FlashcardMastery | undefined>;
  getAllFlashcardMastery(userId: string): Promise<FlashcardMastery[]>;
  upsertFlashcardMastery(mastery: InsertFlashcardMastery): Promise<FlashcardMastery>;
  deleteAllFlashcardMastery(userId: string): Promise<void>;

  // Practice Exam methods
  getPracticeExams(userId: string): Promise<PracticeExam[]>;
  getLatestPracticeExam(userId: string): Promise<PracticeExam | undefined>;
  createPracticeExam(exam: InsertPracticeExam): Promise<PracticeExam>;

  // Study Notes methods
  getStudyNote(userId: string, week: number): Promise<StudyNote | undefined>;
  getAllStudyNotes(userId: string): Promise<StudyNote[]>;
  upsertStudyNote(note: InsertStudyNote): Promise<StudyNote>;

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
  savePretestResult(result: InsertPretestResult): Promise<PretestResult>;

  // User Preferences methods
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  upsertUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences>;
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
        target: users.email,
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

  // Study Notes methods
  async getStudyNote(userId: string, week: number): Promise<StudyNote | undefined> {
    const [note] = await db
      .select()
      .from(studyNotes)
      .where(and(eq(studyNotes.userId, userId), eq(studyNotes.week, week)));
    return note || undefined;
  }

  async getAllStudyNotes(userId: string): Promise<StudyNote[]> {
    return await db
      .select()
      .from(studyNotes)
      .where(eq(studyNotes.userId, userId));
  }

  async upsertStudyNote(note: InsertStudyNote): Promise<StudyNote> {
    const existing = await this.getStudyNote(note.userId, note.week);
    
    if (existing) {
      const [updated] = await db
        .update(studyNotes)
        .set({ content: note.content, updatedAt: new Date() })
        .where(and(
          eq(studyNotes.userId, note.userId),
          eq(studyNotes.week, note.week)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(studyNotes)
        .values({ ...note, updatedAt: new Date() })
        .returning();
      return created;
    }
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
}

export const storage = new DatabaseStorage();
