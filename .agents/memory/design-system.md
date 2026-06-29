---
name: Design system — "Field Book to Point Cloud"
description: The app's visual concept, palette intent, and the cross-surface token gotcha to respect when theming.
---

# Visual concept: "Field Book to Point Cloud"

The theme narrates surveying's heritage → its geospatial-engineering future.
- **Content surfaces** = aged field-book paper (warm cream `--background`, ink-navy `--foreground`).
- **Navigation rail** = dark "instrument panel" — the `--sidebar*` tokens are intentionally DARK even in light mode.
- **Primary** = instrument teal. **Accents** = brass (`--brass`) + survey-orange (`--survey-orange`). Domain colors are kept unchanged (functional navigation/coding).
- **Headings** use Source Serif 4 (plat-style) — applied GLOBALLY to `h1/h2/h3` via `@layer base` in `index.css` (pages use `text-3xl font-bold` sans, so the base rule is what makes the serif land everywhere). Body = Inter, mono = JetBrains Mono.
- Texture utilities live in `index.css`: `bg-fieldbook`, `bg-fieldbook-fine`, `bg-pointcloud`, `label-coord`, `rule-brass`. The authed shell applies `bg-fieldbook-fine` to the `<main>` content area in `exam-layout.tsx`, and the top header is branded with the exam name.
- The literal phrase "Field Book → Point Cloud" is the internal concept name only — do NOT surface it as visible UI copy (user disliked it).

**Why:** user wanted "traditional survey look with an integrated techy field… where the industry started and where it's headed, into geospatial engineering."

## Cross-surface token gotcha (important)
Because the sidebar is dark while the page is light paper, the global `text-muted-foreground` token (a dark, low-lightness value in light mode) is NOT safe on the dark rail.
- Inside the sidebar, use `text-sidebar-foreground` / `text-sidebar-foreground/70`, never `text-muted-foreground`.
- `survey-orange` is bright; pair it with DARK text (e.g. `text-zinc-950`), not white — white-on-orange fails AA.

**How to apply:** when adding anything to the sidebar or any dark-on-light mixed surface, check that text uses the sidebar-scoped tokens. When using `bg-survey` for CTAs, use dark text.

## Do NOT edit
`design_guidelines.md` is user-locked (do not modify). `package.json`, `vite.config.ts`, `server/vite.ts`, `drizzle.config.ts` are off-limits per project rules. Editing `tailwind.config.ts` IS allowed.
