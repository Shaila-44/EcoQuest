import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, ArrowRight, Sparkles, Trophy } from 'lucide-react';

export default function Navbar({ onOpenGetStarted, onOpenDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash === '#/home' || window.location.hash === '#home') return;
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Quests', href: '#features' },
    { name: 'Hall of Champions', href: '#leaderboard' },
    { name: 'Lore', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-xl'
          : 'bg-[#05130d]/80 backdrop-blur-md py-5 border-b border-emerald-500/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300 font-black">
            <Leaf className="w-5 h-5 text-slate-950 fill-emerald-100/40" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-white flex items-center gap-1 font-heading">
              Eco<span className="text-emerald-400">Quest</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
          </div>
        </a>

        {/* CENTERED NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 bg-[#092218]/90 backdrop-blur-md px-6 py-2 rounded-full border border-emerald-500/30 shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-black uppercase tracking-wider text-slate-300 hover:text-emerald-300 transition-colors duration-200 flex items-center gap-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* TOP-RIGHT ENTER REALM BUTTON */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenGetStarted}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-emerald-300/40"
          >
            <span>Enter Realm</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-emerald-300 hover:bg-emerald-900/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card mx-4 mt-2 p-5 rounded-2xl border border-emerald-500/40 shadow-2xl bg-[#08241a] text-slate-100">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-black text-white hover:text-emerald-300 py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-emerald-500/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGetStarted();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2"
              >
                <span>Enter Realm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

