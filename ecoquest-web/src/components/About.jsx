import React, { useState } from 'react';
import { 
  Globe, 
  Heart, 
  Sparkles, 
  TreePine, 
  Droplets, 
  Wind, 
  CheckCircle2, 
  Calculator,
  ShieldCheck
} from 'lucide-react';

export default function About() {
  const [studentCount, setStudentCount] = useState(500);

  // Impact calculation based on student count
  const plasticSavedKg = Math.round(studentCount * 14.5);
  const co2OffsetKg = Math.round(studentCount * 32.8);
  const treesEquivalent = Math.round(studentCount * 2.4);

  const stats = [
    { label: 'Quests Completed', value: '250,000+', icon: CheckCircle2, sub: 'Verified eco directives' },
    { label: 'Guild Sanctuaries', value: '480+', icon: Globe, sub: 'Across 18 realms' },
    { label: 'Adventurer Active Rate', value: '94.2%', icon: Sparkles, sub: 'Weekly engagement' },
    { label: 'CO2 Purified to Date', value: '1,450 Tons', icon: Wind, sub: 'Measured & certified' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#05130d] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN SPLIT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* LEFT: EARTH GRAPHIC / MISSION VISUAL */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Outer Orbit Ring */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-emerald-500/30 relative flex items-center justify-center p-8 bg-gradient-to-tr from-emerald-950/40 to-teal-950/40 shadow-2xl">
              
              {/* Rotating Earth Center Graphic */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#093424] via-[#062419] to-[#04140d] border border-emerald-500/40 flex items-center justify-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="text-center p-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Globe className="w-10 h-10 text-emerald-300 animate-spin-slow" />
                  </div>
                  <h4 className="font-black text-xl text-white font-heading">One Sanctuary Realm</h4>
                  <p className="text-xs text-emerald-300/80 mt-1 font-bold">Empowering 1 Million Adventurers</p>
                </div>
              </div>

              {/* Floating Orbiting Badges */}
              <div className="absolute -top-4 left-6 glass-card px-3.5 py-2 rounded-xl text-xs font-black text-emerald-300 border border-emerald-500/40 bg-[#07251a] shadow-xl flex items-center gap-2 animate-float-slow">
                <TreePine className="w-4 h-4 text-emerald-400" />
                <span>120k Flora Saplings</span>
              </div>

              <div className="absolute -bottom-4 right-6 glass-card px-3.5 py-2 rounded-xl text-xs font-black text-amber-300 border border-amber-400/40 bg-[#07251a] shadow-xl flex items-center gap-2 animate-float-reverse">
                <Droplets className="w-4 h-4 text-teal-400" />
                <span>850k Liters Purified</span>
              </div>
            </div>

          </div>

          {/* RIGHT: MISSION LORE */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm mb-4">
              <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30" />
              <span>THE ECOQUEST LORE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-6">
              Transforming Climate Anxiety into Empowering RPG Quests
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium mb-6">
              Traditional environmental education often leaves students feeling overwhelmed by passive statistics. EcoQuest transforms awareness into engaging, fantasy-inspired real-world quests.
            </p>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              By combining AI quest verification, inter-sanctuary leaderboards, and immediate loot rewards, we turn eco-action into an exhilarating RPG progression loop.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-2">
              <div className="flex items-start gap-3 bg-[#062016] p-3.5 rounded-2xl border border-emerald-500/30 shadow-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-sm text-white font-heading">Curriculum Aligned</h4>
                  <p className="text-xs text-emerald-300/80 font-medium">STEM & ESG standards integrated</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#062016] p-3.5 rounded-2xl border border-emerald-500/30 shadow-md">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-sm text-white font-heading">100% Verified & Safe</h4>
                  <p className="text-xs text-emerald-300/80 font-medium">Child-safe AI scanner & privacy</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ANIMATED STATISTICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-[#062016]/90 shadow-2xl text-center hover-card-lift text-slate-100"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 font-heading mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-black text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] font-bold text-emerald-300/70">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE IMPACT CALCULATOR CARD */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border-2 border-emerald-500/40 shadow-2xl bg-gradient-to-br from-[#082b1d] via-[#062016] to-[#04160d] text-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black mb-4 border border-emerald-500/40">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Sanctuary Impact Calculator
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mb-3">
              Calculate Your Sanctuary’s Yearly Environmental Impact
            </h3>
            
            <p className="text-slate-300 text-sm mb-8 font-medium">
              Drag the slider below to see how introducing EcoQuest to your school body reduces waste and offsets carbon emissions:
            </p>

            {/* Slider Control */}
            <div className="mb-10 max-w-xl mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">Enrolled Adventurers</span>
                <span className="text-xl font-black text-amber-300 bg-amber-500/20 px-4 py-1 rounded-xl border border-amber-400/40">
                  {studentCount} Adventurers
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="50"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full h-3 bg-[#04160d] rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-emerald-500/30"
              />
              <div className="flex justify-between text-[11px] text-emerald-400/70 font-bold mt-1">
                <span>50 Adventurers</span>
                <span>1,250 Adventurers</span>
                <span>2,500 Adventurers</span>
              </div>
            </div>

            {/* Calculated Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-[#04160d] p-5 rounded-2xl border border-emerald-500/30 shadow-md">
                <div className="text-2xl font-black text-emerald-300 font-heading mb-1">
                  {plasticSavedKg.toLocaleString()} kg
                </div>
                <div className="text-xs font-black text-white">Plastic Waste Saved / Year</div>
                <div className="text-[10px] text-emerald-400/70 mt-1 font-bold">Approx. {(plasticSavedKg * 40).toLocaleString()} single-use containers</div>
              </div>

              <div className="bg-[#04160d] p-5 rounded-2xl border border-emerald-500/30 shadow-md">
                <div className="text-2xl font-black text-teal-300 font-heading mb-1">
                  {co2OffsetKg.toLocaleString()} kg
                </div>
                <div className="text-xs font-black text-white">Carbon Footprint Purified</div>
                <div className="text-[10px] text-emerald-400/70 mt-1 font-bold">Equal to driving {(co2OffsetKg * 4).toLocaleString()} fewer miles</div>
              </div>

              <div className="bg-[#04160d] p-5 rounded-2xl border border-emerald-500/30 shadow-md">
                <div className="text-2xl font-black text-amber-300 font-heading mb-1">
                  {treesEquivalent.toLocaleString()} Saplings
                </div>
                <div className="text-xs font-black text-white">Equivalent Forest Sanctuary</div>
                <div className="text-[10px] text-emerald-400/70 mt-1 font-bold">Annual CO2 absorption capacity</div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

