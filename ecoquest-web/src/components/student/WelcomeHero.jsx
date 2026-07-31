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
  Compass,
  Crown,
  Heart
} from 'lucide-react';

const MascotCompanion = ({ message }) => (
  <div className="flex items-center gap-3 bg-[#082b1d]/90 backdrop-blur-xl border border-emerald-400/50 p-2.5 pr-4 rounded-2xl shadow-xl shadow-emerald-950/40 relative group">
    {/* Mascot Character Avatar */}
    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 p-0.5 shadow-md flex-shrink-0 animate-mascot-bob">
      <div className="w-full h-full bg-[#051912] rounded-[14px] flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          {/* Nature Spirit Fox/Owl Leaf Head */}
          <path d="M20 6C12 12 8 20 12 30C16 36 24 36 28 30C32 20 28 12 20 6Z" fill="#10b981" />
          <path d="M20 6C20 16 26 22 28 30" stroke="#6ee7b7" strokeWidth="2" fill="none" />
          {/* Eyes */}
          <circle cx="16" cy="20" r="2.5" fill="#04271b" />
          <circle cx="24" cy="20" r="2.5" fill="#04271b" />
          <circle cx="17" cy="19" r="0.8" fill="#ffffff" />
          <circle cx="25" cy="19" r="0.8" fill="#ffffff" />
          {/* Cute Cheeks */}
          <circle cx="13" cy="23" r="1.5" fill="#f43f5e" opacity="0.6" />
          <circle cx="27" cy="23" r="1.5" fill="#f43f5e" opacity="0.6" />
          {/* Smile */}
          <path d="M18 24Q20 27 22 24" stroke="#04271b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>

    {/* Mascot Dialogue Bubble */}
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-300 uppercase tracking-wider mb-0.5">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>LEAFY • MASCOT GUIDANCE</span>
      </div>
      <p className="text-xs font-black text-white font-heading leading-snug">
        {message}
      </p>
    </div>
  </div>
);

export default function WelcomeHero({ onStartFeaturedMission }) {
  const motivationalMessages = [
    "Complete today's B-Rank Quest to earn +350 XP & 150 Coins!",
    "Your 7-day flame streak unlocks a 1.5x XP multiplier bonus!",
    "Only 180 XP needed to reach Rank #3 in Hall of Champions!",
    "Your Sanctuary Class 8-A is currently ranked #2 in the Realm!"
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#062419] via-[#093223] to-[#04140d] text-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-emerald-950/50 border border-emerald-500/40 selection:bg-emerald-500 selection:text-white">
      
      {/* AMBIENT BACKGROUND GLOWS & BIOLUMINESCENT LIGHT RAYS */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
      <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl pointer-events-none -z-0" />
      
      {/* FLOATING AMBIENT FIREFLIES */}
      <div className="absolute top-12 left-20 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_10px_#fbbf24] animate-firefly pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399] animate-firefly pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-12 right-20 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24] animate-firefly pointer-events-none" style={{ animationDelay: '3s' }} />

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
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.12] font-heading tracking-tight">
              Welcome Back, <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">Rahul</span> 👋
            </h1>
            
            {/* ECOQUEST MASCOT DIALOGUE COMPANION */}
            <div className="pt-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.35 }}
                >
                  <MascotCompanion message={motivationalMessages[messageIndex]} />
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
              <ArrowUpRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </button>

            <div className="text-xs text-emerald-200 font-bold flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-400/30 px-4 py-3 rounded-2xl shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>B-Rank Quest: Campus Zero-Waste Plastic Drive (+350 XP)</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RICH ECO-ACTION STORY ILLUSTRATION (5 COLUMNS) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            
            {/* RICH ECO VECTOR STORY ILLUSTRATION SVG */}
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

              {/* SUN LIGHT RAYS */}
              <g opacity="0.25">
                <line x1="220" y1="80" x2="100" y2="350" stroke="#fef08a" strokeWidth="20" strokeLinecap="round" />
                <line x1="220" y1="80" x2="220" y2="380" stroke="#fef08a" strokeWidth="25" strokeLinecap="round" />
                <line x1="220" y1="80" x2="340" y2="350" stroke="#fef08a" strokeWidth="20" strokeLinecap="round" />
              </g>

              {/* RADIANT SUN */}
              <circle cx="220" cy="85" r="34" fill="url(#heroSunGrad2)" opacity="0.95" />
              <circle cx="220" cy="85" r="44" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="3" strokeDasharray="4 4" />

              {/* BIRDS FLYING TOWARDS SUN */}
              <g fill="none" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
                <path d="M 120 110 Q 130 100 140 110 Q 150 100 160 110" />
                <path d="M 280 125 Q 288 117 296 125 Q 304 117 312 125" />
              </g>

              {/* ECO HILL BASE */}
              <path d="M 40 340 Q 220 250 400 340 Z" fill="url(#heroHillGrad)" />
              <path d="M 80 340 Q 220 280 360 340 Z" fill="#10b981" opacity="0.3" />

              {/* TREE TRUNK & ROOT SYSTEM */}
              <path d="M 214 300 L 214 180 L 226 180 L 226 300 Z" fill="#78350f" />
              
              {/* TREE FOLIAGE CANOPY */}
              <circle cx="220" cy="150" r="50" fill="url(#heroTreeGrad2)" />
              <circle cx="185" cy="170" r="36" fill="#10b981" />
              <circle cx="255" cy="170" r="36" fill="#047857" />

              {/* FLOWERS & LEAVES ON HILL */}
              <circle cx="140" cy="305" r="6" fill="#f43f5e" />
              <circle cx="300" cy="310" r="6" fill="#fbbf24" />

              {/* STUDENT 1: PLANTING TREE SAPLING */}
              <g transform="translate(130, 240)">
                <circle cx="25" cy="18" r="9" fill="#fcd34d" />
                <path d="M 25 27 Q 35 42 45 52 L 15 52 Z" fill="#10b981" />
                <path d="M 25 32 L 42 48" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />
                {/* Sapling Tool */}
                <rect x="42" y="44" width="8" height="12" rx="2" fill="#78350f" />
              </g>

              {/* STUDENT 2: WATERING FLORA WITH CAN */}
              <g transform="translate(250, 235)">
                <circle cx="25" cy="18" r="9" fill="#fcd34d" />
                <path d="M 25 27 L 15 58 L 35 58 Z" fill="#14b8a6" />
                {/* Golden Watering Can */}
                <rect x="2" y="36" width="16" height="12" rx="3" fill="#fbbf24" />
                <path d="M -3 38 L 2 42" stroke="#fbbf24" strokeWidth="2.5" />
                {/* Water Droplets */}
                <circle cx="-8" cy="48" r="2" fill="#38bdf8" />
                <circle cx="-12" cy="54" r="2" fill="#38bdf8" />
              </g>

              {/* FLOATING BUTTERFLY */}
              <g transform="translate(320, 180)" className="animate-float-reverse">
                <path d="M0 0 Q-10 -10 -15 0 Q-10 10 0 0" fill="#fbbf24" />
                <path d="M0 0 Q10 -10 15 0 Q10 10 0 0" fill="#f43f5e" />
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


