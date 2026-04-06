'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import StepIndicator from '../_components/StepIndicator'

const TIMEZONES = [
  'Asia/Kolkata',
  'Asia/Dubai',
  'Asia/Singapore',
  'Europe/London',
  'Europe/Paris',
  'America/New_York',
  'America/Los_Angeles',
  'Australia/Sydney',
]

export default function OnboardingStep1() {
  const { data: session } = useSession()
  const router = useRouter()
  const [name, setName] = useState(session?.user?.name ?? '')
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [loading, setLoading] = useState(false)

  async function handleNext(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/users/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, timezone }),
    })
    setLoading(false)
    router.push('/onboarding/step-2')
  }

  return (
    <>
      <StepIndicator current={1} total={4} />
      <h2 className="text-xl font-semibold text-stone-800 mb-1">Tell us about yourself</h2>
      <p className="text-sm text-stone-500 mb-6">
        This helps us personalise your healing experience.
      </p>
      <form onSubmit={handleNext} className="space-y-4">
        <div>
          <label className="block text-sm text-stone-600 mb-1" htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="How should we address you?"
          />
        </div>
        <div>
          <label className="block text-sm text-stone-600 mb-1" htmlFor="timezone">Timezone</label>
          <select
            id="timezone"
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
          >
            {TIMEZONES.map(tz => (
              <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-2.5 text-sm font-medium transition disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Continue'}
        </button>
      </form>
    </>
  )
}
