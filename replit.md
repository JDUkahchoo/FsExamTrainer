# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to be the first step for users towards becoming a professional licensed surveyor (PLS), providing a comprehensive and engaging learning experience.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `server/storage.ts` or `design_guidelines.md` files.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, the Inter font for UI, and JetBrains Mono for code/formulas, all designed responsively with dark mode support.

**Key Features:**
-   **16-Week Study Plan:** Structured weekly schedules with a READ → FOCUS → APPLY → REINFORCE framework, interactive checklists, and progress tracking. Each week now includes an integrated Daily Study Logs section where users can record daily activities (e.g., "Read chapter 1 of Elementary Surveying 15th edition"). Daily logs automatically count toward weekly completion percentage and streak tracking.
-   **Study Cycles System:** Multi-pass study framework allowing users to complete the 16-week plan multiple times. Each cycle tracks completion percentage, study time, quizzes, and exams taken during that cycle. Users can complete a cycle and start a new one, with all historical data preserved. Progress page displays current cycle number (Cycle 1, 2, 3...) and study phase (Learning or Maintenance).
-   **Practice Quizzes:** Two modes (Mixed Exam and Domain Practice) with 99 unique questions, instant feedback, detailed explanations, session tracking, and performance analytics.
-   **Flashcard System:** Two decks (50-card original and 350-card comprehensive) with card flip animations, spaced repetition, and mastery tracking.
-   **Study Resources:** A library with formula sheets, memory techniques, exam day playbook, study methods, solved problems, math for surveyors, and professional references.
-   **Practice Exam Simulator:** A full 110-question exam with a 6-hour timer, utilizing a separate pool of 155 unique questions, domain-based score breakdown, and performance analytics.
-   **Study Notes:** Rich text note-taking with auto-save for each week.
-   **Daily Logging System:** Integrated directly into each week's Study Plan section. Users can add daily study activities with optional time tracking and domain tagging. Daily logs automatically link to the current week, contribute to weekly completion percentage, and update the study streak.
-   **Progress Dashboard with Gamification:** Features a circular progress ring (weighted by weeks, quizzes, and flashcards), study streak tracker, and an achievement badge system with 10 professional types. Supports flexible custom weeks. Progress page includes separate tabs for Quiz History, Exam History, Domain Mastery, and Daily Logs (summary view). Now displays current study cycle and phase.
-   **Resume Functionality:** Allows users to save and resume interrupted quiz and exam sessions, restoring exact questions, answers, and timers.

**Technical Implementation:**
-   **Frontend:** React with TypeScript, Tailwind CSS, Shadcn UI component library, Wouter for routing, TanStack Query for data fetching, and Lucide React for icons.
-   **Backend:** Express.js server.
-   **Database:** PostgreSQL with Drizzle ORM.
-   **Authentication:** Replit Auth for user authentication.
-   **Validation:** Zod for data validation.

**System Design:**
-   Separate question pools for quizzes (99 questions) and exams (155 questions) to prevent overlap.
-   Dual flashcard ID system for distinct original and comprehensive decks.
-   User-scoped data storage with foreign keys for personalized progress.
-   Cloud sync readiness with protected API routes.
-   Tabbed interface for organized progress tracking (Quiz History, Exam History, Domain Mastery, Daily Logs).
-   Stable question IDs are used to preserve question order during session resume.
-   Daily logs integrated into Study Plan: Each week has a collapsible "Daily Study Logs" section that shows logs for that specific week. Adding a log automatically assigns it to the correct week and counts toward both weekly completion and daily streak tracking.
-   Weekly progress calculation now includes both checklist items AND daily log count, so logging daily activities increases weekly completion percentage.
-   **Study Cycles Architecture:** Database tracks each cycle with unique (userId, cycleNumber) constraint. Cycle completion calculates stats only from data within that cycle's timeframe (quizzes, exams, daily logs filtered by cycle startedAt timestamp). Starting a new cycle resets weekly checkboxes but preserves all quiz/exam/log history. User preferences track current cycle number and optional exam date.

## Recent Changes

