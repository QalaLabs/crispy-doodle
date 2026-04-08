import Link from 'next/link'

const ACTIONS = [
  {
    href: '/dashboard/journal/new',
    label: 'Write in journal',
    description: 'Reflect on your day',
    emoji: '📝',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    href: '/dashboard/dose',
    label: 'Play daily dose',
    description: 'Your healing audio',
    emoji: '🎧',
    bg: 'bg-sage-50',
    border: 'border-sage-100',
  },
  {
    href: '/dashboard/learn',
    label: 'Continue learning',
    description: 'Pick up where you left off',
    emoji: '📖',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    href: '/shop',
    label: 'Visit the shop',
    description: 'Crystals, journals & more',
    emoji: '🛍️',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
]

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">Quick actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ACTIONS.map(({ href, label, description, emoji, bg, border }) => (
          <Link
            key={href}
            href={href}
            className={`${bg} border ${border} rounded-2xl p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow`}
          >
            <span className="text-2xl">{emoji}</span>
            <div>
              <p className="text-sm font-medium text-stone-800 leading-tight">{label}</p>
              <p className="text-xs text-stone-400 mt-0.5">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
