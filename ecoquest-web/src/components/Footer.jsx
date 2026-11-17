import React, { useState } from 'react';
import { 
  Leaf, 
  Send, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  Globe 
} from 'lucide-react';

export default function Footer({ onOpenGetStarted }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#030e09] text-slate-100 pt-20 pb-12 relative overflow-hidden border-t border-emerald-500/20 selection:bg-emerald-500 selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP NEWSLETTER BANNER */}
        <div className="glass-card-dark p-8 sm:p-10 rounded-3xl border border-emerald-500/40 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#072418] via-[#04160d] to-[#072418] shadow-2xl">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>ECOQUEST DISPATCH CHRONICLES</span>
            </div>
            <h3 className="text-2xl font-black text-white font-heading">
              Join the EcoQuest Guild Digest
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              Get the latest quest directives, eco sanctuary tips, and platform updates sent directly to your scroll.
            </p>
          </div>

          {subscribed ? (
            <div className="bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Subscribed successfully! Welcome to the EcoQuest Guild.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                required
                placeholder="Enter your guild email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-full bg-[#04160d] border border-emerald-500/30 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-emerald-400 w-full md:w-64 font-bold"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer border border-emerald-300/40"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>

        {/* MAIN NAVIGATION COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-emerald-500/20">
          
          {/* COL 1: LOGO & TAGLINE */}
          <div className="md:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-4 group inline-block">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 font-black">
                <Leaf className="w-5 h-5 fill-slate-950 text-slate-950" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white font-heading">
                Eco<span className="text-emerald-400">Quest</span>
              </span>
            </a>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-6 font-medium">
              Empowering the next generation of environmental guardians through real-world RPG play, AI-verified action, and inter-sanctuary competition.
            </p>

            {/* Social Media SVG Icons */}
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-[#072418] border border-emerald-500/30 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-emerald-400 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* GitHub */}
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-xl bg-[#072418] border border-emerald-500/30 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-emerald-400 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-[#072418] border border-emerald-500/30 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-emerald-400 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-[#072418] border border-emerald-500/30 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-emerald-400 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* COL 2: RPG PLATFORM */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-4 font-heading">
              RPG World
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
              <li><a href="#features" className="hover:text-emerald-300 transition-colors">Daily Quests</a></li>
              <li><a href="#features" className="hover:text-emerald-300 transition-colors">AI Quest Scanner</a></li>
              <li><a href="#leaderboard" className="hover:text-emerald-300 transition-colors">Hall of Champions</a></li>
              <li><a href="#features" className="hover:text-emerald-300 transition-colors">Unlock Collection</a></li>
              <li><a href="#about" className="hover:text-emerald-300 transition-colors">Sanctuary Analytics</a></li>
            </ul>
          </div>

          {/* COL 3: GUILD RESOURCES */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-4 font-heading">
              Sanctuaries & Guilds
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
              <li><button onClick={onOpenGetStarted} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">Guildmaster Portal</button></li>
              <li><button onClick={onOpenGetStarted} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">Request Realm Demo</button></li>
              <li><a href="#about" className="hover:text-emerald-300 transition-colors">STEM & ESG Compliance</a></li>
              <li><a href="#about" className="hover:text-emerald-300 transition-colors">Impact Calculator</a></li>
              <li><a href="#contact" className="hover:text-emerald-300 transition-colors">Support & Lore</a></li>
            </ul>
          </div>

          {/* COL 4: LEGAL & COMPLIANCE */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-4 font-heading">
              Privacy & Codex
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
              <li><a href="#" className="hover:text-emerald-300 transition-colors">FERPA & COPPA Safety</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Adventurer Codex</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Terms of Guild</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">AI Ethics Statement</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Security Whitepaper</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & TAGLINE */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-bold">
          <div>
            © {new Date().getFullYear()} EcoQuest • Neo Nature RPG Adventure
          </div>

          <div className="flex items-center gap-1.5 font-black text-emerald-300">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for a Greener Future.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
