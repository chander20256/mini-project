
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, SkipBack,
  Trophy, CheckCircle2, XCircle, HelpCircle, BarChart3, Info, ChevronRight, ChevronLeft, X
} from 'lucide-react';
import CustomArrayInput from '../CustomArrayInput';
import CodeViewer from '../CodeViewer';
import ComplexityDeepDive from '../ComplexityDeepDive';
import CodeExplanation from '../CodeExplanation';

const bubbleData = {
  name: 'Bubble Sort',
  timeBest: 'O(n)',
  timeAvg: 'O(n²)',
  timeWorst: 'O(n²)',
  space: 'O(1)',
  stable: 'Yes',
  description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger values "bubble" up to the end of the array.',
  code: [
    'for (let i = 0; i < n - 1; i++) {',
    '  for (let j = 0; j < n - i - 1; j++) {',
    '    if (arr[j] > arr[j + 1]) {',
    '      swap(arr[j], arr[j + 1]);',
    '    }',
    '  }',
    '}'
  ],
  questions: [
    {
      question: '1. What is the Best-Case time complexity of an optimized Bubble Sort?',
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      correct: 1,
      explanation: 'With a swapped boolean flag, if no swaps occur during the first pass, the algorithm terminates early in O(n) time.'
    },
    {
      question: '2. Is Bubble Sort a stable sorting algorithm?',
      options: ['Yes, it never swaps equal elements', 'No, equal elements swap positions', 'Only for arrays under 10 elements', 'Depends on compiler'],
      correct: 0,
      explanation: 'Bubble Sort is stable because it only swaps when arr[j] > arr[j+1], preserving the initial relative order of equal elements.'
    },
    {
      question: '3. What is the auxiliary space complexity of Bubble Sort?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correct: 2,
      explanation: 'Bubble Sort is an in-place algorithm that only requires a single temporary variable for swapping, so auxiliary space is O(1).'
    },
    {
      question: '4. In the worst case (reverse sorted array), how many total comparisons are made?',
      options: ['n', 'n - 1', 'n * (n - 1) / 2', '2^n'],
      correct: 2,
      explanation: 'In the worst case, the total number of comparisons is (n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2.'
    },
    {
      question: '5. Which data structure is Bubble Sort especially well-suited for due to adjacent pointer swaps?',
      options: ['Hash Table', 'Singly Linked List', 'Binary Search Tree', 'Min-Heap'],
      correct: 1,
      explanation: 'Because Bubble Sort only compares and swaps adjacent neighbors, it can be implemented cleanly on singly or doubly linked lists without random index access.'
    }
  ]
};

