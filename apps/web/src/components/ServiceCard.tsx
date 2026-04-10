"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  shortDesc: string;
  whatItIs: string;
  whoItIsFor: string;
  outcome: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  accent: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  shortDesc,
  whatItIs,
  whoItIsFor,
  outcome,
  icon: Icon,
  color,
  bg,
  accent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "relative overflow-hidden rounded-[32px] border transition-all duration-500 cursor-pointer group",
        isExpanded ? "bg-white shadow-2xl border-slate-200" : cn("bg-slate-50/50 border-transparent hover:bg-white hover:shadow-xl", bg)
      )}
    >
      {/* Energy Ripple Effect on Hover */}
      <div className={cn(
        "absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl",
        accent
      )} />

      <div className="p-8 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
              bg, color
            )}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">{title}</h3>
              <p className="text-slate-500 font-medium mt-1">{shortDesc}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="overflow-hidden"
            >
              <div className="pt-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">What it is</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{whatItIs}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Who it is for</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{whoItIsFor}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">The Outcome</h4>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {outcome}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <Button asChild className="bg-slate-900 hover:bg-black rounded-xl px-8 h-12 font-bold">
                    <Link href="/contact" onClick={(e) => e.stopPropagation()}>
                      Book a Session <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
