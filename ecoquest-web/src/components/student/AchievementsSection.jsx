import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Zap,
  Flame
} from 'lucide-react';

export default function AchievementsSection({ onNavigateTab }) {
  const badges = [
    {
      id: 1,
      title: 'Tree Guardian',
      level: 'Lvl 3',
      desc: 'Planted 10+ saplings in school grounds',
      icon: '🌳',
      unlocked: true,
      rarity: 'Legendary',
      rarityBg: 'bg-amber-100 text-amber-800 border-amber-300',
      borderColor: 'border-amber-400',
      bgGlow: 'bg-amber-500/10'
    },
    {
      id: 2,
      title: 'Energy Saver Supreme',
      level: 'Lvl 2',
      desc: 'Saved 50kWh in campus energy drive',
      icon: '⚡',
      unlocked: true,
      rarity: 'Epic',
      rarityBg: 'bg-purple-100 text-purple-800 border-purple-300',
      borderColor: 'border-purple-400',
      bgGlow: 'bg-purple-500/10'
    },
    {
      id: 3,
      title: 'Ocean Protector',
      level: 'Lvl 1',
      desc: 'Collected 20kg plastic waste from riverbank',
      icon: '🌊',
      unlocked: true,
      rarity: 'Rare',
      rarityBg: 'bg-sky-100 text-sky-800 border-sky-300',
      borderColor: 'border-sky-400',
      bgGlow: 'bg-sky-500/10'
    },
    {
      id: 4,
      title: '7-Day Streak Master',
      level: 'Lvl 1',
      desc: 'Completed daily missions 7 days in a row',
      icon: '🔥',
      unlocked: true,
      rarity: 'Epic',
      rarityBg: 'bg-orange-100 text-orange-800 border-orange-300',
      borderColor: 'border-orange-400',
      bgGlow: 'bg-orange-500/10'
    },
    {
      id: 5,
      title: 'Carbon-Free Commuter',
      level: 'Locked',
      desc: 'Walk or cycle to school 5 days (4/5 done)',
      icon: '🚴',
      unlocked: false,
      rarity: 'Rare',
      progress: 80,
      borderColor: 'border-slate-300',
      bgGlow: 'bg-slate-100'
    },
    {
      id: 6,
      title: 'Recycling Master',
      level: 'Locked',
      desc: 'Log 15kg recyclable items (12/15kg done)',
      icon: '♻️',
      unlocked: false,
      rarity: 'Common',
      progress: 80,
      borderColor: 'border-slate-300',
      bgGlow: 'bg-slate-100'
    }
  ];

  return (
    <section className="space-y-4">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>COLLECTIBLE ECO TROPHIES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight">
            Badges & Trophies
          </h2>
        </div>

        <button
          onClick={() => onNavigateTab && onNavigateTab('achievements')}
          className="text-xs font-black text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>View All 32 Badges</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* BADGES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {badges.map((badge, idx) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`glass-card p-4 rounded-3xl border ${badge.borderColor} flex flex-col items-center text-center relative overflow-hidden group shadow-sm hover-card-lift cursor-pointer`}
          >
            {/* RARITY BADGE */}
            {badge.unlocked ? (
              <span className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.rarityBg}`}>
                {badge.rarity}
              </span>
            ) : (
              <span className="absolute top-2 left-2 text-[9px] font-extrabold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                Locked
              </span>
            )}

            {/* UNLOCKED / LOCKED ICON OVERLAY */}
            {badge.unlocked ? (
              <div className="absolute top-2 right-2 text-emerald-600 bg-emerald-100 p-1 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="absolute top-2 right-2 text-slate-400 bg-slate-100 p-1 rounded-full">
                <Lock className="w-3.5 h-3.5" />
              </div>
            )}

            {/* BADGE EMBLEM ARTWORK */}
            <div className={`w-16 h-16 rounded-2xl ${
              badge.unlocked 
                ? 'bg-gradient-to-tr from-white to-emerald-50 shadow-md ring-2 ring-emerald-400/50' 
                : 'bg-slate-100 grayscale opacity-60'
            } flex items-center justify-center text-3xl mt-5 mb-2 relative group-hover:scale-110 transition-transform duration-300`}>
              <span>{badge.icon}</span>
            </div>

            {/* BADGE TITLE */}
            <h4 className="text-xs font-black text-slate-900 font-heading leading-tight line-clamp-1">
              {badge.title}
            </h4>

            <p className="text-[10px] text-slate-500 font-medium leading-tight mt-1 line-clamp-2">
              {badge.desc}
            </p>

            {/* LOCKED PROGRESS BAR */}
            {!badge.unlocked && (
              <div className="w-full mt-3 space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-slate-500">
                  <span>Progress</span>
                  <span className="text-emerald-700 font-black">{badge.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${badge.progress}%` }} 
                  />
                </div>
              </div>
            )}

          </motion.div>
        ))}
      </div>

    </section>
  );
}
