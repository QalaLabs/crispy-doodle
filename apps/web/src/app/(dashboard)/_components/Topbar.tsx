'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface TopbarProps {
  title?: string
}

export default function Topbar({ title }: TopbarProps) {
  const { data: session } = useSession()
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-sm border-b border-stone-100 px-4 lg:px-8 h-14 flex items-center justify-between">
      <div>
        {title ? (
          <h1 className="text-base font-semibold text-stone-800">{title}</h1>
        ) : (
          <p className="text-sm text-stone-600">
            {greeting},{' '}
            <span className="font-medium text-stone-800">
              {session?.user?.name?.split(' ')[0] ?? 'friend'}
            </span>
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/shop"
          className="text-xs font-medium text-brand-600 border border-brand-200 rounded-lg px-3 py-1.5 hover:bg-brand-50 transition hidden sm:block"
        >
          Shop
        </Link>
        <Link href="/dashboard/settings">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-sm font-semibold">
            {session?.user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
        </Link>
      </div>
    </header>
  )
}
