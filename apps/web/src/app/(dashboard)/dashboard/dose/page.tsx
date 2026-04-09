import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@aumveda/db'
import Topbar from '../../_components/Topbar'
import DailyDoseList from '@/components/DailyDoseList'

export const metadata = { title: 'Daily Dose' }

export default async function DosePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/auth/login')

  const todayDose = await prisma.dailyDose.findFirst({
    where: { isActive: true, publishDate: { lte: new Date() } },
    orderBy: { publishDate: 'desc' },
    select: { id: true, title: true, promptText: true, durationSec: true, audioKey: true },
  })

  return (
    <>
      <Topbar title="Daily Dose" />
      <div className="px-4 lg:px-8 py-6 max-w-3xl mx-auto space-y-6">

        {todayDose && (
          <div className="bg-gradient-to-br from-brand-50 to-parchment border border-brand-100 rounded-2xl p-6">
            <p className="text-xs text-brand-500 font-medium uppercase tracking-wide mb-1">Today&apos;s Healing Audio</p>
            <h2 className="text-lg font-semibold text-stone-800 mb-2">{todayDose.title}</h2>
            <p className="text-sm text-stone-500 mb-4">{todayDose.promptText}</p>
            <p className="text-xs text-stone-400">
              {Math.floor(todayDose.durationSec / 60)}:{String(todayDose.durationSec % 60).padStart(2, '0')} min
            </p>
          </div>
        )}

        <DailyDoseList />
      </div>
    </>
  )
}
