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
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout, userStats }) {
  const navItems = [
    { id: 'home', label: 'Home Page', icon: Home, badge: 'Daily Hub', highlight: true },
    { id: 'island', label: 'My Island', icon: Palmtree, badge: 'Progression', separate: true },
    { id: 'missions', label: 'Missions & Quests', icon: Target, count: '15 Active' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, rank: '#4 Class' },
    { id: 'community', label: 'Eco Community', icon: Users, alert: true },
    { id: 'store', label: 'Eco Store', icon: ShoppingBag, coins: '1,280' },
    { id: 'achievements', label: 'Achievements', icon: Award, count: '24/32' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 lg:w-72 bg-white/90 backdrop-blur-2xl border-r border-emerald-100 flex flex-col justify-between z-30 shadow-xl shadow-emerald-900/5 select-none overflow-y-auto">
      
      {/* SIDEBAR HEADER & LOGO */}
      <div>
        <div className="p-6 border-b border-emerald-100/80 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Leaf className="w-6 h-6 text-emerald-100 fill-emerald-200/30" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-heading block leading-none">
                Eco<span className="text-emerald-600">Quest</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase mt-0.5 block">
                Student Command Center
              </span>
            </div>
          </div>
        </div>

        {/* STUDENT LEVEL QUICK STATUS */}
        <div className="mx-4 my-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">Level 12 Eco Master</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30 text-amber-300 text-[11px] font-extrabold">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>7D Streak</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-200">
              <span>XP Progress</span>
              <span className="text-emerald-300 font-bold">3,450 / 5,000</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '69%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
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
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer group relative ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 translate-x-1'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.separate
                        ? 'bg-teal-100 text-teal-800 border border-teal-200'
                        : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.count && !isActive && (
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-600">
                    {item.count}
                  </span>
                )}

                {item.rank && !isActive && (
                  <span className="text-[11px] font-extrabold text-amber-600 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                    {item.rank}
                  </span>
                )}

                {item.coins && !isActive && (
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    🪙 {item.coins}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="p-4 border-t border-emerald-100/80 text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          EcoQuest v2.4 • Active
        </span>
      </div>

    </aside>
  );
}
