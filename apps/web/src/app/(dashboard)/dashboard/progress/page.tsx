'use client'

import { useState, useEffect } from 'react'
import Topbar from '../../_components/Topbar'
import ProgressGauge from '@/components/ProgressGauge'
import ProgressChart from '@/components/ProgressChart'
import BadgeShelf from '@/components/BadgeShelf'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Minus, Moon, Footprints, BookOpen, Heart } from 'lucide-react'

interface ProgressData {
  current: number
  average: number
  history: { date: string; score: number }[]
  breakdown: { sleep: number; activity: number; journal: number; wellbeing: number }
}

function TrendIcon({ value }: { value: number }) {
  if (value > 2) return <TrendingUp className="w-4 h-4 text-emerald-500" />
  if (value < -2) return <TrendingDown className="w-4 h-4 text-red-400" />
  return <Minus className="w-4 h-4 text-slate-400" />
}

function ScoreBar({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-stone-500 font-medium">
          {icon} {label}
        </span>
        <span className="font-bold text-stone-700">{value}</span>
      </div>
      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function ProgressPage() {
  const [range, setRange] = useState<'7d' | '30d'>('7d')
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/profile/progress?range=${range}`)
      .then(r => r.json())
      .then(d => { if (d.success) setData(d) })
      .finally(() => setLoading(false))
  }, [range])

  const trend = data && data.history.length >= 2
    ? data.history[data.history.length - 1].score - data.history[0].score
    : 0

  return (
    <>
      <Topbar title="Progress" />
      <div className="px-4 lg:px-8 py-6 max-w-3xl mx-auto space-y-8">

        {/* Score + Breakdown */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Gauge */}
            <div className="flex-shrink-0">
              <ProgressGauge value={data?.current ?? 0} size={180} strokeWidth={14} />
            </div>

            {/* Breakdown bars */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-stone-700 uppercase tracking-widest">Score Breakdown</h3>
                {!loading && <TrendIcon value={trend} />}
              </div>
              <ScoreBar
                label="Sleep"
                value={data?.breakdown.sleep ?? 50}
                icon={<Moon className="w-3.5 h-3.5 text-indigo-400" />}
              />
              <ScoreBar
                label="Activity"
                value={data?.breakdown.activity ?? 0}
                icon={<Footprints className="w-3.5 h-3.5 text-emerald-500" />}
              />
              <ScoreBar
                label="Journaling"
                value={data?.breakdown.journal ?? 0}
                icon={<BookOpen className="w-3.5 h-3.5 text-amber-500" />}
              />
              <ScoreBar
                label="Wellbeing"
                value={data?.breakdown.wellbeing ?? 50}
                icon={<Heart className="w-3.5 h-3.5 text-rose-400" />}
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-700 uppercase tracking-widest">Wellness Journey</h3>
            <Tabs value={range} onValueChange={v => setRange(v as '7d' | '30d')}>
              <TabsList className="h-8">
                <TabsTrigger value="7d" className="text-xs px-3">7 Days</TabsTrigger>
                <TabsTrigger value="30d" className="text-xs px-3">30 Days</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <div className="h-[200px] bg-stone-50 rounded-2xl animate-pulse" />
          ) : data && data.history.length > 0 ? (
            <ProgressChart data={data.history} average={data.average} />
          ) : (
            <div className="h-[200px] bg-stone-50 rounded-2xl flex flex-col items-center justify-center text-center p-6">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm font-medium text-stone-600">No data yet</p>
              <p className="text-xs text-stone-400 mt-1">Complete your first daily dose or write a journal to start tracking.</p>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
          <BadgeShelf />
        </div>

      </div>
    </>
  )
}
