import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, SkipBack,
  Trophy, CheckCircle2, GitFork, Info, Sparkles, ChevronLeft, ChevronRight, X, Binary
} from 'lucide-react';
import TreeCodeViewer from '../TreeCodeViewer';
import TreeComplexityDeepDive from '../TreeComplexityDeepDive';

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

const preorderQuizQuestions = [
  {
    question: "1. In Preorder Traversal, in what exact order are nodes and subtrees visited?",
    options: [
      "Left Subtree -> Root -> Right Subtree",
      "Root Node -> Left Subtree -> Right Subtree",
      "Left Subtree -> Right Subtree -> Root Node",
      "Right Subtree -> Root -> Left Subtree"
    ],
    correct: 1
  },
  {
    question: "2. Why is Preorder Traversal the primary traversal used for tree cloning or serialization?",
    options: [
      "Because it sorts the elements automatically",
      "Because visiting the root before children allows immediate reconstruction of parent-child relationships",
      "Because it requires zero memory",
      "Because it runs in O(log n) time"
    ],
    correct: 1
  },
  {
    question: "3. What is the first element emitted by any Preorder Traversal?",
    options: [
      "The leftmost leaf node",
      "The root node of the tree",
      "The smallest numerical value",
      "The rightmost leaf node"
    ],
    correct: 1
  },
  {
    question: "4. What is the time complexity of Preorder Traversal on a binary tree with n nodes?",
    options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
    correct: 1
  },
  {
    question: "5. When parsing arithmetic expression trees, which notation corresponds to a Preorder traversal?",
    options: [
      "Postfix notation (Reverse Polish Notation)",
      "Infix notation",
      "Prefix notation (Polish Notation)",
      "Bitwise notation"
    ],
    correct: 2
  }
];

