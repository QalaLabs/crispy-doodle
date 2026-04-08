import Topbar from '../../_components/Topbar'
import Link from 'next/link'

export const metadata = { title: 'Journal' }

export default function JournalPage() {
  return (
    <>
      <Topbar title="Journal" />
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <div className="flex justify-end mb-4">
          <Link
            href="/dashboard/journal/new"
            className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            + New entry
          </Link>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-lg font-semibold text-stone-800 mb-2">Your journal awaits</h2>
          <p className="text-sm text-stone-500 mb-4">Full journal feature is coming in Phase 3.</p>
          <Link
            href="/dashboard/journal/new"
            className="inline-block bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
          >
            Write your first entry
          </Link>
        </div>
      </div>
    </>
  )
}
