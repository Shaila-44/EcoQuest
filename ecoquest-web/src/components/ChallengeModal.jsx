import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  TreePine, 
  Trash2, 
  ZapOff, 
  Camera, 
  Award, 
  RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ChallengeModal({ isOpen, onClose }) {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  if (!isOpen) return null;

  const challenges = [
    {
      id: 'tree',
      title: 'Plant a Native Tree or Sapling',
      category: 'Biodiversity',
      xp: '+200 XP',
      description: 'Plant a native tree or flower sapling in your campus, backyard, or local park and submit photo proof.',
      icon: TreePine,
      sampleImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      aiDetection: 'Detected: Native Sapling (99.6% confidence), Organic Soil & Gardening Equipment.'
    },
    {
      id: 'audit',
      title: 'Zero-Waste Campus Audit',
      category: 'Waste Reduction',
      xp: '+150 XP',
      description: 'Sort recyclable materials, compost organic lunch scraps, or perform a plastic audit.',
      icon: Trash2,
      sampleImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      aiDetection: 'Detected: Recyclable HDPE Plastic & Sorted Cardboard (98.9% confidence).'
    },
    {
      id: 'energy',
      title: 'Clean Energy Audit & Lights Off',
      category: 'Energy Conservation',
      xp: '+120 XP',
      description: 'Audit unoccupied classrooms or home rooms and ensure energy vampire devices are unplugged.',
      icon: ZapOff,
      sampleImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
      aiDetection: 'Detected: Power Strip Unplugged & Natural Sunlight Audit (99.2% confidence).'
    }
  ];

  const activeChallenge = challenges[selectedChallenge];

  const handleSimulateVerification = () => {
    setVerifying(true);
    setVerified(false);

    // Simulate AI Vision scanning
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      
      // Fire confetti burst!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  const handleReset = () => {
    setVerifying(false);
    setVerified(false);
    setPreviewImage(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-white/90 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-2">
          <div className="tag-badge border-emerald-300/60 bg-emerald-50">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-800 text-xs font-bold uppercase">
              INTERACTIVE DEMO SIMULATOR
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-1">
          EcoQuest AI Photo Verification
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Test how EcoQuest’s computer vision model scans photo submissions to award XP instantly.
        </p>

        {/* CHALLENGE SELECTOR TABS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {challenges.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChallenge(idx);
                  handleReset();
                }}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  selectedChallenge === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-white/80 text-slate-800 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${selectedChallenge === idx ? 'text-white' : 'text-emerald-600'}`} />
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    selectedChallenge === idx ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {ch.xp}
                  </span>
                </div>
                <div className="font-bold text-xs line-clamp-1">{ch.title}</div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CHALLENGE CARD */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-6 flex items-start justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-900">{activeChallenge.title}</h4>
            <p className="text-xs text-slate-600 mt-1">{activeChallenge.description}</p>
          </div>
        </div>

        {/* AI PHOTO CANVAS & VERIFICATION AREA */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900 h-64 flex items-center justify-center mb-6">
          
          {/* Sample Photo */}
          <img
            src={activeChallenge.sampleImage}
            alt="Sample proof"
            className="w-full h-full object-cover opacity-85"
          />

          {/* AI SCANNER OVERLAY ANIMATION */}
          {verifying && (
            <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col items-center justify-center">
              {/* Laser Scan Line */}
              <div className="absolute w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 shadow-[0_0_15px_#34d399] animate-[scanLine_1.5s_infinite_linear]" />

              <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-3" />
              <div className="text-xs font-bold text-white bg-slate-900/90 px-4 py-1.5 rounded-full border border-emerald-400/50 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>AI Vision Model Scanning Image...</span>
              </div>
            </div>
          )}

          {/* VERIFIED SUCCESS OVERLAY */}
          {verified && (
            <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mb-3 shadow-xl">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <h4 className="text-xl font-extrabold text-white font-heading">
                Verification Successful!
              </h4>

              <p className="text-xs text-emerald-200 mt-1 max-w-md font-mono">
                {activeChallenge.aiDetection}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm px-6 py-2 rounded-full shadow-lg">
                <Award className="w-5 h-5 text-amber-950" />
                <span>{activeChallenge.xp} Awarded to Profile!</span>
              </div>
            </div>
          )}

          {/* Initial state watermark */}
          {!verifying && !verified && (
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ready for AI Analysis</span>
            </div>
          )}

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between gap-4">
          {verified ? (
            <button
              onClick={handleReset}
              className="btn-secondary text-sm px-6 py-3 w-full"
            >
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>Try Another Challenge</span>
            </button>
          ) : (
            <button
              onClick={handleSimulateVerification}
              disabled={verifying}
              className="btn-primary text-sm px-6 py-3.5 w-full shadow-lg shadow-emerald-500/30"
            >
              {verifying ? (
                <span>Analyzing Photo...</span>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Simulate AI Upload & Verification</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
