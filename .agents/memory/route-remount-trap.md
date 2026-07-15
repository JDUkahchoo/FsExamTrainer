---
name: Route component identity / remount trap
description: Why results screens were wiped, and the rule for wrapping route components in App.tsx.
---

**Rule:** Never create route wrapper components inline in `Router()`'s render (e.g. `component={withExamTrack(Page, 'fs')}` returning a fresh function each call). Wrapper factories must return a stable, cached component identity (App.tsx uses a WeakMap cache keyed by component + exam track).

**Why:** A new component identity per Router re-render makes wouter unmount/remount the active page, silently wiping page-local state — this manifested as lesson/drill final results screens "closing on their own" whenever anything re-rendered Router (auth query updates, post-submit invalidation storms).

**How to apply:** When adding new route wrappers or HOCs in `client/src/App.tsx`, cache the wrapped component (module scope or WeakMap) so its identity is stable across renders. Related: study-reading knowledge checks must use an explicit Continue button, not auto-advance timers.
