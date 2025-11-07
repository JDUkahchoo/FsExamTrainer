# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to be the first step for users towards becoming a professional licensed surveyor (PLS), providing a comprehensive and engaging learning experience.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `server/storage.ts` or `design_guidelines.md` files.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, the Inter font for UI, and JetBrains Mono for code/formulas, all designed responsively with dark mode support.

**Key Features:**
-   **16-Week Study Plan with Flexible Study Modes:** Structured weekly schedules with a READ → FOCUS → APPLY → REINFORCE framework, interactive checklists, and progress tracking, including integrated Daily Study Logs. Now supports three study modes:
    -   **Standard Mode:** Distributes all 7 NCEES domains evenly across 16 weeks using suggested week assignments
    -   **Result-Driven Mode:** Prioritizes weak domains based on pretest scores, placing difficult areas earlier in the study plan
    -   **Custom Mode:** Allows users to manually create their own personalized study schedule
-   **Study Cycles System:** Multi-pass study framework allowing users to complete the 16-week plan multiple times, preserving historical data and tracking progress per cycle.
-   **Practice Quizzes:** Two modes (Mixed Exam and Domain Practice) with unique questions, instant feedback, detailed explanations, and performance analytics.
-   **Flashcard System:** Two decks with card flip animations, spaced repetition, and mastery tracking.
-   **Study Resources:** A library with formula sheets, memory techniques, and professional references.
-   **Practice Exam Simulator:** A full 110-question exam with a timer, using a separate pool of unique questions, domain-based score breakdown, and performance analytics.
-   **Study Notes:** Rich text note-taking with auto-save for each week.
-   **Daily Logging System:** Integrated into the Study Plan for tracking daily activities, contributing to weekly completion and study streaks.
-   **Progress Dashboard with Gamification:** Features a circular progress ring, study streak tracker, and an achievement badge system, with detailed history for quizzes, exams, domain mastery, and daily logs.
-   **Resume Functionality:** Allows users to save and resume interrupted quiz and exam sessions.
-   **Interactive Lessons System (Domain-Based):** Duolingo-style interactive lessons organized by NCEES domain (1-7) with multiple question types, difficulty levels (easy/medium/hard), and suggested week assignments. Features progress indicators, real-time timers, immediate feedback, and auto-grading. Currently includes 16 comprehensive lessons (80 questions) across domains 1, 5, and 7. **Domain 7 complete (12/12 lessons)!** Target: 58 total lessons covering all 7 NCEES domains.
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
-   **Domain-Based Lesson Architecture:** Lessons organized by NCEES domain number (1-7) rather than week, enabling flexible study mode distribution:
    -   Centralized domain mappings in `shared/domains.ts` prevent metadata drift
    -   Lessons have domainNumber (1-7), difficulty (easy/medium/hard), and optional suggestedWeek
    -   Client-side study plan logic (`client/src/lib/study-plan-logic.ts`) distributes lessons across weeks based on study mode
    -   Single API endpoint (`GET /api/lessons`) fetches all lessons; client organizes by week
    -   Study modes stored in user preferences; Result-Driven mode uses pretest domain scores for prioritization

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.
-   **OpenAI:** Planned integration for an AI Study Assistant.