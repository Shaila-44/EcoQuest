import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  CheckCircle2, 
  Target, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export default function DailyProgress() {
  const [xpVal, setXpVal] = useState(0);
  const percentage = 75; // 75% completed
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const end = 450;
    const duration = 1200;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setXpVal(end);
        clearInterval(timer);
      } else {
        setXpVal(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card p-6 rounded-3xl border border-emerald-100/90 shadow-xl space-y-5 relative overflow-hidden h-full flex flex-col justify-between hover-card-lift">
      
      {/* AMBIENT LIGHTING GLOW */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* CARD TITLE */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 font-heading">Daily Progress</h3>
            <p className="text-[11px] text-slate-500 font-bold">Goal: 500 XP / 3 Missions</p>
          </div>
        </div>

        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          75% Complete
        </span>
      </div>

      {/* VISUAL METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative z-10 my-auto">
        
        {/* SVG PROGRESS RING (5 COLUMNS) */}
        <div className="sm:col-span-5 flex justify-center items-center relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                stroke="url(#ringGrad)"
                strokeWidth="10"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-slate-900 font-heading tracking-tight">{xpVal}</span>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mt-0.5">/ 500 XP</span>
            </div>
          </div>
        </div>

        {/* METRICS STATS (7 COLUMNS) */}
        <div className="sm:col-span-7 space-y-3">
          
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <span className="text-xs font-bold text-slate-700">Today's XP Earned</span>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">+450 XP</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-slate-700">Missions Completed</span>
            </div>
            <span className="text-xs font-black text-slate-900">2 / 3 Done</span>
          </div>

          {/* MOTIVATIONAL MESSAGE */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-300/80 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <p className="text-[11px] font-extrabold text-emerald-950 leading-tight">
              Just 1 more mission to unlock your +100 XP Daily Bonus Chest! 🎉
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
