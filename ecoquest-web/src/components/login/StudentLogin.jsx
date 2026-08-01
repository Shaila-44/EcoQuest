import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Building2, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudentLogin({ onLoginSuccess }) {
  const [studentId, setStudentId] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        window.location.hash = '/home';
        if (onLoginSuccess) {
          onLoginSuccess('student');
        }
      }, 400);
    }, 800);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* STUDENT ID INPUT */}
      <div>
        <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          Student ID
        </label>
        <div className="relative">
          <input
            type="text"
            required
            placeholder="e.g. STU-84920"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full pl-4 pr-4 py-3 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 bg-[#04160d] transition-all shadow-inner"
          />
        </div>
      </div>

      {/* SCHOOL ID INPUT */}
      <div>
        <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-emerald-400" />
          School ID / Code
        </label>
        <div className="relative">
          <input
            type="text"
            required
            placeholder="e.g. DPS-RK-PURAM-2026"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="w-full pl-4 pr-4 py-3 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 bg-[#04160d] transition-all shadow-inner"
          />
        </div>
      </div>

      {/* PASSWORD INPUT */}
      <div>
        <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-emerald-400" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-4 pr-11 py-3 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 bg-[#04160d] transition-all shadow-inner"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/70 hover:text-emerald-300 transition-colors p-1 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* REMEMBER ME & FORGOT PASSWORD */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-400 focus:ring-emerald-400 border-emerald-500/40 accent-emerald-500 cursor-pointer bg-[#04160d]"
          />
          <span className="text-xs font-bold text-slate-200">Remember Me</span>
        </label>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-xs font-black text-amber-300 hover:text-amber-200 transition-colors hover:underline"
        >
          Forgot Password?
        </a>
      </div>

      {/* PRIMARY BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group mt-2 cursor-pointer border border-emerald-300/40"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-slate-950 stroke-[3]" />
            <span>Authenticating Adventurer...</span>
          </>
        ) : success ? (
          <span>Welcome Back, Adventurer! Redirecting... 🎉</span>
        ) : (
          <>
            <span>Login as Student</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </>
        )}
      </button>

    </motion.form>
  );
}

