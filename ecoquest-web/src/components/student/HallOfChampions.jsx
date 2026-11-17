import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  Flame, 
  Zap, 
  Award, 
  TreePine, 
  Droplets, 
  Recycle, 
  ChevronRight, 
  X, 
  ShieldCheck, 
  Star, 
  Heart, 
  Users, 
  School, 
  Globe2, 
  Swords, 
  Calendar
} from 'lucide-react';

export default function HallOfChampions() {
  const [activeScopeTab, setActiveScopeTab] = useState('class');
  const [selectedPlayerDrawer, setSelectedPlayerDrawer] = useState(null);

  // Scope Tabs
  const scopeTabs = [
    { id: 'class', label: 'Class 8-A', icon: Users, count: 28 },
    { id: 'school', label: 'Sanctuary School', icon: School, count: 420 },
    { id: 'district', label: 'District Realm', icon: Globe2, count: '3.2k' },
    { id: 'state', label: 'State Champions', icon: Trophy, count: '12k' },
    { id: 'global', label: 'Global World', icon: Star, count: '85k' },
  ];

  // Distinct Datasets for Each Scope
  const leaderboardDataByScope = {
    class: {
      scopeTitle: 'Class 8-A Standings',
      userRankText: '#4 in Class',
      userPercentile: 'Top 5% in Class',
      targetRankText: 'Target: Reach Rank #3 (250 XP needed)',
      podium: [
        {
          rank: 1,
          name: 'Priya Patel',
          title: 'Nature Legend',
          level: 18,
          xp: 6240,
          class: 'Class 8-A',
          school: 'Greenfield Sanctuary Academy',
          trees: 42,
          co2: '18.5 kg',
          streak: '14 Days 🔥',
          tier: 'Planet Champion',
          avatar: '👧',
          badge: '🏆 Class Leader'
        },
        {
          rank: 2,
          name: 'Aarav Sharma',
          title: 'Forest Guardian',
          level: 16,
          xp: 5120,
          class: 'Class 8-A',
          school: 'Greenfield Sanctuary Academy',
          trees: 34,
          co2: '14.2 kg',
          streak: '11 Days 🔥',
          tier: 'Diamond Guardian',
          avatar: '👦',
          badge: '🌳 Forest Master'
        },
        {
          rank: 3,
          name: 'Ananya Roy',
          title: 'Emerald Protector',
          level: 15,
          xp: 4680,
          class: 'Class 8-A',
          school: 'Greenfield Sanctuary Academy',
          trees: 28,
          co2: '12.0 kg',
          streak: '9 Days 🔥',
          tier: 'Emerald Protector',
          avatar: '👩',
          badge: '♻️ Recycle Hero'
        }
      ],
      standings: [
        { rank: 4, name: 'Rahul Sharma (You)', title: 'B-Rank Guardian', level: 12, xp: 3450, trees: 18, co2: '8.4 kg', streak: '7 Days', movement: 'up', movementValue: '+3', tier: 'Emerald Protector', isUser: true, avatar: '👦' },
        { rank: 5, name: 'Rohan Verma', title: 'Golden Explorer', level: 12, xp: 3380, trees: 16, co2: '7.8 kg', streak: '6 Days', movement: 'down', movementValue: '-1', tier: 'Gold Explorer', isUser: false, avatar: '👦' },
        { rank: 6, name: 'Sneha Kapoor', title: 'Silver Ranger', level: 11, xp: 3120, trees: 14, co2: '6.9 kg', streak: '5 Days', movement: 'up', movementValue: '+2', tier: 'Silver Ranger', isUser: false, avatar: '👧' },
        { rank: 7, name: 'Kabir Das', title: 'Silver Ranger', level: 11, xp: 2950, trees: 12, co2: '6.1 kg', streak: '4 Days', movement: 'same', movementValue: '0', tier: 'Silver Ranger', isUser: false, avatar: '👦' },
        { rank: 8, name: 'Diya Sengupta', title: 'Bronze Guardian', level: 10, xp: 2780, trees: 10, co2: '5.2 kg', streak: '3 Days', movement: 'up', movementValue: '+1', tier: 'Bronze Guardian', isUser: false, avatar: '👧' }
      ]
    },

    school: {
      scopeTitle: 'Sanctuary School Standings',
      userRankText: '#8 in School',
      userPercentile: 'Top 2% in School',
      targetRankText: 'Target: Reach Rank #7 (1,230 XP needed)',
      podium: [
        {
          rank: 1,
          name: 'Vikramaditya Rao',
          title: 'Senior Forest Commander',
          level: 24,
          xp: 9840,
          class: 'Class 10-C',
          school: 'Sanctuary Academy',
          trees: 68,
          co2: '32.0 kg',
          streak: '28 Days 🔥',
          tier: 'Planet Champion',
          avatar: '👨',
          badge: '👑 School Champion'
        },
        {
          rank: 2,
          name: 'Priya Patel',
          title: 'Nature Legend',
          level: 18,
          xp: 6240,
          class: 'Class 8-A',
          school: 'Sanctuary Academy',
          trees: 42,
          co2: '18.5 kg',
          streak: '14 Days 🔥',
          tier: 'Diamond Guardian',
          avatar: '👧',
          badge: '🏆 Class Leader'
        },
        {
          rank: 3,
          name: 'Tanvi Deshmukh',
          title: 'Solar Marshal',
          level: 17,
          xp: 5950,
          class: 'Class 9-B',
          school: 'Sanctuary Academy',
          trees: 38,
          co2: '16.8 kg',
          streak: '12 Days 🔥',
          tier: 'Diamond Guardian',
          avatar: '👩',
          badge: '⚡ Solar Pioneer'
        }
      ],
      standings: [
        { rank: 4, name: 'Ishan Nair', title: 'Sanctuary Scout', level: 16, xp: 5420, trees: 35, co2: '15.1 kg', streak: '10 Days', movement: 'up', movementValue: '+1', tier: 'Diamond Guardian', isUser: false, avatar: '👦' },
        { rank: 5, name: 'Aarav Sharma', title: 'Forest Guardian', level: 16, xp: 5120, trees: 34, co2: '14.2 kg', streak: '11 Days', movement: 'same', movementValue: '0', tier: 'Diamond Guardian', isUser: false, avatar: '👦' },
        { rank: 6, name: 'Meera Joshi', title: 'Flora Specialist', level: 15, xp: 4900, trees: 30, co2: '13.0 kg', streak: '9 Days', movement: 'up', movementValue: '+4', tier: 'Emerald Protector', isUser: false, avatar: '👧' },
        { rank: 7, name: 'Ananya Roy', title: 'Emerald Protector', level: 15, xp: 4680, trees: 28, co2: '12.0 kg', streak: '9 Days', movement: 'down', movementValue: '-2', tier: 'Emerald Protector', isUser: false, avatar: '👩' },
        { rank: 8, name: 'Rahul Sharma (You)', title: 'B-Rank Guardian', level: 12, xp: 3450, trees: 18, co2: '8.4 kg', streak: '7 Days', movement: 'up', movementValue: '+5', tier: 'Emerald Protector', isUser: true, avatar: '👦' }
      ]
    },

    district: {
      scopeTitle: 'District Realm Standings',
      userRankText: '#12 in District',
      userPercentile: 'Top 1% in District',
      targetRankText: 'Target: Reach Top 10 (2,350 XP needed)',
      podium: [
        {
          rank: 1,
          name: 'Sanjana Murthy',
          title: 'District Canopy Titan',
          level: 30,
          xp: 14200,
          class: 'Class 10-A',
          school: 'Greenwood High District',
          trees: 110,
          co2: '58.0 kg',
          streak: '45 Days 🔥',
          tier: 'Planet Champion',
          avatar: '👸',
          badge: '🌍 District Legend'
        },
        {
          rank: 2,
          name: 'Vikramaditya Rao',
          title: 'Senior Forest Commander',
          level: 24,
          xp: 9840,
          class: 'Class 10-C',
          school: 'Sanctuary Academy',
          trees: 68,
          co2: '32.0 kg',
          streak: '28 Days 🔥',
          tier: 'Diamond Guardian',
          avatar: '👨',
          badge: '👑 School Hero'
        },
        {
          rank: 3,
          name: 'Devendra Singh',
          title: 'Eco Warrior Chief',
          level: 22,
          xp: 8900,
          class: 'Class 9-A',
          school: 'St. Jude Eco Campus',
          trees: 55,
          co2: '24.5 kg',
          streak: '21 Days 🔥',
          tier: 'Diamond Guardian',
          avatar: '👦',
          badge: '🛡️ Eco Commander'
        }
      ],
      standings: [
        { rank: 4, name: 'Riya Sen', title: 'River Guardian', level: 21, xp: 8150, trees: 48, co2: '21.0 kg', streak: '18 Days', movement: 'up', movementValue: '+2', tier: 'Diamond Guardian', isUser: false, avatar: '👧' },
        { rank: 5, name: 'Priya Patel', title: 'Nature Legend', level: 18, xp: 6240, trees: 42, co2: '18.5 kg', streak: '14 Days', movement: 'up', movementValue: '+3', tier: 'Emerald Protector', isUser: false, avatar: '👧' },
        { rank: 6, name: 'Siddharth V.', title: 'Clean Energy Master', level: 17, xp: 5800, trees: 36, co2: '16.0 kg', streak: '13 Days', movement: 'down', movementValue: '-1', tier: 'Emerald Protector', isUser: false, avatar: '👦' },
        { rank: 12, name: 'Rahul Sharma (You)', title: 'B-Rank Guardian', level: 12, xp: 3450, trees: 18, co2: '8.4 kg', streak: '7 Days', movement: 'up', movementValue: '+8', tier: 'Emerald Protector', isUser: true, avatar: '👦' }
      ]
    },

    state: {
      scopeTitle: 'State Champions Standings',
      userRankText: '#28 in State',
      userPercentile: 'Top 0.5% in State',
      targetRankText: 'Target: Reach Top 20 (4,800 XP needed)',
      podium: [
        {
          rank: 1,
          name: 'Arjun Mehta',
          title: 'State Forest Grandmaster',
          level: 42,
          xp: 24500,
          class: 'Class 10-A',
          school: 'Apex State Eco School',
          trees: 185,
          co2: '94.0 kg',
          streak: '90 Days 🔥',
          tier: 'Planet Champion',
          avatar: '👑',
          badge: '🏛️ State Champion'
        },
        {
          rank: 2,
          name: 'Sanjana Murthy',
          title: 'District Canopy Titan',
          level: 30,
          xp: 14200,
          class: 'Class 10-A',
          school: 'Greenwood High District',
          trees: 110,
          co2: '58.0 kg',
          streak: '45 Days 🔥',
          tier: 'Planet Champion',
          avatar: '👸',
          badge: '🌍 District Titan'
        },
        {
          rank: 3,
          name: 'Kavya Reddy',
          title: 'State Bio Sovereign',
          level: 28,
          xp: 12900,
          class: 'Class 9-C',
          school: 'Valley Green Academy',
          trees: 92,
          co2: '46.0 kg',
          streak: '38 Days 🔥',
          tier: 'Diamond Guardian',
          avatar: '👩',
          badge: '🌸 Bio Sovereign'
        }
      ],
      standings: [
        { rank: 4, name: 'Vikramaditya Rao', title: 'Senior Forest Commander', level: 24, xp: 9840, trees: 68, co2: '32.0 kg', streak: '28 Days', movement: 'up', movementValue: '+1', tier: 'Diamond Guardian', isUser: false, avatar: '👨' },
        { rank: 5, name: 'Nikhil Gupta', title: 'State Energy Champion', level: 23, xp: 9100, trees: 60, co2: '28.0 kg', streak: '25 Days', movement: 'same', movementValue: '0', tier: 'Diamond Guardian', isUser: false, avatar: '👦' },
        { rank: 28, name: 'Rahul Sharma (You)', title: 'B-Rank Guardian', level: 12, xp: 3450, trees: 18, co2: '8.4 kg', streak: '7 Days', movement: 'up', movementValue: '+14', tier: 'Emerald Protector', isUser: true, avatar: '👦' }
      ]
    },

    global: {
      scopeTitle: 'Global World Standings',
      userRankText: '#142 Global',
      userPercentile: 'Top 0.1% Global',
      targetRankText: 'Target: Reach Top 100 (11,000 XP needed)',
      podium: [
        {
          rank: 1,
          name: 'Elena Rostova',
          title: 'Global Earth Sovereign',
          level: 60,
          xp: 48200,
          class: 'Grade 10',
          school: 'Global Eco Academy (Europe)',
          trees: 340,
          co2: '190 kg',
          streak: '180 Days 🔥',
          tier: 'Planet Champion',
          avatar: '👑',
          badge: '🌐 World Legend'
        },
        {
          rank: 2,
          name: 'Kenji Sato',
          title: 'Kyoto Sanctuary Master',
          level: 55,
          xp: 42900,
          class: 'Grade 10',
          school: 'Kyoto Eco Institute (Asia)',
          trees: 290,
          co2: '155 kg',
          streak: '150 Days 🔥',
          tier: 'Planet Champion',
          avatar: '🏯',
          badge: '🌸 Kyoto Sovereign'
        },
        {
          rank: 3,
          name: 'Mateo Silva',
          title: 'Amazonian Forest Warden',
          level: 52,
          xp: 39100,
          class: 'Grade 9',
          school: 'Amazonia Eco Sanctuary (South America)',
          trees: 265,
          co2: '140 kg',
          streak: '135 Days 🔥',
          tier: 'Planet Champion',
          avatar: '🦜',
          badge: '🌳 Rainforest Warden'
        }
      ],
      standings: [
        { rank: 4, name: 'Arjun Mehta', title: 'State Forest Grandmaster', level: 42, xp: 24500, trees: 185, co2: '94.0 kg', streak: '90 Days', movement: 'up', movementValue: '+2', tier: 'Planet Champion', isUser: false, avatar: '👑' },
        { rank: 5, name: 'Lucas Dupont', title: 'Paris Alpine Guardian', level: 38, xp: 21800, trees: 160, co2: '82.0 kg', streak: '75 Days', movement: 'down', movementValue: '-1', tier: 'Planet Champion', isUser: false, avatar: '🇫🇷' },
        { rank: 142, name: 'Rahul Sharma (You)', title: 'B-Rank Guardian', level: 12, xp: 3450, trees: 18, co2: '8.4 kg', streak: '7 Days', movement: 'up', movementValue: '+35', tier: 'Emerald Protector', isUser: true, avatar: '👦' }
      ]
    }
  };

  const currentScopeData = leaderboardDataByScope[activeScopeTab] || leaderboardDataByScope.class;

  return (
    <div className="space-y-14 pb-24 text-slate-100 font-body">
      
      {/* 1. PAGE HERO SECTION WITH PRESTIGIOUS GOLDEN GLOW */}
      <section className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0a2c1d] via-[#093223] to-[#04140d] p-8 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/60 border border-emerald-500/40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT HERO TEXT & METRICS (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>REALM PRESTIGE & HONOR</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
                HALL OF <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">CHAMPIONS</span> 🏆
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                Celebrate the students creating the greatest real-world environmental impact across the Realm. Earn prestige, climb ranks, and inspire your community!
              </p>
            </div>

            {/* LIVE PERSONAL RANK STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">Current Standing</div>
                <div className="text-xl font-black text-white font-heading mt-1">{currentScopeData.userRankText}</div>
                <span className="text-xs text-emerald-300 font-bold block mt-0.5">{currentScopeData.userPercentile}</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">Adventure XP</div>
                <div className="text-xl font-black text-amber-300 font-heading mt-1">3,450 XP</div>
                <span className="text-xs text-amber-200/80 font-bold block mt-0.5">Lvl 12 Guardian</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-teal-300 tracking-wider">Champion Tier</div>
                <div className="text-xl font-black text-teal-200 font-heading mt-1">Emerald</div>
                <span className="text-xs text-teal-400 font-bold block mt-0.5">Tier 4 Unlocked</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-orange-300 tracking-wider">Flame Streak</div>
                <div className="text-xl font-black text-orange-400 font-heading mt-1">7 Days 🔥</div>
                <span className="text-xs text-orange-300 font-bold block mt-0.5">1.5x XP Boost</span>
              </div>

            </div>
          </div>

          {/* RIGHT CHAMPION CELEBRATION VECTOR ARTWORK (5 COLUMNS) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-2xl animate-float-slow">
                <circle cx="180" cy="180" r="140" fill="#f59e0b" opacity="0.15" />
                <circle cx="180" cy="180" r="110" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 130 110 L 230 110 L 210 200 L 150 200 Z" fill="url(#goldTrophyGrad)" />
                <path d="M 110 120 C 90 120 90 160 120 160" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" fill="none" />
                <path d="M 250 120 C 270 120 270 160 240 160" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" fill="none" />
                <rect x="165" y="200" width="30" height="40" fill="#d97706" />
                <rect x="140" y="240" width="80" height="24" rx="6" fill="#78350f" />
                <circle cx="180" cy="150" r="16" fill="#fef08a" />
                <text x="180" y="156" textAnchor="middle" fill="#78350f" fontSize="16" fontWeight="900">★</text>
                
                <defs>
                  <linearGradient id="goldTrophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LEADERBOARD SCOPE SELECTION TABS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black uppercase text-emerald-400 tracking-wider font-heading flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Select Leaderboard Scope</span>
          </h3>
          <span className="text-xs font-extrabold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 uppercase">
            Active Scope: {scopeTabs.find(t => t.id === activeScopeTab)?.label}
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {scopeTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeScopeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveScopeTab(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-300 shadow-xl shadow-emerald-500/30 scale-[1.03]'
                    : 'bg-[#08241a] text-slate-300 border-emerald-500/25 hover:border-emerald-400/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. DYNAMIC TOP 3 CHAMPION PODIUM FOR SELECTED SCOPE */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{scopeTabs.find(t => t.id === activeScopeTab)?.label} • TOP 3 CHAMPIONS</span>
          </div>
          <h2 className="text-3xl font-black text-white font-heading">The Podium of Honor</h2>
        </div>

        {/* PODIUM CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto pt-6">
          
          {/* RANK 2 - SILVER (LEFT) */}
          <motion.div
            key={`p2-${activeScopeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedPlayerDrawer(currentScopeData.podium[1])}
            className="bg-gradient-to-b from-[#092b1e] to-[#04160d] border-2 border-teal-400/60 p-6 rounded-[32px] text-center relative shadow-2xl space-y-4 cursor-pointer hover:border-teal-300 transition-all"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-slate-100 flex items-center gap-1.5">
              <span>🥈 RANK 2</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-teal-950 border-2 border-teal-400 mx-auto flex items-center justify-center text-3xl shadow-lg mt-2">
              {currentScopeData.podium[1].avatar}
            </div>

            <div>
              <h3 className="text-xl font-black text-white font-heading">{currentScopeData.podium[1].name}</h3>
              <span className="text-xs font-bold text-teal-300 block">{currentScopeData.podium[1].title}</span>
              <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{currentScopeData.podium[1].school || currentScopeData.podium[1].class}</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#04160d] border border-teal-500/30 text-xs space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>XP Earned:</span>
                <span className="text-teal-300 font-black">{currentScopeData.podium[1].xp} XP</span>
              </div>
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Trees Planted:</span>
                <span className="text-emerald-400 font-black">{currentScopeData.podium[1].trees} 🌱</span>
              </div>
            </div>
          </motion.div>

          {/* RANK 1 - GOLD (CENTER / ELEVATED) */}
          <motion.div
            key={`p1-${activeScopeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedPlayerDrawer(currentScopeData.podium[0])}
            className="bg-gradient-to-b from-[#1c1808] via-[#0d2a1d] to-[#04160d] border-2 border-amber-400 p-8 rounded-[36px] text-center relative shadow-2xl space-y-5 cursor-pointer hover:border-amber-300 transition-all -translate-y-4 ring-4 ring-amber-400/20"
          >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-sm px-6 py-2 rounded-full shadow-xl border-2 border-amber-200 flex items-center gap-2">
              <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>🥇 RANK 1 CHAMPION</span>
            </div>

            <div className="w-24 h-24 rounded-3xl bg-amber-950 border-4 border-amber-400 mx-auto flex items-center justify-center text-4xl shadow-2xl mt-3 ring-4 ring-amber-400/30">
              {currentScopeData.podium[0].avatar}
            </div>

            <div>
              <h3 className="text-2xl font-black text-white font-heading">{currentScopeData.podium[0].name}</h3>
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">{currentScopeData.podium[0].title}</span>
              <span className="text-xs text-slate-300 font-bold block mt-1">{currentScopeData.podium[0].school || currentScopeData.podium[0].class}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#04160d] border border-amber-400/40 text-xs space-y-2">
              <div className="flex justify-between text-slate-200 font-extrabold">
                <span>Lifetime XP:</span>
                <span className="text-amber-300 font-black text-sm">{currentScopeData.podium[0].xp} XP</span>
              </div>
              <div className="flex justify-between text-slate-200 font-extrabold">
                <span>Trees Planted:</span>
                <span className="text-emerald-300 font-black text-sm">{currentScopeData.podium[0].trees} Trees 🌱</span>
              </div>
              <div className="flex justify-between text-slate-200 font-extrabold">
                <span>CO₂ Reduced:</span>
                <span className="text-teal-300 font-black">{currentScopeData.podium[0].co2}</span>
              </div>
            </div>
          </motion.div>

          {/* RANK 3 - BRONZE (RIGHT) */}
          <motion.div
            key={`p3-${activeScopeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedPlayerDrawer(currentScopeData.podium[2])}
            className="bg-gradient-to-b from-[#092b1e] to-[#04160d] border-2 border-emerald-400/60 p-6 rounded-[32px] text-center relative shadow-2xl space-y-4 cursor-pointer hover:border-emerald-300 transition-all"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 font-black text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-amber-500 flex items-center gap-1.5">
              <span>🥉 RANK 3</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-emerald-950 border-2 border-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-lg mt-2">
              {currentScopeData.podium[2].avatar}
            </div>

            <div>
              <h3 className="text-xl font-black text-white font-heading">{currentScopeData.podium[2].name}</h3>
              <span className="text-xs font-bold text-emerald-300 block">{currentScopeData.podium[2].title}</span>
              <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{currentScopeData.podium[2].school || currentScopeData.podium[2].class}</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#04160d] border border-emerald-500/30 text-xs space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>XP Earned:</span>
                <span className="text-emerald-300 font-black">{currentScopeData.podium[2].xp} XP</span>
              </div>
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Trees Planted:</span>
                <span className="text-emerald-400 font-black">{currentScopeData.podium[2].trees} 🌱</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. MY CURRENT STANDING SPOTLIGHT CARD */}
      <section className="bg-gradient-to-r from-[#0d3b2a] via-[#09291c] to-[#04160d] border-2 border-emerald-400/60 p-6 sm:p-8 rounded-[36px] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg border-2 border-emerald-300 font-heading">
              {currentScopeData.userRankText.split(' ')[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-white font-heading">Rahul Sharma (You)</h3>
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  {currentScopeData.userPercentile}
                </span>
              </div>
              <p className="text-xs text-emerald-300/90 font-bold mt-0.5">
                Class 8-A • Level 12 B-Rank Guardian (3,450 XP)
              </p>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-300">{currentScopeData.targetRankText}</span>
            </div>
            <div className="w-full h-3 bg-[#04160d] rounded-full overflow-hidden p-0.5 border border-emerald-500/40">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full w-[82%] shadow-[0_0_10px_#34d399]" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. PRIMARY DYNAMIC STANDINGS LIST FOR SELECTED SCOPE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white font-heading">Adventurer Rankings</h3>
          <span className="text-xs font-bold text-slate-400">{currentScopeData.scopeTitle}</span>
        </div>

        <div className="space-y-3">
          {currentScopeData.standings.map((player) => (
            <motion.div
              key={`${activeScopeTab}-${player.rank}-${player.name}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 6 }}
              onClick={() => setSelectedPlayerDrawer(player)}
              className={`p-5 rounded-3xl border flex items-center justify-between gap-4 transition-all cursor-pointer shadow-lg ${
                player.isUser
                  ? 'bg-gradient-to-r from-[#0a3826] to-[#051912] border-emerald-400/70 ring-2 ring-emerald-400/30'
                  : 'bg-[#08241a] border-emerald-500/30 hover:border-emerald-400/60'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-xl bg-[#04160d] border border-emerald-500/30 text-white font-black text-sm flex items-center justify-center font-heading">
                  #{player.rank}
                </span>
                
                <div>
                  <h4 className="text-base font-black text-white font-heading leading-tight flex items-center gap-2">
                    <span>{player.name}</span>
                    {player.isUser && (
                      <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                        YOU
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-emerald-300/80 font-bold mt-0.5">
                    Level {player.level} • {player.tier}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-black text-slate-400 block">Trees Planted</span>
                  <span className="text-sm font-black text-emerald-400">{player.trees} 🌱</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-slate-400 block">Lifetime XP</span>
                  <span className="text-base font-black text-amber-300">{player.xp} XP</span>
                </div>

                <ChevronRight className="w-5 h-5 text-emerald-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CHAMPION OF THE DAY SPOTLIGHT */}
      <section className="p-8 rounded-[36px] bg-gradient-to-br from-[#1c1705] via-[#09291c] to-[#04140d] border-2 border-amber-400/60 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>FEATURED CHAMPION OF THE DAY</span>
            </div>

            <h3 className="text-3xl font-black text-white font-heading">Priya Patel</h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              "Priya organized the campus recycling drive collecting over 34 kg of plastic waste in a single afternoon!"
            </p>

            <div className="flex items-center gap-4 text-xs font-black pt-2">
              <span className="text-emerald-300">🌱 42 Trees Planted</span>
              <span className="text-teal-300">💧 120L Water Saved</span>
              <span className="text-amber-300">🔥 14-Day Streak</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-28 h-28 rounded-3xl bg-amber-950 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-2xl">
              👧
            </div>
          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE PLAYER PROFILE DRAWER */}
      <AnimatePresence>
        {selectedPlayerDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#062016] border-l border-emerald-500/40 h-full p-8 overflow-y-auto space-y-8 text-slate-100 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 uppercase">
                  Rank #{selectedPlayerDrawer.rank} Champion Profile
                </span>
                <button
                  onClick={() => setSelectedPlayerDrawer(null)}
                  className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-3">
                <div className="w-24 h-24 rounded-3xl bg-emerald-950 border-4 border-emerald-400 mx-auto flex items-center justify-center text-4xl shadow-xl">
                  {selectedPlayerDrawer.avatar || '👤'}
                </div>
                <h2 className="text-2xl font-black text-white font-heading">{selectedPlayerDrawer.name}</h2>
                <span className="text-xs font-bold text-emerald-300 block">
                  Level {selectedPlayerDrawer.level} • {selectedPlayerDrawer.title}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-5 rounded-2xl bg-[#04160d] border border-emerald-500/35 text-xs font-bold">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Lifetime XP</span>
                  <div className="text-lg font-black text-amber-300">{selectedPlayerDrawer.xp} XP</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Trees Planted</span>
                  <div className="text-lg font-black text-emerald-400">{selectedPlayerDrawer.trees || 18} 🌱</div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedPlayerDrawer(null)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-sm cursor-pointer shadow-xl"
                >
                  CONGRATULATE CHAMPION 🎉
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
