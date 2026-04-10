"use client";

import React, { useState } from 'react';
import PublicNavigation from "@/components/PublicNavigation";
import ContentCard from "@/components/ContentCard";
import ContentFilters from "@/components/ContentFilters";
import { AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentItem {
  id: number;
  type: 'blog' | 'news' | 'story';
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
}

const CONTENT: ContentItem[] = [
  {
    id: 1,
    type: 'blog',
    category: 'Neuro-Metaphysics',
    title: "The Neuroscience Behind Manifestation",
    excerpt: "Exploring how the Reticular Activating System (RAS) and neuroplasticity synchronize with Vedic intention-setting rituals to reprogram the subconscious reality.",
    readTime: "8 min read",
    date: "Oct 24, 2023",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    type: 'blog',
    category: 'Environmental Psychology',
    title: "Why Your Environment is Controlling Your Thoughts",
    excerpt: "A deep dive into Vastu Shastra and modern spatial psychology. How architectural geometry influences cortisol levels and cognitive load.",
    readTime: "12 min read",
    date: "Oct 20, 2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    type: 'story',
    category: 'Case Study',
    title: "Systemic Reset: From Burnout to Flow",
    excerpt: "How a high-stakes executive utilized the 21-Day Synthesis protocol to recalibrate their parasympathetic nervous system and reclaim cognitive sovereignty.",
    readTime: "15 min read",
    date: "Oct 15, 2023",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    type: 'news',
    category: 'Brand Update',
    title: "Aumveda AI: Version 2.0 Launch",
    excerpt: "Introducing our enhanced proprietary algorithms for real-time synthesis of health metrics and cosmic transits. Now with forensic-level PII redaction.",
    readTime: "4 min read",
    date: "Oct 10, 2023",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    type: 'blog',
    category: 'Vibrational Medicine',
    title: "Bioresonance and Cellular Harmony",
    excerpt: "Understanding the physics of Solfeggio frequencies and their impact on cellular memory and mitochondrial function.",
    readTime: "10 min read",
    date: "Oct 05, 2023",
    image: "https://images.unsplash.com/photo-1518005020250-685948843892?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 6,
    type: 'story',
    category: 'Case Study',
    title: "The Architecture of Closure",
    excerpt: "A multi-dimensional approach to emotional sovereignty following a major life transition, integrating heart-center CBT and spatial Vastu.",
    readTime: "14 min read",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000"
  }
];

const InsightsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = CONTENT.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {/* Header Section */}
          <header className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles className="w-3 h-3" /> The Aumveda Intelligence Hub
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 leading-[1.1] tracking-tight">
              Insights for <br />
              <span className="text-amber-600 italic">Systemic Evolution</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
              Bridging the gap between clinical psychological rigor and the profound
              accuracy of ancient metaphysical sciences.
            </p>
          </header>

          {/* Search & Filters */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-100 pb-12">
              <ContentFilters activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border-none bg-slate-50 focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredContent.map((item) => (
                  <ContentCard key={item.id} {...item} />
                ))}
              </AnimatePresence>
            </div>

            {filteredContent.length === 0 && (
              <div className="py-32 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No insights found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

          {/* Newsletter / CTA Section */}
          <section className="py-24 bg-slate-900 rounded-[60px] overflow-hidden relative">
            <div className="absolute inset-0 neural-mesh opacity-10" />
            <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
              <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">The Weekly Synthesis</h2>
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                  Intelligence <br />
                  Direct to Your Inbox
                </h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed">
                Receive weekly protocols on neuro-metaphysics, cosmic transits, and
                systemic wellness designed for the modern seeker.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <Button className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-amber-400 text-slate-900 hover:bg-white font-bold">
                  Join Hub
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                GDPR Compliant • No Spam
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default InsightsPage;
