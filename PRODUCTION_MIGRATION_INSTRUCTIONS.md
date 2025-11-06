# Production Database Migration Instructions

## What This Does
Migrates all 50 detailed lesson questions (10 lessons total) from development to your production database.

## Lessons Included
**Domain 7 - Applied Math (7 lessons):**
1. Algebra and Equation Solving
2. Geometry: Areas and Volumes  
3. Calculus for Surveyors
4. Vectors and Components
5. Precision and Accuracy
6. Significant Figures
7. Error Propagation

**Domain 5 - Survey Computations (3 lessons):**
1. Traverse Computations: Lat/Dep
2. Traverse Closure and Adjustment
3. Coordinate Inverse Calculations

## How to Run (Simple 2-Step Process)

### Step 1: Open Replit Shell
Click on the Shell tab in your Replit workspace

### Step 2: Run the Migration Command
```bash
NODE_ENV=production tsx server/migrate-production-lessons.ts
```

## What You'll See
```
🚀 Starting production lesson migration...
Environment: production
🗑️  Deleting existing lesson questions...
🗑️  Deleting existing lessons...
✅ Cleanup complete
📚 Creating lesson: Algebra and Equation Solving
  ✅ Added 5 questions
📚 Creating lesson: Geometry: Areas and Volumes
  ✅ Added 5 questions
...
🎉 Production migration complete!
✅ Migrated 10 lessons
✅ Total questions: 50
✨ All done! Your production database is ready.
```

## After Migration
1. Your deployed app will now show all 10 lessons
2. Test on your iPad - you should see all lessons with detailed step-by-step solutions
3. Provide feedback on the format/content

## If Something Goes Wrong
The script deletes old data first, then inserts new data. If it fails midway:
1. Check the error message
2. Run the command again - it's safe to re-run
3. Contact me if you need help

## Next Steps After Testing
Once you've tested and provided feedback:
- I'll create the remaining 34 lessons (170 questions) directly in the seed file
- Future deployments will automatically include all lessons
