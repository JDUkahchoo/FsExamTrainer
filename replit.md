# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to be the first step for users towards becoming a professional licensed surveyor (PLS), providing a comprehensive and engaging learning experience.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `design_guidelines.md` file.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, the Inter font for UI, and JetBrains Mono for code/formulas, all designed responsively with dark mode support.

**Key Features:**
-   **16-Week Study Plan with Flexible Study Modes:** Structured weekly schedules with a READ → FOCUS → APPLY → REINFORCE framework, interactive checklists, and progress tracking, including integrated Daily Study Logs. Now supports three study modes:
    -   **Standard Mode:** Distributes all 7 NCEES domains evenly across 16 weeks using suggested week assignments
    -   **Result-Driven Mode:** Prioritizes weak domains based on pretest scores, placing difficult areas earlier in the study plan
    -   **Custom Mode:** Allows users to manually create their own personalized study schedule with the Custom Plan Builder tool
-   **Custom Plan Builder (Nov 2025):** Interactive UI for creating personalized study plans without requiring pretest completion. Features:
    -   Domain selection with visual checkboxes for all 7 NCEES domains
    -   Priority ordering with drag-and-drop functionality to arrange domains by importance
    -   Timeline slider (8-16 weeks) to customize study duration
    -   Real-time validation preventing empty plans
    -   Automatic lesson distribution based on selected priorities and timeline
    -   State synchronization that preserves user edits and loads saved preferences correctly
-   **Study Cycles System:** Multi-pass study framework allowing users to complete the 16-week plan multiple times, preserving historical data and tracking progress per cycle.
-   **Practice Quizzes:** Two modes (Mixed Exam and Domain Practice) with unique questions, instant feedback, detailed explanations, and performance analytics.
-   **Flashcard System:** Two decks with card flip animations, spaced repetition, and mastery tracking.
-   **Study Resources:** A library with formula sheets, memory techniques, and professional references.
-   **Practice Exam Simulator:** A full 110-question exam with a timer, using a separate pool of unique questions, domain-based score breakdown, and performance analytics.
-   **Study Notes:** Rich text note-taking with auto-save for each week.
-   **Daily Logging System:** Integrated into the Study Plan for tracking daily activities, contributing to weekly completion and study streaks.
-   **Progress Dashboard with Gamification:** Features a circular progress ring, study streak tracker, and an achievement badge system, with detailed history for quizzes, exams, domain mastery, and daily logs.
-   **Resume Functionality:** Allows users to save and resume interrupted quiz and exam sessions.
-   **Interactive Lessons System (Domain-Based):** Duolingo-style interactive lessons organized by domain (0-7) with multiple question types, difficulty levels (easy/medium/hard), and suggested week assignments. Features progress indicators, real-time timers, immediate feedback, and auto-grading. **ALL 68 LESSONS COMPLETE (417 questions)!** **Domain 0 (Math & Science Foundations) complete (10/10 lessons)! Domain 1 (Surveying Processes and Methods) complete (7/7 lessons)! Domain 2 (Mapping Processes and Methods) complete (7/7 lessons)! Domain 3 (Boundary Law and Real Property Principles) complete (7/7 lessons)! Domain 4 (Surveying Principles) complete (7/7 lessons)! Domain 5 (Survey Computations and Computer Applications) complete (12/12 lessons)! Domain 6 (Business Concepts) complete (6/6 lessons)! Domain 7 (Applied Mathematics and Statistics) complete (12/12 lessons)!** 🎉 **PROJECT MILESTONE: 68/68 total lessons across all 8 NCEES domains (0-7) complete!**
-   **Individual Question Tracking:** Comprehensive question-level tracking for pretests and practice exams, storing question text, selected/correct answers, domain, and explanations.

**Technical Implementation:**
-   **Frontend:** React with TypeScript, Tailwind CSS, Shadcn UI, Wouter, TanStack Query, and Lucide React.
-   **Backend:** Express.js server.
-   **Database:** PostgreSQL with Drizzle ORM.
-   **Authentication:** Replit Auth.
-   **Validation:** Zod for data validation.

