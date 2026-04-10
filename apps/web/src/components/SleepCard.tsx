"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Info } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { cn } from "@/lib/utils";

interface SleepCardProps {
  data: {
    current: number;
    target: number;
    score: number;
    unit: string;
    history: { day: string; value: number }[];
  };
}

const SleepCard: React.FC<SleepCardProps> = ({ data }) => {
  return (
    <Card className="border-none shadow-lg bg-[#F3F0FF] rounded-[32px] overflow-hidden group">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/50 flex items-center justify-center">
              <Moon className="w-5 h-5 text-[#0F5B56]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F5B56] uppercase tracking-widest">Sleep</h3>
              <p className="text-2xl font-black text-slate-900">{data.current}{data.unit}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sleep Score</span>
            <p className="text-lg font-black text-indigo-600">{data.score}</p>
          </div>
        </div>

        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.history}>
              <XAxis dataKey="day" hide />
              <YAxis hide domain={[0, 10]} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.3)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.history.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === data.history.length - 1 ? '#6366F1' : '#C7D2FE'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-indigo-600 font-bold uppercase tracking-widest bg-white/40 p-2 rounded-xl">
          <Info className="w-3 h-3" />
          Target: {data.target}h • Consistent schedule
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepCard;
