---
name: Cross-account client cache isolation
description: Shared-device account switches can leak one user's cached API data into another's session; how this app guards against it
---

# Cross-account cache isolation

Rule: any client cache of user-scoped API data must be invalidated when the authenticated user id changes, and any server mutation on an id-addressed row must both enforce ownership AND respond 404 (not 403) on mismatch.

**Why:** A real prod incident: two different users share a device; after an account switch, stale TanStack Query data from user A fed a review session for user B, whose rating PATCH then 403'd on A's row id. Server-side per-user filtering on GETs was correct — the leak was purely client cache.

**How to apply:**
- `AppContent` (App.tsx) compares the logged-in user id to localStorage `last-auth-user-id` and removes all cached queries except `/api/auth/user` when it changes. Keep this guard when refactoring auth/root layout.
- Dialogs/sessions built from cached lists should gate on `isFetching` (not just `isLoading`) before letting the user start, and should skip-and-continue on 403/404 per-item errors rather than blocking.
- Ownership-mismatch responses on id-addressed PATCH/DELETE return 404 to avoid confirming other users' row ids.
