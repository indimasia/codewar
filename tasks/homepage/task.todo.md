# Task TODO: Homepage

## Scope

- Task: `homepage`
- Feature: `frontend-homepage`
- Owner: `airm2`
- Related route(s): `/`
- Related data model(s): `users`, `challenges`, `leaderboard`, `achievements`
- Branch: `feat/homepage`

## Implementation

- Status: `[todo]`
- Goal: Build a production-ready homepage that replaces current mock data with real data and polishes the UI
- Why: The homepage is the first impression — it needs to pull real user stats, leaderboard data, and challenge info from the database
- Inputs: Authenticated user session, database queries (stats, leaderboard, challenges)
- Output: Server-rendered homepage with real data, responsive layout, and polished design
- Target files:
  - `src/app/(frontend)/page.tsx`
  - `src/app/(frontend)/layout.tsx`
  - `src/components/frontend/top-nav.tsx`
  - `src/components/frontend/bottom-nav.tsx`
- Constraints:
  - Use `cn()` for class names
  - Keep server component by default
- Acceptance criteria:
  - [ ] Hero section shows real user level, XP, streak from database
  - [ ] Quick stats pull live data (correct answers, active users, total challenges, languages)
  - [ ] Leaderboard section shows real top 5 players
  - [ ] CTA links work and route correctly
  - [ ] Responsive layout works on mobile and desktop
  - [ ] Loading/empty states handled gracefully
- Validation:
  - [ ] `bun run lint`
  - [ ] manual check: homepage renders at `/` with real data
  - [ ] manual check: mobile nav and layout
- Notes:
  - Currently uses mock data from `/constants/mock-codewar`
  - TopNav (desktop) and BottomNav (mobile) already exist
  - Shadcn/ui + Tabler Icons in use

## Dependencies

- Database and auth must be set up (see `tasks/setup-database-and-auth/`)
- User session/auth context must be available server-side

## Open Questions

- Should we show a different homepage for unauthenticated users?
- What specific stats should the "Quick Stats" section display?
- Should leaderboard be global or filtered by organization?