**System Design:**
-   Separate question pools for quizzes and exams.
-   Dual flashcard ID system for distinct decks.
-   User-scoped data storage with foreign keys.
-   Cloud sync readiness with protected API routes.
-   Tabbed interface for organized progress tracking.
-   Stable question IDs for session resume.
-   Daily logs integrated into Study Plan for weekly progress calculation.
-   Study Cycles Architecture: Database tracks each cycle with unique (userId, cycleNumber) constraint; cycle completion calculates stats from data within that cycle's timeframe.
-   Server-side validation and security measures for interactive lessons and detailed results, preventing answer leakage and ensuring data integrity.
-   **Lesson Progress Persistence Fix (Nov 2025):** Modified `storage.upsertLessonProgress()` to explicitly update all critical fields (completed, score, totalPoints, attempts, timeSpentSeconds, lastAttemptAt, completedAt) in the UPDATE clause, ensuring lesson completion status and scores are correctly persisted to the database.
-   **Domain-Based Lesson Architecture:** Lessons organized by NCEES domain number (0-7) rather than week, enabling flexible study mode distribution:
    -   Centralized domain mappings in `shared/domains.ts` prevent metadata drift (8 total domains: Domain 0 for Math Foundations + 7 NCEES exam domains)
    -   Lessons have domainNumber (0-7), difficulty (easy/medium/hard), and optional suggestedWeek
    -   Client-side study plan logic (`client/src/lib/study-plan-logic.ts`) distributes lessons across weeks based on study mode
    -   Single API endpoint (`GET /api/lessons`) fetches all lessons; client organizes by week
    -   Study modes stored in user preferences; Result-Driven mode uses pretest domain scores for prioritization; Custom mode uses manually selected domain priorities
    -   **Stable Lesson IDs:** Deterministic ID format `d{domain}-lesson-{orderIndex:02}` (e.g., "d1-lesson-01") eliminates 404 errors from lesson reloads and enables reliable progress tracking
-   **Custom Plan Builder Implementation (Nov 2025):** 
    -   Database: Added `customDomainPriorities` (array of domain indices) and `customTimeline` (weeks) to userPreferences table
    -   Logic: `getCustomPriorityModeWeeklyLessons()` function distributes lessons based on user-selected priority domains
    -   UI: Modal component with domain selection, priority reordering, and timeline slider
    -   State Management: useEffect syncs preferences when dialog opens; useMemo stabilizes prop references to prevent unwanted re-renders
    -   Backend: POST `/api/preferences/custom-plan` endpoint saves custom priorities and timeline

## Future Enhancements
-   **Lesson Randomization:** When the question pool grows large enough (3-5 variations per lesson topic), randomize which questions appear during each lesson attempt. This prevents memorization and enables users to retake lessons across multiple study cycles with fresh content.
-   **Practical Word Problems:** Expand lesson content to include a mix of question types:
    -   **Applied Calculation Problems:** Scenario-based word problems with numerical answers (e.g., "A surveyor needs to establish a property corner 450 feet from Point A at a bearing of N 45° 30' E. The ground slopes at 8%. What is the horizontal distance?")
    -   **Conceptual/Judgment Questions:** Professional decision-making questions testing surveying knowledge and legal understanding without calculations (e.g., "During a boundary survey, you discover a fence line that doesn't match the deed description. What should you do first?")

## Planned Upgrades (End of Month)
Comprehensive upgrades planned to transform the study guide from "85-90% NCEES coverage" to "95-100% coverage" with market-leading features that exceed NLC Prep ($149/month) at $24.99/month pricing.

### 1. Fill Content Gaps (Main Priority)
Add **15-18 new lessons** to reach 95-100% NCEES exam coverage:
-   **Professional Practice & Ethics** (5-6 lessons, ~40 questions)
    -   Professional liability scenarios, ethics case studies, project management, communication standards
-   **Advanced Boundary Law** (4-5 lessons, ~30 questions)
    -   Legal precedents, PLSS corner restoration, conflicting deeds, case law analysis
-   **GIS/CAD Applications** (3-4 lessons, ~20 questions)
    -   Spatial analysis workflows, coordinate transformations, CAD standards compliance
-   **Field Documentation** (2-3 lessons, ~15 questions)
    -   Field book standards, documentation requirements, QC procedures, chain of custody
-   **Expected Result:** 83-86 total lessons, ~517 questions, 95-100% NCEES exam coverage

