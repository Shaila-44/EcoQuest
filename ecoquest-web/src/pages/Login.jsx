import React from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground';
import FloatingIllustration from '../components/login/FloatingIllustration';
import RewardCard from '../components/login/RewardCard';
import LoginCard from '../components/login/LoginCard';
import { Sparkles } from 'lucide-react';

export default function Login({ onNavigateHome, onLoginSuccess }) {
  return (
    <div className="min-h-screen bg-[#F8FFFA] text-slate-800 font-body relative overflow-x-hidden flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      
      {/* Background Ambient Particles */}
      <ParticlesBackground />

      {/* Ambient background light glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-300/30 to-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* MAIN SPLIT CONTENT */}
      <main className="flex-1 flex items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: BRANDING (55% ON DESKTOP) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Tagline Pill */}
            <div className="tag-badge border-emerald-300/60 bg-emerald-50/90 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider">
                JOIN THE ECOQUEST ADVENTURE
              </span>
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight font-heading">
              Welcome to{' '}
              <span className="gradient-text-hero">
                EcoQuest
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
              Every challenge you complete helps build a greener future. Complete eco missions. Earn XP. Unlock achievements. Compete with friends. Protect our planet.
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
      <footer className="py-6 border-t border-emerald-100 bg-white/50 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} EcoQuest Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">
              Terms of Service
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
