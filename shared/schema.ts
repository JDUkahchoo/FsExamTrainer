import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb, timestamp, index, real, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- FS Domain Types ---
// Aligned with 8 NCEES FS exam domains (0-7)
export type FSDomain = 
  | 'Math & Basic Science'                    // NCEES Domain 0
  | 'Field Data Acquisition'                  // NCEES Domain 1
  | 'Mapping, GIS, and CAD'                   // NCEES Domain 2
  | 'Boundary Law & PLSS'                     // NCEES Domain 3
  | 'Surveying Principles'                    // NCEES Domain 4
  | 'Survey Computations & Applications'      // NCEES Domain 5
  | 'Professional Practice'                   // NCEES Domain 6
  | 'Applied Mathematics & Statistics';       // NCEES Domain 7

export const FS_DOMAINS: FSDomain[] = [
  'Math & Basic Science',
  'Field Data Acquisition',
  'Mapping, GIS, and CAD',
  'Boundary Law & PLSS',
  'Surveying Principles',
  'Survey Computations & Applications',
  'Professional Practice',
  'Applied Mathematics & Statistics'
];

// --- PS Domain Types ---
// Aligned with 5 NCEES PS exam domains (1-5)
export type PSDomain = 
  | 'Legal Principles'                        // NCEES Domain 1
  | 'Professional Survey Practices'           // NCEES Domain 2
  | 'Standards and Specifications'            // NCEES Domain 3
  | 'Business Practices'                      // NCEES Domain 4
  | 'Areas of Practice';                      // NCEES Domain 5

export const PS_DOMAINS: PSDomain[] = [
  'Legal Principles',
  'Professional Survey Practices',
  'Standards and Specifications',
  'Business Practices',
  'Areas of Practice'
];

// Combined Domain type for backward compatibility
export type Domain = FSDomain | PSDomain;
export const DOMAINS: Domain[] = [...FS_DOMAINS, ...PS_DOMAINS];

// --- Exam Track Types ---
export type ExamTrack = 'fs' | 'ps' | 'state-specific';

export const EXAM_TRACKS: { id: ExamTrack; name: string; status: 'ready' | 'coming-soon'; description: string }[] = [
  { id: 'fs', name: 'FS Exam', status: 'ready', description: 'Fundamentals of Surveying - Entry-level exam' },
  { id: 'ps', name: 'PS Exam', status: 'ready', description: 'Principles and Practice of Surveying - Professional licensure exam' },
  { id: 'state-specific', name: 'State-Specific', status: 'coming-soon', description: 'State laws, rules, and regulations for your jurisdiction' },
];

