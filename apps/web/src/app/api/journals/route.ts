import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@aumveda/db'
import { z } from 'zod'

const createSchema = z.object({
  title: z.string().max(200).nullable().optional(),
  body: z.string().min(1).max(10000),
  mood: z.number().int().min(1).max(5).nullable().optional(),
  tags: z.array(z.string().max(30)).max(5).optional(),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const journals = await prisma.journal.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, mood: true, createdAt: true },
  })

  return NextResponse.json({ ok: true, data: journals })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 })
  }

  const journal = await prisma.journal.create({
    data: {
      userId: session.user.id,
      title: parsed.data.title ?? null,
      body: parsed.data.body,
      mood: parsed.data.mood ?? null,
      tags: parsed.data.tags ?? [],
    },
    select: { id: true, title: true, createdAt: true },
  })

  // Fire achievement check in background (Phase 5 will handle this fully)
  prisma.event.create({
    data: {
      userId: session.user.id,
      eventName: 'journal.created',
      payload: { journalId: journal.id },
      source: 'server',
    },
  }).catch(() => null)

  return NextResponse.json({ ok: true, data: journal }, { status: 201 })
}
