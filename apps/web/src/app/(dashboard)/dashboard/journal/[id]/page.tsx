import { requireSession } from '@/lib/session'
import { notFound } from 'next/navigation'
import { prisma } from '@aumveda/db'
import Topbar from '../../../_components/Topbar'
import JournalEditor from '../_components/JournalEditor'
import Link from 'next/link'

export const metadata = { title: 'Journal Entry' }

export default async function JournalDetailPage({ params }: { params: { id: string } }) {
  const session = await requireSession()

  const id = parseInt(params.id)
  if (isNaN(id)) notFound()

  const journal = await prisma.journal.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true, title: true, body: true, mood: true, tags: true, createdAt: true },
  })
  if (!journal) notFound()

  return (
    <>
      <Topbar title={journal.title ?? 'Journal Entry'} />
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/dashboard/journal" className="text-sm text-stone-400 hover:text-stone-600">
            ← Back
          </Link>
          <span className="text-stone-200">/</span>
          <p className="text-sm text-stone-500">
            {new Date(journal.createdAt).toLocaleDateString('en-IN', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-6">
          <JournalEditor
            initialData={{
              id: journal.id,
              title: journal.title,
              body: journal.body,
              mood: journal.mood,
              tags: journal.tags as string[],
            }}
          />
        </div>
      </div>
    </>
  )
}
