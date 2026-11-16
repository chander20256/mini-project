import React, { useEffect } from 'react';
import Navbar from '../components/Globalcomp/Navbar';
import Footer from '../components/Globalcomp/Footer';
import DsaHero from '../components/landingpagecomp/DsaHero';
import DsaGameModes from '../components/landingpagecomp/DsaGameModes';
import DsaHowToPlay from '../components/landingpagecomp/DsaHowToPlay';

export default function LandingPage({ onSelectArena }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar 
        onNavigateArena={onSelectArena}
        onGoHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <main className="flex-1">
        <DsaHero onStart={onSelectArena} />
        <DsaGameModes onSelectArena={onSelectArena} />
        <DsaHowToPlay />
      </main>
      <Footer />
    </div>
  );
}
