// ─── Event Envelope ───────────────────────────────────────────────────────────
export interface EventEnvelope {
  event_id: string
  event_name: EventName
  user_id?: string
  source: 'client' | 'server'
  timestamp: string // ISO 8601
  payload: Record<string, unknown>
}

export type EventName =
  | 'journal.created'
  | 'journal.edited'
  | 'journal.deleted'
  | 'daily_dose.shown'
  | 'daily_dose.completed'
  | 'purchase'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'sign_up'
  | 'login'
  | 'page_view'
  | 'ai.tips.generated'
  | 'health_sync.completed'
  | 'cashfree.webhook.unknown'
  | 'cashfree.payment.CANCELLED'
  | 'cashfree.payment.FAILED'
  | 'refund.issued'
  | 'course.enrolled'
  | 'course.module.completed'

// ─── API Response wrapper ─────────────────────────────────────────────────────
export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface ApiError {
  ok: false
  error: string
  code?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

// ─── Achievement keys ─────────────────────────────────────────────────────────
export type AchievementKey =
  | 'FIRST_JOURNAL'
  | '7_DAY_STREAK'
  | '30_DAY_STREAK'
  | 'SLEEP_IMPROVED'
  | 'PROGRESS_50'
  | 'PROGRESS_75'
  | 'FIRST_PURCHASE'
  | 'COURSE_COMPLETE'

export const ACHIEVEMENT_META: Record<AchievementKey, { label: string; description: string; emoji: string }> = {
  FIRST_JOURNAL:    { label: 'First Words',       description: 'You wrote your first journal entry.',            emoji: '📝' },
  '7_DAY_STREAK':   { label: 'Week Warrior',       description: 'Completed daily dose 7 days in a row.',         emoji: '🔥' },
  '30_DAY_STREAK':  { label: 'Monthly Devotion',   description: 'Completed daily dose 30 days in a row.',        emoji: '🌙' },
  SLEEP_IMPROVED:   { label: 'Rest Restored',      description: 'Sleep score improved by 10+ points over 7 days.',emoji: '😴' },
  PROGRESS_50:      { label: 'Halfway Home',        description: 'Progress score reached 50 for the first time.', emoji: '⭐' },
  PROGRESS_75:      { label: 'Deep Healer',         description: 'Progress score reached 75 for the first time.', emoji: '✨' },
  FIRST_PURCHASE:   { label: 'Supporter',           description: 'Made your first purchase in the Aumveda shop.', emoji: '🛍️' },
  COURSE_COMPLETE:  { label: 'Course Graduate',    description: 'Completed all modules in a course.',            emoji: '🎓' },
}

// ─── Consent keys ─────────────────────────────────────────────────────────────
export type ConsentKey = 'tracking' | 'health_sync' | 'marketing' | 'ai_personalization'

// ─── Order status ─────────────────────────────────────────────────────────────
export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'FULFILLED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

// ─── NextAuth session extension ───────────────────────────────────────────────
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: 'user' | 'admin'
    }
  }
  interface User {
    role: 'user' | 'admin'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'user' | 'admin'
  }
}
