# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) and Professional Surveying (PS) exams. It provides structured study plans, practice quizzes, flashcards, and full-length practice exams to help users prepare for the NCEES FS and PS exams. The application aims to offer a comprehensive and engaging learning experience, guiding users toward becoming a professional licensed surveyor (PLS).

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `design_guidelines.md` file. Getting Started & Study Strategy should be the first/primary tab for users entering the app.

## System Architecture
The application features a responsive UI/UX with domain-specific color coding and dark mode support, utilizing Inter font for UI and JetBrains Mono for code/formulas.

**Key Features:**
-   **Study Plans:** Adaptive plans (16-week for FS, 12-week for PS) with progress tracking, flexible modes, and textbook recommendations. An Adaptive Plan Generator dynamically adjusts to the user's exam date and pretest scores, cycling through distinct study phases. Includes a Week Memory Health System based on the Ebbinghaus forgetting curve, tracking study week freshness and prompting reviews via mini-quizzes.
-   **Practice & Assessment:** Offers Mixed Exam and Domain Practice Quizzes with instant feedback, an Enhanced Flashcard System (including Challenge Mode and Triad Drill), Full Practice Exam Simulators (supporting multiple full-length exams), and a Weak-Area Drill Mode for targeted practice. Features a 4-Step Problem-Solving Loop for guided practice.
-   **Personalized Learning:** Custom Plan Builder, Study Cycles System, Adaptive Difficulty based on performance, and Optimal Review Timing using the SM-2 algorithm for spaced repetition.
-   **Engagement & Motivation:** Progress Dashboard with Gamification (XP system, ranks, streaks, achievements), Daily Quests, and a Weekly Leaderboard.
-   **AI-Powered Guidance:** An AI Study Coach provides personalized daily guidance and progress insights.
-   **Study Tools:** Enhanced Study Notes, Study Resources library, Interactive Lessons System (Duolingo-style), Procedures & Standards reference (including BLM Glossary), and a Formula Quick-Reference page.
-   **Analytics & Insights:** Personal Analytics Dashboard with learning velocity, time investment ROI, weakness predictions, and a Forgetting Curve Visualization.
-   **Content & Coverage:** An Expanded Question Pool (over 800 quiz questions, 330 exam questions) with a variation system, comprehensive NCEES coverage for all FS and PS domains, and dual textbook referencing. Includes extensive interactive study readings (over 60 readings) and expanded flashcard decks. Covers complex computational problems for surveying topics like photogrammetry, curves, COGO, and leveling, as well as PS-specific topics.
-   **Multi-Exam Support:** Supports both FS and PS exams with isolated content and experiences.

**Technical Implementation:**
-   **Frontend:** React with TypeScript, Tailwind CSS, Shadcn UI, Wouter, TanStack Query, and Lucide React.
-   **Backend:** Express.js server.
-   **Database:** PostgreSQL with Drizzle ORM.
-   **Authentication:** Replit Auth.
-   **Validation:** Zod.

**System Design:**
-   Separate question pools for quizzes and exams with stable IDs.
-   User-scoped data storage with protected API routes.
-   Study Cycles Architecture for multi-pass learning.
-   Server-side validation and security for interactive lessons.
-   Domain-Based Lesson Architecture for flexible study distribution.
-   Question Archetype System for deterministic question generation and variations.
-   XP Idempotency System to prevent duplicate awards.
-   Reading Checkpoint Completion Guard and Weak Domain Quest Guard to prevent XP farming.
-   Multi-Exam Architecture with isolated routes (`/app/:examTrack/*`) for distinct FS and PS experiences, including content and progress tracking.
-   ExamTrackProvider Context for centralized exam track state.
-   Flashcard Session Resume System for persistent study sessions.
-   Flashcard Challenge Mode for term-matching, tracking accuracy and proficiency.
-   PS Exam Track Content Scoping to ensure relevant content is displayed.
-   Exam Track Data Isolation for all progress data (`weekProgress`, `quizSessions`, etc.) via an `examTrack` column.
-   Retention Booster User Ownership for data security.
-   Timezone-Aware Quest System for accurate daily quest resets based on user's local time.
-   Comprehensive Domain Mastery calculation aggregating 8 data sources per domain.
-   Daily Discipline Quest Auto-Progression mapping study activities to quest progress.
-   Study Reading System tracking progress per section with XP awards.

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.