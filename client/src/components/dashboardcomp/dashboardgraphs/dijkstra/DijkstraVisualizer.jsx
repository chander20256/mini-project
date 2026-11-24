import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, SkipForward, SkipBack,
  Trophy, CheckCircle2, Network, Info, Sparkles, ChevronLeft, ChevronRight, X, MapPin
} from 'lucide-react';
import GraphCodeViewer from '../GraphCodeViewer';
import GraphComplexityDeepDive from '../GraphComplexityDeepDive';

// Weighted graph presets
const weightedPresets = {
  roadmap: {
    name: 'Road Map (6 Cities)',
    nodes: [
      { id: 0, label: '0', x: 100, y: 150 },
      { id: 1, label: '1', x: 230, y: 70 },
      { id: 2, label: '2', x: 230, y: 230 },
      { id: 3, label: '3', x: 370, y: 70 },
      { id: 4, label: '4', x: 370, y: 230 },
      { id: 5, label: '5', x: 500, y: 150 }
    ],
    edges: [
      { u: 0, v: 1, weight: 4 },
      { u: 0, v: 2, weight: 2 },
      { u: 1, v: 2, weight: 1 },
      { u: 1, v: 3, weight: 5 },
      { u: 2, v: 4, weight: 8 },
      { u: 2, v: 3, weight: 10 },
      { u: 3, v: 4, weight: 2 },
      { u: 3, v: 5, weight: 6 },
      { u: 4, v: 5, weight: 3 }
    ]
  },
  highway: {
    name: 'Transit Highway',
    nodes: [
      { id: 0, label: '0', x: 120, y: 80 },
      { id: 1, label: '1', x: 300, y: 80 },
      { id: 2, label: '2', x: 480, y: 80 },
      { id: 3, label: '3', x: 120, y: 230 },
      { id: 4, label: '4', x: 300, y: 230 },
      { id: 5, label: '5', x: 480, y: 230 }
    ],
    edges: [
      { u: 0, v: 1, weight: 3 },
      { u: 1, v: 2, weight: 4 },
      { u: 0, v: 3, weight: 7 },
      { u: 1, v: 4, weight: 2 },
      { u: 2, v: 5, weight: 5 },
      { u: 3, v: 4, weight: 1 },
      { u: 4, v: 5, weight: 2 }
    ]
  }
};

const dijkstraQuizQuestions = [
  {
    question: "1. Why does standard Dijkstra's Algorithm fail on graphs with negative edge weights?",
    options: [
      "Because negative numbers cause an integer underflow in programming languages",
      "Because it greedily assumes once a vertex is finalized, its distance can never decrease — a negative edge later would violate this assumption",
      "Because it only works on directed trees",
      "Because the priority queue cannot accept negative numbers"
    ],
    correct: 1
  },
  {
    question: "2. What is the time complexity of Dijkstra's algorithm implemented with a Min-Heap / Priority Queue?",
    options: ["O(V²)", "O((V + E) log V)", "O(V + E)", "O(E²)"],
    correct: 1
  },
  {
    question: "3. What is the process of 'Edge Relaxation' in Dijkstra's algorithm?",
    options: [
      "Removing edges with large weights from the graph",
      "Updating dist[v] to dist[u] + weight(u, v) if path through u provides a strictly shorter route to v",
      "Reversing the direction of directed edges",
      "Multiplying weights by -1"
    ],
    correct: 1
  },
  {
    question: "4. Which algorithm should be used instead of Dijkstra if the graph contains negative edge weights?",
    options: [
      "Bellman-Ford Algorithm (or Floyd-Warshall for all pairs)",
      "Kruskal's Algorithm",
      "Breadth-First Search",
      "Topological Sort"
    ],
    correct: 0
  },
  {
    question: "5. What algorithmic paradigm does Dijkstra's Algorithm follow?",
    options: ["Divide and Conquer", "Greedy Algorithm", "Dynamic Programming with Memoization", "Branch and Bound"],
    correct: 1
  }
];

