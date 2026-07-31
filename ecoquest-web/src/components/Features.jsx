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
      title: 'Daily Eco Challenges',
      description: 'Engaging, bite-sized real-world missions like campus plastic audits, energy saving, tree planting, and zero-waste lunches designed for students of all ages.',
      tag: 'Interactive Missions',
      gradient: 'from-emerald-500 to-teal-600',
      bgGlow: 'bg-emerald-500/10'
    },
    {
      id: 'ai-verification',
      icon: ShieldCheck,
      title: 'AI Photo Verification',
      description: 'Proprietary computer vision automatically scans student photo submissions to verify genuine eco-actions in real time, preventing fraud and rewarding XP instantly.',
      tag: '99.4% Precision AI',
      gradient: 'from-teal-500 to-cyan-600',
      bgGlow: 'bg-teal-500/10'
    },
    {
      id: 'leaderboards',
      icon: Trophy,
      title: 'Live School Leaderboards',
      description: 'Foster friendly competition between classes, grade levels, and regional schools. Watch your school ascend the leaderboard as students complete actions.',
      tag: 'Gamified Rankings',
      gradient: 'from-amber-500 to-orange-600',
      bgGlow: 'bg-amber-500/10'
    },
    {
      id: 'badges',
      icon: Award,
      title: 'Achievement Badges & Streaks',
      description: 'Unlock 50+ collectible digital badges, maintain daily eco-streaks, and level up student profiles to build long-term sustainable habits.',
      tag: 'Duolingo-Style Rewards',
      gradient: 'from-purple-500 to-indigo-600',
      bgGlow: 'bg-purple-500/10'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Sustainability Analytics',
      description: 'Comprehensive dashboard for educators and administrators tracking carbon offsets, plastic saved, water conserved, and school ESG compliance metrics.',
      tag: 'Real-Time Impact',
      gradient: 'from-emerald-600 to-green-700',
      bgGlow: 'bg-emerald-600/10'
    },
    {
      id: 'gallery',
      icon: Users2,
      title: 'Community Gallery',
      description: 'A positive, safe social feed where students showcase their eco-projects, inspire peers across schools, and celebrate collective environmental victories.',
      tag: 'Peer Inspiration',
      gradient: 'from-blue-500 to-emerald-600',
      bgGlow: 'bg-blue-500/10'
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="tag-badge mb-4 mx-auto border-emerald-300/60 bg-emerald-50/90">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider">
              WHAT MAKES ECOQUEST UNIQUE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
            Gamification Meets Real-World Impact
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Everything your school needs to replace passive textbook learning with active, verified environmental guardianship.
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
                className="glass-card hover-card-lift p-8 rounded-3xl cursor-pointer group relative flex flex-col justify-between border border-white/90 shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Top Card Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-3 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                  <span className="flex items-center gap-1.5">
                    Interactive Preview
                    <Sparkles className="w-3 h-3 text-amber-500" />
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
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
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-emerald-950 text-white font-bold text-sm px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all group"
          >
            <span>Start Your EcoQuest Journey</span>
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
