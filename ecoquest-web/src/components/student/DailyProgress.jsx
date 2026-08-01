import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  CheckCircle2, 
  Target, 
  Sparkles,
  TrendingUp,
  Award,
  ShieldCheck
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
    <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-5 relative overflow-hidden h-full flex flex-col justify-between hover-card-lift text-slate-100">
      
      {/* AMBIENT LIGHTING GLOW */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* CARD TITLE */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 shadow-md shadow-emerald-600/30">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-black text-white font-heading">Adventure Progress</h3>
            <p className="text-[11px] text-emerald-300 font-bold">Goal: 500 XP / 3 Daily Quests</p>
          </div>
        </div>

        <span className="text-xs font-black text-emerald-300 bg-emerald-950 border border-emerald-500/40 px-3 py-1 rounded-full shadow-sm">
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
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-emerald-950"
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
              <span className="text-3xl font-black text-white font-heading tracking-tight drop-shadow-md">{xpVal}</span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-0.5">/ 500 XP</span>
            </div>
          </div>
        </div>

        {/* METRICS STATS (7 COLUMNS) */}
        <div className="sm:col-span-7 space-y-3">
          
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#062016]/90 border border-emerald-500/25 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span className="text-xs font-bold text-slate-200">Today's XP Earned</span>
            </div>
            <span className="text-xs font-black text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/30">+450 XP</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#062016]/90 border border-emerald-500/25 shadow-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-slate-200">Quests Completed</span>
            </div>
            <span className="text-xs font-black text-white">2 / 3 Done</span>
          </div>

          {/* MOTIVATIONAL MESSAGE */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border border-emerald-500/35 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 animate-spin-slow" />
            <p className="text-[11px] font-black text-amber-300 leading-tight">
              1 more quest to unlock your +100 XP Daily Loot Chest! 🎁
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