// --- US States for Surveying Licensure ---
export const US_STATES = [
  { code: 'TX', name: 'Texas', available: true },
  { code: 'AL', name: 'Alabama', available: false },
  { code: 'AK', name: 'Alaska', available: false },
  { code: 'AZ', name: 'Arizona', available: false },
  { code: 'AR', name: 'Arkansas', available: false },
  { code: 'CA', name: 'California', available: false },
  { code: 'CO', name: 'Colorado', available: false },
  { code: 'CT', name: 'Connecticut', available: false },
  { code: 'DE', name: 'Delaware', available: false },
  { code: 'FL', name: 'Florida', available: false },
  { code: 'GA', name: 'Georgia', available: false },
  { code: 'HI', name: 'Hawaii', available: false },
  { code: 'ID', name: 'Idaho', available: false },
  { code: 'IL', name: 'Illinois', available: false },
  { code: 'IN', name: 'Indiana', available: false },
  { code: 'IA', name: 'Iowa', available: false },
  { code: 'KS', name: 'Kansas', available: false },
  { code: 'KY', name: 'Kentucky', available: false },
  { code: 'LA', name: 'Louisiana', available: false },
  { code: 'ME', name: 'Maine', available: false },
  { code: 'MD', name: 'Maryland', available: false },
  { code: 'MA', name: 'Massachusetts', available: false },
  { code: 'MI', name: 'Michigan', available: false },
  { code: 'MN', name: 'Minnesota', available: false },
  { code: 'MS', name: 'Mississippi', available: false },
  { code: 'MO', name: 'Missouri', available: false },
  { code: 'MT', name: 'Montana', available: false },
  { code: 'NE', name: 'Nebraska', available: false },
  { code: 'NV', name: 'Nevada', available: false },
  { code: 'NH', name: 'New Hampshire', available: false },
  { code: 'NJ', name: 'New Jersey', available: false },
  { code: 'NM', name: 'New Mexico', available: false },
  { code: 'NY', name: 'New York', available: false },
  { code: 'NC', name: 'North Carolina', available: false },
  { code: 'ND', name: 'North Dakota', available: false },
  { code: 'OH', name: 'Ohio', available: false },
  { code: 'OK', name: 'Oklahoma', available: false },
  { code: 'OR', name: 'Oregon', available: false },
  { code: 'PA', name: 'Pennsylvania', available: false },
  { code: 'RI', name: 'Rhode Island', available: false },
  { code: 'SC', name: 'South Carolina', available: false },
  { code: 'SD', name: 'South Dakota', available: false },
  { code: 'TN', name: 'Tennessee', available: false },
  { code: 'UT', name: 'Utah', available: false },
  { code: 'VT', name: 'Vermont', available: false },
  { code: 'VA', name: 'Virginia', available: false },
  { code: 'WA', name: 'Washington', available: false },
  { code: 'WV', name: 'West Virginia', available: false },
  { code: 'WI', name: 'Wisconsin', available: false },
  { code: 'WY', name: 'Wyoming', available: false },
] as const;

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
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Surveyor Ranks based on level
export const SURVEYOR_RANKS = [
  { level: 1, name: 'Survey Trainee', minXp: 0 },
  { level: 2, name: 'Rod Person', minXp: 500 },
  { level: 3, name: 'Instrument Operator', minXp: 1500 },
  { level: 4, name: 'Party Chief', minXp: 3500 },
  { level: 5, name: 'Survey Technician', minXp: 6500 },
  { level: 6, name: 'FS Candidate', minXp: 10500 },
  { level: 7, name: 'Licensed Surveyor', minXp: 15500 },
  { level: 8, name: 'Senior Surveyor', minXp: 22000 },
  { level: 9, name: 'Master Surveyor', minXp: 30000 },
  { level: 10, name: 'Survey Legend', minXp: 40000 },
] as const;

type SurveyorRank = typeof SURVEYOR_RANKS[number];

