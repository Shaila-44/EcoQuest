import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, ArrowRight, Sparkles, Trophy } from 'lucide-react';

export default function Navbar({ onOpenGetStarted, onOpenDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
    { name: 'Features', href: '#features' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
            <Leaf className="w-5 h-5 text-emerald-100 fill-emerald-200/40" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1 font-heading">
              Eco<span className="text-emerald-600">Quest</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </span>
          </div>
        </a>

        {/* CENTERED NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/80 shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* TOP-RIGHT GET STARTED BUTTON */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenGetStarted}
            className="btn-primary text-sm shadow-emerald-500/25"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-emerald-100/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card mx-4 mt-2 p-5 rounded-2xl border border-emerald-200/60 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-emerald-600 py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGetStarted();
                }}
                className="w-full btn-primary py-2.5 text-sm"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
