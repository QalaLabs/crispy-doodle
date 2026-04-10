"use client";

import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Info, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "Time for Meditation", message: "Your morning Vata-balancing session starts in 5 minutes.", type: "reminder", time: "Just now", read: false },
  { id: 2, title: "Achievement Unlocked!", message: "You've completed a 7-day streak of Surya Namaskar.", type: "achievement", time: "2 hours ago", read: false },
  { id: 3, title: "New Course Available", message: "Dr. Sharma just released 'Ayurvedic Cooking for Pitta'.", type: "update", time: "5 hours ago", read: true },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100">
          <Bell className="w-5 h-5 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-none shadow-2xl rounded-2xl overflow-hidden" align="end">
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <h3 className="font-bold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-400">No new notifications</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={cn(
                  "p-4 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 flex gap-3",
                  !n.read && "bg-blue-50/30"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  n.type === 'reminder' ? "bg-blue-100 text-blue-600" :
                  n.type === 'achievement' ? "bg-amber-100 text-amber-600" :
                  "bg-indigo-100 text-indigo-600"
                )}>
                  {n.type === 'reminder' ? <Zap className="w-4 h-4" /> :
                   n.type === 'achievement' ? <Sparkles className="w-4 h-4" /> :
                   <Info className="w-4 h-4" />}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <span className="text-[9px] text-slate-400 font-medium">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-3 bg-slate-50 text-center">
          <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">
            View all activity
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
