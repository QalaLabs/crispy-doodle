"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const DailyDoseCTA = () => {
  return (
    <Card className="border-none shadow-lg bg-slate-900 text-white overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles className="w-24 h-24 text-amber-400" />
      </div>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Action Required</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Today's Daily Dose</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Complete your personalized Ayurvedic rituals to maintain your 12-day streak.
        </p>
        <Button asChild className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold h-12">
          <Link href="/routine">
            Start Rituals <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyDoseCTA;
