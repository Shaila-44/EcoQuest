import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Sparkles, 
  Flame, 
  Clock, 
  Zap, 
  Coins, 
  Leaf, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  X, 
  ChevronRight, 
  Globe2, 
  Award, 
  TreePine, 
  Recycle, 
  Droplets, 
  Zap as EnergyIcon, 
  Trash2, 
  Bird, 
  Flower2, 
  School,
  Layers,
  Calendar,
  Swords
} from 'lucide-react';

export default function QuestBoard({ onStartMission, onOpenUploadProof }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedQuestDrawer, setSelectedQuestDrawer] = useState(null);

  // Categories list
  const categories = [
    { id: 'all', label: 'All Challenges', icon: Sparkles, count: 24 },
    { id: 'trees', label: 'Tree Plantation', icon: TreePine, count: 8 },
    { id: 'recycling', label: 'Recycling & Waste', icon: Recycle, count: 12 },
    { id: 'water', label: 'Water Conservation', icon: Droplets, count: 6 },
    { id: 'energy', label: 'Energy Saving', icon: EnergyIcon, count: 5 },
    { id: 'cleanup', label: 'Community Cleanup', icon: Trash2, count: 9 },
    { id: 'wildlife', label: 'Wildlife Protection', icon: Bird, count: 4 },
    { id: 'gardening', label: 'Gardening & Flora', icon: Flower2, count: 5 },
    { id: 'school', label: 'School Activities', icon: School, count: 8 },
  ];

  // Challenge Database
  const questsData = [
    {
      id: 'q1',
      title: 'Campus Zero-Waste Plastic Drive',
      category: 'recycling',
      categoryLabel: 'Recycling',
      difficulty: 'medium',
      difficultyLabel: 'Medium 🌿',
      time: '25 Mins',
      xp: 350,
      coins: 150,
      impact: 'Prevents ~1.5kg plastic from landfills',
      status: 'available',
      badge: 'Plastic Guardian',
      islandUnlock: 'Recycling Sanctuary Totem',
      featured: true,
      description: 'Gather 5 single-use plastic containers from home or school grounds, segregate them into designated recycling bins, and upload photo proof.',
      steps: [
        'Collect 5 clean plastic bottles or containers.',
        'Locate the school recycling hub or home bin.',
        'Take a clear photo of segregated items.',
        'Submit for instant AI verification.'
      ],
      materials: ['5 Plastic Containers', 'Smartphone for Photo Proof', 'Recycling Gloves'],
      location: 'School Campus or Neighborhood',
      aiVerified: true
    },
    {
      id: 'q2',
      title: 'Plant a Native Shade Tree Sapling',
      category: 'trees',
      categoryLabel: 'Tree Plantation',
      difficulty: 'hard',
      difficultyLabel: 'Hard 🌳',
      time: '45 Mins',
      xp: 500,
      coins: 250,
      impact: 'Absorbs ~22kg CO₂ annually',
      status: 'available',
      badge: 'Forest Steward',
      islandUnlock: 'Baby Forest Owl Mascot',
      featured: false,
      description: 'Plant a native tree sapling in your garden, school sanctuary, or community park. Water thoroughly and add a protective wooden guard.',
      steps: [
        'Select a native sapling suitable for your region.',
        'Dig a hole twice the width of the root ball.',
        'Plant sapling, soil backfill, and water deeply.',
        'Upload photo with sapling & location tag.'
      ],
      materials: ['Native Sapling', 'Shovel', 'Watering Can', 'Mulch'],
      location: 'Sanctuary Park or Home Garden',
      aiVerified: true
    },
    {
      id: 'q3',
      title: 'Home Energy Audit & Appliance Unplug',
      category: 'energy',
      categoryLabel: 'Energy Saving',
      difficulty: 'easy',
      difficultyLabel: 'Easy 🌱',
      time: '15 Mins',
      xp: 150,
      coins: 80,
      impact: 'Saves ~2.4 kWh electricity',
      status: 'in-progress',
      progress: 60,
      badge: 'Energy Guardian',
      islandUnlock: 'Bioluminescent Lamp Pillar',
      featured: false,
      description: 'Inspect your home or classroom to identify phantom power draws. Unplug unused chargers, appliances, and turn off standby switches.',
      steps: [
        'Check 5 rooms for idle plugged-in chargers.',
        'Switch off unused power strips.',
        'Record energy saved on audit checklist.',
        'Upload photo proof of unplugged devices.'
      ],
      materials: ['Energy Audit Checklist', 'Smartphone'],
      location: 'Home or School Classroom',
      aiVerified: true
    },
    {
      id: 'q4',
      title: 'Pollinator Wildflower Patch Creation',
      category: 'gardening',
      categoryLabel: 'Gardening',
      difficulty: 'medium',
      difficultyLabel: 'Medium 🌿',
      time: '30 Mins',
      xp: 300,
      coins: 140,
      impact: 'Attracts 50+ bees & butterflies',
      status: 'available',
      badge: 'Pollinator Ally',
      islandUnlock: 'Honeybee Hive & Flower Bed',
      featured: false,
      description: 'Sow native wildflower seeds in a sunny pot or garden bed to create a sanctuary for bees, butterflies, and hummingbird pollinators.',
      steps: [
        'Prepare soil in a sunny pot or plot.',
        'Sow seed mix evenly & water gently.',
        'Take photo of planted seed bed.',
        'Check back weekly for bloom proof!'
      ],
      materials: ['Wildflower Seed Mix', 'Potting Soil', 'Watering Can'],
      location: 'Balcony, Garden, or School Pot',
      aiVerified: true
    },
    {
      id: 'q5',
      title: 'School Riverbed & Park Trash Harvest',
      category: 'cleanup',
      categoryLabel: 'Cleanup',
      difficulty: 'legendary',
      difficultyLabel: 'Legendary 🌎',
      time: '60 Mins',
      xp: 800,
      coins: 400,
      impact: 'Cleans 10kg litter from waterways',
      status: 'available',
      badge: 'Realm Hero',
      islandUnlock: 'Crystal Water Fountain & Turtle',
      featured: false,
      description: 'Join fellow adventurers to clean litter from a local park or riverbank. Sort collected waste into plastic, paper, and non-recyclable bags.',
      steps: [
        'Equip safety gloves & waste bags.',
        'Collect at least 5kg litter with team.',
        'Separate recyclable materials.',
        'Upload group photo at collection point.'
      ],
      materials: ['Heavy-Duty Waste Bags', 'Safety Gloves', 'Tongs'],
      location: 'Local Park or Riverbank',
      aiVerified: true
    },
    {
      id: 'q6',
      title: 'Build a DIY Backyard Bird Bath',
      category: 'wildlife',
      categoryLabel: 'Wildlife',
      difficulty: 'easy',
      difficultyLabel: 'Easy 🌱',
      time: '15 Mins',
      xp: 200,
      coins: 100,
      impact: 'Provides fresh water to urban birds',
      status: 'completed',
      badge: 'Avian Protector',
      islandUnlock: 'Songbird Nesting Box',
      featured: false,
      description: 'Create a shallow, safe water basin for local birds using a repurposed terracotta saucer or dish placed in a quiet garden spot.',
      steps: [
        'Find a shallow dish (2-3 inches deep).',
        'Place stones inside for bird footing.',
        'Fill with clean freshwater.',
        'Upload photo of installed bird bath.'
      ],
      materials: ['Terracotta Saucer', 'Clean Water', 'Small Pebbles'],
      location: 'Garden, Yard, or Window Sill',
      aiVerified: true
    }
  ];

  // Daily Challenges
  const dailyQuests = [
    { id: 'dq1', title: 'Bring a Reusable Water Bottle', xp: 100, coins: 50, time: '5 Mins', difficulty: 'Easy 🌱', completed: true },
    { id: 'dq2', title: 'Water 3 School Garden Plants', xp: 120, coins: 60, time: '10 Mins', difficulty: 'Easy 🌱', completed: false },
    { id: 'dq3', title: 'Turn off Unused Computer Screens', xp: 150, coins: 70, time: '5 Mins', difficulty: 'Easy 🌱', completed: false },
  ];

  // Filtering Logic
  const filteredQuests = questsData.filter((q) => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (selectedStatus !== 'all' && q.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-14 pb-24">
      
      {/* 1. PAGE HERO SECTION WITH SPACIOUS LAYOUT */}
      <section className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#062419] via-[#093223] to-[#04140d] text-white p-8 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/50 border border-emerald-500/40">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT HERO TEXT & METRICS STRIP (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <Swords className="w-4 h-4 text-amber-400" />
              <span>REAL-WORLD ADVENTURE DISPATCH</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
                CHALLENGE <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">BOARD</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                Choose your next environmental challenge and make a real-world impact. Earn XP, Loot Coins, and unlock Sanctuary Island growth!
              </p>
            </div>

            {/* LIVE RPG METRICS DISPLAY ROW WITH EXTRA SPACING */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">Level & XP</div>
                <div className="text-xl font-black text-white font-heading mt-1">Lvl 12</div>
                <span className="text-xs text-amber-300 font-bold block mt-0.5">3,450 / 5,000 XP</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-teal-300 tracking-wider">Weekly Progress</div>
                <div className="text-xl font-black text-teal-200 font-heading mt-1">5 / 7</div>
                <span className="text-xs text-teal-400 font-bold block mt-0.5">71% Goal Met</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">Completion</div>
                <div className="text-xl font-black text-amber-300 font-heading mt-1">78%</div>
                <span className="text-xs text-amber-200/80 font-bold block mt-0.5">24 Completed</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-orange-300 tracking-wider">Streak</div>
                <div className="text-xl font-black text-orange-400 font-heading mt-1">7 Days 🔥</div>
                <span className="text-xs text-orange-300 font-bold block mt-0.5">1.5x Multiplier</span>
              </div>

            </div>
          </div>

          {/* RIGHT STORYTELLING VECTOR ARTWORK (5 COLUMNS) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-2xl animate-float-slow">
                <circle cx="180" cy="180" r="140" fill="#10b981" opacity="0.15" />
                <circle cx="180" cy="180" r="110" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 40 280 Q 180 200 320 280 Z" fill="#0d9488" />
                <path d="M 175 240 L 175 140 L 185 140 L 185 240 Z" fill="#78350f" />
                <circle cx="180" cy="120" r="45" fill="#10b981" />
                <circle cx="150" cy="140" r="30" fill="#34d399" />
                <circle cx="210" cy="140" r="30" fill="#047857" />
                <circle cx="180" cy="65" r="25" fill="#f59e0b" />
                <g fill="none" stroke="#fef08a" strokeWidth="2">
                  <path d="M 90 90 Q 100 80 110 90" />
                  <path d="M 230 95 Q 240 85 250 95" />
                </g>
                <g transform="translate(110, 200)">
                  <circle cx="20" cy="15" r="8" fill="#fcd34d" />
                  <path d="M 20 23 L 10 50 L 30 50 Z" fill="#34d399" />
                </g>
                <g transform="translate(210, 195)">
                  <circle cx="20" cy="15" r="8" fill="#fcd34d" />
                  <path d="M 20 23 L 10 50 L 30 50 Z" fill="#38bdf8" />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </section>



      {/* 4. DAILY CHALLENGES SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-black text-white font-heading">Daily Challenges</h3>
            <span className="text-xs font-black text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full">
              Resets in 08h : 14m
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dailyQuests.map((dq) => (
            <div
              key={dq.id}
              className={`p-6 rounded-[28px] border transition-all ${
                dq.completed
                  ? 'bg-emerald-950/40 border-emerald-500/40 opacity-80'
                  : 'bg-[#08241a] border-emerald-500/30 hover:border-emerald-400/60 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">{dq.difficulty}</span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {dq.time}
                </span>
              </div>
              <h4 className="text-base font-black text-white font-heading leading-snug">{dq.title}</h4>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-500/20">
                <div className="flex items-center gap-3 text-xs font-black">
                  <span className="text-emerald-300">+{dq.xp} XP</span>
                  <span className="text-amber-300">+{dq.coins} 🪙</span>
                </div>
                {dq.completed ? (
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Done
                  </span>
                ) : (
                  <button
                    onClick={onStartMission}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 cursor-pointer shadow-md"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRIMARY CHALLENGE GRID WITH GENEROUS GAP SPACING */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-white font-heading flex items-center gap-2.5">
            <Target className="w-6 h-6 text-emerald-400" />
            <span>Available Challenges</span>
          </h3>
        </div>

        {filteredQuests.length === 0 ? (
          /* EMPTY STATE FALLBACK */
          <div className="p-16 text-center bg-[#061e15] rounded-[36px] border border-emerald-500/30 space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 text-3xl">
              🌱
            </div>
            <h4 className="text-xl font-black text-white font-heading">No Challenges Match Your Filter</h4>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              New adventures arrive daily! Try resetting your filter settings.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedStatus('all');
              }}
              className="px-7 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 cursor-pointer shadow-lg"
            >
              Explore All Challenges
            </button>
          </div>
        ) : (
          /* 3-COLUMN CHALLENGE GRID WITH EXTRA GAP SPACING */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredQuests.map((quest) => {
              const isLocked = quest.status === 'locked';
              const isCompleted = quest.status === 'completed';

              return (
                <motion.div
                  key={quest.id}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedQuestDrawer(quest)}
                  className={`rounded-[32px] border p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-2xl transition-all ${
                    isLocked
                      ? 'bg-slate-950/80 border-slate-800 opacity-75'
                      : isCompleted
                      ? 'bg-[#06241a]/90 border-emerald-500/40'
                      : 'bg-gradient-to-br from-[#08291e] to-[#04160d] border-emerald-500/35 hover:border-emerald-400/80 hover:shadow-emerald-950/60'
                  }`}
                >
                  {/* TOP CARD BADGES */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                      {quest.difficultyLabel}
                    </span>

                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {quest.time}
                    </span>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xl font-black text-white font-heading leading-snug hover:text-emerald-300 transition-colors">
                      {quest.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-3 leading-relaxed">
                      {quest.description}
                    </p>
                  </div>

                  {/* IMPACT & REWARDS FOOTER */}
                  <div className="space-y-4 pt-4 border-t border-emerald-500/20">
                    <div className="text-xs font-semibold text-emerald-300/90 flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{quest.impact}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 text-xs font-black">
                        <span className="text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                          +{quest.xp} XP
                        </span>
                        <span className="text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-xl border border-amber-500/30">
                          +{quest.coins} 🪙
                        </span>
                      </div>

                      {isLocked ? (
                        <span className="text-xs font-black text-slate-500 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      ) : isCompleted ? (
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Claimed
                        </span>
                      ) : (
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Details <ChevronRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. INTERACTIVE CHALLENGE DETAILS SIDE DRAWER MODAL */}
      <AnimatePresence>
        {selectedQuestDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#062016] border-l border-emerald-500/40 h-full p-8 sm:p-10 overflow-y-auto space-y-8 text-slate-100 shadow-2xl"
            >
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-5">
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-400/40 uppercase">
                  {selectedQuestDrawer.difficultyLabel} Challenge
                </span>
                <button
                  onClick={() => setSelectedQuestDrawer(null)}
                  className="p-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CHALLENGE TITLE */}
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-white font-heading leading-tight">
                  {selectedQuestDrawer.title}
                </h2>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  {selectedQuestDrawer.description}
                </p>
              </div>

              {/* REWARDS BREAKDOWN */}
              <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-[#04160d] border border-emerald-500/35">
                <div>
                  <span className="text-xs font-black uppercase text-emerald-400">Adventure XP</span>
                  <div className="text-xl font-black text-white mt-0.5">+{selectedQuestDrawer.xp} XP</div>
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-amber-400">Loot Coins</span>
                  <div className="text-xl font-black text-amber-300 mt-0.5">+{selectedQuestDrawer.coins} 🪙</div>
                </div>
                {selectedQuestDrawer.badge && (
                  <div className="col-span-2 pt-3 border-t border-emerald-500/20">
                    <span className="text-xs font-black uppercase text-purple-300">Unlock Badge Loot</span>
                    <div className="text-sm font-black text-white flex items-center gap-2 mt-1">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span>{selectedQuestDrawer.badge}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* MISSION STEPS CHECKLIST */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider font-heading">Mission Steps Checklist</h4>
                <div className="space-y-3">
                  {selectedQuestDrawer.steps.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#04160d] border border-emerald-500/20 text-xs sm:text-sm font-medium text-slate-200 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-xs flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* REQUIRED MATERIALS */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-amber-300 tracking-wider font-heading">Required Materials</h4>
                <div className="flex flex-wrap gap-2.5">
                  {selectedQuestDrawer.materials.map((mat, idx) => (
                    <span key={idx} className="text-xs font-bold bg-amber-950/60 border border-amber-400/30 text-amber-200 px-3.5 py-1.5 rounded-xl">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* LOCATION & AI PROOF DETAILS */}
              <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Suggested Location:</span>
                  <span className="text-emerald-300">{selectedQuestDrawer.location}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Verification Engine:</span>
                  <span className="text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> AI Photo Scanner
                  </span>
                </div>
              </div>

              {/* DRAWER ACTION CTA BUTTON */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSelectedQuestDrawer(null);
                    onStartMission();
                  }}
                  className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <Target className="w-5 h-5 text-slate-950" />
                  <span>START THIS CHALLENGE NOW</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
