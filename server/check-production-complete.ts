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
  dailyActivity,
  studyNotes,
  userPreferences,
  flashcardMastery,
  pretestResults,
  pretestQuestionResults,
  quizDrafts,
  examDrafts,
  achievements,
  customWeeks,
  studyCycles
} from "@shared/schema";

// Comprehensive check of ALL user data tables
// Run with: NODE_ENV=production tsx server/check-production-complete.ts

async function checkProductionComplete() {
  console.log("🔍 Comprehensive Production Database Check\n");
  console.log(`Environment: ${process.env.NODE_ENV}\n`);
  
  try {
    const counts = {
      // Content tables (what we're migrating)
      lessons: (await db.select().from(lessons)).length,
      lessonQuestions: (await db.select().from(lessonQuestions)).length,
      
      // ALL user data tables (must be empty to migrate safely)
      lessonProgress: (await db.select().from(lessonProgress)).length,
      weekProgress: (await db.select().from(weekProgress)).length,
      quizResults: (await db.select().from(quizResults)).length,
      practiceExamResults: (await db.select().from(practiceExamResults)).length,
      quizSessions: (await db.select().from(quizSessions)).length,
      practiceExams: (await db.select().from(practiceExams)).length,
      dailyLogs: (await db.select().from(dailyLogs)).length,
      dailyActivity: (await db.select().from(dailyActivity)).length,
      studyNotes: (await db.select().from(studyNotes)).length,
      userPreferences: (await db.select().from(userPreferences)).length,
      flashcardMastery: (await db.select().from(flashcardMastery)).length,
      pretestResults: (await db.select().from(pretestResults)).length,
      pretestQuestionResults: (await db.select().from(pretestQuestionResults)).length,
      quizDrafts: (await db.select().from(quizDrafts)).length,
      examDrafts: (await db.select().from(examDrafts)).length,
      achievements: (await db.select().from(achievements)).length,
      customWeeks: (await db.select().from(customWeeks)).length,
      studyCycles: (await db.select().from(studyCycles)).length,
    };

    console.log("📊 Content Tables:");
    console.log("─".repeat(50));
    console.log(`   lessons               ${counts.lessons}`);
    console.log(`   lessonQuestions       ${counts.lessonQuestions}`);
    
    console.log("\n📊 User Data Tables:");
    console.log("─".repeat(50));
    Object.entries(counts).forEach(([table, count]) => {
      if (table !== 'lessons' && table !== 'lessonQuestions') {
        const status = count === 0 ? "✅" : "⚠️ ";
        console.log(`${status} ${table.padEnd(25)} ${count}`);
      }
    });
    console.log("─".repeat(50));

    // Check if ANY user data exists
    const hasUserData = 
      counts.lessonProgress > 0 ||
      counts.weekProgress > 0 ||
      counts.quizResults > 0 ||
      counts.practiceExamResults > 0 ||
      counts.quizSessions > 0 ||
      counts.practiceExams > 0 ||
      counts.dailyLogs > 0 ||
      counts.dailyActivity > 0 ||
      counts.studyNotes > 0 ||
      counts.userPreferences > 0 ||
      counts.flashcardMastery > 0 ||
      counts.pretestResults > 0 ||
      counts.pretestQuestionResults > 0 ||
      counts.quizDrafts > 0 ||
      counts.examDrafts > 0 ||
      counts.achievements > 0 ||
      counts.customWeeks > 0 ||
      counts.studyCycles > 0;

    console.log("\n🎯 Safety Analysis:");
    if (!hasUserData) {
      console.log("✅ SAFE TO MIGRATE!");
      console.log("   ✓ No user data found in any table");
      console.log("   ✓ Safe to delete and recreate lessons");
      console.log("\n🚀 Next step: Run the migration script");
      console.log("   NODE_ENV=production tsx server/migrate-production-safe.ts");
    } else {
      console.log("⚠️  CANNOT MIGRATE SAFELY!");
      console.log("   ✗ User data exists in one or more tables");
      console.log("   ✗ Deleting lessons would orphan user progress");
      console.log("\n🛑 STOP: Contact developer for UPDATE strategy");
    }

  } catch (error) {
    console.error("\n❌ Error checking database:", error);
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  checkProductionComplete()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { checkProductionComplete };
