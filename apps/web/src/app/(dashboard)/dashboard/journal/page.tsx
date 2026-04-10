import { requireSession } from '@/lib/session'
import { prisma } from '@aumveda/db'
import Topbar from '../../_components/Topbar'
import Link from 'next/link'

export const metadata = { title: 'Journal' }

const MOOD_EMOJI: Record<number, string> = { 5: '😄', 4: '🙂', 3: '😐', 2: '😔', 1: '😞' }
const MOOD_LABEL: Record<number, string> = { 5: 'Great', 4: 'Good', 3: 'Okay', 2: 'Low', 1: 'Difficult' }

export default async function JournalListPage() {
  const session = await requireSession()

  const journals = await prisma.journal.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, mood: true, body: true, tags: true, createdAt: true },
  })

  return (
    <>
      <Topbar title="Journal" />
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <div className="flex justify-end mb-5">
          <Link
            href="/dashboard/journal/new"
            className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
          >
            + New entry
          </Link>
        </div>

        {journals.length === 0 ? (
          <div className="bg-white border border-stone-100 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-lg font-semibold text-stone-800 mb-2">Your journal is empty</h2>
            <p className="text-sm text-stone-500 mb-6">
              Writing even a few lines each day can transform how you feel.
            </p>
            <Link
              href="/dashboard/journal/new"
              className="inline-block bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
            >
              Write your first entry
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {journals.map((j) => (
              <Link
                key={j.id}
                href={`/dashboard/journal/${j.id}`}
                className="flex items-start gap-4 bg-white border border-stone-100 hover:border-stone-200 rounded-2xl px-5 py-4 transition-colors"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">
                  {MOOD_EMOJI[j.mood ?? 3] ?? '📝'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-stone-800 truncate">
                      {j.title ?? 'Untitled entry'}
                    </p>
                    <p className="text-xs text-stone-400 flex-shrink-0">
                      {new Date(j.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short',
                      })}
                    </p>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {j.mood ? MOOD_LABEL[j.mood] : ''}{j.mood && j.body ? ' · ' : ''}
                    {j.body ? j.body.slice(0, 80) + (j.body.length > 80 ? '…' : '') : ''}
                  </p>
                  {(j.tags as string[])?.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {(j.tags as string[]).slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-stone-100 text-stone-500 rounded-full px-2 py-0.5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <svg className="w-4 h-4 text-stone-300 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
