import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, 
  Trophy, CheckCircle2, Network, Info, Sparkles, X, AlertTriangle, ShieldCheck
} from 'lucide-react';
import GraphCodeViewer from '../GraphCodeViewer';
import GraphComplexityDeepDive from '../GraphComplexityDeepDive';

// Directed graph presets
const cyclePresets = {
  cyclic: {
    name: 'Directed Graph with Cycle (Loop: 0→1→2→0)',
    hasCycleExpected: true,
    nodes: [
      { id: 0, label: '0', x: 180, y: 90 },
      { id: 1, label: '1', x: 380, y: 90 },
      { id: 2, label: '2', x: 280, y: 220 },
      { id: 3, label: '3', x: 440, y: 220 },
      { id: 4, label: '4', x: 500, y: 120 }
    ],
    edges: [
      { u: 0, v: 1 },
      { u: 1, v: 2 },
      { u: 2, v: 0, isCycleEdge: true }, // Back-Edge completing cycle 0->1->2->0
      { u: 2, v: 3 },
      { u: 3, v: 4 }
    ]
  },
  acyclicDag: {
    name: 'Diamond DAG (Acyclic • No Cycle)',
    hasCycleExpected: false,
    nodes: [
      { id: 0, label: '0', x: 140, y: 150 },
      { id: 1, label: '1', x: 280, y: 80 },
      { id: 2, label: '2', x: 280, y: 220 },
      { id: 3, label: '3', x: 420, y: 150 },
      { id: 4, label: '4', x: 520, y: 150 }
    ],
    edges: [
      { u: 0, v: 1 },
      { u: 0, v: 2 },
      { u: 1, v: 3 },
      { u: 2, v: 3 },
      { u: 3, v: 4 }
    ]
  },
  multiCycle: {
    name: 'Complex Network (Cycle: 1→3→4→1)',
    hasCycleExpected: true,
    nodes: [
      { id: 0, label: '0', x: 120, y: 150 },
      { id: 1, label: '1', x: 240, y: 150 },
      { id: 2, label: '2', x: 240, y: 60 },
      { id: 3, label: '3', x: 380, y: 80 },
      { id: 4, label: '4', x: 380, y: 220 },
      { id: 5, label: '5', x: 500, y: 150 }
    ],
    edges: [
      { u: 0, v: 1 },
      { u: 0, v: 2 },
      { u: 1, v: 3 },
      { u: 3, v: 4 },
      { u: 4, v: 1, isCycleEdge: true }, // Back-Edge!
      { u: 4, v: 5 }
    ]
  }
};

const cycleQuizQuestions = [
  {
    question: "1. Why does a standard 'visited' boolean array fail to correctly detect cycles in DIRECTED graphs?",
    options: [
      "Because directed graphs cannot be represented in memory",
      "Because a diamond branch (e.g. A→B→D and A→C→D) visits D twice via cross-edges without forming a closed directed loop",
      "Because boolean arrays only support up to 10 nodes",
      "Because directed graphs always have cycles"
    ],
    correct: 1
  },
  {
    question: "2. In the 3-Color DFS cycle detection algorithm, what indicates that a cycle has been discovered?",
    options: [
      "Encountering an unvisited White (State 0) node",
      "Encountering a fully explored Black (State 2) node",
      "Encountering a Gray (State 1) node that is currently active in the recursion call stack (Back-Edge)",
      "Reaching a leaf node with zero outgoing edges"
    ],
    correct: 2
  },
  {
    question: "3. What is the time complexity of 3-Color DFS cycle detection on a graph with V vertices and E edges?",
    options: ["O(V)", "O(V + E)", "O(E log V)", "O(V²)"],
    correct: 1
  },
  {
    question: "4. Which BFS-based algorithm can also detect cycles in a directed graph by counting topologically sorted nodes?",
    options: ["Dijkstra's Algorithm", "Kahn's Algorithm (In-degree reduction)", "Prim's Algorithm", "Floyd-Warshall Algorithm"],
    correct: 1
  },
  {
    question: "5. Can standard Disjoint Set Union (Union-Find) detect cycles in a DIRECTED graph?",
    options: [
      "Yes, without any changes",
      "No, standard DSU only detects cycles in undirected graphs because it does not model edge direction",
      "Yes, if the graph is bipartite",
      "Only if edges have weights"
    ],
    correct: 1
  }
];

