import React, { useState, useEffect } from 'react';
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
  const [currentView, setCurrentView] = useState('student_home'); // Default directly to 'student_home' for instant preview!
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

  if (currentView === 'login') {
    return (
      <Login
        onNavigateHome={navigateToLanding}
        onLoginSuccess={navigateToStudentHome}
      />
    );
  }

  if (currentView === 'my_island') {
    return (
      <MyIsland
        onNavigateHome={navigateToStudentHome}
      />
    );
  }

  if (currentView === 'student_home') {
    return (
      <StudentHome
        onNavigateIsland={navigateToMyIsland}
        onLogout={navigateToLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-800 font-body relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* Dynamic ambient leaf & particle canvas background */}
      <ParticlesBackground />

      {/* Sticky Glass Navbar */}
      <Navbar
        onOpenGetStarted={navigateToStudentHome}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenGetStarted={navigateToStudentHome}
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
        onOpenGetStarted={navigateToStudentHome}
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
  );
}
