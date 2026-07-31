import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Upload, 
  Camera, 
  CheckCircle2, 
  Leaf, 
  Zap, 
  Coins, 
  Sparkles,
  Loader2,
  Scan,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UploadProofModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Recycling');
  const [description, setDescription] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 font-black">
            <Camera className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-heading">Submit Quest Proof</h3>
            <p className="text-xs text-emerald-300/80 font-bold">Upload photo or video of your completed action for AI verification</p>
          </div>
        </div>

        {success ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/30">
              🎉
            </div>
            <h4 className="text-2xl font-black text-white font-heading">Quest Proof Submitted!</h4>
            <p className="text-xs text-slate-300 font-bold leading-relaxed max-w-sm mx-auto">
              AI & Guildmaster Verification in progress. +350 XP & 150 Loot Coins will be added to your Explorer Card!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ACTION TITLE */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Quest Directive Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Recycled 5 Plastic Containers"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
              />
            </div>

            {/* CATEGORY SELECT */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Sanctuary Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
              >
                <option value="Recycling">Recycling & Waste Sanctuary</option>
                <option value="TreePlantation">Flora Plantation & Saplings</option>
                <option value="Energy">Energy & Mana Conservation</option>
                <option value="Water">Water Purification & Saving</option>
                <option value="Cleanup">Guild Community Cleanup</option>
              </select>
            </div>

            {/* UPLOAD FILE BOX WITH SCANNER LINE */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Upload Photo / Video Intel
              </label>
              <div 
                onClick={() => setFileSelected(true)}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all relative overflow-hidden ${
                  fileSelected 
                    ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300' 
                    : 'border-emerald-500/30 hover:border-emerald-400 bg-[#04160d] text-slate-300'
                }`}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                <p className="text-xs font-black">
                  {fileSelected ? 'Intel Attached: photo_proof_eco.jpg (1.4MB)' : 'Click to select photo or drag & drop'}
                </p>
                <p className="text-[10px] text-emerald-400/60 mt-1">Supports JPG, PNG, MP4 up to 25MB (Scanned by AI)</p>
              </div>
            </div>

            {/* REFLECTION */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Adventurer Reflection & Log
              </label>
              <textarea
                rows="3"
                placeholder="Describe how you completed this quest and what environmental impact you observed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
              />
            </div>

            {/* LOOT REWARD PREVIEW */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-xs font-black text-white">Estimated Quest Loot</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-xl border border-emerald-500/40">
                  +350 XP
                </span>
                <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-xl border border-amber-400/40">
                  +150 Coins 🪙
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 border border-emerald-300/40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>AI Scanning & Submitting Quest Proof...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>SUBMIT PROOF & CLAIM +350 XP</span>
                </>
              )}
            </button>

          </form>
        )}

      </motion.div>
    </div>
  );
}

