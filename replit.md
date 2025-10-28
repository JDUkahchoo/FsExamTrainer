# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to be the first step for users towards becoming a professional licensed surveyor (PLS), providing a comprehensive and engaging learning experience.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `server/storage.ts` or `design_guidelines.md` files.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, the Inter font for UI, and JetBrains Mono for code/formulas, all designed responsively with dark mode support.

**Key Features:**
-   **16-Week Study Plan:** Structured weekly schedules with a READ → FOCUS → APPLY → REINFORCE framework, interactive checklists, and progress tracking. Each week now includes an integrated Daily Study Logs section where users can record daily activities (e.g., "Read chapter 1 of Elementary Surveying 15th edition"). Daily logs automatically count toward weekly completion percentage and streak tracking.
-   **Practice Quizzes:** Two modes (Mixed Exam and Domain Practice) with 99 unique questions, instant feedback, detailed explanations, session tracking, and performance analytics.
-   **Flashcard System:** Two decks (50-card original and 350-card comprehensive) with card flip animations, spaced repetition, and mastery tracking.
-   **Study Resources:** A library with formula sheets, memory techniques, exam day playbook, study methods, solved problems, math for surveyors, and professional references.
-   **Practice Exam Simulator:** A full 110-question exam with a 6-hour timer, utilizing a separate pool of 155 unique questions, domain-based score breakdown, and performance analytics.
-   **Study Notes:** Rich text note-taking with auto-save for each week.
-   **Daily Logging System:** Integrated directly into each week's Study Plan section. Users can add daily study activities that automatically link to the current week, contribute to weekly completion percentage, and update the study streak. Daily logs can be viewed, edited, and deleted within each week's expandable section.
-   **Progress Dashboard with Gamification:** Features a circular progress ring (weighted by weeks, quizzes, and flashcards), study streak tracker, and an achievement badge system with 10 professional types. Supports flexible custom weeks. Progress page includes separate tabs for Quiz History, Exam History, Domain Mastery, and Daily Logs (summary view).
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

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.
-   **OpenAI:** Planned integration for an AI Study Assistant.