export default function DijkstraVisualizer({ onBack, onNavigateAlgo }) {
  const [presetKey, setPresetKey] = useState('roadmap');
  const currentPreset = weightedPresets[presetKey];
  const [startNode, setStartNode] = useState(0);

  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [distances, setDistances] = useState({});
  const [settledSet, setSettledSet] = useState([]);
  const [activeLine, setActiveLine] = useState(-1);
  const [stepLog, setStepLog] = useState('Graph ready. Select starting city and click "Start Dijkstra Algorithm".');
  const [speed, setSpeed] = useState(600);
  const [stepTick, setStepTick] = useState(0);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const stepsRef = useRef([]);
  const currentStepIndex = useRef(0);
  const timerRef = useRef(null);

  // Initial distances map
  useEffect(() => {
    const initDist = {};
    currentPreset.nodes.forEach(n => {
      initDist[n.id] = n.id === startNode ? 0 : Infinity;
    });
    setDistances(initDist);
  }, [presetKey, startNode]);

  // Precompute Dijkstra Steps
  const precomputeDijkstraSteps = (source) => {
    const steps = [];
    const dist = {};
    const settled = new Set();
    currentPreset.nodes.forEach(n => { dist[n.id] = Infinity; });
    dist[source] = 0;

    // Step 0: Initialize
    steps.push({
      type: 'init',
      activeNode: source,
      activeEdge: null,
      distances: { ...dist },
      settled: Array.from(settled),
      activeLine: 3,
      msg: `Initialized Dijkstra: Distance to source city ${source} is 0. All other cities set to ∞.`
    });

    const totalNodes = currentPreset.nodes.length;

    while (settled.size < totalNodes) {
      // Find unvisited vertex with minimum tentative distance
      let u = null;
      for (const node of currentPreset.nodes) {
        const id = node.id;
        if (!settled.has(id)) {
          if (u === null || dist[id] < dist[u]) {
            u = id;
          }
        }
      }

      if (u === null || dist[u] === Infinity) {
        break;
      }

      settled.add(u);

      steps.push({
        type: 'settle_node',
        activeNode: u,
        activeEdge: null,
        distances: { ...dist },
        settled: Array.from(settled),
        activeLine: 12,
        msg: `GREEDY CHOICE: Selected node ${u} with minimum known distance (${dist[u]}). Distance is now finalized!`
      });

      // Relax all outgoing edges from u
      const outgoingEdges = currentPreset.edges.filter(e => e.u === u || e.v === u);

      for (const edge of outgoingEdges) {
        const neighbor = edge.u === u ? edge.v : edge.u;
        const weight = edge.weight;

        if (!settled.has(neighbor)) {
          const tentativeDist = dist[u] + weight;

          if (tentativeDist < dist[neighbor]) {
            const oldDist = dist[neighbor];
            dist[neighbor] = tentativeDist;

            steps.push({
              type: 'relax_better',
              activeNode: u,
              activeEdge: [u, neighbor],
              distances: { ...dist },
              settled: Array.from(settled),
              activeLine: 16,
              msg: `RELAXATION SUCCESS: Found shortcut to node ${neighbor} via ${u}! (${dist[u]} + ${weight} = ${tentativeDist} < ${oldDist === Infinity ? '∞' : oldDist}).`
            });
          } else {
            steps.push({
              type: 'relax_worse',
              activeNode: u,
              activeEdge: [u, neighbor],
              distances: { ...dist },
              settled: Array.from(settled),
              activeLine: 14,
              msg: `Checking edge to ${neighbor}: path via ${u} (${dist[u]} + ${weight} = ${tentativeDist}) is NOT shorter than existing (${dist[neighbor]}).`
            });
          }
        }
      }
    }

    steps.push({
      type: 'complete',
      activeNode: null,
      activeEdge: null,
      distances: { ...dist },
      settled: Array.from(settled),
      activeLine: 21,
      msg: `Dijkstra complete! Shortest paths to all reachable vertices finalized.`
    });

    stepsRef.current = steps;
  };

  const handleStartDijkstra = (source = startNode) => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setSettledSet([]);
    precomputeDijkstraSteps(source);
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
        handleStartDijkstra();
      }
    }
  };

  const applyStep = (index) => {
    if (index < 0) {
      currentStepIndex.current = 0;
      setActiveNode(null);
      setActiveEdge(null);
      const initDist = {};
      currentPreset.nodes.forEach(n => {
        initDist[n.id] = n.id === startNode ? 0 : Infinity;
      });
      setDistances(initDist);
      setSettledSet([]);
      setActiveLine(-1);
      setStepLog('Ready to calculate shortest paths with Dijkstra. Click "Start Dijkstra" or "Next".');
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

    setActiveNode(step.activeNode);
    setActiveEdge(step.activeEdge);
    setDistances(step.distances || {});
    setSettledSet(step.settled || []);
    setActiveLine(step.activeLine);
    setStepLog(step.msg);

    if (step.type === 'complete') {
      setIsPlaying(false);
    }

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

  const handleReset = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    currentStepIndex.current = 0;
    setActiveNode(null);
    setActiveEdge(null);
    setSettledSet([]);
    setActiveLine(-1);
    const initDist = {};
    currentPreset.nodes.forEach(n => {
      initDist[n.id] = n.id === startNode ? 0 : Infinity;
    });
    setDistances(initDist);
    setStepLog('Graph reset. Click "Start Dijkstra Algorithm" to run.');
  };

  const handlePresetChange = (key) => {
    handleReset();
    setPresetKey(key);
    setStartNode(0);
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    dijkstraQuizQuestions.forEach((q, idx) => {
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
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Dijkstra's Shortest Path Visualizer
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Greedy &bull; Weighted Edges
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Edge Relaxation &bull; Single-Source Shortest Paths &bull; O((V + E) log V)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateAlgo && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateAlgo('dfs')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev: DFS</span>
              </button>
            </div>
          )}
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
                  Weighted Road Network &bull; {currentPreset.name}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-slate-500">Finalized Shortest:</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-purple-700 rounded-md font-mono font-bold">
                    {settledSet.length} / {currentPreset.nodes.length} Cities
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
                  {/* Edges with weight pills */}
                  {currentPreset.edges.map((edge, idx) => {
                    const nodeU = currentPreset.nodes.find(n => n.id === edge.u);
                    const nodeV = currentPreset.nodes.find(n => n.id === edge.v);
                    if (!nodeU || !nodeV) return null;

                    const isRelaxingEdge = activeEdge && (
                      (activeEdge[0] === edge.u && activeEdge[1] === edge.v) ||
                      (activeEdge[0] === edge.v && activeEdge[1] === edge.u)
                    );

                    const midX = (nodeU.x + nodeV.x) / 2;
                    const midY = (nodeU.y + nodeV.y) / 2;

                    return (
                      <g key={idx}>
                        <line
                          x1={nodeU.x}
                          y1={nodeU.y}
                          x2={nodeV.x}
                          y2={nodeV.y}
                          stroke={isRelaxingEdge ? '#f59e0b' : '#334155'}
                          strokeWidth={isRelaxingEdge ? 4 : 2}
                          strokeDasharray={isRelaxingEdge ? '6 3' : 'none'}
                          strokeLinecap="round"
                          className="transition-colors duration-200"
                        />
                        {/* Weight pill badge */}
                        <circle
                          cx={midX}
                          cy={midY}
                          r={10}
                          fill="#0f172a"
                          stroke={isRelaxingEdge ? '#f59e0b' : '#475569'}
                          strokeWidth="1.5"
                        />
                        <text
                          x={midX}
                          y={midY + 3.5}
                          textAnchor="middle"
                          fill="#f8fafc"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                          className="select-none pointer-events-none"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}

                  {/* Circular Vertices with current minimum distance tag */}
                  {currentPreset.nodes.map((node) => {
                    const isCurrent = activeNode === node.id;
                    const isSettled = settledSet.includes(node.id);
                    const d = distances[node.id];
                    const distDisplay = d === Infinity ? '∞' : d;

                    let fill = 'url(#slateGrad)';
                    let stroke = '#475569';
                    let r = 20;

                    if (isCurrent) {
                      fill = 'url(#amberGrad)';
                      stroke = '#f59e0b';
                      r = 24;
                    } else if (isSettled) {
                      fill = 'url(#emeraldGrad)';
                      stroke = '#10b981';
                      r = 21;
                    }

                    return (
                      <g key={node.id} className="transition-all duration-300">
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isCurrent || isSettled ? 3.5 : 2}
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
                        {/* Distance pill badge floating above node */}
                        <g>
                          <rect
                            x={node.x - 18}
                            y={node.y - 36}
                            width={36}
                            height={16}
                            rx={8}
                            fill={isSettled ? '#047857' : isCurrent ? '#b45309' : '#1e293b'}
                            stroke={isSettled ? '#34d399' : isCurrent ? '#fbbf24' : '#475569'}
                            strokeWidth="1"
                          />
                          <text
                            x={node.x}
                            y={node.y - 24}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            d:{distDisplay}
                          </text>
                        </g>
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
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Real-time Distance Table */}
              <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>Shortest Distance Table (dist[]):</span>
                  </span>
                  <span className="text-[10px] text-purple-400 font-mono">
                    Source: Node {startNode}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {currentPreset.nodes.map((node) => {
                    const isSettled = settledSet.includes(node.id);
                    const isCurr = activeNode === node.id;
                    const d = distances[node.id];

                    return (
                      <div
                        key={node.id}
                        className={`p-2 rounded-xl text-center border font-mono transition-all ${
                          isSettled
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                            : isCurr
                            ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 block">Node {node.label}</span>
                        <span className="text-xs font-bold">{d === Infinity ? '∞' : d}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Node Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-600" /><span>Unsettled</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /><span>Inspecting (u)</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /><span>Shortest Path Locked</span></div>
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
                            : 'Start Dijkstra Algorithm'}
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
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-purple-600" /><span>Complexity Analysis &bull; Dijkstra's Algorithm</span></span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Min-Heap Time</span>
                  <span className="font-mono font-bold text-purple-600 text-sm">O((V+E) log V)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Array Time</span>
                  <span className="font-mono font-bold text-blue-600 text-sm">O(V²)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Auxiliary Space</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">O(V + E)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px] font-medium">Weight Condition</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">Non-Negative</span>
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
                  Road Map Presets:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {Object.keys(weightedPresets).map((key) => (
                    <button
                      key={key}
                      onClick={() => handlePresetChange(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        presetKey === key
                          ? 'bg-purple-600 text-white font-bold shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {weightedPresets[key].name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Starting Source City:
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
            <GraphCodeViewer algoKey="dijkstra" activeLine={activeLine} />

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
                      5 Top Asked MCQs on Dijkstra &bull; +50 XP
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
                Test your conceptual knowledge of Dijkstra edge relaxation, greedy choices, negative edge failures, and priority queue complexity math.
              </p>

              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>{quizScore !== null ? 'Retake Dijkstra Test' : 'Start Interview Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Guide */}
        <GraphComplexityDeepDive algoKey="dijkstra" />
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
                  Dijkstra &bull; Placement Challenge
                </h3>
                <span className="text-xs text-slate-500">
                  Answer all 5 questions to test your depth on Shortest Path algorithms
                </span>
              </div>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {dijkstraQuizQuestions.map((q, qIdx) => (
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
                disabled={Object.keys(quizAnswers).length < dijkstraQuizQuestions.length}
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

