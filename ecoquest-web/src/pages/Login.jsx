import React from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground';
import FloatingIllustration from '../components/login/FloatingIllustration';
import RewardCard from '../components/login/RewardCard';
import LoginCard from '../components/login/LoginCard';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Login({ onNavigateHome, onLoginSuccess }) {
  return (
    <div className="min-h-screen bg-[#05130d] text-slate-100 font-body relative overflow-x-hidden flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      
      {/* BACKGROUND BIOLUMINESCENT PARTICLES */}
      <ParticlesBackground />

      {/* AMBIENT BACKGROUND LIGHT GLOWS */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* MAIN SPLIT CONTENT */}
      <main className="flex-1 flex items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: BRANDING (55% ON DESKTOP) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* TAGLINE PILL */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>PORTAL TO ECOQUEST REALM</span>
            </div>

            {/* LARGE HEADING */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-heading">
              Enter the Neo Nature{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                RPG World
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-medium leading-relaxed">
              Every real-world environmental action you complete levels up your Adventurer Rank, unlocks rare loot trophies, and expands your bioluminescent Eco Sanctuary.
            </p>

            {/* ILLUSTRATION & FLOATING CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full pt-4">
              <div className="md:col-span-7 flex justify-center">
                <FloatingIllustration />
              </div>

              <div className="md:col-span-5 flex flex-col justify-center items-start">
                <RewardCard />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: LOGIN CARD (45% ON DESKTOP) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <LoginCard onNavigateHome={onNavigateHome} onLoginSuccess={onLoginSuccess} />
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 border-t border-emerald-500/20 bg-[#04160d]/80 backdrop-blur-md relative z-10 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold">
          <div>
            © {new Date().getFullYear()} EcoQuest • Neo Nature RPG Adventure
          </div>

          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors">
              Privacy Codex
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors">
              Terms of Guild
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

