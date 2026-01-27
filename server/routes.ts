// From blueprint:javascript_log_in_with_replit
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertWeekProgressSchema, insertQuizResultSchema, insertQuizSessionSchema, insertFlashcardMasterySchema, insertFlashcardFeynmanScoreSchema, insertFlashcardMnemonicSchema, insertFlashcardTriadProgressSchema, insertFlashcardReviewSessionSchema, insertPracticeExamSchema, insertStudyNoteSchema, insertReadingProgressSchema, insertQuizDraftSchema, insertExamDraftSchema, insertDailyActivitySchema, insertAchievementSchema, insertCustomWeekSchema, insertPretestResultSchema, insertUserPreferencesSchema, insertDailyLogSchema, insertStudyCycleSchema, insertFeedbackSchema, insertTestimonialSchema, insertApplyChallengeAttemptSchema, insertRetentionReviewSchema, getReviewPeriod } from "@shared/schema";
import { seedLessons } from "./seed-lessons";
import { seedPSLessons } from "./seed-ps-lessons";
import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";
import { count, eq } from "drizzle-orm";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Disable caching for all API routes to prevent stale user data
  app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    next();
  });

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.patch('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { firstName, lastName } = req.body;
      
      if (firstName !== undefined && (typeof firstName !== 'string' || firstName.length > 50)) {
        return res.status(400).json({ error: "First name must be a string with max 50 characters" });
      }
      if (lastName !== undefined && (typeof lastName !== 'string' || lastName.length > 50)) {
        return res.status(400).json({ error: "Last name must be a string with max 50 characters" });
      }
      
      // Only update if at least one name field is provided
      if (firstName === undefined && lastName === undefined) {
        const user = await storage.getUser(userId);
        return res.json(user);
      }
      
      const user = await storage.updateUserName(userId, firstName, lastName);
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // User reset endpoint - clears all study data for the logged-in user only
  app.post('/api/user/reset', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { confirm } = req.body;
      
      if (confirm !== true) {
        return res.status(400).json({ 
          error: "Please confirm the reset by sending { confirm: true }" 
        });
      }
      
      const result = await storage.resetUserStudyData(userId);
      res.json({ 
        message: "Your study data has been reset. You can start fresh!",
        ...result 
      });
    } catch (error) {
      console.error("Error resetting user data:", error);
      res.status(500).json({ message: "Failed to reset study data" });
    }
  });

  // Admin endpoint to check and seed lessons (protected by secret key)
  app.post('/api/admin/seed-lessons', async (req, res) => {
    try {
      const adminKey = req.headers['x-admin-key'] || req.body.adminKey;
      const expectedKey = process.env.ADMIN_SEED_KEY;
      
      if (!expectedKey) {
        return res.status(500).json({ error: 'ADMIN_SEED_KEY not configured' });
      }
      
      if (adminKey !== expectedKey) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Check current state
      const lessonResult = await db.select({ count: count() }).from(lessons);
      const questionResult = await db.select({ count: count() }).from(lessonQuestions);
      const lessonCount = lessonResult[0]?.count || 0;
      const questionCount = questionResult[0]?.count || 0;

      console.log(`Admin seed request - Current state: ${lessonCount} lessons, ${questionCount} questions`);

      // If force=true or data is missing, run seed
      const force = req.body.force === true;
      if (force || lessonCount === 0 || questionCount < 1000) {
        console.log('Starting admin-triggered seed...');
        await seedLessons();
        
        const newLessonResult = await db.select({ count: count() }).from(lessons);
        const newQuestionResult = await db.select({ count: count() }).from(lessonQuestions);
        
        res.json({
          success: true,
          message: 'Seeding completed',
          before: { lessons: lessonCount, questions: questionCount },
          after: { lessons: newLessonResult[0]?.count, questions: newQuestionResult[0]?.count }
        });
      } else {
        res.json({
          success: true,
          message: 'Database already seeded',
          lessons: lessonCount,
          questions: questionCount
        });
      }
    } catch (error) {
      console.error('Admin seed error:', error);
      res.status(500).json({ error: 'Seeding failed', details: String(error) });
    }
  });

  // Admin endpoint to seed PS lessons (protected by secret key)
  app.post('/api/admin/seed-ps-lessons', async (req, res) => {
    try {
      const adminKey = req.headers['x-admin-key'] || req.body.adminKey;
      const expectedKey = process.env.ADMIN_SEED_KEY;
      
      if (!expectedKey) {
        return res.status(500).json({ error: 'ADMIN_SEED_KEY not configured' });
      }
      
      if (adminKey !== expectedKey) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Check current state of PS lessons
      const psLessonResult = await db.select({ count: count() }).from(lessons).where(eq(lessons.examTrack, 'ps'));
      const psLessonCount = psLessonResult[0]?.count || 0;

      console.log(`Admin PS seed request - Current state: ${psLessonCount} PS lessons`);

      // If force=true or PS lessons are missing, run seed
      const force = req.body.force === true;
      if (force || psLessonCount < 50) {
        console.log('Starting admin-triggered PS seed...');
        await seedPSLessons();
        
        const newPsLessonResult = await db.select({ count: count() }).from(lessons).where(eq(lessons.examTrack, 'ps'));
        const totalLessonResult = await db.select({ count: count() }).from(lessons);
        const totalQuestionResult = await db.select({ count: count() }).from(lessonQuestions);
        
        res.json({
          success: true,
          message: 'PS Lesson seeding completed',
          before: { psLessons: psLessonCount },
          after: { 
            psLessons: newPsLessonResult[0]?.count,
            totalLessons: totalLessonResult[0]?.count,
            totalQuestions: totalQuestionResult[0]?.count
          }
        });
      } else {
        res.json({
          success: true,
          message: 'PS lessons already seeded',
          psLessons: psLessonCount
        });
      }
    } catch (error) {
      console.error('Admin PS seed error:', error);
      res.status(500).json({ error: 'PS Seeding failed', details: String(error) });
    }
  });

  // Admin endpoint to check database status (no auth required, read-only)
  app.get('/api/admin/db-status', async (_req, res) => {
    try {
      const lessonResult = await db.select({ count: count() }).from(lessons);
      const questionResult = await db.select({ count: count() }).from(lessonQuestions);
      const fsLessonResult = await db.select({ count: count() }).from(lessons).where(eq(lessons.examTrack, 'fs'));
      const psLessonResult = await db.select({ count: count() }).from(lessons).where(eq(lessons.examTrack, 'ps'));
      
      res.json({
        lessons: lessonResult[0]?.count || 0,
        fsLessons: fsLessonResult[0]?.count || 0,
        psLessons: psLessonResult[0]?.count || 0,
        questions: questionResult[0]?.count || 0,
        expectedLessons: 128,
        expectedFsLessons: 73,
        expectedPsLessons: 55,
        expectedQuestions: 2100
      });
    } catch (error) {
      res.status(500).json({ error: 'Database check failed', details: String(error) });
    }
  });

  // Week Progress routes
  app.get("/api/progress/weeks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getAllWeekProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch week progress" });
    }
  });

  app.get("/api/progress/weeks/:week", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = parseInt(req.params.week);
      const progress = await storage.getWeekProgress(userId, week);
      res.json(progress || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch week progress" });
    }
  });

  app.post("/api/progress/weeks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertWeekProgressSchema.parse({ ...req.body, userId });
      const progress = await storage.upsertWeekProgress(data);
      
      // Log daily activity for streak tracking based on which pillars have items
      if (data.readCompleted && data.readCompleted.length > 0) {
        await storage.logDailyActivity(userId, 'read');
      }
      if (data.focusCompleted && data.focusCompleted.length > 0) {
        await storage.logDailyActivity(userId, 'focus');
      }
      if (data.applyCompleted && data.applyCompleted.length > 0) {
        await storage.logDailyActivity(userId, 'apply');
      }
      if (data.reinforceCompleted && data.reinforceCompleted.length > 0) {
        await storage.logDailyActivity(userId, 'reinforce');
      }
      
      res.json(progress);
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(400).json({ error: "Invalid week progress data" });
    }
  });

  // Reading Progress routes (Comprehension Checkpoint)
  app.get("/api/reading-progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getAllReadingProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reading progress" });
    }
  });

  app.get("/api/reading-progress/:week", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = parseInt(req.params.week);
      const progress = await storage.getReadingProgress(userId, week);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reading progress" });
    }
  });

  app.post("/api/reading-progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertReadingProgressSchema.parse({ ...req.body, userId });
      
      // Check if this is a FIRST-EVER completion (completedAt was never set)
      // This is immutable: once completedAt is set, it stays set forever
      // This prevents XP farming via toggle off/on
      let isFirstCompletion = false;
      if (data.week && data.chapterIndex !== undefined && data.completed === true) {
        const existingProgress = await storage.getReadingProgress(userId, data.week);
        const existingChapter = existingProgress.find(p => p.chapterIndex === data.chapterIndex);
        // Only award XP if completedAt was never set (not just if currently incomplete)
        isFirstCompletion = !existingChapter?.completedAt;
      }
      
      const progress = await storage.upsertReadingProgress(data);
      
      // Award XP and quest progress ONLY for FIRST-EVER completions
      // Belt-and-suspenders: XP system also has idempotency via activityKey
      if (isFirstCompletion) {
        const activityKey = `read:week${data.week}:chapter${data.chapterIndex}`;
        const xpResult = await storage.awardXp(userId, 25, activityKey);
        
        // Double-check XP was actually awarded (prevents edge cases)
        if (!xpResult.awarded) {
          // This means the activity was already credited, don't update quests
          return res.json({ ...progress, isNewCompletion: false });
        }
        
        // Log daily activity for streak tracking
        await storage.logDailyActivity(userId, 'reading');
        
        // Update daily quest progress for lesson/reading completion
        let examTrack = req.body.examTrack;
        if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
          const prefs = await storage.getUserPreferences(userId);
          examTrack = prefs?.preferredExamTrack || 'fs';
        }
        await storage.updateQuestProgress(userId, 'complete_lesson', 1, examTrack);
      }
      
      // Return isFirstCompletion flag so client knows whether to show XP toast
      res.json({ ...progress, isNewCompletion: isFirstCompletion });
    } catch (error) {
      console.error("Error saving reading progress:", error);
      res.status(400).json({ error: "Invalid reading progress data" });
    }
  });

  // FOCUS Weakness Scanner routes
  app.get("/api/focus/recent-misses", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = parseInt(req.query.limit as string) || 20;
      const misses = await storage.getRecentMisses(userId, limit);
      res.json(misses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent misses" });
    }
  });

  app.get("/api/focus/domain-stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getDomainStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch domain stats" });
    }
  });

  app.get("/api/focus/streak", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const streak = await storage.getCorrectStreak(userId);
      res.json(streak);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch streak" });
    }
  });

  // APPLY Scenario Lab routes
  app.get("/api/apply/attempts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;
      const attempts = await storage.getApplyChallengeAttempts(userId, week);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch apply attempts" });
    }
  });

  app.post("/api/apply/attempts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertApplyChallengeAttemptSchema.parse({ ...req.body, userId });
      const attempt = await storage.createApplyChallengeAttempt(data);
      res.json(attempt);
    } catch (error) {
      console.error("Error creating apply attempt:", error);
      res.status(400).json({ error: "Invalid apply attempt data" });
    }
  });

  app.patch("/api/apply/attempts/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const attemptId = req.params.id;
      const updates = {
        ...req.body,
        completedAt: new Date(),
      };
      const attempt = await storage.updateApplyChallengeAttempt(userId, attemptId, updates);
      
      // Award XP for APPLY challenge completion (75 XP, only when passed)
      if (attempt && req.body.passed === true) {
        const activityKey = `apply:challenge:${attemptId}`;
        await storage.awardXp(userId, 75, activityKey);
      }
      
      // Log daily activity for streak tracking
      await storage.logDailyActivity(userId, 'apply_challenge');
      
      res.json(attempt);
    } catch (error) {
      console.error("Error updating apply attempt:", error);
      res.status(400).json({ error: "Failed to update apply attempt" });
    }
  });

  // REINFORCE Retention Reviews routes
  app.get("/api/retention/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;
      const reviews = await storage.getRetentionReviews(userId, week);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching retention reviews:", error);
      res.status(500).json({ error: "Failed to fetch retention reviews" });
    }
  });

  app.get("/api/retention/due", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;
      const dueReviews = await storage.getDueRetentionReviews(userId, week);
      res.json(dueReviews);
    } catch (error) {
      console.error("Error fetching due reviews:", error);
      res.status(500).json({ error: "Failed to fetch due reviews" });
    }
  });

  app.get("/api/retention/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;
      const stats = await storage.getRetentionStats(userId, week);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching retention stats:", error);
      res.status(500).json({ error: "Failed to fetch retention stats" });
    }
  });

  app.post("/api/retention/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertRetentionReviewSchema.parse({ ...req.body, userId });
      const review = await storage.createRetentionReview(data);
      res.json(review);
    } catch (error) {
      console.error("Error creating retention review:", error);
      res.status(400).json({ error: "Invalid retention review data" });
    }
  });

  const retentionReviewUpdateSchema = z.object({
    quality: z.number().int().min(0).max(5),
  });

  app.patch("/api/retention/reviews/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const reviewId = req.params.id;
      
      // Validate quality rating (0-5) using Zod
      const { quality } = retentionReviewUpdateSchema.parse(req.body);
      
      // Direct lookup by review ID for more reliable retrieval
      const review = await storage.getRetentionReviewById(reviewId);
      
      // Debug logging for production issue
      console.log('[RETENTION PATCH] userId:', userId, 'reviewId:', reviewId, 'foundReview:', !!review, 'reviewUserId:', review?.userId);
      
      if (!review) {
        console.log('[RETENTION PATCH] Review not found by ID:', reviewId);
        return res.status(404).json({ error: "Review not found" });
      }
      
      // Verify ownership - user can only update their own reviews
      if (review.userId !== userId) {
        console.log('[RETENTION PATCH] User mismatch! requestUserId:', userId, 'reviewUserId:', review.userId);
        return res.status(403).json({ error: "Not authorized to update this review" });
      }

      // SM-2 algorithm
      let easeFactor = review.easeFactor || 2.5;
      let interval = review.intervalDays || 1;
      let masteryLevel = review.masteryLevel || 0;

      if (quality < 3) {
        // Failed recall - reset interval
        interval = 1;
        masteryLevel = Math.max(0, masteryLevel - 1);
      } else {
        // Successful recall - increase interval
        if (review.reviewCount === 0) {
          interval = 1;
        } else if (review.reviewCount === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        masteryLevel = Math.min(5, masteryLevel + 1);
      }

      // Update ease factor
      easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      easeFactor = Math.max(1.3, easeFactor);

      const nextReviewAt = new Date();
      nextReviewAt.setDate(nextReviewAt.getDate() + interval);

      const updates = {
        masteryLevel,
        easeFactor,
        intervalDays: interval,
        lastReviewedAt: new Date(),
        nextReviewAt,
        reviewCount: (review.reviewCount || 0) + 1,
      };

      const updated = await storage.updateRetentionReview(userId, reviewId, updates);
      
      // Award XP for REINFORCE review completion (15 XP, only for successful recall quality >= 3)
      if (updated && quality >= 3) {
        const activityKey = `reinforce:review:${reviewId}`;
        await storage.awardXp(userId, 15, activityKey);
      }
      
      // Log daily activity for streak tracking
      await storage.logDailyActivity(userId, 'retention_review');
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating retention review:", error);
      res.status(400).json({ error: "Failed to update retention review" });
    }
  });

  // Quiz Results routes
  app.get("/api/quiz/results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const results = await storage.getQuizResults(userId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  });

  app.get("/api/quiz/results/domain/:domain", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const domain = decodeURIComponent(req.params.domain);
      const results = await storage.getQuizResultsByDomain(userId, domain);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results by domain" });
    }
  });

  app.post("/api/quiz/results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertQuizResultSchema.parse({ ...req.body, userId });
      const result = await storage.createQuizResult(data);
      res.json(result);
    } catch (error) {
      console.error("Error saving quiz result:", error);
      res.status(400).json({ error: "Invalid quiz result data" });
    }
  });

  app.delete("/api/quiz/results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteAllQuizResults(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete quiz results" });
    }
  });

  // Quiz Statistics route
  app.get("/api/quiz/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const results = await storage.getQuizResults(userId);
      const totalAnswered = results.length;
      const totalCorrect = results.filter(r => r.isCorrect).length;
      const accuracy = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0;

      // Domain stats
      const domainStats: Record<string, { answered: number; correct: number; accuracy: number }> = {};
      results.forEach(result => {
        if (!domainStats[result.domain]) {
          domainStats[result.domain] = { answered: 0, correct: 0, accuracy: 0 };
        }
        domainStats[result.domain].answered++;
        if (result.isCorrect) {
          domainStats[result.domain].correct++;
        }
      });

      // Calculate accuracy for each domain
      Object.keys(domainStats).forEach(domain => {
        const stats = domainStats[domain];
        stats.accuracy = stats.answered > 0 ? (stats.correct / stats.answered) * 100 : 0;
      });

      res.json({
        totalAnswered,
        totalCorrect,
        accuracy,
        domainStats
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz statistics" });
    }
  });

  // Personal Analytics Dashboard route
  app.get("/api/progress/analytics", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const analytics = await storage.getPersonalAnalytics(userId);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching personal analytics:", error);
      res.status(500).json({ error: "Failed to fetch personal analytics" });
    }
  });

  // Domain mastery tracking route with exam track support
  app.get("/api/progress/domain-mastery", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const prefs = await storage.getUserPreferences(userId);
      const examTrack = getValidExamTrack(req.query.examTrack, prefs?.preferredExamTrack);
      const domainMastery = await storage.getDomainMastery(userId, examTrack);
      res.json(domainMastery);
    } catch (error) {
      console.error("Error fetching domain mastery:", error);
      res.status(500).json({ error: "Failed to fetch domain mastery data" });
    }
  });

  // --- Daily Quests Routes ---
  
  app.get("/api/daily-quests", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const examTrack = req.query.examTrack as string;
      if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
        return res.status(400).json({ error: "Valid examTrack (fs or ps) is required" });
      }
      // Generate quests if none exist for today, otherwise return existing
      const quests = await storage.generateDailyQuests(userId, examTrack);
      res.json(quests);
    } catch (error) {
      console.error("Error fetching daily quests:", error);
      res.status(500).json({ error: "Failed to fetch daily quests" });
    }
  });

  app.post("/api/daily-quests/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { questType, increment = 1, examTrack } = req.body;
      
      if (!questType) {
        return res.status(400).json({ error: "questType is required" });
      }
      if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
        return res.status(400).json({ error: "Valid examTrack (fs or ps) is required" });
      }
      
      const updated = await storage.updateQuestProgress(userId, questType, increment, examTrack);
      
      // Log daily activity for streak tracking when quest is completed
      if (updated?.isCompleted) {
        await storage.logDailyActivity(userId, 'daily_quest');
      }
      
      res.json({ updated, awarded: updated?.isCompleted });
    } catch (error) {
      console.error("Error updating quest progress:", error);
      res.status(500).json({ error: "Failed to update quest progress" });
    }
  });

  // --- Spaced Repetition Review Routes ---

  app.get("/api/reviews/upcoming", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = parseInt(req.query.limit as string) || 10;
      const examTrack = req.query.examTrack as string;
      if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
        return res.status(400).json({ error: "Valid examTrack (fs or ps) is required" });
      }
      const reviews = await storage.getUpcomingReviews(userId, limit, examTrack);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching upcoming reviews:", error);
      res.status(500).json({ error: "Failed to fetch upcoming reviews" });
    }
  });

  app.get("/api/reviews/due", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const examTrack = req.query.examTrack as string;
      if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
        return res.status(400).json({ error: "Valid examTrack (fs or ps) is required" });
      }
      const reviews = await storage.getDueReviews(userId, examTrack);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching due reviews:", error);
      res.status(500).json({ error: "Failed to fetch due reviews" });
    }
  });

  app.post("/api/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { itemType, itemId, itemTitle, domain, quality = 3, examTrack } = req.body;
      
      if (!itemType || !itemId || !itemTitle) {
        return res.status(400).json({ error: "itemType, itemId, and itemTitle are required" });
      }
      if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
        return res.status(400).json({ error: "Valid examTrack (fs or ps) is required" });
      }
      
      const review = await storage.createOrUpdateReviewItem(userId, itemType, itemId, itemTitle, domain, quality, examTrack);
      res.json(review);
    } catch (error) {
      console.error("Error creating/updating review:", error);
      res.status(500).json({ error: "Failed to create/update review" });
    }
  });

  // --- AI Study Coach Routes ---

  app.get("/api/study-coach/briefing", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const examTrack = req.query.examTrack as string;
      if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
        return res.status(400).json({ error: "Valid examTrack (fs or ps) is required" });
      }
      const briefing = await storage.getStudyCoachBriefing(userId, examTrack);
      res.json(briefing);
    } catch (error) {
      console.error("Error fetching study coach briefing:", error);
      res.status(500).json({ error: "Failed to fetch study coach briefing" });
    }
  });

  // Quiz Session routes
  app.get("/api/quiz/sessions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getQuizSessions(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz sessions" });
    }
  });

  app.get("/api/quiz/sessions/domain/:domain", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const domain = decodeURIComponent(req.params.domain);
      const sessions = await storage.getQuizSessionsByDomain(userId, domain);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz sessions by domain" });
    }
  });

  app.post("/api/quiz/sessions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertQuizSessionSchema.parse({ ...req.body, userId });
      const session = await storage.createQuizSession(data);
      
      // Award XP for quiz completion (50 XP per quiz session, idempotent)
      if (session) {
        const activityKey = `quiz:session:${session.id}`;
        await storage.awardXp(userId, 50, activityKey);
        
        // Update daily quest progress for quiz completion
        // Get examTrack from request body, fallback to user preferences
        let examTrack = req.body.examTrack;
        if (!examTrack || !['fs', 'ps'].includes(examTrack)) {
          const prefs = await storage.getUserPreferences(userId);
          examTrack = prefs?.preferredExamTrack || 'fs';
        }
        await storage.updateQuestProgress(userId, 'complete_quiz', 1, examTrack);
        
        // Update weak domain quest progress if quiz domain matches user's weak area
        // Require minimum 50% accuracy to count toward quest (prevents low-effort farming)
        // Session-based idempotency prevents the same quiz from being counted multiple times
        const accuracy = data.totalQuestions > 0 ? data.correctAnswers / data.totalQuestions : 0;
        if (data.domain && data.domain !== 'all' && data.correctAnswers > 0 && accuracy >= 0.5 && session) {
          await storage.updateWeakDomainQuestProgress(userId, data.domain, data.correctAnswers, examTrack, session.id);
        }
      }
      
      // Log daily activity for streak tracking
      await storage.logDailyActivity(userId, 'quiz');
      
      res.json(session);
    } catch (error) {
      console.error("Error saving quiz session:", error);
      res.status(400).json({ error: "Invalid quiz session data" });
    }
  });

  app.get("/api/quiz/sessions/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessionId = req.params.id;
      const data = await storage.getQuizSessionWithResults(sessionId);
      
      if (!data) {
        return res.status(404).json({ error: "Quiz session not found" });
      }
      
      // Verify ownership
      if (data.session.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      
      res.json(data);
    } catch (error) {
      console.error("Error fetching quiz session with results:", error);
      res.status(500).json({ error: "Failed to fetch quiz session details" });
    }
  });

  // Quiz Draft routes (for resume functionality)
  app.get("/api/quiz/draft", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const draft = await storage.getActiveQuizDraft(userId);
      res.json(draft || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz draft" });
    }
  });

  app.post("/api/quiz/draft", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertQuizDraftSchema.parse({ ...req.body, userId });
      const draft = await storage.saveQuizDraft(data);
      res.json(draft);
    } catch (error) {
      console.error("Error saving quiz draft:", error);
      res.status(400).json({ error: "Invalid quiz draft data" });
    }
  });

  app.delete("/api/quiz/draft", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteQuizDraft(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete quiz draft" });
    }
  });

  // Exam Draft routes (for resume functionality)
  app.get("/api/exam/draft", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const draft = await storage.getActiveExamDraft(userId);
      res.json(draft || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exam draft" });
    }
  });

  app.post("/api/exam/draft", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertExamDraftSchema.parse({ ...req.body, userId });
      const draft = await storage.saveExamDraft(data);
      res.json(draft);
    } catch (error) {
      console.error("Error saving exam draft:", error);
      res.status(400).json({ error: "Invalid exam draft data" });
    }
  });

  app.delete("/api/exam/draft", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteExamDraft(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete exam draft" });
    }
  });

  // Flashcard Mastery routes
  app.get("/api/flashcards/mastery", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mastery = await storage.getAllFlashcardMastery(userId);
      res.json(mastery);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flashcard mastery" });
    }
  });

  app.get("/api/flashcards/mastery/:flashcardId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mastery = await storage.getFlashcardMastery(userId, req.params.flashcardId);
      res.json(mastery || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flashcard mastery" });
    }
  });

  app.post("/api/flashcards/mastery", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      console.log("[Flashcard POST] userId:", userId, "body:", req.body);
      const data = insertFlashcardMasterySchema.parse({ ...req.body, userId });
      console.log("[Flashcard POST] Parsed data:", data);
      const mastery = await storage.upsertFlashcardMastery(data);
      console.log("[Flashcard POST] Upserted mastery:", mastery);
      
      // Log daily activity for streak tracking
      await storage.logDailyActivity(userId, 'flashcard_review');
      
      res.json(mastery);
    } catch (error) {
      console.error("Error saving flashcard mastery:", error);
      res.status(400).json({ error: "Invalid flashcard mastery data" });
    }
  });

  app.delete("/api/flashcards/mastery", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteAllFlashcardMastery(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete flashcard mastery" });
    }
  });

  // Flashcard Statistics route
  app.get("/api/flashcards/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mastery = await storage.getAllFlashcardMastery(userId);
      const totalReviewed = mastery.length;
      const totalMastered = mastery.filter(m => m.masteryLevel >= 4).length;
      const masteryPercentage = totalReviewed > 0 ? (totalMastered / totalReviewed) * 100 : 0;

      res.json({
        totalReviewed,
        totalMastered,
        masteryPercentage
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flashcard statistics" });
    }
  });

  // Flashcard Feynman Mode routes
  app.get("/api/flashcards/feynman", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const scores = await storage.getAllFlashcardFeynmanScores(userId);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Feynman scores" });
    }
  });

  app.get("/api/flashcards/feynman/:flashcardId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const score = await storage.getFlashcardFeynmanScore(userId, req.params.flashcardId);
      res.json(score || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Feynman score" });
    }
  });

  app.post("/api/flashcards/feynman", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertFlashcardFeynmanScoreSchema.parse({ ...req.body, userId });
      const score = await storage.upsertFlashcardFeynmanScore(data);
      res.json(score);
    } catch (error) {
      console.error("Error saving Feynman score:", error);
      res.status(400).json({ error: "Invalid Feynman score data" });
    }
  });

  // Flashcard Mnemonic routes
  app.get("/api/flashcards/mnemonics", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mnemonics = await storage.getAllFlashcardMnemonics(userId);
      res.json(mnemonics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mnemonics" });
    }
  });

  app.get("/api/flashcards/mnemonics/:flashcardId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mnemonic = await storage.getFlashcardMnemonic(userId, req.params.flashcardId);
      res.json(mnemonic || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mnemonic" });
    }
  });

  app.post("/api/flashcards/mnemonics", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertFlashcardMnemonicSchema.parse({ ...req.body, userId });
      const mnemonic = await storage.upsertFlashcardMnemonic(data);
      res.json(mnemonic);
    } catch (error) {
      console.error("Error saving mnemonic:", error);
      res.status(400).json({ error: "Invalid mnemonic data" });
    }
  });

  app.delete("/api/flashcards/mnemonics/:flashcardId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteFlashcardMnemonic(userId, req.params.flashcardId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete mnemonic" });
    }
  });

  // Flashcard Triad Drill routes
  app.get("/api/flashcards/triad", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getAllFlashcardTriadProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch triad progress" });
    }
  });

  app.get("/api/flashcards/triad/:flashcardId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getFlashcardTriadProgress(userId, req.params.flashcardId);
      res.json(progress || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch triad progress" });
    }
  });

  app.post("/api/flashcards/triad", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertFlashcardTriadProgressSchema.parse({ ...req.body, userId });
      const progress = await storage.upsertFlashcardTriadProgress(data);
      res.json(progress);
    } catch (error) {
      console.error("Error saving triad progress:", error);
      res.status(400).json({ error: "Invalid triad progress data" });
    }
  });

  // Flashcard Review Sessions routes (timestamped tracking)
  app.get("/api/flashcards/sessions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getFlashcardReviewSessions(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch review sessions" });
    }
  });

  app.get("/api/flashcards/sessions/today", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getTodayFlashcardSessions(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch today's sessions" });
    }
  });

  // Get active (incomplete) session for resume functionality
  app.get("/api/flashcards/sessions/active", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const examTrack = (req.query.examTrack as string) || 'fs';
      
      const session = await storage.getActiveFlashcardSession(userId, examTrack);
      res.json(session || null);
    } catch (error) {
      console.error("Error fetching active session:", error);
      res.status(500).json({ error: "Failed to fetch active session" });
    }
  });

  app.post("/api/flashcards/sessions/start", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const period = getReviewPeriod();
      const examTrack = req.body.examTrack || 'fs';
      const userState = req.body.userState || null;
      
      // Auto-complete any stale sessions first
      await storage.autoCompleteStaleFlashcardSessions(userId, examTrack);
      
      // Check for existing active session to resume
      const existingSession = await storage.getActiveFlashcardSession(userId, examTrack);
      if (existingSession) {
        // Return existing session for resume
        return res.json(existingSession);
      }
      
      // Create new session
      const session = await storage.createFlashcardReviewSession({
        userId,
        examTrack,
        period,
        cardsReviewed: 0,
        timeSpentSeconds: 0,
        xpAwarded: false,
        userState
      });
      
      res.json(session);
    } catch (error) {
      console.error("Error starting review session:", error);
      res.status(400).json({ error: "Failed to start review session" });
    }
  });

  // Update session state (for resume persistence) - supports both PATCH and POST for sendBeacon
  const updateSessionState = async (req: any, res: any) => {
    try {
      const { sessionId } = req.params;
      const userState = req.body;
      
      const session = await storage.updateFlashcardSessionState(sessionId, userState);
      res.json(session);
    } catch (error) {
      console.error("Error updating session state:", error);
      res.status(400).json({ error: "Failed to update session state" });
    }
  };
  
  app.patch("/api/flashcards/sessions/:sessionId/state", isAuthenticated, updateSessionState);
  app.post("/api/flashcards/sessions/:sessionId/state", isAuthenticated, updateSessionState);

  // Log individual flashcard review event
  app.post("/api/flashcards/sessions/:sessionId/review", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;
      const { cardId, deck, mode, rating } = req.body;
      
      if (!cardId || !deck || !mode) {
        return res.status(400).json({ error: "cardId, deck, and mode are required" });
      }
      
      const event = await storage.logFlashcardReviewEvent({
        sessionId,
        userId,
        cardId,
        deck,
        mode,
        rating
      });
      
      // Also record progress for quest tracking
      await storage.recordFlashcardProgress(userId, cardId, mode);
      
      // Get current event count for this session to determine if XP should be awarded
      const eventCount = await storage.getFlashcardReviewEventCount(userId, new Date());
      
      res.json({ 
        event,
        todayReviewCount: eventCount 
      });
    } catch (error) {
      console.error("Error logging review event:", error);
      res.status(400).json({ error: "Failed to log review event" });
    }
  });

  app.post("/api/flashcards/sessions/:sessionId/complete", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;
      const { cardsReviewed, avgMasteryRating, domainBreakdown, timeSpentSeconds } = req.body;
      
      // Complete the session
      const session = await storage.completeFlashcardReviewSession(sessionId, {
        cardsReviewed,
        avgMasteryRating,
        domainBreakdown,
        timeSpentSeconds
      });
      
      // Award XP (idempotent per period per day)
      const xpResult = await storage.awardFlashcardReviewXp(userId, sessionId, session.period);
      
      res.json({ 
        session, 
        xpAwarded: xpResult.awarded,
        xpAmount: xpResult.xp 
      });
    } catch (error) {
      console.error("Error completing review session:", error);
      res.status(400).json({ error: "Failed to complete review session" });
    }
  });

  // Record individual flashcard progress (for Daily Quest tracking)
  app.post("/api/flashcards/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { cardId, mode } = req.body;
      
      if (!cardId || !mode) {
        return res.status(400).json({ error: "cardId and mode are required" });
      }
      
      const result = await storage.recordFlashcardProgress(userId, cardId, mode);
      res.json(result);
    } catch (error) {
      console.error("Error recording flashcard progress:", error);
      res.status(400).json({ error: "Failed to record flashcard progress" });
    }
  });

  // Get today's flashcard progress count
  app.get("/api/flashcards/progress/today", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const count = await storage.getTodayFlashcardProgressCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching flashcard progress:", error);
      res.status(500).json({ error: "Failed to fetch flashcard progress" });
    }
  });

  // Practice Exam routes
  app.get("/api/exams", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const exams = await storage.getPracticeExams(userId);
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch practice exams" });
    }
  });

  app.get("/api/exams/latest", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const exam = await storage.getLatestPracticeExam(userId);
      res.json(exam || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest exam" });
    }
  });

  app.post("/api/exams", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { questionResults, ...summaryData } = req.body;
      
      // Save exam summary
      const data = insertPracticeExamSchema.parse({ ...summaryData, userId });
      const exam = await storage.createPracticeExam(data);
      
      // Validate and save individual question results if provided
      if (questionResults && Array.isArray(questionResults)) {
        // Import validation schema
        const { clientPracticeExamQuestionResultSchema } = await import("@shared/schema");
        
        for (const qr of questionResults) {
          // Validate client data (without userId/examId)
          const validatedQr = clientPracticeExamQuestionResultSchema.parse(qr);
          
          // Add server-side userId and examId
          await storage.createPracticeExamResult({
            ...validatedQr,
            examId: exam.id,
            userId, // Derived from session, not client
            explanation: validatedQr.explanation || ""
          });
        }
      }
      
      // Award XP for practice exam completion (100 XP per exam, idempotent)
      if (exam) {
        const activityKey = `exam:practice:${exam.id}`;
        await storage.awardXp(userId, 100, activityKey);
      }
      
      // Log daily activity for streak tracking
      await storage.logDailyActivity(userId, 'practice_exam');
      
      res.json(exam);
    } catch (error) {
      console.error("Error saving exam:", error);
      res.status(400).json({ error: "Invalid practice exam data" });
    }
  });

  app.get("/api/exams/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const examId = req.params.id;
      const data = await storage.getPracticeExamWithResults(examId);
      
      if (!data) {
        return res.status(404).json({ error: "Practice exam not found" });
      }
      
      // Verify ownership
      if (data.exam.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      
      res.json(data);
    } catch (error) {
      console.error("Error fetching practice exam with results:", error);
      res.status(500).json({ error: "Failed to fetch practice exam details" });
    }
  });

  // Study Notes routes (enhanced with multi-page, day tracking, domain tagging)
  
  // Get all notes for user
  app.get("/api/notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notes = await storage.getAllStudyNotes(userId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study notes" });
    }
  });

  // Get notes by week
  app.get("/api/notes/week/:week", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = parseInt(req.params.week);
      const notes = await storage.getStudyNotesByWeek(userId, week);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study notes for week" });
    }
  });

  // Get notes by week and day
  app.get("/api/notes/week/:week/day/:day", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = parseInt(req.params.week);
      const day = req.params.day;
      const notes = await storage.getStudyNotesByDay(userId, week, day);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study notes for day" });
    }
  });

  // Get single note by ID
  app.get("/api/notes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const noteId = req.params.id;
      const note = await storage.getStudyNote(userId, noteId);
      res.json(note || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study note" });
    }
  });

  // Create new note
  app.post("/api/notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertStudyNoteSchema.parse({ ...req.body, userId });
      const note = await storage.createStudyNote(data);
      res.json(note);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(400).json({ error: "Invalid study note data" });
    }
  });

  // Update existing note
  app.patch("/api/notes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const noteId = req.params.id;
      const updates = req.body;
      const note = await storage.updateStudyNote(userId, noteId, updates);
      res.json(note);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(400).json({ error: "Failed to update study note" });
    }
  });

  // Delete note
  app.delete("/api/notes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const noteId = req.params.id;
      await storage.deleteStudyNote(userId, noteId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(400).json({ error: "Failed to delete study note" });
    }
  });

  // Overall Progress/Statistics route
  app.get("/api/progress/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const weekProgress = await storage.getAllWeekProgress(userId);
      const quizResults = await storage.getQuizResults(userId);
      const flashcardMastery = await storage.getAllFlashcardMastery(userId);
      const practiceExams = await storage.getPracticeExams(userId);

      // Calculate weeks completed
      const weeksCompleted = weekProgress.filter(wp => {
        const totalItems = wp.readCompleted.length + wp.focusCompleted.length + 
                          wp.applyCompleted.length + wp.reinforceCompleted.length;
        return totalItems > 0;
      }).length;

      // Calculate study days (based on unique dates from quiz results and week progress)
      const uniqueDates = new Set<string>();
      quizResults.forEach(r => uniqueDates.add(r.completedAt.toDateString()));
      weekProgress.forEach(wp => uniqueDates.add(wp.updatedAt.toDateString()));
      const totalStudyDays = uniqueDates.size;

      // Quiz stats
      const questionsAnswered = quizResults.length;
      const questionsCorrect = quizResults.filter(r => r.isCorrect).length;

      // Flashcard stats
      const flashcardsReviewed = flashcardMastery.length;
      const flashcardsMastered = flashcardMastery.filter(m => m.masteryLevel >= 4).length;

      // Practice exams
      const practiceExamsTaken = practiceExams.length;
      const latestExam = practiceExams[0];
      const lastExamScore = latestExam 
        ? Math.round((latestExam.correctAnswers / latestExam.totalQuestions) * 100)
        : 0;

      // Study streak (use proper calculation from storage)
      const streakData = await storage.calculateStreak(userId);
      const currentStreak = streakData.currentStreak;
      const longestStreak = streakData.longestStreak;

      res.json({
        totalStudyDays,
        currentStreak,
        longestStreak,
        weeksCompleted,
        questionsAnswered,
        questionsCorrect,
        flashcardsReviewed,
        flashcardsMastered,
        practiceExamsTaken,
        lastExamScore
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch progress statistics" });
    }
  });

  // Daily Activity routes
  app.get("/api/activity/daily", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const days = parseInt(req.query.days as string) || 30;
      const activity = await storage.getDailyActivity(userId, days);
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch daily activity" });
    }
  });

  app.post("/api/activity/log", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { activityType } = req.body;
      await storage.logDailyActivity(userId, activityType);
      res.json({ success: true });
    } catch (error) {
      console.error("Error logging activity:", error);
      res.status(500).json({ error: "Failed to log activity" });
    }
  });

  // Streak calculation route
  app.get("/api/activity/streak", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const streak = await storage.calculateStreak(userId);
      res.json(streak);
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate streak" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  app.post("/api/achievements/check", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const newAchievements = await storage.checkAndAwardAchievements(userId);
      res.json(newAchievements);
    } catch (error) {
      console.error("Error checking achievements:", error);
      res.status(500).json({ error: "Failed to check achievements" });
    }
  });

  // Custom Weeks routes
  app.get("/api/custom-weeks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const customWeeks = await storage.getCustomWeeks(userId);
      res.json(customWeeks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch custom weeks" });
    }
  });

  app.post("/api/custom-weeks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertCustomWeekSchema.parse({ ...req.body, userId });
      const customWeek = await storage.createCustomWeek(data);
      res.json(customWeek);
    } catch (error) {
      console.error("Error creating custom week:", error);
      res.status(400).json({ error: "Invalid custom week data" });
    }
  });

  app.delete("/api/custom-weeks/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      await storage.deleteCustomWeek(userId, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete custom week" });
    }
  });

  // Overall Progress Metrics route
  app.get("/api/progress/overall", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Get all data
      const [weekProgress, quizSessions, flashcardMastery, customWeeks, streak] = await Promise.all([
        storage.getAllWeekProgress(userId),
        storage.getQuizSessions(userId),
        storage.getAllFlashcardMastery(userId),
        storage.getCustomWeeks(userId),
        storage.calculateStreak(userId)
      ]);

      // Calculate weeks completed (core 16 weeks)
      const coreWeeksCompleted = weekProgress.filter(w => {
        const allItems = [
          ...w.readCompleted,
          ...w.focusCompleted,
          ...w.applyCompleted,
          ...w.reinforceCompleted
        ];
        return allItems.length > 0;
      }).length;

      // Total weeks including custom
      const totalWeeks = 16 + customWeeks.length;
      const totalWeeksCompleted = coreWeeksCompleted + customWeeks.filter(cw => {
        // Check if there's progress for this custom week
        const progress = weekProgress.find(wp => wp.week === cw.weekNumber);
        return progress && (
          progress.readCompleted.length > 0 ||
          progress.focusCompleted.length > 0 ||
          progress.applyCompleted.length > 0 ||
          progress.reinforceCompleted.length > 0
        );
      }).length;

      // Quiz accuracy - only count completed quiz sessions
      const totalQuestionsFromSessions = quizSessions.reduce((sum, session) => sum + session.totalQuestions, 0);
      const correctQuestionsFromSessions = quizSessions.reduce((sum, session) => sum + session.correctAnswers, 0);
      const quizAccuracy = totalQuestionsFromSessions > 0 ? (correctQuestionsFromSessions / totalQuestionsFromSessions) * 100 : 0;

      // Flashcard mastery
      const totalFlashcards = flashcardMastery.length;
      const masteredFlashcards = flashcardMastery.filter(f => f.masteryLevel >= 4).length;
      const flashcardMasteryPercent = totalFlashcards > 0 ? (masteredFlashcards / totalFlashcards) * 100 : 0;

      // Overall progress calculation
      // 40% weeks, 30% quiz accuracy, 30% flashcard mastery
      const weekProgress_percent = (totalWeeksCompleted / totalWeeks) * 100;
      const overallProgress = (weekProgress_percent * 0.4) + (quizAccuracy * 0.3) + (flashcardMasteryPercent * 0.3);

      res.json({
        overallProgress: Math.round(overallProgress),
        weeksCompleted: totalWeeksCompleted,
        totalWeeks,
        quizAccuracy: Math.round(quizAccuracy),
        flashcardMasteryPercent: Math.round(flashcardMasteryPercent),
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak
      });
    } catch (error) {
      console.error("Error fetching overall progress:", error);
      res.status(500).json({ error: "Failed to fetch overall progress" });
    }
  });

  // Pretest routes
  app.get("/api/pretest/latest", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const result = await storage.getLatestPretestResult(userId);
      res.json(result || null);
    } catch (error) {
      console.error("Error fetching pretest result:", error);
      res.status(500).json({ error: "Failed to fetch pretest result" });
    }
  });

  app.post("/api/pretest/results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { questionResults, ...summaryData } = req.body;
      
      // Save pretest summary
      const data = insertPretestResultSchema.parse({ ...summaryData, userId });
      const result = await storage.savePretestResult(data);
      
      // Validate and save individual question results if provided
      if (questionResults && Array.isArray(questionResults)) {
        // Import validation schema
        const { clientPretestQuestionResultSchema } = await import("@shared/schema");
        
        for (const qr of questionResults) {
          // Validate client data (without userId/pretestId)
          const validatedQr = clientPretestQuestionResultSchema.parse(qr);
          
          // Add server-side userId and pretestId
          await storage.createPretestQuestionResult({
            ...validatedQr,
            pretestId: result.id,
            userId, // Derived from session, not client
            explanation: validatedQr.explanation || ""
          });
        }
      }
      
      // Update user preferences to mark pretest as completed
      await storage.upsertUserPreferences({ userId, hasCompletedPretest: true });
      
      res.json(result);
    } catch (error: any) {
      console.error("Error saving pretest result:", error);
      const errorMessage = error?.message || "Invalid pretest result data";
      res.status(400).json({ error: errorMessage });
    }
  });

  app.get("/api/pretest/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const pretestId = req.params.id;
      const data = await storage.getPretestWithResults(pretestId);
      
      if (!data) {
        return res.status(404).json({ error: "Pretest not found" });
      }
      
      // Verify ownership
      if (data.pretest.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      
      res.json(data);
    } catch (error) {
      console.error("Error fetching pretest with results:", error);
      res.status(500).json({ error: "Failed to fetch pretest details" });
    }
  });

  // User Preferences routes
  app.get("/api/preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      let preferences = await storage.getUserPreferences(userId);
      
      // Create default preferences if they don't exist
      if (!preferences) {
        preferences = await storage.upsertUserPreferences({ 
          userId, 
          studyMode: 'standard', 
          hasCompletedPretest: false,
          hasSeenWelcome: false
        });
      }
      
      res.json(preferences);
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      res.status(500).json({ error: "Failed to fetch user preferences" });
    }
  });

  // Shared handler for PUT and PATCH
  const updatePreferences = async (req: any, res: any) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate exam track - fs and ps are available, state-specific is coming soon
      const requestedExamTrack = req.body.preferredExamTrack;
      if (requestedExamTrack && requestedExamTrack === 'state-specific') {
        return res.status(400).json({ error: "State-Specific exams are coming soon. Please select FS or PS exam." });
      }
      
      // Get existing preferences to merge with partial updates
      const existing = await storage.getUserPreferences(userId);
      const merged = {
        userId,
        studyMode: req.body.studyMode ?? existing?.studyMode ?? 'standard',
        hasCompletedPretest: req.body.hasCompletedPretest ?? existing?.hasCompletedPretest ?? false,
        hasSeenWelcome: req.body.hasSeenWelcome ?? existing?.hasSeenWelcome ?? false,
        examDate: req.body.examDate !== undefined ? req.body.examDate : existing?.examDate,
        currentCycle: req.body.currentCycle ?? existing?.currentCycle ?? 1,
        customWeeklyDomains: req.body.customWeeklyDomains !== undefined ? req.body.customWeeklyDomains : existing?.customWeeklyDomains,
        customTimeline: req.body.customTimeline ?? existing?.customTimeline ?? 12,
        preferredExamTrack: req.body.preferredExamTrack ?? existing?.preferredExamTrack ?? 'fs',
        stateCode: req.body.stateCode ?? existing?.stateCode ?? 'TX',
      };
      
      const data = insertUserPreferencesSchema.parse(merged);
      const preferences = await storage.upsertUserPreferences(data);
      res.json(preferences);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(400).json({ error: "Invalid preferences data" });
    }
  };

  app.put("/api/preferences", isAuthenticated, updatePreferences);
  app.patch("/api/preferences", isAuthenticated, updatePreferences);

  // Daily Log routes
  app.get("/api/daily-logs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const logs = await storage.getDailyLogs(userId);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching daily logs:", error);
      res.status(500).json({ error: "Failed to fetch daily logs" });
    }
  });

  app.post("/api/daily-logs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertDailyLogSchema.parse({ ...req.body, userId });
      const log = await storage.createDailyLog(data);
      
      // Log daily activity for streak tracking
      await storage.logDailyActivity(userId, 'daily_log');
      
      res.json(log);
    } catch (error) {
      console.error("Error creating daily log:", error);
      res.status(400).json({ error: "Invalid daily log data" });
    }
  });

  app.put("/api/daily-logs/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      const data = insertDailyLogSchema.partial().parse(req.body);
      const log = await storage.updateDailyLog(userId, id, data);
      res.json(log);
    } catch (error) {
      console.error("Error updating daily log:", error);
      res.status(400).json({ error: "Invalid daily log data" });
    }
  });

  app.delete("/api/daily-logs/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      await storage.deleteDailyLog(userId, id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting daily log:", error);
      res.status(500).json({ error: "Failed to delete daily log" });
    }
  });

  // Study Cycles routes
  app.get("/api/study-cycles", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cycles = await storage.getStudyCycles(userId);
      res.json(cycles);
    } catch (error) {
      console.error("Error fetching study cycles:", error);
      res.status(500).json({ error: "Failed to fetch study cycles" });
    }
  });

  app.get("/api/study-cycles/current", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cycle = await storage.getCurrentStudyCycle(userId);
      res.json(cycle || null);
    } catch (error) {
      console.error("Error fetching current cycle:", error);
      res.status(500).json({ error: "Failed to fetch current cycle" });
    }
  });

  app.post("/api/study-cycles/complete", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cycle = await storage.completeCurrentCycle(userId);
      res.json(cycle);
    } catch (error) {
      console.error("Error completing cycle:", error);
      res.status(500).json({ error: "Failed to complete cycle" });
    }
  });

  app.post("/api/study-cycles/start", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cycle = await storage.startNewCycle(userId);
      res.json(cycle);
    } catch (error) {
      console.error("Error starting new cycle:", error);
      res.status(500).json({ error: "Failed to start new cycle" });
    }
  });

  // Helper function to get valid exam track (fs or ps only, defaults to fs)
  const getValidExamTrack = (queryParam?: string, preference?: string): 'fs' | 'ps' => {
    // First check explicit query parameter
    if (queryParam === 'fs' || queryParam === 'ps') {
      return queryParam;
    }
    // Fall back to preference, but only if it's a valid supported track (fs or ps)
    // state-specific and any invalid values default to fs
    if (preference === 'ps') {
      return 'ps';
    }
    return 'fs'; // Default to FS for all other cases
  };

  // Interactive Lesson routes
  // Get all lessons - must come before parameterized routes
  // Supports optional ?examTrack=fs|ps query parameter, defaults to user preference or 'fs'
  app.get("/api/lessons", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const prefs = await storage.getUserPreferences(userId);
      const examTrack = getValidExamTrack(req.query.examTrack, prefs?.preferredExamTrack);
      const lessons = await storage.getAllLessons(examTrack);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching all lessons:", error);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  app.get("/api/lessons/week/:week", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = parseInt(req.params.week);
      const prefs = await storage.getUserPreferences(userId);
      const examTrack = getValidExamTrack(req.query.examTrack, prefs?.preferredExamTrack);
      const lessons = await storage.getLessonsByWeek(week, examTrack);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons for week:", error);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  app.get("/api/lessons/domain/:domainNumber", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const domainNumber = parseInt(req.params.domainNumber);
      const prefs = await storage.getUserPreferences(userId);
      const examTrack = getValidExamTrack(req.query.examTrack, prefs?.preferredExamTrack);
      // Validate domain number based on exam track (FS has 8 domains, PS has 5)
      const maxDomain = examTrack === 'ps' ? 5 : 8;
      if (Number.isNaN(domainNumber) || domainNumber < 1 || domainNumber > maxDomain) {
        return res.status(400).json({ error: `Domain number must be between 1 and ${maxDomain} for ${examTrack.toUpperCase()} exam` });
      }
      const lessons = await storage.getLessonsByDomain(domainNumber, examTrack);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons for domain:", error);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  // Get lesson progress - must come BEFORE /api/lessons/:id to avoid route collision
  app.get("/api/lessons/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const prefs = await storage.getUserPreferences(userId);
      const examTrack = getValidExamTrack(req.query.examTrack, prefs?.preferredExamTrack);
      console.log(`[Get Progress] Fetching progress for userId: ${userId}, examTrack: ${examTrack}`);
      const progress = await storage.getAllLessonProgress(userId, examTrack);
      console.log(`[Get Progress] Found ${progress.length} progress records`);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching lesson progress:", error);
      res.status(500).json({ error: "Failed to fetch lesson progress" });
    }
  });

  // Get lesson progress summary (count of completed lessons)
  app.get("/api/lessons/progress-summary", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const prefs = await storage.getUserPreferences(userId);
      const examTrack = getValidExamTrack(req.query.examTrack, prefs?.preferredExamTrack);
      const progress = await storage.getAllLessonProgress(userId, examTrack);
      const completed = progress.filter(p => p.completed).length;
      const lessons = await storage.getAllLessons(examTrack);
      res.json({ completed, total: lessons.length });
    } catch (error) {
      console.error("Error fetching lesson progress summary:", error);
      res.status(500).json({ error: "Failed to fetch progress summary" });
    }
  });

  // Get study stats for dashboard
  app.get("/api/study-stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const prefs = await storage.getUserPreferences(userId);
      const examTrack = getValidExamTrack(req.query.examTrack, prefs?.preferredExamTrack);
      
      const progress = await storage.getAllLessonProgress(userId, examTrack);
      const lessonsCompleted = progress.filter(p => p.completed).length;
      const lessons = await storage.getAllLessons(examTrack);
      const totalLessons = lessons.length;
      
      // Get XP from storage
      const xpData = await storage.getUserXp(userId);
      const totalXp = xpData.xp;
      
      // Calculate streak from daily_activity table (auto-logged activities)
      const streakData = await storage.calculateStreak(userId);
      const currentStreak = streakData.currentStreak;
      
      // Calculate total hours spent from lesson progress (auto-tracked time during lessons)
      const totalSecondsFromLessons = progress.reduce((sum, p) => sum + (p.timeSpentSeconds || 0), 0);
      const autoTrackedMinutes = Math.round(totalSecondsFromLessons / 60);
      
      // Daily logs are separate manual entries for general study time (not lesson-specific)
      // These are additive to auto-tracked time since they represent different activities
      const dailyLogs = await storage.getDailyLogs(userId);
      const manualLogMinutes = dailyLogs.reduce((sum, log) => sum + (log.timeSpent || 0), 0);
      
      // Total study time = auto-tracked lesson time + manually logged study time
      const totalMinutesSpent = autoTrackedMinutes + manualLogMinutes;
      const hoursSpent = Math.round((totalMinutesSpent / 60) * 10) / 10; // Round to 1 decimal
      
      res.json({
        lessonsCompleted,
        totalLessons,
        flashcardsReviewed: 0,
        quizzesTaken: 0,
        currentStreak,
        totalXp,
        hoursSpent
      });
    } catch (error) {
      console.error("Error fetching study stats:", error);
      res.status(500).json({ error: "Failed to fetch study stats" });
    }
  });

  app.get("/api/lessons/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lessonId = req.params.id;
      
      // Use randomized questions method to get different variations each time
      const data = await storage.getLessonWithRandomizedQuestions(userId, lessonId);
      
      if (!data) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      // Sanitize questions - don't expose correct answers or explanations
      const sanitizedQuestions = data.questions.map((q) => {
        let sanitizedOptions = q.options;
        
        // For drag-drop, only send the items array, not the correct order
        if (q.questionType === 'drag_drop' && q.options) {
          const dragDropData = q.options as { items: string[]; correctOrder?: number[] };
          sanitizedOptions = { items: dragDropData.items };
        }

        return {
          id: q.id,
          lessonId: q.lessonId,
          questionType: q.questionType,
          questionText: q.questionText,
          options: sanitizedOptions,
          orderIndex: q.orderIndex,
          points: q.points,
          // correctAnswer and explanation are NOT included - only revealed after submission
        };
      });
      
      res.json({
        lesson: data.lesson,
        questions: sanitizedQuestions,
      });
    } catch (error) {
      console.error("Error fetching lesson:", error);
      res.status(500).json({ error: "Failed to fetch lesson" });
    }
  });

  app.post("/api/lessons/:id/submit", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lessonId = req.params.id;
      const { answers, questionIds, timeSpentSeconds = 0 } = req.body;
      
      console.log(`[Submit Lesson] userId: ${userId}, lessonId: ${lessonId}, answerCount: ${Object.keys(answers).length}`);

      // Validate we have question IDs from the frontend
      if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
        return res.status(400).json({ error: "No question IDs provided" });
      }

      // Get the lesson to verify it exists
      const lessonData = await storage.getLessonWithQuestions(lessonId);
      if (!lessonData) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      const { lesson } = lessonData;

      // Fetch the specific questions that were shown to the user
      const questions = await storage.getQuestionsByIds(questionIds);

      // Validate we got the questions
      if (questions.length === 0) {
        console.error(`[Submit Lesson] No questions found for IDs: ${questionIds.join(', ')}`);
        return res.status(400).json({ 
          error: "Questions not found in database. The database may need to be reseeded.",
          questionIds: questionIds.slice(0, 3) // Show first 3 for debugging
        });
      }

      // Security check: verify all questions belong to this lesson
      const invalidQuestions = questions.filter(q => q.lessonId !== lessonId);
      if (invalidQuestions.length > 0) {
        console.log(`[Submit Lesson] Security violation: ${invalidQuestions.length} questions don't belong to lesson ${lessonId}`);
        return res.status(400).json({ error: "Invalid question IDs for this lesson" });
      }
      
      console.log(`[Submit Lesson] Loaded ${questions.length} questions by IDs`);

      // Helper function to compare fill-in-blank answers
      const compareFillInBlank = (userAnswer: string, correctAnswer: string): boolean => {
        const userStr = (userAnswer || '').toLowerCase().trim();
        const correctStr = correctAnswer.toLowerCase().trim();

        // Direct string match
        if (userStr === correctStr) {
          return true;
        }

        // Try numeric comparison with tolerance
        const normalizeNumber = (str: string) => {
          // Remove commas and common separators
          return str.replace(/,/g, '').replace(/\s/g, '');
        };

        const userNorm = normalizeNumber(userStr);
        const correctNorm = normalizeNumber(correctStr);

        // Check if both are numbers
        const userNum = parseFloat(userNorm);
        const correctNum = parseFloat(correctNorm);

        if (!isNaN(userNum) && !isNaN(correctNum)) {
          // For whole numbers, require exact match
          if (Number.isInteger(correctNum) && Number.isInteger(userNum)) {
            return userNum === correctNum;
          }
          
          // For decimals, allow small tolerance (0.1%)
          const tolerance = Math.abs(correctNum) * 0.001;
          return Math.abs(userNum - correctNum) <= tolerance;
        }

        // Fall back to normalized string comparison
        return userNorm === correctNorm;
      };

      // Calculate score
      let score = 0;
      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
      const results = questions.map((question, idx) => {
        const userAnswer = answers[question.id];
        let isCorrect = false;
        
        // Log each question processing
        const logPrefix = `[Submit Lesson Q${idx + 1}]`;
        
        if (userAnswer === undefined || userAnswer === null) {
          console.log(`${logPrefix} No answer for ${question.id} (type: ${question.questionType})`);
        } else {
          console.log(`${logPrefix} Answer provided for ${question.id}: ${userAnswer}`);
        }

        // Check answer based on question type
        if (question.questionType === 'multiple_choice') {
          isCorrect = String(userAnswer) === question.correctAnswer;
          console.log(`${logPrefix} MC: user=${userAnswer}, correct=${question.correctAnswer}, match=${isCorrect}`);
        } else if (question.questionType === 'fill_in_blank') {
          isCorrect = userAnswer && compareFillInBlank(userAnswer, question.correctAnswer);
          console.log(`${logPrefix} FIB: user="${userAnswer}", correct="${question.correctAnswer}", match=${isCorrect}`);
        } else if (question.questionType === 'drag_drop') {
          isCorrect = userAnswer && JSON.stringify(userAnswer) === question.correctAnswer;
          console.log(`${logPrefix} DD: user=${userAnswer}, correct=${question.correctAnswer}, match=${isCorrect}`);
        }

        if (isCorrect) {
          score += question.points;
        }

        return {
          questionId: question.id,
          userAnswer: userAnswer !== undefined ? userAnswer : null,
          correctAnswer: question.correctAnswer,
          isCorrect,
          explanation: question.explanation,
          points: isCorrect ? question.points : 0,
        };
      });

      // Update or create progress
      const existingProgress = await storage.getLessonProgress(userId, lessonId);
      const attempts = (existingProgress?.attempts || 0) + 1;
      const completed = score >= totalPoints * 0.7; // 70% to pass

      // Track which question variations were shown this attempt
      const seenVariations = (existingProgress?.seenQuestionVariations as Record<string, string[]>) || {};
      questions.forEach((q) => {
        const groupKey = (q.variationGroup ?? 1).toString();
        const seenIds = seenVariations[groupKey] || [];
        if (!seenIds.includes(q.id)) {
          seenIds.push(q.id);
        }
        seenVariations[groupKey] = seenIds;
      });

      console.log(`[Submit Lesson] Saving progress - score: ${score}/${totalPoints}, passed: ${completed}`);
      
      const progress = await storage.upsertLessonProgress({
        userId,
        lessonId,
        completed,
        score,
        totalPoints,
        attempts,
        timeSpentSeconds: (existingProgress?.timeSpentSeconds || 0) + timeSpentSeconds,
        seenQuestionVariations: seenVariations,
        lastAttemptAt: new Date(),
        completedAt: completed ? new Date() : existingProgress?.completedAt,
      });
      
      console.log(`[Submit Lesson] Progress saved:`, progress);

      // Award XP for lesson completion (50 XP per lesson, only on first completion)
      if (completed && !existingProgress?.completed) {
        const activityKey = `lesson:complete:${lessonId}`;
        await storage.awardXp(userId, 50, activityKey);
      }
      
      // Update daily quest progress for lesson completion (counts every time you pass)
      if (completed) {
        const examTrack = lesson.examTrack || 'fs';
        await storage.updateQuestProgress(userId, 'complete_lesson', 1, examTrack);
        
        // Update weak domain quest progress if lesson domain matches user's weak area
        // Quest tracks "questions practiced" - use total questions in the lesson
        const questionsPracticed = questions.length;
        if (lesson.domain && questionsPracticed > 0) {
          // Use lesson ID as "session" for idempotency within same lesson attempt
          const lessonSessionKey = `lesson:${lessonId}:attempt:${attempts}`;
          await storage.updateWeakDomainQuestProgress(userId, lesson.domain, questionsPracticed, examTrack, lessonSessionKey);
        }
      }

      // Log daily activity for streak tracking (any lesson attempt counts)
      await storage.logDailyActivity(userId, 'lesson');

      res.json({
        progress,
        results,
        passed: completed,
        score,
        totalPoints,
        percentage: Math.round((score / totalPoints) * 100),
      });
    } catch (error: any) {
      console.error("Error submitting lesson:", error);
      res.status(400).json({ error: error.message || "Failed to submit lesson" });
    }
  });

  // Feedback routes
  app.post("/api/feedback", async (req: any, res) => {
    try {
      const data = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(data);
      res.json(feedback);
    } catch (error) {
      console.error("Error saving feedback:", error);
      res.status(400).json({ error: "Invalid feedback data" });
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (req: any, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req: any, res) => {
    try {
      const data = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(data);
      res.json(testimonial);
    } catch (error) {
      console.error("Error saving testimonial:", error);
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  // Audit endpoint - check all lessons for data integrity
  app.get("/api/admin/audit/lessons", isAuthenticated, async (req: any, res) => {
    try {
      const allLessons = await storage.getAllLessons();
      const issues: any[] = [];
      
      for (const lesson of allLessons) {
        const lessonData = await storage.getLessonWithQuestions(lesson.id);
        if (!lessonData) continue;
        
        const { questions } = lessonData;
        if (questions.length === 0) continue;
        
        questions.forEach((q, idx) => {
          // Check for missing options in multiple choice
          if (q.questionType === 'multiple_choice') {
            if (!q.options || (Array.isArray(q.options) && q.options.length === 0)) {
              issues.push({
                lessonId: lesson.id,
                questionId: q.id,
                issue: "Multiple choice question has no options",
                questionIndex: idx,
              });
            }
          }
          
          // Check for missing correct answer
          if (!q.correctAnswer || q.correctAnswer === 'undefined') {
            issues.push({
              lessonId: lesson.id,
              questionId: q.id,
              issue: "Question has no/undefined correct answer",
              questionIndex: idx,
            });
          }
        });
      }
      
      res.json({
        totalLessons: allLessons.length,
        issuesFound: issues.length,
        issues: issues.slice(0, 50), // Return first 50 issues
      });
    } catch (error) {
      console.error("Error auditing lessons:", error);
      res.status(500).json({ error: "Failed to audit lessons" });
    }
  });

  // XP System routes
  app.get("/api/xp", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const xpData = await storage.getUserXp(userId);
      res.json(xpData);
    } catch (error) {
      console.error("Error fetching XP:", error);
      res.status(500).json({ error: "Failed to fetch XP" });
    }
  });

  app.post("/api/xp/award", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { amount, reason, activityKey } = req.body;
      
      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: "Invalid XP amount" });
      }
      
      if (!activityKey || typeof activityKey !== 'string') {
        return res.status(400).json({ error: "Activity key required for XP award" });
      }
      
      const result = await storage.awardXp(userId, amount, activityKey);
      res.json({ ...result, reason });
    } catch (error) {
      console.error("Error awarding XP:", error);
      res.status(500).json({ error: "Failed to award XP" });
    }
  });

  // --- Adaptive Difficulty Routes ---
  
  app.get("/api/difficulty/:domain", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { domain } = req.params;
      const difficulty = await storage.getRecommendedDifficulty(userId, domain);
      res.json({ domain, difficulty });
    } catch (error) {
      console.error("Error getting difficulty:", error);
      res.status(500).json({ error: "Failed to get difficulty setting" });
    }
  });

  app.get("/api/difficulty", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const settings = await storage.getAllUserDifficultySettings(userId);
      res.json(settings);
    } catch (error) {
      console.error("Error getting all difficulty settings:", error);
      res.status(500).json({ error: "Failed to get difficulty settings" });
    }
  });

  app.post("/api/difficulty/update", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { domain, isCorrect } = req.body;
      
      if (!domain || typeof isCorrect !== 'boolean') {
        return res.status(400).json({ error: "Domain and isCorrect required" });
      }
      
      const result = await storage.updateDifficultyAfterAnswer(userId, domain, isCorrect);
      res.json(result);
    } catch (error) {
      console.error("Error updating difficulty:", error);
      res.status(500).json({ error: "Failed to update difficulty" });
    }
  });

  // --- Weekly Leaderboard Routes ---

  app.get("/api/leaderboard/weekly", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getWeeklyLeaderboard(Math.min(limit, 50));
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.get("/api/leaderboard/my-rank", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const rank = await storage.getUserWeeklyRank(userId);
      res.json(rank || { rank: null, weeklyXp: 0 });
    } catch (error) {
      console.error("Error fetching user rank:", error);
      res.status(500).json({ error: "Failed to fetch rank" });
    }
  });

  // --- Forgetting Curve Routes ---

  app.get("/api/forgetting-curve", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = await storage.getForgettingCurveData(userId);
      res.json(data);
    } catch (error) {
      console.error("Error fetching forgetting curve:", error);
      res.status(500).json({ error: "Failed to fetch forgetting curve data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
