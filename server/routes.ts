import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWeekProgressSchema, insertQuizResultSchema, insertFlashcardMasterySchema, insertPracticeExamSchema, insertStudyNoteSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Week Progress routes
  app.get("/api/progress/weeks", async (_req, res) => {
    try {
      const progress = await storage.getAllWeekProgress();
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch week progress" });
    }
  });

  app.get("/api/progress/weeks/:week", async (req, res) => {
    try {
      const week = parseInt(req.params.week);
      const progress = await storage.getWeekProgress(week);
      res.json(progress || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch week progress" });
    }
  });

  app.post("/api/progress/weeks", async (req, res) => {
    try {
      const data = insertWeekProgressSchema.parse(req.body);
      const progress = await storage.upsertWeekProgress(data);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid week progress data" });
    }
  });

  // Quiz Results routes
  app.get("/api/quiz/results", async (_req, res) => {
    try {
      const results = await storage.getQuizResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  });

  app.get("/api/quiz/results/domain/:domain", async (req, res) => {
    try {
      const domain = decodeURIComponent(req.params.domain);
      const results = await storage.getQuizResultsByDomain(domain);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results by domain" });
    }
  });

  app.post("/api/quiz/results", async (req, res) => {
    try {
      const data = insertQuizResultSchema.parse(req.body);
      const result = await storage.createQuizResult(data);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid quiz result data" });
    }
  });

  app.delete("/api/quiz/results", async (_req, res) => {
    try {
      await storage.deleteAllQuizResults();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete quiz results" });
    }
  });

  // Quiz Statistics route
  app.get("/api/quiz/stats", async (_req, res) => {
    try {
      const results = await storage.getQuizResults();
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

  // Flashcard Mastery routes
  app.get("/api/flashcards/mastery", async (_req, res) => {
    try {
      const mastery = await storage.getAllFlashcardMastery();
      res.json(mastery);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flashcard mastery" });
    }
  });

  app.get("/api/flashcards/mastery/:flashcardId", async (req, res) => {
    try {
      const mastery = await storage.getFlashcardMastery(req.params.flashcardId);
      res.json(mastery || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flashcard mastery" });
    }
  });

  app.post("/api/flashcards/mastery", async (req, res) => {
    try {
      const data = insertFlashcardMasterySchema.parse(req.body);
      const mastery = await storage.upsertFlashcardMastery(data);
      res.json(mastery);
    } catch (error) {
      res.status(400).json({ error: "Invalid flashcard mastery data" });
    }
  });

  app.delete("/api/flashcards/mastery", async (_req, res) => {
    try {
      await storage.deleteAllFlashcardMastery();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete flashcard mastery" });
    }
  });

  // Flashcard Statistics route
  app.get("/api/flashcards/stats", async (_req, res) => {
    try {
      const mastery = await storage.getAllFlashcardMastery();
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
  app.get("/api/exams", async (_req, res) => {
    try {
      const exams = await storage.getPracticeExams();
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch practice exams" });
    }
  });

  app.get("/api/exams/latest", async (_req, res) => {
    try {
      const exam = await storage.getLatestPracticeExam();
      res.json(exam || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest exam" });
    }
  });

  app.post("/api/exams", async (req, res) => {
    try {
      const data = insertPracticeExamSchema.parse(req.body);
      const exam = await storage.createPracticeExam(data);
      res.json(exam);
    } catch (error) {
      res.status(400).json({ error: "Invalid practice exam data" });
    }
  });

  // Study Notes routes
  app.get("/api/notes", async (_req, res) => {
    try {
      const notes = await storage.getAllStudyNotes();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study notes" });
    }
  });

  app.get("/api/notes/:week", async (req, res) => {
    try {
      const week = parseInt(req.params.week);
      const note = await storage.getStudyNote(week);
      res.json(note || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study note" });
    }
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const data = insertStudyNoteSchema.parse(req.body);
      const note = await storage.upsertStudyNote(data);
      res.json(note);
    } catch (error) {
      res.status(400).json({ error: "Invalid study note data" });
    }
  });

  // Overall Progress/Statistics route
  app.get("/api/progress/stats", async (_req, res) => {
    try {
      const weekProgress = await storage.getAllWeekProgress();
      const quizResults = await storage.getQuizResults();
      const flashcardMastery = await storage.getAllFlashcardMastery();
      const practiceExams = await storage.getPracticeExams();
      const studyNotes = await storage.getAllStudyNotes();

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
      res.status(500).json({ error: "Failed to fetch progress statistics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
