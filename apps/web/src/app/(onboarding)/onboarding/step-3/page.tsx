'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StepIndicator from '../_components/StepIndicator'

interface ConsentToggleProps {
  id: string
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ConsentToggle({ id, label, description, checked, onChange }: ConsentToggleProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-4 cursor-pointer group py-3">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <div
          className={`w-10 h-6 rounded-full transition-colors ${
            checked ? 'bg-brand-500' : 'bg-stone-200'
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              checked ? 'translate-x-4' : ''
            }`}
          />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-stone-700">{label}</p>
        <p className="text-xs text-stone-400 mt-0.5">{description}</p>
      </div>
    </label>
  )
}

export default function OnboardingStep3() {
  const router = useRouter()
  const [tracking, setTracking] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleNext() {
    setLoading(true)
    const consents = [
      { key: 'tracking', value: tracking },
      { key: 'marketing', value: marketing },
    ]
    await Promise.all(
      consents.map(c =>
        fetch('/api/users/me/consents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: c.key, value: c.value, version: 'v1' }),
        })
      )
    )
    setLoading(false)
    router.push('/onboarding/step-4')
  }

  return (
    <>
      <StepIndicator current={3} total={4} />
      <h2 className="text-xl font-semibold text-stone-800 mb-1">Your privacy, your choice</h2>
      <p className="text-sm text-stone-500 mb-6">
        We will never sell your data. These settings can be changed anytime in Settings.
      </p>

      <div className="divide-y divide-stone-100 mb-8">
        <ConsentToggle
          id="consent-tracking"
          label="Usage analytics"
          description="Helps us improve the app. No personal data is shared with third parties."
          checked={tracking}
          onChange={setTracking}
        />
        <ConsentToggle
          id="consent-marketing"
          label="Helpful emails"
          description="Occasional tips, new features, and offers — no spam, ever."
          checked={marketing}
          onChange={setMarketing}
        />
      </div>

      <button
        onClick={handleNext}
        disabled={loading}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-2.5 text-sm font-medium transition disabled:opacity-50"
      >
        {loading ? 'Saving…' : 'Continue'}
      </button>
    </>
  )
}
