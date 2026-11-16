import React, { useState, useEffect } from 'react';
import LandingPage from './pages/landing';
import DashboardPage from './pages/dashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [selectedArena, setSelectedArena] = useState(null);

  // Always scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, selectedArena]);

  const handleSelectArena = (arenaId) => {
    setSelectedArena(arenaId);
    setCurrentView('dashboard');
  };

  const handleOpenDashboardOverview = () => {
    setSelectedArena(null);
    setCurrentView('dashboard');
  };

  const handleGoHome = () => {
    setCurrentView('landing');
    setSelectedArena(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {currentView === 'landing' ? (
        <LandingPage onSelectArena={handleSelectArena} />
      ) : (
        <DashboardPage 
          initialArena={selectedArena} 
          onGoHome={handleGoHome} 
        />
      )}
    </div>
  );
}

export default App;