export default function CycleDetection({ onBack }) {
  const [presetKey, setPresetKey] = useState('cyclic');
  const currentPreset = cyclePresets[presetKey];

  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [cycleEdge, setCycleEdge] = useState(null);
  const [nodeStates, setNodeStates] = useState({}); // 0: White (Unvisited), 1: Gray (In-Stack), 2: Black (Settled)
  const [hasCycleDetected, setHasCycleDetected] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [stepLog, setStepLog] = useState('Directed graph loaded. Click "Start Cycle Detection" to trace Back-Edges.');
  const [speed, setSpeed] = useState(600);
  const [stepTick, setStepTick] = useState(0);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const stepsRef = useRef([]);
  const currentStepIndex = useRef(0);
  const timerRef = useRef(null);

  // Initialize node states
  useEffect(() => {
    const init = {};
    currentPreset.nodes.forEach(n => { init[n.id] = 0; });
    setNodeStates(init);
  }, [presetKey]);

  // Build directed adjacency list
  const buildDirectedAdj = () => {
    const adj = {};
    currentPreset.nodes.forEach(n => { adj[n.id] = []; });
    currentPreset.edges.forEach(e => {
      adj[e.u].push(e.v);
    });
    return adj;
  };

  // Precompute 3-Color DFS Steps
  const precomputeCycleSteps = () => {
    const adj = buildDirectedAdj();
    const steps = [];
    const state = {};
    currentPreset.nodes.forEach(n => { state[n.id] = 0; });

    let cycleFound = false;

    const dfs = (u) => {
      state[u] = 1; // Mark Gray (In call stack)

      steps.push({
        type: 'enter',
        activeNode: u,
        activeEdge: null,
        cycleEdge: null,
        states: { ...state },
        hasCycle: false,
        activeLine: 3,
        msg: `PUSHED node ${u} to call stack (State 1: Gray / Visiting).`
      });

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        if (state[v] === 1) {
          // BACK-EDGE FOUND!
          cycleFound = true;
          steps.push({
            type: 'cycle_found',
            activeNode: u,
            activeEdge: [u, v],
            cycleEdge: [u, v],
            states: { ...state },
            hasCycle: true,
            activeLine: 5,
            msg: `🚨 BACK-EDGE DETECTED: (${u} → ${v})! Node ${v} is already in State 1 (Active in stack). CYCLE CONFIRMED!`
          });
          return true;
        }

        if (state[v] === 0) {
          steps.push({
            type: 'explore_edge',
            activeNode: u,
            activeEdge: [u, v],
            cycleEdge: null,
            states: { ...state },
            hasCycle: false,
            activeLine: 6,
            msg: `Exploring edge (${u} → ${v}). Node ${v} is Unvisited (State 0). Recursing...`
          });

          if (dfs(v)) return true;
        } else if (state[v] === 2) {
          steps.push({
            type: 'cross_edge',
            activeNode: u,
            activeEdge: [u, v],
            cycleEdge: null,
            states: { ...state },
            hasCycle: false,
            activeLine: 4,
            msg: `Cross/Forward edge (${u} → ${v}): Node ${v} is already State 2 (Black / Fully Explored). Not a cycle.`
          });
        }
      }

      state[u] = 2; // Mark Black (Fully processed)

      steps.push({
        type: 'leave',
        activeNode: u,
        activeEdge: null,
        cycleEdge: null,
        states: { ...state },
        hasCycle: false,
        activeLine: 8,
        msg: `FINISHED node ${u}: Marked State 2 (Black / Visited). Popped from call stack.`
      });

      return false;
    };

    // Check all vertices (handles disconnected components)
    for (const node of currentPreset.nodes) {
      if (state[node.id] === 0) {
        if (dfs(node.id)) break;
      }
    }

    if (!cycleFound) {
      steps.push({
        type: 'complete_acyclic',
        activeNode: null,
        activeEdge: null,
        cycleEdge: null,
        states: { ...state },
        hasCycle: false,
        activeLine: 14,
        msg: '✅ Traversal complete: Zero Back-Edges found! The graph is a Directed Acyclic Graph (DAG).'
      });
    }

    stepsRef.current = steps;
  };

  const handleStartDetection = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setCycleEdge(null);
    setHasCycleDetected(false);
    precomputeCycleSteps();
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
        handleStartDetection();
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
    setCycleEdge(step.cycleEdge);
    setNodeStates(step.states);
    setHasCycleDetected(step.hasCycle);
    setActiveLine(step.activeLine);
    setStepLog(step.msg);

    if (step.type === 'cycle_found' || step.type === 'complete_acyclic') {
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
    setCycleEdge(null);
    setHasCycleDetected(false);
    setActiveLine(-1);
    const init = {};
    currentPreset.nodes.forEach(n => { init[n.id] = 0; });
    setNodeStates(init);
    setStepLog('Graph reset. Click "Start Cycle Detection" to run.');
  };

  const handlePresetChange = (key) => {
    handleReset();
    setPresetKey(key);
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    cycleQuizQuestions.forEach((q, idx) => {
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
                  Cycle Detection (3-Color DFS)
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Back-Edge Theorem &bull; O(V + E)
                </span>
              </div>
              <span className="text-xs text-slate-500">
                White (Unvisited) &bull; Gray (In-Stack) &bull; Black (Settled) state machine
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
                  Directed Network &bull; {currentPreset.name}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {hasCycleDetected ? (
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Cycle Detected!</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Checking Graph</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-3.5 rounded-2xl mb-4 text-xs font-medium flex items-center gap-2.5 transition-all ${
                hasCycleDetected 
                  ? 'bg-rose-50 text-rose-800 border border-rose-300 font-bold'
                  : 'bg-purple-50 text-purple-900 border border-purple-200'
              }`}>
                {hasCycleDetected ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-purple-600 shrink-0" />
                )}
                <span className="truncate">{stepLog}</span>
              </div>

              {/* SVG Canvas with Arrowheads */}
              <div className="w-full bg-slate-950 rounded-2xl p-4 overflow-x-auto flex items-center justify-center border border-slate-800 min-h-[320px]">
                <svg
                  viewBox="0 0 600 320"
                  className="w-full max-w-[600px] h-[320px] select-none"
                >
                  <defs>
                    {/* Standard Gray Arrowhead */}
                    <marker
                      id="arrow-default"
                      viewBox="0 0 10 10"
                      refX="26"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                    </marker>

                    {/* Active Traversing Arrowhead (Purple) */}
                    <marker
                      id="arrow-active"
                      viewBox="0 0 10 10"
                      refX="26"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#c084fc" />
                    </marker>

                    {/* Back-Edge Cycle Arrowhead (Rose/Red) */}
                    <marker
                      id="arrow-cycle"
                      viewBox="0 0 10 10"
                      refX="26"
                      refY="5"
                      markerWidth="8"
                      markerHeight="8"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                    </marker>

                    {/* Gradients */}
                    <linearGradient id="slateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>

                  {/* Directed Edges */}
                  {currentPreset.edges.map((edge, idx) => {
                    const nodeU = currentPreset.nodes.find(n => n.id === edge.u);
                    const nodeV = currentPreset.nodes.find(n => n.id === edge.v);
                    if (!nodeU || !nodeV) return null;

                    const isCycle = cycleEdge && cycleEdge[0] === edge.u && cycleEdge[1] === edge.v;
                    const isActive = activeEdge && activeEdge[0] === edge.u && activeEdge[1] === edge.v;

                    let stroke = '#334155';
                    let strokeWidth = 2;
                    let marker = 'url(#arrow-default)';

                    if (isCycle) {
                      stroke = '#f43f5e';
                      strokeWidth = 4;
                      marker = 'url(#arrow-cycle)';
                    } else if (isActive) {
                      stroke = '#c084fc';
                      strokeWidth = 3.5;
                      marker = 'url(#arrow-active)';
                    }

                    return (
                      <line
                        key={idx}
                        x1={nodeU.x}
                        y1={nodeU.y}
                        x2={nodeV.x}
                        y2={nodeV.y}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        markerEnd={marker}
                        strokeDasharray={isCycle ? '6 3' : 'none'}
                        className="transition-colors duration-200"
                      />
                    );
                  })}

                  {/* Circular Vertices with 3-color states */}
                  {currentPreset.nodes.map((node) => {
                    const st = nodeStates[node.id] || 0;
                    const isCurr = activeNode === node.id;

                    let fill = 'url(#slateGrad)';
                    let stroke = '#475569';
                    let r = 20;

                    if (st === 1) { // State 1: Gray / Amber (In Call Stack)
                      fill = 'url(#amberGrad)';
                      stroke = '#f59e0b';
                      r = 23;
                    } else if (st === 2) { // State 2: Black / Emerald (Settled)
                      fill = 'url(#emeraldGrad)';
                      stroke = '#10b981';
                      r = 20;
                    }

                    return (
                      <g key={node.id} className="transition-all duration-300">
                        {/* Active pulsing ring if in stack */}
                        {st === 1 && (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={30}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            className="animate-spin"
                          />
                        )}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isCurr || st === 1 ? 3.5 : 2}
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
                </svg>
              </div>

              {/* 3-State Monitor Table */}
              <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-purple-400" />
                    <span>Vertex State Machine (state[]):</span>
                  </span>
                  <span className="text-[10px] text-purple-400 font-mono">
                    3-Color System
                  </span>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {currentPreset.nodes.map((node) => {
                    const st = nodeStates[node.id] || 0;
                    const label = st === 0 ? '0: White' : st === 1 ? '1: In-Stack' : '2: Black';

                    return (
                      <div
                        key={node.id}
                        className={`p-2 rounded-xl text-center border font-mono transition-all ${
                          st === 1
                            ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 font-bold'
                            : st === 2
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 block">Node {node.label}</span>
                        <span className="text-[11px] font-bold">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Node Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-600" /><span>0: White (Unvisited)</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /><span>1: Gray (In Call Stack)</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /><span>2: Black (Settled)</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500" /><span>Back-Edge (Cycle)</span></div>
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
                            : 'Start Cycle Detection'}
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
                    <button onClick={() => setSpeed(800)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 800 ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}>Slow</button>
                    <button onClick={() => setSpeed(500)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 500 ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}>Normal</button>
                    <button onClick={() => setSpeed(200)} className={`px-2 py-0.5 rounded cursor-pointer ${speed === 200 ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}>Fast</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-purple-600" /><span>Complexity Analysis &bull; Cycle Detection (3-Color DFS)</span></span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Time (Adj List)</span>
                  <span className="font-mono font-bold text-purple-600 text-sm">O(V + E)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Auxiliary Space</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">O(V)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Detection Trigger</span>
                  <span className="font-mono font-bold text-rose-600 text-sm">Back-Edge (1→1)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Directed / Undirected</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">Both Supported</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Presets, Code Viewer, and Test Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Presets */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Network Topologies:
              </span>
              <div className="flex flex-col gap-2">
                {Object.keys(cyclePresets).map((key) => {
                  const p = cyclePresets[key];
                  const isSel = presetKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handlePresetChange(key)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between border ${
                        isSel
                          ? 'bg-purple-600 text-white font-bold border-purple-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{p.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSel 
                          ? 'bg-white/20 text-white' 
                          : p.hasCycleExpected 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {p.hasCycleExpected ? 'Cyclic' : 'DAG (No Cycle)'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code Viewer */}
            <GraphCodeViewer algoKey="cycle_detection" activeLine={activeLine} />

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
                      5 Top Asked MCQs on Cycle Detection &bull; +50 XP
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
                Test your mastery of Back-Edge proofs, 3-Color state machines, Kahn's algorithm cycle check, and OS deadlock resource graphs.
              </p>

              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>{quizScore !== null ? 'Retake Cycle Detection Test' : 'Start Interview Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Guide */}
        <GraphComplexityDeepDive algoKey="cycle_detection" />
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
                  Cycle Detection &bull; Placement Challenge
                </h3>
                <span className="text-xs text-slate-500">
                  Answer all 5 questions to test your depth on Graph Cycles
                </span>
              </div>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {cycleQuizQuestions.map((q, qIdx) => (
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
                disabled={Object.keys(quizAnswers).length < cycleQuizQuestions.length}
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

