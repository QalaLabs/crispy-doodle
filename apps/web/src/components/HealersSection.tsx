"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

const HealersSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C79A3B]">The Visionaries</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
              Guided by Lineage <br />
              &amp; Clinical Science
            </h3>
          </div>
          <Button asChild variant="outline" className="h-12 px-8 rounded-xl border-slate-200 font-bold">
            <Link href="/about">Our Full Story <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Dr. Sejal */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden mb-8 relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=1000"
                alt="Dr. Sejal Jain"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/80 backdrop-blur-xl rounded-[40px] border border-white/20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Psychological Guide</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;Healing the mind requires reconnecting it with the soul&apos;s eternal wisdom through clinical precision.&rdquo;
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-serif font-bold text-slate-900">Dr. Sejal Jain</h4>
              <p className="text-amber-600 font-bold uppercase tracking-widest text-xs">PhD in Psychology • Vedic Practitioner</p>
            </div>
          </div>

          {/* Archana */}
          <div className="group cursor-pointer lg:pt-24">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden mb-8 relative">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000"
                alt="Archana Jain"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/80 backdrop-blur-xl rounded-[40px] border border-white/20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Cosmic Consultant</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;Navigating celestial currents to find your true north through ancient divination and energy work.&rdquo;
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-serif font-bold text-slate-900">Archana Jain</h4>
              <p className="text-amber-600 font-bold uppercase tracking-widest text-xs">Vedic Astrologer • Vastu Expert</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealersSection;
