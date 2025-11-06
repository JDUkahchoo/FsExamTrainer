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
  email: varchar("email"),
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
  sessionId: varchar("session_id").references(() => quizSessions.id, { onDelete: 'cascade' }),
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
  session: one(quizSessions, {
    fields: [quizResults.sessionId],
    references: [quizSessions.id],
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

export const quizSessionsRelations = relations(quizSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [quizSessions.userId],
    references: [users.id],
  }),
  results: many(quizResults),
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

export const practiceExamsRelations = relations(practiceExams, ({ one, many }) => ({
  user: one(users, {
    fields: [practiceExams.userId],
    references: [users.id],
  }),
  results: many(practiceExamResults),
}));

export const insertPracticeExamSchema = createInsertSchema(practiceExams).omit({
  id: true,
  completedAt: true,
});

export type InsertPracticeExam = z.infer<typeof insertPracticeExamSchema>;
export type PracticeExam = typeof practiceExams.$inferSelect;

// --- Practice Exam Question Results ---

export const practiceExamResults = pgTable("practice_exam_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  examId: varchar("exam_id").notNull().references(() => practiceExams.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionId: varchar("question_id").notNull(),
  domain: text("domain").notNull(),
  questionText: text("question_text").notNull(),
  selectedAnswer: integer("selected_answer").notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  explanation: text("explanation"),
});

export const practiceExamResultsRelations = relations(practiceExamResults, ({ one }) => ({
  exam: one(practiceExams, {
    fields: [practiceExamResults.examId],
    references: [practiceExams.id],
  }),
  user: one(users, {
    fields: [practiceExamResults.userId],
    references: [users.id],
  }),
}));

export const insertPracticeExamResultSchema = createInsertSchema(practiceExamResults).omit({
  id: true,
});

export type InsertPracticeExamResult = z.infer<typeof insertPracticeExamResultSchema>;

// Client-side schema for question results (without userId/examId)
export const clientPracticeExamQuestionResultSchema = z.object({
  questionId: z.string(),
  domain: z.string(),
  questionText: z.string(),
  selectedAnswer: z.number(),
  correctAnswer: z.number(),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
});

export type ClientPracticeExamQuestionResult = z.infer<typeof clientPracticeExamQuestionResultSchema>;
export type PracticeExamResult = typeof practiceExamResults.$inferSelect;

// --- Pretest Question Results ---

export const pretestQuestionResults = pgTable("pretest_question_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pretestId: varchar("pretest_id").notNull().references(() => pretestResults.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionId: varchar("question_id").notNull(),
  domain: text("domain").notNull(),
  questionText: text("question_text").notNull(),
  selectedAnswer: integer("selected_answer").notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  explanation: text("explanation"),
});

export const pretestQuestionResultsRelations = relations(pretestQuestionResults, ({ one }) => ({
  pretest: one(pretestResults, {
    fields: [pretestQuestionResults.pretestId],
    references: [pretestResults.id],
  }),
  user: one(users, {
    fields: [pretestQuestionResults.userId],
    references: [users.id],
  }),
}));

export const insertPretestQuestionResultSchema = createInsertSchema(pretestQuestionResults).omit({
  id: true,
});

export type InsertPretestQuestionResult = z.infer<typeof insertPretestQuestionResultSchema>;

// Client-side schema for pretest question results (without userId/pretestId)
export const clientPretestQuestionResultSchema = z.object({
  questionId: z.string(),
  domain: z.string(),
  questionText: z.string(),
  selectedAnswer: z.number(),
  correctAnswer: z.number(),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
});

export type ClientPretestQuestionResult = z.infer<typeof clientPretestQuestionResultSchema>;
export type PretestQuestionResult = typeof pretestQuestionResults.$inferSelect;

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
  practiceExamResults: many(practiceExamResults),
  pretestResults: many(pretestResults),
  pretestQuestionResults: many(pretestQuestionResults),
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

export const pretestResultsRelations = relations(pretestResults, ({ one, many }) => ({
  user: one(users, {
    fields: [pretestResults.userId],
    references: [users.id],
  }),
  questionResults: many(pretestQuestionResults),
}));

export const insertPretestResultSchema = createInsertSchema(pretestResults).omit({
  id: true,
  completedAt: true,
});

export type InsertPretestResult = z.infer<typeof insertPretestResultSchema>;
export type PretestResult = typeof pretestResults.$inferSelect;

// --- User Preferences ---

export type StudyMode = 'standard' | 'result-driven' | 'custom';

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  studyMode: text("study_mode").notNull().default('standard'), // 'standard' | 'result-driven' | 'custom'
  hasCompletedPretest: boolean("has_completed_pretest").notNull().default(false),
  hasSeenWelcome: boolean("has_seen_welcome").notNull().default(false),
  examDate: timestamp("exam_date"), // User's scheduled exam date
  currentCycle: integer("current_cycle").notNull().default(1), // Current study cycle (1, 2, 3...)
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
}).extend({
  examDate: z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
      if (typeof val === 'string' && val.trim() === '') return null;
      if (val instanceof Date) return val;
      if (typeof val === 'string') return new Date(val);
      return val;
    },
    z.date().nullable()
  ).optional(),
});

