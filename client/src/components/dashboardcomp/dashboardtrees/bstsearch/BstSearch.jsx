import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, SkipBack,
  Trophy, CheckCircle2, GitFork, Info, Search, Sparkles, ChevronLeft, ChevronRight, X, AlertCircle
} from 'lucide-react';
import TreeCodeViewer from '../TreeCodeViewer';
import TreeComplexityDeepDive from '../TreeComplexityDeepDive';
import TreeCodeExplanation from '../TreeCodeExplanation';

// Node helper class for BST
class BSTNode {
  constructor(val, x = 300, y = 50) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
  }
}

const bstSearchQuestions = [
  {
    question: "1. What is the average-case time complexity of searching for a key in a balanced Binary Search Tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 1
  },
  {
    question: "2. Under what condition does BST search degrade to worst-case O(n) linear time?",
    options: [
      "When the tree is a complete binary tree",
      "When the tree is degenerate/skewed into a single linked-list line",
      "When searching for the root node",
      "When keys are floating-point numbers"
    ],
    correct: 1
  },
  {
    question: "3. If the target key is smaller than the current node's value in a BST, which path do you take?",
    options: [
      "Traverse to the right child",
      "Traverse to the left child",
      "Backtrack to the parent node",
      "Search both children simultaneously"
    ],
    correct: 1
  },
  {
    question: "4. What is the best-case time complexity of BST search, and when does it occur?",
    options: [
      "O(1), when the searched key is located directly at the root",
      "O(log n), when the searched key is a leaf",
      "O(n), when the tree is balanced",
      "O(0), when the tree is empty"
    ],
    correct: 0
  },
  {
    question: "5. How does iterative BST search compare with recursive BST search in terms of auxiliary space?",
    options: [
      "Iterative takes O(h) space, Recursive takes O(1)",
      "Iterative takes O(1) auxiliary space, Recursive takes O(h) call stack space",
      "Both require O(n) heap memory",
      "Recursive uses zero memory"
    ],
    correct: 1
  }
];

