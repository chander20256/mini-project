import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, GitFork, Award, CheckCircle2, ChevronRight, Search, 
  PlusCircle, ListOrdered, Binary, Sparkles, BookOpen 
} from 'lucide-react';
import BstInsertion from './bstinsertion/BstInsertion';
import BstSearch from './bstsearch/BstSearch';
import InorderTraversal from './inorder/InorderTraversal';
import PreorderTraversal from './preorder/PreorderTraversal';

const treeAlgorithmsList = [
  {
    id: 'bst_insert',
    name: 'BST Insertion',
    level: 'Beginner',
    badge: 'Divide & Conquer',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    timeBest: 'O(1)',
    timeAvg: 'O(log n)',
    timeWorst: 'O(n)',
    space: 'O(h)',
    property: 'Unique Keys',
    description: 'Recursively inserts elements by routing smaller values to the left subtree and larger values to the right. Preserves BST properties dynamically.',
    icon: PlusCircle,
    colorScheme: 'emerald'
  },
  {
    id: 'bst_search',
    name: 'BST Search',
    level: 'Beginner',
    badge: 'Binary Elimination',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    timeBest: 'O(1)',
    timeAvg: 'O(log n)',
    timeWorst: 'O(n)',
    space: 'O(h)',
    property: 'O(log n) Lookup',
    description: 'Searches for target values by discarding half of the tree on every comparison. Much faster than scanning unsorted arrays.',
    icon: Search,
    colorScheme: 'teal'
  },
  {
    id: 'inorder',
    name: 'Inorder Traversal',
    level: 'Intermediate',
    badge: 'L → Root → R',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    timeBest: 'O(n)',
    timeAvg: 'O(n)',
    timeWorst: 'O(n)',
    space: 'O(h)',
    property: 'Strictly Sorted',
    description: 'Traverses Left Subtree, then visits Root, then traverses Right Subtree. Guarantees strictly sorted ascending output for any valid BST.',
    icon: ListOrdered,
    colorScheme: 'cyan'
  },
  {
    id: 'preorder',
    name: 'Preorder Traversal',
    level: 'Intermediate',
    badge: 'Root → L → R',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    timeBest: 'O(n)',
    timeAvg: 'O(n)',
    timeWorst: 'O(n)',
    space: 'O(h)',
    property: 'Tree Serialization',
    description: 'Visits Root node first before recursively processing Left and Right child hierarchies. Industry standard for tree cloning and JSON serialization.',
    icon: Binary,
    colorScheme: 'indigo'
  }
];

export default function TreeDashboard({ 
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

  // Route to the dedicated algorithm folder component
  if (selectedAlgo === 'bst_insert') {
    return <BstInsertion onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }
  if (selectedAlgo === 'bst_search') {
    return <BstSearch onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }
  if (selectedAlgo === 'inorder') {
    return <InorderTraversal onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }
  if (selectedAlgo === 'preorder') {
    return <PreorderTraversal onBack={() => setSelectedAlgo(null)} onNavigateAlgo={setSelectedAlgo} />;
  }

  // Common Page: All Tree Cards View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <GitFork className="w-5 h-5 text-emerald-600" />
          <h1 className="font-extrabold text-slate-900 text-lg">
            Binary Tree Realm &bull; Stage 2
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>{treeAlgorithmsList.length} Quests Available</span>
        </div>
      </header>

      {/* Main Content: All Tree Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Non-Linear Data Structures
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Select a Tree Quest
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore dynamic node insertions, binary branch searches, and recursive tree traversals with line-by-line tracing.
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

        {/* Tree Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treeAlgorithmsList.map((algo) => {
            const Icon = algo.icon;

            return (
              <div
                key={algo.id}
                onClick={() => setSelectedAlgo(algo.id)}
                className="bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
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
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {algo.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {algo.description}
                  </p>
                </div>

                {/* Metrics Pill Grid */}
                <div>
                  <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Best</span>
                      <span className="text-xs font-mono font-bold text-emerald-600">{algo.timeBest}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Average</span>
                      <span className="text-xs font-mono font-bold text-blue-600">{algo.timeAvg}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Worst</span>
                      <span className="text-xs font-mono font-bold text-rose-600">{algo.timeWorst}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Space</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{algo.space}</span>
                    </div>
                  </div>

                  {/* Launch Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{algo.property}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      <span>Launch Visualizer</span>
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
