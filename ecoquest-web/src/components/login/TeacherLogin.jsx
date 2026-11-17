import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Building2,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export default function TeacherLogin({ onLoginSuccess }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const [email, setEmail] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const celebrate = () => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(email, password);
        if (result.status === 'APPROVAL_REQUIRED') {
          setError('Login from a new device requires approval from your other active session.');
          setLoading(false);
          return;
        }
      } else {
        await register({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          role: 'teacher',
          school_code: schoolId || undefined,
        });
      }

      setLoading(false);
      setSuccess(true);
      celebrate();

      setTimeout(() => {
        window.location.hash = '/educator';
        if (onLoginSuccess) onLoginSuccess('Teacher');
      }, 400);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && (
        <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {mode === 'register' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 bg-[#04160d] transition-all shadow-inner"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 bg-[#04160d] transition-all shadow-inner"
            />
          </div>
        </div>
      )}

      {/* EMAIL INPUT */}
      <div>
        <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Mail className="w-4 h-4 text-emerald-400" />
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            required
            placeholder="teacher@ecoquest.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-4 pr-4 py-3 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 bg-[#04160d] transition-all shadow-inner"
          />
        </div>
      </div>

      {/* SCHOOL ID INPUT (only meaningful on register) */}
      {mode === 'register' && (
        <div>
          <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-400" />
            School Code (optional)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. ECO001"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="w-full pl-4 pr-4 py-3 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 bg-[#04160d] transition-all shadow-inner"
            />
          </div>
        </div>
      )}

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
            minLength={mode === 'register' ? 8 : undefined}
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

      {/* MODE TOGGLE */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-black text-amber-300/80">
          Demo accounts only. Please use the provided credentials.
        </span>
      </div>

      {/* PRIMARY BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group mt-2 cursor-pointer border border-emerald-300/40 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-slate-950 stroke-[3]" />
            <span>{mode === 'login' ? 'Connecting Teacher Portal...' : 'Creating Account...'}</span>
          </>
        ) : success ? (
          <span>Portal Access Granted! Redirecting... 🌿</span>
        ) : (
          <>
            <span>{mode === 'login' ? 'Login as Educator' : 'Create Educator Account'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </>
        )}
      </button>

    </motion.form>
  );
}
