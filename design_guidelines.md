# FS Exam Study Guide - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Material Design with Linear-inspired refinements

**Rationale:** As an educational productivity tool focused on structured learning, data tracking, and practice sessions, this application prioritizes clarity, organization, and cognitive efficiency. The design should reduce friction in accessing information while maintaining visual hierarchy across complex content types (study plans, quizzes, flashcards, statistics).

**Key Design Principles:**
- Information density with breathing room - pack content efficiently without overwhelming
- Clear visual hierarchy through typography and spacing, not decoration
- Consistent interaction patterns across all learning modes
- Domain color coding as primary navigation and progress indicator
- Minimize cognitive load during study sessions (distraction-free focus modes)

---

## Core Design Elements

### A. Color Palette

**Domain Colors (Light Mode):**
Preserve existing domain colors as primary navigation system:
- Math & Basic Science: 217 92% 76% (blue)
- Field Data Acquisition: 142 71% 45% (green)
- Plane Survey Computations: 239 84% 67% (indigo)
- Mapping, GIS, CAD: 271 81% 71% (purple)
- Boundary Law & PLSS: 38 92% 50% (amber)
- Geodesy, GPS, Astronomy: 347 77% 70% (rose)
- Professional Practice: 215 16% 47% (slate)

**Dark Mode Adaptations:**
- Domain backgrounds: Reduce saturation to 30-40%, increase lightness to 25-35% for muted appearance
- Example: Math blue becomes 217 35% 30%

**Neutral Palette:**
- Background: 0 0% 100% (light) / 222 47% 11% (dark)
- Surface cards: 0 0% 98% (light) / 217 33% 17% (dark)
- Borders: 214 32% 91% (light) / 217 33% 24% (dark)
- Text primary: 222 47% 11% (light) / 210 40% 98% (dark)
- Text secondary: 215 16% 47% (both modes)

**Functional Colors:**
- Success/Complete: 142 76% 36%
- Warning: 38 92% 50%
- Error: 0 84% 60%
- Info: 217 91% 60%

### B. Typography

**Font Families:**
- Primary: Inter (via Google Fonts) - body text, UI elements
- Monospace: JetBrains Mono (via Google Fonts) - code snippets, formulas, calculations

**Type Scale:**
- Headings: 2xl (week titles), xl (section headers), lg (subsection headers)
- Body: base (main content), sm (metadata, captions)
- Use font-semibold for headings, font-medium for emphasized body text
- Line height: relaxed (1.625) for body text to improve readability of dense technical content

**Domain Labels:** Use uppercase text-xs font-semibold with domain color for tags

### C. Layout System

**Spacing Primitives:** Use Tailwind units 2, 4, 6, 8, 12, 16
- Component padding: p-4 (cards), p-6 (main sections), p-8 (page containers)
- Vertical rhythm: space-y-6 for section spacing, space-y-4 for related items
- Horizontal gaps: gap-4 (card grids), gap-6 (major sections)

**Container Strategy:**
- Main app container: max-w-7xl mx-auto px-4
- Sidebar navigation (if used): w-64 fixed
- Content area with sidebar: ml-64 
- Full-width dashboard: no max-width constraint, use grid for multi-column layouts

**Responsive Breakpoints:**
- Mobile-first approach
- 2-column grid at md: breakpoint for study plan items
- 3-column grid at lg: for quiz options, flashcard deck
- Collapsible sidebar on mobile (hamburger menu)

### D. Component Library

**Navigation:**
- Persistent sidebar with domain icons and color indicators
- Top bar with search, progress ring, and user settings
- Breadcrumb trail for deep navigation (Week > Domain > Quiz)
- Tab navigation for switching between study modes (Plan, Quiz, Flashcards, Exam, Notes)

**Cards & Containers:**
- Base card: rounded-lg border bg-white shadow-sm with hover:shadow-md transition
- Domain cards: Include colored left border (border-l-4) matching domain color
- Checklist items: Checkbox with label, strikethrough on completion, subtle bg change
- Stat cards: Large number (text-3xl font-bold), label below, domain color accent

**Forms & Inputs:**
- Text inputs: rounded-md border focus:ring-2 focus:ring-[domain-color]
- Checkboxes: Custom styled with domain color when checked
- Radio buttons: For quiz multiple choice - large touch targets (min 44px)
- Rich text editor: Minimal toolbar for note-taking (bold, italic, lists, headings)

**Quiz Components:**
- Question card: White card with question number badge (domain colored)
- Answer options: 4 large buttons (A, B, C, D) with rounded-lg, full-width on mobile
- Feedback panel: Green/red alert box with explanation text after answer submission
- Progress bar: Thin bar showing X/110 questions completed

**Flashcard System:**
- Card flip animation (transform rotateY)
- Front: Term/formula centered, domain color header stripe
- Back: Definition/explanation, related concepts in smaller text
- Navigation: Previous/Next arrows, shuffle button, mark as mastered checkbox

**Progress Tracking:**
- Week completion rings: Circular progress indicators (0-100%) with domain colors
- Overall dashboard: 7 domain mastery bars (horizontal), study streak calendar
- Statistics panel: Cards showing total study hours, questions answered, weak areas

**Data Displays:**
- Tables: Striped rows for exam score breakdowns, minimal borders
- Charts: Pie chart for domain distribution, bar chart for weekly progress (use simple CSS or Chart.js)
- Lists: Checkable items with subtle hover states

**Buttons:**
- Primary: Domain colored background, white text, rounded-md px-4 py-2
- Secondary: Border with domain color, transparent bg, domain colored text
- Ghost: No border, domain colored text, hover bg-slate-100
- Icon buttons: Square 40x40px with centered icon for compact actions

**Overlays:**
- Modal: Centered card with backdrop blur and darkened overlay
- Exam simulator: Full-screen mode with timer in top-right, minimalist UI
- Tooltips: Small rounded popups on hover for formula explanations

### E. Animations

**Use Sparingly:**
- Card hover: Subtle lift (translateY(-2px)) with shadow change
- Checkbox check: Quick scale animation (scale 0.8 to 1.0)
- Flashcard flip: 0.6s rotateY transition
- Progress bars: Smooth width transition over 0.5s
- Page transitions: Simple fade-in for content areas

**Focus Mode (Exam Simulator):**
- Remove all animations
- Disable hover effects except active question highlighting
- Timer pulse only when < 10 minutes remaining

---

## Images

**No hero images required** - this is a productivity application, not a marketing site.

**Icon Usage:**
- Use Lucide React icons (already imported in existing code)
- Domain icons: 24x24px in headers, 20x20px in lists
- Action icons: 20x20px for buttons, 16x16px inline with text
- Maintain icon color matching domain or neutral slate

**Placeholder Content:**
- Use simple geometric patterns or gradients for empty states
- "No notes yet" - shows notebook icon with encouraging message
- Domain illustration: Abstract shapes in domain color for section headers (optional SVG patterns)