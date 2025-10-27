# FS Exam Study Guide

An interactive study guide application for the Fundamentals of Surveying (FS) exam. This comprehensive tool helps surveying students prepare for the NCEES FS exam through structured study plans, practice quizzes, flashcards, and full-length practice exams.

## Overview

The FS exam is the first step toward becoming a professional licensed surveyor (PLS). This study guide covers all 7 NCEES domains:

1. **Math & Basic Science** - Statistics, error analysis, unit conversions
2. **Field Data Acquisition** - Leveling, distance measurement, total stations
3. **Plane Survey Computations** - Traverse, curves, coordinate geometry
4. **Mapping, GIS, and CAD** - Photogrammetry, contours, GIS concepts
5. **Boundary Law & PLSS** - Property law, Public Land Survey System
6. **Geodesy, GPS, Astronomy** - Datums, GNSS, geoid models
7. **Professional Practice** - Ethics, business practices, standards

## Features

### 📚 16-Week Study Plan
- Structured weekly schedule with READ → FOCUS → APPLY → REINFORCE framework
- Interactive checklists for tracking progress
- Domain-specific color coding
- Progress tracking for each week

### 🧠 Practice Quizzes
- **Question Pool**: 99 questions from dedicated QUIZ_QUESTIONS pool
  - Separate from exam questions to prevent overlap and repetition
  - Includes difficulty levels (easy/medium/hard) across all 7 domains
  - Expandable to 200+ questions for comprehensive practice
- **Two Quiz Modes**:
  - **Mixed Exam Mode**: 50 randomly selected questions from all domains
  - **Domain Practice**: Practice all questions from a specific domain
- Session-based tracking with timer and completion flow
- Instant feedback with detailed explanations
- Quiz session history with accuracy and time tracking
- Domain-specific performance analytics across all attempts
- Accuracy statistics and progress tracking

### 🎴 Flashcard System
- **Two comprehensive decks**: Original curated deck (50 cards) and Comprehensive deck (350 cards)
- Toggle between decks to customize study depth
- Card flip animations for active recall
- Spaced repetition tracking with 1-5 mastery levels
- Mark cards as mastered (level ≥ 4)
- Shuffle and domain filtering
- Separate mastery tracking for each deck
- All 7 NCEES domains covered with detailed explanations

### 📚 Study Resources
Comprehensive resource library with seven organized sections:
- **Formula Sheets** - Essential surveying formulas organized by category
- **Memory Techniques** - Mnemonics and visualization strategies for key concepts
- **Exam Day Playbook** - Time management, calculator tips, and test-taking strategies  
- **Study Methods** - Active recall, Cornell notes, and effective review techniques
- **Surveying Solved Problems** - 17 PPI problem topics mapped to 7 NCEES domains
- **Math for Surveyors** - 15 core topics from trigonometry to vertical curves
- **Professional Reference** - Safety Handbook, TSPS Manual, ALTA Table A, Minimum Standards

### 🎓 Practice Exam Simulator
- **Question Pool**: 155 questions from dedicated EXAM_QUESTIONS pool
  - Completely separate from quiz questions to eliminate repetition
  - Ensures fresh questions for exam simulation
  - Sufficient variety for multiple exam attempts
- Full 110-question practice exam
- 6-hour timer (simulates actual exam)
- Domain-based score breakdown with per-domain accuracy
- Performance analytics and exam history tracking
- Retake capability with new random question selection

### 📝 Study Notes
- Rich text note-taking for each week
- Integrated with study plan overview
- Auto-save functionality
- Character count tracking

### 📊 Progress Dashboard with Gamification
- **Circular Progress Ring**: Visual representation of overall completion
  - 40% weighted from weeks completed (core 16 + custom weeks)
  - 30% weighted from quiz accuracy
  - 30% weighted from flashcard mastery
  - Real-time updates as you progress
- **Study Streak Tracker**: 🔥 Day counter with best streak record
  - Automatic daily activity logging across all study actions
  - Streak breaks if no activity for 24+ hours
  - Motivates consistent study habits
- **Achievement Badge System**: 10 professional achievement types
  - **Milestone Badges**: Week 1 Complete, Week 8 Complete (Halfway), All Weeks Complete
  - **Performance Badges**: Quiz Master (85%+ with 50+ questions), Perfect Score (100% on quiz)
  - **Mastery Badges**: Card Champion (50+ flashcards mastered), Exam Ready (complete practice exam)
  - **Streak Badges**: Week Warrior (7 days), Fortnight Focus (14 days), Monthly Master (30 days)
  - Toast notifications when new achievements are unlocked
- **Flexible Week System**: Extend beyond the core 16 weeks
  - Add custom study weeks for specific domains or topics
  - Full READ → FOCUS → APPLY → REINFORCE framework
  - Integrated with overall progress calculations
  - Delete custom weeks as needed
