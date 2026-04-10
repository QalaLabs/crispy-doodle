"use client";

import React, { useState, useEffect } from 'react';
import SleepCard from "./SleepCard";
import StepsCard from "./StepsCard";
import WorkoutCard from "./WorkoutCard";
import { Loader2, Activity } from "lucide-react";

const FALLBACK_METRICS = {
  sleep: {
    current: 7.5,
    target: 8,
    score: 92,
    unit: "hrs",
    history: [
      { day: 'Mon', value: 6.5 },
      { day: 'Tue', value: 7.2 },
      { day: 'Wed', value: 8.0 },
      { day: 'Thu', value: 7.5 },
      { day: 'Fri', value: 6.8 },
      { day: 'Sat', value: 8.5 },
      { day: 'Sun', value: 7.5 },
    ]
  },
  steps: {
    current: 8420,
    target: 10000,
    percentage: 84,
    unit: "steps"
  },
  workouts: {
    weeklyTotal: 145,
    target: 150,
    sessions: 4,
    unit: "mins"
  },
  lastSync: new Date().toISOString(),
  isConsented: true
};

const HealthMetricsPanel = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/health/metrics');
      if (!res.ok) throw new Error("API not reachable");
      const data = await res.json();
      if (data.success) {
        setMetrics(data.data);
      } else {
        setMetrics(FALLBACK_METRICS);
      }
    } catch (err) {
      console.warn("Using fallback health metrics data");
      setMetrics(FALLBACK_METRICS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center bg-white rounded-3xl border border-slate-100">
        <Loader2 className="w-8 h-8 text-[#0F5B56] animate-spin" />
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0F5B56]/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#0F5B56]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Health Vitals</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SleepCard data={metrics.sleep} />
        <StepsCard data={metrics.steps} />
        <WorkoutCard data={metrics.workouts} />
      </div>
    </div>
  );
};

export default HealthMetricsPanel;
