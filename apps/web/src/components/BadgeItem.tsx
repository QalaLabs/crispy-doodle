"use client";

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Share2, Lock } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  earnedAt: string | null;
  icon: string;
  requirement: string;
  isEarned: boolean;
}

interface BadgeItemProps {
  achievement: Achievement;
  onClick: (achievement: Achievement) => void;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ achievement, onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => onClick(achievement)}
          className={cn(
            "relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2",
            achievement.isEarned 
              ? "bg-[#C79A3B]/10 border-2 border-[#C79A3B] shadow-lg shadow-[#C79A3B]/10 hover:scale-110 focus:ring-[#C79A3B]" 
              : "bg-[#F5F5F0] border-2 border-slate-200 grayscale opacity-60 hover:opacity-100 focus:ring-slate-400"
          )}
          aria-label={`${achievement.isEarned ? 'Earned' : 'Locked'} achievement: ${achievement.name}`}
        >
          <span className="text-3xl">{achievement.icon}</span>
          
          {achievement.isEarned ? (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Share2 className="w-3 h-3 text-[#C79A3B]" />
            </div>
          ) : (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-200 rounded-full shadow-sm flex items-center justify-center">
              <Lock className="w-3 h-3 text-slate-500" />
            </div>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="bg-slate-900 text-white border-none rounded-xl p-3 max-w-[200px]">
        <div className="space-y-1">
          <p className="font-bold text-xs">{achievement.name}</p>
          <p className="text-[10px] text-slate-400 leading-relaxed">{achievement.description}</p>
          {achievement.earnedAt && (
            <p className="text-[9px] font-bold text-[#C79A3B] uppercase tracking-widest pt-1">
              Earned {format(new Date(achievement.earnedAt), 'MMM dd, yyyy')}
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default BadgeItem;