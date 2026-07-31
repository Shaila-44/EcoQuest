import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School } from 'lucide-react';

export default function LoginSwitcher({ activeRole, onChangeRole }) {
  return (
    <div className="relative bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 grid grid-cols-2 gap-1 mb-6 backdrop-blur-md shadow-inner">
      
      {/* STUDENT TAB BUTTON */}
      <button
        type="button"
        onClick={() => onChangeRole('student')}
        className={`relative z-10 py-3 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
          activeRole === 'student' ? 'text-emerald-950 font-extrabold' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <GraduationCap className={`w-4 h-4 ${activeRole === 'student' ? 'text-emerald-600' : 'text-slate-500'}`} />
        <span>👨‍🎓 Student</span>

        {activeRole === 'student' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200/80 -z-10"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>

      {/* TEACHER TAB BUTTON */}
      <button
        type="button"
        onClick={() => onChangeRole('teacher')}
        className={`relative z-10 py-3 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
          activeRole === 'teacher' ? 'text-emerald-950 font-extrabold' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <School className={`w-4 h-4 ${activeRole === 'teacher' ? 'text-emerald-600' : 'text-slate-500'}`} />
        <span>👩‍🏫 Educator</span>

        {activeRole === 'teacher' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200/80 -z-10"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>

    </div>
  );
}
