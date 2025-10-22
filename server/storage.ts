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
  InsertUser
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Week Progress methods
  getWeekProgress(week: number): Promise<WeekProgress | undefined>;
  getAllWeekProgress(): Promise<WeekProgress[]>;
  upsertWeekProgress(progress: InsertWeekProgress): Promise<WeekProgress>;

  // Quiz Results methods
  getQuizResults(): Promise<QuizResult[]>;
  getQuizResultsByDomain(domain: string): Promise<QuizResult[]>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  deleteAllQuizResults(): Promise<void>;

  // Flashcard Mastery methods
  getFlashcardMastery(flashcardId: string): Promise<FlashcardMastery | undefined>;
  getAllFlashcardMastery(): Promise<FlashcardMastery[]>;
  upsertFlashcardMastery(mastery: InsertFlashcardMastery): Promise<FlashcardMastery>;
  deleteAllFlashcardMastery(): Promise<void>;

  // Practice Exam methods
  getPracticeExams(): Promise<PracticeExam[]>;
  getLatestPracticeExam(): Promise<PracticeExam | undefined>;
  createPracticeExam(exam: InsertPracticeExam): Promise<PracticeExam>;

  // Study Notes methods
  getStudyNote(week: number): Promise<StudyNote | undefined>;
  getAllStudyNotes(): Promise<StudyNote[]>;
  upsertStudyNote(note: InsertStudyNote): Promise<StudyNote>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private weekProgress: Map<number, WeekProgress>;
  private quizResults: Map<string, QuizResult>;
  private flashcardMastery: Map<string, FlashcardMastery>;
  private practiceExams: Map<string, PracticeExam>;
  private studyNotes: Map<number, StudyNote>;

  constructor() {
    this.users = new Map();
    this.weekProgress = new Map();
    this.quizResults = new Map();
    this.flashcardMastery = new Map();
    this.practiceExams = new Map();
    this.studyNotes = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Week Progress methods
  async getWeekProgress(week: number): Promise<WeekProgress | undefined> {
    return this.weekProgress.get(week);
  }

  async getAllWeekProgress(): Promise<WeekProgress[]> {
    return Array.from(this.weekProgress.values());
  }

  async upsertWeekProgress(progress: InsertWeekProgress): Promise<WeekProgress> {
    const existing = this.weekProgress.get(progress.week);
    const weekProgress: WeekProgress = existing
      ? { ...existing, ...progress, updatedAt: new Date() }
      : { 
          id: randomUUID(), 
          ...progress, 
          updatedAt: new Date() 
        };
    this.weekProgress.set(progress.week, weekProgress);
    return weekProgress;
  }

  // Quiz Results methods
  async getQuizResults(): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values());
  }

  async getQuizResultsByDomain(domain: string): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(
      (result) => result.domain === domain
    );
  }

  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const id = randomUUID();
    const quizResult: QuizResult = { 
      ...result, 
      id, 
      completedAt: new Date() 
    };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }

  async deleteAllQuizResults(): Promise<void> {
    this.quizResults.clear();
  }

  // Flashcard Mastery methods
  async getFlashcardMastery(flashcardId: string): Promise<FlashcardMastery | undefined> {
    return this.flashcardMastery.get(flashcardId);
  }

  async getAllFlashcardMastery(): Promise<FlashcardMastery[]> {
    return Array.from(this.flashcardMastery.values());
  }

  async upsertFlashcardMastery(mastery: InsertFlashcardMastery): Promise<FlashcardMastery> {
    const existing = this.flashcardMastery.get(mastery.flashcardId);
    const flashcardMastery: FlashcardMastery = existing
      ? { 
          ...existing, 
          masteryLevel: mastery.masteryLevel,
          reviewCount: existing.reviewCount + 1,
          lastReviewedAt: new Date() 
        }
      : { 
          id: randomUUID(), 
          ...mastery, 
          reviewCount: 1,
          lastReviewedAt: new Date() 
        };
    this.flashcardMastery.set(mastery.flashcardId, flashcardMastery);
    return flashcardMastery;
  }

  async deleteAllFlashcardMastery(): Promise<void> {
    this.flashcardMastery.clear();
  }

  // Practice Exam methods
  async getPracticeExams(): Promise<PracticeExam[]> {
    return Array.from(this.practiceExams.values()).sort(
      (a, b) => b.completedAt.getTime() - a.completedAt.getTime()
    );
  }

  async getLatestPracticeExam(): Promise<PracticeExam | undefined> {
    const exams = await this.getPracticeExams();
    return exams[0];
  }

  async createPracticeExam(exam: InsertPracticeExam): Promise<PracticeExam> {
    const id = randomUUID();
    const practiceExam: PracticeExam = { 
      ...exam, 
      id, 
      completedAt: new Date() 
    };
    this.practiceExams.set(id, practiceExam);
    return practiceExam;
  }

  // Study Notes methods
  async getStudyNote(week: number): Promise<StudyNote | undefined> {
    return this.studyNotes.get(week);
  }

  async getAllStudyNotes(): Promise<StudyNote[]> {
    return Array.from(this.studyNotes.values());
  }

  async upsertStudyNote(note: InsertStudyNote): Promise<StudyNote> {
    const existing = this.studyNotes.get(note.week);
    const studyNote: StudyNote = existing
      ? { ...existing, content: note.content, updatedAt: new Date() }
      : { 
          id: randomUUID(), 
          ...note, 
          updatedAt: new Date() 
        };
    this.studyNotes.set(note.week, studyNote);
    return studyNote;
  }
}

export const storage = new MemStorage();
