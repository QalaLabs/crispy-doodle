"use client";

import React from 'react';
import RetreatCard from "@/components/RetreatCard";
import CorporateWellness from "@/components/CorporateWellness";
import SacredCalendar from "@/components/SacredCalendar";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Quote, Waves, Wind, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const RETREATS = [
  {
    title: "C-Suite Sanctuary: Himalayan Peak",
    location: "Ananda, Himalayas",
    date: "Nov 12 - 18, 2024",
    capacity: "12 Seekers Only",
    category: "C-Suite Retreat",
    description: "An exclusive immersion for high-impact leaders. We combine clinical neuro-reprogramming with high-altitude Vedic rituals to reset the executive nervous system and unlock visionary clarity.",
    price: "₹4,50,000",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "The Emotional Reset: Coastal Stillness",
    location: "Gokarna, India",
    date: "Dec 05 - 10, 2024",
    capacity: "20 Seekers",
    category: "Emotional Reset",
    description: "A deep-dive protocol for those navigating major life transitions. Utilizing Solfeggio sound therapy and heart-center CBT to dissolve legacy trauma and architect a new emotional foundation.",
    price: "₹1,25,000",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000"
  }
];

const Events = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="space-y-32 pb-32">
        {/* Cinematic Hero */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden rounded-b-[80px] mx-4">
          <div className="absolute inset-0 animate-slow-zoom">
            <img
              src="https://images.unsplash.com/photo-1518005020250-685948843892?auto=format&fit=crop&q=80&w=2000"
              alt="Cinematic Nature"
              className="w-full h-full object-cover grayscale opacity-40"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/40 to-white" />

          <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <Sparkles className="w-3 h-3" /> Sacred Gatherings &amp; Immersions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-9xl font-serif font-bold text-white leading-tight tracking-tighter"
            >
              The Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                Presence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Step out of the noise and into the synthesis. Our retreats are time-bound
              architectural shifts for the human soul.
            </motion.p>
          </div>
        </section>

        {/* Luxury Retreats Section */}
        <section className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C79A3B]">Luxury Immersions</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900">Bespoke Retreats</h3>
            <p className="text-slate-500 leading-relaxed">
              High-intensity, multi-dimensional journeys designed for profound systemic evolution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {RETREATS.map((retreat, i) => (
              <RetreatCard key={i} {...retreat} />
            ))}
          </div>
        </section>

        {/* Corporate Section */}
        <CorporateWellness />

        {/* Calendar & Workshops */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7">
              <SacredCalendar />
            </div>
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">The Workshop Series</h2>
                <h3 className="text-4xl font-serif font-bold text-slate-900">Micro-Immersions</h3>
                <p className="text-slate-500 leading-relaxed">
                  Single-day intensive protocols focusing on specific modalities of the Aumveda synthesis.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Vibrational Medicine", icon: Waves, color: "text-blue-500", bg: "bg-blue-50" },
                  { title: "Breath Mastery", icon: Wind, color: "text-emerald-500", bg: "bg-emerald-50" },
                  { title: "Subconscious Audit", icon: Flame, color: "text-rose-500", bg: "bg-rose-50" }
                ].map((w, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 rounded-[32px] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", w.bg)}>
                      <w.icon className={cn("w-6 h-6", w.color)} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{w.title}</h4>
                      <p className="text-xs text-slate-400">4-Hour Intensive Protocol</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial / Quote */}
        <section className="max-w-5xl mx-auto px-6 text-center py-12">
          <Quote className="w-16 h-16 text-amber-100 mx-auto mb-8" />
          <p className="text-3xl md:text-4xl font-serif italic text-slate-800 leading-relaxed">
            &ldquo;The Himalayan retreat wasn&apos;t just a break; it was a total system reboot.
            I returned with a clarity I haven&apos;t felt in a decade.&rdquo;
          </p>
          <div className="mt-10 flex flex-col items-center gap-2">
            <p className="text-sm font-black uppercase tracking-widest text-slate-900">Vikram S.</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CEO, Global Tech Solutions</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900">
            Ready to <span className="text-amber-600 italic">Immerse?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild className="h-16 px-12 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-lg shadow-2xl shadow-slate-200">
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button asChild variant="ghost" className="h-16 px-10 rounded-2xl border border-slate-200 font-bold text-lg">
              <Link href="/services">Explore Modalities</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Events;
