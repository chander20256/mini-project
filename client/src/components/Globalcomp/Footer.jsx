import React from 'react';
import { Swords } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Swords className="w-4 h-4 text-white" />
          </div>
          <span className="text-base tracking-tight">AlgoArena</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
            College Mini Project
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 text-center">
          Interactive DSA Visualizer &bull; Step-by-Step Code Tracing &bull; Top 5 Interview Challenges
        </p>

        <p className="text-xs text-slate-400">
          Auto-saves Level &amp; XP locally
        </p>
      </div>
    </footer>
  );
}
