---
name: Design system — "Field Book to Point Cloud"
description: The app's visual concept, palette intent, and the cross-surface token gotcha to respect when theming.
---

# Visual concept: "Field Book to Point Cloud"

The theme narrates surveying's heritage → its geospatial-engineering future.
- **Content surfaces** = aged field-book paper (warm cream `--background`, ink-navy `--foreground`).
- **Navigation rail** = dark "instrument panel" — the `--sidebar*` tokens are intentionally DARK even in light mode.
- **Primary** = instrument teal. **Accents** = brass (`--brass`) + survey-orange (`--survey-orange`). Domain colors are kept unchanged (functional navigation/coding).
- **Headings** use `font-serif`/`font-display` → Source Serif 4 (plat-style). Body = Inter, mono = JetBrains Mono (coordinate/formula readouts).
- Texture utilities live in `index.css`: `bg-fieldbook`, `bg-fieldbook-fine`, `bg-pointcloud`, `label-coord`, `rule-brass`.

**Why:** user wanted "traditional survey look with an integrated techy field… where the industry started and where it's headed, into geospatial engineering."

## Cross-surface token gotcha (important)
Because the sidebar is dark while the page is light paper, the global `text-muted-foreground` token (a dark, low-lightness value in light mode) is NOT safe on the dark rail.
- Inside the sidebar, use `text-sidebar-foreground` / `text-sidebar-foreground/70`, never `text-muted-foreground`.
- `survey-orange` is bright; pair it with DARK text (e.g. `text-zinc-950`), not white — white-on-orange fails AA.

**How to apply:** when adding anything to the sidebar or any dark-on-light mixed surface, check that text uses the sidebar-scoped tokens. When using `bg-survey` for CTAs, use dark text.

## Do NOT edit
`design_guidelines.md` is user-locked (do not modify). `package.json`, `vite.config.ts`, `server/vite.ts`, `drizzle.config.ts` are off-limits per project rules. Editing `tailwind.config.ts` IS allowed.
