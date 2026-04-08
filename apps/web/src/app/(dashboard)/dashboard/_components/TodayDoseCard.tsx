import Link from 'next/link'

interface Props {
  dose: { id: number; title: string; durationSec: number; promptText: string }
  userId: string
}

export default function TodayDoseCard({ dose }: Props) {
  const mins = Math.floor(dose.durationSec / 60)
  const secs = dose.durationSec % 60

  return (
    <div className="bg-gradient-to-br from-brand-50 to-parchment border border-brand-100 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-brand-500 font-medium uppercase tracking-wide mb-1">Today&apos;s Daily Dose</p>
          <h3 className="text-base font-semibold text-stone-800">{dose.title}</h3>
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">{dose.promptText}</p>
          <p className="text-xs text-stone-400 mt-2">
            {mins}:{secs.toString().padStart(2, '0')} min
          </p>
        </div>
        <Link
          href="/dashboard/dose"
          className="flex-shrink-0 w-12 h-12 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