export function getSurveyorRank(xp: number): { level: number; name: string; progress: number; nextLevelXp: number | null } {
  let currentRank: SurveyorRank = SURVEYOR_RANKS[0];
  let nextRank: SurveyorRank | null = SURVEYOR_RANKS[1] || null;
  
  for (let i = 0; i < SURVEYOR_RANKS.length; i++) {
    if (xp >= SURVEYOR_RANKS[i].minXp) {
      currentRank = SURVEYOR_RANKS[i];
      nextRank = SURVEYOR_RANKS[i + 1] || null;
    }
  }
  
  const progress = nextRank 
    ? ((xp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100
    : 100;
  
  return {
    level: currentRank.level,
    name: currentRank.name,
    progress: Math.min(100, progress),
    nextLevelXp: nextRank?.minXp ?? null
  };
}

// XP Awards for different activities
export const XP_AWARDS = {
  READ_CHECKPOINT: 25,
  FOCUS_MICRO_DRILL: 50,
  APPLY_CHALLENGE: 75,
  REINFORCE_REVIEW: 15,
  DAILY_QUEST_COMPLETE: 100,
  QUIZ_COMPLETE: 50,
  LESSON_COMPLETE: 40,
  EXAM_COMPLETE: 200,
} as const;

// XP Grants tracking for idempotency (prevents XP farming)
export const xpGrants = pgTable("xp_grants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  activityKey: varchar("activity_key").notNull(), // e.g., "read:week5:chapter2", "apply:challenge123"
  amount: integer("amount").notNull(),
  grantedAt: timestamp("granted_at").notNull().defaultNow(),
});

export const xpGrantsRelations = relations(xpGrants, ({ one }) => ({
  user: one(users, {
    fields: [xpGrants.userId],
    references: [users.id],
  }),
}));

export type XpGrant = typeof xpGrants.$inferSelect;
export type InsertXpGrant = typeof xpGrants.$inferInsert;

// --- Study Progress Tables ---

export const weekProgress = pgTable("week_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  week: integer("week").notNull(),
  examTrack: varchar("exam_track").notNull().default('fs'),
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
  domain: text("domain").notNull(),
  examTrack: varchar("exam_track").notNull().default('fs'),
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

// --- Flashcard Feynman Scores (for Feynman Mode) ---

export const flashcardFeynmanScores = pgTable("flashcard_feynman_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  flashcardId: varchar("flashcard_id").notNull(),
  explanation: text("explanation").notNull(), // User's own explanation
  clarityRating: integer("clarity_rating").notNull().default(3), // 1-5 self-rating
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const flashcardFeynmanScoresRelations = relations(flashcardFeynmanScores, ({ one }) => ({
  user: one(users, {
    fields: [flashcardFeynmanScores.userId],
    references: [users.id],
  }),
}));

export const insertFlashcardFeynmanScoreSchema = createInsertSchema(flashcardFeynmanScores).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertFlashcardFeynmanScore = z.infer<typeof insertFlashcardFeynmanScoreSchema>;
export type FlashcardFeynmanScore = typeof flashcardFeynmanScores.$inferSelect;

// --- Flashcard User Mnemonics ---

export const flashcardMnemonics = pgTable("flashcard_mnemonics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  flashcardId: varchar("flashcard_id").notNull(),
  mnemonic: text("mnemonic").notNull(), // User's memory trick
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const flashcardMnemonicsRelations = relations(flashcardMnemonics, ({ one }) => ({
  user: one(users, {
    fields: [flashcardMnemonics.userId],
    references: [users.id],
  }),
}));

export const insertFlashcardMnemonicSchema = createInsertSchema(flashcardMnemonics).omit({
  id: true,
  createdAt: true,
});

export type InsertFlashcardMnemonic = z.infer<typeof insertFlashcardMnemonicSchema>;
export type FlashcardMnemonic = typeof flashcardMnemonics.$inferSelect;

// --- Flashcard Triad Drill Progress ---

export const flashcardTriadProgress = pgTable("flashcard_triad_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  flashcardId: varchar("flashcard_id").notNull(),
  recallComplete: boolean("recall_complete").notNull().default(false),
  applyComplete: boolean("apply_complete").notNull().default(false),
  reverseComplete: boolean("reverse_complete").notNull().default(false),
  completedAt: timestamp("completed_at"), // null until all 3 phases done
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const flashcardTriadProgressRelations = relations(flashcardTriadProgress, ({ one }) => ({
  user: one(users, {
    fields: [flashcardTriadProgress.userId],
    references: [users.id],
  }),
}));

export const insertFlashcardTriadProgressSchema = createInsertSchema(flashcardTriadProgress).omit({
  id: true,
  completedAt: true,
  updatedAt: true,
});

export type InsertFlashcardTriadProgress = z.infer<typeof insertFlashcardTriadProgressSchema>;
export type FlashcardTriadProgress = typeof flashcardTriadProgress.$inferSelect;

// --- Flashcard Review Sessions (Timestamped tracking for multiple daily reviews) ---

export const REVIEW_PERIODS = ['morning', 'afternoon', 'evening'] as const;
export type ReviewPeriod = typeof REVIEW_PERIODS[number];

export const flashcardReviewSessions = pgTable("flashcard_review_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  examTrack: varchar("exam_track").notNull().default('fs'), // 'fs' or 'ps'
  period: varchar("period").notNull(), // 'morning', 'afternoon', 'evening'
  cardsReviewed: integer("cards_reviewed").notNull().default(0),
  avgMasteryRating: real("avg_mastery_rating"), // Average rating for this session (1-5)
  domainBreakdown: jsonb("domain_breakdown"), // { [domain]: { reviewed, avgRating } }
  timeSpentSeconds: integer("time_spent_seconds").notNull().default(0),
  xpAwarded: boolean("xp_awarded").notNull().default(false), // Idempotency flag for XP
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  // Resume state - stores current position and filters for resuming session
  userState: jsonb("user_state"), // { deck, domains, shuffledIndices, currentIndex, studyMode }
});

// --- Flashcard Review Events (tracks each individual card review) ---

export const flashcardReviewEvents = pgTable("flashcard_review_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => flashcardReviewSessions.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  cardId: varchar("card_id").notNull(),
  deck: varchar("deck").notNull(), // 'original' or 'comprehensive'
  mode: varchar("mode").notNull(), // 'quick', 'triad', 'feynman', 'mnemonic'
  rating: integer("rating"), // 1-5 mastery rating
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const flashcardReviewEventsRelations = relations(flashcardReviewEvents, ({ one }) => ({
  session: one(flashcardReviewSessions, {
    fields: [flashcardReviewEvents.sessionId],
    references: [flashcardReviewSessions.id],
  }),
  user: one(users, {
    fields: [flashcardReviewEvents.userId],
    references: [users.id],
  }),
}));

export const insertFlashcardReviewEventSchema = createInsertSchema(flashcardReviewEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertFlashcardReviewEvent = z.infer<typeof insertFlashcardReviewEventSchema>;
export type FlashcardReviewEvent = typeof flashcardReviewEvents.$inferSelect;

// Type for userState JSON stored in flashcard_review_sessions
export type FlashcardSessionState = {
  deck: 'original' | 'comprehensive';
  domains: string[];
  shuffledIndices: number[];
  currentIndex: number;
  studyMode: FlashcardMode;
  masteryRatings: number[];
  startTime: number;
};

export const flashcardReviewSessionsRelations = relations(flashcardReviewSessions, ({ one }) => ({
  user: one(users, {
    fields: [flashcardReviewSessions.userId],
    references: [users.id],
  }),
}));

export const insertFlashcardReviewSessionSchema = createInsertSchema(flashcardReviewSessions).omit({
  id: true,
  startedAt: true,
});

export type InsertFlashcardReviewSession = z.infer<typeof insertFlashcardReviewSessionSchema>;
export type FlashcardReviewSession = typeof flashcardReviewSessions.$inferSelect;

// Helper to determine review period from timestamp
export function getReviewPeriod(date: Date = new Date()): ReviewPeriod {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
}

// --- Daily Flashcard Progress (for quest tracking) ---

export const FLASHCARD_MODES = ['quick', 'triad', 'feynman', 'mnemonic', 'challenge'] as const;
export type FlashcardMode = typeof FLASHCARD_MODES[number];

export const dailyFlashcardProgress = pgTable("daily_flashcard_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  cardId: varchar("card_id").notNull(),
  mode: varchar("mode").notNull(), // 'quick', 'triad', 'feynman', 'mnemonic'
  date: timestamp("date").notNull(), // Date only (normalized to midnight)
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dailyFlashcardProgressRelations = relations(dailyFlashcardProgress, ({ one }) => ({
  user: one(users, {
    fields: [dailyFlashcardProgress.userId],
    references: [users.id],
  }),
}));

export const insertDailyFlashcardProgressSchema = createInsertSchema(dailyFlashcardProgress).omit({
  id: true,
  createdAt: true,
});

export type InsertDailyFlashcardProgress = z.infer<typeof insertDailyFlashcardProgressSchema>;
export type DailyFlashcardProgress = typeof dailyFlashcardProgress.$inferSelect;

// --- Flashcard Challenge Sessions (proficiency tracking) ---

export const flashcardChallengeSessions = pgTable("flashcard_challenge_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  examTrack: varchar("exam_track").notNull().default('fs'),
  deck: varchar("deck").notNull().default('comprehensive'),
  domain: varchar("domain"),
  totalCards: integer("total_cards").notNull(),
  correctFirstTry: integer("correct_first_try").notNull(),
  totalAttempts: integer("total_attempts").notNull(),
  incorrectAttempts: integer("incorrect_attempts").notNull(),
  accuracy: integer("accuracy").notNull(),
  roundsCompleted: integer("rounds_completed").notNull().default(1),
  totalRounds: integer("total_rounds").notNull().default(1),
  domainBreakdown: jsonb("domain_breakdown"),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const flashcardChallengeSessionsRelations = relations(flashcardChallengeSessions, ({ one }) => ({
  user: one(users, {
    fields: [flashcardChallengeSessions.userId],
    references: [users.id],
  }),
}));

export const insertFlashcardChallengeSessionSchema = createInsertSchema(flashcardChallengeSessions).omit({
  id: true,
  completedAt: true,
});

export type InsertFlashcardChallengeSession = z.infer<typeof insertFlashcardChallengeSessionSchema>;
export type FlashcardChallengeSession = typeof flashcardChallengeSessions.$inferSelect;

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

// --- Study Notes (Enhanced with multi-page, day tracking, domain tagging) ---

export const studyNotes = pgTable("study_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text("title").notNull().default('Untitled Note'), // User-defined title for the note page
  week: integer("week"), // Optional week number (1-16+), null for general notes
  dayOfWeek: text("day_of_week"), // Optional: 'monday', 'tuesday', etc.
  domainNumber: integer("domain_number"), // Optional domain tagging (0-7)
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
  createdAt: true,
  updatedAt: true,
});

export type InsertStudyNote = z.infer<typeof insertStudyNoteSchema>;
export type StudyNote = typeof studyNotes.$inferSelect;

// Day of week options for UI
export const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type DayOfWeek = typeof DAYS_OF_WEEK[number];

// --- Reading Progress (Comprehension Checkpoint) ---

export const readingProgress = pgTable("reading_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  week: integer("week").notNull(),
  chapterIndex: integer("chapter_index").notNull(),
  readingId: varchar("reading_id"), // stable ID for interactive readings (e.g. 'fs-d0-trig'); null for chapter items
  completed: boolean("completed").notNull().default(false),
  confidenceRating: integer("confidence_rating"), // 1-5 scale
  takeawayNote: text("takeaway_note"),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  examTrack: varchar("exam_track").notNull().default('fs'),
});

export const readingProgressRelations = relations(readingProgress, ({ one }) => ({
  user: one(users, {
    fields: [readingProgress.userId],
    references: [users.id],
  }),
}));

export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({
  id: true,
  updatedAt: true,
});

export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;

// --- Quiz Drafts (for resume functionality) ---

export const quizDrafts = pgTable("quiz_drafts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  domain: text("domain").notNull(),
  questionIds: text("question_ids").array().notNull(),
  currentQuestionIndex: integer("current_question_index").notNull().default(0),
  userAnswers: jsonb("user_answers").notNull().default(sql`'{}'::jsonb`),
  timeSpentSeconds: integer("time_spent_seconds").notNull().default(0),
  examTrack: text("exam_track").notNull().default('fs'),
  sessionId: varchar("session_id").notNull().default(sql`gen_random_uuid()`),
  shuffleSeed: integer("shuffle_seed").notNull().default(0),
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
  flashcardFeynmanScores: many(flashcardFeynmanScores),
  flashcardMnemonics: many(flashcardMnemonics),
  flashcardTriadProgress: many(flashcardTriadProgress),
  flashcardReviewSessions: many(flashcardReviewSessions),
  flashcardReviewEvents: many(flashcardReviewEvents),
  dailyFlashcardProgress: many(dailyFlashcardProgress),
  practiceExams: many(practiceExams),
  practiceExamResults: many(practiceExamResults),
  pretestResults: many(pretestResults),
  pretestQuestionResults: many(pretestQuestionResults),
  studyNotes: many(studyNotes),
  readingProgress: many(readingProgress),
  quizDrafts: many(quizDrafts),
  examDrafts: many(examDrafts),
  dailyActivity: many(dailyActivity),
  achievements: many(achievements),
  customWeeks: many(customWeeks),
}));

// --- Frontend-only Types (for UI state management) ---

export type Flashcard = {
  domain: Domain | string; // Domain for FS or PS exam
  front: string;
  back: string;
  category: 'formula' | 'definition' | 'concept';
  examTrack?: 'fs' | 'ps'; // Which exam this flashcard belongs to (defaults to 'fs')
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
}, (table) => ({
  userDateIdx: uniqueIndex('daily_activity_user_date_idx').on(table.userId, table.date),
}));

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

export type StudyMode = 'standard' | 'result-driven' | 'custom' | 'working-professional' | 'long-term';

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  studyMode: text("study_mode").notNull().default('standard'), // 'standard' | 'result-driven' | 'custom'
  hasCompletedPretest: boolean("has_completed_pretest").notNull().default(false),
  hasSeenWelcome: boolean("has_seen_welcome").notNull().default(false),
  examDate: timestamp("exam_date"), // User's scheduled exam date
  currentCycle: integer("current_cycle").notNull().default(1), // Current study cycle (1, 2, 3...)
  customWeeklyDomains: jsonb("custom_weekly_domains"), // Week-by-week domain assignments, e.g., { "1": [1, 2], "2": [3, 5], "3": [1, 4] }
  customTimeline: integer("custom_timeline").default(12), // Number of weeks for custom study plan (8-16)
  preferredExamTrack: text("preferred_exam_track").notNull().default('fs'), // 'fs' | 'ps' | 'state-specific'
  stateCode: text("state_code").default('TX'), // US state code (e.g., 'TX' for Texas)
  timezone: text("timezone").default('America/Chicago'), // User's timezone for midnight reset (IANA format)
  reminderEmailEnabled: boolean("reminder_email_enabled").notNull().default(false),
  reminderEmail: text("reminder_email"),
  lastReminderSent: timestamp("last_reminder_sent"),
  weeklyHoursGoal: integer("weekly_hours_goal"),
  baseDaysPerWeek: integer("base_days_per_week").notNull().default(5),
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
  lastReminderSent: z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
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
  id: varchar("id").primaryKey(), // Deterministic ID: {examTrack}-d{domain}-lesson-{orderIndex:02}
  examTrack: varchar("exam_track").notNull().default('fs'), // 'fs' or 'ps' - which exam this lesson belongs to
  domainNumber: integer("domain_number").notNull(), // Domain number for the exam track
  domain: text("domain").notNull(), // NCEES domain name
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Lesson content/explanation
  practicalProblem: text("practical_problem"), // Real-world surveying scenario
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
  orderIndex: integer("order_index").notNull(), // Order within the lesson (question slot: 1, 2, 3, etc.)
  variationGroup: integer("variation_group").notNull().default(1), // Groups variations of the same question
  variationNumber: integer("variation_number").notNull().default(1), // 1-5: which variation this is
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
  seenQuestionVariations: jsonb("seen_question_variations").default(sql`'{}'::jsonb`), // Tracks variation IDs user has seen: { "1": [vid1, vid2], "2": [vid3] }
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

// --- Domain Progress Snapshots (for tracking mastery over time) ---

export const domainProgressSnapshots = pgTable("domain_progress_snapshots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  domainNumber: integer("domain_number").notNull(), // 0-7
  domain: text("domain").notNull(),
  score: integer("score").notNull(), // Percentage score (0-100)
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  snapshotMonth: timestamp("snapshot_month").notNull(), // Monthly snapshot
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  uniqueSnapshot: sql`UNIQUE (user_id, domain_number, snapshot_month)`,
}));

export const domainProgressSnapshotsRelations = relations(domainProgressSnapshots, ({ one }) => ({
  user: one(users, {
    fields: [domainProgressSnapshots.userId],
    references: [users.id],
  }),
}));

export const insertDomainProgressSnapshotSchema = createInsertSchema(domainProgressSnapshots).omit({
  id: true,
  createdAt: true,
});

export type InsertDomainProgressSnapshot = z.infer<typeof insertDomainProgressSnapshotSchema>;
export type DomainProgressSnapshot = typeof domainProgressSnapshots.$inferSelect;

// --- APPLY Challenge Attempts (Scenario Lab tracking) ---

export const applyChallengeAttempts = pgTable("apply_challenge_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  week: integer("week").notNull(),
  challengeId: varchar("challenge_id").notNull(),
  challengeType: varchar("challenge_type").notNull(), // 'field_problem', 'timed_drill', 'scenario'
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  elapsedSeconds: integer("elapsed_seconds"),
  selfGrade: integer("self_grade"), // Number of rubric items checked (0-4 typically)
  maxGrade: integer("max_grade"), // Total rubric items available
  userAnswer: text("user_answer"),
  notes: text("notes"),
  examTrack: varchar("exam_track").notNull().default('fs'),
});

