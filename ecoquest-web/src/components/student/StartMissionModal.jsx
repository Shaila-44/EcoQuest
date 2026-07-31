import React from 'react';
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
  ShieldCheck,
  Swords
} from 'lucide-react';

export default function StartMissionModal({ isOpen, onClose, onOpenUploadProof }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg glass-card p-6 sm:p-8 rounded-[32px] border border-emerald-500/40 shadow-2xl backdrop-blur-2xl bg-[#072218]/95 relative max-h-[90vh] overflow-y-auto text-slate-100"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-emerald-950 hover:bg-emerald-900 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30"
        >
          <X className="w-4 h-4" />
        </button>

        {/* MODAL HEADER */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-2xl font-black">
            ♻️
          </div>
          <div>
            <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-400/40">
              B-RANK PRIORITY QUEST
            </span>
            <h3 className="text-xl font-black text-white font-heading mt-0.5">Campus Zero-Waste Plastic Drive</h3>
          </div>
        </div>

        {/* STEPS LIST */}
        <div className="space-y-3.5 mb-6">
          <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>Quest Objectives & Directives:</span>
          </h4>
          
          <div className="p-3.5 rounded-2xl bg-[#04160d] border border-emerald-500/25 space-y-1 text-xs font-bold text-slate-200">
            <div className="flex items-center gap-2.5 text-white font-black">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[11px] flex items-center justify-center font-black">1</span>
              <span>Collect 5 Plastic Containers</span>
            </div>
            <p className="pl-7 text-emerald-300/80 text-[11px]">Gather single-use plastic containers from home or school campus.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#04160d] border border-emerald-500/25 space-y-1 text-xs font-bold text-slate-200">
            <div className="flex items-center gap-2.5 text-white font-black">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[11px] flex items-center justify-center font-black">2</span>
              <span>Deposit into Recycling Bin</span>
            </div>
            <p className="pl-7 text-emerald-300/80 text-[11px]">Drop them into designated recycling bins in your sanctuary or school.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#04160d] border border-emerald-500/25 space-y-1 text-xs font-bold text-slate-200">
            <div className="flex items-center gap-2.5 text-white font-black">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[11px] flex items-center justify-center font-black">3</span>
              <span>Upload Photo Proof for AI Verification</span>
            </div>
            <p className="pl-7 text-emerald-300/80 text-[11px]">Upload photo proof to claim +350 XP & +150 Loot Coins instantly.</p>
          </div>
        </div>

        {/* REWARDS SUMMARY */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 border border-emerald-500/30 text-white flex items-center justify-between mb-6 shadow-md">
          <div>
            <div className="text-[10px] text-amber-300 font-black uppercase tracking-wider">Quest Loot Package</div>
            <div className="text-sm font-black text-white">350 XP + 150 Loot Coins + Plastic Guardian Badge</div>
          </div>
          <span className="text-2xl">🏆</span>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => {
            onClose();
            onOpenUploadProof();
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-200/50"
        >
          <Upload className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span>Upload Quest Proof & Claim Loot</span>
        </button>

      </motion.div>
    </div>
  );
}

