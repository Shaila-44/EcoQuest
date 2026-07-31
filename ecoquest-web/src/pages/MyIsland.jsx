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
  Info
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

export default function MyIsland({ onNavigateHome }) {
  const [activeCategory, setActiveCategory] = useState('buildings'); // 'buildings' | 'wildlife' | 'decorations'

  const islandStats = {
    level: 5,
    name: 'Emerald Sanctuary Island',
    biodiversityScore: 840,
    buildingsCount: 12,
    wildlifeSpecies: 8,
    unlockedZones: 3
  };

  const buildings = [
    { id: 1, title: 'Solar Windmill', category: 'Energy', level: 'Lvl 3', desc: 'Powers 100% of island clean electricity', icon: '💨', status: 'Active' },
    { id: 2, title: 'Rainwater Collector', category: 'Water', level: 'Lvl 2', desc: 'Stores 1,000L fresh water for wildlife', icon: '💧', status: 'Active' },
    { id: 3, title: 'Bio-Compost Hub', category: 'Waste', level: 'Lvl 4', desc: 'Transforms organic waste into rich soil', icon: '🌱', status: 'Active' },
    { id: 4, title: 'Botanical Greenhouse', category: 'Nature', level: 'Lvl 1', desc: 'Nurtures 20 rare native tree saplings', icon: '🏡', status: 'Active' },
    { id: 5, title: 'Hydroelectric Dam', category: 'Energy', level: 'Locked', desc: 'Requires Level 15 Eco Master to unlock', icon: '🌊', status: 'Locked', req: 'Lvl 15' },
    { id: 6, title: 'Geothermal Plant', category: 'Energy', level: 'Locked', desc: 'Requires 5,000 XP to unlock', icon: '🌋', status: 'Locked', req: '5k XP' }
  ];

  const wildlife = [
    { id: 1, title: 'Monarch Butterfly Colony', desc: 'Flourishing around wild milkweed gardens', icon: '🦋', status: 'Attracted' },
    { id: 2, title: 'Golden Eagle Sanctuary', desc: 'Nesting on mountain windward ridge', icon: '🦅', status: 'Attracted' },
    { id: 3, title: 'Coral Reef Turtle Bay', desc: 'Protected marine conservation cove', icon: '🐢', status: 'Attracted' },
    { id: 4, title: 'Bamboo Panda Grove', desc: 'Requires 10 Trees Planted in real life', icon: '🐼', status: 'Locked', req: '10 Trees' }
  ];

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-slate-800 font-body relative overflow-x-hidden p-6 sm:p-10 space-y-8">
      
      {/* BACKGROUND AMBIENT PARTICLES */}
      <ParticlesBackground />

      {/* PAGE HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-7xl mx-auto relative z-10">
        <div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-2 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Home Command Center</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight flex items-center gap-3">
            <span>My Eco Island</span>
            <span className="text-2xl">🏝️</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            "What have I built through my environmental journey?" • Long-term progression workspace
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-black">
            🏝️
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-slate-400 uppercase">Island Level</div>
            <div className="text-sm font-black text-slate-900">{islandStats.name} (Lvl {islandStats.level})</div>
          </div>
        </div>
      </header>

      {/* ISOLATION NOTICE BANNER */}
      <div className="max-w-7xl mx-auto p-4 rounded-2xl bg-teal-900 text-white border border-teal-700 flex items-start gap-3 shadow-md relative z-10">
        <Info className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-extrabold text-teal-200 uppercase tracking-wider block">
            DEDICATED PROGRESSION PAGE
          </span>
          <p className="text-slate-200 font-medium leading-relaxed">
            This My Island page is completely separate from your daily Home Command Center. Here you can explore your long-term environmental achievements visualized as an evolving virtual island with custom buildings, wildlife, and unlockables!
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* ISLAND VISUAL CANVAS DISPLAY */}
        <div className="rounded-[36px] bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 border-2 border-emerald-400/30 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center min-h-[360px] flex flex-col items-center justify-center">
          
          {/* AMBIENT GLOWS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* VIRTUAL ISLAND ISOLATED GRAPHIC */}
          <div className="relative z-10 space-y-4 max-w-xl">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center text-6xl shadow-2xl mx-auto animate-float-slow">
              🏝️
            </div>
            
            <h2 className="text-3xl font-black font-heading text-white">
              {islandStats.name}
            </h2>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              Your real-world eco actions have expanded this sanctuary to 12 buildings and 8 species! Keep completing daily missions on the Home page to unlock new zones.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-extrabold">
              <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                🌿 Biodiversity Score: {islandStats.biodiversityScore}
              </span>
              <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                🏠 Buildings: {islandStats.buildingsCount}
              </span>
              <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                🐾 Wildlife: {islandStats.wildlifeSpecies} Species
              </span>
            </div>
          </div>

        </div>

        {/* BUILDINGS & UNLOCKABLES SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 font-heading">
              Island Buildings & Structures
            </h3>
            
            <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveCategory('buildings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  activeCategory === 'buildings' ? 'bg-emerald-600 text-white' : 'text-slate-500'
                }`}
              >
                Buildings (6)
              </button>
              <button
                onClick={() => setActiveCategory('wildlife')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  activeCategory === 'wildlife' ? 'bg-emerald-600 text-white' : 'text-slate-500'
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
                    b.status === 'Active' ? 'border-emerald-200' : 'border-slate-200 opacity-70'
                  } space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-slate-900 text-2xl flex items-center justify-center">
                      {b.icon}
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                      b.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {b.status === 'Active' ? b.level : b.req}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 font-heading">{b.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              wildlife.map((w) => (
                <div
                  key={w.id}
                  className={`glass-card p-5 rounded-3xl border ${
                    w.status === 'Attracted' ? 'border-teal-200' : 'border-slate-200 opacity-70'
                  } space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-slate-900 text-2xl flex items-center justify-center">
                      {w.icon}
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                      w.status === 'Attracted' ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {w.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 font-heading">{w.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{w.desc}</p>
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
