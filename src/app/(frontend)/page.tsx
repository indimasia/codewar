import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAuthFromCookie } from '@/lib/auth';
import {
  getLanguages,
  getLeaderboard,
  getPlatformStats,
  getUserWithStats
} from '@/lib/db/queries';
import { cn } from '@/lib/utils';
import {
  IconFlame,
  IconUsers,
  IconTarget,
  IconChevronRight,
  IconSwords,
  IconTrophy,
  IconCheck,
  IconCode
} from '@tabler/icons-react';
import Link from 'next/link';

export default async function HomePage() {
  const auth = await getAuthFromCookie();

  const [currentUser, platformStats, leaderboard, languageNames] =
    await Promise.all([
      auth ? getUserWithStats(auth.userId) : null,
      getPlatformStats(),
      getLeaderboard(5),
      getLanguages()
    ]);

  const xpToNextLevel = 500;
  const xpInLevel = currentUser ? currentUser.totalXp % xpToNextLevel : 0;
  const xpProgress = (xpInLevel / xpToNextLevel) * 100;

  return (
    <div className='space-y-6'>
      {/* Hero */}
      {currentUser ? (
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 p-6 text-white'>
          <div className='absolute -top-10 -right-10 size-40 rounded-full bg-white/10 blur-2xl' />
          <div className='absolute -bottom-10 -left-10 size-32 rounded-full bg-white/10 blur-2xl' />
          <div className='relative'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-14 ring-2 ring-white/30'>
                <AvatarFallback>
                  {currentUser.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className='text-xl font-bold'>
                  Hey, {currentUser.username}!
                </h1>
                <p className='text-sm text-white/80'>
                  Level {currentUser.level} Warrior
                </p>
              </div>
            </div>

            <div className='mt-4 space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-white/80'>
                  {xpInLevel} / {xpToNextLevel} XP to Level{' '}
                  {currentUser.level + 1}
                </span>
                <span className='font-bold'>
                  {currentUser.totalXp.toLocaleString()} XP
                </span>
              </div>
              <div className='h-2.5 overflow-hidden rounded-full bg-white/20'>
                <div
                  className='h-full rounded-full bg-white transition-all'
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>

            <div className='mt-4 flex gap-4'>
              <div className='flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium'>
                <IconFlame className='size-4' />
                {currentUser.streak} day streak
              </div>
              <div className='flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium'>
                <IconTrophy className='size-4' />
                Rank #{currentUser.rank}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 p-6 text-white'>
          <div className='absolute -top-10 -right-10 size-40 rounded-full bg-white/10 blur-2xl' />
          <div className='absolute -bottom-10 -left-10 size-32 rounded-full bg-white/10 blur-2xl' />
          <div className='relative text-center'>
            <IconSwords className='mx-auto size-10' />
            <h1 className='mt-3 text-2xl font-bold'>Welcome to CodeWar</h1>
            <p className='mt-1 text-sm text-white/80'>
              Test your coding skills. Compete with others.
            </p>
            <Link
              href='/login'
              className='mt-4 inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-violet-600 transition-colors hover:bg-white/90'
            >
              Sign In to Get Started
            </Link>
          </div>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-xl border bg-gradient-to-br from-green-50 to-green-100/50 p-4 dark:from-green-950/30 dark:to-green-900/20'>
          <IconCheck className='size-6 text-green-500' />
          <p className='mt-2 text-2xl font-bold'>
            {platformStats.correctAnswers.toLocaleString()}
          </p>
          <p className='text-muted-foreground text-xs'>Correct Answers</p>
        </div>
        <div className='rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 dark:from-blue-950/30 dark:to-blue-900/20'>
          <IconUsers className='size-6 text-blue-500' />
          <p className='mt-2 text-2xl font-bold'>
            {platformStats.totalUsers.toLocaleString()}
          </p>
          <p className='text-muted-foreground text-xs'>Total Warriors</p>
        </div>
        <div className='rounded-xl border bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 dark:from-purple-950/30 dark:to-purple-900/20'>
          <IconTarget className='size-6 text-purple-500' />
          <p className='mt-2 text-2xl font-bold'>
            {platformStats.totalChallenges}
          </p>
          <p className='text-muted-foreground text-xs'>Challenges</p>
        </div>
        {/* Languages card */}
        <div className='rounded-xl border bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 dark:from-orange-950/30 dark:to-orange-900/20'>
          <IconCode className='size-6 text-orange-500' />
          {languageNames.length > 0 ? (
            <>
              <div className='mt-2 flex flex-wrap gap-1'>
                {languageNames.slice(0, 5).map((lang) => (
                  <span
                    key={lang}
                    className='rounded bg-orange-200/60 px-1.5 py-0.5 text-[9px] font-semibold text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'
                  >
                    {lang}
                  </span>
                ))}
                {languageNames.length > 5 && (
                  <span className='text-muted-foreground text-[9px] leading-5 font-medium'>
                    +{languageNames.length - 5}
                  </span>
                )}
              </div>
              <p className='text-muted-foreground mt-1 text-xs'>Languages</p>
            </>
          ) : (
            <>
              <p className='mt-2 text-2xl font-bold'>--</p>
              <p className='text-muted-foreground text-xs'>Languages</p>
            </>
          )}
        </div>
      </div>

      {/* Quick Action */}
      <Link href='/challenges'>
        <div className='flex items-center justify-between rounded-xl border-2 border-dashed border-violet-300 bg-violet-50 p-4 transition-colors hover:border-violet-400 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/30 dark:hover:border-violet-700'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-lg bg-violet-500'>
              <IconSwords className='size-5 text-white' />
            </div>
            <div>
              <p className='font-semibold'>Ready for a challenge?</p>
              <p className='text-muted-foreground text-sm'>
                Pick a language & difficulty
              </p>
            </div>
          </div>
          <IconChevronRight className='text-muted-foreground size-5' />
        </div>
      </Link>

      {/* Top Players */}
      <section>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-lg font-bold'>Top Warriors</h2>
          <Link
            href='/leaderboard'
            className='text-primary text-sm font-medium'
          >
            Full board
          </Link>
        </div>
        {leaderboard.length > 0 ? (
          <div className='space-y-2'>
            {leaderboard.map((entry) => (
              <div
                key={entry.userId}
                className={cn(
                  'hover:bg-accent/50 flex items-center gap-3 rounded-xl border p-3 transition-colors',
                  currentUser &&
                    entry.userId === currentUser.id &&
                    'border-primary/40 bg-primary/5'
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    entry.rank === 1 &&
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
                    entry.rank === 2 &&
                      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
                    entry.rank === 3 &&
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400',
                    entry.rank > 3 && 'bg-muted text-muted-foreground'
                  )}
                >
                  {entry.rank}
                </span>
                <Avatar className='size-8'>
                  <AvatarFallback>
                    {entry.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    {entry.username}
                    {currentUser && entry.userId === currentUser.id && (
                      <span className='ml-1.5 text-xs text-violet-500'>
                        you
                      </span>
                    )}
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    Lvl {entry.level}
                  </p>
                </div>
                <p className='text-sm font-semibold'>
                  {entry.totalXp.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm'>
            No warriors yet. Be the first to compete!
          </div>
        )}
      </section>
    </div>
  );
}
