import { db } from "./db";
import { lessonQuestions } from "@shared/schema";
import { sql } from "drizzle-orm";

/**
 * Migration script to backfill variationGroup and variationNumber
 * for all existing lesson questions.
 * 
 * This ensures existing questions work with the new randomization system.
 */
async function migrateQuestionVariations() {
  console.log("Starting question variation migration...");

  try {
    // Update all existing questions where variationGroup = 1 (default)
    // Set variationGroup = orderIndex and variationNumber = 1
    const result = await db.execute(sql`
      UPDATE lesson_questions
      SET 
        variation_group = order_index,
        variation_number = 1
      WHERE variation_group = 1 AND variation_number = 1
    `);

    console.log("Migration completed successfully!");
    console.log(`Updated ${result.rowCount || 0} question records`);
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateQuestionVariations()
    .then(() => {
      console.log("Migration completed. Database is ready for question randomization.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}

export { migrateQuestionVariations };
