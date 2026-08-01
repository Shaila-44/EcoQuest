import React, { useState } from 'react';
import { 
  Trophy, 
  Building2, 
  UserCheck, 
  Crown, 
  Medal, 
  ArrowRight, 
  Flame, 
  Sparkles,
  Swords
} from 'lucide-react';

export default function Leaderboard({ onOpenFullLeaderboard }) {
  const [tab, setTab] = useState('schools'); // 'schools' | 'students'
  const [period, setPeriod] = useState('weekly'); // 'weekly' | 'alltime'

  const schoolLeaderboardData = [
    {
      rank: 1,
      name: 'Delhi Public School (R.K. Puram)',
      region: 'New Delhi Sanctuary',
      xp: '48,920 XP',
      progress: 96,
      badge: 'Gold',
      iconColor: 'bg-amber-400 text-amber-950',
      borderColor: 'border-amber-400',
      avatar: '🏰',
      studentsCount: 1420,
      streak: '14 Weeks'
    },
    {
      rank: 2,
      name: "St. Xavier's Guild School",
      region: 'Mumbai Sanctuary',
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
      name: 'National Public Guild (Indiranagar)',
      region: 'Bengaluru Sanctuary',
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
      name: 'DAV Public Academy',
      region: 'Chandigarh Sanctuary',
      xp: '34,200 XP',
      progress: 74,
      avatar: '⚡',
      studentsCount: 810,
      streak: '6 Weeks'
    },
    {
      rank: 5,
      name: 'Kendriya Vidyalaya (IIT Sanctuary)',
      region: 'Chennai Sanctuary',
      xp: '31,950 XP',
      progress: 68,
      avatar: '🌲',
      studentsCount: 760,
      streak: '5 Weeks'
    },
    {
      rank: 6,
      name: 'The Doon Guild School',
      region: 'Dehradun Sanctuary',
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
      school: 'DPS R.K. Puram Guild',
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
      school: 'National Public Guild',
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
      school: "St. Xavier's Mumbai Guild",
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
      school: 'Hyderabad Guild School',
      xp: '6,800 XP',
      progress: 77,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      streak: '12 Days 🔥'
    },
    {
      rank: 5,
      name: 'Ishaan Verma',
      school: 'DAV Public Guild',
      xp: '6,310 XP',
      progress: 71,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      streak: '10 Days 🔥'
    },
    {
      rank: 6,
      name: 'Kavya Nair',
      school: 'Kendriya Vidyalaya Guild',
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
    <section id="leaderboard" className="py-24 relative overflow-hidden bg-[#05130d] text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-amber-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm mb-4">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>HALL OF CHAMPIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-4">
            Compete, Conquer & Lead the Realm
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-medium">
            Real-time rankings powered by verified eco quests. Compare sanctuary vs. sanctuary and adventurer vs. adventurer!
          </p>

          {/* TOGGLE CONTROLS */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            
            {/* SCHOOL vs STUDENT TOGGLE */}
            <div className="bg-[#04160d] p-1.5 rounded-full border border-emerald-500/30 flex items-center shadow-md">
              <button
                onClick={() => setTab('schools')}
                className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  tab === 'schools'
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Sanctuaries
              </button>

              <button
                onClick={() => setTab('students')}
                className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  tab === 'students'
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Adventurers
              </button>
            </div>

            {/* PERIOD TOGGLE */}
            <div className="bg-[#04160d] p-1.5 rounded-full border border-emerald-500/30 flex items-center shadow-md">
              <button
                onClick={() => setPeriod('weekly')}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                  period === 'weekly'
                    ? 'bg-emerald-900 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                This Cycle
              </button>
              <button
                onClick={() => setPeriod('alltime')}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                  period === 'alltime'
                    ? 'bg-emerald-900 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                All-Time
              </button>
            </div>

          </div>
        </div>

        {/* TOP 3 PODIUM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto mb-12">
          
          {/* RANK 2 - SILVER */}
          <div className="order-2 md:order-1 glass-card p-6 rounded-3xl border border-slate-400/40 relative text-center hover:border-slate-300 transition-all shadow-2xl bg-[#072218]/90 text-slate-100">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-300 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg border-2 border-slate-100">
              <Medal className="w-5 h-5 text-slate-900" />
            </div>
            
            <div className="mt-4 mb-3 flex justify-center">
              {tab === 'students' ? (
                <img src={topThree[1].avatar} className="w-16 h-16 rounded-full ring-4 ring-slate-300 object-cover shadow-xl" alt="Rank 2" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl shadow-inner border border-slate-700">
                  {topThree[1].avatar}
                </div>
              )}
            </div>

            <h3 className="font-black text-lg text-white font-heading truncate">{topThree[1].name}</h3>
            <p className="text-xs text-emerald-300/80 mb-3">{tab === 'schools' ? topThree[1].region : topThree[1].school}</p>

            <div className="inline-block bg-slate-900 text-slate-200 font-black text-sm px-4 py-1.5 rounded-full border border-slate-700 mb-3">
              {topThree[1].xp}
            </div>

            <div className="text-[11px] font-bold text-slate-300">
              Streak: {topThree[1].streak}
            </div>
          </div>

          {/* RANK 1 - GOLD (Center tall) */}
          <div className="order-1 md:order-2 glass-card p-8 rounded-3xl border-2 border-amber-400/80 relative text-center bg-gradient-to-b from-[#183626] via-[#09261b] to-[#04160d] hover:border-amber-300 shadow-2xl shadow-amber-500/20 transition-all scale-105 backdrop-blur-xl text-white">
            
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <Crown className="w-9 h-9 text-amber-400 animate-bounce fill-amber-400" />
            </div>

            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center shadow-xl border-2 border-amber-200 mx-auto mb-2">
              #1
            </div>

            <div className="my-3 flex justify-center">
              {tab === 'students' ? (
                <img src={topThree[0].avatar} className="w-20 h-20 rounded-full ring-4 ring-amber-400 object-cover shadow-2xl" alt="Rank 1" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-xl">
                  {topThree[0].avatar}
                </div>
              )}
            </div>

            <h3 className="font-black text-xl text-white font-heading truncate">{topThree[0].name}</h3>
            <p className="text-xs text-amber-300 font-bold mb-4">{tab === 'schools' ? topThree[0].region : topThree[0].school}</p>

            <div className="inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-base px-6 py-2 rounded-full shadow-lg mb-4">
              {topThree[0].xp}
            </div>

            <div className="flex justify-center items-center gap-1.5 text-xs font-black text-amber-300">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{topThree[0].streak} Leader</span>
            </div>
          </div>

          {/* RANK 3 - BRONZE */}
          <div className="order-3 glass-card p-6 rounded-3xl border border-amber-600/40 relative text-center hover:border-amber-500 transition-all shadow-2xl bg-[#072218]/90 text-slate-100">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-600 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg border-2 border-amber-300">
              <Medal className="w-5 h-5 text-slate-950" />
            </div>

            <div className="mt-4 mb-3 flex justify-center">
              {tab === 'students' ? (
                <img src={topThree[2].avatar} className="w-16 h-16 rounded-full ring-4 ring-amber-600/50 object-cover shadow-xl" alt="Rank 3" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-amber-950/60 flex items-center justify-center text-3xl shadow-inner border border-amber-600/40">
                  {topThree[2].avatar}
                </div>
              )}
            </div>

            <h3 className="font-black text-lg text-white font-heading truncate">{topThree[2].name}</h3>
            <p className="text-xs text-emerald-300/80 mb-3">{tab === 'schools' ? topThree[2].region : topThree[2].school}</p>

            <div className="inline-block bg-emerald-950 text-emerald-300 font-black text-sm px-4 py-1.5 rounded-full border border-emerald-500/40 mb-3">
              {topThree[2].xp}
            </div>

            <div className="text-[11px] font-bold text-slate-300">
              Streak: {topThree[2].streak}
            </div>
          </div>

        </div>

        {/* RANKS 4-6 LIST CARD */}
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-3xl border border-emerald-500/30 shadow-2xl bg-[#062016]/90 space-y-3 text-slate-100">
          {remainingRanks.map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#04160d] hover:bg-emerald-950/80 border border-emerald-500/20 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="w-8 text-center text-sm font-black text-slate-400">#{item.rank}</span>
                
                {tab === 'students' ? (
                  <img src={item.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400" alt={item.name} />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-300 flex items-center justify-center text-xl border border-emerald-500/30">
                    {item.avatar}
                  </div>
                )}

                <div className="truncate">
                  <h4 className="font-black text-sm text-white font-heading truncate">{item.name}</h4>
                  <p className="text-xs text-emerald-300/70 truncate">{tab === 'schools' ? item.region : item.school}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden sm:block text-right">
                  <div className="w-32 h-2 bg-[#020b07] rounded-full overflow-hidden mb-1 border border-emerald-500/20">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-amber-300 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-amber-300 font-bold">{item.streak}</span>
                </div>

                <span className="font-black text-sm text-amber-300 bg-amber-500/20 px-3.5 py-1.5 rounded-xl border border-amber-400/40">
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
            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 inline-flex items-center gap-2 cursor-pointer border border-emerald-300/40 hover:scale-105 transition-all"
          >
            <span>View Hall of Champions Rankings</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}

