import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldAlert, Sparkles, Award, Zap, Coins, User, Camera } from 'lucide-react';

export default function VerifyProofModal({ proof, onClose, onApprove, onReject }) {
  if (!proof) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-2xl bg-[#062016] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-amber-300 p-0.5 shadow-md flex items-center justify-center text-slate-950 font-black">
                <CheckCircle2 className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-heading">AI & Teacher Verification Inspector</h3>
                <p className="text-xs text-emerald-400 font-bold">Review student photo proof & award guild XP</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PHOTO PROOF CONTAINER */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#04160d] aspect-video sm:aspect-square flex items-center justify-center">
                <img
                  src={proof.imageUrl || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80"}
                  alt="Student Verification Proof"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#04160d]/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/40 text-[10px] font-black text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI SCANNER CONFIDENCE: {proof.confidence || '98.4%'}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#04160d] border border-emerald-500/30 text-xs space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-300">AI Detection Summary</span>
                <p className="text-slate-300 font-medium">
                  {proof.aiSummary || "Detected 14 plastic water bottles in recycling bin. Geo-location timestamp matches Campus Science Center."}
                </p>
              </div>
            </div>

            {/* STUDENT & QUEST DETAILS */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#04160d] border border-emerald-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 flex-shrink-0">
                    <div className="w-full h-full bg-[#051912] rounded-[10px] flex items-center justify-center font-black text-amber-300 text-xs">
                      {proof.studentInitials || 'RS'}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white font-heading">{proof.studentName || 'Rahul Sharma'}</h4>
                    <p className="text-xs text-emerald-400 font-bold">Class 8-A • Lvl 12 Guardian</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-black text-slate-300 uppercase">Quest Title</div>
                  <div className="text-sm font-black text-white font-heading">{proof.questTitle || 'Campus Plastic Bottling Audit'}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-[#04160d] border border-emerald-500/30 text-center">
                    <div className="text-[10px] font-black uppercase text-emerald-400">XP Award</div>
                    <div className="text-base font-black text-white font-mono">+{proof.xp || 350} XP</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#04160d] border border-amber-500/30 text-center">
                    <div className="text-[10px] font-black uppercase text-amber-400">Coin Award</div>
                    <div className="text-base font-black text-amber-300 font-mono">+{proof.coins || 150} 🪙</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#04160d] border border-emerald-500/30 text-xs">
                  <span className="text-[10px] font-black uppercase text-emerald-400">Student Note</span>
                  <p className="text-slate-300 italic mt-0.5">"{proof.studentNote || "Collected and sorted plastic bottles behind cafeteria during lunch break!"}"</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onReject(proof.id)}
                  className="py-3 rounded-2xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-black text-xs cursor-pointer transition-all"
                >
                  Request Resubmission
                </button>
                <button
                  onClick={() => onApprove(proof.id)}
                  className="py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-xl hover:scale-105 transition-all"
                >
                  Approve & Award XP
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