export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;

// --- Daily Logs ---

export const dailyLogs = pgTable("daily_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp("date").notNull(),
  activities: text("activities").notNull(),
  notes: text("notes"),
  weekNumber: integer("week_number"),
  timeSpent: integer("time_spent"), // Time in minutes
  domain: text("domain"), // Optional NCEES domain tag
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const dailyLogsRelations = relations(dailyLogs, ({ one }) => ({
  user: one(users, {
    fields: [dailyLogs.userId],
    references: [users.id],
  }),
}));

export const insertDailyLogSchema = createInsertSchema(dailyLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  date: z.coerce.date(), // Accept string or Date, coerce to Date
});

export type InsertDailyLog = z.infer<typeof insertDailyLogSchema>;
export type DailyLog = typeof dailyLogs.$inferSelect;

// --- Study Cycles ---

export const studyCycles = pgTable("study_cycles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  cycleNumber: integer("cycle_number").notNull(),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  completionPercentage: integer("completion_percentage"), // Overall completion at cycle end
  totalStudyMinutes: integer("total_study_minutes").default(0), // Sum of daily log time
  quizzesTaken: integer("quizzes_taken").default(0), // Count of quiz sessions
  examsTaken: integer("exams_taken").default(0), // Count of exam sessions
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  uniqueUserCycle: sql`UNIQUE (user_id, cycle_number)`,
}));

export const studyCyclesRelations = relations(studyCycles, ({ one }) => ({
  user: one(users, {
    fields: [studyCycles.userId],
    references: [users.id],
  }),
}));

export const insertStudyCycleSchema = createInsertSchema(studyCycles).omit({
  id: true,
  startedAt: true,
  createdAt: true,
});

export type InsertStudyCycle = z.infer<typeof insertStudyCycleSchema>;
export type StudyCycle = typeof studyCycles.$inferSelect;

// --- Interactive Lessons ---

export type QuestionType = 'multiple_choice' | 'fill_in_blank' | 'drag_drop';

export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  domainNumber: integer("domain_number").notNull(), // 1-7 for NCEES domains
  domain: text("domain").notNull(), // NCEES domain name
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Lesson content/explanation
  difficulty: text("difficulty").notNull().default('medium'), // 'easy', 'medium', 'hard'
  orderIndex: integer("order_index").notNull(), // Order within the domain
  estimatedMinutes: integer("estimated_minutes").notNull().default(15),
  suggestedWeek: integer("suggested_week"), // Optional: suggested week for Standard mode
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonsRelations = relations(lessons, ({ many }) => ({
  questions: many(lessonQuestions),
  progress: many(lessonProgress),
}));

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;

// --- Lesson Questions ---

export const lessonQuestions = pgTable("lesson_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lessonId: varchar("lesson_id").notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  questionType: text("question_type").notNull(), // 'multiple_choice', 'fill_in_blank', 'drag_drop'
  questionText: text("question_text").notNull(),
  options: jsonb("options"), // For multiple choice: string[], for drag_drop: { items: string[], correctOrder: number[] }
  correctAnswer: text("correct_answer").notNull(), // For MC: index as string, for fill_in: answer text, for drag: JSON array
  explanation: text("explanation").notNull(),
  orderIndex: integer("order_index").notNull(), // Order within the lesson
  points: integer("points").notNull().default(10),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const lessonQuestionsRelations = relations(lessonQuestions, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonQuestions.lessonId],
    references: [lessons.id],
  }),
}));

export const insertLessonQuestionSchema = createInsertSchema(lessonQuestions).omit({
  id: true,
  createdAt: true,
});

export type InsertLessonQuestion = z.infer<typeof insertLessonQuestionSchema>;
export type LessonQuestion = typeof lessonQuestions.$inferSelect;

// --- Lesson Progress ---

export const lessonProgress = pgTable("lesson_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: varchar("lesson_id").notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  completed: boolean("completed").notNull().default(false),
  score: integer("score"), // Total points earned
  totalPoints: integer("total_points"), // Total points possible
  attempts: integer("attempts").notNull().default(0),
  timeSpentSeconds: integer("time_spent_seconds").notNull().default(0),
  lastAttemptAt: timestamp("last_attempt_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  uniqueUserLesson: sql`UNIQUE (user_id, lesson_id)`,
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const insertLessonProgressSchema = createInsertSchema(lessonProgress).omit({
  id: true,
  createdAt: true,
});

export type InsertLessonProgress = z.infer<typeof insertLessonProgressSchema>;
export type LessonProgress = typeof lessonProgress.$inferSelect;
