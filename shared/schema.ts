import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- Domain Types ---
export type Domain = 
  | 'Math & Basic Science'
  | 'Field Data Acquisition'
  | 'Plane Survey Computations'
  | 'Mapping, GIS, and CAD'
  | 'Boundary Law & PLSS'
  | 'Geodesy, GPS, Astronomy'
  | 'Professional Practice';

export const DOMAINS: Domain[] = [
  'Math & Basic Science',
  'Field Data Acquisition',
  'Plane Survey Computations',
  'Mapping, GIS, and CAD',
  'Boundary Law & PLSS',
  'Geodesy, GPS, Astronomy',
  'Professional Practice'
];

// --- Study Progress ---
export const weekProgress = pgTable("week_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  week: integer("week").notNull(),
  readCompleted: text("read_completed").array().notNull().default(sql`'{}'::text[]`),
  focusCompleted: text("focus_completed").array().notNull().default(sql`'{}'::text[]`),
  applyCompleted: text("apply_completed").array().notNull().default(sql`'{}'::text[]`),
  reinforceCompleted: text("reinforce_completed").array().notNull().default(sql`'{}'::text[]`),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWeekProgressSchema = createInsertSchema(weekProgress).omit({
  id: true,
  updatedAt: true,
});

export type InsertWeekProgress = z.infer<typeof insertWeekProgressSchema>;
export type WeekProgress = typeof weekProgress.$inferSelect;

// --- Quiz Questions ---
export const quizQuestions = pgTable("quiz_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  domain: text("domain").notNull(),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  difficulty: text("difficulty").notNull(), // 'easy', 'medium', 'hard'
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({
  id: true,
});

export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;

// --- Quiz Results ---
export const quizResults = pgTable("quiz_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionId: varchar("question_id").notNull(),
  domain: text("domain").notNull(),
  selectedAnswer: integer("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
  completedAt: true,
});

export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

// --- Flashcards ---
export const flashcards = pgTable("flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  domain: text("domain").notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  category: text("category").notNull(), // 'formula', 'definition', 'concept'
});

export const insertFlashcardSchema = createInsertSchema(flashcards).omit({
  id: true,
});

export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type Flashcard = typeof flashcards.$inferSelect;

// --- Flashcard Mastery ---
export const flashcardMastery = pgTable("flashcard_mastery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  flashcardId: varchar("flashcard_id").notNull(),
  masteryLevel: integer("mastery_level").notNull().default(0), // 0-5
  lastReviewedAt: timestamp("last_reviewed_at").notNull().defaultNow(),
  reviewCount: integer("review_count").notNull().default(0),
});

export const insertFlashcardMasterySchema = createInsertSchema(flashcardMastery).omit({
  id: true,
  lastReviewedAt: true,
});

export type InsertFlashcardMastery = z.infer<typeof insertFlashcardMasterySchema>;
export type FlashcardMastery = typeof flashcardMastery.$inferSelect;

// --- Practice Exam Results ---
export const practiceExams = pgTable("practice_exams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  timeSpentMinutes: integer("time_spent_minutes").notNull(),
  domainScores: jsonb("domain_scores").notNull(), // { domain: { correct, total } }
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const insertPracticeExamSchema = createInsertSchema(practiceExams).omit({
  id: true,
  completedAt: true,
});

export type InsertPracticeExam = z.infer<typeof insertPracticeExamSchema>;
export type PracticeExam = typeof practiceExams.$inferSelect;

// --- Study Notes ---
export const studyNotes = pgTable("study_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  week: integer("week").notNull(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertStudyNoteSchema = createInsertSchema(studyNotes).omit({
  id: true,
  updatedAt: true,
});

export type InsertStudyNote = z.infer<typeof insertStudyNoteSchema>;
export type StudyNote = typeof studyNotes.$inferSelect;

// --- User Table (keep existing) ---
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// --- Frontend-only Types (for UI state management) ---
export type WeekPlan = {
  week: number;
  title: string;
  domains: Domain[];
  read: string[];
  focus: string[];
  apply: string[];
  reinforce: string[];
};

export type DomainStats = {
  domain: Domain;
  questionsAnswered: number;
  questionsCorrect: number;
  accuracy: number;
  cardsReviewed: number;
  cardsMastered: number;
};

export type StudyStreak = {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
};
