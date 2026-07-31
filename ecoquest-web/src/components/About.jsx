import React, { useState } from 'react';
import { 
  Globe, 
  Heart, 
  Sparkles, 
  TreePine, 
  Droplets, 
  Wind, 
  CheckCircle2, 
  Calculator 
} from 'lucide-react';

export default function About() {
  const [studentCount, setStudentCount] = useState(500);

  // Impact calculation based on student count
  const plasticSavedKg = Math.round(studentCount * 14.5);
  const co2OffsetKg = Math.round(studentCount * 32.8);
  const treesEquivalent = Math.round(studentCount * 2.4);

  const stats = [
    { label: 'Challenges Completed', value: '250,000+', icon: CheckCircle2, sub: 'Verified eco actions' },
    { label: 'Participating Schools', value: '480+', icon: Globe, sub: 'Across 18 countries' },
    { label: 'Student Active Rate', value: '94.2%', icon: Sparkles, sub: 'Weekly engagement' },
    { label: 'CO2 Offset to Date', value: '1,450 Tons', icon: Wind, sub: 'Measured & certified' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN SPLIT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* LEFT: EARTH GRAPHIC / MISSION VISUAL */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Outer Orbit Ring */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-emerald-300/40 relative flex items-center justify-center p-8 bg-gradient-to-tr from-emerald-100/30 to-teal-50/50 shadow-2xl">
              
              {/* Rotating Earth Center Graphic */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center text-white relative overflow-hidden shadow-2xl shadow-emerald-700/30">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="text-center p-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Globe className="w-10 h-10 text-emerald-300 animate-spin-slow" />
                  </div>
                  <h4 className="font-extrabold text-xl text-white font-heading">One Planet</h4>
                  <p className="text-xs text-emerald-200 mt-1 font-medium">Empowering 1 Million Youth by 2028</p>
                </div>
              </div>

              {/* Floating Orbiting Badges */}
              <div className="absolute -top-4 left-6 glass-card px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-900 border border-emerald-200/80 shadow-lg flex items-center gap-2 animate-float-slow">
                <TreePine className="w-4 h-4 text-emerald-600" />
                <span>120k Trees Saved</span>
              </div>

              <div className="absolute -bottom-4 right-6 glass-card px-3.5 py-2 rounded-xl text-xs font-bold text-teal-900 border border-teal-200/80 shadow-lg flex items-center gap-2 animate-float-reverse">
                <Droplets className="w-4 h-4 text-teal-600" />
                <span>850k Liters Saved</span>
              </div>
            </div>

          </div>

          {/* RIGHT: MISSION STORY */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="tag-badge mb-4 border-emerald-300/60 bg-emerald-50/90">
              <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
              <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider">
                OUR MISSION & VISION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight mb-6">
              Transforming Climate Anxiety into Empowering Climate Action
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-6">
              Traditional environmental education often leaves students feeling overwhelmed by global climate statistics. EcoQuest transforms passive awareness into engaging, game-based real-world challenges.
            </p>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              By combining AI verification technology, friendly inter-school leaderboards, and immediate rewards, we turn eco-action into a habits-building routine that students love.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-2">
              <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-2xl border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Curriculum Aligned</h4>
                  <p className="text-xs text-slate-500">STEM & ESG standards integrated</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-2xl border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">100% Safe & Verified</h4>
                  <p className="text-xs text-slate-500">Child-safe AI moderation & privacy</p>
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
                className="glass-card p-6 rounded-3xl border border-white/90 shadow-md text-center hover-card-lift"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mb-1 text-emerald-700">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE IMPACT CALCULATOR CARD */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border-2 border-emerald-300/60 shadow-2xl bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/50">
          <div className="max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
              <Calculator className="w-4 h-4 text-emerald-600" />
              Interactive Impact Calculator
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-3">
              Calculate Your School’s Yearly Environmental Impact
            </h3>
            
            <p className="text-slate-600 text-sm mb-8">
              Drag the slider below to see how introducing EcoQuest to your school body reduces waste and offsets carbon emissions:
            </p>

            {/* Slider Control */}
            <div className="mb-10 max-w-xl mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-600">Number of Enrolled Students</span>
                <span className="text-xl font-extrabold text-emerald-700 bg-emerald-100 px-4 py-1 rounded-xl">
                  {studentCount} Students
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="50"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>50 Students</span>
                <span>1,250 Students</span>
                <span>2,500 Students</span>
              </div>
            </div>

            {/* Calculated Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white/80 p-5 rounded-2xl border border-emerald-200/80 shadow-sm">
                <div className="text-2xl font-black text-emerald-600 font-heading mb-1">
                  {plasticSavedKg.toLocaleString()} kg
                </div>
                <div className="text-xs font-bold text-slate-800">Plastic Waste Saved / Year</div>
                <div className="text-[10px] text-slate-500 mt-1">Approx. {(plasticSavedKg * 40).toLocaleString()} single-use bottles</div>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl border border-teal-200/80 shadow-sm">
                <div className="text-2xl font-black text-teal-600 font-heading mb-1">
                  {co2OffsetKg.toLocaleString()} kg
                </div>
                <div className="text-xs font-bold text-slate-800">Carbon Footprint Reduced</div>
                <div className="text-[10px] text-slate-500 mt-1">Equal to driving {(co2OffsetKg * 4).toLocaleString()} fewer miles</div>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl border border-emerald-200/80 shadow-sm">
                <div className="text-2xl font-black text-emerald-700 font-heading mb-1">
                  {treesEquivalent.toLocaleString()} Trees
                </div>
                <div className="text-xs font-bold text-slate-800">Equivalent Forest Grown</div>
                <div className="text-[10px] text-slate-500 mt-1">Annual CO2 absorption capacity</div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
