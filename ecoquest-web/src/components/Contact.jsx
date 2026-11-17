import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  User, 
  Building, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  PhoneCall 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'Bring EcoQuest to My Sanctuary',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#05130d] text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm mb-4">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>GUILD DISPATCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-4">
            Bring EcoQuest to Your Sanctuary
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Have questions or want a custom demo for your school district or sanctuary? Send us a dispatch and our Guildmaster team will reach out within 24 hours.
          </p>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT: ECO ILLUSTRATION & INFO CARD */}
          <div className="lg:col-span-5 glass-card-dark p-8 sm:p-10 rounded-3xl border border-emerald-500/40 flex flex-col justify-between text-white relative overflow-hidden bg-gradient-to-br from-[#082b1d] via-[#062016] to-[#04160d] shadow-2xl">
            
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-6 shadow-inner">
                <Globe className="w-6 h-6 animate-spin-slow" />
              </div>

              <h3 className="text-2xl font-black font-heading text-white mb-4">
                Partner with EcoQuest Guild
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-8 font-medium">
                Join over 480+ sanctuaries worldwide transforming climate education into an interactive, habit-forming fantasy adventure.
              </p>

              {/* Direct Info list */}
              <div className="space-y-4 text-xs font-bold text-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>sanctuaries@ecoquest.org</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span>+1 (800) 458-ECOQ</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>FERPA & COPPA Compliant Data Protection</span>
                </div>
              </div>
            </div>

            {/* Bottom Quote Banner */}
            <div className="mt-10 pt-6 border-t border-emerald-500/20">
              <p className="text-xs italic text-emerald-300/90 leading-relaxed font-medium">
                "EcoQuest increased our adventurer participation in eco quests by 340% within the first month alone!"
              </p>
              <div className="mt-2 text-[11px] font-black text-amber-300">
                — Guildmaster Sarah Jenkins, Oak Ridge Sanctuary
              </div>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/40 shadow-2xl bg-[#062016]/90 flex flex-col justify-center text-slate-100">
            
            {submitted ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/30 font-black">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-white font-heading mb-2">
                  Dispatch Sent Successfully!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 font-medium">
                  Thank you, <strong className="text-amber-300">{formData.name}</strong>. Our Guildmaster team will respond to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-black hover:bg-emerald-900 transition-all cursor-pointer"
                >
                  Send Another Dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-emerald-300 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Emily Thorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-sm font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-emerald-300 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      Guild / School Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="emily@oakridge.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-sm font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-emerald-300 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    Sanctuary or School Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oak Ridge Sanctuary Academy"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-sm font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-emerald-300 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    How Can We Help Your Guild?
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your sanctuary size, goals, or schedule a 15-minute live RPG platform walkthrough..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-sm font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40"
                >
                  <span>Send Guild Dispatch</span>
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

