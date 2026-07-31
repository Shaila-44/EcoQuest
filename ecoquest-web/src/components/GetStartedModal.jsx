import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  School, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Leaf 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GetStartedModal({ isOpen, onClose }) {
  const [role, setRole] = useState('student'); // 'student' | 'teacher' | 'school'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    schoolName: '',
    gradeLevel: 'High School (9-12)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', schoolName: '', gradeLevel: 'High School (9-12)' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card max-w-lg w-full p-6 sm:p-8 rounded-[32px] border border-emerald-500/40 shadow-2xl relative bg-[#072218]/95 text-slate-100">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-emerald-950 hover:bg-emerald-900 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-xl font-black">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h3 className="text-2xl font-black text-white font-heading mb-2">
              Welcome to EcoQuest Realm! 🌱
            </h3>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed font-medium">
              We've created your demo profile invitation. Check your email (<strong className="text-amber-300">{formData.email || 'your email'}</strong>) for your unique sanctuary code and RPG Command Center login link.
            </p>

            <button onClick={handleReset} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-emerald-300/40">
              Explore EcoQuest Realm
            </button>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                <Leaf className="w-4 h-4 text-slate-950 fill-slate-950" />
              </div>
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                JOIN THE ECOQUEST GUILD NETWORK
              </span>
            </div>

            <h3 className="text-2xl font-black text-white font-heading mb-2">
              Start Your Eco Quest Journey
            </h3>
            
            <p className="text-xs text-emerald-300/80 mb-6 font-bold">
              Select your profile role to create a free account or request a sanctuary demo.
            </p>

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  role === 'student'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black border-emerald-300 shadow-md'
                    : 'bg-[#04160d] border-emerald-500/30 text-slate-300 hover:border-emerald-400'
                }`}
              >
                <GraduationCap className={`w-5 h-5 mx-auto mb-1 ${role === 'student' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span className="text-xs">Adventurer</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  role === 'teacher'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black border-emerald-300 shadow-md'
                    : 'bg-[#04160d] border-emerald-500/30 text-slate-300 hover:border-emerald-400'
                }`}
              >
                <Sparkles className={`w-5 h-5 mx-auto mb-1 ${role === 'teacher' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span className="text-xs">Educator</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('school')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  role === 'school'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black border-emerald-300 shadow-md'
                    : 'bg-[#04160d] border-emerald-500/30 text-slate-300 hover:border-emerald-400'
                }`}
              >
                <School className={`w-5 h-5 mx-auto mb-1 ${role === 'school' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span className="text-xs">Guild Admin</span>
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-emerald-300 mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-emerald-300 mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@school.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-emerald-300 mb-1 uppercase tracking-wider">Sanctuary / School Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oak Ridge High Sanctuary"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
                />
              </div>

              <button type="submit" className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40">
                <span>Create Free Demo Account</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

