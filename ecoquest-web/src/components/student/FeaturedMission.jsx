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
  Award
} from 'lucide-react';

export default function FeaturedMission({ onStartMission }) {
  return (
    <section className="relative space-y-4">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-black tracking-wider uppercase mb-1">
            <Flame className="w-4 h-4 text-emerald-600 fill-emerald-600 animate-pulse" />
            <span>DAILY QUEST HEADQUARTERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
            Today's Featured Mission
          </h2>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-black border border-emerald-300/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Double XP Active</span>
        </span>
      </div>

      {/* LARGE GAME-STYLE FEATURED MISSION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[36px] bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 border-2 border-emerald-500/40 p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-emerald-950/40 relative overflow-hidden group"
      >
        {/* AMBIENT BACKGROUND GLOW EFFECTS */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-700" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* QUEST TAPE BANNER */}
        <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Priority Quest</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* LEFT DETAILS (8 COLUMNS) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* DIFFICULTY & TIME BADGES */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Medium Difficulty</span>
              </span>

              <span className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-black flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>25 Mins</span>
              </span>

              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                <span>Recycling & Waste Drive</span>
              </span>
            </div>

            {/* MISSION TITLE */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-heading tracking-tight leading-tight">
                Campus Zero-Waste Plastic Drive ♻️
              </h3>
              <p className="text-sm sm:text-base text-slate-200/90 font-medium leading-relaxed max-w-2xl">
                Collect at least 5 single-use plastic bottles from home or school campus, segregate them properly into the recycling bin, and upload a photo proof to claim rewards!
              </p>
            </div>

            {/* REWARDS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              
              {/* XP REWARD */}
              <div className="bg-emerald-500/20 border border-emerald-400/40 p-3.5 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wider">XP Reward</div>
                  <div className="text-base font-black text-white">+350 XP</div>
                </div>
              </div>

              {/* ECO COIN REWARD */}
              <div className="bg-amber-500/20 border border-amber-400/40 p-3.5 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Coins className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <div className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wider">Eco Coins</div>
                  <div className="text-base font-black text-white">+120 Coins</div>
                </div>
              </div>

              {/* SPECIAL BADGE */}
              <div className="col-span-2 sm:col-span-1 bg-purple-500/20 border border-purple-400/40 p-3.5 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                  ♻️
                </div>
                <div>
                  <div className="text-[10px] text-purple-300 font-extrabold uppercase tracking-wider">Bonus Badge</div>
                  <div className="text-xs font-black text-white truncate">Plastic Hero</div>
                </div>
              </div>

            </div>

            {/* ENVIRONMENTAL IMPACT BANNER */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-400/20 text-emerald-300 flex-shrink-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-wider">Verified Real Impact</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200">
                  Prevents ~1.5 kg of plastic from entering landfills & reduces 3.2 kg CO₂ emissions
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-2">
              <button
                onClick={onStartMission}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-black text-base shadow-2xl shadow-emerald-400/40 hover:shadow-emerald-400/60 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group/btn"
              >
                <Target className="w-5 h-5 text-slate-950 group-hover/btn:rotate-45 transition-transform" />
                <span>ACCEPT QUEST & START MISSION</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* RIGHT GRAPHIC DECORATION (4 COLUMNS) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs aspect-square bg-emerald-900/40 rounded-3xl border border-emerald-400/30 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-md shadow-2xl">
              
              {/* RECYCLING QUEST ARTWORK SVG */}
              <svg viewBox="0 0 160 160" className="w-28 h-28 mb-3 animate-float-slow">
                <circle cx="80" cy="80" r="70" fill="url(#heroTreeGrad2)" opacity="0.3" />
                <circle cx="80" cy="80" r="55" fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="6 6" />
                <rect x="50" y="45" width="60" height="70" rx="14" fill="#10b981" />
                <path d="M 65 75 L 80 60 L 95 75 M 80 60 L 80 100" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="115" cy="50" r="14" fill="#fbbf24" />
                <text x="115" y="54" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="900">🪙</text>
              </svg>

              <h4 className="text-lg font-black text-white font-heading">Zero-Waste Target</h4>
              <p className="text-xs text-emerald-200/80 mt-1 font-medium">
                1,420 Students have accepted this mission today!
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Expires in 06h : 42m</span>
              </div>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
