/**
 * DEV-ONLY: Auto-login as a test user for preview purposes.
 * Disabled in production.
 */
import { NextResponse } from 'next/server'
import { prisma } from '@aumveda/db'
import { randomBytes } from 'crypto'

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    // Upsert dev user (no nested creates on update to avoid conflicts)
    let user = await prisma.user.findUnique({ where: { email: 'dev@aumveda.com' } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'dev@aumveda.com',
          name: 'Dev User',
          emailVerified: new Date(),
          role: 'user',
        },
      })
    }

    // Upsert profile separately
    await prisma.profile.upsert({
      where: { userId: user.id },
      create: { userId: user.id, timezone: 'Asia/Kolkata', onboardingDone: true, progress: 42, streakDays: 3 },
      update: { onboardingDone: true },
    })

    // Seed a sample journal if none exist
    const journalCount = await prisma.journal.count({ where: { userId: user.id } })
    if (journalCount === 0) {
      await prisma.journal.create({
        data: {
          userId: user.id,
          title: 'First reflection',
          body: 'Today I started my healing journey with Aumveda. I feel a quiet sense of hope.',
          mood: 4,
          tags: ['gratitude', 'hope'],
        },
      })
      await prisma.achievement.upsert({
        where: { userId_key: { userId: user.id, key: 'FIRST_JOURNAL' } },
        create: { userId: user.id, key: 'FIRST_JOURNAL' },
        update: {},
      })
    }

    // Create a NextAuth database session
    const sessionToken = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    await prisma.session.create({ data: { sessionToken, userId: user.id, expires } })

    // Return token as JSON so the client can set the cookie and navigate
    return NextResponse.json({ sessionToken, ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
