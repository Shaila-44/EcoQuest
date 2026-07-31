import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowLeft, HelpCircle } from 'lucide-react';
import LoginSwitcher from './LoginSwitcher';
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';

export default function LoginCard({ onNavigateHome, onLoginSuccess }) {
  const [role, setRole] = useState('student'); // 'student' | 'teacher'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-md glass-card p-6 sm:p-8 rounded-[28px] border border-white/90 shadow-2xl backdrop-blur-2xl bg-white/85 relative"
    >
      {/* ECOQUEST LOGO */}
      <div className="flex justify-center mb-4">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
            <Leaf className="w-5 h-5 text-emerald-100 fill-emerald-200/40" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-heading">
            Eco<span className="text-emerald-600">Quest</span>
          </span>
        </button>
      </div>

      {/* HEADER TEXT */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-900 font-heading tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Continue your EcoQuest journey.
        </p>
      </div>

      {/* SEGMENTED CONTROL ROLE SWITCHER */}
      <LoginSwitcher activeRole={role} onChangeRole={setRole} />

      {/* ANIMATED FORM CONTAINER */}
      <div className="relative min-h-[340px]">
        <AnimatePresence mode="wait">
          {role === 'student' ? (
            <StudentLogin key="student" onLoginSuccess={onLoginSuccess} />
          ) : (
            <TeacherLogin key="teacher" />
          )}
        </AnimatePresence>
      </div>

      {/* EXTRA HELP & BACK LINKS */}
      <div className="mt-6 pt-5 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={() => alert('Please reach out to your school system administrator or email support@ecoquest.org')}
          className="text-slate-500 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Need Help?</span>
        </button>

        <button
          type="button"
          onClick={onNavigateHome}
          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>

    </motion.div>
  );
}
