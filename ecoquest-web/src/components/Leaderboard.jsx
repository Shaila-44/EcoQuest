import React, { useState } from 'react';
import { 
  Trophy, 
  Building2, 
  UserCheck, 
  Crown, 
  Medal, 
  ArrowRight, 
  Flame, 
  Sparkles 
} from 'lucide-react';

export default function Leaderboard({ onOpenFullLeaderboard }) {
  const [tab, setTab] = useState('schools'); // 'schools' | 'students'
  const [period, setPeriod] = useState('weekly'); // 'weekly' | 'alltime'

  const schoolLeaderboardData = [
    {
      rank: 1,
      name: 'Delhi Public School (R.K. Puram)',
      region: 'New Delhi, India',
      xp: '48,920 XP',
      progress: 96,
      badge: 'Gold',
      iconColor: 'bg-amber-400 text-amber-950',
      borderColor: 'border-amber-400',
      avatar: '🏫',
      studentsCount: 1420,
      streak: '14 Weeks'
    },
    {
      rank: 2,
      name: "St. Xavier's High School",
      region: 'Mumbai, Maharashtra',
      xp: '42,150 XP',
      progress: 88,
      badge: 'Silver',
      iconColor: 'bg-slate-300 text-slate-900',
      borderColor: 'border-slate-300',
      avatar: '🌿',
      studentsCount: 1180,
      streak: '10 Weeks'
    },
    {
      rank: 3,
      name: 'National Public School (Indiranagar)',
      region: 'Bengaluru, Karnataka',
      xp: '39,800 XP',
      progress: 82,
      badge: 'Bronze',
      iconColor: 'bg-amber-600 text-white',
      borderColor: 'border-amber-600',
      avatar: '🌎',
      studentsCount: 950,
      streak: '8 Weeks'
    },
    {
      rank: 4,
      name: 'DAV Public School',
      region: 'Chandigarh, Punjab',
      xp: '34,200 XP',
      progress: 74,
      avatar: '⚡',
      studentsCount: 810,
      streak: '6 Weeks'
    },
    {
      rank: 5,
      name: 'Kendriya Vidyalaya (IIT Campus)',
      region: 'Chennai, Tamil Nadu',
      xp: '31,950 XP',
      progress: 68,
      avatar: '🌲',
      studentsCount: 760,
      streak: '5 Weeks'
    },
    {
      rank: 6,
      name: 'The Doon School',
      region: 'Dehradun, Uttarakhand',
      xp: '28,400 XP',
      progress: 62,
      avatar: '☀️',
      studentsCount: 620,
      streak: '4 Weeks'
    }
  ];

  const studentLeaderboardData = [
    {
      rank: 1,
      name: 'Aarav Sharma',
      school: 'DPS R.K. Puram',
      xp: '8,450 XP',
      progress: 98,
      badge: 'Gold',
      iconColor: 'bg-amber-400 text-amber-950',
      borderColor: 'border-amber-400',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      streak: '24 Days 🔥'
    },
    {
      rank: 2,
      name: 'Ananya Iyer',
      school: 'National Public School',
      xp: '7,890 XP',
      progress: 91,
      badge: 'Silver',
      iconColor: 'bg-slate-300 text-slate-900',
      borderColor: 'border-slate-300',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      streak: '19 Days 🔥'
    },
    {
      rank: 3,
      name: 'Vihaan Patel',
      school: "St. Xavier's Mumbai",
      xp: '7,420 XP',
      progress: 85,
      badge: 'Bronze',
      iconColor: 'bg-amber-600 text-white',
      borderColor: 'border-amber-600',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      streak: '15 Days 🔥'
    },
    {
      rank: 4,
      name: 'Diya Reddy',
      school: 'Hyderabad Public School',
      xp: '6,800 XP',
      progress: 77,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      streak: '12 Days 🔥'
    },
    {
      rank: 5,
      name: 'Ishaan Verma',
      school: 'DAV Public School',
      xp: '6,310 XP',
      progress: 71,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      streak: '10 Days 🔥'
    },
    {
      rank: 6,
      name: 'Kavya Nair',
      school: 'Kendriya Vidyalaya Chennai',
      xp: '5,920 XP',
      progress: 65,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      streak: '8 Days 🔥'
    }
  ];

  const currentData = tab === 'schools' ? schoolLeaderboardData : studentLeaderboardData;
  const topThree = currentData.slice(0, 3);
  const remainingRanks = currentData.slice(3);

  return (
    <section id="leaderboard" className="py-24 relative overflow-hidden">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="tag-badge mb-4 mx-auto border-emerald-300/60 bg-emerald-50 shadow-xs">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider">
              SUSTAINABILITY LEADERBOARD
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight mb-4">
            Compete, Inspire & Lead the Board
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Real-time rankings powered by verified student eco-actions. Compare school vs. school and student vs. student!
          </p>

          {/* TOGGLE CONTROLS */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            
            {/* SCHOOL vs STUDENT TOGGLE */}
            <div className="bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 flex items-center shadow-inner backdrop-blur-md">
              <button
                onClick={() => setTab('schools')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  tab === 'schools'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Top Schools
              </button>

              <button
                onClick={() => setTab('students')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  tab === 'students'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Top Students
              </button>
            </div>

            {/* PERIOD TOGGLE */}
            <div className="bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 flex items-center shadow-inner backdrop-blur-md">
              <button
                onClick={() => setPeriod('weekly')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  period === 'weekly'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setPeriod('alltime')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  period === 'alltime'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All-Time
              </button>
            </div>

          </div>
        </div>

        {/* TOP 3 PODIUM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto mb-12">
          
          {/* RANK 2 - SILVER (Left on desktop) */}
          <div className="order-2 md:order-1 glass-card p-6 rounded-3xl border border-slate-200 relative text-center hover:border-emerald-400 transition-all shadow-xl bg-white/90 backdrop-blur-xl">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-300 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg border-2 border-slate-100">
              <Medal className="w-5 h-5 text-slate-800" />
            </div>
            
            <div className="mt-4 mb-3 flex justify-center">
              {tab === 'students' ? (
                <img src={topThree[1].avatar} className="w-16 h-16 rounded-full ring-4 ring-slate-300 object-cover shadow-xl" alt="Rank 2" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-slate-800 flex items-center justify-center text-3xl shadow-inner border border-emerald-100">
                  {topThree[1].avatar}
                </div>
              )}
            </div>

            <h3 className="font-bold text-lg text-slate-900 font-heading truncate">{topThree[1].name}</h3>
            <p className="text-xs text-slate-500 mb-3">{tab === 'schools' ? topThree[1].region : topThree[1].school}</p>

            <div className="inline-block bg-slate-100 text-emerald-800 font-extrabold text-sm px-4 py-1.5 rounded-full border border-slate-200 mb-3">
              {topThree[1].xp}
            </div>

            <div className="text-[11px] font-semibold text-slate-500">
              Streak: {topThree[1].streak}
            </div>
          </div>

          {/* RANK 1 - GOLD (Center tall on desktop) */}
          <div className="order-1 md:order-2 glass-card p-8 rounded-3xl border-2 border-amber-400/80 relative text-center bg-gradient-to-b from-amber-50/90 via-white to-amber-100/40 hover:border-amber-400 shadow-2xl shadow-amber-500/10 transition-all scale-105 backdrop-blur-xl">
            
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <Crown className="w-9 h-9 text-amber-500 animate-bounce fill-amber-400" />
            </div>

            <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black text-base flex items-center justify-center shadow-xl border-2 border-amber-200 mx-auto mb-2">
              #1
            </div>

            <div className="my-3 flex justify-center">
              {tab === 'students' ? (
                <img src={topThree[0].avatar} className="w-20 h-20 rounded-full ring-4 ring-amber-400 object-cover shadow-2xl" alt="Rank 1" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-amber-100/80 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-xl">
                  {topThree[0].avatar}
                </div>
              )}
            </div>

            <h3 className="font-extrabold text-xl text-slate-900 font-heading truncate">{topThree[0].name}</h3>
            <p className="text-xs text-emerald-800 font-semibold mb-4">{tab === 'schools' ? topThree[0].region : topThree[0].school}</p>

            <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 font-black text-base px-6 py-2 rounded-full shadow-lg mb-4">
              {topThree[0].xp}
            </div>

            <div className="flex justify-center items-center gap-1.5 text-xs font-bold text-amber-800">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{topThree[0].streak} Leader</span>
            </div>
          </div>

          {/* RANK 3 - BRONZE (Right on desktop) */}
          <div className="order-3 glass-card p-6 rounded-3xl border border-amber-200/80 relative text-center hover:border-amber-400 transition-all shadow-xl bg-white/90 backdrop-blur-xl">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-600 text-amber-50 font-black text-sm flex items-center justify-center shadow-lg border-2 border-amber-300">
              <Medal className="w-5 h-5 text-amber-100" />
            </div>

            <div className="mt-4 mb-3 flex justify-center">
              {tab === 'students' ? (
                <img src={topThree[2].avatar} className="w-16 h-16 rounded-full ring-4 ring-amber-600/50 object-cover shadow-xl" alt="Rank 3" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl shadow-inner border border-amber-200">
                  {topThree[2].avatar}
                </div>
              )}
            </div>

            <h3 className="font-bold text-lg text-slate-900 font-heading truncate">{topThree[2].name}</h3>
            <p className="text-xs text-slate-500 mb-3">{tab === 'schools' ? topThree[2].region : topThree[2].school}</p>

            <div className="inline-block bg-slate-100 text-emerald-800 font-extrabold text-sm px-4 py-1.5 rounded-full border border-slate-200 mb-3">
              {topThree[2].xp}
            </div>

            <div className="text-[11px] font-semibold text-slate-500">
              Streak: {topThree[2].streak}
            </div>
          </div>

        </div>

        {/* RANKS 4-6 LIST CARD */}
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-3xl border border-emerald-200/60 shadow-xl bg-white/85 backdrop-blur-2xl space-y-3">
          {remainingRanks.map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-100 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="w-8 text-center text-sm font-black text-slate-400">#{item.rank}</span>
                
                {tab === 'students' ? (
                  <img src={item.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-300" alt={item.name} />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl">
                    {item.avatar}
                  </div>
                )}

                <div className="truncate">
                  <h4 className="font-bold text-sm text-slate-900 font-heading truncate">{item.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{tab === 'schools' ? item.region : item.school}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden sm:block text-right">
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">{item.streak}</span>
                </div>

                <span className="font-extrabold text-sm text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300/60 shadow-2xs">
                  {item.xp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW FULL LEADERBOARD CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenFullLeaderboard}
            className="btn-primary px-8 py-4 text-base shadow-xl shadow-emerald-600/30 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Full Leaderboard & Regional Rankings</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