export const applyChallengeAttemptsRelations = relations(applyChallengeAttempts, ({ one }) => ({
  user: one(users, {
    fields: [applyChallengeAttempts.userId],
    references: [users.id],
  }),
}));

export const insertApplyChallengeAttemptSchema = createInsertSchema(applyChallengeAttempts).omit({
  id: true,
  startedAt: true,
});

export type InsertApplyChallengeAttempt = z.infer<typeof insertApplyChallengeAttemptSchema>;
export type ApplyChallengeAttempt = typeof applyChallengeAttempts.$inferSelect;

// --- REINFORCE Retention Reviews (Spaced Repetition tracking) ---

export const retentionReviews = pgTable("retention_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  week: integer("week").notNull(),
  conceptId: varchar("concept_id").notNull(),
  conceptType: varchar("concept_type").notNull(), // 'formula', 'definition', 'procedure'
  conceptText: text("concept_text").notNull(),
  domain: integer("domain").notNull(),
  masteryLevel: integer("mastery_level").notNull().default(0), // 0-5 SM-2 style
  easeFactor: real("ease_factor").notNull().default(2.5), // SM-2 ease factor
  intervalDays: integer("interval_days").notNull().default(1), // Days until next review
  lastReviewedAt: timestamp("last_reviewed_at"),
  nextReviewAt: timestamp("next_review_at"),
  reviewCount: integer("review_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  examTrack: varchar("exam_track").notNull().default('fs'),
});

