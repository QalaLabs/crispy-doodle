import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@aumveda/db'

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const doseId = parseInt(params.id, 10)
  if (isNaN(doseId)) {
    return NextResponse.json({ error: 'Invalid dose id' }, { status: 400 })
  }

  const userId = session.user.id

  // Check dose exists and is active
  const dose = await prisma.dailyDose.findFirst({
    where: { id: doseId, isActive: true },
    select: { id: true },
  })
  if (!dose) {
    return NextResponse.json({ error: 'Dose not found' }, { status: 404 })
  }

  // Upsert completion (idempotent)
  await prisma.dailyDoseCompletion.upsert({
    where: { userId_doseId: { userId, doseId } },
    create: { userId, doseId },
    update: {},
  })

  // Emit event
  await prisma.event.create({
    data: {
      userId,
      eventName: 'daily_dose.completed',
      payload: { doseId },
      source: 'server',
    },
  })

  // Recalculate progress inline (lightweight — full worker in Phase 5 background job)
  await recalculateProgress(userId)

  return NextResponse.json({ success: true })
}

async function recalculateProgress(userId: string) {
  try {
    const now = new Date()
    const sevenDaysAgo = new Date(now)
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // J_t: journals in last 7 days / 7
    const journalCount = await prisma.journal.count({
      where: { userId, isDeleted: false, createdAt: { gte: sevenDaysAgo } },
    })
    const J_t = (Math.min(journalCount, 7) / 7) * 100

    // W_t: average mood in last 7 journals × 10 (mood stored as 1-5, scale to 0-100)
    const journals = await prisma.journal.findMany({
      where: { userId, isDeleted: false, mood: { not: null } },
      orderBy: { createdAt: 'desc' },
      take: 7,
      select: { mood: true },
    })
    const avgMood = journals.length
      ? journals.reduce((s, j) => s + (j.mood ?? 3), 0) / journals.length
      : 3
    const W_t = avgMood * 20 // 1-5 × 20 = 0-100

    // S_t: default 50 until health sync available
    const S_t = 50

    // A_t: default 0 until health sync available
    const A_t = 0

    const P_t = 0.35 * S_t + 0.30 * A_t + 0.25 * J_t + 0.10 * W_t

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await prisma.progressSnapshot.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, score: P_t, sleepScore: S_t, activityScore: A_t, journalScore: J_t, wellbeingScore: W_t },
      update: { score: P_t, journalScore: J_t, wellbeingScore: W_t },
    })

    await prisma.profile.update({
      where: { userId },
      data: { progress: P_t },
    })

    // Check streak achievement
    await checkAchievements(userId)
  } catch {
    // Non-critical — don't fail the completion request
  }
}

async function checkAchievements(userId: string) {
  // 7_DAY_STREAK: completions on 7 distinct days in last 8 days
  const eightDaysAgo = new Date()
  eightDaysAgo.setDate(eightDaysAgo.getDate() - 8)
  eightDaysAgo.setHours(0, 0, 0, 0)

  const completions = await prisma.dailyDoseCompletion.findMany({
    where: { userId, completedAt: { gte: eightDaysAgo } },
    select: { completedAt: true },
  })

  const distinctDays = new Set(
    completions.map(c => c.completedAt.toISOString().slice(0, 10))
  )

  if (distinctDays.size >= 7) {
    await prisma.achievement.upsert({
      where: { userId_key: { userId, key: '7_DAY_STREAK' } },
      create: { userId, key: '7_DAY_STREAK' },
      update: {},
    })
  }

  // FIRST_JOURNAL
  const journalCount = await prisma.journal.count({ where: { userId, isDeleted: false } })
  if (journalCount >= 1) {
    await prisma.achievement.upsert({
      where: { userId_key: { userId, key: 'FIRST_JOURNAL' } },
      create: { userId, key: 'FIRST_JOURNAL' },
      update: {},
    })
  }
}
