import type { ReactNode } from 'react'

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-brand-700 tracking-wide">Aumveda</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-parchment-200 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
