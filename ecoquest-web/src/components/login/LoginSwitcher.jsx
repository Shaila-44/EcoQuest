import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School } from 'lucide-react';

export default function LoginSwitcher({ activeRole, onChangeRole }) {
  return (
    <div className="relative bg-[#04160d] p-1.5 rounded-2xl border border-emerald-500/30 grid grid-cols-2 gap-1 mb-6 shadow-inner">
      
      {/* STUDENT TAB BUTTON */}
      <button
        type="button"
        onClick={() => onChangeRole('student')}
        className={`relative z-10 py-3 px-4 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-2 cursor-pointer ${
          activeRole === 'student' ? 'text-slate-950 font-black' : 'text-slate-300 hover:text-emerald-300'
        }`}
      >
        <GraduationCap className={`w-4 h-4 ${activeRole === 'student' ? 'text-slate-950' : 'text-emerald-400'}`} />
        <span>Student</span>

        {activeRole === 'student' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl shadow-lg border border-emerald-300 -z-10"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>

      {/* TEACHER TAB BUTTON */}
      <button
        type="button"
        onClick={() => onChangeRole('teacher')}
        className={`relative z-10 py-3 px-4 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-2 cursor-pointer ${
          activeRole === 'teacher' ? 'text-slate-950 font-black' : 'text-slate-300 hover:text-emerald-300'
        }`}
      >
        <School className={`w-4 h-4 ${activeRole === 'teacher' ? 'text-slate-950' : 'text-emerald-400'}`} />
        <span>Educator</span>

        {activeRole === 'teacher' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl shadow-lg border border-emerald-300 -z-10"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>

    </div>
  );
}

