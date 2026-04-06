import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import authPlugin from './plugins/auth'

const app = Fastify({
  logger: {
    transport:
      process.env.NODE_ENV === 'development'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
})

async function bootstrap() {
  // ── Security ──────────────────────────────────────────────────────────────
  await app.register(helmet, {
    contentSecurityPolicy: false, // managed by Next.js frontend
  })

  await app.register(cors, {
    origin: [
      process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
      process.env.ADMIN_URL ?? 'http://localhost:3002',
    ],
    credentials: true,
  })

  await app.register(cookie, {
    secret: process.env.NEXTAUTH_SECRET ?? 'dev-cookie-secret',
  })

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })

  // ── Auth plugin (session verification from NextAuth DB) ───────────────────
  await app.register(authPlugin)

  // ── Health check ──────────────────────────────────────────────────────────
  app.get('/api/health', async () => ({ status: 'ok', ts: new Date().toISOString() }))

  // ── Routes (registered per phase) ────────────────────────────────────────
  // Phase 1: Auth & Consent
  // Phase 3: Journals
  // Phase 4: Daily Dose
  // Phase 5: Progress & Achievements
  // Phase 6: E-Commerce & Cashfree
  // Phase 7: GTM relay
  // Phase 8: Courses
  // Phase 9: AI Tips
  // Phase 10: Health Sync

  // ── Start server ─────────────────────────────────────────────────────────
  const port = Number(process.env.PORT ?? 3001)
  const host = process.env.HOST ?? '0.0.0.0'

  await app.listen({ port, host })
  console.log(`🚀 API server running on http://${host}:${port}`)
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
