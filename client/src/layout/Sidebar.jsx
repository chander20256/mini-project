import React, { useState, useEffect } from 'react';
import { 
  Swords, LayoutGrid, BarChart3, GitFork, Network, 
  ArrowLeft, Trophy, Sparkles, X, ChevronRight, ChevronDown, Award, CheckCircle2
} from 'lucide-react';

const sortAlgorithms = [
  { id: 'bubble', name: 'Bubble Sort' },
  { id: 'selection', name: 'Selection Sort' },
  { id: 'insertion', name: 'Insertion Sort' },
  { id: 'merge', name: 'Merge Sort' },
  { id: 'quick', name: 'Quick Sort' }
];

const treeAlgorithms = [
  { id: 'bst_insert', name: 'BST Insertion' },
  { id: 'bst_search', name: 'BST Search' },
  { id: 'inorder', name: 'Inorder Traversal' },
  { id: 'preorder', name: 'Preorder Traversal' }
];

const graphAlgorithms = [
  { id: 'bfs', name: 'Breadth-First Search (BFS)' },
  { id: 'dfs', name: 'Depth-First Search (DFS)' },
  { id: 'cycle_detection', name: 'Cycle Detection (3-Color)' },
  { id: 'dijkstra', name: "Dijkstra's Algorithm" }
];

