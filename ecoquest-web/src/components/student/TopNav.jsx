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
  User,
  Plus
} from 'lucide-react';

const CartoonBoyAvatar = ({ className = "w-9 h-9" }) => (
  <svg className={`${className} rounded-xl group-hover:scale-105 transition-transform`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#062e20" stroke="#10b981" strokeWidth="4" />
    <path d="M20 90C20 74 32 68 50 68C68 68 80 74 80 90V100H20V90Z" fill="#10b981" />
    <path d="M42 68L50 82L58 68" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <rect x="44" y="54" width="12" height="16" rx="4" fill="#fcd34d" />
    <rect x="30" y="26" width="40" height="36" rx="18" fill="#fcd34d" />
    <ellipse cx="27" cy="44" rx="4" ry="6" fill="#fcd34d" />
    <ellipse cx="73" cy="44" rx="4" ry="6" fill="#fcd34d" />
    <path d="M24 34C24 18 36 12 50 12C64 12 76 18 76 34C76 24 66 16 50 16C34 16 24 24 24 34Z" fill="#1e293b" />
    <path d="M28 28C28 14 40 8 50 8C60 8 72 14 72 28C65 18 57 14 50 14C43 14 35 18 28 28Z" fill="#334155" />
    <path d="M34 26L42 16L46 26" fill="#1e293b" />
    <path d="M54 26L58 16L66 26" fill="#1e293b" />
    <circle cx="41" cy="42" r="4" fill="#0f172a" />
    <circle cx="59" cy="42" r="4" fill="#0f172a" />
    <circle cx="42.5" cy="40.5" r="1.5" fill="#ffffff" />
    <circle cx="60.5" cy="40.5" r="1.5" fill="#ffffff" />
    <path d="M36 34Q41 31 46 35" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M54 35Q59 31 64 34" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M43 51Q50 57 57 51" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export default function TopNav({ onOpenUploadModal, onOpenMissionModal, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Quest Verified!', desc: 'Your Plastic Drive submission got approved (+350 XP & 150 Coins)', time: '10m ago', unread: true },
    { id: 2, title: 'Streak Bonus Loot!', desc: 'Day 7 streak achieved! 200 Loot Coins awarded 🪙', time: '1h ago', unread: true },
    { id: 3, title: 'Hall of Champions Update', desc: 'You moved up to Rank #4 in Class 8-A 🎉', time: '3h ago', unread: false },
  ];

  return (
    <header className="h-20 bg-[#051912]/85 backdrop-blur-xl border-b border-emerald-500/25 sticky top-0 z-20 px-6 lg:px-10 flex items-center justify-between shadow-lg shadow-emerald-950/30">
      
      {/* ADVENTURER RANK & LEVEL BADGE */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#0d3b2a] via-[#09291c] to-[#04160d] text-white border border-emerald-400/50 px-4 py-2 rounded-2xl shadow-[0_0_18px_rgba(16,185,129,0.2)] relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-all">
          
          {/* Glowing Shimmer Overlay */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/10 rounded-full blur-md pointer-events-none group-hover:bg-amber-400/20 transition-all" />

          {/* Level Crest Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-[#051912] border-2 border-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.3)] flex flex-col items-center justify-center text-center group-hover:scale-105 group-hover:border-amber-400 transition-all">
              <span className="text-[8px] font-black text-amber-400 uppercase leading-none tracking-tight">LVL</span>
              <span className="text-sm font-black text-white leading-none font-heading">12</span>
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#051912] flex items-center justify-center text-[7px] font-black text-slate-950 shadow-md">
              ★
            </span>
          </div>


          {/* Level Info & Live Progress Meter */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span className="text-xs font-black text-white font-heading tracking-tight">
                  B-Rank Guardian
                </span>
              </div>
              <span className="text-[10px] font-black text-emerald-300/90 font-mono">
                3,450 / 5,000 XP
              </span>
            </div>

            {/* Micro XP Progress Bar */}
            <div className="w-36 sm:w-44 h-2 bg-[#04160d] rounded-full overflow-hidden p-0.5 border border-emerald-500/30 mt-1">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full shadow-[0_0_10px_#34d399] transition-all duration-1000 w-[69%]"
              />
            </div>
          </div>

        </div>
      </div>


      {/* RIGHT SIDE STATS & USER PROFILE */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* QUICK XP STAT */}
        <div className="hidden sm:flex items-center gap-2 bg-[#092218]/90 border border-emerald-500/30 px-3.5 py-2 rounded-2xl shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
          </div>
          <div>
            <div className="text-[9px] uppercase font-black tracking-wider text-emerald-400">Adventure XP</div>
            <div className="text-xs font-black text-white leading-none font-heading">3,450 XP</div>
          </div>
        </div>

        {/* ECO COINS / LOOT STAT */}
        <div className="hidden sm:flex items-center gap-2 bg-[#1c1809]/90 border border-amber-500/35 px-3.5 py-2 rounded-2xl shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
            <Coins className="w-3.5 h-3.5 fill-slate-950" />
          </div>
          <div>
            <div className="text-[9px] uppercase font-black tracking-wider text-amber-400">Loot Coins</div>
            <div className="text-xs font-black text-amber-300 leading-none font-heading">1,280 🪙</div>
          </div>
        </div>

        {/* FIRE STREAK RUNE */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-950/80 to-amber-950/80 border border-orange-500/40 px-3 py-2 rounded-2xl shadow-sm">
          <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
          <span className="text-xs font-black text-amber-300 font-heading">7D Streak</span>
        </div>

        {/* USER PROFILE CARD WITH DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-2xl bg-[#092218]/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer group select-none"
          >
            <div className="relative">
              <CartoonBoyAvatar className="w-9 h-9" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#051912]" />
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-white leading-tight flex items-center gap-1 font-heading">
                <span>Rahul Sharma</span>
                <ChevronDown className="w-3 h-3 text-emerald-400 group-hover:text-emerald-200 transition-transform" />
              </h4>
              <p className="text-[10px] font-bold text-emerald-400/80">Explorer Class 8-A</p>
            </div>
          </button>

          {/* PROFILE DROPDOWN MENU */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-[#08241a] rounded-3xl border border-emerald-500/40 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-100">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 border border-emerald-500/30 mb-2">
                <div className="flex items-center gap-3">
                  <CartoonBoyAvatar className="w-10 h-10" />
                  <div>
                    <h4 className="text-xs font-black text-white font-heading">Rahul Sharma</h4>
                    <p className="text-[10px] text-emerald-300 font-bold">Level 12 B-Rank Guardian</p>
                  </div>
                </div>
              </div>


              <div className="space-y-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-200 hover:bg-emerald-900/60 hover:text-white transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Explorer Card</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Exit Realm</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-2xl bg-[#092218] hover:bg-emerald-900/70 border border-emerald-500/30 flex items-center justify-center text-emerald-300 hover:text-white transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#051912]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#08241a] rounded-3xl border border-emerald-500/40 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">Quest Dispatch</h4>
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

              <button
                onClick={() => setShowNotifications(false)}
                className="w-full mt-3 py-2 text-center text-xs font-extrabold text-emerald-400 hover:text-emerald-200 transition-colors cursor-pointer"
              >
                Mark all dispatches read
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

