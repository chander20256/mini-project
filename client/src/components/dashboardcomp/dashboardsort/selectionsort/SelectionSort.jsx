import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, 
  Trophy, CheckCircle2, XCircle, HelpCircle, BarChart3, Info, X 
} from 'lucide-react';
import CustomArrayInput from '../CustomArrayInput';
import CodeViewer from '../CodeViewer';
import ComplexityDeepDive from '../ComplexityDeepDive';

const selectionData = {
  name: 'Selection Sort',
  timeBest: 'O(n²)',
  timeAvg: 'O(n²)',
  timeWorst: 'O(n²)',
  space: 'O(1)',
  stable: 'No',
  description: 'Divides the array into sorted and unsorted regions, repeatedly finding the minimum element from the unsorted region and moving it to the beginning.',
  code: [
    'for (let i = 0; i < n - 1; i++) {',
    '  let minIdx = i;',
    '  for (let j = i + 1; j < n; j++) {',
    '    if (arr[j] < arr[minIdx]) minIdx = j;',
    '  }',
    '  swap(arr[i], arr[minIdx]);',
    '}'
  ],
  questions: [
    {
      question: '1. Why is Selection Sort’s best-case time complexity still O(n²)?',
      options: ['It uses recursion', 'It always scans the rest of the array to find the minimum', 'It allocates extra memory', 'It sorts backward'],
      correct: 1,
      explanation: 'Even if the array is already sorted, the inner loop must still scan all remaining elements to confirm the minimum value.'
    },
    {
      question: '2. What is the maximum number of swaps performed by Selection Sort?',
      options: ['O(n²)', 'At most n - 1 swaps', 'O(n log n)', 'Zero swaps'],
      correct: 1,
      explanation: 'Selection Sort performs at most one swap per outer loop iteration, making it ideal when writing to memory is very expensive.'
    },
    {
      question: '3. Is standard Selection Sort stable?',
      options: ['Yes', 'No, distant swaps can invert relative order', 'Only for positive integers', 'Always stable'],
      correct: 1,
      explanation: 'Standard Selection Sort is not stable because swapping the minimum element into place can jump over identical elements.'
    },
    {
      question: '4. What is the auxiliary space complexity of Selection Sort?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correct: 0,
      explanation: 'Selection Sort is strictly in-place, requiring only O(1) auxiliary space.'
    },
    {
      question: '5. When might Selection Sort be chosen over Bubble Sort or Quick Sort?',
      options: ['For huge datasets', 'When memory write operations are extremely costly (e.g. Flash EEPROM)', 'When O(n log n) is needed', 'For sorting linked lists'],
      correct: 1,
      explanation: 'Selection Sort makes at most O(n) write/swap operations, whereas Bubble Sort can make up to O(n²) writes.'
    }
  ]
};

