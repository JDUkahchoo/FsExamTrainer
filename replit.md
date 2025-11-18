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

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.
-   **OpenAI:** Planned integration for an AI Study Assistant.