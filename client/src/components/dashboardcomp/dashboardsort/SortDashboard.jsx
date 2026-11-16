import React, { useState, useEffect } from 'react';
import { ArrowLeft, BarChart3, Award, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import BubbleSort from './bubblesort/BubbleSort';
import SelectionSort from './selectionsort/SelectionSort';
import InsertionSort from './insertionsort/InsertionSort';
import MergeSort from './mergesort/MergeSort';
import QuickSort from './quicksort/QuickSort';

const algorithmsList = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    level: 'Beginner',
    badge: 'Adjacent Swapping',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    timeBest: 'O(n)',
    timeAvg: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger values "bubble" to the end.',
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    level: 'Beginner',
    badge: 'Minimum Search',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    timeBest: 'O(n²)',
    timeAvg: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: 'No',
    description: 'Divides the array into sorted and unsorted regions, repeatedly finding the minimum element from the unsorted region and moving it to the beginning.',
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    level: 'Intermediate',
    badge: 'Incremental Shift',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    timeBest: 'O(n)',
    timeAvg: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    description: 'Builds the final sorted array one item at a time by shifting elements that are greater than the key to one position ahead.',
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    level: 'Intermediate',
    badge: 'Divide & Conquer',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    timeBest: 'O(n log n)',
    timeAvg: 'O(n log n)',
    timeWorst: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    description: 'Recursively divides the array into two halves, sorts each half, and merges the two sorted halves back together in linear time.',
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    level: 'Advanced',
    badge: 'Pivot Partitioning',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    timeBest: 'O(n log n)',
    timeAvg: 'O(n log n)',
    timeWorst: 'O(n²)',
    space: 'O(log n)',
    stable: 'No',
    description: 'Selects a pivot element, partitions the array so smaller elements move left and larger move right, then recursively sorts sub-partitions.',
  }
];

export default function SortDashboard({ 
  onBack, 
  selectedAlgo: externalSelectedAlgo, 
  onSelectAlgo: externalSetSelectedAlgo 
}) {
  const [internalSelectedAlgo, setInternalSelectedAlgo] = useState(null);
  const selectedAlgo = externalSelectedAlgo !== undefined ? externalSelectedAlgo : internalSelectedAlgo;
  const setSelectedAlgo = externalSetSelectedAlgo || setInternalSelectedAlgo;
  const [completedSorts, setCompletedSorts] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('algoarena_sort_completed') || '[]');
      setCompletedSorts(saved);
    } catch (e) {
      console.error(e);
    }
  }, [selectedAlgo]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedAlgo]);

  // Route to the dedicated algorithm folder component
  if (selectedAlgo === 'bubble') {
    return <BubbleSort onBack={() => setSelectedAlgo(null)} />;
  }
  if (selectedAlgo === 'selection') {
    return <SelectionSort onBack={() => setSelectedAlgo(null)} />;
  }
  if (selectedAlgo === 'insertion') {
    return <InsertionSort onBack={() => setSelectedAlgo(null)} />;
  }
  if (selectedAlgo === 'merge') {
    return <MergeSort onBack={() => setSelectedAlgo(null)} />;
  }
  if (selectedAlgo === 'quick') {
    return <QuickSort onBack={() => setSelectedAlgo(null)} />;
  }

  // Common Page: All Sorting Cards View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h1 className="font-extrabold text-slate-900 text-lg">
            Sorting Arena
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
          <Award className="w-4 h-4 text-blue-600" />
          <span>{completedSorts.length} of {algorithmsList.length} Mastered</span>
        </div>
      </header>

      {/* Main Content: All Sorting Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Select a Sorting Algorithm
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose an algorithm card below to launch its interactive height-block simulation and 5-question interview boss challenge!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithmsList.map((algo) => {
            const isMastered = completedSorts.includes(algo.id);

            return (
              <div
                key={algo.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${algo.badgeColor}`}>
                      {algo.badge}
                    </span>
                    {isMastered ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mastered</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                        {algo.level}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {algo.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed min-h-[56px]">
                    {algo.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Best</span>
                      <span className="text-xs font-mono font-bold text-emerald-600">{algo.timeBest}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Average</span>
                      <span className="text-xs font-mono font-bold text-blue-600">{algo.timeAvg}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Worst</span>
                      <span className="text-xs font-mono font-bold text-rose-600">{algo.timeWorst}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>5 Interview Q's</span>
                  </span>
                  <button
                    onClick={() => setSelectedAlgo(algo.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <span>{isMastered ? 'Practice Again' : 'Start Simulation'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
