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
  Loader2
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
        particleCount: 100,
        spread: 70,
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
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 font-heading">Submit Eco Proof</h3>
            <p className="text-xs text-slate-500 font-medium">Upload photo or video of your completed action</p>
          </div>
        </div>

        {success ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              🎉
            </div>
            <h4 className="text-2xl font-black text-slate-900 font-heading">Proof Submitted!</h4>
            <p className="text-xs text-slate-600 font-medium">
              Your submission has been sent for teacher verification. You will be awarded +350 XP upon review!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ACTION TITLE */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Activity / Mission Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Recycled 5 Plastic Bottles"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
              />
            </div>

            {/* CATEGORY SELECT */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Recycling">Recycling & Waste Management</option>
                <option value="TreePlantation">Tree Plantation & Gardening</option>
                <option value="Energy">Energy Conservation</option>
                <option value="Water">Water Saving</option>
                <option value="Cleanup">Community Cleanup Drive</option>
              </select>
            </div>

            {/* UPLOAD FILE BOX */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Upload Photo / Video Proof
              </label>
              <div 
                onClick={() => setFileSelected(true)}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  fileSelected 
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800' 
                    : 'border-slate-300 hover:border-emerald-400 bg-slate-50 text-slate-500'
                }`}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <p className="text-xs font-extrabold">
                  {fileSelected ? 'Photo Attached: photo_proof_eco.jpg (1.4MB)' : 'Click to select photo or drag & drop'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, MP4 up to 25MB</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description / Reflection
              </label>
              <textarea
                rows="3"
                placeholder="Describe how you completed this activity and what you learned..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
              />
            </div>

            {/* REWARD ESTIMATE */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-900">Estimated Reward</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-700 bg-white px-2.5 py-1 rounded-xl border border-emerald-300">
                  +350 XP
                </span>
                <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300">
                  +120 Coins
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting Proof to Teacher...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-100" />
                  <span>Submit Proof & Earn +350 XP</span>
                </>
              )}
            </button>

          </form>
        )}

      </motion.div>
    </div>
  );
}
