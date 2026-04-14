import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@aumveda/db'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  tool: z.string().optional(),
  result: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 })
  }

  const { name, email, tool, result, source } = parsed.data

  await prisma.event.create({
    data: {
      eventName: 'lead_magnet',
      payload: { name, email, tool: tool ?? 'unknown', result: result ?? '', source: source ?? 'tool_page' },
      source: 'server',
    },
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
