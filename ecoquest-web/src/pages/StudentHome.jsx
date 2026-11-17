import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import Sidebar from '../components/student/Sidebar';
import TopNav from '../components/student/TopNav';
import WelcomeHero from '../components/student/WelcomeHero';
import FeaturedMission from '../components/student/FeaturedMission';
import DailyProgress from '../components/student/DailyProgress';
import StreakCard from '../components/student/StreakCard';
import UploadProofModal from '../components/student/UploadProofModal';
import StartMissionModal from '../components/student/StartMissionModal';
import ParticlesBackground from '../components/ParticlesBackground';

import QuestBoard from '../components/student/QuestBoard';
import HallOfChampions from '../components/student/HallOfChampions';
import EcoChronicles from '../components/student/EcoChronicles';
import UnlockCollection from '../components/student/UnlockCollection';
import ExplorerShop from '../components/student/ExplorerShop';

export default function StudentHome({ onNavigateIsland, onSwitchToEducator, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const refreshSubmissions = () => {
    api.listSubmissions().then(setSubmissions).catch(() => {});
  };

  // Load the real daily challenge and the student's own submission history
  // from the backend on mount — this is what UploadProofModal actually
  // submits against (the elaborate quest cards below stay illustrative).
  useEffect(() => {
    api.getDailyChallenge().then(setDailyChallenge).catch(() => {});
    refreshSubmissions();
  }, []);

  // If student clicks "My Island" tab in sidebar, trigger island view
  const handleTabChange = (tabId) => {
    if (tabId === 'island') {
      onNavigateIsland();
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-[#05130d] text-slate-100 font-body relative overflow-x-hidden flex selection:bg-emerald-500 selection:text-white">
      
      {/* DYNAMIC AMBIENT BIOLUMINESCENT PARTICLES CANVAS */}
      <ParticlesBackground />

      {/* AMBIENT DEEP FOREST LIGHTING BLOBS */}
      <div className="fixed top-1/4 left-64 w-[650px] h-[650px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-10 right-10 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-10 right-1/3 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* LEFT SIDEBAR NAVIGATION (FIXED POSITION) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onSwitchToEducator={onSwitchToEducator}
        onLogout={onLogout}
      />

      {/* MAIN DASHBOARD CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pl-64 lg:pl-72">
        
        {/* TOP NAVIGATION HEADER */}
        <TopNav
          onOpenUploadModal={() => setUploadModalOpen(true)}
          onOpenMissionModal={() => setMissionModalOpen(true)}
          onLogout={onLogout}
        />

        {/* MAIN CONTENT AREA WITH SMOOTH PAGE TRANSITIONS */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full relative z-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >

              {activeTab === 'missions' ? (
                /* QUEST BOARD PAGE */
                <QuestBoard
                  onStartMission={() => setMissionModalOpen(true)}
                  onOpenUploadProof={() => setUploadModalOpen(true)}
                />
              ) : activeTab === 'leaderboard' ? (
                /* HALL OF CHAMPIONS PAGE */
                <HallOfChampions />
              ) : activeTab === 'community' ? (
                /* ECO CHRONICLES PAGE */
                <EcoChronicles />
              ) : activeTab === 'achievements' ? (
                /* UNLOCK COLLECTION PAGE */
                <UnlockCollection />
              ) : activeTab === 'store' ? (
                /* EXPLORER SHOP PAGE */
                <ExplorerShop />
              ) : (
                /* HOME COMMAND CENTER CONTENT */
                <div className="space-y-10">

                  {/* 1. WELCOME HERO SECTION WITH DYNAMIC MESSAGE ROTATOR & RICH VECTOR ARTWORK */}
                  <WelcomeHero
                    onStartFeaturedMission={() => setMissionModalOpen(true)}
                  />

                  {/* 2. TODAY'S FEATURED MISSION (PRIORITY RPG QUEST CARD) */}
                  <FeaturedMission
                    onStartMission={() => setMissionModalOpen(true)}
                  />

                  {/* 3. DAILY METRICS & STREAK SECTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* ADVENTURE PROGRESS RING & STATS (6 COLUMNS) */}
                    <div className="lg:col-span-6 flex">
                      <div className="w-full">
                        <DailyProgress />
                      </div>
                    </div>

                    {/* STREAK CARD (6 COLUMNS) */}
                    <div className="lg:col-span-6 flex">
                      <div className="w-full">
                        <StreakCard />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <footer className="py-6 px-6 lg:px-10 border-t border-emerald-500/20 bg-[#04160d]/80 backdrop-blur-md relative z-10 text-slate-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold">
            <div>
              © {new Date().getFullYear()} EcoQuest • Neo Nature RPG Adventure
            </div>
            <div className="flex items-center gap-6">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors">
                Privacy Codex
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors">
                Adventurer Rules
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors">
                Support & Lore
              </a>
            </div>
          </div>
        </footer>

      </div>

      {/* INTERACTIVE MODALS */}
      <UploadProofModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        challenge={dailyChallenge}
        onSubmitted={refreshSubmissions}
      />

      <StartMissionModal
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
        onOpenUploadProof={() => setUploadModalOpen(true)}
        challenge={dailyChallenge}
      />

    </div>
  );
}

