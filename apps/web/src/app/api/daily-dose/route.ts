import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@aumveda/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const now = new Date()

  // Fetch active doses published up to now
  const doses = await prisma.dailyDose.findMany({
    where: { isActive: true, publishDate: { lte: now } },
    orderBy: { publishDate: 'desc' },
    take: 6,
    select: { id: true, title: true, promptText: true, durationSec: true, audioKey: true },
  })

  // Fetch today's completions for this user
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const completions = await prisma.dailyDoseCompletion.findMany({
    where: {
      userId,
      doseId: { in: doses.map(d => d.id) },
    },
    select: { doseId: true },
  })

  const completedIds = new Set(completions.map(c => c.doseId))

  const result = doses.map(d => ({
    id: String(d.id),
    title: d.title,
    description: d.promptText,
    duration: `${Math.floor(d.durationSec / 60)}:${String(d.durationSec % 60).padStart(2, '0')} min`,
    completed: completedIds.has(d.id),
  }))

  return NextResponse.json({ success: true, doses: result })
}