export default function BubbleSort({ onBack, onNavigateAlgo }) {
  const [array, setArray] = useState([45, 82, 19, 95, 54, 28, 70, 36, 61, 12]);
  const initialArrayRef = useRef([45, 82, 19, 95, 54, 28, 70, 36, 61, 12]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(400);
  const [stepLog, setStepLog] = useState('Ready to sort. Click "Start Sort" or "Next" to begin.');
  const [comparisonsCount, setComparisonsCount] = useState(0);
  const [swapsCount, setSwapsCount] = useState(0);
  const [activeLine, setActiveLine] = useState(-1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const stepsRef = useRef([]);
  const currentStepIndex = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    generateNewArray(10);
  }, []);

  const generateNewArray = (size = 10) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    const newArr = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 12);
    }
    initialArrayRef.current = [...newArr];
    setArray(newArr);
    setComparing([]);
    setSwapping([]);
    setSortedIndices([]);
    setStepLog('New array generated. Click "Start Sort" to watch elements bubble up.');
    setComparisonsCount(0);
    setSwapsCount(0);
    setActiveLine(-1);
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizScore(null);
    currentStepIndex.current = 0;
    precomputeSteps(newArr);
  };

  const loadCustomArray = (customArr) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    initialArrayRef.current = [...customArr];
    setArray(customArr);
    setComparing([]);
    setSwapping([]);
    setSortedIndices([]);
    setStepLog(`Custom array of ${customArr.length} elements loaded. Click "Start Sort" to run.`);
    setComparisonsCount(0);
    setSwapsCount(0);
    setActiveLine(-1);
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizScore(null);
    currentStepIndex.current = 0;
    precomputeSteps(customArr);
  };

  const precomputeSteps = (arr) => {
    initialArrayRef.current = [...arr];
    const steps = [];
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;
    const settled = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons += 1;
        steps.push({
          type: 'compare',
          comparing: [j, j + 1],
          swapping: [],
          sortedIndices: [...settled],
          comparisonsCount: comparisons,
          swapsCount: swaps,
          arr: [...a],
          activeLine: 2,
          msg: `Comparing arr[${j}] (${a[j]}) with arr[${j + 1}] (${a[j + 1]})`
        });

        if (a[j] > a[j + 1]) {
          const temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
          swaps += 1;
          steps.push({
            type: 'swap',
            comparing: [],
            swapping: [j, j + 1],
            sortedIndices: [...settled],
            comparisonsCount: comparisons,
            swapsCount: swaps,
            arr: [...a],
            activeLine: 3,
            msg: `Swapped: ${a[j + 1]} > ${a[j]}`
          });
        }
      }
      settled.push(n - 1 - i);
      steps.push({
        type: 'settled',
        comparing: [],
        swapping: [],
        sortedIndices: [...settled],
        comparisonsCount: comparisons,
        swapsCount: swaps,
        arr: [...a],
        activeLine: 0,
        msg: `Element ${a[n - 1 - i]} is bubbled into its sorted position!`
      });
    }
    settled.push(0);
    steps.push({
      type: 'settled',
      comparing: [],
      swapping: [],
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      comparisonsCount: comparisons,
      swapsCount: swaps,
      arr: [...a],
      activeLine: 0,
      msg: 'Bubble Sort completed! All elements sorted.'
    });

    stepsRef.current = steps;
  };

  const applyStep = (index) => {
    if (index < 0) {
      currentStepIndex.current = 0;
      setArray([...initialArrayRef.current]);
      setActiveLine(0);
      setComparing([]);
      setSwapping([]);
      setSortedIndices([]);
      setComparisonsCount(0);
      setSwapsCount(0);
      setStepLog('Ready to start. Click "Start Sort" or "Next" to begin.');
      return;
    }
    if (index >= stepsRef.current.length) {
      setIsPlaying(false);
      setComparing([]);
      setSwapping([]);
      setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
      setStepLog('Sorting complete! All elements placed in sorted order.');
      currentStepIndex.current = stepsRef.current.length;
      return;
    }

    const step = stepsRef.current[index];
    currentStepIndex.current = index + 1;
    setArray([...step.arr]);
    setActiveLine(step.activeLine);
    setStepLog(step.msg);
    setComparing(step.comparing || []);
    setSwapping(step.swapping || []);
    setSortedIndices(step.sortedIndices || []);
    setComparisonsCount(step.comparisonsCount || 0);
    setSwapsCount(step.swapsCount || 0);
  };

  const executeNextStep = () => {
    if (currentStepIndex.current >= stepsRef.current.length) {
      setIsPlaying(false);
      setComparing([]);
      setSwapping([]);
      setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
      setStepLog('Sorting complete! All elements placed in sorted order.');
      return false;
    }
    applyStep(currentStepIndex.current);
    return true;
  };

  const executePrevStep = () => {
    setIsPlaying(false);
    if (currentStepIndex.current <= 1) {
      applyStep(-1);
    } else {
      applyStep(currentStepIndex.current - 2);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        const hasMore = executeNextStep();
        if (!hasMore) setIsPlaying(false);
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, array, speed]);

  const handlePlayPause = () => {
    if (currentStepIndex.current >= stepsRef.current.length) {
      generateNewArray(array.length);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    executeNextStep();
  };

  const handleSelectQuizOption = (qIdx, optIdx) => {
    if (quizScore !== null) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    bubbleData.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correctCount += 1;
    });

    setQuizScore(correctCount);

    const earnedXp = correctCount * 10;
    const currentXp = parseInt(localStorage.getItem('algoarena_xp') || '0', 10);
    localStorage.setItem('algoarena_xp', (currentXp + earnedXp).toString());

    const savedSorts = JSON.parse(localStorage.getItem('algoarena_sort_completed') || '[]');
    if (!savedSorts.includes('bubble')) {
      savedSorts.push('bubble');
      localStorage.setItem('algoarena_sort_completed', JSON.stringify(savedSorts));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Sorting</span>
          </button>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              Bubble Sort &bull; Simulation Arena
            </h1>
          </div>
        </div>

        {onNavigateAlgo && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateAlgo('selection')}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors cursor-pointer"
            >
              <span>Next: Selection Sort</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Status, Simulation, Complexity */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* 1. Live Execution Status Banner (ABOVE Simulation) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  <span>Live Status</span>
                </span>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="text-slate-600">Comparisons: <strong className="text-blue-600">{comparisonsCount}</strong></span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-600">Swaps: <strong className="text-rose-600">{swapsCount}</strong></span>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 font-mono">
                {stepLog}
              </p>
            </div>

            {/* 2. Visual Block Simulation */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-slate-800">Array Blocks Simulation</span>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Bubble Sort
                </span>
              </div>

              <div className="h-72 flex items-end justify-between gap-2.5 px-3 py-6 bg-slate-50/70 rounded-2xl border border-slate-200/70">
                {array.map((val, idx) => {
                  const maxVal = Math.max(...array, 1);
                  const heightPercent = Math.max(14, Math.round((val / maxVal) * 88));
                  const isComparing = comparing.includes(idx);
                  const isSwapping = swapping.includes(idx);
                  const isSorted = sortedIndices.includes(idx);

                  let barColor = 'bg-gradient-to-t from-blue-600 to-indigo-500 text-white';
                  if (isComparing) barColor = 'bg-gradient-to-t from-amber-500 to-amber-300 ring-2 ring-amber-400 scale-105 shadow-md shadow-amber-400/30';
                  if (isSwapping) barColor = 'bg-gradient-to-t from-rose-600 to-rose-400 scale-105 shadow-md shadow-rose-500/30';
                  if (isSorted) barColor = 'bg-gradient-to-t from-emerald-600 to-teal-500 text-white';

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[11px] font-mono font-bold text-slate-600">{val}</span>
                      <div style={{ height: `${heightPercent}%` }} className={`w-full rounded-t-xl transition-all duration-200 ${barColor}`} />
                      <span className="text-[10px] font-mono text-slate-400">[{idx}]</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600" /><span>Unsorted</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" /><span>Comparing</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500" /><span>Swapping</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /><span>Sorted</span></div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    {isPlaying ? <><Pause className="w-4 h-4 fill-current" /><span>Pause</span></> : <><Play className="w-4 h-4 fill-current" /><span>{currentStepIndex.current > 0 ? 'Resume' : 'Start Sort'}</span></>}
                  </button>
                  <button
                    onClick={executePrevStep}
                    disabled={isPlaying || currentStepIndex.current <= 0}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                    title="Previous Step"
                  >
                    <SkipBack className="w-4 h-4" /><span>Prev</span>
                  </button>
                  <button
                    onClick={handleStepForward}
                    disabled={isPlaying || (stepsRef.current.length > 0 && currentStepIndex.current >= stepsRef.current.length)}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                    title="Next Step"
                  >
                    <SkipForward className="w-4 h-4" /><span>Next</span>
                  </button>
                  <button
                    onClick={() => generateNewArray(array.length)}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /><span>Shuffle</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500">Speed:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                    <button onClick={() => setSpeed(700)} className={`px-2 py-1 rounded cursor-pointer ${speed === 700 ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500'}`}>Slow</button>
                    <button onClick={() => setSpeed(350)} className={`px-2 py-1 rounded cursor-pointer ${speed === 350 ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500'}`}>Normal</button>
                    <button onClick={() => setSpeed(120)} className={`px-2 py-1 rounded cursor-pointer ${speed === 120 ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500'}`}>Fast</button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Time & Space Complexity Card (BELOW Simulation) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-blue-600" /><span>Complexity Analysis &bull; Bubble Sort</span></span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Best Time</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">{bubbleData.timeBest}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Average Time</span>
                  <span className="font-mono font-bold text-blue-600 text-sm">{bubbleData.timeAvg}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Worst Time</span>
                  <span className="font-mono font-bold text-rose-600 text-sm">{bubbleData.timeWorst}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Aux Space &amp; Stable</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{bubbleData.space} &bull; {bubbleData.stable}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Input, Code Tracing & Test Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <CustomArrayInput
              onApplyArray={loadCustomArray}
              algoName="Bubble Sort"
            />

            <CodeViewer algoKey="bubble" activeLine={activeLine} />

            {/* Interview Test Card (in empty space) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black shadow-xs">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      Interview Placement Test
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      5 Top Asked MCQs &bull; +50 XP
                    </p>
                  </div>
                </div>

                {quizScore !== null ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{quizScore}/5 Score</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Ready to Test
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Test your understanding of Bubble Sort logic, time complexity, stability, and placement questions.
              </p>

              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Trophy className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>{quizScore !== null ? 'Retake Interview Test' : 'Start Interview Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Explanation Section at the bottom */}
        <ComplexityDeepDive algoKey="bubble" />

        {/* Complete Code Explanation Section */}
        <CodeExplanation algoKey="bubble" />
      </main>

      {/* 5-Question Interview Boss Challenge Modal */}
      {showQuiz && (
        <div
          onClick={() => setShowQuiz(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 relative"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Interview Boss Battle!</h2>
                  <p className="text-xs text-slate-500">5 Most Asked Placement Questions on Bubble Sort</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  +50 Max XP
                </span>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {bubbleData.questions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[qIdx];
                return (
                  <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">{q.question}</h4>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400';
                        if (selectedOpt === optIdx) btnStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-bold';
                        if (quizScore !== null) {
                          if (optIdx === q.correct) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          else if (selectedOpt === optIdx) btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizScore !== null && optIdx === q.correct && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            {quizScore !== null && selectedOpt === optIdx && optIdx !== q.correct && <XCircle className="w-4 h-4 text-rose-600" />}
                          </button>
                        );
                      })}
                    </div>
                    {quizScore !== null && (
                      <div className="mt-3 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900">
                        <strong>Explanation: </strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              {quizScore === null ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < 5}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Submit &amp; View Score
                </button>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Your Score:</span>
                    <div className="text-xl font-black text-slate-900">
                      {quizScore} / 5 Correct <span className="text-emerald-600 text-sm">(+{quizScore * 10} XP)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowQuiz(false);
                      onBack();
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back to All Algorithms
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

