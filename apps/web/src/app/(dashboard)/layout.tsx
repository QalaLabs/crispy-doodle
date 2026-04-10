import type { ReactNode } from 'react'
import Navigation from '@/components/Navigation'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop sidebar / Mobile bottom nav */}
      <Navigation />
      {/* Main content — offset by sidebar on md+, pb for mobile nav */}
      <main className="flex-1 pb-20 md:pb-0 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
