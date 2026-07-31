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
  Star 
} from 'lucide-react';

export default function Hero({ onOpenGetStarted, onOpenDemo }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-300/30 to-teal-400/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HEADLINE & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Tagline Pill */}
            <div className="tag-badge mb-6 shadow-sm border border-emerald-300/50 bg-emerald-50/80">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide">
                Gamified Environmental Education Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight font-heading mb-6">
              Learn. Complete. Compete.{' '}
              <span className="block mt-1 gradient-text-hero">
                Save the Planet.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium mb-8 max-w-xl">
              EcoQuest empowers students to tackle real-world eco-challenges, upload photo proof, earn XP, unlock achievements, and compete on school-wide leaderboards—turning climate action into an exhilarating adventure.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenGetStarted}
                className="btn-primary text-base px-8 py-4 shadow-xl shadow-emerald-600/30"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <a
                href="#features"
                className="btn-secondary text-base px-7 py-4"
              >
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Explore Features</span>
              </a>
            </div>

            {/* Trust Metrics / Social Proof */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  <span className="text-emerald-700 font-extrabold">50,000+</span> Students Active
                </div>
              </div>

              <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>4.9/5 from 480+ Schools</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D ILLUSTRATION & FLOATING UI CARDS */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Earth Vector Glow Background */}
            <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full border-2 border-dashed border-emerald-400/30 animate-spin-slow pointer-events-none" />
            
            {/* Main Central Card Composition */}
            <div className="relative w-full max-w-lg glass-card p-6 md:p-8 rounded-3xl border border-white/90 shadow-2xl shadow-emerald-900/10">
              
              {/* Top Banner Image / Eco Scene Header */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-emerald-800 to-teal-950 p-6 text-white mb-6 shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2 bg-emerald-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 text-xs font-bold text-emerald-200">
                    <Globe className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
                    EcoQuest Live Feed
                  </div>
                  <span className="text-xs text-emerald-300 font-mono">JUST NOW</span>
                </div>

                {/* Hero Graphic Card Mockup */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center shadow-lg text-emerald-950 font-extrabold text-2xl flex-shrink-0">
                    <TreePine className="w-9 h-9 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white font-heading">Campus Forest Restoration</h3>
                    <p className="text-xs text-emerald-200 mt-0.5">Greenwood Academy • 45 Students Participated</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                        +450 Kg CO2 Saved
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar inside card */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Weekly School Target</span>
                  <span className="text-emerald-600">8,450 / 10,000 XP (84.5%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[84.5%] shadow-sm transition-all duration-1000" />
                </div>
              </div>

              {/* Quick Action Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Verification</div>
                    <div className="text-xs font-extrabold text-emerald-900">AI Photo Scanner</div>
                  </div>
                </div>

                <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-700">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Rank #1</div>
                    <div className="text-xs font-extrabold text-amber-900">State Leaderboard</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING UI CARD 1: +100 XP Pill */}
            <div className="absolute -top-6 -right-2 sm:right-0 glass-card px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-200/80 animate-float-slow z-20">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="text-xs font-black text-emerald-800 flex items-center gap-1">
                  +100 XP Earned!
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-[10px] font-semibold text-slate-500">Zero Waste Audit Complete</div>
              </div>
            </div>

            {/* FLOATING UI CARD 2: AI Verified Badge */}
            <div className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 glass-card px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-300/80 animate-float-reverse z-20">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-700 shadow-inner">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                  AI Verified <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">99.8%</span>
                </div>
                <div className="text-[11px] font-medium text-slate-500">Photo Proof Verified</div>
              </div>
            </div>

            {/* FLOATING UI CARD 3: Achievement Badge */}
            <div className="absolute -bottom-6 right-6 glass-card px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-200/80 animate-float-slow z-20">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Flame className="w-6 h-6 fill-amber-100 text-amber-100" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">Badge Unlocked!</div>
                <div className="text-xs font-bold text-amber-700">7-Day Eco Streak 🔥</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