export default function PreorderTraversal({ onBack, onNavigateAlgo }) {
  const [treeValues, setTreeValues] = useState([50, 25, 75, 12, 37, 62, 87]);
  const [root, setRoot] = useState(null);
  const [nodesList, setNodesList] = useState([]);
  const [edgesList, setEdgesList] = useState([]);
  
  // Traversal state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNodeVal, setActiveNodeVal] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [traversalOutput, setTraversalOutput] = useState([]);
  const [activeLine, setActiveLine] = useState(-1);
  const [stepLog, setStepLog] = useState('Tree ready. Click "Start Preorder Traversal" or "Next" to watch Root → Left → Right order.');
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

  // Precompute Preorder Traversal Steps: Root -> L -> R
  const precomputePreorderSteps = (nodeRoot) => {
    const steps = [];
    const outputAcc = [];
    const visitedAcc = [];

    const dfs = (node) => {
      if (!node) {
        steps.push({
          type: 'null',
          activeVal: null,
          activeLine: 1,
          outputSnapshot: [...outputAcc],
          visitedSnapshot: [...visitedAcc],
          msg: 'Reached null leaf node. Returning up call stack.'
        });
        return;
      }

      // Step 1: Visit Root FIRST
      outputAcc.push(node.val);
      visitedAcc.push(node.val);
      steps.push({
        type: 'visit_root',
        activeVal: node.val,
        activeLine: 2,
        visitedVal: node.val,
        visitedSnapshot: [...visitedAcc],
        outputSnapshot: [...outputAcc],
        msg: `ROOT FIRST [${node.val}]! Processed before children (great for cloning/serializing).`
      });

      // Step 2: Visit Left Subtree
      steps.push({
        type: 'descend_left',
        activeVal: node.val,
        activeLine: 3,
        outputSnapshot: [...outputAcc],
        visitedSnapshot: [...visitedAcc],
        msg: `Descending into LEFT child of node ${node.val}...`
      });
      dfs(node.left);

      // Step 3: Visit Right Subtree
      steps.push({
        type: 'descend_right',
        activeVal: node.val,
        activeLine: 4,
        outputSnapshot: [...outputAcc],
        visitedSnapshot: [...visitedAcc],
        msg: `Descending into RIGHT child of node ${node.val}...`
      });
      dfs(node.right);
    };

    if (nodeRoot) dfs(nodeRoot);

    steps.push({
      type: 'complete',
      activeVal: null,
      activeLine: 5,
      outputSnapshot: [...outputAcc],
      visitedSnapshot: [...visitedAcc],
      msg: 'Preorder Traversal complete! Root came first followed by left and right hierarchies.'
    });

    stepsRef.current = steps;
  };

  const handleStartTraversal = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setVisitedNodes([]);
    setTraversalOutput([]);
    precomputePreorderSteps(root);
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
        handleStartTraversal();
      }
    }
  };

  const applyStep = (index) => {
    if (index < 0) {
      currentStepIndex.current = 0;
      setActiveNodeVal(null);
      setActiveLine(-1);
      setVisitedNodes([]);
      setTraversalOutput([]);
      setStepLog('Ready to traverse. Click "Start Preorder" or "Next" to begin.');
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
    setActiveLine(step.activeLine);
    setStepLog(step.msg);
    setTraversalOutput(step.outputSnapshot || []);
    setVisitedNodes(step.visitedSnapshot || []);
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

  const handleResetPreset = (presetValues) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    setTreeValues(presetValues);
    computeTreeLayout(presetValues);
    setActiveNodeVal(null);
    setVisitedNodes([]);
    setTraversalOutput([]);
    setActiveLine(-1);
    setStepLog('Tree reset to preset. Ready to start Preorder Traversal.');
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    preorderQuizQuestions.forEach((q, idx) => {
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
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
              <Binary className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Preorder Traversal (Root &bull; L &bull; R)
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Tree Cloning Order
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Process Root First &bull; Traverse Left Subtree &bull; Traverse Right Subtree
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateAlgo && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateAlgo('inorder')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev: Inorder</span>
              </button>
            </div>
          )}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
            <GitFork className="w-3.5 h-3.5 text-indigo-600" />
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
          
          {/* Left Column: Visualizer Canvas, Output Array & Controls */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step Execution &amp; Output Array
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-slate-500">Processed:</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-indigo-700 rounded-md font-mono font-bold">
                    {visitedNodes.length} / {nodesList.length}
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-3.5 rounded-2xl mb-4 text-xs font-medium bg-indigo-50 text-indigo-900 border border-indigo-200 flex items-center gap-2.5">
                <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="truncate">{stepLog}</span>
              </div>

              {/* SVG Tree Canvas */}
              <div className="w-full bg-slate-950 rounded-2xl p-4 overflow-x-auto flex items-center justify-center border border-slate-800 min-h-[300px]">
                <svg
                  viewBox="0 0 600 300"
                  className="w-full max-w-[600px] h-[300px] select-none"
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
                    const isActive = activeNodeVal === node.val;
                    const isVisited = visitedNodes.includes(node.val);

                    let fill = 'url(#slateGrad)';
                    let stroke = '#475569';
                    let r = 18;

                    if (isActive) {
                      fill = 'url(#amberGrad)';
                      stroke = '#f59e0b';
                      r = 22;
                    } else if (isVisited) {
                      fill = 'url(#indigoGrad)';
                      stroke = '#6366f1';
                      r = 19;
                    }

                    return (
                      <g key={node.val} className="transition-all duration-300">
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isActive ? 3.5 : 2}
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
                    <linearGradient id="slateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Dynamic Traversal Output Array Display */}
              <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Binary className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Preorder Result Array (Root First):</span>
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono">
                    {traversalOutput.length} Elements Emitted
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 min-h-[38px]">
                  {traversalOutput.length === 0 ? (
                    <span className="text-slate-500 text-xs italic">
                      Array will populate as root nodes are processed first...
                    </span>
                  ) : (
                    traversalOutput.map((val, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono font-bold text-xs rounded-lg animate-in fade-in duration-300 shadow-sm"
                      >
                        {val}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Node Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-600" /><span>Unvisited</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /><span>Current Frame</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-600" /><span>Emitted (Preorder)</span></div>
              </div>

              {/* Controls */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
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
                            : 'Start Traversal'}
                        </span>
                      </>
                    )}
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
                    <button onClick={() => setSpeed(700)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 700 ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'}`}>Slow</button>
                    <button onClick={() => setSpeed(400)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 400 ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'}`}>Normal</button>
                    <button onClick={() => setSpeed(150)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 150 ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'}`}>Fast</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-600" /><span>Complexity Analysis &bull; Preorder Traversal</span></span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Time (All Nodes)</span>
                  <span className="font-mono font-bold text-indigo-600 text-sm">O(n)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Balanced Space</span>
                  <span className="font-mono font-bold text-blue-600 text-sm">O(log n)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Skewed Space</span>
                  <span className="font-mono font-bold text-rose-600 text-sm">O(n)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Core Use-Case</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">Clone / Serialize</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Presets, Code Viewer, and Test Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Presets Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Tree Presets
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Switch tree structures to observe how Root-L-R behaves
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleResetPreset([50, 25, 75, 12, 37, 62, 87])}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Balanced BST
                </button>
                <button
                  type="button"
                  onClick={() => handleResetPreset([70, 60, 50, 40, 30])}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Left Skewed (Stick)
                </button>
                <button
                  type="button"
                  onClick={() => handleResetPreset([20, 30, 40, 50, 60])}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Right Skewed (Stick)
                </button>
              </div>
            </div>

            {/* Tree Code Viewer */}
            <TreeCodeViewer algoKey="preorder" activeLine={activeLine} />

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
                      5 Top Asked MCQs on Preorder Traversal &bull; +50 XP
                    </p>
                  </div>
                </div>

                {quizScore !== null ? (
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{quizScore}/5 Score</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                    Ready to Test
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Test your conceptual knowledge of Preorder Traversal, tree serialization, cloning mechanisms, and Polish prefix notation.
              </p>

              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>{quizScore !== null ? 'Retake Preorder Test' : 'Start Interview Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Guide Component */}
        <TreeComplexityDeepDive algoKey="preorder" />
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
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Preorder Traversal &bull; Placement Challenge
                </h3>
                <span className="text-xs text-slate-500">
                  Answer all 5 questions to test your depth on Preorder algorithms
                </span>
              </div>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {preorderQuizQuestions.map((q, qIdx) => (
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
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-800 font-bold'
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
                disabled={Object.keys(quizAnswers).length < preorderQuizQuestions.length}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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

