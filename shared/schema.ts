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

// --- Quiz Sessions ---

export const quizSessions = pgTable("quiz_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  domain: text("domain").notNull(), // Domain filter used, or "all" for mixed
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  timeSpentSeconds: integer("time_spent_seconds").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const quizSessionsRelations = relations(quizSessions, ({ one }) => ({
  user: one(users, {
    fields: [quizSessions.userId],
    references: [users.id],
  }),
}));

export const insertQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true,
  completedAt: true,
});

export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type QuizSession = typeof quizSessions.$inferSelect;

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

// --- Quiz Drafts (for resume functionality) ---

export const quizDrafts = pgTable("quiz_drafts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  domain: text("domain").notNull(), // Domain filter used, or "all" for mixed
  questionIds: text("question_ids").array().notNull(), // Array of question IDs in this quiz
  currentQuestionIndex: integer("current_question_index").notNull().default(0),
  userAnswers: jsonb("user_answers").notNull().default(sql`'{}'::jsonb`), // { [index]: answerIndex }
  timeSpentSeconds: integer("time_spent_seconds").notNull().default(0),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const quizDraftsRelations = relations(quizDrafts, ({ one }) => ({
  user: one(users, {
    fields: [quizDrafts.userId],
    references: [users.id],
  }),
}));

export const insertQuizDraftSchema = createInsertSchema(quizDrafts).omit({
  id: true,
  startedAt: true,
  updatedAt: true,
});

export type InsertQuizDraft = z.infer<typeof insertQuizDraftSchema>;
export type QuizDraft = typeof quizDrafts.$inferSelect;

// --- Exam Drafts (for resume functionality) ---

export const examDrafts = pgTable("exam_drafts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionIds: text("question_ids").array().notNull(), // Array of exam question IDs
  currentQuestionIndex: integer("current_question_index").notNull().default(0),
  userAnswers: jsonb("user_answers").notNull().default(sql`'{}'::jsonb`), // { [index]: answerIndex }
  timeSpentMinutes: integer("time_spent_minutes").notNull().default(0),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const examDraftsRelations = relations(examDrafts, ({ one }) => ({
  user: one(users, {
    fields: [examDrafts.userId],
    references: [users.id],
  }),
}));

export const insertExamDraftSchema = createInsertSchema(examDrafts).omit({
  id: true,
  startedAt: true,
  updatedAt: true,
});

export type InsertExamDraft = z.infer<typeof insertExamDraftSchema>;
export type ExamDraft = typeof examDrafts.$inferSelect;

// --- User Relations ---

export const usersRelations = relations(users, ({ many }) => ({
  weekProgress: many(weekProgress),
  quizResults: many(quizResults),
  quizSessions: many(quizSessions),
  flashcardMastery: many(flashcardMastery),
  practiceExams: many(practiceExams),
  studyNotes: many(studyNotes),
  quizDrafts: many(quizDrafts),
  examDrafts: many(examDrafts),
  dailyActivity: many(dailyActivity),
  achievements: many(achievements),
  customWeeks: many(customWeeks),
}));

// --- Frontend-only Types (for UI state management) ---

export type Flashcard = {
  domain: Domain;
  front: string;
  back: string;
  category: 'formula' | 'definition' | 'concept';
};

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

// --- Daily Activity Tracking ---

export const dailyActivity = pgTable("daily_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: text("date").notNull(), // YYYY-MM-DD format
  activityTypes: text("activity_types").array().notNull().default(sql`'{}'::text[]`), // ['quiz', 'flashcard', 'notes', 'week_complete']
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dailyActivityRelations = relations(dailyActivity, ({ one }) => ({
  user: one(users, {
    fields: [dailyActivity.userId],
    references: [users.id],
  }),
}));

export const insertDailyActivitySchema = createInsertSchema(dailyActivity).omit({
  id: true,
  createdAt: true,
});

export type InsertDailyActivity = z.infer<typeof insertDailyActivitySchema>;
export type DailyActivity = typeof dailyActivity.$inferSelect;

// --- Achievements ---

export type AchievementType = 
  | 'week_1_complete'
  | 'week_8_complete'
  | 'all_weeks_complete'
  | 'quiz_master'
  | 'flashcard_champion'
  | 'practice_exam_pro'
  | 'streak_7_days'
  | 'streak_14_days'
  | 'streak_30_days'
  | 'perfect_quiz';

export const ACHIEVEMENT_TYPES: AchievementType[] = [
  'week_1_complete',
  'week_8_complete',
  'all_weeks_complete',
  'quiz_master',
  'flashcard_champion',
  'practice_exam_pro',
  'streak_7_days',
  'streak_14_days',
  'streak_30_days',
  'perfect_quiz',
];

export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievementType: text("achievement_type").notNull(),
  earnedAt: timestamp("earned_at").notNull().defaultNow(),
});

export const achievementsRelations = relations(achievements, ({ one }) => ({
  user: one(users, {
    fields: [achievements.userId],
    references: [users.id],
  }),
}));

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  earnedAt: true,
});

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

// --- Custom Study Weeks ---

export const customWeeks = pgTable("custom_weeks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  weekNumber: integer("week_number").notNull(), // 17, 18, 19, etc.
  title: text("title").notNull(),
  domain: text("domain"), // Primary domain focus
  description: text("description"), // Optional description for the custom week
  readItems: text("read_items").array().notNull().default(sql`'{}'::text[]`),
  focusItems: text("focus_items").array().notNull().default(sql`'{}'::text[]`),
  applyItems: text("apply_items").array().notNull().default(sql`'{}'::text[]`),
  reinforceItems: text("reinforce_items").array().notNull().default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const customWeeksRelations = relations(customWeeks, ({ one }) => ({
  user: one(users, {
    fields: [customWeeks.userId],
    references: [users.id],
  }),
}));

export const insertCustomWeekSchema = createInsertSchema(customWeeks).omit({
  id: true,
  createdAt: true,
});

export type InsertCustomWeek = z.infer<typeof insertCustomWeekSchema>;
export type CustomWeek = typeof customWeeks.$inferSelect;

// --- Pretest Results ---

export const pretestResults = pgTable("pretest_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  domainScores: jsonb("domain_scores").notNull(), // { domain: { correct: number, total: number } }
  totalCorrect: integer("total_correct").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const pretestResultsRelations = relations(pretestResults, ({ one }) => ({
  user: one(users, {
    fields: [pretestResults.userId],
    references: [users.id],
  }),
}));

export const insertPretestResultSchema = createInsertSchema(pretestResults).omit({
  id: true,
  completedAt: true,
});

export type InsertPretestResult = z.infer<typeof insertPretestResultSchema>;
export type PretestResult = typeof pretestResults.$inferSelect;

// --- User Preferences ---

export type StudyMode = 'standard' | 'personalized' | 'self-directed';

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  studyMode: text("study_mode").notNull().default('standard'), // 'standard' | 'personalized' | 'self-directed'
  hasCompletedPretest: boolean("has_completed_pretest").notNull().default(false),
  hasSeenWelcome: boolean("has_seen_welcome").notNull().default(false),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
  updatedAt: true,
});

export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
