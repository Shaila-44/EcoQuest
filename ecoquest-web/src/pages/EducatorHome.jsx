import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EducatorSidebar from '../components/educator/EducatorSidebar';
import EducatorTopNav from '../components/educator/EducatorTopNav';
import CreateQuestModal from '../components/educator/CreateQuestModal';
import VerifyProofModal from '../components/educator/VerifyProofModal';
import ParticlesBackground from '../components/ParticlesBackground';

import { 
  Users, 
  ShieldCheck, 
  Award, 
  BarChart3, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Zap, 
  Coins, 
  BookOpen, 
  Download, 
  Filter, 
  Eye, 
  Check, 
  X,
  TrendingUp,
  Leaf,
  Globe
} from 'lucide-react';

export default function EducatorHome({ onNavigateIsland, onSwitchToStudent, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [createQuestOpen, setCreateQuestOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);

  // Mock Verification Queue Data
  const [pendingProofs, setPendingProofs] = useState([
    {
      id: 'p1',
      studentName: 'Rahul Sharma',
      studentInitials: 'RS',
      questTitle: 'Campus Plastic Bottling Audit',
      submittedTime: '12m ago',
      confidence: '98.4%',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      xp: 350,
      coins: 150,
      studentNote: 'Collected and sorted plastic bottles behind cafeteria during lunch break!',
      aiSummary: 'Detected 14 plastic water bottles in recycling bin. Geo-location timestamp matches Campus Science Center.'
    },
    {
      id: 'p2',
      studentName: 'Priya Patel',
      studentInitials: 'PP',
      questTitle: 'Home Energy Audit & LED Swap',
      submittedTime: '25m ago',
      confidence: '96.1%',
      imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
      xp: 450,
      coins: 200,
      studentNote: 'Replaced 6 incandescent bulbs with Energy Star LEDs at home.',
      aiSummary: 'Detected LED bulb package and light socket replacement with verified EXIF timestamp.'
    },
    {
      id: 'p3',
      studentName: 'Aarav Mehta',
      studentInitials: 'AM',
      questTitle: 'School Garden Composting Drive',
      submittedTime: '1h ago',
      confidence: '99.2%',
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
      xp: 300,
      coins: 120,
      studentNote: 'Added organic food scraps from cafeteria to class compost bin.',
      aiSummary: 'Organic waste disposal verified in compost bin structure.'
    }
  ]);

  // Mock Class Quests
  const [classQuests, setClassQuests] = useState([
    { id: 'q1', title: 'Campus Zero-Waste Plastic Drive', category: 'Recycling', activeCount: 38, xp: 350, difficulty: 'B-Rank' },
    { id: 'q2', title: 'Rainwater Harvesting Inspection', category: 'Water Audit', activeCount: 24, xp: 400, difficulty: 'A-Rank' },
    { id: 'q3', title: 'Classroom Solar Energy Challenge', category: 'Energy', activeCount: 42, xp: 500, difficulty: 'S-Rank' },
  ]);

  const handleTabChange = (tabId) => {
    if (tabId === 'island') {
      onNavigateIsland();
    } else {
      setActiveTab(tabId);
    }
  };

  const handleApproveProof = (proofId) => {
    setPendingProofs(prev => prev.filter(p => p.id !== proofId));
    setSelectedProof(null);
  };

  const handleRejectProof = (proofId) => {
    setPendingProofs(prev => prev.filter(p => p.id !== proofId));
    setSelectedProof(null);
  };

  const handleAddQuest = (newQuest) => {
    setClassQuests(prev => [
      { id: `q${Date.now()}`, title: newQuest.title, category: newQuest.category, activeCount: 48, xp: newQuest.xpReward, difficulty: newQuest.difficulty },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-[#05130d] text-slate-100 font-body relative overflow-x-hidden flex selection:bg-emerald-500 selection:text-white">
      
      {/* AMBIENT PARTICLES & LIGHTING BLOBS */}
      <ParticlesBackground />
      <div className="fixed top-1/4 left-64 w-[650px] h-[650px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-10 right-10 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* EDUCATOR SIDEBAR */}
      <EducatorSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onLogout={onLogout}
        onSwitchToStudent={onSwitchToStudent}
      />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pl-64 lg:pl-72">
        
        {/* EDUCATOR TOP NAVIGATION */}
        <EducatorTopNav
          onOpenCreateQuest={() => setCreateQuestOpen(true)}
          onSwitchToStudent={onSwitchToStudent}
          onLogout={onLogout}
        />

        {/* MAIN CONTENT CONTAINER */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full relative z-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {activeTab === 'verification' ? (
                /* VERIFICATION QUEUE PAGE */
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">AI & Teacher Verification Queue</h2>
                      <p className="text-xs text-emerald-400 font-bold mt-1">Review AI confidence scans and award student XP</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-full border border-amber-400/40">
                        {pendingProofs.length} Pending Approvals
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingProofs.map((proof) => (
                      <div
                        key={proof.id}
                        className="bg-[#08241a]/90 border border-emerald-500/30 rounded-3xl p-5 shadow-xl space-y-4 hover:border-emerald-400/60 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 aspect-video bg-[#04160d]">
                            <img src={proof.imageUrl} alt={proof.questTitle} className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 bg-[#04160d]/90 px-2.5 py-0.5 rounded-full border border-emerald-400/40 text-[9px] font-black text-amber-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>AI: {proof.confidence}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-white font-heading">{proof.studentName}</span>
                              <span className="text-[10px] text-emerald-400 font-bold">{proof.submittedTime}</span>
                            </div>
                            <h4 className="text-sm font-black text-emerald-300 font-heading mt-1">{proof.questTitle}</h4>
                          </div>

                          <p className="text-xs text-slate-300 italic line-clamp-2">"{proof.studentNote}"</p>
                        </div>

                        <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedProof(proof)}
                            className="w-full py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 text-xs font-black cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Proof</span>
                          </button>
                          <button
                            onClick={() => handleApproveProof(proof.id)}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs cursor-pointer shadow-md hover:scale-105 transition-all flex items-center gap-1"
                          >
                            <Check className="w-4 h-4 text-slate-950" />
                            <span>Approve</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'analytics' ? (
                /* CLASSROOM ANALYTICS PAGE */
                <div className="space-y-8">
                  <div className="border-b border-emerald-500/20 pb-6">
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">Classroom Sustainability Analytics</h2>
                    <p className="text-xs text-emerald-400 font-bold mt-1">Real-time environmental impact data & student participation</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#08241a]/90 border border-emerald-500/30 p-6 rounded-3xl space-y-2">
                      <div className="text-[10px] font-black uppercase text-emerald-400">Total Carbon Offset</div>
                      <div className="text-3xl font-black text-white font-heading">1,250 Kg</div>
                      <span className="text-xs font-bold text-teal-300">↑ 18% from last month</span>
                    </div>

                    <div className="bg-[#08241a]/90 border border-emerald-500/30 p-6 rounded-3xl space-y-2">
                      <div className="text-[10px] font-black uppercase text-amber-400">Active Participation</div>
                      <div className="text-3xl font-black text-amber-300 font-heading">96%</div>
                      <span className="text-xs font-bold text-amber-300">46 / 48 Students active</span>
                    </div>

                    <div className="bg-[#08241a]/90 border border-emerald-500/30 p-6 rounded-3xl space-y-2">
                      <div className="text-[10px] font-black uppercase text-teal-300">Quests Verified</div>
                      <div className="text-3xl font-black text-white font-heading">412</div>
                      <span className="text-xs font-bold text-emerald-400">100% AI audit compliance</span>
                    </div>

                    <div className="bg-[#08241a]/90 border border-emerald-500/30 p-6 rounded-3xl space-y-2">
                      <div className="text-[10px] font-black uppercase text-emerald-400">Regional Guild Rank</div>
                      <div className="text-3xl font-black text-white font-heading">Rank #2</div>
                      <span className="text-xs font-bold text-amber-300">Top 2% in State League</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* EDUCATOR COMMAND CENTER (DEFAULT HOME) */
                <div className="space-y-10">
                  {/* EDUCATOR HERO BANNER */}
                  <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#062419] via-[#093223] to-[#04140d] p-6 sm:p-8 lg:p-10 shadow-2xl border border-emerald-500/40">
                    <div className="relative z-10 space-y-4 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wider uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>GUILD MASTER COMMAND HUB</span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-heading">
                        Welcome Back, <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">Prof. Sarah</span> 👋
                      </h1>
                      <p className="text-sm text-slate-300 font-medium">
                        Class 8-A is currently ranked <strong className="text-amber-300">#2 in the Regional Eco-League</strong> with 5 student proof submissions awaiting your approval!
                      </p>
                      <div className="pt-2 flex flex-wrap gap-3">
                        <button
                          onClick={() => setCreateQuestOpen(true)}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                        >
                          <PlusCircle className="w-4 h-4 text-slate-950" />
                          <span>Dispatch New Class Quest</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('verification')}
                          className="px-6 py-3 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:text-white font-black text-xs cursor-pointer flex items-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span>Review Pending Proof ({pendingProofs.length})</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* QUICK PENDING VERIFICATION QUEUE SECTION */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-white font-heading flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                        <span>Recent Student Proof Submissions</span>
                      </h3>
                      <button
                        onClick={() => setActiveTab('verification')}
                        className="text-xs font-black text-emerald-400 hover:text-emerald-200 transition-colors cursor-pointer"
                      >
                        View All Queue →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pendingProofs.slice(0, 3).map((proof) => (
                        <div
                          key={proof.id}
                          className="bg-[#08241a]/90 border border-emerald-500/30 rounded-3xl p-5 shadow-xl space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-white font-heading">{proof.studentName}</span>
                            <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                              {proof.confidence} AI Scan
                            </span>
                          </div>
                          <h4 className="text-xs font-black text-emerald-300 font-heading">{proof.questTitle}</h4>
                          <button
                            onClick={() => setSelectedProof(proof)}
                            className="w-full py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-black cursor-pointer border border-emerald-500/30"
                          >
                            Review & Award XP
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTIVE CLASS QUESTS DISPATCHED */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-white font-heading flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-emerald-400" />
                      <span>Active Class Quests ({classQuests.length})</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {classQuests.map((q) => (
                        <div key={q.id} className="bg-[#08241a]/90 border border-emerald-500/30 p-5 rounded-3xl space-y-2">
                          <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/40">
                            {q.difficulty}
                          </span>
                          <h4 className="text-sm font-black text-white font-heading">{q.title}</h4>
                          <div className="text-xs text-emerald-400 font-bold">{q.activeCount} Students Active • +{q.xp} XP</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* CREATE QUEST MODAL */}
      <CreateQuestModal
        isOpen={createQuestOpen}
        onClose={() => setCreateQuestOpen(false)}
        onCreateQuest={handleAddQuest}
      />

      {/* VERIFY PROOF INSPECTOR MODAL */}
      <VerifyProofModal
        proof={selectedProof}
        onClose={() => setSelectedProof(null)}
        onApprove={handleApproveProof}
        onReject={handleRejectProof}
      />

    </div>
  );
}
