"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DailyDose {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

interface DailyDoseCardProps {
  dose: DailyDose;
  onComplete: (id: string) => void;
  isCompleting: boolean;
}

const DailyDoseCard: React.FC<DailyDoseCardProps> = ({ dose, onComplete, isCompleting }) => {
  return (
    <Card className={cn(
      "border-none shadow-md rounded-xl overflow-hidden transition-all duration-300 p-4",
      dose.completed ? "bg-emerald-50/50 ring-1 ring-emerald-100" : "bg-white hover:shadow-lg"
    )}>
      <CardContent className="p-0 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className={cn(
              "font-bold text-slate-900 transition-colors",
              dose.completed && "text-emerald-900"
            )}>
              {dose.title}
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Clock className="w-3 h-3" />
              {dose.duration}
            </div>
          </div>
          {dose.completed && (
            <div className="w-8 h-8 rounded-full bg-[#C79A3B]/10 flex items-center justify-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-[#C79A3B]" />
            </div>
          )}
        </div>

        <p className={cn(
          "text-xs leading-relaxed text-slate-500",
          dose.completed && "text-emerald-700/70"
        )}>
          {dose.description}
        </p>

        <Button
          onClick={() => onComplete(dose.id)}
          disabled={dose.completed || isCompleting}
          variant={dose.completed ? "ghost" : "default"}
          className={cn(
            "w-full h-10 rounded-lg font-bold text-xs transition-all",
            dose.completed 
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 cursor-default" 
              : "bg-slate-900 hover:bg-black text-white shadow-sm"
          )}
          aria-pressed={dose.completed}
        >
          {isCompleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
          ) : dose.completed ? (
            <>
              <Sparkles className="w-3.5 h-3.5 mr-2 text-[#C79A3B]" />
              Completed
            </>
          ) : (
            "Mark as Complete"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyDoseCard;