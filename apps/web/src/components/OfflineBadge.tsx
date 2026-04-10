"use client";

import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/use-online-status';

const OfflineBadge = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-rose-500 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-rose-400/50 backdrop-blur-md">
        <WifiOff className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest">Offline Mode</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      </div>
    </div>
  );
};

export default OfflineBadge;
