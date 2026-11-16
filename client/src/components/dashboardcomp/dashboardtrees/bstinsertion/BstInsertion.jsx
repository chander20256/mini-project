import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, 
  Trophy, CheckCircle2, GitFork, Info, Plus, Sparkles, X 
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

const bstQuizQuestions = [
  {
    question: "1. What is the average time complexity to insert a new node into a balanced Binary Search Tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 1
  },
  {
    question: "2. Under what condition does BST insertion degrade to its worst-case time complexity of O(n)?",
    options: [
      "When the tree has an even number of nodes",
      "When elements are inserted in already sorted (or reverse sorted) order, creating a skewed tree",
      "When elements are negative numbers",
      "When the root node is a prime number"
    ],
    correct: 1
  },
  {
    question: "3. Where does an element smaller than the current root node always get inserted in a standard BST?",
    options: [
      "In the right subtree",
      "In the left subtree",
      "Directly replaces the root",
      "At the first available leaf regardless of value"
    ],
    correct: 1
  },
  {
    question: "4. What is the auxiliary space complexity of recursive BST insertion on a balanced tree of height h?",
    options: ["O(1)", "O(h) which equals O(log n)", "O(n²)", "O(n log n)"],
    correct: 1
  },
  {
    question: "5. How do standard Binary Search Trees handle duplicate values?",
    options: [
      "Duplicates replace the root node",
      "Duplicates are typically ignored or routed consistently to one subtree / stored with count",
      "Duplicates cause a runtime exception in all implementations",
      "Duplicates split the tree into two separate trees"
    ],
    correct: 1
  }
];

