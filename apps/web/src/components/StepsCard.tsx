"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StepsCardProps {
  data: {
    current: number;
    target: number;
    percentage: number;
    unit: string;
  };
}

const StepsCard: React.FC<StepsCardProps> = ({ data }) => {
  const chartData = [
    { name: 'Completed', value: data.current },
    { name: 'Remaining', value: Math.max(0, data.target - data.current) }
  ];

  return (
    <Card className="border-none shadow-lg bg-white rounded-[32px] overflow-hidden">
      <CardContent className="p-6 flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={30}
                outerRadius={40}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill="#0F5B56" />
                <Cell fill="#F1F5F9" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#0F5B56]" />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Steps</h3>
            <p className="text-2xl font-black text-slate-900">{data.current.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0F5B56] transition-all duration-1000"
                style={{ width: `${data.percentage}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-[#0F5B56]">{data.percentage}%</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" />
            Goal: {data.target.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepsCard;
