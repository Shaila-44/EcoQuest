import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Check, 
  Gift, 
  Calendar, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function StreakCard() {
  const days = [
    { day: 'Mon', active: true, label: 'Checked' },
    { day: 'Tue', active: true, label: 'Checked' },
    { day: 'Wed', active: true, label: 'Checked' },
    { day: 'Thu', active: true, label: 'Checked' },
    { day: 'Fri', active: true, label: 'Checked' },
    { day: 'Sat', active: true, label: 'Checked' },
    { day: 'Sun', today: true, active: true, label: 'Active 🔥' },
  ];

  return (
    <div className="glass-card p-6 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4 relative overflow-hidden bg-gradient-to-br from-[#1b1406] via-[#0f241a] to-[#04140d] h-full flex flex-col justify-between hover-card-lift text-slate-100">
      
      {/* AMBIENT GLOW DECORATION */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 relative">
            <Flame className="w-6 h-6 fill-slate-950 text-slate-950 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-300 rounded-full border-2 border-[#05130d]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white font-heading">7-Day Flame Streak!</h3>
              <span className="text-xs font-black text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full shadow-sm">
                1.5x Multiplier
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 font-bold">Keep your eco-flame burning — complete today's quest!</p>
          </div>
        </div>
      </div>

      {/* 7-DAY RUNE CALENDAR STRIP */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1 relative z-10 my-auto">
        {days.map((item) => (
          <div
            key={item.day}
            className={`p-2 sm:p-3 rounded-2xl text-center border flex flex-col items-center justify-between transition-all ${
              item.today
                ? 'bg-gradient-to-b from-amber-500 to-orange-600 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/40 scale-105 font-black'
                : item.active
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/50 text-slate-500 border-emerald-500/15'
            }`}
          >
            <span className={`text-[10px] font-black uppercase tracking-wider ${item.today ? 'text-slate-950' : 'text-slate-400'}`}>
              {item.day}
            </span>

            <div className="my-1.5">
              {item.today ? (
                <Flame className="w-4 h-4 fill-slate-950 text-slate-950 animate-pulse" />
              ) : item.active ? (
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              )}
            </div>

            <span className={`text-[9px] font-black ${item.today ? 'text-slate-950' : 'text-emerald-400'}`}>
              {item.today ? 'ACTIVE' : '+50XP'}
            </span>
          </div>
        ))}
      </div>

      {/* REWARD PREVIEW */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-orange-950/60 to-amber-950/80 border border-amber-500/40 flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow-sm font-black">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white font-heading">7-Day Streak Loot Reward</h4>
            <p className="text-[11px] font-bold text-amber-200/90">Unlocked: 200 Loot Coins & Eternal Flame Badge 🔥</p>
          </div>
        </div>

        <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 whitespace-nowrap shadow-sm">
          Claimed ✨
        </span>
      </div>

    </div>
  );
}

