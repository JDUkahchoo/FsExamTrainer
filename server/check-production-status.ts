import { db } from "./db";
import { 
  lessons, 
  lessonQuestions, 
  lessonProgress, 
  weekProgress, 
  quizResults,
  practiceExamResults,
  quizSessions,
  practiceExams,
  dailyLogs,
  studyNotes,
  userPreferences
} from "@shared/schema";

// Simple script to check if production database has any user data
// Run with: NODE_ENV=production tsx server/check-production-status.ts

async function checkProductionStatus() {
  console.log("🔍 Checking production database status...\n");
  console.log(`Environment: ${process.env.NODE_ENV}\n`);
  
  try {
    const counts = {
      lessons: (await db.select().from(lessons)).length,
      lessonQuestions: (await db.select().from(lessonQuestions)).length,
      lessonProgress: (await db.select().from(lessonProgress)).length,
      weekProgress: (await db.select().from(weekProgress)).length,
      quizResults: (await db.select().from(quizResults)).length,
      practiceExamResults: (await db.select().from(practiceExamResults)).length,
      quizSessions: (await db.select().from(quizSessions)).length,
      practiceExams: (await db.select().from(practiceExams)).length,
      dailyLogs: (await db.select().from(dailyLogs)).length,
      studyNotes: (await db.select().from(studyNotes)).length,
      userPreferences: (await db.select().from(userPreferences)).length,
    };

    console.log("📊 Database Contents:");
    console.log("─".repeat(50));
    Object.entries(counts).forEach(([table, count]) => {
      const status = count === 0 ? "✅" : "⚠️ ";
      console.log(`${status} ${table.padEnd(20)} ${count}`);
    });
    console.log("─".repeat(50));

    const hasUserData = 
      counts.lessonProgress > 0 ||
      counts.weekProgress > 0 ||
      counts.quizResults > 0 ||
      counts.practiceExamResults > 0 ||
      counts.quizSessions > 0 ||
      counts.practiceExams > 0 ||
      counts.dailyLogs > 0 ||
      counts.studyNotes > 0 ||
      counts.userPreferences > 0;

    console.log("\n🎯 Analysis:");
    if (!hasUserData) {
      console.log("✅ SAFE TO MIGRATE: No user data found");
      console.log("   You can safely delete and recreate lessons");
    } else {
      console.log("⚠️  WARNING: User data exists!");
      console.log("   Deleting lessons would orphan user progress");
      console.log("   Need to use UPDATE strategy instead");
    }

    console.log(`\n📚 Lessons: ${counts.lessons}`);
    console.log(`❓ Questions: ${counts.lessonQuestions}`);

  } catch (error) {
    console.error("❌ Error checking database:", error);
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  checkProductionStatus()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { checkProductionStatus };
