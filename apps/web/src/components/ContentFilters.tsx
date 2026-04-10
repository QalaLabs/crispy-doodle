"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { BookOpen, Zap, Users, Layers } from 'lucide-react';

interface ContentFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'all', label: 'All Insights', icon: Layers },
  { id: 'blog', label: 'Education', icon: BookOpen },
  { id: 'news', label: 'Brand News', icon: Zap },
  { id: 'story', label: 'Client Stories', icon: Users },
];

const ContentFilters: React.FC<ContentFiltersProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300",
              isActive
                ? "text-white shadow-xl shadow-slate-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-slate-900 rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className={cn("w-4 h-4", isActive ? "text-amber-400" : "text-slate-400")} />
            <span className="uppercase tracking-widest text-[10px]">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContentFilters;
