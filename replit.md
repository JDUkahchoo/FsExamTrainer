# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to be the first step for users towards becoming a professional licensed surveyor (PLS), providing a comprehensive and engaging learning experience with market-leading features and coverage.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `design_guidelines.md` file.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, Inter font for UI, and JetBrains Mono for code/formulas, all designed responsively with dark mode support.

**Key Features:**
-   **16-Week Study Plan with Flexible Study Modes:** Structured weekly schedules with a READ → FOCUS → APPLY → REINFORCE framework, interactive checklists, and progress tracking. Supports Standard, Result-Driven (prioritizes weak domains), and Custom modes.
-   **Custom Plan Builder:** Interactive UI for personalized study plans, allowing domain selection, priority ordering, and duration customization.
-   **Study Cycles System:** Multi-pass study framework for repeated plan completion, preserving historical data.
-   **Practice Quizzes:** Mixed Exam and Domain Practice modes with unique questions, instant feedback, explanations, and analytics.
-   **Flashcard System:** Two decks with card flip animations, spaced repetition, and mastery tracking.
-   **Study Resources:** Library with formula sheets, memory techniques, and professional references.
-   **Practice Exam Simulator:** Full 110-question exam with a timer, unique questions, domain-based score breakdown, and analytics.
-   **Study Notes:** Rich text note-taking with auto-save for each week.
-   **Daily Logging System:** Integrated into the Study Plan for tracking activities and contributing to study streaks.
-   **Progress Dashboard with Gamification:** Circular progress ring, study streak tracker, achievement badges, and detailed history.
-   **Resume Functionality:** Allows users to save and resume interrupted quiz and exam sessions.
-   **Interactive Lessons System (Domain-Based):** Duolingo-style interactive lessons organized by NCEES domain (0-7) with multiple question types, difficulty levels, and progress indicators. All 68 lessons are complete.
-   **Individual Question Tracking:** Comprehensive question-level tracking for pretests and practice exams.

**Technical Implementation:**
-   **Frontend:** React with TypeScript, Tailwind CSS, Shadcn UI, Wouter, TanStack Query, and Lucide React.
-   **Backend:** Express.js server.
-   **Database:** PostgreSQL with Drizzle ORM.
-   **Authentication:** Replit Auth.
-   **Validation:** Zod.
-   **Recent Additions:** Domain mastery tracking with `/api/progress/domain-mastery` endpoint returning domain scores, improvement alerts, and mastery badges (85%+).

**System Design:**
-   Separate question pools for quizzes and exams.
-   Dual flashcard ID system.
-   User-scoped data storage.
-   Cloud sync readiness with protected API routes.
-   Tabbed interface for progress tracking.
-   Stable question IDs for session resume.
-   Daily logs integrated into Study Plan for weekly progress calculation.
-   Study Cycles Architecture: Database tracks each cycle with unique user and cycle number constraints, calculating stats within cycle timeframes.
-   Server-side validation and security for interactive lessons.
-   Lesson progress persistence explicitly updates critical fields to ensure correct completion status and scores.
-   Domain-Based Lesson Architecture: Lessons organized by NCEES domain number (0-7) for flexible study mode distribution; client-side logic distributes lessons across weeks based on study mode. Stable lesson IDs prevent errors and enable reliable progress tracking.
-   Custom Plan Builder Implementation: Database stores `customDomainPriorities` and `customTimeline` in user preferences; logic distributes lessons based on user selections; UI is a modal component with domain selection, priority reordering, and timeline slider; state management ensures preference synchronization; backend endpoint saves custom plan data.
-   **Enhanced Progress Tracking (Nov 24, 2025):** Added domain mastery tracking with `domainProgressSnapshots` table, `getDomainMastery()` storage method, and `/api/progress/domain-mastery` backend route. UI displays domain cards with current scores (0-100%), improvement alerts ("Needs focus", "Keep practicing", "Mastered!"), and visual progress bars. Alerts triggered: <50% = "Needs focus", 50-70% = "Keep practicing", ≥85% = "Mastered!". Grid layout shows all 8 domains with mastery badges and improvement indicators.

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.