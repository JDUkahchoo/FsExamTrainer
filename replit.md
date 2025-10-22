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
- 25+ practice questions across all domains
- Instant feedback with detailed explanations
- Domain filtering to focus on weak areas
- Accuracy tracking and statistics

### 🎴 Flashcard System
- 50+ flashcards covering formulas, definitions, and concepts
- Card flip animations for active recall
- Spaced repetition tracking
- Mark cards as mastered
- Shuffle and domain filtering

### 🎓 Practice Exam Simulator
- Full 110-question practice exam
- 6-hour timer (simulates actual exam)
- Domain-based score breakdown
- Performance analytics
- Retake capability

### 📝 Study Notes
- Rich text note-taking for each week
- Integrated with study plan overview
- Auto-save functionality
- Character count tracking

### 📊 Progress Dashboard
- Study streak tracking
- Overall quiz accuracy
- Flashcard mastery percentages
- Domain-specific performance metrics
- Personalized recommendations

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
│   │   │   └── progress.tsx
│   │   ├── lib/
│   │   │   └── domains.ts
│   │   └── App.tsx
├── shared/
│   ├── schema.ts            # Type definitions
│   └── data/
│       ├── studyPlan.ts
│       ├── quizQuestions.ts
│       └── flashcards.ts
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
- All 6 pages migrated to PostgreSQL API (Progress, Study Plan, Quiz, Exam, Flashcards, Notes)
- TanStack Query integration with useQuery/useMutation pattern
- Proper cache invalidation on all mutations
- Loading states and error handling
- Auto-save functionality (Notes with 2s debounce)
- Stable flashcard IDs for mastery tracking
- Study plan Set→Array conversion for database storage
- Practice quiz includes full answer tracking

**Phase 4: Enhanced Features** 📋 Planned
- AI Study Assistant (OpenAI integration)
- Collaborative Study Groups
- Advanced Analytics

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

### Flashcard Mastery
- Tracks mastery level (1-5 scale) for each flashcard
- `flashcardId` uses stable IDs: `card-0`, `card-1`, etc.
- Mastery level ≥ 4 = card is marked as mastered
- `lastReviewed` timestamp for spaced repetition

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
