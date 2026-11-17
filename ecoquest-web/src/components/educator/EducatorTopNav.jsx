import React, { useState } from 'react';
import { 
  Bell, 
  PlusCircle, 
  Users, 
  ShieldCheck, 
  Award, 
  ChevronDown, 
  LogOut, 
  Sparkles, 
  CheckCircle2,
  TreePine,
  Search,
  Zap,
  Globe
} from 'lucide-react';

export default function EducatorTopNav({ onOpenCreateQuest, onSwitchToStudent, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: '5 Proof Submissions Ready', desc: 'Class 8-A submitted photos for Plastic Drive challenge', time: '5m ago', unread: true },
    { id: 2, title: 'Guild Milestone Unlocked!', desc: 'Class 8-B reached 1,000 Kg Carbon Offset target 🎉', time: '45m ago', unread: true },
    { id: 3, title: 'AI Audit Flag', desc: '1 submission flagged for low photo clarity', time: '2h ago', unread: false },
  ];

  return (
    <header className="h-20 bg-[#061c14]/90 backdrop-blur-2xl border-b border-emerald-500/30 sticky top-0 z-20 px-6 lg:px-10 flex items-center justify-between shadow-xl shadow-emerald-950/40 select-none">
      
      {/* LEFT: EDUCATOR GUILD STATS BADGE */}
      <div className="flex items-center gap-4">
        <div className="bg-[#04160d]/90 border border-emerald-500/30 p-2 pl-3 pr-5 rounded-2xl flex items-center gap-3.5 backdrop-blur-md shadow-md">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-emerald-400 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#051912] rounded-[10px] flex items-center justify-center text-amber-300 font-black text-xs font-heading">
              8-A
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white font-heading">
                Class 8-A Guild Sanctuary
              </span>
              <span className="text-[10px] font-black text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/40">
                #2 Regional Rank
              </span>
            </div>
            <div className="text-[10px] font-bold text-emerald-400/80 flex items-center gap-3 mt-0.5">
              <span>👥 48 Students</span>
              <span>•</span>
              <span>⚡ 42,500 Total XP</span>
              <span>•</span>
              <span>🌿 1,250 kg CO₂</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: CREATE QUEST BUTTON, METRICS & PROFILE */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* CREATE NEW QUEST BUTTON */}
        <button
          onClick={onOpenCreateQuest}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border border-emerald-300/50"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span className="hidden sm:inline">Create Class Quest</span>
        </button>

        {/* VERIFICATION QUEUE PILL */}
        <div className="hidden md:flex items-center gap-2 bg-[#04160d]/90 border border-amber-500/40 px-3.5 py-2 rounded-2xl shadow-sm text-xs font-black text-amber-300">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>5 Pending AI Reviews</span>
        </div>

        {/* NOTIFICATIONS BELL */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-2xl bg-[#04160d]/90 hover:bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 hover:text-white transition-colors relative cursor-pointer shadow-md"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#051912]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#062016] rounded-3xl border border-emerald-500/40 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">Educator Dispatch</h4>
                <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">2 New</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-2xl border text-xs transition-colors ${
                      n.unread ? 'bg-emerald-950/80 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/15'
                    }`}
                  >
                    <div className="flex justify-between font-extrabold text-white mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-emerald-400/70 font-normal">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-tight">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* EDUCATOR PROFILE MENU */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-2xl bg-[#04160d]/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer group shadow-md"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 flex-shrink-0">
              <div className="w-full h-full bg-[#051912] rounded-[10px] flex items-center justify-center text-xs font-black text-amber-300 font-heading">
                SJ
              </div>
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-white leading-tight flex items-center gap-1 font-heading">
                <span>Prof. Sarah</span>
                <ChevronDown className="w-3 h-3 text-emerald-400 group-hover:text-emerald-200 transition-transform" />
              </h4>
              <p className="text-[10px] font-bold text-emerald-400/80">Guild Coordinator</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-[#062016] rounded-3xl border border-emerald-500/40 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-100">
              <div className="p-3 rounded-2xl bg-[#04160d] border border-emerald-500/30 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5">
                    <div className="w-full h-full bg-[#051912] rounded-[10px] flex items-center justify-center text-sm font-black text-amber-300">
                      SJ
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white font-heading">Prof. Sarah Jenkins</h4>
                    <p className="text-[10px] text-emerald-300 font-bold">Class 8-A Lead Educator</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={onSwitchToStudent}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-200 hover:bg-emerald-900/60 hover:text-white transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Switch to Student View</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Exit Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
