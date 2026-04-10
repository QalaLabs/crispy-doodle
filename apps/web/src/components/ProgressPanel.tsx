"use client";

import React, { useState, useEffect } from 'react';
import ProgressGauge from "./ProgressGauge";
import SecondaryMetrics from "./SecondaryMetrics";
import DailyDoseCTA from "./DailyDoseCTA";
import ProgressDetailModal from "./ProgressDetailModal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ProgressPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<any>(null);
  const [healthMetrics, setHealthMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, metricsRes] = await Promise.all([
          fetch('/api/profile/progress'),
          fetch('/api/health/metrics')
        ]);

        const progress = await progressRes.json();
        const metrics = await metricsRes.json();

        setProgressData(progress);
        setHealthMetrics(metrics.metrics);
      } catch (err) {
        console.error("Failed to fetch progress panel data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-white rounded-3xl border border-slate-100">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!progressData || !healthMetrics) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-100">
        <p className="text-slate-400 font-medium">No progress data available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Gauge & Trend */}
      <Card className="lg:col-span-8 border-none shadow-lg bg-white overflow-hidden rounded-3xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Gauge */}
            <div className="shrink-0">
              <ProgressGauge
                value={progressData.summary.latest}
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* 7-Day Trend */}
            <div className="flex-1 w-full space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Weekly Trend</h3>
                <p className="text-xs text-slate-400 font-medium">Your progress score over the last 7 days.</p>
              </div>
              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData.trend}>
                    <XAxis dataKey="date" hide />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#C79A3B"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#C79A3B', strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">7-Day Summary</span>
                <span className="text-sm font-bold text-emerald-500">+12% improvement</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right: CTA & Secondary Metrics */}
      <div className="lg:col-span-4 space-y-8">
        <DailyDoseCTA />
        <SecondaryMetrics metrics={healthMetrics} />
      </div>

      <ProgressDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={progressData.trend}
      />
    </div>
  );
};

export default ProgressPanel;
