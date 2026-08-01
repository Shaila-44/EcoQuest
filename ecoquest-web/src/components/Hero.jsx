import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Trophy, 
  Award, 
  Flame, 
  TreePine, 
  Zap, 
  Globe, 
  Users, 
  Star,
  Swords
} from 'lucide-react';

export default function Hero({ onOpenGetStarted, onOpenDemo }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#05130d] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Background ambient bioluminescent glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HEADLINE & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-300">
                Neo Nature RPG Adventure Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-heading mb-6">
              Play for Planet,{' '}
              <span className="block mt-1 bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                Adventure Meets Impact.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-medium mb-8 max-w-xl">
              EcoQuest transforms real-world environmental actions into a fantasy-inspired adventure. Complete daily quests, upload proof for AI verification, level up your rank, and claim loot trophies on global leaderboards.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenGetStarted}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40"
              >
                <span>Enter the Quest</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <a
                href="#features"
                className="px-7 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 font-black text-base border border-emerald-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
                <span>Explore RPG Quests</span>
              </a>
            </div>

            {/* Trust Metrics / Social Proof */}
            <div className="pt-6 border-t border-emerald-500/20 flex flex-wrap items-center gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-emerald-400/60 object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-emerald-400/60 object-cover"
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-emerald-400/60 object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                </div>
                <div className="text-xs font-bold text-slate-200">
                  <span className="text-amber-300 font-black">50,000+</span> Adventurers Active
                </div>
              </div>

              <div className="h-4 w-px bg-emerald-500/30 hidden sm:block"></div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>4.9/5 from 480+ Guild Sanctuaries</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: RPG HERO HUD CARD */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Earth Vector Glow Background */}
            <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full border-2 border-dashed border-emerald-500/30 animate-spin-slow pointer-events-none" />
            
            {/* Main Central RPG Card Composition */}
            <div className="relative w-full max-w-lg glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl bg-[#072218]/90">
              
              {/* Top Banner Image / RPG Quest Dispatch */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#093424] to-[#04160d] p-6 text-white mb-6 border border-emerald-500/30 shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 text-xs font-black text-amber-300">
                    <Globe className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
                    EcoQuest Realm Dispatch
                  </div>
                  <span className="text-xs text-emerald-300 font-mono">LIVE DISPATCH</span>
                </div>

                {/* Hero Graphic Card Mockup */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 flex items-center justify-center shadow-lg text-slate-950 font-black text-2xl flex-shrink-0">
                    <TreePine className="w-9 h-9 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white font-heading">Campus Forest Quest</h3>
                    <p className="text-xs text-emerald-300/80 font-bold mt-0.5">Greenwood Sanctuary • 45 Adventurers Active</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="bg-emerald-950 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-500/40">
                        +450 Kg CO2 Purified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar inside card */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs font-black text-white">
                  <span>Weekly Guild Target</span>
                  <span className="text-amber-300">8,450 / 10,000 XP (84.5%)</span>
                </div>
                <div className="w-full h-3 bg-[#04160d] rounded-full overflow-hidden p-0.5 border border-emerald-500/30">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 rounded-full w-[84.5%] shadow-sm transition-all duration-1000" />
                </div>
              </div>

              {/* Quick Action Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#051c14] p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-emerald-400/80 uppercase">AI Scanner</div>
                    <div className="text-xs font-black text-white">Instant Verification</div>
                  </div>
                </div>

                <div className="bg-[#051c14] p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-amber-400/80 uppercase">Rank #1</div>
                    <div className="text-xs font-black text-white">Hall of Champions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING UI CARD 1: +100 XP Pill */}
            <div className="absolute -top-6 -right-2 sm:right-0 glass-card px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/40 bg-[#07251a] animate-float-slow z-20 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
                <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
              </div>
              <div>
                <div className="text-xs font-black text-amber-300 flex items-center gap-1">
                  +100 XP Earned!
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-[10px] font-bold text-emerald-300/80">Quest Audit Complete</div>
              </div>
            </div>

            {/* FLOATING UI CARD 2: AI Verified Badge */}
            <div className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 glass-card px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/40 bg-[#07251a] animate-float-reverse z-20 text-white">
              <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-inner">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-950" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1">
                  AI Scanned <span className="text-[10px] bg-emerald-900 text-emerald-300 font-black px-1.5 py-0.5 rounded border border-emerald-500/30">99.8%</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-400/80">Proof Verified</div>
              </div>
            </div>

            {/* FLOATING UI CARD 3: Flame Streak Badge */}
            <div className="absolute -bottom-6 right-6 glass-card px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-400/40 bg-[#07251a] animate-float-slow z-20 text-white">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg font-black">
                <Flame className="w-6 h-6 fill-slate-950 text-slate-950" />
              </div>
              <div>
                <div className="text-xs font-black text-white">Rune Active!</div>
                <div className="text-xs font-black text-amber-300">7-Day Fire Streak 🔥</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

