import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChallengeModal from './components/ChallengeModal';
import LeaderboardModal from './components/LeaderboardModal';
import GetStartedModal from './components/GetStartedModal';
import Login from './pages/Login';
import StudentHome from './pages/StudentHome';
import MyIsland from './pages/MyIsland';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // Default to landing page
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/login' || hash === '#login') {
        setCurrentView('login');
      } else if (hash === '#/island' || hash === '#island') {
        setCurrentView('my_island');
      } else if (hash === '#/landing' || hash === '#landing') {
        setCurrentView('landing');
      } else if (hash === '#/home' || hash === '#home') {
        setCurrentView('student_home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToLogin = () => {
    window.location.hash = '/login';
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    window.location.hash = '/landing';
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToStudentHome = () => {
    window.location.hash = '/home';
    setCurrentView('student_home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMyIsland = () => {
    window.location.hash = '/island';
    setCurrentView('my_island');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="w-full min-h-screen"
      >

        {currentView === 'login' ? (
          <Login
            onNavigateHome={navigateToLanding}
            onLoginSuccess={navigateToStudentHome}
          />
        ) : currentView === 'my_island' ? (
          <MyIsland
            onNavigateHome={navigateToStudentHome}
          />
        ) : currentView === 'student_home' ? (
          <StudentHome
            onNavigateIsland={navigateToMyIsland}
            onLogout={navigateToLogin}
          />
        ) : (
          <div className="min-h-screen bg-[#05130d] text-slate-100 font-body relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">

            {/* Dynamic ambient leaf & particle canvas background */}
            <ParticlesBackground />

            {/* Sticky Glass Navbar */}
            <Navbar
              onOpenGetStarted={navigateToLogin}
              onOpenDemo={() => setDemoModalOpen(true)}
            />

            {/* Main Content Sections */}
            <main className="relative z-10">
              {/* Hero Section */}
              <Hero
                onOpenGetStarted={navigateToLogin}
                onOpenDemo={() => setDemoModalOpen(true)}
              />

              {/* Features Section */}
              <Features
                onOpenDemo={() => setDemoModalOpen(true)}
              />

              {/* Leaderboard Section */}
              <Leaderboard
                onOpenFullLeaderboard={() => setLeaderboardModalOpen(true)}
              />

              {/* About & Impact Calculator Section */}
              <About />

              {/* Contact Section */}
              <Contact />
            </main>

            {/* Footer */}
            <Footer
              onOpenGetStarted={navigateToLogin}
            />

            {/* Interactive Modals */}
            <ChallengeModal
              isOpen={demoModalOpen}
              onClose={() => setDemoModalOpen(false)}
            />

            <LeaderboardModal
              isOpen={leaderboardModalOpen}
              onClose={() => setLeaderboardModalOpen(false)}
            />

            <GetStartedModal
              isOpen={getStartedModalOpen}
              onClose={() => setGetStartedModalOpen(false)}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

