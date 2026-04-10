'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Utensils, Leaf, Flame, Droplets, ArrowLeft } from 'lucide-react'
import Topbar from '../../_components/Topbar'

const DOSHA_FOODS = [
  {
    dosha: 'Vata',
    color: 'bg-violet-50 border-violet-100',
    textColor: 'text-violet-700',
    icon: '🌬️',
    favor: ['Warm, cooked foods', 'Sweet fruits', 'Ghee & oils', 'Root vegetables', 'Warm milk', 'Sesame seeds'],
    avoid: ['Raw vegetables', 'Cold drinks', 'Dry snacks', 'Caffeine', 'Carbonated drinks'],
  },
  {
    dosha: 'Pitta',
    color: 'bg-amber-50 border-amber-100',
    textColor: 'text-amber-700',
    icon: '🔥',
    favor: ['Cooling foods', 'Sweet fruits', 'Leafy greens', 'Coconut', 'Cucumber', 'Mint & coriander'],
    avoid: ['Spicy food', 'Fried food', 'Alcohol', 'Fermented foods', 'Red meat', 'Vinegar'],
  },
  {
    dosha: 'Kapha',
    color: 'bg-emerald-50 border-emerald-100',
    textColor: 'text-emerald-700',
    icon: '🌊',
    favor: ['Light, dry foods', 'Spices', 'Honey', 'Legumes', 'Bitter greens', 'Warm drinks'],
    avoid: ['Heavy dairy', 'Fried food', 'Cold foods', 'Sweets', 'Red meat', 'Salty food'],
  },
]

export default function FoodGuidePage() {
  return (
    <>
      <Topbar title="Ayurvedic Food Guide" />
      <div className="px-4 lg:px-8 py-6 max-w-5xl mx-auto space-y-8">

        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
            <Link href="/dashboard"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Link>
          </Button>
          <p className="text-slate-500 font-medium ml-auto">Nourish your body according to your Prakriti.</p>
        </div>

        <div className="p-8 bg-slate-900 rounded-[32px] text-white flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
            <Utensils className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-xl mb-1">Ahara — The First Pillar of Healing</h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              In Ayurveda, food is medicine. What you eat, when you eat, and how you eat
              directly impacts your dosha balance, digestive fire (Agni), and overall vitality.
              This guide is tailored to balance all three doshas in harmony.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOSHA_FOODS.map(({ dosha, color, textColor, icon, favor, avoid }) => (
            <div key={dosha} className={`rounded-[32px] border p-6 space-y-5 ${color}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h3 className={`text-xl font-bold ${textColor}`}>{dosha} Dosha</h3>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> Favor
                </p>
                <ul className="space-y-1.5">
                  {favor.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Reduce
                </p>
                <ul className="space-y-1.5">
                  {avoid.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-bold text-slate-900">Universal Ayurvedic Eating Guidelines</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            {[
              'Eat your largest meal at midday when Agni is strongest',
              'Sit down and eat in a calm, distraction-free environment',
              'Eat only when you feel genuine hunger',
              'Leave 1/3 of stomach empty — for Agni to work',
              'Avoid ice-cold beverages with meals',
              'Allow 3–4 hours between meals for digestion',
              'Favour fresh, seasonal, and locally grown produce',
              'Cook with love — consciousness affects the food\'s quality',
            ].map(tip => (
              <div key={tip} className="flex items-start gap-2">
                <span className="text-primary font-bold text-lg leading-none mt-0.5">·</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
