"use client";

import React from 'react';
import { format } from 'date-fns';
import { History, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  key: string;
  value: boolean;
  action: string;
  timestamp: string;
  version: number;
}

interface ConsentHistoryProps {
  history: HistoryItem[];
}

const ConsentHistory: React.FC<ConsentHistoryProps> = ({ history }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <History className="w-5 h-5 text-slate-400" />
        <h3 className="font-bold text-slate-900">Consent History</h3>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {history.map((item) => (
          <div key={item.id} className="relative flex items-start gap-6 group">
            <div className={cn(
              "absolute left-0 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110",
              item.value ? "bg-emerald-50" : "bg-rose-50"
            )}>
              {item.value ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500" />
              )}
            </div>

            <div className="flex-1 ml-12 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="text-sm font-bold text-slate-900 capitalize">
                  {item.key.replace('_', ' ')} {item.action === 'OPT_IN' ? 'Enabled' : 'Disabled'}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  {format(new Date(item.timestamp), 'MMM dd, yyyy • h:mm a')}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Version {item.version} • Action recorded via user dashboard settings.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsentHistory;
