import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Coins, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DailyReward() {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#fbbf24', '#34d399', '#f59e0b']
    });
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-amber-200/80 shadow-xl space-y-4 relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/50">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
            <Gift className="w-5 h-5 fill-amber-200" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 font-heading">Daily Login Bonus</h3>
            <p className="text-xs text-slate-500 font-medium">Claim your free daily eco rewards!</p>
          </div>
        </div>

        <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          Day 7 Reward
        </span>
      </div>

      {/* REWARD BREAKDOWN GRID */}
      <div className="grid grid-cols-3 gap-3">
        
        <div className="p-3 rounded-2xl bg-white border border-amber-200 text-center space-y-1 shadow-xs">
          <Zap className="w-5 h-5 text-emerald-600 fill-emerald-500 mx-auto" />
          <div className="text-xs font-black text-slate-900">+100 XP</div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Experience</div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-amber-200 text-center space-y-1 shadow-xs">
          <Coins className="w-5 h-5 text-amber-500 fill-amber-400 mx-auto" />
          <div className="text-xs font-black text-slate-900">+50 Coins</div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Eco Currency</div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-amber-200 text-center space-y-1 shadow-xs">
          <span className="text-xl block">🌱</span>
          <div className="text-xs font-black text-slate-900">Rare Seed</div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Mystery Badge</div>
        </div>

      </div>

      {/* CLAIM BUTTON */}
      <button
        onClick={handleClaim}
        disabled={claimed}
        className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
          claimed
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-none cursor-default'
            : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {claimed ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Daily Reward Claimed for Today! 🎉</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 fill-white" />
            <span>CLAIM TODAY'S REWARD (FREE)</span>
          </>
        )}
      </button>

    </div>
  );
}
