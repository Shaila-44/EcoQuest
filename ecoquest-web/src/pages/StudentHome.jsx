import React, { useState } from 'react';
import Sidebar from '../components/student/Sidebar';
import TopNav from '../components/student/TopNav';
import WelcomeHero from '../components/student/WelcomeHero';
import FeaturedMission from '../components/student/FeaturedMission';
import DailyProgress from '../components/student/DailyProgress';
import StreakCard from '../components/student/StreakCard';
import UploadProofModal from '../components/student/UploadProofModal';
import StartMissionModal from '../components/student/StartMissionModal';
import ParticlesBackground from '../components/ParticlesBackground';

export default function StudentHome({ onNavigateIsland, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  // If student clicks "My Island" tab in sidebar, trigger island view
  const handleTabChange = (tabId) => {
    if (tabId === 'island') {
      onNavigateIsland();
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-slate-800 font-body relative overflow-x-hidden flex selection:bg-emerald-500 selection:text-white">
      
      {/* DYNAMIC AMBIENT LEAF & PARTICLES BACKGROUND CANVAS */}
      <ParticlesBackground />

      {/* AMBIENT BACKGROUND LIGHTING BLOBS */}
      <div className="fixed top-1/4 left-64 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-300/20 to-teal-200/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* LEFT SIDEBAR NAVIGATION (FIXED POSITION) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
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

        {/* MAIN HOME COMMAND CENTER CONTENT */}
        <main className="flex-1 p-6 lg:p-10 space-y-10 max-w-7xl mx-auto w-full relative z-10">
          
          {/* 1. WELCOME HERO SECTION WITH DYNAMIC MESSAGE ROTATOR & RICH VECTOR ARTWORK */}
          <WelcomeHero
            onStartFeaturedMission={() => setMissionModalOpen(true)}
          />

          {/* 2. TODAY'S FEATURED MISSION (PRIORITY GAME QUEST CARD) */}
          <FeaturedMission
            onStartMission={() => setMissionModalOpen(true)}
          />

          {/* 3. DAILY METRICS & STREAK SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* DAILY PROGRESS RING & STATS (6 COLUMNS) */}
            <div className="lg:col-span-6 flex">
              <div className="w-full">
                <DailyProgress />
              </div>
            </div>

            {/* STREAK CARD & CALENDAR (6 COLUMNS) */}
            <div className="lg:col-span-6 flex">
              <div className="w-full">
                <StreakCard />
              </div>
            </div>

          </div>

        </main>

        {/* FOOTER */}
        <footer className="py-6 px-6 lg:px-10 border-t border-emerald-100/80 bg-white/50 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-bold">
            <div>
              © {new Date().getFullYear()} EcoQuest Inc. • Student Command Center
            </div>
            <div className="flex items-center gap-6">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">
                Student Guidelines
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">
                Help & Support
              </a>
            </div>
          </div>
        </footer>

      </div>

      {/* INTERACTIVE MODALS */}
      <UploadProofModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      <StartMissionModal
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
        onOpenUploadProof={() => setUploadModalOpen(true)}
      />

    </div>
  );
}
