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
      className="w-full max-w-md glass-card p-6 sm:p-8 rounded-[32px] border border-emerald-500/40 shadow-2xl backdrop-blur-2xl bg-[#072218]/95 relative text-slate-100"
    >
      {/* ECOQUEST LOGO EMBLEM */}
      <div className="flex justify-center mb-4">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300 font-black">
            <Leaf className="w-6 h-6 text-slate-950 fill-emerald-100/40" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white font-heading">
            Eco<span className="text-emerald-400">Quest</span>
          </span>
        </button>
      </div>

      {/* HEADER TEXT */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-white font-heading tracking-tight">
          Portal Gateway
        </h2>
        <p className="text-xs text-emerald-300/80 mt-1 font-bold">
          Enter your credentials to access your RPG Command Center.
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
            <TeacherLogin key="teacher" onLoginSuccess={onLoginSuccess} />
          )}
        </AnimatePresence>
      </div>

      {/* EXTRA HELP & BACK LINKS */}
      <div className="mt-6 pt-5 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={() => alert('Please reach out to your school system administrator or email support@ecoquest.org')}
          className="text-slate-300 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Need Help?</span>
        </button>

        <button
          type="button"
          onClick={onNavigateHome}
          className="text-emerald-400 hover:text-emerald-200 font-black flex items-center gap-1.5 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing</span>
        </button>
      </div>

    </motion.div>
  );
}

