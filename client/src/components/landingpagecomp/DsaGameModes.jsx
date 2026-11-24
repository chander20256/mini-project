import React from 'react';
import { BarChart3, GitFork, Network, ArrowRight } from 'lucide-react';

const arenas = [
  {
    id: 'sorting',
    title: 'Sorting Arena',
    subtitle: 'Blocks & Comparison Playground',
    badge: 'Stage 1 • Unlocked',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: BarChart3,
    gradient: 'from-blue-600 to-indigo-600',
    btnColor: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20',
    description: 'Visualize sorting algorithms using animated height blocks. Follow real-time swap logic and understand O(n²) vs O(n log n) efficiency.',
    algorithms: [
      { name: 'Bubble Sort', time: 'O(n²)' },
      { name: 'Selection Sort', time: 'O(n²)' },
      { name: 'Insertion Sort', time: 'O(n²)' },
      { name: 'Merge Sort', time: 'O(n log n)' },
      { name: 'Quick Sort', time: 'O(n log n)' }
    ]
  },
  {
    id: 'trees',
    title: 'Binary Tree Realm',
    subtitle: 'Hierarchical Node Graphs',
    badge: 'Stage 2 • Trees',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: GitFork,
    gradient: 'from-emerald-600 to-teal-600',
    btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20',
    description: 'Traverse recursive tree nodes visually. Watch Binary Search Tree (BST) insertions, searches, and root balancing in action.',
    algorithms: [
      { name: 'BST Insertion & Search', time: 'O(log n)' },
      { name: 'Inorder Traversal', time: 'O(n)' },
      { name: 'Preorder & Postorder', time: 'O(n)' },
      { name: 'Lowest Common Ancestor', time: 'O(n)' }
    ]
  },
  {
    id: 'graphs',
    title: 'Graph Dungeon',
    subtitle: 'Network Traversals & Pathfinding',
    badge: 'Stage 3 • Graphs',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Network,
    gradient: 'from-purple-600 to-indigo-600',
    btnColor: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20',
    description: 'Explore interconnected nodes. Visualize Breadth-First Search (queue based) and Depth-First Search (stack based) path discovery.',
    algorithms: [
      { name: 'Breadth-First Search (BFS)', time: 'O(V+E)' },
      { name: 'Depth-First Search (DFS)', time: 'O(V+E)' },
      { name: "Dijkstra's Shortest Path", time: 'O(E log V)' }
    ]
  }
];

export default function DsaGameModes({ onSelectArena }) {
  return (
    <section id="modes" className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Game Worlds
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-slate-900">
            Choose Your DSA Arena
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Each arena features interactive animations, step-by-step pseudo-code tracing, and a 5-question interview boss battle!
          </p>
        </div>

        {/* Arenas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {arenas.map((arena) => {
            const Icon = arena.icon;
            return (
              <div
                key={arena.id}
                className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-sm"
              >
                <div>
                  {/* Top Bar: Icon & Stage Badge */}
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
                  <p className="text-xs font-mono text-blue-600 mt-1 font-semibold">
                    {arena.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                    {arena.description}
                  </p>

                  {/* Algorithms Covered */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      Featured Algorithms:
                    </span>
                    <div className="space-y-2">
                      {arena.algorithms.map((algo, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
                          <span className="text-slate-800 font-semibold">{algo.name}</span>
                          <span className="text-[11px] font-mono text-blue-700 font-bold">{algo.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] font-medium text-slate-500">
                    Top 5 Interview Q's
                  </div>
                  <button
                    onClick={() => onSelectArena(arena.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer ${arena.btnColor}`}
                  >
                    <span>Play {arena.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
