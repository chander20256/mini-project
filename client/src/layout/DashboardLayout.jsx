import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { Menu, Swords } from 'lucide-react';

export default function DashboardLayout({ 
  activeArena, 
  onSelectArena, 
  selectedAlgo, 
  onSelectAlgo, 
  onGoHome, 
  children 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainContentRef = useRef(null);

  // Scroll main outlet to top whenever arena changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeArena, selectedAlgo]);

  return (
    <div className="h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
      {/* 1. Sidebar Component (Pinned in place, will not scroll with main content) */}
      <Sidebar 
        activeArena={activeArena}
        onSelectArena={onSelectArena}
        selectedAlgo={selectedAlgo}
        onSelectAlgo={onSelectAlgo}
        onGoHome={onGoHome}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper (The only area that scrolls) */}
      <div 
        ref={mainContentRef}
        className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden"
      >
        {/* Mobile Top Header (only visible on mobile screens) */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Swords className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm">
                AlgoArena
              </span>
            </div>
          </div>

          <button
            onClick={onGoHome}
            className="text-xs font-semibold px-2.5 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
          >
            Home
          </button>
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

