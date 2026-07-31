import React, { useState } from 'react';
import { 
  Bell, 
  Flame, 
  Coins, 
  Zap, 
  Sparkles, 
  ChevronDown, 
  CheckCircle2, 
  Award,
  ShieldCheck,
  Crown,
  LogOut,
  User
} from 'lucide-react';

export default function TopNav({ onOpenUploadModal, onOpenMissionModal, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Mission Verified!', desc: 'Your Plastic Drive submission got approved (+350 XP)', time: '10m ago', unread: true },
    { id: 2, title: 'Streak Bonus!', desc: 'You completed Day 7 streak! 200 Coins awarded 🪙', time: '1h ago', unread: true },
    { id: 3, title: 'Leaderboard Update', desc: 'You moved up to Rank #4 in Class 8-A 🎉', time: '3h ago', unread: false },
  ];

  const profile3DPic = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=250&q=80";

  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-emerald-100/80 sticky top-0 z-20 px-6 lg:px-10 flex items-center justify-between shadow-xs">
      
      {/* LEVEL BADGE */}
      <div className="flex items-center gap-4">
        
        {/* STUDENT LEVEL DISPLAY BADGE */}
        <div className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white border border-emerald-500/30 px-4 py-2 rounded-2xl shadow-md flex-shrink-0">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <div className="text-[9px] uppercase font-black tracking-widest text-emerald-300">Student Rank & Level</div>
            <div className="text-xs font-black text-white leading-none font-heading">
              Level 12 <span className="text-emerald-300 font-bold">• Eco Master</span>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE STATS & USER PROFILE */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* QUICK XP STAT */}
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-2 rounded-2xl">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-white" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">Total XP</div>
            <div className="text-xs font-extrabold text-slate-900 leading-none">3,450 XP</div>
          </div>
        </div>

        {/* ECO COINS STAT */}
        <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3.5 py-2 rounded-2xl">
          <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-xs shadow-xs">
            <Coins className="w-3.5 h-3.5 fill-white" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700">Eco Coins</div>
            <div className="text-xs font-extrabold text-slate-900 leading-none">1,280 🪙</div>
          </div>
        </div>

        {/* STREAK STAT */}
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200/80 px-3 py-2 rounded-2xl">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-400 animate-pulse" />
          <span className="text-xs font-black text-orange-700">7 Days</span>
        </div>

        {/* USER PROFILE CARD WITH DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-2xl bg-slate-100/90 border border-slate-200/80 hover:bg-emerald-50/80 transition-all cursor-pointer group select-none"
          >
            <div className="relative">
              <img
                src={profile3DPic}
                alt="Rahul Sharma"
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/40 group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-slate-900 leading-tight flex items-center gap-1">
                <span>Rahul Sharma</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform" />
              </h4>
              <p className="text-[10px] font-bold text-slate-500">Class 8-A</p>
            </div>
          </button>

          {/* PROFILE DROPDOWN MENU */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={profile3DPic}
                    alt="Rahul Sharma"
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-400"
                  />
                  <div>
                    <h4 className="text-xs font-black text-white font-heading">Rahul Sharma</h4>
                    <p className="text-[10px] text-emerald-300 font-semibold">Level 12 Eco Master • Class 8-A</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Student Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-emerald-100/70 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-700 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Notifications</h4>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">2 New</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-2xl border text-xs transition-colors ${
                      n.unread ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50/50 border-slate-100'
                    }`}
                  >
                    <div className="flex justify-between font-bold text-slate-900 mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">{n.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNotifications(false)}
                className="w-full mt-3 py-2 text-center text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
