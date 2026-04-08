'use client'

import { useState } from 'react'

const TIMEZONES = [
  'Asia/Kolkata', 'Asia/Dubai', 'Asia/Singapore',
  'Europe/London', 'Europe/Paris',
  'America/New_York', 'America/Los_Angeles',
  'Australia/Sydney',
]

interface Props {
  name: string
  email: string
  timezone: string
  bio: string
}

export default function SettingsForm({ name: initName, email, timezone: initTz, bio: initBio }: Props) {
  const [name, setName] = useState(initName)
  const [timezone, setTimezone] = useState(initTz)
  const [bio, setBio] = useState(initBio)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSaved(false)
    await fetch('/api/users/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, timezone, bio }),
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="bg-white border border-stone-100 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Profile</h2>

        <div>
          <label className="block text-sm text-stone-600 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border border-stone-100 rounded-xl px-3 py-2.5 text-sm bg-stone-50 text-stone-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
            placeholder="A little about you..."
          />
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-1">Timezone</label>
          <select
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
          >
            {TIMEZONES.map(tz => (
              <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <p className="text-sm text-sage-600">Saved!</p>}
      </div>
    </form>
  )
}