- **Three-tab interface for organized progress tracking**:
  - **Quiz History**: All quiz session attempts with domain, accuracy, time
  - **Exam History**: Practice exam results with domain breakdown
  - **Domain Mastery**: Performance analytics per domain across all quiz/exam attempts

## Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** component library
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Lucide React** for icons

### Backend
- **Express.js** server
- **PostgreSQL** database with Drizzle ORM
- **Replit Auth** for user authentication
- **Zod** for validation

### Design System
- Domain-specific color palette
- Inter font for UI
- JetBrains Mono for code/formulas
- Responsive design (mobile-first)
- Dark mode support

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Shadcn components
│   │   │   └── app-sidebar.tsx
│   │   ├── pages/
│   │   │   ├── study-plan.tsx
│   │   │   ├── practice-quiz.tsx
│   │   │   ├── flashcards.tsx
│   │   │   ├── practice-exam.tsx
│   │   │   ├── notes.tsx
│   │   │   ├── progress.tsx
│   │   │   └── resources.tsx
│   │   ├── lib/
│   │   │   └── domains.ts
│   │   └── App.tsx
├── shared/
│   ├── schema.ts            # Type definitions
│   └── data/
│       ├── studyPlan.ts
│       ├── quizQuestions.ts           # 99 quiz questions (separate pool)
│       ├── examQuestions.ts           # 155 exam questions (separate pool)
│       ├── flashcards.ts              # Original 50-card deck
│       └── flashcardsComprehensive.ts  # Comprehensive 350-card deck
├── server/
│   ├── routes.ts            # API endpoints
│   └── storage.ts           # Data storage interface
└── design_guidelines.md     # UI/UX specifications
```

## Development Status

**MVP Features** ✅ Complete
- All frontend components fully functional
- Complete API layer implemented
- Initial localStorage persistence working

**Phase 2: Authentication & Database** ✅ Complete
- PostgreSQL database with Drizzle ORM
- Replit Auth (OIDC) integration
- User-scoped data with foreign keys
- All tables created: users, sessions, weekProgress, quizResults, flashcardMastery, practiceExams, studyNotes
- Protected API routes with authentication middleware
- Landing page for logged-out users
- Cloud sync ready

**Phase 3: Data Migration & Sync** ✅ Complete
- All 7 pages migrated to PostgreSQL API (Progress, Study Plan, Quiz, Exam, Flashcards, Notes, Resources)
- TanStack Query integration with useQuery/useMutation pattern
- Proper cache invalidation on all mutations
- Loading states and error handling
- Auto-save functionality (Notes with 2s debounce)
- Stable flashcard IDs for mastery tracking
- Study plan Set→Array conversion for database storage
- Practice quiz includes full answer tracking

**Phase 3.5: Comprehensive Content Expansion** ✅ Complete
- Expanded flashcard system to 350 cards across all 7 domains
- Dual deck system: Original (50 cards) and Comprehensive (350 cards)
- Separate mastery tracking per deck using deck-prefixed IDs (`card-X` vs `comp-card-X`)
- New Resources page with formula sheets, memory techniques, exam strategies
- Content extracted from professional FS exam study materials
- Deck switching UI with seamless toggle between collections

**Phase 3.6: Quiz Session Tracking** ✅ Complete
- Implemented session-based quiz tracking with complete quiz sessions table
- Practice quiz now features setup → active → completion flow
- Real-time timer tracking during quiz sessions
- Dual tracking system: individual question results (for analytics) + session summaries (for history)
- Progress page displays recent quiz session history with accuracy, time, and domain
- Maintains backward compatibility with existing quiz statistics
- End-to-end tested and verified working

**Phase 3.7: Separate Question Pools & Tabbed Progress** ✅ Complete
- Expanded total question pool to 254 questions: 99 quiz questions + 155 exam questions with zero overlap
- Created separate question pools (QUIZ_QUESTIONS vs EXAM_QUESTIONS) to eliminate repetitive questions
- Added difficulty levels (easy/medium/hard) to all questions across both pools
- Restructured progress page with tabbed interface: Quiz History | Exam History | Domain Mastery
- Fixed practice exam cap issue - now properly displays 110 questions from dedicated exam pool
- Question pools ready for incremental expansion - current 254 is functional baseline toward 350+ goal

**Phase 3.8: Professional Resources Expansion** ✅ Complete
- Expanded Resources page from 4 tabs to 7 comprehensive tabs
- Added Surveying Solved Problems section with 17 PPI topics mapped to 7 NCEES domains
- Added Math for Surveyors review covering 15 essential calculation topics
- Created Professional Reference section with Safety Handbook, TSPS Manual, ALTA Table A, Minimum Standards
- Organized all content by NCEES domain with color-coded visual hierarchy
- Professional materials noted as reference (Texas-specific but exemplify national standards)

**Phase 3.9: Gamification & Progress Tracking** ✅ Complete
- Implemented circular progress ring with weighted metrics (40% weeks, 30% quiz, 30% flashcards)
- Created study streak tracking system with consecutive day calculation and calendar heatmap
- Built achievement badge system with 10 professional achievement types
- Added automatic daily activity logging across all user actions
- Integrated ProgressHeader component with real-time progress updates
- Developed flexible custom week system allowing study plan extension beyond 16 weeks
- Achievement toast notifications for positive reinforcement
- Database schema: dailyActivity, achievements, customWeeks tables
- API endpoints for activity tracking, streak calculation, and achievement checking
- Subtle, professional gamification appropriate for surveying professionals
- **Critical bugs fixed during development:**
  - Fixed flashcard mastery reviewCount NaN error (fallback to 0 added)
  - Fixed flashcard upsert returning undefined (empty array [] was truthy causing wrong branch)
  - Fixed custom week creation crashes (added missing readItems, focusItems, applyItems, reinforceItems columns)
  - Fixed frontend mapping for custom weeks (corrected property names from database schema)
- All features end-to-end tested and verified working correctly

**Phase 4: Resume Functionality** ✅ Complete
- **Database Schema**: Added quizDrafts and examDrafts tables with user-scoped foreign keys
- **Stable Question IDs**: Implemented quiz-X and exam-X ID system based on original array position
  - Questions preserve exact order when shuffled using stable identifiers
  - Prevents wrong questions from loading when resuming interrupted sessions
- **Quiz Resume**: Full draft save/restore for practice quizzes
  - Auto-saves draft when answering questions or navigating
  - Detects draft on page load and shows resume dialog
  - Resume restores exact questions, answers, timer, and domain selection
  - Delete draft on completion or when starting fresh
- **Exam Resume**: Same functionality for 110-question practice exams
  - Timer resume from saved timeSpentMinutes
  - All 110 questions restored in exact order
- **API Endpoints**: 6 new routes (GET/POST/DELETE for quiz & exam drafts)
- **Critical Bugs Fixed**:
  - Fixed currentQuestionIndex not incrementing: saveDraft now accepts indexOverride parameter
  - Fixed question shuffle bug: stable IDs prevent wrong questions from loading on resume
- **Testing**: End-to-end tested with playwright - all scenarios passing
  - Verified currentQuestionIndex saves correctly after navigation
  - Verified stable IDs preserve question order
  - Verified draft lifecycle (save, detect, resume, delete)

**Phase 4: Enhanced Features** 📋 Planned
- Question pool expansion to ~350 questions (50 per domain) for production readiness
- AI Study Assistant (OpenAI integration)
- Collaborative Study Groups
- Advanced Analytics with trend charts

## Running the Application

The workflow "Start application" runs `npm run dev` which starts:
- Express server for the backend
- Vite dev server for the frontend

Both run on the same port with automatic hot-reload.

## Data Model

### Users
- `id` (serial) - Primary key
- `replitUserId` - Replit auth user ID
- `email` - User email
- `firstName`, `lastName` - User name
- `createdAt` - Account creation timestamp

### Week Progress
- Tracks completion status for each week's activities (READ, FOCUS, APPLY, REINFORCE)
- Arrays store completed item indices for each category
- User-scoped via `userId` foreign key

### Quiz Results
- Records every quiz question attempted
- Includes `questionId`, `domain`, `selectedAnswer`, `isCorrect`, `completedAt`
- Used for accuracy tracking and domain performance

### Quiz Sessions
- Stores complete quiz session summaries
- Includes `domain`, `totalQuestions`, `correctAnswers`, `timeSpentSeconds`, `completedAt`
- Tracks full quiz attempts with timer and results
- Displayed in Progress page session history
- Separate from individual question tracking for better analytics

### Flashcard Mastery
- Tracks mastery level (1-5 scale) for each flashcard
- **Dual ID system for deck separation**:
  - Original deck: `card-0`, `card-1`, ... `card-49` (50 cards)
  - Comprehensive deck: `comp-card-0`, `comp-card-1`, ... `comp-card-349` (350 cards)
- Mastery level ≥ 4 = card is marked as mastered
- `lastReviewed` timestamp for spaced repetition
- Separate mastery progress tracked per deck

### Practice Exams
- Stores complete exam attempts with 110 questions
- Records `totalQuestions`, `correctAnswers`, `timeSpent`, `domainScores`
- Enables retakes and progress tracking

### Study Notes
- Week-by-week note storage
- Auto-saves with 2-second debounce
- Supports rich text content

## Future Enhancements

- AI-powered study assistant with chat interface
- Collaborative study groups with shared notes
- Advanced analytics with trend charts
- Performance predictions and weak area identification
- Additional practice questions and explanations
- Video content integration
- Mobile app version
