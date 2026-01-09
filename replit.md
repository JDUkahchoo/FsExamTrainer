# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to provide a comprehensive and engaging learning experience, guiding users toward becoming a professional licensed surveyor (PLS).

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `design_guidelines.md` file. Getting Started & Study Strategy should be the first/primary tab for users entering the app.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, Inter font for UI, and JetBrains Mono for code/formulas, designed responsively with dark mode support.

**Key Features:**
-   **16-Week Study Plan with Flexible Study Modes:** Structured weekly schedules with a READ → FOCUS → APPLY → REINFORCE framework, interactive checklists, and progress tracking. Supports Standard, Result-Driven, Working Professional, and Custom modes. Each week displays recommended textbook chapters from both SRM and ES based on assigned lessons.
-   **Custom Plan Builder:** Interactive UI for personalized study plans.
-   **Study Cycles System:** Multi-pass study framework for repeated plan completion, preserving historical data.
-   **Practice Quizzes:** Mixed Exam and Domain Practice modes with unique questions, instant feedback, explanations, and analytics.
-   **Enhanced Flashcard System:** Two decks with four interactive study modes:
    -   **Quick Review:** Classic flip cards with spaced repetition and mastery tracking
    -   **Triad Drill:** 3-phase learning (Recall → Apply → Reverse) for deeper retention
    -   **Feynman Mode:** Explain concepts in your own words with 1-5 clarity self-rating
    -   **Mnemonic Builder:** Create and save memory tricks with built-in formula suggestions
    -   Database tables: `flashcardFeynmanScores`, `flashcardMnemonics`, `flashcardTriadProgress` track per-card progress across modes
-   **Study Resources:** Library with formula sheets, memory techniques, and professional references.
-   **Practice Exam Simulator:** Full 110-question exam with timer, unique questions, domain-based score breakdown, and analytics.
-   **Study Notes (Enhanced):** Multi-page note-taking system with week selector, Mon-Sun day filtering, optional domain tagging, auto-save, and CRUD operations for managing multiple notes per week.
-   **Daily Logging System:** Integrated into the Study Plan for tracking activities and contributing to study streaks.
-   **Progress Dashboard with Gamification:** Circular progress ring, study streak tracker, achievement badges, and detailed history, including domain mastery tracking.
-   **Personal Analytics Dashboard:** Data-driven insights including learning velocity (week-over-week improvement per domain), time investment ROI (accuracy gain per study hour), weakness predictions with confidence scores, study patterns (peak hours/days), and progress trajectory (current vs predicted exam score). Default tab in Progress page for priority visibility.
-   **Daily Quests System:** 3-4 personalized daily goals with XP rewards (50-100 XP). Quest types include flashcard reviews, lesson completion, quiz challenges, completing all pillars, and weak domain practice. Quests regenerate daily using strict same-day filtering. Database table `dailyQuests` tracks progress and completion status.
-   **AI Study Coach Briefing:** Personalized daily study guidance including time-based greetings, focus recommendations for weak domains (using `predictedStruggle` flag), progress insights with predicted exam scores, motivational messages based on learning velocity, and prioritized action items. Integrated into Getting Started page.
-   **Optimal Review Timing (Spaced Repetition):** SM-2 algorithm schedules reviews based on performance quality (0-5 rating). Tracks `easeFactor`, `intervalDays`, and `reviewCount` in `reviewSchedule` table. System properly resets `reviewCount` to 0 on poor performance (quality < 3) per SM-2 specification.
-   **XP System with 10 Surveyor Ranks:** Gamified progression from Survey Trainee (Level 1) to Survey Legend (Level 10). XP awarded for completing READ checkpoints (25 XP), APPLY challenges (75 XP), and REINFORCE reviews (15 XP). Backend idempotency prevents XP farming via xpGrants table tracking unique activity keys.
-   **Resume Functionality:** Allows users to save and resume interrupted quiz and exam sessions.
-   **Interactive Lessons System (Domain-Based):** Duolingo-style interactive lessons organized by NCEES domain with multiple question types, difficulty levels, and progress indicators. Includes practical word problems for real-world application.
-   **Individual Question Tracking:** Comprehensive question-level tracking for pretests and practice exams.
-   **Expanded Question Pool:** 1,825 lesson questions generated from 365 question archetypes (5 per lesson × 73 lessons × 5 variations). Uses archetype-based variation system with seeded random number generation for deterministic, reproducible question variations. Prevents memorization through computational parameter variations and curated alternative phrasings.
-   **Getting Started & Study Strategy Page:** Comprehensive onboarding for new users, offering a quick start guide, study tool overview, detailed study strategy comparisons, and success tips. Also includes Feedback, Testimonials, Privacy Policy, and Disclaimer pages.
-   **Reference Manual Companion:** Dual textbook reference system with all 73 lessons mapped to both Surveyor Reference Manual (SRM) 7th Edition and Elementary Surveying 15th Edition (Ghilani & Wolf). Users can toggle between textbooks to view chapter mappings, study tips, and page references. Stats and domain views dynamically update based on selected book.
-   **Complete NCEES Coverage:** All 7 NCEES exam knowledge areas fully covered including Safety, Supervision, Communication (Domain 6), and UAS/Drone Operations (Domain 2) per the official FS CBT exam specifications.

**Technical Implementation:**
-   **Frontend:** React with TypeScript, Tailwind CSS, Shadcn UI, Wouter, TanStack Query, and Lucide React.
-   **Backend:** Express.js server.
-   **Database:** PostgreSQL with Drizzle ORM.
-   **Authentication:** Replit Auth.
-   **Validation:** Zod.

**System Design:**
-   Separate question pools for quizzes and exams with stable question IDs.
-   Dual flashcard ID system.
-   User-scoped data storage with cloud sync readiness and protected API routes.
-   Tabbed interface for progress tracking.
-   Daily logs integrated into Study Plan for weekly progress calculation.
-   Study Cycles Architecture: Database tracks each cycle, calculating stats within cycle timeframes.
-   Server-side validation and security for interactive lessons, with explicit progress persistence.
-   Domain-Based Lesson Architecture: Lessons organized by NCEES domain number for flexible study mode distribution; client-side logic distributes lessons across weeks.
-   Custom Plan Builder Implementation: Database stores `customDomainPriorities` and `customTimeline` in user preferences; UI is a modal component with state management; backend endpoint saves custom plan data.
-   Progress tracking includes `domainProgressSnapshots` table and an API for domain mastery.
-   Question pool randomization system utilizes `variationGroup` and `variationNumber` fields, tracking `seenQuestionVariations` to prioritize unseen variations.
-   **Question Archetype System:** Template-based question generation in `shared/questionArchetypes.ts`. Uses `FillInBlankArchetype` (computational with paramRanges), `MultipleChoiceArchetype` (5 curated question variants), and `ConceptualFillInBlankArchetype` patterns. Seeded RNG (mulberry32) ensures deterministic variations. Archetype IDs follow pattern: `d{domain}-lesson-{order:02}-q{num:02}-v{variation}`.
-   **XP Idempotency System:** `xpGrants` table tracks (userId, activityKey) pairs to prevent duplicate XP awards. Activity keys are deterministic: `read:week{N}:chapter{M}`, `apply:challenge:{id}`, `reinforce:review:{id}`. Backend `awardXp()` checks `hasXpGrant()` before granting XP and returns `awarded: true/false` to frontend.

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.