import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Zap, 
  ArrowUpRight, 
  Leaf, 
  Target,
  ShieldCheck,
  TrendingUp,
  Sprout,
  Compass
} from 'lucide-react';

export default function WelcomeHero({ onStartFeaturedMission }) {
  const motivationalMessages = [
    "🌱 Complete today's B-Rank Quest and earn +350 XP & 150 Coins",
    "🔥 Your 7-day flame streak unlocks a 1.5x XP multiplier",
    "🏆 Only 180 XP needed to reach Rank #3 in Hall of Champions",
    "🌍 Guild 8-A is currently ranked #2 in the Realm"
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#062419] via-[#093223] to-[#04140d] text-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-emerald-950/50 border border-emerald-500/40">
      
      {/* AMBIENT BACKGROUND GLOWS & BIOLUMINESCENT LIGHT RAYS */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
      <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl pointer-events-none -z-0" />
      
      {/* RPG FRAME OVERLAY LINE */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: DYNAMIC GREETING & METRICS (7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* TAG BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>ADVENTURER COMMAND CENTER</span>
          </div>

          {/* MAIN HEADING */}
          <div className="space-y-2.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.12] font-heading tracking-tight">
              Welcome Back, <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">Rahul</span> 👋
            </h1>
            
            {/* ROTATING DYNAMIC MOTIVATIONAL QUEST INTEL */}
            <div className="h-8 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-200 bg-emerald-950/80 border border-emerald-400/40 px-3.5 py-1.5 rounded-xl backdrop-blur-md shadow-sm"
                >
                  <span>{motivationalMessages[messageIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ADVENTURER STATS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            
            {/* LEVEL */}
            <div className="bg-[#041a12]/80 backdrop-blur-md border border-emerald-500/30 p-3.5 rounded-2xl hover:border-emerald-400/60 transition-all hover:scale-[1.02] shadow-md">
              <div className="flex items-center gap-1.5 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Rank Tier</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-heading">
                Lvl 12
              </div>
              <span className="text-[10px] text-amber-300 font-black block mt-0.5">B-Rank Guardian</span>
            </div>

            {/* XP */}
            <div className="bg-[#041a12]/80 backdrop-blur-md border border-emerald-500/30 p-3.5 rounded-2xl hover:border-teal-400/60 transition-all hover:scale-[1.02] shadow-md">
              <div className="flex items-center gap-1.5 text-teal-300 text-[10px] font-black uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5 fill-teal-300" />
                <span>Adventure XP</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-heading">
                3,450
              </div>
              <span className="text-[10px] text-emerald-300 font-bold block mt-0.5">/ 5,000 XP</span>
            </div>

            {/* RANK */}
            <div className="bg-[#041a12]/80 backdrop-blur-md border border-emerald-500/30 p-3.5 rounded-2xl hover:border-amber-400/60 transition-all hover:scale-[1.02] shadow-md">
              <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Champions</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-heading">
                #4 <span className="text-xs text-white/80 font-normal">Class</span>
              </div>
              <span className="text-[10px] text-amber-200/80 font-bold block mt-0.5">#12 in Realm</span>
            </div>

            {/* STREAK */}
            <div className="bg-[#041a12]/80 backdrop-blur-md border border-emerald-500/30 p-3.5 rounded-2xl hover:border-orange-400/60 transition-all hover:scale-[1.02] shadow-md">
              <div className="flex items-center gap-1.5 text-orange-300 text-[10px] font-black uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 fill-orange-300" />
                <span>Flame Streak</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-orange-400 font-heading">
                7 Days
              </div>
              <span className="text-[10px] text-orange-200/80 font-bold block mt-0.5">🔥 Multiplier 1.5x</span>
            </div>

          </div>

          {/* PRIMARY CALL TO ACTION BUTTON */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartFeaturedMission}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-400/35 hover:shadow-emerald-400/60 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer group border border-emerald-200/50"
            >
              <Target className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
              <span>Start Today's Quest</span>
              <ArrowUpRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-xs text-emerald-200 font-bold flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-400/30 px-4 py-3 rounded-2xl shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>B-Rank Quest: Campus Zero-Waste Plastic Drive (+350 XP)</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ENCHANTER VECTOR ARTWORK ILLUSTRATION (5 COLUMNS) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            
            {/* RICH ECO VECTOR ILLUSTRATION SVG */}
            <svg viewBox="0 0 440 440" className="w-full h-full drop-shadow-2xl animate-float-slow">
              <defs>
                <linearGradient id="heroTreeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                <linearGradient id="heroSunGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>

                <linearGradient id="heroHillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
              </defs>

              {/* LIGHT RAYS */}
              <g opacity="0.2">
                <line x1="220" y1="80" x2="100" y2="350" stroke="#fef08a" strokeWidth="20" strokeLinecap="round" />
                <line x1="220" y1="80" x2="220" y2="380" stroke="#fef08a" strokeWidth="25" strokeLinecap="round" />
                <line x1="220" y1="80" x2="340" y2="350" stroke="#fef08a" strokeWidth="20" strokeLinecap="round" />
              </g>

              {/* SUN RADIANCE */}
              <circle cx="220" cy="85" r="34" fill="url(#heroSunGrad2)" opacity="0.95" />
              <circle cx="220" cy="85" r="44" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="3" strokeDasharray="4 4" />

              {/* BIRDS FLYING */}
              <g fill="none" stroke="#fef08a" strokeWidth="2" opacity="0.8">
                <path d="M 120 110 Q 130 100 140 110 Q 150 100 160 110" />
                <path d="M 280 125 Q 288 117 296 125 Q 304 117 312 125" />
              </g>

              {/* ECO HILL BASE */}
              <path d="M 40 340 Q 220 250 400 340 Z" fill="url(#heroHillGrad)" />
              <path d="M 80 340 Q 220 280 360 340 Z" fill="#10b981" opacity="0.3" />

              {/* CENTRAL GROWING SAPLING & ADULT TREE */}
              <path d="M 214 300 L 214 180 L 226 180 L 226 300 Z" fill="#78350f" />
              
              {/* TREE FOLIAGE CANOPY */}
              <circle cx="220" cy="150" r="50" fill="url(#heroTreeGrad2)" />
              <circle cx="185" cy="170" r="36" fill="#10b981" />
              <circle cx="255" cy="170" r="36" fill="#047857" />

              {/* FLOWERS & LEAVES ON HILL */}
              <circle cx="140" cy="305" r="6" fill="#f43f5e" />
              <circle cx="300" cy="310" r="6" fill="#fbbf24" />

              {/* ADVENTURER 1 PLANTING SAPLING */}
              <g transform="translate(140, 240)">
                <circle cx="25" cy="20" r="10" fill="#f8fafc" />
                <path d="M 25 30 Q 35 45 45 55 L 15 55 Z" fill="#34d399" />
                <path d="M 25 35 L 45 50" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* ADVENTURER 2 WATERING SAPLING */}
              <g transform="translate(250, 235)">
                <circle cx="25" cy="20" r="10" fill="#f8fafc" />
                <path d="M 25 30 L 15 60 L 35 60 Z" fill="#38bdf8" />
                <rect x="0" y="38" width="16" height="12" rx="3" fill="#fbbf24" />
                <path d="M -5 40 L 0 44" stroke="#fbbf24" strokeWidth="2" />
                <circle cx="-10" cy="50" r="2" fill="#38bdf8" />
                <circle cx="-14" cy="55" r="2" fill="#38bdf8" />
              </g>

              {/* FLOATING BIOLUMINESCENT LEAVES */}
              <g className="animate-float-reverse">
                <path d="M 100 160 Q 120 140 130 170 Q 110 180 100 160 Z" fill="#34d399" />
                <path d="M 330 150 Q 350 130 360 160 Q 340 170 330 150 Z" fill="#6ee7b7" />
              </g>

              {/* LOOT BADGE ORBITS */}
              <g transform="translate(310, 220)">
                <rect x="0" y="0" width="95" height="38" rx="19" fill="rgba(6, 36, 25, 0.95)" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="1.5" />
                <text x="47.5" y="24" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="900">+350 XP</text>
              </g>

              <g transform="translate(35, 195)">
                <rect x="0" y="0" width="105" height="38" rx="19" fill="rgba(35, 20, 5, 0.95)" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="1.5" />
                <text x="52.5" y="24" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="900">🔥 7D Streak</text>
              </g>
            </svg>

          </div>
        </div>

      </div>

    </section>
  );
}

