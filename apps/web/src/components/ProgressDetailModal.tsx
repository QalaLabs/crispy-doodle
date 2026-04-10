"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ProgressDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { date: string; score: number }[];
}

const ProgressDetailModal: React.FC<ProgressDetailModalProps> = ({ isOpen, onClose, data }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">30-Day Progress Journey</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Large Chart */}
          <div className="h-[300px] w-full bg-slate-50 rounded-2xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="modalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C79A3B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C79A3B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#C79A3B"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#modalGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Daily Breakdown</h4>
            <div className="border rounded-2xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Date</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">P Score</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.slice().reverse().map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="text-sm font-medium text-slate-600">{day.date}</TableCell>
                      <TableCell className="text-sm font-bold text-slate-900">{day.score}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest",
                          day.score >= 80 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        )}>
                          {day.score >= 80 ? "Optimal" : "Improving"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressDetailModal;
