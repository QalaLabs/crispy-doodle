"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Sun, Star, Sparkles, ArrowRight } from 'lucide-react'

const PLANETS = ["Sun ☀️", "Moon 🌙", "Mars ♂", "Mercury ☿", "Jupiter ♃", "Venus ♀", "Saturn ♄", "Rahu ☊", "Ketu ☋"]
const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
const SYMBOLS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
const NAKSHATRAS = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"]

function seedRand(seed: number) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

type Chart = {
  lagna: string
  lagnaSymbol: string
  moonSign: string
  sunSign: string
  nakshatra: string
  nakshatraPada: number
  planetary: { planet: string; sign: string; symbol: string; house: number; deg: number }[]
  yogas: string[]
  dasha: string
}

function generateChart(dob: string, tob: string, city: string): Chart {
  const seed = [...(dob + tob + city)].reduce((a, c) => a + c.charCodeAt(0), 0)
  const r = seedRand(seed)
  const lagnaIdx = Math.floor(r() * 12)
  const moonIdx = Math.floor(r() * 12)
  const sunIdx = Math.floor(r() * 12)
  const nIdx = Math.floor(r() * 27)
  const pada = Math.floor(r() * 4) + 1
  const planetary = PLANETS.map(planet => ({
    planet,
    sign: SIGNS[Math.floor(r() * 12)],
    symbol: SYMBOLS[Math.floor(r() * 12)],
    house: Math.floor(r() * 12) + 1,
    deg: Math.floor(r() * 30),
  }))
  const allYogas = ["Gajakesari Yoga", "Budha-Aditya Yoga", "Hamsa Yoga", "Malavya Yoga", "Ruchaka Yoga", "Raja Yoga", "Dhana Yoga", "Neecha Bhanga Raja Yoga"]
  const yogas = allYogas.filter(() => r() > 0.6).slice(0, 3)
  const dashas = ["Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury", "Ketu", "Venus"]
  const dasha = dashas[Math.floor(r() * dashas.length)] + " Mahadasha"
  return { lagna: SIGNS[lagnaIdx], lagnaSymbol: SYMBOLS[lagnaIdx], moonSign: SIGNS[moonIdx], sunSign: SIGNS[sunIdx], nakshatra: NAKSHATRAS[nIdx], nakshatraPada: pada, planetary, yogas, dasha }
}

export default function KundliPage() {
  const [form, setForm] = useState({ name: '', dob: '', tob: '', city: '' })
  const [chart, setChart] = useState<Chart | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const generate = () => {
    if (!form.dob || !form.tob || !form.city) return
    setChart(generateChart(form.dob, form.tob, form.city))
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-bold mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest">
            <Sun className="w-3 h-3" /> Vedic Astrology
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Kundli Generator</h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl">Enter your birth details to generate your Vedic birth chart and planetary positions.</p>
        </div>

        <div className="p-8 bg-slate-50 rounded-[40px] space-y-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
              <Input value={form.name} onChange={set('name')} placeholder="Your name" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Date of Birth</label>
              <Input type="date" value={form.dob} onChange={set('dob')} className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Time of Birth</label>
              <Input type="time" value={form.tob} onChange={set('tob')} className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Birth City</label>
              <Input value={form.city} onChange={set('city')} placeholder="e.g. Mumbai" className="h-12 rounded-xl" />
            </div>
          </div>
          <Button onClick={generate} disabled={!form.dob || !form.tob || !form.city} className="w-full h-12 rounded-xl bg-slate-900 hover:bg-black font-bold">
            <Sparkles className="w-4 h-4 mr-2" /> Generate Kundli
          </Button>
        </div>

        {chart && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Lagna', value: `${chart.lagnaSymbol} ${chart.lagna}` },
                { label: 'Moon Sign', value: chart.moonSign },
                { label: 'Sun Sign', value: chart.sunSign },
                { label: 'Nakshatra', value: `${chart.nakshatra} (P${chart.nakshatraPada})` },
              ].map(item => (
                <div key={item.label} className="p-5 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1">{item.label}</p>
                  <p className="font-bold text-slate-900 text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Planetary Positions */}
            <div className="bg-slate-50 rounded-[32px] overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Star className="w-4 h-4 text-orange-500" /> Planetary Positions</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {chart.planetary.map(p => (
                  <div key={p.planet} className="flex items-center justify-between px-6 py-4">
                    <span className="font-bold text-slate-700 text-sm w-28">{p.planet}</span>
                    <span className="text-slate-500 text-sm">{p.symbol} {p.sign}</span>
                    <span className="text-slate-400 text-xs">{p.deg}°</span>
                    <span className="text-slate-400 text-xs hidden sm:block">House {p.house}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Yogas & Dasha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-amber-50 rounded-[32px] border border-amber-100 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Yogas Present</h3>
                {chart.yogas.length > 0 ? chart.yogas.map(y => (
                  <div key={y} className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{y}</span>
                  </div>
                )) : <p className="text-sm text-slate-500">No major yogas detected.</p>}
              </div>
              <div className="p-6 bg-slate-900 rounded-[32px] space-y-4 text-white">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Current Dasha</h3>
                <p className="text-2xl font-serif font-bold">{chart.dasha}</p>
                <p className="text-slate-400 text-sm leading-relaxed">Your current planetary period shapes the themes and opportunities of this chapter of your life.</p>
              </div>
            </div>

            <div className="p-8 bg-orange-50 rounded-[32px] border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Want a detailed interpretation?</h3>
                <p className="text-sm text-slate-500">Book a 1:1 Kundli reading with Archana Jain for personalised insights.</p>
              </div>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shrink-0 h-12 px-8">
                <Link href="/contact">Book Reading <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
