import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@aumveda/db'
import Topbar from '../_components/Topbar'
import ProgressRing from './_components/ProgressRing'
import QuickActions from './_components/QuickActions'
import RecentJournals from './_components/RecentJournals'
import TodayDoseCard from './_components/TodayDoseCard'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/auth/login')

  const [profile, recentJournals, todayDose] = await Promise.all([
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { progress: true, streakDays: true, onboardingDone: true },
    }),
    prisma.journal.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: { id: true, title: true, mood: true, createdAt: true },
    }),
    prisma.dailyDose.findFirst({
      where: { isActive: true, publishDate: { lte: new Date() } },
      orderBy: { publishDate: 'desc' },
      select: { id: true, title: true, durationSec: true, promptText: true },
    }),
  ])

  if (profile && !profile.onboardingDone) redirect('/onboarding/step-1')

  const progressScore = profile?.progress ?? 0
  const streakDays = profile?.streakDays ?? 0

  return (
    <>
      <Topbar />
      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto space-y-6">

        {/* Hero row — progress + streak */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="col-span-2 bg-white rounded-2xl p-5 border border-stone-100 flex items-center gap-5">
            <ProgressRing score={progressScore} />
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wide">Progress score</p>
              <p className="text-3xl font-semibold text-stone-800 mt-0.5">{progressScore}</p>
              <p className="text-xs text-stone-400 mt-1">out of 100</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-100 flex flex-col justify-between">
            <p className="text-xs text-stone-400 uppercase tracking-wide">Streak</p>
            <div>
              <p className="text-3xl font-semibold text-brand-600">{streakDays}</p>
              <p className="text-xs text-stone-400">days</p>
            </div>
            <p className="text-lg">🔥</p>
          </div>

          <div className="bg-brand-500 rounded-2xl p-5 flex flex-col justify-between">
            <p className="text-xs text-brand-200 uppercase tracking-wide">Today</p>
            <p className="text-sm font-medium text-white leading-snug">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
            <p className="text-2xl">🌿</p>
          </div>
        </div>

        {/* Today's Dose */}
        {todayDose && <TodayDoseCard dose={todayDose} userId={session.user.id} />}

        {/* Quick actions */}
        <QuickActions />

        {/* Recent journals */}
        {recentJournals.length > 0 && (
          <RecentJournals journals={recentJournals} />
        )}
      </div>
    </>
  )
}
