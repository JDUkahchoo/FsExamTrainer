import type {
  WeekProgress,
  InsertWeekProgress,
  QuizResult,
  InsertQuizResult,
  FlashcardMastery,
  InsertFlashcardMastery,
  PracticeExam,
  InsertPracticeExam,
  StudyNote,
  InsertStudyNote,
  User,
  UpsertUser
} from "@shared/schema";
import { db } from "./db";
import {
  users,
  weekProgress,
  quizResults,
  flashcardMastery,
  practiceExams,
  studyNotes
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

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
    const existing = await this.getFlashcardMastery(mastery.userId, mastery.flashcardId);
    
    if (existing) {
      const [updated] = await db
        .update(flashcardMastery)
        .set({
          masteryLevel: mastery.masteryLevel,
          reviewCount: existing.reviewCount + 1,
          lastReviewedAt: new Date()
        })
        .where(and(
          eq(flashcardMastery.userId, mastery.userId),
          eq(flashcardMastery.flashcardId, mastery.flashcardId)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(flashcardMastery)
        .values({
          ...mastery,
          reviewCount: 1,
          lastReviewedAt: new Date()
        })
        .returning();
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
}

export const storage = new DatabaseStorage();