export default function Sidebar({ 
  activeArena, 
  onSelectArena, 
  selectedAlgo = null, 
  onSelectAlgo, 
  onGoHome, 
  isOpen, 
  onClose 
}) {
  const [xp, setXp] = useState(0);
  const [completedSorts, setCompletedSorts] = useState([]);
  const [isSortExpanded, setIsSortExpanded] = useState(activeArena === 'sort' || activeArena === 'sorting');
  const [isTreeExpanded, setIsTreeExpanded] = useState(activeArena === 'trees');
  const [isGraphExpanded, setIsGraphExpanded] = useState(activeArena === 'graphs');

  useEffect(() => {
    if (activeArena === 'sort' || activeArena === 'sorting') {
      setIsSortExpanded(true);
    }
    if (activeArena === 'trees') {
      setIsTreeExpanded(true);
    }
    if (activeArena === 'graphs') {
      setIsGraphExpanded(true);
    }
  }, [activeArena]);

  useEffect(() => {
    try {
      const savedXp = parseInt(localStorage.getItem('algoarena_xp') || '0', 10);
      const savedSorts = JSON.parse(localStorage.getItem('algoarena_sort_completed') || '[]');
      setXp(savedXp);
      setCompletedSorts(savedSorts);
    } catch (e) {
      console.error(e);
    }
  }, [activeArena]);

  const playerLevel = Math.floor(xp / 100) + 1;
  const progressInLevel = xp % 100;

  const navItems = [
    {
      id: null,
      label: 'Arena Overview',
      icon: LayoutGrid,
      badge: 'All Hubs',
      badgeColor: 'bg-slate-100 text-slate-600'
    },
    {
      id: 'sort',
      label: 'Sorting Arena',
      icon: BarChart3,
      badge: `${completedSorts.length}/5 Done`,
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200'
    },
    {
      id: 'trees',
      label: 'Binary Trees',
      icon: GitFork,
      badge: 'Stage 2',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    },
    {
      id: 'graphs',
      label: 'Graph Dungeon',
      icon: Network,
      badge: 'Stage 3',
      badgeColor: 'bg-purple-50 text-purple-700 border border-purple-200'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 h-screen bg-white border-r border-slate-200 flex flex-col justify-between font-sans transition-transform duration-300 ease-in-out shrink-0 overflow-y-auto
        lg:translate-x-0 lg:sticky lg:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Header / Brand */}
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div 
              onClick={onGoHome}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Swords className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent block leading-none">
                  AlgoArena
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  DSA Game Lab
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gamified Player Card */}
          <div className="p-5 mx-4 mt-5 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-black shadow-xs">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    Player Level {playerLevel}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {xp} Total XP
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-full">
                {progressInLevel}%
              </span>
            </div>

            {/* Mini XP Bar */}
            <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${progressInLevel}%` }}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-6">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Arenas &bull; Game Worlds
            </span>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeArena === item.id;
                const isSort = item.id === 'sort';
                const isTree = item.id === 'trees';
                const isGraph = item.id === 'graphs';

                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      onClick={() => {
                        if (isSort) {
                          if (activeArena !== 'sort') {
                            onSelectArena('sort');
                            if (onSelectAlgo) onSelectAlgo(null);
                            setIsSortExpanded(true);
                          } else {
                            setIsSortExpanded(!isSortExpanded);
                          }
                        } else if (isTree) {
                          if (activeArena !== 'trees') {
                            onSelectArena('trees');
                            if (onSelectAlgo) onSelectAlgo(null);
                            setIsTreeExpanded(true);
                          } else {
                            setIsTreeExpanded(!isTreeExpanded);
                          }
                        } else if (isGraph) {
                          if (activeArena !== 'graphs') {
                            onSelectArena('graphs');
                            if (onSelectAlgo) onSelectAlgo(null);
                            setIsGraphExpanded(true);
                          } else {
                            setIsGraphExpanded(!isGraphExpanded);
                          }
                        } else {
                          onSelectArena(item.id);
                          if (onSelectAlgo) onSelectAlgo(null);
                        }
                        if (onClose && !isSort && !isTree && !isGraph) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        }`}>
                          {item.badge}
                        </span>
                        {(isSort || isTree || isGraph) && (
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            (isSort && isSortExpanded) || (isTree && isTreeExpanded) || (isGraph && isGraphExpanded) ? 'rotate-180' : ''
                          } ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        )}
                      </div>
                    </button>

                    {/* Sorting Algorithms Accordion Sub-list */}
                    {isSort && isSortExpanded && (
                      <div className="ml-4 pl-3 border-l-2 border-slate-200 py-1 space-y-1">
                        <button
                          onClick={() => {
                            onSelectArena('sort');
                            if (onSelectAlgo) onSelectAlgo(null);
                            if (onClose) onClose();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeArena === 'sort' && !selectedAlgo
                              ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            All Sorting Cards
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">5 Algos</span>
                        </button>

                        {sortAlgorithms.map((algo) => {
                          const isMastered = completedSorts.includes(algo.id);
                          const isSelected = activeArena === 'sort' && selectedAlgo === algo.id;

                          return (
                            <button
                              key={algo.id}
                              onClick={() => {
                                onSelectArena('sort');
                                if (onSelectAlgo) onSelectAlgo(algo.id);
                                if (onClose) onClose();
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-400'}`} />
                                <span>{algo.name}</span>
                              </div>

                              {isMastered && (
                                <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Binary Trees Accordion Sub-list */}
                    {isTree && isTreeExpanded && (
                      <div className="ml-4 pl-3 border-l-2 border-slate-200 py-1 space-y-1">
                        <button
                          onClick={() => {
                            onSelectArena('trees');
                            if (onSelectAlgo) onSelectAlgo(null);
                            if (onClose) onClose();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeArena === 'trees' && !selectedAlgo
                              ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            All Tree Quests
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">4 Quests</span>
                        </button>

                        {treeAlgorithms.map((algo) => {
                          const isSelected = activeArena === 'trees' && selectedAlgo === algo.id;

                          return (
                            <button
                              key={algo.id}
                              onClick={() => {
                                onSelectArena('trees');
                                if (onSelectAlgo) onSelectAlgo(algo.id);
                                if (onClose) onClose();
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-400'}`} />
                                <span>{algo.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Graph Dungeon Accordion Sub-list */}
                    {isGraph && isGraphExpanded && (
                      <div className="ml-4 pl-3 border-l-2 border-slate-200 py-1 space-y-1">
                        <button
                          onClick={() => {
                            onSelectArena('graphs');
                            if (onSelectAlgo) onSelectAlgo(null);
                            if (onClose) onClose();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeArena === 'graphs' && !selectedAlgo
                              ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                            All Graph Cards
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">4 Quests</span>
                        </button>

                        {graphAlgorithms.map((algo) => {
                          const isSelected = activeArena === 'graphs' && selectedAlgo === algo.id;

                          return (
                            <button
                              key={algo.id}
                              onClick={() => {
                                onSelectArena('graphs');
                                if (onSelectAlgo) onSelectAlgo(algo.id);
                                if (onClose) onClose();
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-purple-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-400'}`} />
                                <span>{algo.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          {selectedAlgo ? (
            <button
              onClick={() => {
                if (onSelectAlgo) onSelectAlgo(null);
                if (onClose) onClose();
              }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 font-bold text-xs rounded-xl transition-all border cursor-pointer group shadow-xs ${
                activeArena === 'graphs'
                  ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                  : activeArena === 'trees'
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
              }`}
            >
              <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-0.5 transition-transform ${
                activeArena === 'graphs' ? 'text-purple-600' : activeArena === 'trees' ? 'text-emerald-600' : 'text-blue-600'
              }`} />
              <span>
                {activeArena === 'graphs'
                  ? 'Back to Graph Quests'
                  : activeArena === 'trees'
                  ? 'Back to Tree Quests'
                  : 'Back to Sorting Cards'}
              </span>
            </button>
          ) : activeArena && (
            <button
              onClick={() => {
                onSelectArena(null);
                if (onSelectAlgo) onSelectAlgo(null);
                if (onClose) onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-all border border-blue-200 cursor-pointer group shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Arenas Overview</span>
            </button>
          )}

          <button
            onClick={onGoHome}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Return to Home</span>
          </button>
        </div>
      </aside>
    </>
  );
}

