import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, Sparkles, CheckCircle2, ShieldCheck, TreePine, Zap, Coins } from 'lucide-react';

export default function CreateQuestModal({ isOpen, onClose, onCreateQuest }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Recycling & Waste');
  const [xpReward, setXpReward] = useState('350');
  const [coinReward, setCoinReward] = useState('150');
  const [difficulty, setDifficulty] = useState('B-Rank');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onCreateQuest({
      title,
      category,
      xpReward: parseInt(xpReward),
      coinReward: parseInt(coinReward),
      difficulty,
      description
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-xl bg-[#062016] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 p-0.5 shadow-md flex items-center justify-center text-slate-950">
                <PlusCircle className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-heading">Dispatch New Class Quest</h3>
                <p className="text-xs text-emerald-400 font-bold">Assign real-world sustainability tasks to Class 8-A</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-emerald-300 block mb-1.5">Quest Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Campus Zero-Waste Plastic Collection Drive"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#04160d] border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase text-emerald-300 block mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#04160d] border border-emerald-500/30 rounded-xl px-3 py-3 text-xs text-white focus:border-emerald-400 focus:outline-none"
                >
                  <option value="Recycling & Waste">Recycling & Waste</option>
                  <option value="Energy Conservation">Energy Conservation</option>
                  <option value="Water Audit">Water Audit</option>
                  <option value="Biodiversity & Planting">Biodiversity & Planting</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-emerald-300 block mb-1.5">Rank Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-[#04160d] border border-emerald-500/30 rounded-xl px-3 py-3 text-xs text-white focus:border-emerald-400 focus:outline-none"
                >
                  <option value="C-Rank">C-Rank (Easy)</option>
                  <option value="B-Rank">B-Rank (Medium)</option>
                  <option value="A-Rank">A-Rank (Hard)</option>
                  <option value="S-Rank">S-Rank (Guild Epic)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase text-emerald-300 block mb-1.5">XP Reward</label>
                <div className="relative">
                  <Zap className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
                  <input
                    type="number"
                    value={xpReward}
                    onChange={(e) => setXpReward(e.target.value)}
                    className="w-full bg-[#04160d] border border-emerald-500/30 rounded-xl pl-9 pr-4 py-3 text-xs text-white focus:border-emerald-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-amber-300 block mb-1.5">Coin Reward</label>
                <div className="relative">
                  <Coins className="w-4 h-4 text-amber-400 absolute left-3 top-3.5" />
                  <input
                    type="number"
                    value={coinReward}
                    onChange={(e) => setCoinReward(e.target.value)}
                    className="w-full bg-[#04160d] border border-emerald-500/30 rounded-xl pl-9 pr-4 py-3 text-xs text-white focus:border-emerald-400 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-emerald-300 block mb-1.5">Quest Objectives & AI Verification Criteria</label>
              <textarea
                rows="3"
                placeholder="Explain the real-world action required. Students will upload photo proof for AI verification scan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#04160d] border border-emerald-500/30 rounded-xl px-4 py-3 text-xs text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-slate-300 text-xs font-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-xl hover:scale-105 transition-all"
              >
                PUBLISH QUEST TO GUILD
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
