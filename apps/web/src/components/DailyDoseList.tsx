"use client";

import React, { useState, useEffect } from 'react';
import DailyDoseCard, { DailyDose } from './DailyDoseCard';
import { showSuccess, showError } from "@/utils/toast";
import { Loader2, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DailyDoseList = () => {
  const [doses, setDoses] = useState<DailyDose[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const fetchDoses = async () => {
    try {
      const res = await fetch('/api/daily-dose');
      const data = await res.json();
      if (data.success) {
        setDoses(data.doses);
      }
    } catch (err) {
      console.error("Failed to fetch doses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoses();
  }, []);

  const handleComplete = async (id: string) => {
    const dose = doses.find(d => d.id === id);
    if (!dose || dose.completed) return;

    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Optimistic Update
    const previousDoses = [...doses];
    setDoses(prev => prev.map(d => d.id === id ? { ...d, completed: true } : d));
    setCompletingId(id);

    try {
      // 1. Complete Dose API
      const completeRes = await fetch(`/api/daily-dose/${id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: eventId,  })
      });

      if (!completeRes.ok) throw new Error("Failed to complete dose");

      // 2. Track Event API
      await fetch('/api/track/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "daily_dose.completed",
          payload: { doseId: id, eventId }
        })
      });

      showSuccess("Ritual completed! Your streak is growing.");
      
      // Mock Achievement Unlock for Demo
      const completedCount = previousDoses.filter(d => d.completed).length + 1;
      if (completedCount === 3) {
        window.dispatchEvent(new CustomEvent('achievement-unlocked', {
          detail: {
            id: "daily-master",
            name: "Daily Master",
            icon: "🏆",
            description: "You've completed all your rituals for today. Your Agni is strong!"
          }
        }));
      }
      
      // Trigger a refresh of the progress panel
      window.dispatchEvent(new CustomEvent('progress-updated'));
      
    } catch (err) {
      // Rollback on failure
      setDoses(previousDoses);
      showError("Failed to save completion. Please try again.");
    } finally {
      setCompletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const completedCount = doses.filter(d => d.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          <h3 className="text-xl font-bold text-slate-900">Daily Rituals</h3>
        </div>
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold">
          {completedCount}/{doses.length} Done
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doses.map((dose) => (
          <DailyDoseCard 
            key={dose.id} 
            dose={dose} 
            onComplete={handleComplete}
            isCompleting={completingId === dose.id}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyDoseList;