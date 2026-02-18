import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";
import { seedLessons } from "./seed-lessons";
import { seedPSLessons } from "./seed-ps-lessons";
import { count, eq } from "drizzle-orm";

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

async function autoSeedIfNeeded() {
  try {
    const lessonResult = await db.select({ count: count() }).from(lessons);
    const lessonCount = lessonResult[0]?.count || 0;
    
    const questionResult = await db.select({ count: count() }).from(lessonQuestions);
    const questionCount = questionResult[0]?.count || 0;
    
    const needsFSSeeding = lessonCount === 0 || questionCount < 1000;
    
    if (needsFSSeeding) {
      log(`Database needs FS seeding (lessons: ${lessonCount}, questions: ${questionCount}). Auto-seeding...`);
      await seedLessons();
      log(`FS seeding completed.`);
    }

    const psLessonResult = await db.select({ count: count() }).from(lessons).where(eq(lessons.examTrack, 'ps'));
    const psLessonCount = psLessonResult[0]?.count || 0;

    if (psLessonCount < 50) {
      log(`Database needs PS seeding (PS lessons: ${psLessonCount}). Auto-seeding PS lessons...`);
      await seedPSLessons();
      log(`PS seeding completed.`);
    }

    const finalLessonResult = await db.select({ count: count() }).from(lessons);
    const finalQuestionResult = await db.select({ count: count() }).from(lessonQuestions);
    log(`Database ready with ${finalLessonResult[0]?.count} lessons and ${finalQuestionResult[0]?.count} questions`);
  } catch (error) {
    console.error("Error checking/seeding lessons:", error);
  }
}

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
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
    
    // Run database seeding in background AFTER server starts listening
    // This ensures health checks pass immediately
    autoSeedIfNeeded();
  });
})();
