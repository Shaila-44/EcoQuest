import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Crown, 
  Zap, 
  ArrowRight,
  Flame,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function HomeLeaderboard({ onNavigateTab }) {
  const [filter, setFilter] = useState('class'); // 'class' | 'school' | 'weekly'

  const leaderboardData = [
    { rank: 1, name: 'Ananya Roy', class: 'Guild 8-A', xp: 4890, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', badge: '🥇 S-Rank Champion', streak: '14 Days', rankDiff: '–' },
    { rank: 2, name: 'Aarav Sharma', class: 'Guild 8-A', xp: 4320, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', badge: '🥈 A-Rank Mythic', streak: '10 Days', rankDiff: '▲ +1' },
    { rank: 3, name: 'Priya Patel', class: 'Guild 8-B', xp: 3950, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', badge: '🥉 A-Rank Mythic', streak: '9 Days', rankDiff: '–' },
    { rank: 4, name: 'Rahul Sharma (You)', class: 'Guild 8-A', xp: 3450, avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=250&q=80', isCurrentUser: true, streak: '7 Days 🔥', rankDiff: '▲ +2 Ranks!' },
    { rank: 5, name: 'Kavya Singh', class: 'Guild 8-A', xp: 3120, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', streak: '5 Days', rankDiff: '▼ -1' },
  ];

  return (
    <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-5 hover-card-lift text-slate-100">
      
      {/* HEADER WITH FILTER TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Trophy className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-heading">Hall of Champions</h3>
            <p className="text-xs text-emerald-300/80 font-bold">Updated 5m ago • Top Realm Adventurers</p>
          </div>
        </div>

        {/* FILTER CONTROL TABS */}
        <div className="flex items-center bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-500/30">
          <button
            onClick={() => setFilter('class')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filter === 'class' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Guild 8-A
          </button>
          <button
            onClick={() => setFilter('school')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filter === 'school' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Realm Top 10
          </button>
          <button
            onClick={() => setFilter('weekly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filter === 'weekly' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* LEADERBOARD LIST */}
      <div className="space-y-3">
        {leaderboardData.map((student) => (
          <div
            key={student.rank}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              student.isCurrentUser
                ? 'bg-gradient-to-r from-emerald-900/90 via-teal-900/80 to-emerald-900/90 border-emerald-400 ring-2 ring-emerald-400/50 shadow-xl scale-[1.01]'
                : 'bg-[#062016]/90 border-emerald-500/20 hover:bg-emerald-950/70'
            }`}
          >
            {/* RANK NUMBER / CROWN */}
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-md ${
                student.rank === 1
                  ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow-amber-400/40'
                  : student.rank === 2
                    ? 'bg-slate-300 text-slate-950'
                    : student.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
              }`}>
                {student.rank === 1 ? <Crown className="w-4 h-4 fill-slate-950" /> : `#${student.rank}`}
              </div>

              {/* LARGER AVATAR & NAME */}
              <div className="flex items-center gap-3">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className={`w-11 h-11 rounded-2xl object-cover ring-2 ${student.isCurrentUser ? 'ring-emerald-400' : 'ring-emerald-500/30'}`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-black text-white font-heading">{student.name}</h4>
                    {student.isCurrentUser && (
                      <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40 animate-pulse">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-slate-300 flex items-center gap-2">
                    <span>{student.class} • 🔥 {student.streak}</span>
                    {student.rankDiff !== '–' && (
                      <span className={`text-[10px] font-black ${student.rankDiff.includes('▲') ? 'text-emerald-300 bg-emerald-950 border border-emerald-500/30 px-1.5 py-0.5 rounded-md' : 'text-slate-400'}`}>
                        {student.rankDiff}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* XP SCORE */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-black text-white font-heading">
                  {student.xp.toLocaleString()} XP
                </div>
                <div className="text-[10px] font-black text-amber-400">
                  Level {Math.floor(student.xp / 300) + 1}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* FULL LEADERBOARD FOOTER LINK */}
      <button
        onClick={() => onNavigateTab && onNavigateTab('leaderboard')}
        className="w-full py-3.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-300 font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <span>View Full Hall of Champions Standings</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
}

