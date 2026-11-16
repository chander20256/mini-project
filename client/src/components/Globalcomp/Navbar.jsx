import React from 'react';
import { Swords, Trophy, BarChart3, Network, GitFork, Play } from 'lucide-react';

export default function Navbar({ onNavigateArena, onGoHome }) {
  const savedXp = parseInt(localStorage.getItem('algoarena_xp') || '0', 10);
  const playerLevel = Math.floor(savedXp / 100) + 1;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Swords className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent">
                AlgoArena
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                DSA Quest
              </span>
            </div>
          </div>
        </div>

        {/* Categories / Navigation */}
        <nav className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={() => onNavigateArena && onNavigateArena('sorting')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span className="hidden md:inline">Sorting Arena</span>
            <span className="md:hidden">Sorting</span>
          </button>

          <button
            onClick={() => onNavigateArena && onNavigateArena('trees')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <GitFork className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Trees & BST</span>
            <span className="md:hidden">Trees</span>
          </button>

          <button
            onClick={() => onNavigateArena && onNavigateArena('graphs')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors cursor-pointer"
          >
            <Network className="w-4 h-4 text-purple-600" />
            <span className="hidden md:inline">Graph Dungeon</span>
            <span className="md:hidden">Graphs</span>
          </button>

          {/* Player Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-slate-700">Lvl {playerLevel}</span>
            <span className="text-blue-600">{savedXp} XP</span>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => onNavigateArena && onNavigateArena(null)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all transform active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Dashboard</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
