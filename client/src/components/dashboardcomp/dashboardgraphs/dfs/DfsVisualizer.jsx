import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, 
  Trophy, CheckCircle2, Network, Info, Sparkles, X, GitPullRequest
} from 'lucide-react';
import GraphCodeViewer from '../GraphCodeViewer';
import GraphComplexityDeepDive from '../GraphComplexityDeepDive';

// Graph presets
const graphPresets = {
  default: {
    name: 'Classic Web (6 Nodes)',
    nodes: [
      { id: 0, label: '0', x: 120, y: 150 },
      { id: 1, label: '1', x: 220, y: 80 },
      { id: 2, label: '2', x: 220, y: 220 },
      { id: 3, label: '3', x: 380, y: 80 },
      { id: 4, label: '4', x: 380, y: 220 },
      { id: 5, label: '5', x: 480, y: 150 }
    ],
    edges: [
      [0, 1], [0, 2],
      [1, 3], [1, 2],
      [2, 4],
      [3, 4], [3, 5],
      [4, 5]
    ]
  },
  treeDag: {
    name: 'Tree-Like DAG',
    nodes: [
      { id: 0, label: '0', x: 300, y: 60 },
      { id: 1, label: '1', x: 180, y: 140 },
      { id: 2, label: '2', x: 420, y: 140 },
      { id: 3, label: '3', x: 120, y: 240 },
      { id: 4, label: '4', x: 240, y: 240 },
      { id: 5, label: '5', x: 420, y: 240 }
    ],
    edges: [
      [0, 1], [0, 2],
      [1, 3], [1, 4],
      [2, 5],
      [4, 5]
    ]
  },
  cycle: {
    name: 'Ring Cycle',
    nodes: [
      { id: 0, label: '0', x: 200, y: 70 },
      { id: 1, label: '1', x: 400, y: 70 },
      { id: 2, label: '2', x: 490, y: 160 },
      { id: 3, label: '3', x: 400, y: 250 },
      { id: 4, label: '4', x: 200, y: 250 },
      { id: 5, label: '5', x: 110, y: 160 }
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]
    ]
  }
};

const dfsQuizQuestions = [
  {
    question: "1. What fundamental data structure underlies the execution of Depth-First Search (DFS)?",
    options: ["FIFO Queue", "LIFO Stack / Call Stack", "Binary Search Tree", "Disjoint Set Union"],
    correct: 1
  },
  {
    question: "2. What is the time complexity of DFS when using an Adjacency List representation?",
    options: ["O(V)", "O(V + E)", "O(V log E)", "O(V²)"],
    correct: 1
  },
  {
    question: "3. What is 'Backtracking' in the context of DFS?",
    options: [
      "Reversing the entire graph direction",
      "Returning to the previous node along the call stack when a dead-end or visited neighbor is reached",
      "Clearing the visited set",
      "Deleting edges that cause cycles"
    ],
    correct: 1
  },
  {
    question: "4. In a directed graph, which type of DFS edge indicates the presence of a directed cycle?",
    options: [
      "Tree Edge",
      "Forward Edge",
      "Back-Edge (pointing to an ancestor in the active call stack)",
      "Cross Edge"
    ],
    correct: 2
  },
  {
    question: "5. What is the maximum auxiliary space complexity of recursive DFS on a linear chain graph of V vertices?",
    options: ["O(1)", "O(log V)", "O(V)", "O(V²)"],
    correct: 2
  }
];

