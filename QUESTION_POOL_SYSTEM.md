# Question Pool Randomization System

## Overview

The question pool system enables each lesson to have multiple variations of questions, ensuring fresh content every time a user redoes a lesson. This prevents answer memorization and encourages true concept mastery.

## How It Works

### Database Structure

Each question in the `lesson_questions` table now has two additional fields:

- **`variationGroup`** (integer): Groups together variations of the same question. Each question slot (1, 2, 3, etc.) has its own group number.
- **`variationNumber`** (integer 1-5): Identifies which variation this is within its group.

**Example:**
```
Lesson "Basic Arithmetic"
├─ Question Slot 1 (variationGroup=1)
│  ├─ Variation 1: "Calculate: 12 + 8 × 2 = ___"
│  ├─ Variation 2: "Calculate: 15 + 6 × 3 = ___"  [Future]
│  ├─ Variation 3: "Calculate: 20 + 4 × 5 = ___"  [Future]
│  └─ ...
├─ Question Slot 2 (variationGroup=2)
│  ├─ Variation 1: "What does PEMDAS stand for?"
│  ├─ Variation 2: "Which operation comes first: 5 + 3 × 2?"  [Future]
│  └─ ...
```

### User Progress Tracking

The `lesson_progress` table tracks which question variations each user has seen:

- **`seenQuestionVariations`** (JSONB): Maps variation groups to seen question IDs
  ```json
  {
    "1": ["q-id-abc", "q-id-def"],
    "2": ["q-id-ghi"]
  }
  ```

### Randomization Algorithm

When a user starts a lesson:

1. **Fetch all variations**: Get all questions for the lesson grouped by `variationGroup`
2. **Check seen history**: Load user's `seenQuestionVariations` from lesson progress
3. **Prioritize unseen**: For each group, filter to variations the user hasn't seen yet
4. **Random selection**: Randomly pick one variation from available options
5. **Reset if needed**: If all variations in a group have been seen, reset and use all

This ensures:
- Users see different questions each attempt
- No immediate repeats
- Fair distribution across all variations

## Adding New Question Variations

### Current State (Nov 24, 2025)

All 68 lessons have their existing questions marked as **variation 1**. Each lesson needs **4 additional variations per question** (variations 2-5).

**Total questions needed:** ~1,088 new variations across all lessons

### How to Add Variations

1. **Determine variation type:**
   - **Numerical variations** (50%): Change numbers, keep scenario
   - **Scenario variations** (50%): Different context, same concept

2. **Create the variation:**
   ```typescript
   // Original (variation 1)
   { 
     type: "fill_in_blank", 
     text: "A 2% grade rises ___ feet per 100 feet horizontally.", 
     answer: "2",
     variationGroup: 3,
     variationNumber: 1
   }

   // Numerical variation (variation 2)
   { 
     type: "fill_in_blank", 
     text: "A 5% grade rises ___ feet per 100 feet horizontally.", 
     answer: "5",
     variationGroup: 3,
     variationNumber: 2
   }

   // Scenario variation (variation 3)
   { 
     type: "fill_in_blank", 
     text: "A road with 3% slope rises ___ meters per 100 meters of distance.", 
     answer: "3",
     variationGroup: 3,
     variationNumber: 3
   }
   ```

3. **Insert into database:**
   ```sql
   INSERT INTO lesson_questions (
     lesson_id, question_type, question_text, 
     correct_answer, explanation, order_index,
     variation_group, variation_number, points
   ) VALUES (
     'd0-lesson-03', 'fill_in_blank',
     'A 5% grade rises ___ feet per 100 feet horizontally.',
     '5', 'Grade% = (rise/run) × 100 = (5/100) × 100 = 5%',
     3, 3, 2, 10
   );
   ```

4. **Maintain consistency:**
   - Keep `lessonId` the same as variation 1
   - Keep `orderIndex` the same (question slot position)
   - Keep `variationGroup` the same (groups variations together)
   - Increment `variationNumber` (2, 3, 4, 5)
   - Test same learning objective, different presentation

### Guidelines for Quality Variations

**DO:**
- ✅ Test the same concept from different angles
- ✅ Use different numerical values that require calculation
- ✅ Vary context (road vs pipeline, feet vs meters)
- ✅ Ensure explanations teach the method, not just the answer
- ✅ Match difficulty level of variation 1

**DON'T:**
- ❌ Make variations significantly harder/easier
- ❌ Test different concepts (save for new questions)
- ❌ Copy-paste with trivial changes
- ❌ Use trick questions or ambiguous wording

## Technical Implementation

### API Endpoints

**GET `/api/lessons/:id`**
- Uses `getLessonWithRandomizedQuestions(userId, lessonId)`
- Returns one random variation per question slot
- Prioritizes unseen variations for variety

**POST `/api/lessons/:id/submit`**
- Tracks which variations were shown
- Updates `seenQuestionVariations` in lesson progress
- Ensures next attempt gets different questions

### Storage Methods

**`getLessonWithRandomizedQuestions(userId, lessonId)`**
```typescript
// Fetches all question variations
// Groups by variationGroup
// Selects one random variation per group (prioritizing unseen)
// Returns: { lesson, questions: LessonQuestion[] }
```

**`upsertLessonProgress(progressData)`**
```typescript
// Updates user's lesson progress
// Includes seenQuestionVariations field
// Tracks variation history for smart randomization
```

## Benefits

1. **Prevents memorization**: Users can't just remember "Answer C" 
2. **Encourages mastery**: Must understand concepts to answer variations
3. **Increases engagement**: Fresh content on every retry
4. **Supports study cycles**: Completing 5 cycles = 5 unique attempts
5. **Professional quality**: Matches commercial exam prep platforms

## Future Roadmap

- **Phase 1 (Complete):** Technical foundation with variation 1
- **Phase 2 (In Progress):** Add variations 2-5 for all 68 lessons (~1,088 questions)
- **Phase 3:** Content validation by licensed PLs
- **Phase 4:** Difficulty balancing across variations
- **Phase 5:** Analytics on variation performance

---

**Last Updated:** November 24, 2025
**Status:** Technical foundation complete, ready for content expansion
