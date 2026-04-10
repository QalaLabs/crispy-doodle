"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface StateProps {
  before: {
    label: string;
    description: string;
    metrics: { label: string; value: string }[];
  };
  after: {
    label: string;
    description: string;
    metrics: { label: string; value: string }[];
  };
}

const StateVisualization: React.FC<StateProps> = ({ before, after }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Before State */}
      <div className="p-8 rounded-[32px] bg-rose-50/50 border border-rose-100 space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <AlertCircle className="w-24 h-24 text-rose-500" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest text-rose-900">{before.label}</h4>
        </div>
        <p className="text-sm text-rose-700/80 leading-relaxed">{before.description}</p>
        <div className="grid grid-cols-2 gap-4 pt-4">
          {before.metrics.map((m, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400">{m.label}</p>
              <p className="text-lg font-black text-rose-600">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* After State */}
      <div className="p-8 rounded-[32px] bg-emerald-50/50 border border-emerald-100 space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <CheckCircle2 className="w-24 h-24 text-emerald-500" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest text-emerald-900">{after.label}</h4>
        </div>
        <p className="text-sm text-emerald-700/80 leading-relaxed">{after.description}</p>
        <div className="grid grid-cols-2 gap-4 pt-4">
          {after.metrics.map((m, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">{m.label}</p>
              <p className="text-lg font-black text-emerald-600">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateVisualization;
