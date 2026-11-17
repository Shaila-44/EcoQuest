import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Users, 
  TreePine, 
  ArrowRight,
  Gift,
  Award
} from 'lucide-react';

export default function SeasonalEvents() {
  const [timeLeft, setTimeLeft] = useState({
    days: '04',
    hours: '18',
    minutes: '42',
    seconds: '15'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let sec = parseInt(prev.seconds, 10) - 1;
        if (sec < 0) sec = 59;
        return {
          ...prev,
          seconds: sec < 10 ? `0${sec}` : `${sec}`
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card p-6 rounded-3xl border border-teal-200 shadow-xl space-y-5 relative overflow-hidden bg-gradient-to-br from-white via-teal-50/20 to-emerald-50/30 hover-card-lift">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-teal-800 uppercase tracking-widest block">NATIONWIDE CAMPAIGN</span>
            <h3 className="text-xl font-black text-slate-900 font-heading">Earth Day 2026: Million Trees</h3>
          </div>
        </div>

        {/* COUNTDOWN TIMER */}
        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-md font-mono text-xs font-bold">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300 font-extrabold">{timeLeft.days}d</span> : 
          <span>{timeLeft.hours}h</span> : 
          <span>{timeLeft.minutes}m</span> : 
          <span className="text-amber-400">{timeLeft.seconds}s</span>
        </div>
      </div>

      {/* EVENT BANNER CONTENT */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-950 text-white space-y-4 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-black">
              <TreePine className="w-4 h-4" />
              <span>Target: 10,000 Saplings Nationwide (7,420 Planted)</span>
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-xl">
              Join 5,000+ students from 120 schools in this week's mega tree plantation challenge. Earn double XP & special Earth Day 2026 Champion Badge!
            </p>

            {/* EVENT PROGRESS BAR */}
            <div className="w-full max-w-md pt-1 space-y-1">
              <div className="flex justify-between text-[10px] font-black text-emerald-300">
                <span>Nationwide Goal Progress</span>
                <span>74.2%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full" style={{ width: '74.2%' }} />
              </div>
            </div>
          </div>

          <button className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs shadow-xl shadow-emerald-400/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-start sm:self-center">
            <Gift className="w-4 h-4" />
            <span>Join Event & Claim Badge</span>
          </button>
        </div>
      </div>

    </div>
  );
}
