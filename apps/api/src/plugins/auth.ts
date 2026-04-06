import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { prisma } from '@aumveda/db'

declare module 'fastify' {
  interface FastifyRequest {
    sessionUser: {
      id: string
      email: string
      role: string
    } | null
  }
}

/**
 * Verifies a NextAuth session token by looking it up in the DB.
 * NextAuth stores session tokens in the `Session` table when strategy = "database".
 * The token arrives in the `next-auth.session-token` cookie.
 */
const authPlugin: FastifyPluginAsync = async (app) => {
  app.decorateRequest('sessionUser', null)

  app.addHook('preHandler', async (request: FastifyRequest) => {
    const token =
      request.cookies['next-auth.session-token'] ??
      request.cookies['__Secure-next-auth.session-token']

    if (!token) return

    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      select: {
        expires: true,
        user: { select: { id: true, email: true, role: true } },
      },
    })

    if (!session || session.expires < new Date()) return

    request.sessionUser = session.user
  })
}

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.sessionUser) {
    reply.status(401).send({ ok: false, error: 'Unauthorized' })
  }
}

export const requireAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.sessionUser) {
    reply.status(401).send({ ok: false, error: 'Unauthorized' })
    return
  }
  if (request.sessionUser.role !== 'admin') {
    reply.status(403).send({ ok: false, error: 'Forbidden' })
  }
}

export default fp(authPlugin, { name: 'auth' })