export const retentionReviewsRelations = relations(retentionReviews, ({ one }) => ({
  user: one(users, {
    fields: [retentionReviews.userId],
    references: [users.id],
  }),
}));

export const insertRetentionReviewSchema = createInsertSchema(retentionReviews).omit({
  id: true,
  createdAt: true,
});

export type InsertRetentionReview = z.infer<typeof insertRetentionReviewSchema>;
export type RetentionReview = typeof retentionReviews.$inferSelect;

// --- Feedback & Testimonials ---

export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }),
  email: varchar("email"),
  name: varchar("name"),
  message: text("message").notNull(),
  category: varchar("category").notNull(), // 'bug', 'feature', 'content', 'general'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.id],
  }),
}));

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
});

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }),
  name: varchar("name").notNull(),
  email: varchar("email"),
  examScore: integer("exam_score"), // Percentage score if they took the exam
  passedExam: boolean("passed_exam").notNull().default(false),
  message: text("message").notNull(),
  studyMode: varchar("study_mode"), // Which study mode they used
  approved: boolean("approved").notNull().default(false), // Moderation flag
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  user: one(users, {
    fields: [testimonials.userId],
    references: [users.id],
  }),
}));

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// --- Daily Quests System ---

export const QUEST_TYPES = [
  'complete_flashcards',
  'complete_lesson', 
  'complete_quiz',
  'complete_all_pillars',
  'study_time',
  'review_weak_domain'
] as const;

