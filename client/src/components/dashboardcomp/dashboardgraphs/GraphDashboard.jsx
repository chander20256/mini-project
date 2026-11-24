import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Network, Award, ChevronRight, Layers, 
  GitPullRequest, MapPin, Sparkles, AlertTriangle
} from 'lucide-react';
import BfsVisualizer from './bfs/BfsVisualizer';
import DfsVisualizer from './dfs/DfsVisualizer';
import DijkstraVisualizer from './dijkstra/DijkstraVisualizer';
import CycleDetection from './cycledetection/CycleDetection';

const graphAlgorithmsList = [
  {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    level: 'Beginner',
    badge: 'FIFO Queue',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    timeList: 'O(V + E)',
    timeMatrix: 'O(V²)',
    space: 'O(V)',
    property: 'Shortest Unweighted Path',
    description: 'Explores graph neighbor-by-neighbor in concentric rings using a FIFO Queue. Guaranteed to discover the minimum edge path in unweighted networks.',
    icon: Layers
  },
  {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    level: 'Beginner',
    badge: 'LIFO Stack',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    timeList: 'O(V + E)',
    timeMatrix: 'O(V²)',
    space: 'O(V)',
    property: 'Deep Backtracking & Exploration',
    description: 'Dives as deep as possible down each path using the system call stack before backtracking. Core engine for path finding and maze exploration.',
    icon: GitPullRequest
  },
  {
    id: 'cycle_detection',
    name: 'Cycle Detection (3-Color DFS)',
    level: 'Intermediate',
    badge: 'Back-Edge Theorem',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    timeList: 'O(V + E)',
    timeMatrix: 'O(V²)',
    space: 'O(V)',
    property: 'Deadlock & Loop Trap',
    description: 'Detects circular dependencies and closed loops using White/Gray/Black 3-color state machines. Crucial for OS deadlock detection and build tools.',
    icon: AlertTriangle
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Shortest Path",
    level: 'Intermediate',
    badge: 'Greedy Relaxation',
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
    timeList: 'O((V+E) log V)',
    timeMatrix: 'O(V²)',
    space: 'O(V + E)',
    property: 'Optimal Weighted Routing',
    description: 'Finds the single-source shortest path across weighted networks with non-negative edge weights using edge relaxation and greedy min-heap priority queues.',
    icon: MapPin
  }
];

export default function GraphDashboard({ 
  onBack, 
  selectedAlgo: externalSelectedAlgo, 
  onSelectAlgo: externalSetSelectedAlgo 
}) {
  const [internalSelectedAlgo, setInternalSelectedAlgo] = useState(null);
  const selectedAlgo = externalSelectedAlgo !== undefined ? externalSelectedAlgo : internalSelectedAlgo;
  const setSelectedAlgo = externalSetSelectedAlgo || setInternalSelectedAlgo;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedAlgo]);

  // Route to the dedicated visualizer component
  if (selectedAlgo === 'bfs') {
    return <BfsVisualizer onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }
  if (selectedAlgo === 'dfs') {
    return <DfsVisualizer onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }
  if (selectedAlgo === 'cycle_detection') {
    return <CycleDetection onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }
  if (selectedAlgo === 'dijkstra') {
    return <DijkstraVisualizer onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }

  // Common Hub: All Graph Cards View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <Network className="w-5 h-5 text-purple-600" />
          <h1 className="font-extrabold text-slate-900 text-lg">
            Graph Dungeon &bull; Stage 3
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
          <Award className="w-4 h-4 text-purple-600" />
          <span>{graphAlgorithmsList.length} Quests Available</span>
        </div>
      </header>

      {/* Main Content: All Graph Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Network Traversal &amp; Pathfinding
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Select a Graph Algorithm
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore queue-based BFS, recursive backtracking DFS, and greedy Dijkstra shortest-path edge relaxation with interactive line-by-line tracing.
            </p>
          </div>

          <button
            onClick={onBack}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Arenas</span>
          </button>
        </div>

        {/* Graph Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {graphAlgorithmsList.map((algo) => {
            const Icon = algo.icon;

            return (
              <div
                key={algo.id}
                onClick={() => setSelectedAlgo(algo.id)}
                className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Badge & Title */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${algo.badgeColor}`}>
                      {algo.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {algo.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                      {algo.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {algo.description}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div>
                  <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Time (List)</span>
                      <span className="text-xs font-mono font-bold text-purple-600">{algo.timeList}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Time (Matrix)</span>
                      <span className="text-xs font-mono font-bold text-blue-600">{algo.timeMatrix}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Space</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{algo.space}</span>
                    </div>
                  </div>

                  {/* Launch Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span className="truncate">{algo.property}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors shrink-0">
                      <span>Launch</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
