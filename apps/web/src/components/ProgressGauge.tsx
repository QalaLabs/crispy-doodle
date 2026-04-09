"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}

const ProgressGauge: React.FC<ProgressGaugeProps> = ({ 
  value, 
  size = 200, 
  strokeWidth = 16,
  className,
  onClick
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div 
      className={cn("relative flex items-center justify-center cursor-pointer group", className)}
      onClick={onClick}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Daily progress ${value} out of 100`}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100"
        />
        {/* Progress Ring with Gradient */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(12)">
            <stop offset="0%" stopColor="#C79A3B" />
            <stop offset="100%" stopColor="#E5B95F" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-5xl font-black text-slate-900 tracking-tighter">
          {Math.round(value)}
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          P Score
        </span>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-full bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300" />
    </div>
  );
};

export default ProgressGauge;