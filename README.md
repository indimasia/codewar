<h1 align="center">CodeWar</h1>

<div align="center">AI-powered daily coding challenge platform — solve challenges, earn XP, and climb the leaderboard.</div>

<br />

<div align="center">
  <img src="/public/codewar-banner.png" alt="CodeWar Cover" style="max-width: 100%; border-radius: 8px;" />
</div>

## Overview

**CodeWar** is a gamified coding challenge platform built on **Next.js 16**. Every day, Claude AI generates fresh challenges for each combination of programming language and difficulty level. Users solve problems, accumulate XP, and compete on a global leaderboard.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Shadcn UI |
| Database | PostgreSQL via [Neon](https://neon.tech) + [Drizzle ORM](https://orm.drizzle.team) |
| Auth | Custom JWT (jose + bcryptjs) — httpOnly cookie |
| AI | [Anthropic Claude](https://anthropic.com) (claude-haiku-4-5) for challenge generation |
| Error Tracking | Sentry (optional) |
| Linting | ESLint + Prettier + Husky pre-commit hooks |

## Features

- **Daily Challenge** — fresh AI-generated problems every day, per language & difficulty
- **Leaderboard** — global ranking with Time Period, Difficulty, and Language filters
- **XP & Level System** — complete challenges to earn XP and level up
- **Custom Auth** — register/login with username & password, session via JWT cookie
- **Streak Tracking** — track your daily consistency

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — user stats, mini leaderboard, daily challenge shortcut |
| `/login` | Sign in with username & password |
| `/signup` | Create a new account |
| `/challenges` | Pick a language + difficulty and start today's challenge |
| `/leaderboard` | Global leaderboard with filters |
| `/achievements` | Achievements & badges |
| `/rewards` | Claimable rewards |
| `/profile` | User profile — XP, level, stats, badges |

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public pages (home, challenges, leaderboard, etc.)
│   └── api/
│       ├── auth/            # login, register, logout, me
│       ├── challenges/      # GET challenge, POST submit
│       ├── languages/       # List of programming languages
│       ├── leaderboard/     # Leaderboard with filters
│       └── user/stats/      # Stats for the logged-in user
├── components/
│   ├── frontend/            # TopNav, BottomNav
│   └── ui/                  # Shadcn components
└── lib/
    ├── auth.ts              # JWT utils (createToken, verify, cookie)
    ├── auth-context.tsx     # React context for auth state
    ├── ai-challenge.ts      # Challenge generation via Anthropic SDK
    └── db/
        ├── index.ts         # Drizzle + Neon connection
        ├── schema.ts        # Table definitions
        └── queries.ts       # Query helpers
```

## Getting Started

### 1. Clone & install

```bash
git clone <repo-url>
cd codewar
bun install   # or npm install
```

### 2. Set up environment

```bash
cp env.example.txt .env
```

Fill in `.env`:

```env
# Neon PostgreSQL — create a free project at https://neon.tech
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# JWT secret — generate with: openssl rand -base64 32
JWT_SECRET=your-secret-key

# Anthropic API key — https://console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-...
```

> Sentry variables (`NEXT_PUBLIC_SENTRY_DSN`, etc.) are optional for error tracking.

### 3. Push database schema

```bash
bun run db:push       # Create all tables in Neon
bun run db:studio     # (optional) open Drizzle Studio to inspect data
```

### 4. Seed initial data

```bash
bun run scripts/seed-languages.ts   # Populate languages & categories tables
```

### 5. Run the dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database Scripts

| Command | Description |
|---|---|
| `bun run db:push` | Sync schema to database (development) |
| `bun run db:generate` | Generate migration files |
| `bun run db:migrate` | Run migrations |
| `bun run db:studio` | Open Drizzle Studio (database GUI) |

## How Challenges Work

1. User opens `/challenges`, selects a language & difficulty
2. System checks if today's challenge already exists in the DB
3. If not → Claude AI generates 5 new multiple-choice questions, saved to DB
4. If yes → served from cache (no API call needed)
5. User submits answers → XP calculated and saved to `challenge_attempts` and `user_stats`

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for challenge generation |
| `ANTHROPIC_BASE_URL` | No | Custom base URL (e.g. proxy) |
| `ANTHROPIC_MODEL` | No | Defaults to `claude-haiku-4-5-20251001` |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry DSN for error tracking |
| `SENTRY_AUTH_TOKEN` | No | Sentry auth token for source maps |