### 2. Getting Started Onboarding Flow
9-page wizard for new users to optimize their study plan from day one:
1.  **Welcome Screen** - Introduction to the study guide and core features
2.  **Pretest Prompt** - Encourage baseline assessment to identify weak areas
3.  **Results with Study Mode Recommendation** - Analyze pretest results and suggest Standard/Result-Driven/Custom mode
4.  **Exam Date Picker** - Calendar widget to set target exam date
5.  **Study Schedule Selector** - Choose from 4 intensity presets (including Working Professional)
6.  **Daily Routine Display** - Visualize typical weekday/weekend study sessions
7.  **Weekly/Monthly Milestones** - Set checkpoints for practice exams and domain reviews
8.  **Study Tips** - Best practices for retention, time management, and exam strategies
9.  **Personalized Plan Confirmation** - Summary page with "Start Studying" CTA

### 3. Working Professional Schedule (Recommended Default)
Add as the **recommended default study preset** for users balancing full-time work and exam prep:
-   **Monday-Friday:** 1 hour/day after work (focused lessons and flashcards)
-   **Weekends:** 2-3 hours (deep practice with quizzes and exams)
-   **Total:** 9-11 hrs/week over 16 weeks
-   **Perfect For:** Full-time workers who need structured yet flexible study routines
-   **Includes:** Morning review prompts, evening study reminders, weekend deep-dive sessions

### 4. Study Strategy Page
Comprehensive "How to Use This Guide" resource with actionable study methods:
-   **Daily/Weekly/Monthly Routines**
    -   Detailed schedules for different time commitments (light, moderate, intense)
    -   Morning review strategies, evening study sessions, weekend deep dives
-   **DO's and DON'Ts for Maximum Retention**
    -   Evidence-based techniques: spaced repetition, active recall, interleaved practice
    -   Common pitfalls to avoid: cramming, passive reading, skipping weak domains
-   **Help for Struggling Students**
    -   Diagnostic tools to identify learning gaps
    -   Study method adjustments for different learning styles
    -   When to seek additional resources (tutoring, study groups)
-   **Pre-Exam Prep Checklist**
    -   Final 2-week countdown plan
    -   Logistics preparation (exam site, calculator, required materials)
    -   Mental preparation and test-day strategies

### 5. Enhanced Progress Tracking
**Domain Mastery Over Time** - Data-driven analytics for continuous improvement:
-   **Line Charts** showing score progression per domain over time
-   **Trend Analysis:** Pretest → Month 1 → Month 2 → Month 3 tracking
    -   Visualize improvement curves for each of the 8 NCEES domains
    -   Identify plateau periods where extra focus is needed
-   **Improvement Alerts:** Smart notifications like "Domain 4 stagnant - focus here!"
    -   Automated suggestions when scores haven't improved in 2+ weeks
    -   Recommended actions: retake lessons, review flashcards, take domain-specific quiz
-   **Mastery Badges:** Unlock visual rewards at 85%+ consistency
    -   Gold badges for domains with sustained high performance
    -   Progress rings showing path to mastery (70% → 75% → 80% → 85%+)

### 6. Monthly Checkpoint System
Structured monthly assessments to ensure steady progress toward exam readiness:
-   **Practice Exam Reminders**
    -   Automated prompts to take full 110-question exams at monthly intervals
    -   Track completion rates and identify missed checkpoints
-   **Automated Score Comparisons**
    -   Compare current month performance vs. previous months
    -   Generate improvement reports: "Month 2: 68% → Month 3: 73% (+5%)"
    -   Highlight domains with significant gains or declines
-   **Target Goal:** 5-10% improvement each month
    -   Clear benchmarks: Month 1 baseline → Month 2 target → Month 3 target → Exam-ready (75%+)
    -   Visual progress bars showing distance to passing score

### Impact Summary
**Before Upgrades:**
-   68 lessons, 85-90% NCEES coverage
-   Basic progress tracking with static metrics
-   Good for individual learners, not university-ready

**After Upgrades:**
-   83-86 lessons, 95-100% NCEES coverage ✅
-   Complete onboarding experience for new users ✅
-   Perfect study schedule for working professionals ✅
-   Advanced progress tracking with trend analysis and alerts ✅
-   Better value than NLC Prep ($149/month) at $24.99/month ✅
-   University-ready with proven pass rates and comprehensive coverage ✅

**Bottom Line:** These upgrades transform the study guide from "pretty good exam prep" to "market-leading FS exam preparation that crushes the competition."

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.
-   **OpenAI:** Planned integration for an AI Study Assistant.