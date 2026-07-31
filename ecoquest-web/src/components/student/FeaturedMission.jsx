import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Clock, 
  Zap, 
  Coins, 
  Leaf, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Flame,
  Globe2,
  Award,
  Swords
} from 'lucide-react';

export default function FeaturedMission({ onStartMission }) {
  return (
    <section className="relative space-y-4">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-black tracking-wider uppercase mb-1">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>PRIMARY QUEST DISPATCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight flex items-center gap-2">
            <span>Today's Featured Quest</span>
            <span className="text-amber-400 text-sm font-black bg-amber-500/20 border border-amber-400/40 px-3 py-0.5 rounded-full">
              B-Rank Quest
            </span>
          </h2>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/40 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>Double XP & Loot Active</span>
        </span>
      </div>

      {/* RPG GAME-STYLE FEATURED QUEST CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[36px] bg-gradient-to-br from-[#092c1f] via-[#062016] to-[#04140d] border-2 border-emerald-500/40 p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-emerald-950/60 relative overflow-hidden group hover-card-lift"
      >
        {/* AMBIENT BACKGROUND GLOW EFFECTS */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-700" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* QUEST TYPE RIBBON */}
        <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
          <Swords className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Priority Quest</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* LEFT DETAILS (8 COLUMNS) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* DIFFICULTY & TIME BADGES */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>B-Rank • Medium Challenge</span>
              </span>

              <span className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-black flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>25 Mins</span>
              </span>

              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                <span>Recycling & Waste Sanctuary</span>
              </span>
            </div>

            {/* QUEST TITLE */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-heading tracking-tight leading-tight">
                Campus Zero-Waste Plastic Drive ♻️
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
                Gather 5 single-use plastic containers from home or school grounds, segregate them into designated recycling bins, and upload photo proof to receive instant XP & Loot Coins!
              </p>
            </div>

            {/* REWARDS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              
              {/* XP REWARD */}
              <div className="bg-[#051c14]/90 border border-emerald-400/40 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">Adventure XP</div>
                  <div className="text-base font-black text-white">+350 XP</div>
                </div>
              </div>

              {/* LOOT COIN REWARD */}
              <div className="bg-[#1c1705]/90 border border-amber-400/40 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Coins className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <div className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">Loot Coins</div>
                  <div className="text-base font-black text-amber-300">+150 Coins</div>
                </div>
              </div>

              {/* SPECIAL TROPHY BADGE */}
              <div className="col-span-2 sm:col-span-1 bg-[#1a0e2e]/90 border border-purple-400/40 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                  ♻️
                </div>
                <div>
                  <div className="text-[10px] text-purple-300 font-extrabold uppercase tracking-wider">Quest Loot</div>
                  <div className="text-xs font-black text-white truncate">Plastic Guardian</div>
                </div>
              </div>

            </div>

            {/* ENVIRONMENTAL IMPACT BANNER */}
            <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-md flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-400/20 text-emerald-300 flex-shrink-0">
                <Globe2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">Verified Real-World Impact</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200">
                  Prevents ~1.5 kg plastic from entering landfills & reduces 3.2 kg CO₂ emissions
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-2">
              <button
                onClick={onStartMission}
                className="w-full sm:w-auto px-9 py-4.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-base shadow-2xl shadow-emerald-400/40 hover:shadow-emerald-400/60 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group/btn border border-emerald-200/50"
              >
                <Target className="w-5 h-5 text-slate-950 group-hover/btn:rotate-45 transition-transform" />
                <span>ACCEPT QUEST & CLAIM LOOT</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* RIGHT GRAPHIC DECORATION (4 COLUMNS) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs aspect-square bg-[#051c14]/80 rounded-3xl border border-emerald-400/40 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-md shadow-2xl">
              
              {/* RECYCLING QUEST ARTWORK SVG */}
              <svg viewBox="0 0 160 160" className="w-28 h-28 mb-3 animate-float-slow">
                <circle cx="80" cy="80" r="70" fill="url(#heroTreeGrad2)" opacity="0.3" />
                <circle cx="80" cy="80" r="55" fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="6 6" />
                <rect x="50" y="45" width="60" height="70" rx="14" fill="#10b981" />
                <path d="M 65 75 L 80 60 L 95 75 M 80 60 L 80 100" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="115" cy="50" r="14" fill="#fbbf24" />
                <text x="115" y="54" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="900">🪙</text>
              </svg>

              <h4 className="text-lg font-black text-white font-heading">Zero-Waste Directive</h4>
              <p className="text-xs text-emerald-300/80 mt-1 font-medium">
                1,420 Adventurers have accepted this quest today!
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black text-amber-300 bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-400/40">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Expires in 06h : 42m</span>
              </div>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}

