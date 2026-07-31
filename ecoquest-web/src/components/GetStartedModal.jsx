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
      <div className="modal-content glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-white/90 shadow-2xl relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-heading mb-2">
              Welcome to EcoQuest! 🌱
            </h3>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We've created your demo profile invitation. Check your email (<strong className="text-emerald-700">{formData.email || 'your email'}</strong>) for your unique school code and mobile app login link.
            </p>

            <button onClick={handleReset} className="btn-primary w-full py-3">
              Explore EcoQuest Landing Page
            </button>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                JOIN THE ECOQUEST NETWORK
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-2">
              Start Your Eco Journey
            </h3>
            
            <p className="text-xs text-slate-500 mb-6">
              Select your profile role to create a free account or request a school demo.
            </p>

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  role === 'student'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <GraduationCap className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs">Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  role === 'teacher'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Sparkles className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs">Educator</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('school')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  role === 'school'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <School className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs">School Admin</span>
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@school.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oak Ridge High School"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3.5 mt-2 text-sm">
                <span>Create Free Demo Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
