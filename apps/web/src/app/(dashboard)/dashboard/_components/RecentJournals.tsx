import Link from 'next/link'

interface Journal {
  id: number
  title: string | null
  mood: number | null
  createdAt: Date
}

interface Props {
  journals: Journal[]
}

// mood stored as 1–5 int (1 = difficult, 5 = great)
function moodEmoji(mood: number | null): string {
  switch (mood) {
    case 5: return '😄'
    case 4: return '🙂'
    case 3: return '😐'
    case 2: return '😔'
    case 1: return '😞'
    default: return '📝'
  }
}

export default function RecentJournals({ journals }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Recent journals</h2>
        <Link href="/dashboard/journal" className="text-xs text-brand-600 hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-2">
        {journals.map((j) => (
          <Link
            key={j.id}
            href={`/dashboard/journal/${j.id}`}
            className="flex items-center gap-3 bg-white border border-stone-100 rounded-xl px-4 py-3 hover:border-stone-200 transition-colors"
          >
            <span className="text-xl flex-shrink-0">{moodEmoji(j.mood)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-700 truncate">
                {j.title ?? 'Untitled entry'}
              </p>
              <p className="text-xs text-stone-400">
                {new Date(j.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </p>
            </div>
            <svg className="w-4 h-4 text-stone-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
