"use client"

import PublicNavigation from '@/components/PublicNavigation'
import Link from 'next/link'
import { Sparkles, Mail, Phone, MapPin, Globe, PlayCircle } from 'lucide-react'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />
      <main>{children}</main>
      <footer className="bg-slate-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-2xl font-serif font-bold">Aumveda</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                A multi-dimensional synthesis of clinical psychology and Vedic wisdom, designed to reprogram your human system at the deepest level.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/aumveda" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                  <Globe className="w-4 h-4 text-slate-400" />
                </a>
                <a href="https://youtube.com/@aumveda" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                  <PlayCircle className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Services</h4>
              <ul className="space-y-3">
                {['CBT Therapy', 'Hypnosis', 'Sound Therapy', 'Breathwork', 'Vedic Astrology', 'Vastu Shastra'].map(s => (
                  <li key={s}><Link href="/services" className="text-sm text-slate-400 hover:text-white transition-colors">{s}</Link></li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div className="space-y-5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Explore</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Programs', href: '/programs' },
                  { label: 'Free Tools', href: '/tools' },
                  { label: 'Insights', href: '/insights' },
                  { label: 'Events & Retreats', href: '/events' },
                  { label: 'The Visionaries', href: '/visionaries' },
                  { label: 'About Us', href: '/about' },
                ].map(l => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <a href="mailto:hello@aumveda.com" className="text-sm text-slate-400 hover:text-white transition-colors">hello@aumveda.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <a href="tel:+919999999999" className="text-sm text-slate-400 hover:text-white transition-colors">+91 99999 99999</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-400">Mumbai & Jaipur, India</span>
                </li>
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-widest transition-colors">
                Book a Session
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
            <p>© {new Date().getFullYear()} Aumveda. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
              <Link href="/refund-policy" className="hover:text-slate-400 transition-colors">Refunds</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
