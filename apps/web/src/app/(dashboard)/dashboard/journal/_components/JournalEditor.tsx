'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Slider } from '@/components/ui/slider'
import { getMoodColor, getMoodEmoji } from '@/utils/mood'
import { Send, Loader2, X, ImagePlus, CloudOff, RefreshCw, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  // mood stored as 1-5 in DB but editor uses 1-10 scale for richer UX
  const [mood, setMood] = useState([initialData?.mood ? initialData.mood * 2 : 7])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? [])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [hasDraft, setHasDraft] = useState(false)
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load offline draft for new entries
  useEffect(() => {
    if (!isEdit) {
      const saved = localStorage.getItem('journal_draft')
      if (saved) {
        const { title: t, body: b, mood: m, tags: tg } = JSON.parse(saved)
        if (b) { setTitle(t ?? ''); setBody(b); setMood([m ?? 7]); setTags(tg ?? []); setHasDraft(true) }
      }
    }
  }, [isEdit])

  // Auto-save draft every 5s
  useEffect(() => {
    if (isEdit) return
    const t = setInterval(() => {
      if (body) localStorage.setItem('journal_draft', JSON.stringify({ title, body, mood: mood[0], tags }))
    }, 5000)
    return () => clearInterval(t)
  }, [title, body, mood, tags, isEdit])

  function addTag() {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (t && !tags.includes(t) && tags.length < 5) setTags([...tags, t])
    setTagInput('')
  }

  async function handleSave() {
    if (!body.trim()) { setError('Write something before saving.'); return }
    setError('')

    if (!isOnline && !isEdit) {
      localStorage.setItem('journal_draft', JSON.stringify({ title, body, mood: mood[0], tags, isPendingSync: true }))
      setHasDraft(true)
      return
    }

    setLoading(true)
    const url = isEdit ? `/api/journals/${initialData!.id}` : '/api/journals'
    const method = isEdit ? 'PATCH' : 'POST'
    // Map mood 1-10 back to 1-5 for DB storage
    const moodDb = Math.max(1, Math.min(5, Math.round(mood[0] / 2)))

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title || null, body, mood: moodDb, tags }),
    })
    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Failed to save.')
      return
    }

    const data = await res.json()
    localStorage.removeItem('journal_draft')
    router.push(`/dashboard/journal/${data.data.id}`)
    router.refresh()
  }

  async function handleDelete() {
    if (!isEdit) return
    setDeleting(true)
    await fetch(`/api/journals/${initialData!.id}`, { method: 'DELETE' })
    router.push('/dashboard/journal')
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>
      )}

      {hasDraft && !isEdit && (
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
          <CloudOff className="w-3.5 h-3.5" />
          Offline draft restored
          <button onClick={() => { localStorage.removeItem('journal_draft'); setBody(''); setTitle(''); setHasDraft(false) }} className="ml-auto text-amber-500 hover:text-amber-700">
            Discard
          </button>
        </div>
      )}

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
        rows={10}
        className="w-full text-sm text-stone-700 leading-relaxed bg-transparent border-none outline-none resize-none placeholder-stone-300"
      />

      {/* Mood Slider */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        <div className="flex justify-between items-center">
          <p className="text-xs text-stone-400 font-medium uppercase tracking-wide flex items-center gap-1.5">
            Mood <span className="text-base">{getMoodEmoji(mood[0])}</span>
          </p>
          <span className="text-xs font-bold" style={{ color: getMoodColor(mood[0]) }}>
            {mood[0]}/10
          </span>
        </div>
        <Slider value={mood} onValueChange={setMood} min={1} max={10} step={1} className="py-1" />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex gap-1.5 flex-wrap">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 rounded-full px-3 py-1">
              #{tag}
              <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} className="text-stone-400 hover:text-red-500">×</button>
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
            <button type="button" onClick={addTag} className="text-sm text-brand-600 hover:text-brand-700 px-2">Add</button>
          </div>
        )}
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-stone-100">
              <img src={url} alt="Attachment" className="w-full h-full object-cover" />
              <button onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3 text-stone-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className={cn("flex items-center pt-3 border-t border-stone-100", isEdit ? "justify-between" : "justify-between")}>
        <div className="flex items-center gap-2">
          <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} />
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="text-stone-400 hover:text-brand-600 transition-colors p-1.5 rounded-lg hover:bg-brand-50">
            <ImagePlus className="w-4 h-4" />
          </button>
          {!isOnline && <span className="text-xs text-amber-500 flex items-center gap-1"><CloudOff className="w-3 h-3" /> Offline</span>}
        </div>

        <div className="flex items-center gap-3">
          {isEdit && (
            <button type="button" onClick={handleDelete} disabled={deleting}
              className="text-sm text-red-400 hover:text-red-600 flex items-center gap-1.5 disabled:opacity-50">
              <Trash2 className="w-3.5 h-3.5" />
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          )}
          <button type="button" onClick={handleSave} disabled={loading}
            className={cn(
              "flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50",
              !isOnline && !isEdit ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-brand-500 hover:bg-brand-600 text-white"
            )}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : !isOnline && !isEdit ? <RefreshCw className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            {loading ? 'Saving…' : !isOnline && !isEdit ? 'Save Offline' : isEdit ? 'Save changes' : 'Save reflection'}
          </button>
        </div>
      </div>
    </div>
  )
}
