"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Sparkles, RefreshCw } from 'lucide-react'
import LeadMagnetCTA from '@/components/LeadMagnetCTA'
import { cn } from '@/lib/utils'

const ANSWERS = [
  "The universe conspires in your favour. Trust the timing.",
  "Look within — the answer you seek has always been there.",
  "A clear yes. Move forward with confidence.",
  "Not now. Patience will reveal a better path.",
  "Release what you cannot control. Flow is the answer.",
  "The signs are aligned. This is your moment.",
  "Seek counsel from someone who has walked this path.",
  "Your intuition is correct. Follow it without hesitation.",
  "Something better awaits beyond this crossroads.",
  "The obstacle is the path. Lean into it.",
  "A resounding no. Your energy is needed elsewhere.",
  "Focus on inner work before outer action.",
  "The answer will arrive when you stop forcing it.",
  "Yes, but with careful preparation and steady steps.",
  "You already know the truth. Your heart speaks clearly.",
  "This too shall pass. The tide is already turning.",
  "Let go of the outcome. The journey is the teaching.",
  "A time of great change is upon you. Embrace it.",
  "Stillness and reflection will illuminate your next move.",
  "The cosmos say wait three days before deciding.",
]

const PAGES = [1, 7, 13, 22, 33, 42, 56, 77, 88, 99, 108, 111, 144, 222, 333]

export default function AnswerBookPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [page, setPage] = useState<number | null>(null)
  const [isOpening, setIsOpening] = useState(false)
  const [hasAsked, setHasAsked] = useState(false)

  const askBook = () => {
    if (!question.trim()) return
    setIsOpening(true)
    setHasAsked(true)
    setTimeout(() => {
      setAnswer(ANSWERS[Math.floor(Math.random() * ANSWERS.length)])
      setPage(PAGES[Math.floor(Math.random() * PAGES.length)])
      setIsOpening(false)
    }, 1800)
  }

  const reset = () => { setQuestion(''); setAnswer(null); setPage(null); setHasAsked(false) }

  return (
    <div className="min-h-screen bg-amber-950 pt-32 pb-24">
      <div className="max-w-xl mx-auto px-6">
        <Link href="/tools" className="inline-flex items-center gap-2 text-amber-300/60 hover:text-amber-200 text-sm font-bold mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="text-center space-y-4 mb-12">
          <div className="w-24 h-24 bg-amber-800/50 rounded-3xl flex items-center justify-center mx-auto border border-amber-700/30">
            <BookOpen className="w-12 h-12 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-50">The Answer Book</h1>
          <p className="text-amber-300/70 leading-relaxed">
            Hold your question in your heart. When you feel ready, ask the Book.
          </p>
        </div>

        {!answer && !isOpening && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400/60">Your Question</label>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ask your question with an open heart..."
                className="w-full bg-amber-900/30 border border-amber-700/30 rounded-2xl p-5 text-amber-50 placeholder-amber-700 text-sm resize-none focus:outline-none focus:border-amber-500 transition-colors leading-relaxed"
                rows={4}
                onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) askBook() }}
              />
            </div>
            <Button
              onClick={askBook}
              disabled={!question.trim()}
              className="w-full h-14 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg disabled:opacity-40"
            >
              <Sparkles className="w-5 h-5 mr-2" /> Open the Book
            </Button>
          </div>
        )}

        {isOpening && (
          <div className="text-center py-20 space-y-8">
            <div className="relative w-32 h-40 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg shadow-2xl animate-pulse" />
              <div className="absolute inset-2 bg-amber-50 rounded flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-amber-800 animate-pulse" />
              </div>
            </div>
            <p className="text-amber-300/70 font-serif italic text-lg animate-pulse">
              The Book is opening for you...
            </p>
          </div>
        )}

        {answer && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="p-10 bg-amber-50 rounded-[40px] space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-amber-200 font-serif text-sm">p. {page}</div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 opacity-30" />
              <BookOpen className="w-8 h-8 text-amber-600 mx-auto" />
              {question && (
                <p className="text-center text-sm text-amber-700/70 italic">"{question}"</p>
              )}
              <div className="w-12 h-0.5 bg-amber-300 mx-auto" />
              <p className="text-center text-xl md:text-2xl font-serif font-bold text-amber-900 leading-relaxed">
                {answer}
              </p>
            </div>

            <LeadMagnetCTA
              tool="Answer Book"
              result={answer ?? ''}
              title="Get Your Full Guidance Report — Free"
              subtitle="Receive a personalised spiritual guidance document — your question interpreted through Vedic astrology, numerology and intuitive counsel."
              theme="amber"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={reset} variant="ghost" className="flex-1 h-12 rounded-xl text-amber-300/70 hover:text-amber-200 border border-amber-700/30 font-bold">
                <RefreshCw className="w-4 h-4 mr-2" /> Ask Again
              </Button>
              <Button asChild className="flex-1 h-12 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold">
                <Link href="/contact">Book a Reading</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
