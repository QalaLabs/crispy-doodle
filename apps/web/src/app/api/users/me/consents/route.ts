import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@aumveda/db'
import { z } from 'zod'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const consents = await prisma.consent.findMany({
    where: { userId: session.user.id },
    select: { key: true, value: true, version: true, updatedAt: true },
  })

  return NextResponse.json({ ok: true, data: consents })
}

const postSchema = z.object({
  key: z.enum(['tracking', 'health_sync', 'marketing', 'ai_personalization']),
  value: z.boolean(),
  version: z.string().default('v1'),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 })
  }

  const { key, value, version } = parsed.data

  const consent = await prisma.consent.upsert({
    where: { userId_key: { userId: session.user.id, key } },
    create: { userId: session.user.id, key, value, version },
    update: { value, version },
  })

  return NextResponse.json({ ok: true, data: consent })
}
