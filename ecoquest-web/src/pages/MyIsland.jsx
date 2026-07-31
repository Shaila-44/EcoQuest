import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palmtree, 
  Sparkles, 
  Building2, 
  Bird, 
  Flower2, 
  Compass, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  ArrowLeft,
  Info,
  ShieldCheck
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

export default function MyIsland({ onNavigateHome }) {
  const [activeCategory, setActiveCategory] = useState('buildings'); // 'buildings' | 'wildlife' | 'decorations'

  const islandStats = {
    level: 5,
    name: 'Emerald Sanctuary Realm',
    biodiversityScore: 840,
    buildingsCount: 12,
    wildlifeSpecies: 8,
    unlockedZones: 3
  };

  const buildings = [
    { id: 1, title: 'Solar Windmill Tower', category: 'Energy', level: 'Lvl 3', desc: 'Powers 100% of sanctuary clean energy', icon: '💨', status: 'Active' },
    { id: 2, title: 'Rainwater Crystal Basin', category: 'Water', level: 'Lvl 2', desc: 'Stores 1,000L fresh water for fauna', icon: '💧', status: 'Active' },
    { id: 3, title: 'Bio-Compost Forge', category: 'Waste', level: 'Lvl 4', desc: 'Transforms organic waste into rich soil', icon: '🌱', status: 'Active' },
    { id: 4, title: 'Botanical Greenhouse', category: 'Nature', level: 'Lvl 1', desc: 'Nurtures 20 rare native tree saplings', icon: '🏡', status: 'Active' },
    { id: 5, title: 'Hydroelectric Dam', category: 'Energy', level: 'Locked', desc: 'Requires Level 15 Guardian to unlock', icon: '🌊', status: 'Locked', req: 'Lvl 15' },
    { id: 6, title: 'Geothermal Generator', category: 'Energy', level: 'Locked', desc: 'Requires 5,000 XP to unlock', icon: '🌋', status: 'Locked', req: '5k XP' }
  ];

  const wildlife = [
    { id: 1, title: 'Monarch Butterfly Colony', desc: 'Flourishing around wild milkweed gardens', icon: '🦋', status: 'Attracted' },
    { id: 2, title: 'Golden Eagle Sanctuary', desc: 'Nesting on mountain windward ridge', icon: '🦅', status: 'Attracted' },
    { id: 3, title: 'Coral Reef Turtle Bay', desc: 'Protected marine conservation cove', icon: '🐢', status: 'Attracted' },
    { id: 4, title: 'Bamboo Panda Grove', desc: 'Requires 10 Trees Planted in real life', icon: '🐼', status: 'Locked', req: '10 Trees' }
  ];

  return (
    <div className="min-h-screen bg-[#05130d] text-slate-100 font-body relative overflow-x-hidden p-6 sm:p-10 space-y-8 selection:bg-emerald-500 selection:text-white">
      
      {/* BACKGROUND BIOLUMINESCENT PARTICLES */}
      <ParticlesBackground />

      {/* AMBIENT LIGHTING BLOBS */}
      <div className="fixed top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* PAGE HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-7xl mx-auto relative z-10">
        <div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-400 hover:text-emerald-200 mb-2 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Command Center</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight flex items-center gap-3">
            <span>Island Realm & Sanctuary</span>
            <span className="text-2xl">🏝️</span>
          </h1>
          <p className="text-sm text-slate-300 font-medium mt-1">
            Visualizing your long-term real-world environmental achievements as a living virtual sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#08241a] p-3 rounded-2xl border border-emerald-500/40 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black">
            🏝️
          </div>
          <div>
            <div className="text-[10px] font-black text-emerald-400 uppercase">Sanctuary Level</div>
            <div className="text-sm font-black text-white">{islandStats.name} (Lvl {islandStats.level})</div>
          </div>
        </div>
      </header>

      {/* ISOLATION NOTICE BANNER */}
      <div className="max-w-7xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-[#082e20] to-[#04160d] text-white border border-emerald-500/40 flex items-start gap-3 shadow-xl relative z-10">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-black text-amber-300 uppercase tracking-wider block font-heading">
            DEDICATED SANCTUARY WORKSPACE
          </span>
          <p className="text-slate-200 font-medium leading-relaxed">
            Your Island Realm expands automatically as you complete real-world environmental quests! Each verified quest unlocks new structures, flora, and wildlife species in your sanctuary.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* ISLAND VISUAL CANVAS DISPLAY */}
        <div className="rounded-[36px] bg-gradient-to-br from-[#093223] via-[#062419] to-[#04140d] border-2 border-emerald-500/40 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center min-h-[360px] flex flex-col items-center justify-center">
          
          {/* AMBIENT GLOWS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* VIRTUAL ISLAND ISOLATED GRAPHIC */}
          <div className="relative z-10 space-y-4 max-w-xl">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 text-slate-950 flex items-center justify-center text-6xl shadow-2xl mx-auto animate-float-slow ring-4 ring-emerald-400/40">
              🏝️
            </div>
            
            <h2 className="text-3xl font-black font-heading text-white">
              {islandStats.name}
            </h2>
            
            <p className="text-xs sm:text-sm text-emerald-200/90 font-medium leading-relaxed">
              Your real-world eco actions have expanded this sanctuary to 12 structures and 8 wildlife species! Keep completing daily quests to unlock new zones.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-black">
              <span className="bg-[#051c14]/90 px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-emerald-300 shadow-md">
                🌿 Biodiversity Score: {islandStats.biodiversityScore}
              </span>
              <span className="bg-[#051c14]/90 px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-emerald-300 shadow-md">
                🏠 Structures: {islandStats.buildingsCount}
              </span>
              <span className="bg-[#051c14]/90 px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-amber-300 shadow-md">
                🐾 Wildlife: {islandStats.wildlifeSpecies} Species
              </span>
            </div>
          </div>

        </div>

        {/* BUILDINGS & UNLOCKABLES SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white font-heading">
              Sanctuary Structures & Flora
            </h3>
            
            <div className="flex items-center bg-emerald-950 p-1 rounded-2xl border border-emerald-500/30 shadow-sm">
              <button
                onClick={() => setActiveCategory('buildings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeCategory === 'buildings' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md' : 'text-slate-300'
                }`}
              >
                Structures (6)
              </button>
              <button
                onClick={() => setActiveCategory('wildlife')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeCategory === 'wildlife' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md' : 'text-slate-300'
                }`}
              >
                Wildlife (4)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory === 'buildings' ? (
              buildings.map((b) => (
                <div
                  key={b.id}
                  className={`glass-card p-5 rounded-3xl border ${
                    b.status === 'Active' ? 'border-emerald-500/40 bg-[#062016]/90' : 'border-slate-800 bg-slate-900/40 opacity-60'
                  } space-y-3 shadow-xl hover-card-lift text-slate-100`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-white text-2xl flex items-center justify-center border border-emerald-500/30">
                      {b.icon}
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                      b.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-400 border border-slate-700'
                    }`}>
                      {b.status === 'Active' ? b.level : b.req}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-white font-heading">{b.title}</h4>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              wildlife.map((w) => (
                <div
                  key={w.id}
                  className={`glass-card p-5 rounded-3xl border ${
                    w.status === 'Attracted' ? 'border-teal-500/40 bg-[#062016]/90' : 'border-slate-800 bg-slate-900/40 opacity-60'
                  } space-y-3 shadow-xl hover-card-lift text-slate-100`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-amber-500/20 text-white text-2xl flex items-center justify-center border border-teal-500/30">
                      {w.icon}
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                      w.status === 'Attracted' ? 'bg-teal-950 text-teal-300 border border-teal-500/40' : 'bg-slate-900 text-slate-400 border border-slate-700'
                    }`}>
                      {w.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-white font-heading">{w.title}</h4>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">{w.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>

        </section>

      </main>

    </div>
  );
}