export type QuestType = typeof QUEST_TYPES[number];

export const dailyQuests = pgTable("daily_quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  examTrack: varchar("exam_track").notNull().default('fs'), // 'fs' or 'ps'
  date: timestamp("date").notNull(), // The day this quest is for
  questType: varchar("quest_type").notNull(), // e.g., 'complete_flashcards', 'complete_lesson'
  title: varchar("title").notNull(),
  description: text("description"),
  targetCount: integer("target_count").notNull().default(1), // e.g., complete 10 flashcards
  currentCount: integer("current_count").notNull().default(0),
  xpReward: integer("xp_reward").notNull().default(50),
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dailyQuestsRelations = relations(dailyQuests, ({ one }) => ({
  user: one(users, {
    fields: [dailyQuests.userId],
    references: [users.id],
  }),
}));

export const insertDailyQuestSchema = createInsertSchema(dailyQuests).omit({
  id: true,
  createdAt: true,
});

export type InsertDailyQuest = z.infer<typeof insertDailyQuestSchema>;
export type DailyQuest = typeof dailyQuests.$inferSelect;

// --- Spaced Repetition Review Schedule ---

export const reviewSchedule = pgTable("review_schedule", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  examTrack: varchar("exam_track").notNull().default('fs'), // 'fs' or 'ps'
  itemType: varchar("item_type").notNull(), // 'flashcard', 'concept', 'lesson'
  itemId: varchar("item_id").notNull(),
  itemTitle: varchar("item_title").notNull(),
  domain: varchar("domain"),
  lastReviewedAt: timestamp("last_reviewed_at").notNull().defaultNow(),
  nextReviewAt: timestamp("next_review_at").notNull(),
  intervalDays: integer("interval_days").notNull().default(1), // Current spaced repetition interval
  easeFactor: real("ease_factor").notNull().default(2.5), // SM-2 algorithm ease factor
  reviewCount: integer("review_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviewScheduleRelations = relations(reviewSchedule, ({ one }) => ({
  user: one(users, {
    fields: [reviewSchedule.userId],
    references: [users.id],
  }),
}));