export default function DfsVisualizer({ onBack }) {
  const [presetKey, setPresetKey] = useState('default');
  const currentPreset = graphPresets[presetKey];
  const [startNode, setStartNode] = useState(0);

  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [callStack, setCallStack] = useState([]);
  const [visitedSet, setVisitedSet] = useState([]);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [activeLine, setActiveLine] = useState(-1);
  const [stepLog, setStepLog] = useState('Graph ready. Select start node or click "Start DFS Traversal".');
  const [speed, setSpeed] = useState(500);
  const [stepTick, setStepTick] = useState(0);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const stepsRef = useRef([]);
  const currentStepIndex = useRef(0);
  const timerRef = useRef(null);

  // Build Adjacency List
  const buildAdjList = () => {
    const adj = {};
    currentPreset.nodes.forEach(n => { adj[n.id] = []; });
    currentPreset.edges.forEach(([u, v]) => {
      adj[u].push(v);
      adj[v].push(u);
    });
    return adj;
  };

  // Precompute DFS steps with call stack snapshots
  const precomputeDfsSteps = (source) => {
    const adj = buildAdjList();
    const steps = [];
    const visited = new Set();
    const stack = [];
    const order = [];

    const dfs = (u, parent = null) => {
      visited.add(u);
      order.push(u);
      stack.push(u);

      steps.push({
        type: 'enter_node',
        activeNode: u,
        activeEdge: parent !== null ? [parent, u] : null,
        stack: [...stack],
        visited: Array.from(visited),
        order: [...order],
        activeLine: 1,
        msg: `DIVED INTO node ${u}! Pushed to call stack. Marking visited.`
      });

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        if (!visited.has(v)) {
          steps.push({
            type: 'explore_edge',
            activeNode: u,
            activeEdge: [u, v],
            stack: [...stack],
            visited: Array.from(visited),
            order: [...order],
            activeLine: 4,
            msg: `Found unvisited neighbor ${v} from node ${u}. Recursing deep down this branch...`
          });
          dfs(v, u);
        } else if (v !== parent) {
          steps.push({
            type: 'skip_edge',
            activeNode: u,
            activeEdge: [u, v],
            stack: [...stack],
            visited: Array.from(visited),
            order: [...order],
            activeLine: 5,
            msg: `Neighbor ${v} is already visited. Backtrack/Cycle check avoided.`
          });
        }
      }

      // Backtracking
      stack.pop();
      steps.push({
        type: 'backtrack',
        activeNode: stack.length > 0 ? stack[stack.length - 1] : null,
        activeEdge: null,
        stack: [...stack],
        visited: Array.from(visited),
        order: [...order],
        activeLine: 6,
        msg: `BACKTRACKING: Finished all branches of node ${u}. Popped ${u} from call stack.`
      });
    };

    dfs(source, null);

    steps.push({
      type: 'complete',
      activeNode: null,
      activeEdge: null,
      stack: [],
      visited: Array.from(visited),
      order: [...order],
      activeLine: 8,
      msg: `DFS Traversal complete! Discovered ${order.length} reachable vertices deep along branches.`
    });

    stepsRef.current = steps;
  };

  const handleStartDfs = (source = startNode) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setCallStack([]);
    setVisitedSet([]);
    setTraversalOrder([]);
    precomputeDfsSteps(source);
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
        handleStartDfs();
      }
    }
  };

  const executeNextStep = () => {
    if (currentStepIndex.current >= stepsRef.current.length) {
      setIsPlaying(false);
      return false;
    }

    const step = stepsRef.current[currentStepIndex.current];
    currentStepIndex.current += 1;

    setActiveNode(step.activeNode);
    setActiveEdge(step.activeEdge);
    setCallStack(step.stack);
    setVisitedSet(step.visited);
    setTraversalOrder(step.order);
    setActiveLine(step.activeLine);
    setStepLog(step.msg);

    if (step.type === 'complete') {
      setIsPlaying(false);
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

  const handleReset = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setActiveNode(null);
    setActiveEdge(null);
    setCallStack([]);
    setVisitedSet([]);
    setTraversalOrder([]);
    setActiveLine(-1);
    setStepLog('Graph reset. Click "Start DFS Traversal" to explore.');
  };

  const handlePresetChange = (key) => {
    handleReset();
    setPresetKey(key);
    setStartNode(0);
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    dfsQuizQuestions.forEach((q, idx) => {
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
            title="Back to Graph Dungeon"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Depth-First Search (DFS) Visualizer
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  LIFO Stack &bull; Backtracking
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Explore deep branches &bull; Backtrack on dead-ends &bull; O(V + E)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
          
          {/* Left Column: SVG Graph Canvas & Controls */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Live Graph Canvas &bull; {currentPreset.name}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-slate-500">Call Stack Depth:</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-purple-700 rounded-md font-mono font-bold">
                    {callStack.length} Frames
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-3.5 rounded-2xl mb-4 text-xs font-medium bg-purple-50 text-purple-900 border border-purple-200 flex items-center gap-2.5">
                <Info className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="truncate">{stepLog}</span>
              </div>

              {/* SVG Canvas */}
              <div className="w-full bg-slate-950 rounded-2xl p-4 overflow-x-auto flex items-center justify-center border border-slate-800 min-h-[320px]">
                <svg
                  viewBox="0 0 600 320"
                  className="w-full max-w-[600px] h-[320px] select-none"
                >
                  {/* Edges */}
                  {currentPreset.edges.map(([u, v], idx) => {
                    const nodeU = currentPreset.nodes.find(n => n.id === u);
                    const nodeV = currentPreset.nodes.find(n => n.id === v);
                    if (!nodeU || !nodeV) return null;

                    const isTraversingEdge = activeEdge && (
                      (activeEdge[0] === u && activeEdge[1] === v) ||
                      (activeEdge[0] === v && activeEdge[1] === u)
                    );

                    return (
                      <line
                        key={idx}
                        x1={nodeU.x}
                        y1={nodeU.y}
                        x2={nodeV.x}
                        y2={nodeV.y}
                        stroke={isTraversingEdge ? '#ec4899' : '#334155'}
                        strokeWidth={isTraversingEdge ? 4 : 2}
                        strokeDasharray={isTraversingEdge ? '6 3' : 'none'}
                        strokeLinecap="round"
                        className="transition-colors duration-200"
                      />
                    );
                  })}

                  {/* Circular Vertices */}
                  {currentPreset.nodes.map((node) => {
                    const isCurrent = activeNode === node.id;
                    const isVisited = visitedSet.includes(node.id);
                    const isInStack = callStack.includes(node.id);

                    let fill = 'url(#slateGrad)';
                    let stroke = '#475569';
                    let r = 20;

                    if (isCurrent) {
                      fill = 'url(#amberGrad)';
                      stroke = '#f59e0b';
                      r = 24;
                    } else if (isInStack) {
                      fill = 'url(#pinkGrad)';
                      stroke = '#ec4899';
                      r = 22;
                    } else if (isVisited) {
                      fill = 'url(#purpleGrad)';
                      stroke = '#8b5cf6';
                      r = 20;
                    }

                    return (
                      <g key={node.id} className="transition-all duration-300">
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isCurrent || isInStack ? 3.5 : 2}
                          className="shadow-lg filter drop-shadow"
                        />
                        <text
                          x={node.x}
                          y={node.y + 4.5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontFamily="monospace"
                          fontWeight="bold"
                          className="select-none pointer-events-none"
                        >
                          {node.label}
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
                    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Call Stack & Visited Path */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* LIFO Call Stack */}
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <GitPullRequest className="w-3.5 h-3.5 text-pink-400" />
                      <span>LIFO Call Stack (Bottom → Top):</span>
                    </span>
                    <span className="text-[10px] text-pink-400 font-mono">
                      Depth: {callStack.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 min-h-[32px] overflow-x-auto">
                    {callStack.length === 0 ? (
                      <span className="text-slate-500 text-xs italic">Stack is empty</span>
                    ) : (
                      callStack.map((val, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/40 font-mono font-bold text-xs rounded-lg animate-in fade-in duration-200"
                        >
                          {val}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Traversal Order */}
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>DFS Visited Order:</span>
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono">
                      {traversalOrder.length} Settled
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 min-h-[32px] overflow-x-auto">
                    {traversalOrder.length === 0 ? (
                      <span className="text-slate-500 text-xs italic">Awaiting start...</span>
                    ) : (
                      traversalOrder.map((val, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold text-xs rounded-lg"
                        >
                          {val}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Node Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-600" /><span>Unvisited</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /><span>Active Frame</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-pink-500" /><span>In Call Stack</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-600" /><span>Processed</span></div>
              </div>

              {/* Controls */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20 transition-all cursor-pointer"
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
                            : 'Start DFS Traversal'}
                        </span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={executeNextStep}
                    disabled={isPlaying}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <SkipForward className="w-4 h-4" /><span>Step</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /><span>Reset</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Speed:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                    <button onClick={() => setSpeed(700)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 700 ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}>Slow</button>
                    <button onClick={() => setSpeed(400)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 400 ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}>Normal</button>
                    <button onClick={() => setSpeed(150)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 150 ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}>Fast</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-purple-600" /><span>Complexity Analysis &bull; Depth-First Search</span></span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Time (Adj List)</span>
                  <span className="font-mono font-bold text-purple-600 text-sm">O(V + E)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Time (Adj Matrix)</span>
                  <span className="font-mono font-bold text-blue-600 text-sm">O(V²)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Auxiliary Space</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">O(V)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Key Strength</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">Backtracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Presets, Start Node, Code Viewer, and Test Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Presets and Start Node */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Graph Presets:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {Object.keys(graphPresets).map((key) => (
                    <button
                      key={key}
                      onClick={() => handlePresetChange(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        presetKey === key
                          ? 'bg-purple-600 text-white font-bold shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {graphPresets[key].name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Starting Source Node:
                </span>
                <div className="flex items-center gap-1.5">
                  {currentPreset.nodes.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        handleReset();
                        setStartNode(n.id);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        startNode === n.id
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Viewer */}
            <GraphCodeViewer algoKey="dfs" activeLine={activeLine} />

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
                      5 Top Asked MCQs on DFS &bull; +50 XP
                    </p>
                  </div>
                </div>

                {quizScore !== null ? (
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{quizScore}/5 Score</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    Ready to Test
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Test your conceptual knowledge of DFS recursion call stacks, backtracking, cycle detection in DAGs, and topological sorting.
              </p>

              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>{quizScore !== null ? 'Retake DFS Test' : 'Start Interview Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Guide */}
        <GraphComplexityDeepDive algoKey="dfs" />
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
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  DFS &bull; Placement Challenge
                </h3>
                <span className="text-xs text-slate-500">
                  Answer all 5 questions to test your depth on Depth-First Search
                </span>
              </div>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {dfsQuizQuestions.map((q, qIdx) => (
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
                              ? 'bg-purple-50 border-purple-500 text-purple-800 font-bold'
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
                disabled={Object.keys(quizAnswers).length < dfsQuizQuestions.length}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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

