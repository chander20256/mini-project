import React, { useState, useEffect } from 'react';
import { 
  BarChart3, GitFork, Network, ArrowRight, Trophy, 
  Sparkles, CheckCircle2, Flame, Award, Zap, LayoutGrid
} from 'lucide-react';

export default function DashboardGlobal({ onSelectArena }) {
  const [completedSorts, setCompletedSorts] = useState([]);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    try {
      const savedSorts = JSON.parse(localStorage.getItem('algoarena_sort_completed') || '[]');
      const savedXp = parseInt(localStorage.getItem('algoarena_xp') || '0', 10);
      setCompletedSorts(savedSorts);
      setXp(savedXp);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const playerLevel = Math.floor(xp / 100) + 1;

  const arenas = [
    {
      id: 'sort',
      title: 'Sorting Arena',
      badge: 'Interactive Blocks',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      gradient: 'from-blue-600 to-indigo-600',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20',
      icon: BarChart3,
      description: 'Watch elements swap in real-time with height-scaled blocks. Master comparison vs divide-and-conquer sorting and ace 5 interview questions.',
      totalAlgos: 5,
      completedCount: completedSorts.length,
      algorithms: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort']
    },
    {
      id: 'trees',
      title: 'Binary Tree Realm',
      badge: 'Hierarchical Nodes',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      gradient: 'from-emerald-600 to-teal-600',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20',
      icon: GitFork,
      description: 'Explore recursive tree nodes. Visualize BST insertions, search paths, and traversals (Inorder, Preorder, Postorder).',
      totalAlgos: 4,
      completedCount: 0,
      algorithms: ['BST Insertion', 'BST Search', 'Inorder Traversal', 'Preorder Traversal']
    },
    {
      id: 'graphs',
      title: 'Graph Dungeon',
      badge: 'Pathfinding & Networks',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      gradient: 'from-purple-600 to-indigo-600',
      btnColor: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20',
      icon: Network,
      description: 'Traverse complex graph networks. Trace Breadth-First Search (queue) and Depth-First Search (stack) discoveries.',
      totalAlgos: 4,
      completedCount: 0,
      algorithms: ['BFS (Queue)', 'DFS (Stack)', "Dijkstra's Algorithm", 'Cycle Detection']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <LayoutGrid className="w-5 h-5 text-blue-600" />
          <h1 className="font-extrabold text-slate-900 text-lg">
            Arena Overview
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Level {playerLevel} &bull; {xp} XP</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Gamified Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-900/10 mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>DSA Battle &amp; Interview Arena</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                Player Hub &bull; Level {playerLevel}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-xl leading-relaxed">
                Select an algorithm below. Watch the block simulation, read every execution step, and answer the 5-question interview boss challenge to earn XP!
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black shadow-md">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-blue-200 font-bold block">
                  Total XP Earned
                </span>
                <span className="text-2xl font-black">
                  {xp} XP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Arena Selection Cards */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Select Your Quest Arena
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Choose an area to start interactive visual tracing and interview quizzes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {arenas.map((arena) => {
            const Icon = arena.icon;
            const percentage = Math.round((arena.completedCount / arena.totalAlgos) * 100);

            return (
              <div
                key={arena.id}
                className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xs"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${arena.gradient} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${arena.badgeColor}`}>
                      {arena.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {arena.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {arena.description}
                  </p>

                  {/* Progress */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-500">Arena Mastery</span>
                      <span className="text-blue-700">{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${arena.gradient} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {arena.completedCount} of {arena.totalAlgos} algorithms mastered
                    </span>
                  </div>

                  {/* Algorithm list */}
                  <div className="mt-5 pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Included Algorithms:
                    </span>
                    <div className="space-y-1.5">
                      {arena.algorithms.map((algo, i) => (
                        <div key={i} className="flex items-center text-xs text-slate-700 gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>{algo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>5 Top Q's / Algo</span>
                  </span>
                  <button
                    onClick={() => onSelectArena(arena.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer ${arena.btnColor}`}
                  >
                    <span>Enter Arena</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

