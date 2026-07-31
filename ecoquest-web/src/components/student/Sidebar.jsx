import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Palmtree, 
  Target, 
  Trophy, 
  Users, 
  ShoppingBag, 
  Award, 
  Settings, 
  LogOut, 
  Leaf, 
  ChevronRight,
  Flame,
  Zap,
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout, userStats }) {
  const navItems = [
    { id: 'home', label: 'Command Center', icon: Home, badge: 'Active Hub', highlight: true },
    { id: 'island', label: 'Island Realm', icon: Palmtree, badge: 'Sanctuary', separate: true },
    { id: 'missions', label: 'Quest Board', icon: Target, count: '15 Active' },
    { id: 'leaderboard', label: 'Hall of Champions', icon: Trophy, rank: '#4 Rank' },
    { id: 'community', label: 'Eco Chronicles', icon: Users, alert: true },
    { id: 'store', label: 'Explorer Shop', icon: ShoppingBag, coins: '1,280' },
    { id: 'achievements', label: 'Unlock Collection', icon: Award, count: '24/32' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 lg:w-72 bg-[#082a1d]/95 backdrop-blur-2xl border-r border-emerald-500/20 flex flex-col justify-between z-30 shadow-2xl shadow-emerald-950/40 select-none overflow-y-auto text-slate-100">
      
      {/* SIDEBAR HEADER & RPG EMBLEM LOGO */}
      <div>
        <div className="p-6 border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-300/40 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-slate-950 fill-emerald-100/40" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-white font-heading block leading-none">
                Eco<span className="text-emerald-400">Quest</span>
              </span>
              <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase mt-1 block">
                Neo Nature RPG
              </span>
            </div>
          </div>
        </div>

        {/* ADVENTURER CARD STATUS & RANK CREST */}
        <div className="mx-4 my-4 p-4 rounded-2xl bg-gradient-to-br from-[#0c2e21] via-[#092218] to-[#04160d] text-white border border-emerald-500/30 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/15 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-400/25 transition-all" />
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/10 rounded-full blur-lg pointer-events-none" />

          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-black text-emerald-300 uppercase tracking-wider font-heading">
                B-Rank Guardian
              </span>
            </div>
            <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40 text-amber-300 text-[11px] font-black">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>7D Streak</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-slate-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Level 12 XP</span>
              </span>
              <span className="text-emerald-400 font-black">3,450 / 5,000</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-500/25">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '69%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full shadow-[0_0_10px_#10b981]"
              />
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="px-4 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-250 cursor-pointer group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/35 border border-emerald-400/50 translate-x-1.5'
                    : 'text-slate-300 hover:text-white hover:bg-emerald-950/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-emerald-950/70 text-emerald-400 group-hover:bg-emerald-800/50 group-hover:text-emerald-200 border border-emerald-500/20'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-sm tracking-tight">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.separate
                        ? 'bg-teal-900/60 text-teal-300 border border-teal-500/40'
                        : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.count && !isActive && (
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-emerald-300">
                    {item.count}
                  </span>
                )}

                {item.rank && !isActive && (
                  <span className="text-[11px] font-black text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-full">
                    {item.rank}
                  </span>
                )}

                {item.coins && !isActive && (
                  <span className="text-[11px] font-black text-emerald-300 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    🪙 {item.coins}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="p-4 border-t border-emerald-500/20 text-center">
        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
          EcoQuest RPG v3.0 • Active Realm
        </span>
      </div>

    </aside>
  );
}

