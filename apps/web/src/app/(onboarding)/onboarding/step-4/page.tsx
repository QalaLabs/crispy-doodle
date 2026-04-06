'use client'

import { useRouter } from 'next/navigation'
import StepIndicator from '../_components/StepIndicator'

export default function OnboardingStep4() {
  const router = useRouter()

  async function handleOptIn() {
    await fetch('/api/users/me/consents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'health_sync', value: true, version: 'v1' }),
    })
    await completeOnboarding()
  }

  async function handleSkip() {
    await fetch('/api/users/me/consents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'health_sync', value: false, version: 'v1' }),
    })
    await completeOnboarding()
  }

  async function completeOnboarding() {
    await fetch('/api/users/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ onboardingDone: true }),
    })
    router.push('/dashboard')
  }

  return (
    <>
      <StepIndicator current={4} total={4} />
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">🌿</div>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">Connect your health data</h2>
        <p className="text-sm text-stone-500">
          Sync sleep and activity from Google Fit to unlock your full progress score.
          Your data stays private and is encrypted at rest.
        </p>
      </div>

      <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 mb-6 text-sm text-sage-800">
        <p className="font-medium mb-1">What we access:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Sleep duration and quality</li>
          <li>Steps and workout minutes</li>
        </ul>
        <p className="text-xs text-stone-400 mt-2">We never access heart rate, location, or personal health records.</p>
      </div>

      <button
        onClick={handleOptIn}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-2.5 text-sm font-medium transition mb-3"
      >
        Connect Google Fit
      </button>
      <button
        onClick={handleSkip}
        className="w-full text-center text-sm text-stone-400 hover:text-stone-600"
      >
        Skip for now
      </button>
    </>
  )
}
