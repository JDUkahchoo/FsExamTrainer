import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
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

// --- Replit Auth Tables (from blueprint:javascript_log_in_with_replit) ---

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// --- Study Progress Tables ---

export const weekProgress = pgTable("week_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  week: integer("week").notNull(),
  readCompleted: text("read_completed").array().notNull().default(sql`'{}'::text[]`),
  focusCompleted: text("focus_completed").array().notNull().default(sql`'{}'::text[]`),
  applyCompleted: text("apply_completed").array().notNull().default(sql`'{}'::text[]`),
  reinforceCompleted: text("reinforce_completed").array().notNull().default(sql`'{}'::text[]`),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const weekProgressRelations = relations(weekProgress, ({ one }) => ({
  user: one(users, {
    fields: [weekProgress.userId],
    references: [users.id],
  }),
}));

export const insertWeekProgressSchema = createInsertSchema(weekProgress).omit({
  id: true,
  updatedAt: true,
});

export type InsertWeekProgress = z.infer<typeof insertWeekProgressSchema>;
export type WeekProgress = typeof weekProgress.$inferSelect;

// --- Quiz Results ---

export const quizResults = pgTable("quiz_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionId: varchar("question_id").notNull(),
  domain: text("domain").notNull(),
  selectedAnswer: integer("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const quizResultsRelations = relations(quizResults, ({ one }) => ({
  user: one(users, {
    fields: [quizResults.userId],
    references: [users.id],
  }),
}));

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
  completedAt: true,
});

export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

// --- Flashcard Mastery ---

export const flashcardMastery = pgTable("flashcard_mastery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  flashcardId: varchar("flashcard_id").notNull(),
  masteryLevel: integer("mastery_level").notNull().default(0), // 0-5
  lastReviewedAt: timestamp("last_reviewed_at").notNull().defaultNow(),
  reviewCount: integer("review_count").notNull().default(0),
});

export const flashcardMasteryRelations = relations(flashcardMastery, ({ one }) => ({
  user: one(users, {
    fields: [flashcardMastery.userId],
    references: [users.id],
  }),
}));

export const insertFlashcardMasterySchema = createInsertSchema(flashcardMastery).omit({
  id: true,
  lastReviewedAt: true,
});

export type InsertFlashcardMastery = z.infer<typeof insertFlashcardMasterySchema>;
export type FlashcardMastery = typeof flashcardMastery.$inferSelect;

// --- Practice Exam Results ---

export const practiceExams = pgTable("practice_exams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  timeSpentMinutes: integer("time_spent_minutes").notNull(),
  domainScores: jsonb("domain_scores").notNull(), // { domain: { correct, total } }
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const practiceExamsRelations = relations(practiceExams, ({ one }) => ({
  user: one(users, {
    fields: [practiceExams.userId],
    references: [users.id],
  }),
}));

export const insertPracticeExamSchema = createInsertSchema(practiceExams).omit({
  id: true,
  completedAt: true,
});

export type InsertPracticeExam = z.infer<typeof insertPracticeExamSchema>;
export type PracticeExam = typeof practiceExams.$inferSelect;

// --- Study Notes ---

export const studyNotes = pgTable("study_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  week: integer("week").notNull(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const studyNotesRelations = relations(studyNotes, ({ one }) => ({
  user: one(users, {
    fields: [studyNotes.userId],
    references: [users.id],
  }),
}));

export const insertStudyNoteSchema = createInsertSchema(studyNotes).omit({
  id: true,
  updatedAt: true,
});

export type InsertStudyNote = z.infer<typeof insertStudyNoteSchema>;
export type StudyNote = typeof studyNotes.$inferSelect;

// --- User Relations ---

export const usersRelations = relations(users, ({ many }) => ({
  weekProgress: many(weekProgress),
  quizResults: many(quizResults),
  flashcardMastery: many(flashcardMastery),
  practiceExams: many(practiceExams),
  studyNotes: many(studyNotes),
}));

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
