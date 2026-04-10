import { requireSession } from '@/lib/session'
import Topbar from '../../../_components/Topbar'
import JournalEditor from '../_components/JournalEditor'

export const metadata = { title: 'New Journal Entry' }

export default async function NewJournalPage() {
  const session = await requireSession()

  return (
    <>
      <Topbar title="New Entry" />
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <div className="bg-white border border-stone-100 rounded-2xl p-6">
          <JournalEditor />
        </div>
      </div>
    </>
  )
}
