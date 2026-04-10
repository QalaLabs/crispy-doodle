import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@aumveda/db'

/**
 * Returns a real NextAuth session in production.
 * In development, auto-logs in as the dev@aumveda.com user (no password needed).
 * Always redirects to /auth/login if no session can be established.
 */
export async function requireSession() {
  if (process.env.NODE_ENV !== 'production' && process.env.DEV_BYPASS === 'true') {
    // Look up (or create) the dev user and return a mock session
    let user = await prisma.user.findUnique({ where: { email: 'dev@aumveda.com' } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'dev@aumveda.com',
          name: 'Dev User',
          emailVerified: new Date(),
          role: 'user',
          profile: {
            create: {
              timezone: 'Asia/Kolkata',
              onboardingDone: true,
              progress: 42,
              streakDays: 3,
            },
          },
        },
      })
      // Seed a sample journal
      await prisma.journal.create({
        data: {
          userId: user.id,
          title: 'First reflection',
          body: 'Today I started my healing journey with Aumveda. I feel a quiet sense of hope.',
          mood: 4,
          tags: ['gratitude', 'hope'],
        },
      }).catch(() => null)
      await prisma.achievement.upsert({
        where: { userId_key: { userId: user.id, key: 'FIRST_JOURNAL' } },
        create: { userId: user.id, key: 'FIRST_JOURNAL' },
        update: {},
      }).catch(() => null)
    } else {
      // Ensure profile exists
      await prisma.profile.upsert({
        where: { userId: user.id },
        create: { userId: user.id, timezone: 'Asia/Kolkata', onboardingDone: true, progress: 42, streakDays: 3 },
        update: {},
      })
    }

    return {
      user: {
        id: user.id,
        email: user.email!,
        name: user.name ?? 'Dev User',
        role: (user.role ?? 'user') as 'user' | 'admin',
      },
      expires: new Date(Date.now() + 86400_000).toISOString(),
    }
  }

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/auth/login')
  return session
}
