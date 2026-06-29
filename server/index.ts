import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";
import { seedLessons } from "./seed-lessons";
import { seedPSLessons } from "./seed-ps-lessons";
import { count, eq } from "drizzle-orm";
import { backfillInteractiveReadingIds, cleanupOrphanedReadingProgress } from "./migrate-reading-ids";
import { migrateReadingProgressUnique, migrateReadingProgressChapterUnique } from "./migrate-reading-progress-unique";
import { runOnce } from "./migration-log";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

let seedingInProgress = false;

async function autoSeedIfNeeded() {
  // Guard against overlapping seed runs (e.g. rapid restarts) that could race
  // the delete-then-insert seeders against each other.
  if (seedingInProgress) return;
  seedingInProgress = true;
  try {
    const lessonResult = await db.select({ count: count() }).from(lessons);
    const lessonCount = lessonResult[0]?.count || 0;
    
    const questionResult = await db.select({ count: count() }).from(lessonQuestions);
    const questionCount = questionResult[0]?.count || 0;
    
    // Only seed when the data is truly absent. seedLessons() wipes ALL lessons
    // (FS + PS) before re-inserting, so it must not run when lessons already exist.
    const needsFSSeeding = lessonCount === 0 || questionCount === 0;
    
    if (needsFSSeeding) {
      log(`Database empty (lessons: ${lessonCount}, questions: ${questionCount}). Auto-seeding FS...`);
      await seedLessons();
      log(`FS seeding completed.`);
    }

    const psLessonResult = await db.select({ count: count() }).from(lessons).where(eq(lessons.examTrack, 'ps'));
    const psLessonCount = psLessonResult[0]?.count || 0;

    if (psLessonCount === 0) {
      log(`No PS lessons found. Auto-seeding PS lessons...`);
      await seedPSLessons();
      log(`PS seeding completed.`);
    }

    const finalLessonResult = await db.select({ count: count() }).from(lessons);
    const finalQuestionResult = await db.select({ count: count() }).from(lessonQuestions);
    log(`Database ready with ${finalLessonResult[0]?.count} lessons and ${finalQuestionResult[0]?.count} questions`);
  } catch (error) {
    console.error("Error checking/seeding lessons:", error);
  } finally {
    seedingInProgress = false;
  }
}

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const isProduction = app.get("env") === "production";
    // Never leak internal error details for server errors in production.
    const message =
      status >= 500 && isProduction
        ? "Internal Server Error"
        : err.message || "Internal Server Error";

    // Log server errors here; do NOT re-throw after responding (that would crash
    // the process and can attempt to send the response twice).
    if (status >= 500) {
      console.error("Unhandled request error:", err);
    }

    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    
    // Run database seeding and migrations in background AFTER server starts listening
    // This ensures health checks pass immediately
    autoSeedIfNeeded();
    // Run reading migrations sequentially: backfill legacy rows first so that
    // the unique-index migration sees clean, already-merged data.
    // Each is wrapped in runOnce() so it only executes once per database.
    runOnce("backfill_interactive_reading_ids", backfillInteractiveReadingIds)
      .then(() => runOnce("cleanup_orphaned_reading_progress", cleanupOrphanedReadingProgress))
      .then(() => runOnce("reading_progress_unique_index", migrateReadingProgressUnique))
      .then(() => runOnce("reading_progress_chapter_unique_index", migrateReadingProgressChapterUnique))
      .catch(err => console.error("Reading progress migration failed:", err));
  });
})();
