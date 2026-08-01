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
  RotateCcw,
  Swords
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ChallengeModal({ isOpen, onClose }) {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  if (!isOpen) return null;

  const challenges = [
    {
      id: 'tree',
      title: 'Plant a Native Tree or Sapling',
      category: 'Biodiversity',
      xp: '+200 XP',
      description: 'Plant a native tree or flower sapling in your sanctuary, backyard, or local park and submit photo proof.',
      icon: TreePine,
      sampleImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      aiDetection: 'Detected: Native Sapling (99.6% confidence), Organic Soil & Gardening Equipment.'
    },
    {
      id: 'audit',
      title: 'Zero-Waste Sanctuary Audit',
      category: 'Waste Reduction',
      xp: '+150 XP',
      description: 'Sort recyclable materials, compost organic lunch scraps, or perform a plastic waste audit.',
      icon: Trash2,
      sampleImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      aiDetection: 'Detected: Recyclable HDPE Plastic & Sorted Cardboard (98.9% confidence).'
    },
    {
      id: 'energy',
      title: 'Clean Energy & Mana Conservation',
      category: 'Energy Conservation',
      xp: '+120 XP',
      description: 'Audit unoccupied classrooms or rooms and ensure energy vampire devices are unplugged.',
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
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  const handleReset = () => {
    setVerifying(false);
    setVerified(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card max-w-2xl w-full p-6 sm:p-8 rounded-[32px] border border-emerald-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto bg-[#072218]/95 text-slate-100">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-emerald-950 hover:bg-emerald-900 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30"
        >
          <X className="w-4 h-4" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-black uppercase border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>AI QUEST SCANNER SIMULATOR</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white font-heading mb-1">
          EcoQuest AI Photo Verification
        </h3>
        <p className="text-xs text-emerald-300/80 mb-6 font-bold">
          Test how EcoQuest’s computer vision model scans photo submissions to award XP & Loot Coins instantly.
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
                className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                  selectedChallenge === idx
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 border-emerald-300 font-black shadow-lg'
                    : 'bg-[#04160d] text-slate-200 border-emerald-500/30 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${selectedChallenge === idx ? 'text-slate-950' : 'text-emerald-400'}`} />
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    selectedChallenge === idx ? 'bg-slate-950 text-emerald-300' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {ch.xp}
                  </span>
                </div>
                <div className="font-black text-xs line-clamp-1">{ch.title}</div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CHALLENGE CARD */}
        <div className="bg-[#04160d] p-4 rounded-2xl border border-emerald-500/30 mb-6 flex items-start justify-between">
          <div>
            <h4 className="font-black text-sm text-white font-heading">{activeChallenge.title}</h4>
            <p className="text-xs text-emerald-300/80 font-bold mt-1">{activeChallenge.description}</p>
          </div>
        </div>

        {/* AI PHOTO CANVAS & VERIFICATION AREA */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-slate-950 h-64 flex items-center justify-center mb-6">
          
          {/* Sample Photo */}
          <img
            src={activeChallenge.sampleImage}
            alt="Sample proof"
            className="w-full h-full object-cover opacity-85"
          />

          {/* AI SCANNER OVERLAY ANIMATION */}
          {verifying && (
            <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center">
              {/* Laser Scan Line */}
              <div className="absolute w-full h-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 shadow-[0_0_15px_#34d399] animate-[scanLine_1.5s_infinite_linear]" />

              <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-3" />
              <div className="text-xs font-black text-white bg-slate-950/90 px-4 py-1.5 rounded-full border border-emerald-400/50 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>AI Vision Scanner Analyzing Intel...</span>
              </div>
            </div>
          )}

          {/* VERIFIED SUCCESS OVERLAY */}
          {verified && (
            <div className="absolute inset-0 bg-[#041910]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 text-slate-950 flex items-center justify-center mb-3 shadow-xl font-black">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <h4 className="text-xl font-black text-white font-heading">
                Quest Intel Verified!
              </h4>

              <p className="text-xs text-emerald-300 mt-1 max-w-md font-mono font-bold">
                {activeChallenge.aiDetection}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm px-6 py-2 rounded-full shadow-lg border border-amber-300/40">
                <Award className="w-5 h-5 text-slate-950" />
                <span>{activeChallenge.xp} & +150 Coins Awarded!</span>
              </div>
            </div>
          )}

          {/* Initial state watermark */}
          {!verifying && !verified && (
            <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ready for AI Quest Scan</span>
            </div>
          )}

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between gap-4">
          {verified ? (
            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl bg-emerald-950 text-emerald-300 font-black text-sm border border-emerald-500/40 flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>Try Another Quest Scan</span>
            </button>
          ) : (
            <button
              onClick={handleSimulateVerification}
              disabled={verifying}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40"
            >
              {verifying ? (
                <span>Analyzing Intel Photo...</span>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Simulate AI Quest Upload & Verification</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

