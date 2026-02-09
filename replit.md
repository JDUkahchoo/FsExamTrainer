# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to provide a comprehensive and engaging learning experience, guiding users toward becoming a professional licensed surveyor (PLS). The project also supports the Professional Surveying (PS) exam.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `design_guidelines.md` file. Getting Started & Study Strategy should be the first/primary tab for users entering the app.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, Inter font for UI, and JetBrains Mono for code/formulas, designed responsively with dark mode support.

**Key Features:**
-   **Study Plans:** 16-week structured plans with flexible modes (Standard, Result-Driven, Working Professional, Custom), progress tracking, and textbook chapter recommendations.
-   **Practice & Assessment:** Mixed Exam and Domain Practice Quizzes with instant feedback and 4-Step Problem-Solving Loop (Understand → Formula → Units → Sense-Check); Enhanced Flashcard System (Quick Review, Triad Drill, Feynman Mode, Mnemonic Builder); Full Practice Exam Simulator (110 questions) and NCEES-Style Practice Exam (60 questions, including AITs).
-   **Personalized Learning:** Custom Plan Builder; Study Cycles System for multi-pass learning; Adaptive Difficulty System based on user performance; Optimal Review Timing using SM-2 algorithm for spaced repetition.
-   **Engagement & Motivation:** Progress Dashboard with Gamification (XP System with 10 Surveyor Ranks, Study Streaks, Achievements); Daily Quests System; Weekly Leaderboard.
-   **AI-Powered Guidance:** AI Study Coach Briefing provides personalized daily guidance, focus recommendations, and progress insights.
-   **Study Tools:** Enhanced Study Notes with CRUD operations; Study Resources library; Interactive Lessons System (Duolingo-style, domain-based); Procedures & Standards reference with BLM Glossary and exam traps.
-   **Analytics & Insights:** Personal Analytics Dashboard with learning velocity, time investment ROI, weakness predictions, and progress trajectory; Forgetting Curve Visualization.
-   **Content & Coverage:** Expanded Question Pool (1,825 questions from 365 archetypes) with variation system; Complete NCEES coverage for all 7 FS domains and 5 PS domains; Dual textbook reference (SRM and Elementary Surveying). Interactive Study Readings (15 FS readings across all domains with ~150 sections of original content).
-   **Interactive Study Readings:** 15 readings covering all 7 FS domains with structured content blocks (concept, formula, worked_example, knowledge_check, further_reading). Integrated into Study Plan's READ section via week-to-reading mapping. Progress tracked per section with 5 XP per completed section (first completion only). Content files: `shared/data/studyReadings.ts` (D0-D1), `studyReadingsD2.ts`, `studyReadingsD3.ts`, `studyReadingsD4D6.ts`, `studyReadingsD5.ts`.
-   **Multi-Exam Support:** Supports both FS (73 lessons, 8 domains) and PS (55 lessons, 5 domains) exams with isolated experiences.

**Technical Implementation:**
-   **Frontend:** React with TypeScript, Tailwind CSS, Shadcn UI, Wouter, TanStack Query, and Lucide React.
-   **Backend:** Express.js server.
-   **Database:** PostgreSQL with Drizzle ORM.
-   **Authentication:** Replit Auth.
-   **Validation:** Zod.

**System Design:**
-   Separate question pools for quizzes and exams with stable IDs.
-   User-scoped data storage with protected API routes.
-   Study Cycles Architecture for tracking progress within cycles.
-   Server-side validation and security for interactive lessons.
-   Domain-Based Lesson Architecture for flexible study distribution.
-   Question Archetype System for deterministic question generation and variations using seeded RNG.
-   XP Idempotency System to prevent duplicate XP awards using activity keys.
-   Reading Checkpoint Completion Guard: Uses immutable `completedAt` timestamp to prevent XP farming via toggle off/on cycles. XP and quest progress only awarded on first-ever completion.
-   Weak Domain Quest Guard: Requires minimum 50% accuracy AND session-based idempotency to prevent farming via repeated low-effort quizzes.
-   Multi-Exam Architecture with isolated routes (`/app/:examTrack/*`) for FS and PS exams, allowing for distinct content and future monetization.
-   ExamTrackProvider Context for centralized exam track state and configuration.
-   Flashcard Session Resume System: Sessions persist user state (deck, domains, card index, study mode) and can be resumed from exact position. Review events logged individually for accurate statistics and streak tracking.
-   Retention Booster User Ownership: Client-side validation ensures reviews belong to current user before use. Cache control headers prevent CDN/browser caching of user-specific API responses. Auto-recovery creates fresh reviews when foreign data detected or 403 errors occur.
-   Timezone-Aware Quest System: Daily quests reset at the user's local midnight, not a rolling 24-hour window. User timezone is auto-detected from browser (`Intl.DateTimeFormat`) and stored in preferences. Server-side `getLocalMidnight(timezone)` helper calculates UTC boundaries for the user's local day. All quest generation, retrieval, and progress tracking use timezone-aware date comparisons.
-   4-Step Problem-Solving Loop: Integrated into practice quizzes as optional guidance (not a prerequisite). Expandable "Stuck? Try the 4-step breakdown" link appears above the Submit button. Steps: (1) What is the problem asking? (2) Which formula/concept applies? (3) Check units. (4) Does the answer make sense? Each step has guided prompts and optional notes. Component resets per question via React key. Component: `client/src/components/problem-solving-loop.tsx`.
-   Study Reading System: Interactive readings with structured content blocks. Progress tracked per section in `study_reading_progress` table. 5 XP per section (first completion only via activityKey `reading:{readingId}:{sectionId}`). Week-to-reading mapping in `WEEK_TO_READING_IDS` (read-checkpoint.tsx) links study plan READ section to interactive readings. Readings accessible from sidebar and from within study plan weeks.

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.