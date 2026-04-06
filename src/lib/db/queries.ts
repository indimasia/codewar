import { count, desc, eq, sql, sum } from 'drizzle-orm';
import { db } from '.';
import {
  challengeAttempts,
  challenges,
  languages,
  users,
  userStats
} from './schema';

// ── Homepage: current user with stats ──
export async function getUserWithStats(userId: string) {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      totalXp: userStats.totalXp,
      challengesSolved: userStats.challengesSolved,
      streak: userStats.streak,
      lastActiveDate: userStats.lastActiveDate
    })
    .from(users)
    .leftJoin(userStats, eq(userStats.userId, users.id))
    .where(eq(users.id, userId))
    .limit(1);

  if (!result[0]) return null;

  const row = result[0];

  // Compute rank (position among all users by XP)
  const rankResult = await db
    .select({ rank: count() })
    .from(userStats)
    .where(sql`${userStats.totalXp} > ${row.totalXp ?? 0}`);

  const rank = (rankResult[0]?.rank ?? 0) + 1;
  const totalXp = row.totalXp ?? 0;
  const level = Math.floor(totalXp / 500) + 1;

  return {
    id: row.id,
    username: row.username,
    totalXp,
    level,
    challengesSolved: row.challengesSolved ?? 0,
    streak: row.streak ?? 0,
    rank
  };
}

// ── Homepage: platform-wide stats ──
export async function getPlatformStats() {
  const [correctResult, usersResult, challengesResult] = await Promise.all([
    db
      .select({ total: sum(challengeAttempts.correctCount) })
      .from(challengeAttempts),
    db.select({ total: count() }).from(users),
    db.select({ total: count() }).from(challenges)
  ]);

  return {
    correctAnswers: Number(correctResult[0]?.total ?? 0),
    totalUsers: Number(usersResult[0]?.total ?? 0),
    totalChallenges: Number(challengesResult[0]?.total ?? 0)
  };
}

// ── Homepage: leaderboard top N ──
export async function getLeaderboard(limit = 5) {
  const rows = await db
    .select({
      userId: users.id,
      username: users.username,
      totalXp: userStats.totalXp,
      challengesSolved: userStats.challengesSolved
    })
    .from(userStats)
    .innerJoin(users, eq(users.id, userStats.userId))
    .orderBy(desc(userStats.totalXp))
    .limit(limit);

  return rows.map((row, i) => ({
    rank: i + 1,
    userId: row.userId,
    username: row.username,
    totalXp: row.totalXp,
    level: Math.floor(row.totalXp / 500) + 1,
    challengesSolved: row.challengesSolved
  }));
}

// ── Homepage: all languages ──
export async function getLanguages() {
  const rows = await db
    .select({ name: languages.name })
    .from(languages)
    .orderBy(languages.name);

  return rows.map((r) => r.name);
}
