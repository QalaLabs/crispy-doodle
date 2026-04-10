"use client";

import React, { useState } from 'react';
import PublicNavigation from "@/components/PublicNavigation";
import ArchitectCard from "@/components/ArchitectCard";
import ArchitectModal from "@/components/ArchitectModal";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, ArrowRight, Layers, BrainCircuit, Globe } from "lucide-react";
import Link from "next/link";

const ARCHITECTS = [
  {
    id: 'sejal',
    name: "Dr. Sejal Jain",
    role: "Subconscious Architect",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=1000",
    philosophy: "The mind is not a mystery to be solved, but a system to be re-architected. True evolution begins where the conscious effort ends.",
    modalities: ["Clinical CBT", "Deep-State Hypnosis", "Bioresonance", "Neuro-Linguistic Programming"],
    approach: "Dr. Sejal utilizes a high-precision synthesis of clinical psychology and subconscious rewiring. She identifies the 'legacy code' of childhood trauma and societal conditioning, replacing it with optimized neural frameworks.",
    impact: "Successfully transitioned 500+ high-performance executives from states of chronic burnout to sustainable cognitive flow through systemic mental restructuring.",
    variant: 'blue'
  },
  {
    id: 'archana',
    name: "Archana Jain",
    role: "Cosmic Architect",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000",
    philosophy: "We are not separate from the universe; we are a localized expression of its geometry. To align the self is to align with the stars.",
    modalities: ["Vedic Astrology (Jyotish)", "Vastu Shastra", "Crystallomancy", "Vibrational Sound Healing"],
    approach: "Archana maps the external variables of human existence. By analyzing celestial transits and spatial energetics, she designs environments and timing protocols that remove karmic friction from the individual's path.",
    impact: "Architected the spatial and cosmic alignment for 100+ residential and commercial projects, resulting in measurable increases in inhabitant well-being and organizational prosperity.",
    variant: 'amber'
  }
];

const Visionaries = () => {
  const [selectedArchitect, setSelectedArchitect] = useState<any>(null);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />

      <main className="pt-32 pb-24 space-y-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">
                <Layers className="w-3 h-3" /> The Architects of Evolution
              </div>
              <h1 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 leading-[1.1] tracking-tight">
                Systemic <br />
                <span className="text-amber-600 italic">Designers</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
                Meet the sisters who bridged the gap between clinical rigor and metaphysical precision.
                They don&apos;t just heal; they reprogram the human experience.
              </p>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">15+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years Research</span>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">1.2k</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Systems Optimized</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-[80px] bg-slate-50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 neural-mesh opacity-20" />
                <BrainCircuit className="w-64 h-64 text-slate-200 animate-breathing" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100 max-w-xs">
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  &ldquo;Our mission is to provide the blueprint for a life lived in total systemic harmony.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architect Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {ARCHITECTS.map((architect) => (
              <ArchitectCard
                key={architect.id}
                architect={architect}
                variant={architect.variant as any}
                onClick={() => setSelectedArchitect(architect)}
              />
            ))}
          </div>
        </section>

        {/* Shared Vision Section */}
        <section className="py-24 bg-slate-900 rounded-[60px] mx-4 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-24 opacity-5">
            <Globe className="w-96 h-96 text-white" />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">The Unified Theory</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                One System. <br />
                Infinite Alignment.
              </h3>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              The Jain sisters realized that the mind cannot be fully re-architected if the spatial and cosmic
              environment is in discord. Their synthesis ensures that your internal reprogramming is
              supported by your external reality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold mb-2">Internal</h4>
                <p className="text-xs text-slate-500">Neural &amp; Subconscious Optimization</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold mb-2">External</h4>
                <p className="text-xs text-slate-500">Spatial &amp; Environmental Harmony</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold mb-2">Cosmic</h4>
                <p className="text-xs text-slate-500">Karmic &amp; Temporal Alignment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Ready to meet your <span className="text-amber-600 italic">Architects?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild className="h-16 px-12 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-lg shadow-2xl shadow-slate-200">
              <Link href="/contact">Book Discovery Call</Link>
            </Button>
            <Button asChild variant="ghost" className="h-16 px-10 rounded-2xl border border-slate-200 font-bold text-lg">
              <Link href="/services">Explore Services <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>
          <div className="pt-12 flex items-center justify-center gap-8 text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Forensic Security Active</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-200" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">AI-Personalized Protocols</span>
            </div>
          </div>
        </section>
      </main>

      <ArchitectModal
        architect={selectedArchitect}
        isOpen={!!selectedArchitect}
        onClose={() => setSelectedArchitect(null)}
      />
    </div>
  );
};

export default Visionaries;
