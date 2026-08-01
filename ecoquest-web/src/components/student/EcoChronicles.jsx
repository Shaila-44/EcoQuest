import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  Calendar, 
  TreePine, 
  Recycle, 
  Droplets, 
  Award, 
  Camera, 
  Share2, 
  Search, 
  Filter, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Heart, 
  Star, 
  Clock, 
  Globe2, 
  MapPin, 
  Zap, 
  BookMarked,
  ArrowUpRight
} from 'lucide-react';

export default function EcoChronicles() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedChapterDrawer, setSelectedChapterDrawer] = useState(null);
  const [activeTab, setActiveTab] = useState('timeline'); // timeline | photos | legacy

  // Chapters Data
  const chapters = [
    {
      id: 'ch1',
      chapterNumber: 1,
      title: 'The EcoQuest Begins',
      date: 'September 14, 2025',
      icon: '🌱',
      type: 'milestone',
      xp: 150,
      coins: 50,
      badge: 'Novice Guardian',
      tag: 'Journey Kickoff',
      summary: 'Joined the EcoQuest Neo Nature RPG, took the Adventurer Pledge, and set up Sanctuary Island.',
      aiReflection: 'Your journey started with a simple promise to protect nature. You laid the foundation for your environmental legacy.',
      location: 'Greenfield School Sanctuary',
      impact: 'Initiated Sanctuary Island Growth',
      photo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
      proofVerified: true
    },
    {
      id: 'ch2',
      chapterNumber: 2,
      title: 'First Tree Sapling Planted',
      date: 'October 02, 2025',
      icon: '🌳',
      type: 'trees',
      xp: 500,
      coins: 250,
      badge: 'Forest Steward',
      tag: 'Tree Plantation',
      summary: 'Planted a native shade sapling in the school botanical corner, watered it thoroughly, and placed a protective guard.',
      aiReflection: 'Today you planted life into the earth. Your sapling will absorb over 22kg of CO₂ annually and provide shade for future students.',
      location: 'School Botanical Garden',
      impact: 'Absorbs ~22kg CO₂ annually',
      photo: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=600&auto=format&fit=crop&q=80',
      proofVerified: true
    },
    {
      id: 'ch3',
      chapterNumber: 3,
      title: 'Zero-Waste Plastic Drive Hero',
      date: 'November 15, 2025',
      icon: '♻️',
      type: 'recycling',
      xp: 350,
      coins: 150,
      badge: 'Plastic Guardian',
      tag: 'Recycling',
      summary: 'Collected 5 single-use plastic bottles from campus grounds, sorted them into recycling bins, and scanned photo proof.',
      aiReflection: 'By diverting plastic waste from landfill, you protected urban bird life and inspired 4 classmates to start recycling.',
      location: 'Campus Recycling Hub',
      impact: 'Prevented 1.5kg plastic waste',
      photo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
      proofVerified: true
    },
    {
      id: 'ch4',
      chapterNumber: 4,
      title: 'Class Top 10 Champion Rank',
      date: 'January 10, 2026',
      icon: '🌎',
      type: 'milestone',
      xp: 400,
      coins: 200,
      badge: 'Top 10 Champion',
      tag: 'Rank Milestone',
      summary: 'Surpassed the 2,500 XP milestone and entered the Top 10 Class Rankings at #4 Rank in Class 8-A.',
      aiReflection: 'Your consistency and dedication raised your class score to #1 in the school battle! You earned respect across the realm.',
      location: 'Hall of Champions',
      impact: 'Top 5% Class Performance',
      photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
      proofVerified: true
    },
    {
      id: 'ch5',
      chapterNumber: 5,
      title: 'Earth Guardian Legend (Active)',
      date: 'August 01, 2026',
      icon: '🏆',
      type: 'active',
      xp: 1250,
      coins: 600,
      badge: 'Emerald Protector',
      tag: 'Active Chapter',
      summary: 'Achieved 3,450 XP, unlocked Bioluminescent Lamp Totem, and maintained a 7-day flame streak multiplier.',
      aiReflection: 'This chapter represents your ongoing commitment. You are now recognized as an Emerald Protector in the EcoQuest realm.',
      location: 'Sanctuary Island',
      impact: '18 Trees • 14.5kg Plastic • 120L Water',
      photo: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?w=600&auto=format&fit=crop&q=80',
      proofVerified: true
    }
  ];

  // Memories Photo Gallery
  const photoGallery = [
    { id: 'p1', title: 'Native Shade Sapling', date: 'Oct 02, 2025', location: 'Botanical Garden', xp: 500, img: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=600&auto=format&fit=crop&q=80', category: 'Tree Plantation' },
    { id: 'p2', title: 'Campus Plastic Harvest', date: 'Nov 15, 2025', location: 'Recycling Hub', xp: 350, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80', category: 'Recycling' },
    { id: 'p3', title: 'DIY Bird Bath Basin', date: 'Jan 22, 2026', location: 'Home Yard', xp: 200, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80', category: 'Wildlife' },
    { id: 'p4', title: 'Wildflower Seed Patch', date: 'Mar 10, 2026', location: 'School Balcony', xp: 300, img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&auto=format&fit=crop&q=80', category: 'Gardening' },
  ];

  return (
    <div className="space-y-14 pb-24 text-slate-100 font-body">
      
      {/* 1. PAGE HERO SECTION WITH MAGICAL STORYBOOK GLOW */}
      <section className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#06291d] via-[#093223] to-[#04140d] p-8 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/60 border border-emerald-500/40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT HERO TEXT & STORY METRICS (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <BookMarked className="w-4 h-4 text-amber-400" />
              <span>PERSONAL ENVIRONMENTAL ADVENTURE JOURNAL</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
                MY <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">JOURNEY</span> 📖
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                Every action you complete becomes a permanent chapter in your journey to protect the planet. Revisit memories, celebrate milestones, and reflect on your environmental legacy!
              </p>
            </div>

            {/* LIVE STORY METRICS DISPLAY STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">Journey Started</div>
                <div className="text-lg font-black text-white font-heading mt-1">Sep 14, 2025</div>
                <span className="text-xs text-amber-300 font-bold block mt-0.5">322 Days Active</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">Current Chapter</div>
                <div className="text-lg font-black text-amber-300 font-heading mt-1">Chapter 5</div>
                <span className="text-xs text-amber-200/80 font-bold block mt-0.5">Earth Guardian</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-teal-300 tracking-wider">Total Quests</div>
                <div className="text-lg font-black text-teal-200 font-heading mt-1">24 Done</div>
                <span className="text-xs text-teal-400 font-bold block mt-0.5">100% AI Verified</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-orange-300 tracking-wider">Flame Streak</div>
                <div className="text-lg font-black text-orange-400 font-heading mt-1">7 Days 🔥</div>
                <span className="text-xs text-orange-300 font-bold block mt-0.5">1.5x XP Multiplier</span>
              </div>

            </div>
          </div>

          {/* RIGHT STORYBOOK VECTOR ARTWORK (5 COLUMNS) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-2xl animate-float-slow">
                <circle cx="180" cy="180" r="140" fill="#10b981" opacity="0.15" />
                <circle cx="180" cy="180" r="110" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="6 6" />
                
                {/* Open Book Vector Graphic */}
                <path d="M 80 140 Q 180 120 180 240 Q 80 220 80 140 Z" fill="#065f46" stroke="#34d399" strokeWidth="3" />
                <path d="M 280 140 Q 180 120 180 240 Q 280 220 280 140 Z" fill="#047857" stroke="#34d399" strokeWidth="3" />
                
                <path d="M 100 160 Q 170 145 170 220" stroke="#a7f3d0" strokeWidth="2" fill="none" />
                <path d="M 260 160 Q 190 145 190 220" stroke="#a7f3d0" strokeWidth="2" fill="none" />

                {/* Floating Magic Leaf */}
                <path d="M 180 80 Q 200 60 180 40 Q 160 60 180 80 Z" fill="#f59e0b" className="animate-bounce" />
                
                <circle cx="180" cy="120" r="8" fill="#fef08a" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CHRONICLE SECTION VIEW NAVIGATION TABS */}
      <section className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                : 'bg-[#08241a] text-slate-300 hover:text-white border border-emerald-500/20'
            }`}
          >
            📖 Story Chapters Timeline
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                : 'bg-[#08241a] text-slate-300 hover:text-white border border-emerald-500/20'
            }`}
          >
            📸 Photo Memories Gallery
          </button>

          <button
            onClick={() => setActiveTab('legacy')}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'legacy'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                : 'bg-[#08241a] text-slate-300 hover:text-white border border-emerald-500/20'
            }`}
          >
            🌍 Environmental Legacy
          </button>
        </div>
      </section>

      {/* 3. VERTICAL STORYLINE TIMELINE VIEW */}
      {activeTab === 'timeline' && (
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white font-heading">Your Environmental Journey Timeline</h2>
            <p className="text-xs text-slate-300 font-medium">Click any chapter to view full memories, photos, and AI reflections</p>
          </div>

          <div className="relative max-w-4xl mx-auto space-y-8 before:absolute before:inset-0 before:left-8 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-emerald-400 before:via-teal-400 before:to-amber-400">
            {chapters.map((ch, idx) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                onClick={() => setSelectedChapterDrawer(ch)}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer ${
                  ch.type === 'active' ? 'scale-[1.02]' : ''
                }`}
              >
                {/* CHAPTER ICON BADGE ON TIMELINE AXIS */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#08291e] border-2 border-emerald-400 shadow-xl text-2xl z-10 shrink-0 group-hover:scale-110 transition-transform">
                  {ch.icon}
                </div>

                {/* CHAPTER CONTENT CARD */}
                <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] p-6 rounded-[32px] bg-gradient-to-br from-[#08291e] to-[#04160d] border border-emerald-500/30 group-hover:border-emerald-400 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                      Chapter 0{ch.chapterNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {ch.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white font-heading group-hover:text-emerald-300 transition-colors">
                    {ch.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-medium leading-relaxed line-clamp-2">
                    {ch.summary}
                  </p>

                  <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs font-black">
                    <span className="text-emerald-300">+{ch.xp} XP</span>
                    <span className="text-amber-300">+{ch.coins} 🪙</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      Read Entry <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 4. PHOTO MEMORIES GALLERY VIEW */}
      {activeTab === 'photos' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white font-heading">Mission Photo Memories</h2>
            <span className="text-xs font-bold text-slate-400">{photoGallery.length} Verified Photos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoGallery.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-emerald-500/30 bg-[#08241a] overflow-hidden shadow-xl space-y-3 p-4"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950">
                  <img src={photo.img} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <CheckCircle2 className="w-3 h-3" /> AI Verified
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-white font-heading">{photo.title}</h4>
                  <div className="flex justify-between text-xs font-bold text-slate-400 mt-1">
                    <span>{photo.location}</span>
                    <span className="text-emerald-400">+{photo.xp} XP</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. ENVIRONMENTAL LEGACY INFOGRAPHIC VIEW */}
      {activeTab === 'legacy' && (
        <section className="p-8 rounded-[36px] bg-gradient-to-br from-[#09291c] to-[#04160d] border border-emerald-500/40 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white font-heading">Your Environmental Impact Legacy</h2>
            <p className="text-xs text-slate-300">Lifetime contribution calculated through AI verified quest logs</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#04160d] border border-emerald-500/30 text-center space-y-2">
              <div className="text-3xl">🌱</div>
              <div className="text-2xl font-black text-white font-heading">18 Trees</div>
              <span className="text-xs text-emerald-400 font-bold block">Planted & Guarded</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#04160d] border border-teal-500/30 text-center space-y-2">
              <div className="text-3xl">♻️</div>
              <div className="text-2xl font-black text-teal-200 font-heading">14.5 kg</div>
              <span className="text-xs text-teal-400 font-bold block">Plastic Recycled</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#04160d] border border-sky-500/30 text-center space-y-2">
              <div className="text-3xl">💧</div>
              <div className="text-2xl font-black text-sky-200 font-heading">120 Liters</div>
              <span className="text-xs text-sky-400 font-bold block">Fresh Water Conserved</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#04160d] border border-amber-500/30 text-center space-y-2">
              <div className="text-3xl">🌍</div>
              <div className="text-2xl font-black text-amber-300 font-heading">8.4 kg</div>
              <span className="text-xs text-amber-200 font-bold block">Carbon Offset</span>
            </div>
          </div>
        </section>
      )}

      {/* 6. AI REFLECTION HIGHLIGHT CARD */}
      <section className="p-8 rounded-[36px] bg-gradient-to-r from-[#1c1808] via-[#09291c] to-[#04160d] border-2 border-amber-400/50 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI MONTHLY STORY REFLECTION</span>
        </div>
        <p className="text-base text-slate-200 font-medium leading-relaxed">
          "This month you completed 18 environmental missions, planted native trees, and inspired your classmates by participating in community cleanups. Your dedication has transformed your journey into a remarkable environmental legacy."
        </p>
      </section>

      {/* 7. INTERACTIVE CHAPTER DETAIL SIDE DRAWER */}
      <AnimatePresence>
        {selectedChapterDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#062016] border-l border-emerald-500/40 h-full p-8 overflow-y-auto space-y-6 text-slate-100 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 uppercase">
                  Chapter 0{selectedChapterDrawer.chapterNumber} Entry
                </span>
                <button
                  onClick={() => setSelectedChapterDrawer(null)}
                  className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white font-heading">{selectedChapterDrawer.title}</h2>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedChapterDrawer.date} • {selectedChapterDrawer.location}
                </span>
              </div>

              {selectedChapterDrawer.photo && (
                <div className="rounded-2xl overflow-hidden border border-emerald-500/30 aspect-video">
                  <img src={selectedChapterDrawer.photo} alt={selectedChapterDrawer.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#04160d] border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-black uppercase text-amber-400">AI Story Reflection</span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  "{selectedChapterDrawer.aiReflection}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#04160d] border border-emerald-500/30 text-xs font-bold">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">XP Rewards</span>
                  <div className="text-base font-black text-emerald-300">+{selectedChapterDrawer.xp} XP</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Loot Coins</span>
                  <div className="text-base font-black text-amber-300">+{selectedChapterDrawer.coins} 🪙</div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedChapterDrawer(null)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-sm cursor-pointer shadow-xl"
                >
                  CLOSE CHAPTER ENTRY
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
