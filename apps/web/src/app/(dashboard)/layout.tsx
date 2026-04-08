import type { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import MobileNav from './_components/MobileNav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <Sidebar />
      {/* Desktop: offset by sidebar width */}
      <div className="lg:pl-60">
        {/* Page content — pb-20 so mobile nav doesn't overlap */}
        <main className="pb-20 lg:pb-0 min-h-screen">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
