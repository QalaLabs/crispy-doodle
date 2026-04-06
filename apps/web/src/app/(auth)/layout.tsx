import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-brand-700 tracking-wide">Aumveda</h1>
          <p className="text-sm text-stone-500 mt-1">Your healing journey begins here</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-parchment-200 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