export default function SelectionSort({ onBack }) {
  const [array, setArray] = useState([45, 82, 19, 95, 54, 28, 70, 36, 61, 12]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(400);
  const [stepLog, setStepLog] = useState('Ready. Click "Start Sort" to find minimums and place them.');
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
    setArray(newArr);
    setComparing([]);
    setSwapping([]);
    setSortedIndices([]);
    setStepLog('New array generated. Click "Start Sort" to begin.');
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
    const steps = [];
    const a = [...arr];
    const n = a.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: 'compare',
          indices: [j, minIdx],
          arr: [...a],
          activeLine: 3,
          msg: `Scanning arr[${j}] (${a[j]}) vs min arr[${minIdx}] (${a[minIdx]})`
        });
        if (a[j] < a[minIdx]) {
          minIdx = j;
          steps.push({
            type: 'min_found',
            indices: [minIdx],
            arr: [...a],
            activeLine: 3,
            msg: `New minimum at index ${minIdx} (${a[minIdx]})`
          });
        }
      }
      if (minIdx !== i) {
        const temp = a[i];
        a[i] = a[minIdx];
        a[minIdx] = temp;
        steps.push({
          type: 'swap',
          indices: [i, minIdx],
          arr: [...a],
          activeLine: 5,
          msg: `Swapped minimum ${a[i]} into position ${i}`
        });
      }
      steps.push({
        type: 'settled',
        index: i,
        arr: [...a],
        activeLine: 0,
        msg: `Index ${i} (${a[i]}) is placed in sorted region.`
      });
    }
    steps.push({
      type: 'settled',
      index: n - 1,
      arr: [...a],
      activeLine: 0,
      msg: 'Selection Sort completed!'
    });

    stepsRef.current = steps;
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

    const step = stepsRef.current[currentStepIndex.current];
    currentStepIndex.current += 1;

    setArray(step.arr);
    setActiveLine(step.activeLine);
    setStepLog(step.msg);

    if (step.type === 'compare' || step.type === 'min_found') {
      setComparing(step.indices);
      setSwapping([]);
      setComparisonsCount(c => c + 1);
    } else if (step.type === 'swap') {
      setSwapping(step.indices);
      setComparing([]);
      setSwapsCount(s => s + 1);
    } else if (step.type === 'settled') {
      setSortedIndices(prev => Array.from(new Set([...prev, step.index])));
      setComparing([]);
      setSwapping([]);
    }

    return true;
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
    selectionData.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correctCount += 1;
    });

    setQuizScore(correctCount);

    const earnedXp = correctCount * 10;
    const currentXp = parseInt(localStorage.getItem('algoarena_xp') || '0', 10);
    localStorage.setItem('algoarena_xp', (currentXp + earnedXp).toString());

    const savedSorts = JSON.parse(localStorage.getItem('algoarena_sort_completed') || '[]');
    if (!savedSorts.includes('selection')) {
      savedSorts.push('selection');
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
            <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              Selection Sort &bull; Simulation Arena
            </h1>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Live Status Above */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
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

          {/* Simulation Blocks */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-800">Array Blocks Simulation</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Selection Sort
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
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" /><span>Scanning Min</span></div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500" /><span>Swapping</span></div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /><span>Sorted</span></div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  {isPlaying ? <><Pause className="w-4 h-4 fill-current" /><span>Pause</span></> : <><Play className="w-4 h-4 fill-current" /><span>{currentStepIndex.current > 0 ? 'Resume' : 'Start Sort'}</span></>}
                </button>
                <button
                  onClick={handleStepForward}
                  disabled={isPlaying}
                  className="flex items-center gap-1 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" /><span>Step</span>
                </button>
                <button
                  onClick={() => generateNewArray(array.length)}
                  className="flex items-center gap-1 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /><span>Shuffle</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">Speed:</span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                  <button onClick={() => setSpeed(700)} className={`px-2 py-1 rounded cursor-pointer ${speed === 700 ? 'bg-white shadow-xs text-emerald-600' : 'text-slate-500'}`}>Slow</button>
                  <button onClick={() => setSpeed(350)} className={`px-2 py-1 rounded cursor-pointer ${speed === 350 ? 'bg-white shadow-xs text-emerald-600' : 'text-slate-500'}`}>Normal</button>
                  <button onClick={() => setSpeed(120)} className={`px-2 py-1 rounded cursor-pointer ${speed === 120 ? 'bg-white shadow-xs text-emerald-600' : 'text-slate-500'}`}>Fast</button>
                </div>
              </div>
            </div>
          </div>

          {/* Complexity Below */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-emerald-600" /><span>Complexity Analysis &bull; Selection Sort</span></span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px] font-medium">Best Time</span>
                <span className="font-mono font-bold text-rose-600 text-sm">{selectionData.timeBest}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px] font-medium">Average Time</span>
                <span className="font-mono font-bold text-rose-600 text-sm">{selectionData.timeAvg}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px] font-medium">Worst Time</span>
                <span className="font-mono font-bold text-rose-600 text-sm">{selectionData.timeWorst}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px] font-medium">Aux Space &amp; Stable</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{selectionData.space} &bull; {selectionData.stable}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Input, Code Tracing & Test Card */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <CustomArrayInput 
            onApplyArray={loadCustomArray} 
            algoName="Selection Sort" 
          />

          <CodeViewer algoKey="selection" activeLine={activeLine} />

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
              Test your understanding of Selection Sort logic, time complexity, instability, and placement questions.
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
      <ComplexityDeepDive algoKey="selection" />
    </main>

      {/* Quiz Modal */}
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
                  <p className="text-xs text-slate-500">5 Most Asked Placement Questions on Selection Sort</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
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
              {selectionData.questions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[qIdx];
                return (
                  <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">{q.question}</h4>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400';
                        if (selectedOpt === optIdx) btnStyle = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold';
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
                      <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900">
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
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
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
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
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

