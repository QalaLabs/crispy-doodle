"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface WorkoutCardProps {
  data: {
    weeklyTotal: number;
    target: number;
    sessions: number;
    unit: string;
  };
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ data }) => {
  return (
    <Card className="border-none shadow-lg bg-white rounded-[32px] overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-rose-500" />
          </div>
          <Badge variant="secondary" className="bg-rose-50 text-rose-600 border-none font-bold text-[10px]">
            {data.sessions} Sessions
          </Badge>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weekly Activity</h3>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black text-slate-900">{data.weeklyTotal}</p>
            <span className="text-xs font-bold text-slate-400">{data.unit}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-slate-400">Progress</span>
            <span className="text-rose-500">{Math.round((data.weeklyTotal / data.target) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500"
              style={{ width: `${(data.weeklyTotal / data.target) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
