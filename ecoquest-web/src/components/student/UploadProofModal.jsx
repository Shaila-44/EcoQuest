import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Upload,
  Camera,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api, uploadImageToCloudinary } from '../../lib/api';

const STATUS_COPY = {
  Approved: {
    icon: CheckCircle2,
    color: 'text-emerald-300',
    title: 'Quest Verified & Approved!',
  },
  Pending: {
    icon: Clock,
    color: 'text-amber-300',
    title: 'Sent for Teacher Review',
  },
  Rejected: {
    icon: XCircle,
    color: 'text-rose-300',
    title: 'Not Verified This Time',
  },
};

export default function UploadProofModal({ isOpen, onClose, challenge, onSubmitted }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const reset = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setImageUrl('');
    setError('');
    setResult(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!challenge) {
      setError('No active challenge is available to submit against right now.');
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = imageUrl.trim();

      if (file) {
        try {
          finalImageUrl = await uploadImageToCloudinary(file, 'ecoquest/submissions');
        } catch (uploadErr) {
          if (!finalImageUrl) {
            throw new Error(
              `${uploadErr.message}. Paste a public image URL below instead, or ask an admin to configure Cloudinary.`
            );
          }
        }
      }

      if (!finalImageUrl) {
        throw new Error('Select a photo to upload, or paste a public image URL.');
      }

      const submission = await api.createSubmission({
        challenge_id: challenge.challenge_id,
        title: title || challenge.title,
        description,
        image_url: finalImageUrl,
      });

      setResult(submission);
      if (submission.status === 'Approved') {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
      if (onSubmitted) onSubmitted();
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = result ? STATUS_COPY[result.status] || STATUS_COPY.Pending : null;
  const StatusIcon = statusInfo?.icon;

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
          onClick={handleClose}
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
            <p className="text-xs text-emerald-300/80 font-bold">
              {challenge ? `Challenge: ${challenge.title}` : 'Upload photo proof for AI verification'}
            </p>
          </div>
        </div>

        {result ? (
          <div className="py-10 text-center space-y-4">
            <div className={`w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 ${statusInfo.color}`}>
              {StatusIcon && <StatusIcon className="w-8 h-8" />}
            </div>
            <h4 className="text-2xl font-black text-white font-heading">{statusInfo.title}</h4>
            <p className="text-xs text-slate-300 font-bold leading-relaxed max-w-sm mx-auto">
              {result.status === 'Approved' &&
                `AI verification approved your submission. +${result.points_earned} XP added!`}
              {result.status === 'Pending' &&
                'AI verification needs a human eye on this one — a teacher will review it shortly.'}
              {result.status === 'Rejected' &&
                'AI verification could not confirm this activity from the photo. Try again with clearer evidence.'}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 cursor-pointer shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!challenge && (
              <div className="px-3.5 py-2.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold">
                Loading today's challenge...
              </div>
            )}

            {/* ACTION TITLE */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Submission Title
              </label>
              <input
                type="text"
                placeholder={challenge?.title || 'e.g. Recycled 5 Plastic Containers'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
              />
            </div>

            {/* UPLOAD FILE BOX */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Upload Photo
              </label>
              <label
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all block ${
                  file
                    ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300'
                    : 'border-emerald-500/30 hover:border-emerald-400 bg-[#04160d] text-slate-300'
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Upload className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                <p className="text-xs font-black">
                  {file ? `Selected: ${file.name}` : 'Click to select a photo'}
                </p>
                <p className="text-[10px] text-emerald-400/60 mt-1">JPG, PNG or WEBP, up to 10MB</p>
              </label>
            </div>

            {/* MANUAL URL FALLBACK */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Or Paste Image URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
              />
              <p className="text-[10px] text-emerald-400/60 mt-1">
                Used if a photo isn't selected, or if direct upload isn't configured on this server.
              </p>
            </div>

            {/* REFLECTION */}
            <div>
              <label className="block text-xs font-black text-emerald-300 mb-1.5 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Describe how you completed this quest and what environmental impact you observed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
              />
            </div>

            {challenge && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-between">
                <span className="text-xs font-black text-white">Reward if Approved</span>
                <span className="text-xs font-black text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-xl border border-emerald-500/40">
                  +{challenge.points} XP
                </span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading || !challenge}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 border border-emerald-300/40 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>AI Scanning & Submitting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>SUBMIT PROOF FOR AI VERIFICATION</span>
                </>
              )}
            </button>

          </form>
        )}

      </motion.div>
    </div>
  );
}