export default function BstInsertion({ onBack }) {
  const [treeValues, setTreeValues] = useState([50, 30, 70, 20, 40, 60, 80]);
  const [root, setRoot] = useState(null);
  const [nodesList, setNodesList] = useState([]);
  const [edgesList, setEdgesList] = useState([]);
  const [inputVal, setInputVal] = useState('');
  
  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNodeVal, setActiveNodeVal] = useState(null);
  const [newNodeVal, setNewNodeVal] = useState(null);
  const [activeLine, setActiveLine] = useState(-1);
  const [stepLog, setStepLog] = useState('Tree initialized. Click "Insert Node" or type a value to watch how BST finds its spot.');
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

    // Traverse to collect nodes and edges for SVG
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    computeTreeLayout(treeValues);
  }, []);

  const precomputeInsertSteps = (valToInsert) => {
    const steps = [];
    if (!root) {
      steps.push({
        type: 'insert_root',
        activeVal: valToInsert,
        newVal: valToInsert,
        activeLine: 1,
        msg: `Tree was empty! Inserted ${valToInsert} as the new Root Node.`
      });
      stepsRef.current = steps;
      return;
    }

    let curr = root;
    steps.push({
      type: 'start',
      activeVal: curr.val,
      newVal: null,
      activeLine: 0,
      msg: `Starting insertion of value ${valToInsert} at Root Node (${curr.val}).`
    });

    while (curr) {
      if (valToInsert < curr.val) {
        steps.push({
          type: 'compare_left',
          activeVal: curr.val,
          newVal: null,
          activeLine: 2,
          msg: `${valToInsert} < ${curr.val} → Route to LEFT subtree.`
        });
        if (!curr.left) {
          steps.push({
            type: 'insert',
            activeVal: curr.val,
            newVal: valToInsert,
            activeLine: 1,
            msg: `Found empty spot! Linked ${valToInsert} as left child of ${curr.val}.`
          });
          break;
        }
        curr = curr.left;
      } else if (valToInsert > curr.val) {
        steps.push({
          type: 'compare_right',
          activeVal: curr.val,
          newVal: null,
          activeLine: 4,
          msg: `${valToInsert} > ${curr.val} → Route to RIGHT subtree.`
        });
        if (!curr.right) {
          steps.push({
            type: 'insert',
            activeVal: curr.val,
            newVal: valToInsert,
            activeLine: 1,
            msg: `Found empty spot! Linked ${valToInsert} as right child of ${curr.val}.`
          });
          break;
        }
        curr = curr.right;
      } else {
        steps.push({
          type: 'duplicate',
          activeVal: curr.val,
          newVal: null,
          activeLine: 0,
          msg: `Value ${valToInsert} already exists in the BST! Duplicates ignored.`
        });
        break;
      }
    }

    stepsRef.current = steps;
  };

  const handleStartInsert = (val) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setComparisonsCount(0);
    precomputeInsertSteps(val);
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
        const existingSet = new Set(treeValues);
        const candidates = [25, 65, 15, 35, 55, 85, 18, 45, 95].filter(x => !existingSet.has(x));
        const nextVal = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : Math.floor(Math.random() * 85) + 12;
        handleStartInsert(nextVal);
      }
    }
  };

  const executeNextStep = () => {
    if (currentStepIndex.current >= stepsRef.current.length) {
      setIsPlaying(false);
      setActiveNodeVal(null);
      setNewNodeVal(null);
      setActiveLine(-1);
      return false;
    }

    const step = stepsRef.current[currentStepIndex.current];
    currentStepIndex.current += 1;

    setActiveNodeVal(step.activeVal);
    setNewNodeVal(step.newVal);
    setActiveLine(step.activeLine);
    setStepLog(step.msg);

    if (step.type.startsWith('compare')) {
      setComparisonsCount(c => c + 1);
    }

    if (step.type === 'insert') {
      const updated = [...treeValues, step.newVal];
      setTreeValues(updated);
      computeTreeLayout(updated);
    }

    setStepTick(t => t + 1);
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
  }, [isPlaying, stepTick, speed]);

  const handleAddCustomValue = (e) => {
    e.preventDefault();
    const val = parseInt(inputVal, 10);
    if (isNaN(val) || val < 1 || val > 99) return;
    setInputVal('');
    handleStartInsert(val);
  };

  const handleResetPreset = (presetValues) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    setTreeValues(presetValues);
    computeTreeLayout(presetValues);
    setActiveNodeVal(null);
    setNewNodeVal(null);
    setActiveLine(-1);
    setStepLog('Tree reset to preset. Ready to insert nodes.');
    setComparisonsCount(0);
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    bstQuizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score += 1;
    });
    setQuizScore(score);

    const earnedXp = score * 10;
    const currentXp = parseInt(localStorage.getItem('algoarena_xp') || '0', 10);
    localStorage.setItem('algoarena_xp', (currentXp + earnedXp).toString());

    const savedTrees = JSON.parse(localStorage.getItem('algoarena_trees_completed') || '[]');
    if (!savedTrees.includes('bst_insert')) {
      savedTrees.push('bst_insert');
      localStorage.setItem('algoarena_trees_completed', JSON.stringify(savedTrees));
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
            <span>Back to Tree Quests</span>
          </button>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              BST Insertion &bull; Node Visualizer
            </h1>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Status, SVG Tree, Complexity */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Live Status */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>Live Status</span>
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  Comparisons: <strong className="text-emerald-700">{comparisonsCount}</strong>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 font-mono">
                {stepLog}
              </p>
            </div>

            {/* Tree SVG Visualizer Canvas */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <GitFork className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-800">Hierarchical Node Canvas</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {nodesList.length} Nodes in Tree
                </span>
              </div>

              {/* Responsive SVG Tree Diagram */}
              <div className="h-80 w-full bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-2">
                <svg viewBox="0 0 600 320" className="w-full h-full">
                  {/* Edges / Branches */}
                  {edgesList.map((edge, i) => (
                    <line
                      key={i}
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
                    const isNew = newNodeVal === node.val;

                    let fill = 'url(#emeraldGrad)';
                    let stroke = '#059669';
                    let r = 18;

                    if (isComparing) {
                      fill = 'url(#amberGrad)';
                      stroke = '#f59e0b';
                      r = 22;
                    } else if (isNew) {
                      fill = 'url(#cyanGrad)';
                      stroke = '#06b6d4';
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
                          strokeWidth={isComparing || isNew ? 3 : 2}
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
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Node Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-600" /><span>BST Node</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /><span>Comparing</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-cyan-400" /><span>Inserted Leaf</span></div>
              </div>

              {/* Controls */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
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
                            : 'Start Insert (e.g. 25)'}
                        </span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      const existingSet = new Set(treeValues);
                      const candidates = [15, 25, 35, 45, 55, 65, 85, 18, 95].filter(x => !existingSet.has(x));
                      const nextVal = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : Math.floor(Math.random() * 85) + 12;
                      handleStartInsert(nextVal);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    title="Insert random candidate node"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Random</span>
                  </button>
                  <button
                    onClick={executeNextStep}
                    disabled={isPlaying}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <SkipForward className="w-4 h-4" /><span>Step</span>
                  </button>
                  <button
                    onClick={() => handleResetPreset([50, 30, 70, 20, 40, 60, 80])}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /><span>Reset</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Speed:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                    <button onClick={() => setSpeed(700)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 700 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'}`}>Slow</button>
                    <button onClick={() => setSpeed(400)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 400 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'}`}>Normal</button>
                    <button onClick={() => setSpeed(150)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 150 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'}`}>Fast</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-emerald-600" /><span>Complexity Analysis &bull; BST Insertion</span></span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Best Time</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">O(1)</span>
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
                  <span className="text-slate-500 block text-[11px] font-medium">Call Stack Space</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">O(h)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Input, Code Tracer, and Test Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Custom Input */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Insert Custom Node
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Add a number (1-99) into the BST
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddCustomValue} className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Enter node val (e.g. 25, 65)"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <span>Insert Node</span>
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
            <TreeCodeViewer algoKey="bst_insert" activeLine={activeLine} />

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
                      5 Top Asked MCQs on BST &bull; +50 XP
                    </p>
                  </div>
                </div>

                {quizScore !== null ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{quizScore}/5 Score</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Ready to Test
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Test your conceptual knowledge of BST insertion rules, height skewing, recursion stack limits, and placement interview traps.
              </p>

              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Trophy className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>{quizScore !== null ? 'Retake Interview Test' : 'Start Interview Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Explanation Section */}
        <TreeComplexityDeepDive algoKey="bst_insert" />
      </main>

      {/* 5-Question Interview Test Modal */}
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
                  <h2 className="text-xl font-black text-slate-900">Tree Boss Battle!</h2>
                  <p className="text-xs text-slate-500">5 Most Asked Placement Questions on BST Insertion</p>
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
              {bstQuizQuestions.map((q, qIdx) => {
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
                            onClick={() => {
                              if (quizScore !== null) return;
                              setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizScore !== null && optIdx === q.correct && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              {quizScore === null ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Submit &amp; View Score
                </button>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="font-extrabold text-sm text-slate-900">
                      Score: {quizScore}/5 ({quizScore * 10} XP Earned)
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizScore(null);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Try Again
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

