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
    { day: 'Sun', today: true, active: true, label: 'Today 🔥' },
  ];

  return (
    <div className="glass-card p-6 rounded-3xl border border-orange-200/90 shadow-xl space-y-4 relative overflow-hidden bg-gradient-to-br from-white via-orange-50/40 to-amber-50/50 h-full flex flex-col justify-between hover-card-lift">
      
      {/* GLOW DECORATION & PARTICLES */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-orange-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 relative">
            <Flame className="w-6 h-6 fill-amber-200 text-orange-100 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900 font-heading">7 Day Streak!</h3>
              <span className="text-xs font-black text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-300">
                1.5x Multiplier
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold">Keep the fire burning — don't break your streak!</p>
          </div>
        </div>
      </div>

      {/* 7-DAY CALENDAR STRIP */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1 relative z-10 my-auto">
        {days.map((item) => (
          <div
            key={item.day}
            className={`p-2 sm:p-3 rounded-2xl text-center border flex flex-col items-center justify-between transition-all ${
              item.today
                ? 'bg-gradient-to-b from-orange-500 to-amber-500 text-white border-orange-400 shadow-lg shadow-orange-500/40 scale-105'
                : item.active
                  ? 'bg-emerald-500/15 text-emerald-900 border-emerald-300/80'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <span className={`text-[10px] font-black uppercase tracking-wider ${item.today ? 'text-white' : 'text-slate-500'}`}>
              {item.day}
            </span>

            <div className="my-1.5">
              {item.today ? (
                <Flame className="w-4 h-4 fill-amber-200 text-white animate-pulse" />
              ) : item.active ? (
                <Check className="w-4 h-4 text-emerald-600 font-black" />
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              )}
            </div>

            <span className={`text-[9px] font-extrabold ${item.today ? 'text-amber-100' : 'text-emerald-700'}`}>
              {item.today ? 'ACTIVE' : '+50XP'}
            </span>
          </div>
        ))}
      </div>

      {/* REWARD PREVIEW */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-300/80 flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 font-heading">7-Day Streak Reward</h4>
            <p className="text-[11px] font-bold text-slate-600">Unlocked: 200 Bonus Coins & Fire Badge 🔥</p>
          </div>
        </div>

        <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 whitespace-nowrap shadow-xs">
          Claimed ✨
        </span>
      </div>

    </div>
  );
}
