'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function MagicLinkPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn('email', { email, redirect: false, callbackUrl: '/dashboard' })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center space-y-3">
        <div className="text-4xl">📬</div>
        <h2 className="text-xl font-semibold text-stone-800">Check your inbox</h2>
        <p className="text-sm text-stone-500">
          A sign-in link has been sent to <span className="font-medium text-stone-700">{email}</span>.
          The link expires in 24 hours.
        </p>
        <Link href="/auth/login" className="block text-sm text-brand-600 hover:underline mt-4">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-stone-800 mb-2">Sign in with email</h2>
      <p className="text-sm text-stone-500 mb-6">
        We&apos;ll send a magic link to your inbox — no password needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-stone-600 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-2.5 text-sm font-medium transition disabled:opacity-50"
        >
          {loading ? 'Sending…' : 'Send magic link'}
        </button>
      </form>

      <p className="text-center text-sm text-stone-500 mt-6">
        <Link href="/auth/login" className="text-brand-600 hover:underline">
          Back to sign in
        </Link>
      </p>
    </>
  )
}