### Session 4: Pretest Retake Bug Fix (November 6, 2025)
-   **Bug Fix - Pretest Retake:** Fixed issue where users couldn't retake the diagnostic pretest. Added state reset logic in pretest.tsx to clear all answers, timer, and question index when component mounts, ensuring each attempt starts fresh.
-   **Enhancement - Error Handling:** Added toast notifications for pretest submission failures with detailed error messages, plus error states on results page for better user feedback.
-   **Architecture Validation:** Architect confirmed that the database schema (no unique constraints on pretest_results) correctly supports multiple attempts per user with timestamp-based historical tracking, which is essential for the upcoming interactive lesson system.
-   **Testing:** End-to-end test verified complete flow: take pretest → view results → retake → submit → verify updated results display. Test showed different scores (43% vs 39%) on successive attempts, confirming proper retake functionality.
-   **Future Compatibility:** Architecture supports planned Duolingo-style interactive learning with:
    - Multiple pretest attempts tracked historically
    - Personalized study plan generation based on weakest domains
    - Future API enhancements for attempt history and domain trend analysis

### Session 1: Core Bug Fixes (November 3, 2025)
-   **Bug Fix - Exam Date Handling:** Fixed exam date update failures by adding preprocessing to the Zod schema to handle ISO date strings from HTML date inputs. The schema now converts string dates to Date objects and properly handles null values for clearing dates using `z.preprocess` with `z.date().nullable().optional()`.
-   **Bug Fix - Resources Mobile Layout:** Fixed tab overflow on mobile devices by implementing responsive grid breakpoints (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7`) with flex-col/flex-row tab layouts. Tabs now display in 2 columns on mobile, 3 on small screens, 4 on medium, and 7 on large screens.
-   **Bug Fix - Flashcard Reset Button:** Fixed non-functional reset button by removing unnecessary empty object parameter from DELETE request and adding proper error handling with try-catch.

### Session 2: Critical Functionality Fixes
-   **Bug Fix - Day Streak Tracking:** Fixed streak counter not updating by connecting `dailyLogs` and `dailyActivity` tables. The `createDailyLog` method now automatically creates a `dailyActivity` record for streak calculation.
-   **Bug Fix - Date/Time Recording:** Fixed timezone issues where selected dates appeared offset by a day. Daily log form now creates dates in local timezone by appending 'T12:00:00' instead of relying on UTC midnight conversion.
-   **Bug Fix - Streak API Consistency:** Fixed inconsistent streak values between `/api/progress/stats` and `/api/progress/overall` by updating both endpoints to use the proper `calculateStreak` method from storage instead of simplified hardcoded logic.
-   **Pre-test Results:** Verified pre-test results display correctly after completion. The routing and API endpoints are functioning as expected.

### Testing
-   Comprehensive end-to-end tests verified exam date handling, flashcard reset, daily log creation with correct dates, streak tracking, and API consistency across all endpoints.

### Session 3: Detailed Results Tracking System
-   **Feature - Individual Question Tracking:** Implemented comprehensive question-level tracking for pretests and practice exams. Database now stores individual question results including question text, selected/correct answers, domain, and explanations.
-   **Security Enhancement - Authorization & Validation:** Added multi-layer security for detailed results:
    - Created client-side Zod validation schemas (`clientPracticeExamQuestionResultSchema`, `clientPretestQuestionResultSchema`) that exclude sensitive fields (userId, examId, pretestId)
    - Server-side validation through Zod parse before database insertion
    - userId derived exclusively from authenticated session (`req.user.claims.sub`), never from client payloads
    - GET detail endpoints verify ownership and return 403 for unauthorized access attempts
-   **Bug Fix - Unanswered Questions:** Fixed NOT NULL constraint violations by using -1 as sentinel value for unanswered questions in both pretest and exam submissions.
-   **Database Tables Added:**
    - `practice_exam_results`: Links to `practice_exams` table, stores individual question results with foreign key cascading
    - `pretest_question_results`: Links to `pretest_results` table, stores individual question results with foreign key cascading
-   **API Endpoints Added:**
    - GET `/api/quiz/sessions/:id` - Retrieve detailed quiz session with all question results
    - GET `/api/exams/:id` - Retrieve detailed practice exam with all question results
    - GET `/api/pretest/:id` - Retrieve detailed pretest with all question results
-   **Architecture Notes:**
    - Question results stored with full context (question text, explanations) for historical accuracy
    - Sentinel value -1 used for unanswered questions to maintain NOT NULL constraints
    - Server-side validation prevents data injection and cross-user data leakage
    - Foundation ready for detailed results pages and improvement tracking features

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.
-   **OpenAI:** Planned integration for an AI Study Assistant.