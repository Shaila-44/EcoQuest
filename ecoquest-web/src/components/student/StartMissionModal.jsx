import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Target, 
  Clock, 
  Zap, 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  Upload,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StartMissionModal({ isOpen, onClose, onOpenUploadProof }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg glass-card p-6 sm:p-8 rounded-[32px] border border-white/90 shadow-2xl backdrop-blur-2xl bg-white/95 relative max-h-[90vh] overflow-y-auto"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* MODAL HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 text-2xl">
            ♻️
          </div>
          <div>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              PRIORITY DAILY QUEST
            </span>
            <h3 className="text-xl font-black text-slate-900 font-heading">Campus Zero-Waste Plastic Drive</h3>
          </div>
        </div>

        {/* STEPS LIST */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quest Requirements:</h4>
          
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center">1</span>
              <span>Collect 5 Plastic Bottles</span>
            </div>
            <p className="pl-7 text-slate-500 text-[11px]">Gather single-use plastic bottles from home or school.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center">2</span>
              <span>Deposit into Recycling Bin</span>
            </div>
            <p className="pl-7 text-slate-500 text-[11px]">Drop them into your school or community blue recycling bin.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center">3</span>
              <span>Take & Upload Photo Proof</span>
            </div>
            <p className="pl-7 text-slate-500 text-[11px]">Upload a photo of your action to claim +350 XP & +120 Coins.</p>
          </div>
        </div>

        {/* REWARDS SUMMARY */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] text-emerald-300 font-extrabold uppercase">Total Quest Reward</div>
            <div className="text-base font-black">350 XP + 120 Coins + Plastic Badge</div>
          </div>
          <span className="text-xl">🏆</span>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => {
            onClose();
            onOpenUploadProof();
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Upload className="w-4 h-4 text-emerald-100" />
          <span>Complete Quest & Upload Proof Now</span>
        </button>

      </motion.div>
    </div>
  );
}
