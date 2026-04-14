"use client";

import React, { useState } from 'react';
import ContentCard from "@/components/ContentCard";
import ContentFilters from "@/components/ContentFilters";
import { AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/blog-posts";

const InsightsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = BLOG_POSTS.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
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
                  <ContentCard key={item.slug} {...item} image={item.image} slug={item.slug} />
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
