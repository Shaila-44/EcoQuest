import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  TreePine, 
  Recycle, 
  Cloud, 
  Coins, 
  Bird, 
  Sun, 
  ShieldCheck 
} from 'lucide-react';

export default function FloatingIllustration() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      
      {/* Background Orbit Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-emerald-300/40 pointer-events-none"
      />

      {/* Sun & Clouds */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 left-6 text-amber-400 opacity-90"
      >
        <Sun className="w-10 h-10 animate-spin-slow text-amber-400 fill-amber-300/40" />
      </motion.div>

      <motion.div
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-12 text-teal-200/80"
      >
        <Cloud className="w-12 h-12 fill-teal-100/40" />
      </motion.div>

      {/* Floating Bird */}
      <motion.div
        animate={{ x: [-20, 20, -20], y: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-28 text-emerald-600/70"
      >
        <Bird className="w-6 h-6" />
      </motion.div>

      {/* Central Interactive Earth & Eco Scene Card */}
      <div className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-700 to-slate-900 shadow-2xl p-6 flex flex-col items-center justify-center text-center text-white border-4 border-white/80 overflow-hidden">
        
        {/* Radial grid overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-3xl bg-emerald-500/30 border border-emerald-300/40 flex items-center justify-center mb-3 shadow-inner"
          >
            <Globe className="w-12 h-12 text-emerald-300 animate-spin-slow" />
          </motion.div>

          <h4 className="font-extrabold text-xl text-white font-heading">
            Planet Earth
          </h4>
          <p className="text-xs text-emerald-200 mt-1 font-medium max-w-[180px]">
            1,450 Tons CO2 Offset & Growing
          </p>

          <div className="mt-3 flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-400/40 text-[10px] font-bold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Verified Campus Actions</span>
          </div>
        </div>
      </div>

      {/* FLOATING BADGE 1: Tree Planting */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 right-4 glass-card px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-200 z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
          <TreePine className="w-5 h-5 fill-emerald-100" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900 font-heading">Tree Planting</div>
          <div className="text-[10px] text-emerald-700 font-semibold">+150 Eco XP</div>
        </div>
      </motion.div>

      {/* FLOATING BADGE 2: Recycling Audit */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-4 left-0 glass-card px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-teal-200 z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
          <Recycle className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900 font-heading">Zero Waste Audit</div>
          <div className="text-[10px] text-teal-700 font-semibold">99.4% Verified</div>
        </div>
      </motion.div>

      {/* FLOATING BADGE 3: Eco Coins */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-8 right-2 glass-card px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-amber-200 z-20"
      >
        <Coins className="w-5 h-5 text-amber-500 fill-amber-400" />
        <span className="text-xs font-black text-amber-800">500 Coins</span>
      </motion.div>

    </div>
  );
}
