"use client";

import React from 'react';
import { Calendar as CalendarIcon, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

const UPCOMING = [
  { date: "OCT 28", title: "Full Moon Sound Bath", type: "Workshop", status: "Waitlist" },
  { date: "NOV 12", title: "C-Suite Reset: Himalayas", type: "Retreat", status: "Open" },
  { date: "NOV 24", title: "Vastu for Modern Business", type: "Corporate", status: "Open" },
  { date: "DEC 05", title: "The Emotional Architecture", type: "Workshop", status: "Limited" },
];

const SacredCalendar = () => {
  return (
    <div className="bg-white rounded-[48px] p-10 shadow-xl border border-slate-100">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
            <CalendarIcon className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Sacred Calendar</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upcoming Alignments</p>
          </div>
        </div>
        <Sparkles className="w-6 h-6 text-amber-200 animate-pulse" />
      </div>

      <div className="space-y-4">
        {UPCOMING.map((event, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/50 border border-transparent hover:border-amber-200 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-6">
              <div className="text-center min-w-[60px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{event.date.split(' ')[0]}</p>
                <p className="text-2xl font-black text-slate-900">{event.date.split(' ')[1]}</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{event.title}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{event.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                event.status === 'Open' ? "bg-emerald-50 text-emerald-600" :
                event.status === 'Waitlist' ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
              )}>
                {event.status}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SacredCalendar;
