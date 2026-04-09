import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@aumveda/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { name, payload } = body

  if (!name) return NextResponse.json({ error: 'Missing event name' }, { status: 400 })

  await prisma.event.create({
    data: {
      userId: session.user.id,
      eventName: String(name),
      payload: payload ?? {},
      source: 'client',
    },
  })

  return NextResponse.json({ success: true })
}
