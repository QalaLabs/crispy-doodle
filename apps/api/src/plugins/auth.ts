import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'

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
 * Verifies a NextAuth JWT session (JWE) from the session cookie.
 * NextAuth v4 with strategy:'jwt' encrypts tokens using AES-GCM with a key
 * derived from NEXTAUTH_SECRET via HKDF. Uses dynamic imports for ESM-only deps.
 */
const authPlugin: FastifyPluginAsync = async (app) => {
  app.decorateRequest('sessionUser', null)

  app.addHook('preHandler', async (request: FastifyRequest) => {
    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) return

    const token =
      request.cookies['next-auth.session-token'] ??
      request.cookies['__Secure-next-auth.session-token']

    if (!token) return

    try {
      const { hkdf } = await import('@panva/hkdf')
      const { jwtDecrypt } = await import('jose')

      const encryptionKey = await hkdf('sha256', secret, '', 'NextAuth.js Generated Encryption Key', 32)
      const { payload } = await jwtDecrypt(token, encryptionKey, { clockTolerance: 15 })

      if (payload.sub && payload.email) {
        request.sessionUser = {
          id: payload.sub,
          email: payload.email as string,
          role: (payload.role as string) ?? 'user',
        }
      }
    } catch {
      // Invalid or expired token — leave sessionUser as null
    }
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
