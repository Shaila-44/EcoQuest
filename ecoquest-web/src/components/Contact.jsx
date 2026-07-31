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
    subject: 'Bring EcoQuest to My School',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="tag-badge mb-4 mx-auto border-emerald-300/60 bg-emerald-50">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
            Bring EcoQuest to Your School
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Have questions or want a custom demo for your school district? Send us a message and our education team will reach out within 24 hours.
          </p>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT: ECO ILLUSTRATION & INFO CARD */}
          <div className="lg:col-span-5 glass-card-dark p-8 sm:p-10 rounded-3xl border border-emerald-900/60 flex flex-col justify-between text-white relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 shadow-2xl">
            
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-6 shadow-inner">
                <Globe className="w-6 h-6 animate-spin-slow" />
              </div>

              <h3 className="text-2xl font-extrabold font-heading text-white mb-4">
                Partner with EcoQuest
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Join over 480+ schools worldwide transforming climate education into an interactive, habit-forming experience.
              </p>

              {/* Direct Info list */}
              <div className="space-y-4 text-xs font-medium text-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>schools@ecoquest.org</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span>+1 (800) 458-ECOQ</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>FERPA & COPPA Compliant Data Protection</span>
                </div>
              </div>
            </div>

            {/* Bottom Quote Banner */}
            <div className="mt-10 pt-6 border-t border-slate-800">
              <p className="text-xs italic text-emerald-200/90 leading-relaxed">
                "EcoQuest increased our student participation in environmental clubs by 340% within the first month alone!"
              </p>
              <div className="mt-2 text-[11px] font-bold text-white">
                — Principal Sarah Jenkins, Oak Ridge Academy
              </div>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl border border-white/90 shadow-xl flex flex-col justify-center">
            
            {submitted ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-heading mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-emerald-700">{formData.name}</strong>. Our school partnership team will respond to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary py-2.5 px-6 text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Emily Thorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-emerald-500 bg-white shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      Work / School Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="emily@oakridge.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-emerald-500 bg-white shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-emerald-600" />
                    School or Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oak Ridge High School"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-emerald-500 bg-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    How Can We Help?
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your school size, goals, or schedule a 15-minute live platform walkthrough..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-emerald-500 bg-white shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
