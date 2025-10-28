// From blueprint:javascript_log_in_with_replit
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertWeekProgressSchema, insertQuizResultSchema, insertQuizSessionSchema, insertFlashcardMasterySchema, insertPracticeExamSchema, insertStudyNoteSchema, insertQuizDraftSchema, insertExamDraftSchema, insertDailyActivitySchema, insertAchievementSchema, insertCustomWeekSchema, insertPretestResultSchema, insertUserPreferencesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

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
      res.json(progress);
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(400).json({ error: "Invalid week progress data" });
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
      res.json(session);
    } catch (error) {
      console.error("Error saving quiz session:", error);
      res.status(400).json({ error: "Invalid quiz session data" });
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
      const data = insertPracticeExamSchema.parse({ ...req.body, userId });
      const exam = await storage.createPracticeExam(data);
      res.json(exam);
    } catch (error) {
      console.error("Error saving exam:", error);
      res.status(400).json({ error: "Invalid practice exam data" });
    }
  });

  // Study Notes routes
  app.get("/api/notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notes = await storage.getAllStudyNotes(userId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study notes" });
    }
  });

  app.get("/api/notes/:week", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const week = parseInt(req.params.week);
      const note = await storage.getStudyNote(userId, week);
      res.json(note || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study note" });
    }
  });

  app.post("/api/notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertStudyNoteSchema.parse({ ...req.body, userId });
      const note = await storage.upsertStudyNote(data);
      res.json(note);
    } catch (error) {
      console.error("Error saving note:", error);
      res.status(400).json({ error: "Invalid study note data" });
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

      // Study streak (simplified - based on consecutive unique dates)
      let currentStreak = totalStudyDays > 0 ? 1 : 0;
      let longestStreak = currentStreak;

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
      const data = insertPretestResultSchema.parse({ ...req.body, userId });
      const result = await storage.savePretestResult(data);
      
      // Update user preferences to mark pretest as completed
      await storage.upsertUserPreferences({ userId, hasCompletedPretest: true });
      
      res.json(result);
    } catch (error) {
      console.error("Error saving pretest result:", error);
      res.status(400).json({ error: "Invalid pretest result data" });
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

  app.put("/api/preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertUserPreferencesSchema.parse({ ...req.body, userId });
      const preferences = await storage.upsertUserPreferences(data);
      res.json(preferences);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(400).json({ error: "Invalid preferences data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