export const insertReviewScheduleSchema = createInsertSchema(reviewSchedule).omit({
  id: true,
  createdAt: true,
});

export type InsertReviewSchedule = z.infer<typeof insertReviewScheduleSchema>;
export type ReviewSchedule = typeof reviewSchedule.$inferSelect;

// --- Adaptive Difficulty System ---

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export const userDifficultySettings = pgTable("user_difficulty_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  domain: varchar("domain").notNull(),
  currentDifficulty: varchar("current_difficulty").notNull().default('medium'), // 'easy', 'medium', 'hard'
  consecutiveCorrect: integer("consecutive_correct").notNull().default(0),
  consecutiveIncorrect: integer("consecutive_incorrect").notNull().default(0),
  totalAttempts: integer("total_attempts").notNull().default(0),
  correctAttempts: integer("correct_attempts").notNull().default(0),
  lastAdjustedAt: timestamp("last_adjusted_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  uniqueUserDomain: sql`UNIQUE (user_id, domain)`,
}));

export const userDifficultySettingsRelations = relations(userDifficultySettings, ({ one }) => ({
  user: one(users, {
    fields: [userDifficultySettings.userId],
    references: [users.id],
  }),
}));

export const insertUserDifficultySettingsSchema = createInsertSchema(userDifficultySettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUserDifficultySettings = z.infer<typeof insertUserDifficultySettingsSchema>;
export type UserDifficultySettings = typeof userDifficultySettings.$inferSelect;

// --- Weekly Leaderboard ---
// Uses xpGrants table for weekly XP aggregation
// LeaderboardEntry type for API responses
export type LeaderboardEntry = {
  rank: number;
  userId: string;
  displayName: string;
  profileImageUrl: string | null;
  weeklyXp: number;
  level: number;
  rankName: string;
};

// --- Forgetting Curve Data ---
// Uses reviewSchedule table for visualization
export type ForgettingCurvePoint = {
  daysSinceReview: number;
  retentionPercent: number;
  nextReviewIn: number | null;
  easeFactor: number;
};

// --- Interactive Study Readings ---

export interface ReadingFormulaVariable {
  symbol: string;
  description: string;
}

export interface ReadingFormula {
  expression: string;
  variables: ReadingFormulaVariable[];
  whenToUse: string;
}

export interface ReadingWorkedExample {
  problem: string;
  steps: { step: number; description: string; calculation?: string }[];
  answer: string;
}

export interface ReadingKnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReadingFurtherRef {
  book: string;
  chapter: string;
  topic: string;
}

export interface ReadingProcedureStep {
  step: number;
  action: string;
  detail?: string;
}

export interface ReadingSection {
  id: string;
  type: 'concept' | 'formula' | 'worked_example' | 'knowledge_check' | 'further_reading' | 'common_mistakes' | 'exam_tips' | 'procedure';
  title?: string;
  content?: string;
  formula?: ReadingFormula;
  workedExample?: ReadingWorkedExample;
  knowledgeCheck?: ReadingKnowledgeCheck;
  furtherReading?: ReadingFurtherRef[];
  commonMistakes?: string[];
  examTips?: string[];
  procedureSteps?: ReadingProcedureStep[];
  bookRefs?: ReadingFurtherRef[];
}

export interface ReadingModule {
  id: string;
  examTrack: 'fs' | 'ps';
  domainNumber: number;
  domain: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  sections: ReadingSection[];
  prerequisites?: string[];
}

// --- Week Memory Health Table ---
// Tracks per-week completion and spaced review scheduling using Ebbinghaus forgetting curve

export const weekMemoryHealth = pgTable("week_memory_health", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  examTrack: varchar("exam_track").notNull().default('fs'),
  weekNumber: integer("week_number").notNull(),
  domains: text("domains").array().notNull().default(sql`'{}'::text[]`),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
  lastReviewedAt: timestamp("last_reviewed_at"),
  reviewCount: integer("review_count").notNull().default(0),
}, (table) => ({
  uniqueUserWeek: uniqueIndex("week_memory_health_user_week_unique").on(table.userId, table.examTrack, table.weekNumber),
}));

