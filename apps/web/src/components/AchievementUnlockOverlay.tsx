"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Sparkles, X } from "lucide-react";

const AchievementUnlockOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [achievement, setAchievement] = useState<any>(null);

  useEffect(() => {
    const handleUnlock = (event: any) => {
      setAchievement(event.detail);
      setIsOpen(true);
    };

    window.addEventListener('achievement-unlocked', handleUnlock);
    return () => window.removeEventListener('achievement-unlocked', handleUnlock);
  }, []);

  if (!achievement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[450px] p-0 border-none bg-transparent shadow-none overflow-visible">
        <div className="relative">
          {/* Celebration Particles (CSS Only) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-400 animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border-4 border-amber-400/20 relative z-10">
            <div className="h-40 bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <Sparkles className="w-full h-full scale-150 rotate-12" />
              </div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-2 border border-white/30">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em]">New Achievement!</h2>
            </div>

            <div className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <div className="text-6xl mb-4 animate-bounce">{achievement.icon}</div>
                <h3 className="text-2xl font-black text-slate-900">{achievement.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-slate-900 hover:bg-black rounded-2xl h-12 font-bold"
                >
                  Awesome!
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementUnlockOverlay;
