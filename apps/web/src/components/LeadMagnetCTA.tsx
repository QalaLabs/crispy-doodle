"use client"

import { useState } from 'react'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LeadMagnetCTAProps {
  tool: string
  result: string
  title?: string
  subtitle?: string
  theme?: 'light' | 'dark' | 'amber'
}

export default function LeadMagnetCTA({ tool, result, title, subtitle, theme = 'light' }: LeadMagnetCTAProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const isDark = theme === 'dark'
  const isAmber = theme === 'amber'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, tool, result }),
      })
      if (!res.ok) throw new Error('Failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className={cn(
        "p-8 rounded-[32px] text-center space-y-3",
        isDark ? "bg-white/10 border border-white/20" : isAmber ? "bg-amber-800/40 border border-amber-600/40" : "bg-indigo-50 border border-indigo-100"
      )}>
        <CheckCircle2 className={cn("w-10 h-10 mx-auto", isDark ? "text-green-400" : isAmber ? "text-amber-300" : "text-indigo-500")} />
        <p className={cn("font-serif font-bold text-xl", isDark ? "text-white" : isAmber ? "text-amber-50" : "text-slate-900")}>
          Your full report is on its way!
        </p>
        <p className={cn("text-sm", isDark ? "text-white/60" : isAmber ? "text-amber-300/80" : "text-slate-500")}>
          We&apos;ve sent your personalised insights to <strong>{email}</strong>. Check your inbox.
        </p>
      </div>
    )
  }

  return (
    <div className={cn(
      "p-8 rounded-[32px] space-y-5",
      isDark ? "bg-white/5 border border-white/10" : isAmber ? "bg-amber-800/40 border border-amber-600/40" : "bg-indigo-50 border border-indigo-100"
    )}>
      <div className="space-y-2">
        <div className={cn(
          "inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
          isDark ? "text-purple-300" : isAmber ? "text-amber-300" : "text-indigo-600"
        )}>
          <Sparkles className="w-3 h-3" />
          {title ?? 'Get Your Full Report — Free'}
        </div>
        <p className={cn("text-sm leading-relaxed", isDark ? "text-white/70" : isAmber ? "text-amber-200/80" : "text-slate-600")}>
          {subtitle ?? 'Receive a detailed personalised analysis with guidance tailored to your result, delivered to your inbox.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors",
            isDark ? "bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-400" : isAmber ? "bg-amber-900/40 border border-amber-600/40 text-amber-50 placeholder-amber-500 focus:border-amber-400" : "bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-400"
          )}
        />
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors",
            isDark ? "bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-400" : isAmber ? "bg-amber-900/40 border border-amber-600/40 text-amber-50 placeholder-amber-500 focus:border-amber-400" : "bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-400"
          )}
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full h-12 rounded-xl font-bold text-sm",
            isDark ? "bg-purple-600 hover:bg-purple-500 text-white" : isAmber ? "bg-amber-500 hover:bg-amber-400 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"
          )}
        >
          {loading ? 'Sending…' : <><ArrowRight className="w-4 h-4 mr-2" /> Get My Full Report</>}
        </Button>
      </form>
      <p className={cn("text-[10px] text-center", isDark ? "text-white/30" : isAmber ? "text-amber-500/60" : "text-slate-400")}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