export const weekMemoryHealthRelations = relations(weekMemoryHealth, ({ one }) => ({
  user: one(users, {
    fields: [weekMemoryHealth.userId],
    references: [users.id],
  }),
}));

export const insertWeekMemoryHealthSchema = createInsertSchema(weekMemoryHealth).omit({
  id: true,
});

export type WeekMemoryHealth = typeof weekMemoryHealth.$inferSelect;
export type InsertWeekMemoryHealth = z.infer<typeof insertWeekMemoryHealthSchema>;

// --- Study Reading Progress Table ---

export const studyReadingProgress = pgTable("study_reading_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  readingId: varchar("reading_id").notNull(),
  sectionId: varchar("section_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  uniqueUserSection: sql`UNIQUE (user_id, reading_id, section_id)`,
}));

export const studyReadingProgressRelations = relations(studyReadingProgress, ({ one }) => ({
  user: one(users, {
    fields: [studyReadingProgress.userId],
    references: [users.id],
  }),
}));

export const insertStudyReadingProgressSchema = createInsertSchema(studyReadingProgress).omit({
  id: true,
  createdAt: true,
});

export type InsertStudyReadingProgress = z.infer<typeof insertStudyReadingProgressSchema>;
export type StudyReadingProgress = typeof studyReadingProgress.$inferSelect;
