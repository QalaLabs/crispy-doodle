'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOODS = [
  { value: 5, emoji: '😄', label: 'Great' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 2, emoji: '😔', label: 'Low' },
  { value: 1, emoji: '😞', label: 'Difficult' },
]

interface Props {
  initialData?: {
    id: number
    title: string | null
    body: string | null
    mood: number | null
    tags: string[]
  }
}

export default function JournalEditor({ initialData }: Props) {
  const router = useRouter()
  const isEdit = !!initialData

  const [title, setTitle] = useState(initialData?.title ?? '')
  const [body, setBody] = useState(initialData?.body ?? '')
  const [mood, setMood] = useState<number | null>(initialData?.mood ?? null)
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addTag() {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t])
    }
    setTagInput('')
  }

  function removeTag(tag: string) {
    setTags(tags.filter(t => t !== tag))
  }

  async function handleSave() {
    if (!body.trim()) { setError('Please write something before saving.'); return }
    setError('')
    setLoading(true)

    const url = isEdit ? `/api/journals/${initialData!.id}` : '/api/journals'
    const method = isEdit ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title || null, body, mood, tags }),
    })

    setLoading(false)
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Failed to save.')
      return
    }

    const data = await res.json()
    router.push(`/dashboard/journal/${data.data.id}`)
    router.refresh()
  }

  async function handleDelete() {
    if (!isEdit) return
    setLoading(true)
    await fetch(`/api/journals/${initialData!.id}`, { method: 'DELETE' })
    router.push('/dashboard/journal')
    router.refresh()
  }

  return (
    <div className="space-y-5">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
          {error}
        </p>
      )}

      {/* Mood picker */}
      <div>
        <p className="text-xs text-stone-500 font-medium uppercase tracking-wide mb-2">How are you feeling?</p>
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMood(mood === m.value ? null : m.value)}
              title={m.label}
              className={`w-10 h-10 rounded-xl text-xl transition border ${
                mood === m.value
                  ? 'border-brand-300 bg-brand-50 scale-110'
                  : 'border-stone-100 bg-white hover:border-stone-200'
              }`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title (optional)"
        className="w-full text-lg font-semibold text-stone-800 bg-transparent border-none outline-none placeholder-stone-300"
      />

      {/* Body */}
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="What's on your mind today?..."
        rows={12}
        className="w-full text-sm text-stone-700 leading-relaxed bg-transparent border-none outline-none resize-none placeholder-stone-300"
      />

      {/* Tags */}
      <div>
        <div className="flex gap-2 flex-wrap mb-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 rounded-full px-3 py-1"
            >
              #{tag}
              <button type="button" onClick={() => removeTag(tag)} className="text-stone-400 hover:text-red-500">
                ×
              </button>
            </span>
          ))}
        </div>
        {tags.length < 5 && (
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag() } }}
              placeholder="Add a tag…"
              className="text-sm border border-stone-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-300 w-36"
            />
            <button
              type="button"
              onClick={addTag}
              className="text-sm text-brand-600 hover:text-brand-700 px-2"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-sm text-red-500 hover:text-red-700 transition disabled:opacity-50"
          >
            Delete entry
          </button>
        ) : <div />}

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50"
        >
          {loading ? 'Saving…' : isEdit ? 'Save changes' : 'Save entry'}
        </button>
      </div>
    </div>
  )
}
