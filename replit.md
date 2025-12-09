# FS Exam Study Guide

## Overview
This project is an interactive study guide for the Fundamentals of Surveying (FS) exam, designed to help surveying students prepare for the NCEES FS exam. It offers structured study plans, practice quizzes, flashcards, and full-length practice exams, covering all 7 NCEES domains. The application aims to be the first step for users towards becoming a professional licensed surveyor (PLS), providing a comprehensive and engaging learning experience with market-leading features and coverage.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent updates. Ask before making major architectural changes. Do not make changes to the `design_guidelines.md` file. Getting Started & Study Strategy should be the first/primary tab for users entering the app.

## System Architecture
The application features a comprehensive UI/UX with domain-specific color coding, Inter font for UI, and JetBrains Mono for code/formulas, all designed responsively with dark mode support.

**Key Features:**
-   **16-Week Study Plan with Flexible Study Modes:** Structured weekly schedules with a READ → FOCUS → APPLY → REINFORCE framework, interactive checklists, and progress tracking. Supports Standard, Result-Driven (prioritizes weak domains), Working Professional (optimized for busy schedules: 1hr/day M-F + 2-3hrs weekends), and Custom modes.
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
-   **Expanded Question Pool:** 195 quiz questions and 170 exam questions across all 8 NCEES domains with varied difficulty levels (easy, medium, hard) for comprehensive practice. December 2025 expansion added questions from SRM Topics 2-5 covering: Field Data Acquisition (taping, Gunter's chain, tape corrections, breaking tape, leveling, EDM), Plane Survey Calculations (traverses, area, partitioning, horizontal curves), Geodesy and GPS (satellite positioning, RTK, DGPS, carrier-phase), and Cadastral/Boundary Law (feudal system, Statute of Frauds, chain of title, title insurance). All questions include practical word problems with real-world surveying scenarios.

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
-   **Content Gap Fillers (Nov 24, 2025):** Added 18 new quiz questions across all 8 domains to strengthen weak areas. Expanded from 99 to 116+ questions with strategic distribution: Math & Basic Science (2), Field Data Acquisition (2), Mapping/GIS/CAD (2), Boundary Law & PLSS (3), Surveying Principles (3), Survey Computations & Applications (2), Applied Mathematics & Statistics (2), Professional Practice (2). Each question includes detailed explanations and difficulty ratings to support progressive learning.
-   **Working Professional Schedule (Nov 24, 2025):** Added new 'working-professional' study mode optimized for busy professionals. Distributes 68 lessons across 16 weeks (3 lessons/week max) for manageable daily study: ~1hr/day M-F (5 hrs/week) + 2-3hrs weekends (4-6 hrs/week) = ~9-11 hrs/week. Uses round-robin domain cycling for balanced coverage and difficulty-sorted progression within each domain. Study mode selector added to Study Plan UI with dropdown for switching between Standard, Result-Driven, Working Professional, and Custom modes.
-   **Getting Started Onboarding (Nov 24, 2025):** Added comprehensive 5-step onboarding tour for new users covering: Welcome intro, Study modes overview (Standard, Result-Driven, Working Professional, Custom), Diagnostic pretest guide, Dashboard features, and Key features overview. Multi-step modal with progress indicator, navigation controls, and skip option. Integrates with existing welcome flow using `hasSeenWelcome` preference flag.

-   **Study Strategy Page (Nov 24, 2025):** Added comprehensive Study Strategy page (`/strategy` route) comparing all 4 study modes with time commitments, daily schedules, benefits, and use cases. Shows current user mode, allows mode switching, includes recommendations section with pretest link and study plan navigation. Helps users make informed decisions about study approach.
-   **Practical Word Problems for All 68 Lessons (Nov 24, 2025):** Created `server/practical-problems.ts` with 69 real-world surveying scenarios - one for each lesson. Problems tie theory to practical application (e.g., "A surveyor calculates distance using coordinates...", "A road grade is 5%..."). Fully integrated into lesson display:
    - Added `practicalProblem` field to lessons table schema
    - Updated seed-lessons.ts to populate practical problems for all lessons
    - Updated lesson UI to display practical problems in "Real-World Application" section below lesson content
    - Problems visible to students during lesson study to enhance practical understanding

-   **Feedback, Testimonials, Privacy Policy & Disclaimer Pages (Nov 24, 2025):** Built complete community and legal infrastructure:
    - **Feedback Page** (`/feedback`): Allows users to submit feedback, bug reports, feature requests, and content suggestions. Includes form validation and confirmation messaging.
    - **Testimonials Page** (`/testimonials`): Users who passed the exam can share success stories. Displays student name, exam score, study mode used, and testimonial. Includes moderation flag for admin review.
    - **Privacy Policy** (`/privacy`): Comprehensive privacy disclosure covering data collection, usage, security, third-party services, and user rights.
    - **Disclaimer** (`/disclaimer`): Legal disclaimer covering educational use, no guarantees of success, accuracy of content, professional advice limits, and liability limits.
    - Added feedback and testimonials tables to PostgreSQL schema
    - API routes: POST `/api/feedback`, GET/POST `/api/testimonials`
    - Updated sidebar with Community and Legal sections
    - All pages responsive and accessible

-   **Getting Started & Study Strategy Page (Nov 24, 2025):** Combined comprehensive onboarding and study mode selection:
    - **Getting Started Page** (`/getting-started`, default landing for authenticated users): 
      - Quick Start guide with 4 essential steps (Take Pretest, Choose Mode, Follow Schedule, Review Progress)
      - Study Tools overview with descriptions and direct links to all 7 tools (Study Plan, Quiz, Flashcards, Exam, Notes, Progress, Resources)
      - Complete Study Strategy guide comparing all 4 modes (Standard, Result-Driven, Working Professional, Custom)
      - Success tips and actionable recommendations
      - Call-to-action buttons for pretest and study plan
    - Set as the first/primary tab in the sidebar (replaces Study Plan as home page)
    - Integrates both "how to use the guide" content with study strategy selection
    - Responsive design with clear visual hierarchy and information architecture

-   **Question Pool Randomization System (Nov 24, 2025):** Implemented multi-variation question system to prevent answer memorization:
    - **Database Schema:** Added `variationGroup` (groups variations of same question) and `variationNumber` (1-5) fields to `lessonQuestions` table
    - **User Progress Tracking:** Added `seenQuestionVariations` JSONB field to `lessonProgress` to track which variations each user has seen
    - **Smart Randomization Algorithm:** 
      - Groups questions by `variationGroup` (each question slot has its own group)
      - Prioritizes showing unseen variations to maximize variety
      - Resets seen history when all variations have been shown
      - Randomly selects one variation per group for fair distribution
      - Includes safety fallback if variation metadata is missing (returns all questions in order)
    - **Current State:** All 340 questions marked as variation 1, ready for content expansion (need ~1,088 more questions for variations 2-5)
    - **Migration Tools:** Created `migrate-question-variations.ts` to backfill variation fields for existing data
    - **Documentation:** Complete implementation guide in `QUESTION_POOL_SYSTEM.md` with guidelines for adding new variations
    - **Benefits:** Prevents memorization, encourages concept mastery, supports multiple study cycles with fresh content each time

-   **Surveying Principles Flashcards Fix (Dec 1, 2025):** Fixed missing "Surveying Principles" (NCEES Domain 4) flashcards:
    - **Root Cause:** Surveying Principles domain had 0 flashcards in both decks while all other 7 domains had 46-50 cards
    - **Comprehensive Deck:** Added 48 Surveying Principles flashcards covering:
      - Types of surveys (boundary, topographic, construction, route, geodetic)
      - Horizontal and vertical control methods
      - Differential leveling (HI, BS, FS, TP concepts)
      - EDM and total station fundamentals
      - Traverse calculations and adjustments (compass rule, transit rule)
      - Error analysis (precision vs accuracy, systematic vs random)
      - Coordinate systems (SPCS, Lambert, Transverse Mercator)
      - Field procedures and equipment calibration
    - **Original Deck:** Added 6 Surveying Principles flashcards with essential formulas
    - **Files Modified:** `shared/data/flashcardsComprehensive.ts`, `shared/data/flashcards.ts`

-   **Reference Manual Companion - Complete Mappings (Dec 9, 2025):** All 68 lessons now have SRM chapter references:
    - **SRM Topics I-XI:** Complete coverage of Surveyor Reference Manual 7th Edition (Chapters 1-44 + Appendices)
    - **Domain Coverage:** All 8 NCEES domains mapped to appropriate SRM chapters
    - **New Mappings Added:** d5-lesson-08 to d5-lesson-12 (Least Squares, Spreadsheets, Data Collectors, Error Propagation, Programming), d7-lesson-11 to d7-lesson-12 (Regression, Numerical Methods)
    - **Data Cleanup:** Removed orphaned mappings for non-existent lessons (d3-lesson-08, d6-lesson-07)
    - **Files Modified:** `shared/data/referenceManualMappings.ts`

## External Dependencies
-   **PostgreSQL:** Relational database for persistent data storage.
-   **Replit Auth:** Used for user authentication and managing user sessions.