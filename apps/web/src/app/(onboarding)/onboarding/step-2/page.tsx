'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StepIndicator from '../_components/StepIndicator'

const GOALS = [
  { id: 'sleep', label: 'Better sleep', emoji: '😴' },
  { id: 'stress', label: 'Reduce stress', emoji: '🧘' },
  { id: 'energy', label: 'More energy', emoji: '⚡' },
  { id: 'focus', label: 'Improve focus', emoji: '🎯' },
  { id: 'emotional', label: 'Emotional balance', emoji: '💛' },
  { id: 'spiritual', label: 'Spiritual growth', emoji: '✨' },
]

export default function OnboardingStep2() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function handleNext() {
    // Goals stored in profile metadata in future; skip API call for now
    router.push('/onboarding/step-3')
  }

  return (
    <>
      <StepIndicator current={2} total={4} />
      <h2 className="text-xl font-semibold text-stone-800 mb-1">What brings you here?</h2>
      <p className="text-sm text-stone-500 mb-6">Select all that resonate with you.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {GOALS.map(goal => (
          <button
            key={goal.id}
            type="button"
            onClick={() => toggle(goal.id)}
            className={`flex items-center gap-2 border rounded-xl px-4 py-3 text-sm text-left transition ${
              selected.includes(goal.id)
                ? 'border-brand-400 bg-brand-50 text-brand-700'
                : 'border-stone-200 hover:border-stone-300 text-stone-700'
            }`}
          >
            <span className="text-lg">{goal.emoji}</span>
            {goal.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-2.5 text-sm font-medium transition"
      >
        Continue
      </button>
      <button
        onClick={() => router.push('/onboarding/step-3')}
        className="w-full text-center text-sm text-stone-400 hover:text-stone-600 mt-3"
      >
        Skip
      </button>
    </>
  )
}
