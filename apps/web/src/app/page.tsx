import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aumveda — Your Digital Healing Companion',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-brand">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="font-serif text-2xl font-semibold text-brand-700">Aumveda</span>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="text-sm text-stone-600 hover:text-brand-600 transition-colors">Shop</Link>
          <Link href="/courses" className="text-sm text-stone-600 hover:text-brand-600 transition-colors">Courses</Link>
          <Link href="/auth/login" className="btn-secondary text-xs px-4 py-2">Sign In</Link>
          <Link href="/auth/register" className="btn-primary text-xs px-4 py-2">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-sm tracking-widest text-brand-500 uppercase mb-4">
          With Archana &amp; Sejal Jain
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-800 leading-tight mb-6">
          Your daily path to<br />
          <span className="text-brand-500 italic">deep healing</span>
        </h1>
        <p className="text-lg text-stone-500 max-w-xl mx-auto mb-10">
          Daily audio practices, reflective journalling, and AI-guided insights —
          woven together to support your mind, body, and spirit.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/auth/register" className="btn-primary">
            Begin Your Journey
          </Link>
          <Link href="/about" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </section>

      {/* Feature strip */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Daily Dose', desc: 'Guided audio practices at 528 Hz, designed to reset and realign.', icon: '🎵' },
          { title: 'Progress Engine', desc: 'Your personal healing score — built from sleep, activity, and journal entries.', icon: '📈' },
          { title: 'AI Quick Tips', desc: 'Personalised micro-interventions grounded in CBT, delivered when you need them.', icon: '✨' },
        ].map((f) => (
          <div key={f.title} className="card text-center">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-serif text-xl font-medium text-stone-800 mb-2">{f.title}</h3>
            <p className="text-sm text-stone-500">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