export default function BstSearch({ onBack, onNavigateAlgo }) {
  const [treeValues, setTreeValues] = useState([50, 25, 75, 12, 37, 62, 87]);
  const [root, setRoot] = useState(null);
  const [nodesList, setNodesList] = useState([]);
  const [edgesList, setEdgesList] = useState([]);
  const [targetInput, setTargetInput] = useState('');
  
  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNodeVal, setActiveNodeVal] = useState(null);
  const [foundNodeVal, setFoundNodeVal] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [stepLog, setStepLog] = useState('Tree initialized. Type a target value and click "Search Target" or "Next".');
  const [comparisonsCount, setComparisonsCount] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [stepTick, setStepTick] = useState(0);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const stepsRef = useRef([]);
  const currentStepIndex = useRef(0);
  const timerRef = useRef(null);

  // Recalculate tree layout
  const computeTreeLayout = (values) => {
    if (!values || values.length === 0) {
      setRoot(null);
      setNodesList([]);
      setEdgesList([]);
      return null;
    }

    let newRoot = new BSTNode(values[0], 300, 50);

    const insertNode = (node, val, x, y, levelOffset) => {
      if (val < node.val) {
        if (!node.left) {
          node.left = new BSTNode(val, x - levelOffset, y + 65);
        } else {
          insertNode(node.left, val, node.left.x, node.left.y, levelOffset * 0.55);
        }
      } else if (val > node.val) {
        if (!node.right) {
          node.right = new BSTNode(val, x + levelOffset, y + 65);
        } else {
          insertNode(node.right, val, node.right.x, node.right.y, levelOffset * 0.55);
        }
      }
    };

    for (let i = 1; i < values.length; i++) {
      insertNode(newRoot, values[i], newRoot.x, newRoot.y, 110);
    }

    const nodes = [];
    const edges = [];

    const traverse = (node) => {
      if (!node) return;
      nodes.push({ val: node.val, x: node.x, y: node.y });
      if (node.left) {
        edges.push({ x1: node.x, y1: node.y, x2: node.left.x, y2: node.left.y });
        traverse(node.left);
      }
      if (node.right) {
        edges.push({ x1: node.x, y1: node.y, x2: node.right.x, y2: node.right.y });
        traverse(node.right);
      }
    };

    traverse(newRoot);
    setRoot(newRoot);
    setNodesList(nodes);
    setEdgesList(edges);
    return newRoot;
  };

  useEffect(() => {
    computeTreeLayout(treeValues);
  }, []);

  // Precompute Search Steps
  const precomputeSearchSteps = (target) => {
    const steps = [];
    let curr = root;
    let comparisons = 0;

    if (!curr) {
      steps.push({
        type: 'empty',
        activeVal: null,
        foundVal: null,
        notFound: true,
        comparisonsCount: 0,
        activeLine: 1,
        msg: `Tree is empty! Target ${target} not found.`
      });
      stepsRef.current = steps;
      return;
    }

    while (curr) {
      comparisons += 1;
      if (target === curr.val) {
        steps.push({
          type: 'found',
          activeVal: curr.val,
          foundVal: curr.val,
          notFound: false,
          comparisonsCount: comparisons,
          activeLine: 1,
          msg: `TARGET FOUND! Node ${curr.val} matches target ${target}!`
        });
        break;
      } else if (target < curr.val) {
        steps.push({
          type: 'compare_left',
          activeVal: curr.val,
          foundVal: null,
          notFound: false,
          comparisonsCount: comparisons,
          activeLine: 2,
          msg: `Target ${target} < ${curr.val} -> Routing LEFT into smaller keys subtree.`
        });
        curr = curr.left;
        if (!curr) {
          steps.push({
            type: 'not_found',
            activeVal: null,
            foundVal: null,
            notFound: true,
            comparisonsCount: comparisons,
            activeLine: 1,
            msg: `Reached null left leaf! Target ${target} does not exist in this BST.`
          });
        }
      } else {
        steps.push({
          type: 'compare_right',
          activeVal: curr.val,
          foundVal: null,
          notFound: false,
          comparisonsCount: comparisons,
          activeLine: 5,
          msg: `Target ${target} > ${curr.val} -> Routing RIGHT into larger keys subtree.`
        });
        curr = curr.right;
        if (!curr) {
          steps.push({
            type: 'not_found',
            activeVal: null,
            foundVal: null,
            notFound: true,
            comparisonsCount: comparisons,
            activeLine: 1,
            msg: `Reached null right leaf! Target ${target} does not exist in this BST.`
          });
        }
      }
    }

    stepsRef.current = steps;
  };

  const handleStartSearch = (target) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setComparisonsCount(0);
    setFoundNodeVal(null);
    setNotFound(false);
    precomputeSearchSteps(target);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearTimeout(timerRef.current);
    } else {
      if (currentStepIndex.current < stepsRef.current.length && stepsRef.current.length > 0) {
        setIsPlaying(true);
      } else {
        const randomTarget = treeValues[Math.floor(Math.random() * treeValues.length)];
        handleStartSearch(randomTarget);
      }
    }
  };

  const applyStep = (index) => {
    if (index < 0) {
      currentStepIndex.current = 0;
      setActiveNodeVal(null);
      setFoundNodeVal(null);
      setNotFound(false);
      setActiveLine(-1);
      setComparisonsCount(0);
      setStepLog(`Ready. Click "Start Search" or "Next" to begin.`);
      setStepTick(t => t + 1);
      return;
    }
    if (index >= stepsRef.current.length) {
      setIsPlaying(false);
      currentStepIndex.current = stepsRef.current.length;
      setStepTick(t => t + 1);
      return;
    }

    const step = stepsRef.current[index];
    currentStepIndex.current = index + 1;
    setActiveNodeVal(step.activeVal);
    setFoundNodeVal(step.foundVal);
    setNotFound(step.notFound);
    setActiveLine(step.activeLine);
    setStepLog(step.msg);
    setComparisonsCount(step.comparisonsCount || 0);
    setStepTick(t => t + 1);
  };

  const executeNextStep = () => {
    if (currentStepIndex.current >= stepsRef.current.length) {
      setIsPlaying(false);
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
  }, [isPlaying, stepTick, speed]);

  const handleCustomSearchSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(targetInput, 10);
    if (isNaN(val)) return;
    setTargetInput('');
    handleStartSearch(val);
  };

  const handleResetPreset = (presetValues) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    setTreeValues(presetValues);
    computeTreeLayout(presetValues);
    setActiveNodeVal(null);
    setFoundNodeVal(null);
    setNotFound(false);
    setActiveLine(-1);
    setStepLog('Tree reset to preset. Ready to search targets.');
    setComparisonsCount(0);
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    bstSearchQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score += 1;
    });
    setQuizScore(score);
    try {
      const prevXp = parseInt(localStorage.getItem('algoarena_xp') || '0', 10);
      localStorage.setItem('algoarena_xp', prevXp + 50);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Back to Tree Realm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  BST Search Visualizer
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  O(log n)
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Binary Search on nodes &bull; Eliminate half of the tree each step
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateAlgo && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateAlgo('bst_insert')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev: BST Insert</span>
              </button>
              <button
                onClick={() => onNavigateAlgo('inorder')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors cursor-pointer"
              >
                <span>Next: Inorder</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200">
            <GitFork className="w-3.5 h-3.5 text-teal-600" />
            <span>{treeValues.length} Nodes</span>
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Interview Test</span>
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Visualizer Canvas & Controls */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Execution State
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-slate-500">Comparisons:</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-teal-700 rounded-md font-mono font-bold">
                    {comparisonsCount}
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-3.5 rounded-2xl mb-4 text-xs font-medium flex items-center gap-2.5 transition-all ${
                foundNodeVal !== null
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'
                  : notFound
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 font-bold'
                  : activeNodeVal !== null
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-slate-50 text-slate-700 border border-slate-200'
              }`}>
                {foundNodeVal !== null ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : notFound ? (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-teal-600 shrink-0" />
                )}
                <span className="truncate">{stepLog}</span>
              </div>

              {/* SVG Tree Canvas */}
              <div className="w-full bg-slate-950 rounded-2xl p-4 overflow-x-auto flex items-center justify-center border border-slate-800 min-h-[340px]">
                <svg
                  viewBox="0 0 600 320"
                  className="w-full max-w-[600px] h-[320px] select-none"
                >
                  {/* Connecting Branches */}
                  {edgesList.map((edge, idx) => (
                    <line
                      key={idx}
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke="#334155"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  ))}

                  {/* Circular Nodes */}
                  {nodesList.map((node) => {
                    const isComparing = activeNodeVal === node.val;
                    const isFound = foundNodeVal === node.val;

                    let fill = 'url(#tealGrad)';
                    let stroke = '#0d9488';
                    let r = 18;

                    if (isFound) {
                      fill = 'url(#emeraldGrad)';
                      stroke = '#10b981';
                      r = 23;
                    } else if (isComparing) {
                      fill = 'url(#amberGrad)';
                      stroke = '#f59e0b';
                      r = 22;
                    }

                    return (
                      <g key={node.val} className="transition-all duration-300">
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isComparing || isFound ? 3.5 : 2}
                          className="shadow-lg filter drop-shadow"
                        />
                        <text
                          x={node.x}
                          y={node.y + 4.5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontFamily="monospace"
                          fontWeight="bold"
                          className="select-none pointer-events-none"
                        >
                          {node.val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Node Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-teal-600" /><span>BST Node</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /><span>Comparing</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /><span>Found Target</span></div>
              </div>

              {/* Controls */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-500/20 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-white" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>
                          {currentStepIndex.current > 0 && currentStepIndex.current < stepsRef.current.length 
                            ? 'Resume' 
                            : 'Start Search Demo'}
                        </span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      const randomTarget = treeValues[Math.floor(Math.random() * treeValues.length)];
                      handleStartSearch(randomTarget);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    title="Search random target"
                  >
                    <Search className="w-4 h-4" />
                    <span>Random</span>
                  </button>
                  <button
                    onClick={executePrevStep}
                    disabled={isPlaying || currentStepIndex.current <= 0}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    title="Previous Step"
                  >
                    <SkipBack className="w-4 h-4" /><span>Prev</span>
                  </button>
                  <button
                    onClick={executeNextStep}
                    disabled={isPlaying || (stepsRef.current.length > 0 && currentStepIndex.current >= stepsRef.current.length)}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    title="Next Step"
                  >
                    <SkipForward className="w-4 h-4" /><span>Next</span>
                  </button>
                  <button
                    onClick={() => handleResetPreset([50, 25, 75, 12, 37, 62, 87])}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /><span>Reset</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Speed:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                    <button onClick={() => setSpeed(700)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 700 ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'}`}>Slow</button>
                    <button onClick={() => setSpeed(400)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 400 ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'}`}>Normal</button>
                    <button onClick={() => setSpeed(150)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 150 ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'}`}>Fast</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-teal-600" /><span>Complexity Analysis &bull; BST Search</span></span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Best Time</span>
                  <span className="font-mono font-bold text-teal-600 text-sm">O(1)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Average Time</span>
                  <span className="font-mono font-bold text-blue-600 text-sm">O(log n)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Worst Time (Skewed)</span>
                  <span className="font-mono font-bold text-rose-600 text-sm">O(n)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Aux Space (Call Stack)</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">O(h)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Search Form, Code Viewer, and Test Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Custom Search Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Search Target Value
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Query any number to trace binary decision branches
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleCustomSearchSubmit} className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="Enter target (e.g. 37, 87, 99)"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <span>Search</span>
                  </button>
                </div>

                {/* Presets */}
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Presets:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleResetPreset([50, 25, 75, 12, 37, 62, 87])}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Balanced BST
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResetPreset([70, 60, 50, 40, 30])}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Left Skewed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResetPreset([20, 30, 40, 50, 60])}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Right Skewed
                  </button>
                </div>
              </form>
            </div>

            {/* Tree Code Viewer */}
            <TreeCodeViewer algoKey="bst_search" activeLine={activeLine} />

            {/* Interview Test Card */}
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
                      5 Top Asked MCQs on BST Search &bull; +50 XP
                    </p>
                  </div>
                </div>

                {quizScore !== null ? (
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{quizScore}/5 Score</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    Ready to Test
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Test your conceptual knowledge of BST Search complexity, worst-case height degenerate scenarios, and iterative vs recursive tradeoffs.
              </p>

              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>{quizScore !== null ? 'Retake BST Search Test' : 'Start Interview Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Guide Component */}
        <TreeComplexityDeepDive algoKey="bst_search" />

        {/* Complete Code Explanation Section */}
        <TreeCodeExplanation algoKey="bst_search" />
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <div 
          onClick={() => setShowQuiz(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative my-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5 pr-8">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  BST Search &bull; Placement Challenge
                </h3>
                <span className="text-xs text-slate-500">
                  Answer all 5 questions to verify your algorithmic understanding
                </span>
              </div>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {bstSearchQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3">
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setShowQuiz(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < bstSearchQuestions.length}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

