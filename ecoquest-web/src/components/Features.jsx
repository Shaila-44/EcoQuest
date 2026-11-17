import React from 'react';
import { 
  Target, 
  ShieldCheck, 
  Trophy, 
  Award, 
  BarChart3, 
  Users2, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';

export default function Features({ onOpenDemo }) {
  const features = [
    {
      id: 'challenges',
      icon: Target,
      title: 'Daily RPG Quests',
      description: 'Engaging, real-world environmental directives like campus waste audits, energy saving, flora planting, and zero-waste drives designed for adventurers of all tiers.',
      tag: 'Interactive Quests',
      gradient: 'from-emerald-400 via-teal-300 to-amber-300',
      bgGlow: 'bg-emerald-500/10'
    },
    {
      id: 'ai-verification',
      icon: ShieldCheck,
      title: 'AI Quest Verification Scanner',
      description: 'Proprietary computer vision automatically scans student photo submissions to verify genuine eco-actions in real time, preventing fraud and awarding XP & Loot Coins instantly.',
      tag: '99.4% Precision AI',
      gradient: 'from-teal-400 to-emerald-500',
      bgGlow: 'bg-teal-500/10'
    },
    {
      id: 'leaderboards',
      icon: Trophy,
      title: 'Hall of Champions',
      description: 'Foster friendly competition between classes, guild tiers, and regional sanctuaries. Watch your class ascend the leaderboard podium as adventurers complete directives.',
      tag: 'Gamified Rankings',
      gradient: 'from-amber-400 via-orange-400 to-amber-500',
      bgGlow: 'bg-amber-500/10'
    },
    {
      id: 'badges',
      icon: Award,
      title: 'Unlock Collection & Runes',
      description: 'Unlock 50+ collectible digital trophies, maintain 7-day flame streaks, and level up your Explorer Card to build long-term sustainable habits.',
      tag: 'Fantasy Rewards',
      gradient: 'from-emerald-300 to-teal-400',
      bgGlow: 'bg-purple-500/10'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Sanctuary Analytics',
      description: 'Comprehensive dashboard for educators and administrators tracking carbon offsets, plastic saved, water purified, and sanctuary ESG metrics.',
      tag: 'Real-Time Impact',
      gradient: 'from-teal-500 to-emerald-400',
      bgGlow: 'bg-emerald-600/10'
    },
    {
      id: 'gallery',
      icon: Users2,
      title: 'Eco Chronicles Guild Feed',
      description: 'A positive social dispatch feed where adventurers showcase their completed quests, gift Mana Seeds, inspire peers across sanctuaries, and celebrate victories.',
      tag: 'Guild Collaboration',
      gradient: 'from-emerald-400 via-teal-300 to-amber-300',
      bgGlow: 'bg-blue-500/10'
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#05130d] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>NEO NATURE RPG DISPATCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-4">
            Gamification Meets Real-World Ecosystems
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Everything your school needs to replace passive textbook learning with active, verified fantasy-inspired environmental guardianship.
          </p>
        </div>

        {/* 6 GLASSMORPHISM CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={onOpenDemo}
                className="glass-card hover-card-lift p-8 rounded-3xl cursor-pointer group relative flex flex-col justify-between border border-emerald-500/30 shadow-2xl bg-[#062016]/90 hover:border-emerald-400/60 transition-all text-slate-100"
              >
                {/* Top Card Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feature.gradient} text-slate-950 font-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 stroke-[2.5]" />
                    </div>

                    <span className="text-[11px] font-black text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="text-xl font-black text-white font-heading mb-3 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="mt-8 pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-black text-emerald-400 group-hover:text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    Interactive Preview
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-emerald-500 group-hover:to-teal-400 group-hover:text-slate-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-16 text-center">
          <a
            href="#leaderboard"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all group border border-emerald-300/40"
          >
            <span>Start Your EcoQuest Journey</span>
            <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}

