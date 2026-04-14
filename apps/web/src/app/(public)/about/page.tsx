"use client";

import React from 'react';
import Timeline from "@/components/Timeline";
import PhilosophyGrid from "@/components/PhilosophyGrid";
import IntegrationSection from "@/components/IntegrationSection";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-24 space-y-32">
        {/* High-Authority Header */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles className="w-3 h-3" /> A System of Transformation
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 leading-[1.1] tracking-tight">
              The Architecture of <br />
              <span className="text-amber-600 italic">Human Evolution</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-3xl font-medium">
              Aumveda is not a service provider. We are the architects of a multi-dimensional synthesis
              designed to reprogram the human system at the intersection of clinical science and Vedic wisdom.
            </p>
          </div>
        </section>

        {/* Origin Story / Timeline */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C79A3B]">The Origin</h2>
              <h3 className="text-4xl font-serif font-bold text-slate-900">Born from the Gap</h3>
              <p className="text-slate-600 leading-relaxed">
                Aumveda exists because traditional healing is fragmented. Founded by sisters Sejal Jain
                and Archana Jain, the system was developed to bridge the void between clinical psychological
                rigor and the profound accuracy of ancient metaphysical sciences.
              </p>
              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 relative overflow-hidden group">
                <Quote className="w-12 h-12 text-slate-200 absolute -top-2 -left-2" />
                <p className="text-lg font-serif italic text-slate-800 leading-relaxed relative z-10">
                  &ldquo;We realized that a mind cannot be fully healed if the subconscious is ignored,
                  and a soul cannot thrive if its spatial and cosmic environment is in discord.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">The Jain Sisters</p>
                    <p className="text-[10px] text-slate-400 font-medium">Founders of Aumveda</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <Timeline />
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-slate-50 py-32 rounded-[80px] mx-4">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C79A3B]">The Philosophy</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">The Five Pillars of Synthesis</h3>
              <p className="text-slate-500 leading-relaxed">
                Our methodology operates across five distinct yet interconnected layers of the human experience.
              </p>
            </div>
            <PhilosophyGrid />
          </div>
        </section>

        {/* Why Traditional Healing Fails */}
        <IntegrationSection />

        {/* Final Authority CTA */}
        <section className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900">
              Ready to <span className="text-amber-600 italic">Synchronize?</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Experience the power of a unified transformation system. No more fragmented attempts at wellness.
              Just one coherent path to your highest evolution.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild className="h-16 px-12 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-lg shadow-2xl shadow-slate-200">
              <Link href="/contact">Book a Synthesis Assessment</Link>
            </Button>
            <Button asChild variant="ghost" className="h-16 px-10 rounded-2xl border border-slate-200 font-bold text-lg">
              <Link href="/services">Explore the Pillars <ArrowRight className="ml-2 w-5 h-5" /></Link>
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
    </div>
  );
};

export default About;
