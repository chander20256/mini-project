import React, { useState } from 'react';
import { BookOpen, ChevronDown, Sparkles, Lightbulb, Network } from 'lucide-react';

const graphDeepDiveData = {
  bfs: {
    title: 'Breadth-First Search (BFS): Deep Dive & Intuitive Breakdown',
    subtitle: 'Concentric ring traversal using a FIFO Queue to find shortest paths in unweighted graphs.',
    analogy: {
      headline: 'The Ripple on a Pond Analogy',
      story: `Imagine tossing a pebble into a calm pond:
1. The initial splash is your Start Node (Level 0).
2. The wave ripples outward, touching all immediate neighbors first (Level 1).
3. The wave continues expanding uniformly outward, touching Level 2, then Level 3...

Because BFS expands equally in all directions at the exact same rate, the first time you reach any node, it is GUARANTEED to be the shortest path (minimum number of edges) from the source!`
    },
    sections: [
      {
        id: 'bfs-time',
        badge: 'Time • O(V + E)',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        title: 'Why BFS Runs in O(V + E) Time',
        content: `• V = Total number of Vertices (nodes). Every reachable vertex is enqueued and dequeued exactly once: O(V).
• E = Total number of Edges. In an adjacency list, every edge is examined at most twice (once from each endpoint in undirected graphs): O(E).
• Combining both gives total linear time complexity: O(V + E).
• Note: If the graph is represented with an Adjacency Matrix instead, scanning rows takes O(V²).`
      },
      {
        id: 'bfs-space',
        badge: 'Space • O(V) Queue & Visited',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        title: 'Memory Complexity & The Visited Set',
        content: `• Queue Memory: In the worst-case scenario (e.g., a Star Graph where the center is connected to every other node), the queue holds up to O(V) nodes simultaneously.
• Visited Set: Needs to remember up to V vertices so we never loop infinitely on cycles.
• Total Auxiliary Space: O(V).`
      },
      {
        id: 'bfs-traps',
        badge: 'Placement & Exam Traps',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: 'Top 3 Viva & Interview Questions on BFS',
        content: `Q1: Does BFS find the shortest path in weighted graphs?
Ans: NO! BFS only guarantees shortest path in UNWEIGHTED graphs (or graphs where all edge weights are identical). For positive weights, Dijkstra's Algorithm must be used.

Q2: What happens if you forget the "visited" set in a cyclic graph?
Ans: The program enters an INFINITE LOOP because nodes will keep enqueuing each other endlessly until memory runs out!

Q3: Can BFS be used to detect cycles in an undirected graph?
Ans: YES. While traversing, if an adjacent neighbor is already visited and is NOT the parent node that we just came from, a cycle exists!`
      }
    ]
  },
  dfs: {
    title: 'Depth-First Search (DFS): Deep Dive & Intuitive Breakdown',
    subtitle: 'Dive deep along each path using the Call Stack before backtracking.',
    analogy: {
      headline: 'Theseus & The Labyrinth Yarn Thread Analogy',
      story: `Imagine exploring a dark, dangerous underground maze:
1. You tie a spool of thread at the entrance and walk down a corridor as far as you can.
2. When you hit a dead end, you rewind the thread back to the last fork in the path (Backtracking).
3. Then you explore the next unexplored tunnel.

DFS uses the exact same strategy: it dives as deep as possible down one branch until it hits a wall, then backtracks up the recursion stack!`
    },
    sections: [
      {
        id: 'dfs-time',
        badge: 'Time • O(V + E)',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        title: 'Why DFS Runs in O(V + E) Time',
        content: `• Every vertex is visited once and marked: O(V).
• Every edge is traversed once (directed) or twice (undirected): O(E).
• Overall time complexity: O(V + E) using an adjacency list.`
      },
      {
        id: 'dfs-space',
        badge: 'Space • O(V) Call Stack',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        title: 'Recursion Call Stack & Skewed Graphs',
        content: `• In a balanced graph, the recursion stack depth is small.
• In the worst case (a long chain of nodes: 1 → 2 → 3 → ... → V), the call stack depth reaches V frames!
• Auxiliary Space: O(V).`
      },
      {
        id: 'dfs-traps',
        badge: 'Placement & Exam Traps',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: 'Top 3 Viva & Interview Questions on DFS',
        content: `Q1: What are the primary applications of DFS in technical interviews?
Ans: Topological Sorting (Kahn's / DFS postorder), Cycle Detection in Directed Graphs, Finding Strongly Connected Components (Kosaraju / Tarjan), and solving mazes / backtracking problems (N-Queens, Sudoku).

Q2: How do you detect cycles in a DIRECTED graph using DFS?
Ans: By using 3 node states: Unvisited (0), In-Stack / Visiting (1), and Fully Processed (2). If DFS encounters a node currently in state 1 (Back-Edge), a cycle exists!

Q3: Can DFS be implemented without recursion?
Ans: YES, using an explicit LIFO Stack data structure.`
      }
    ]
  },
  dijkstra: {
    title: "Dijkstra's Algorithm: Deep Dive & Greedy Shortest Path",
    subtitle: 'Find shortest paths from a single source in weighted graphs with non-negative edges.',
    analogy: {
      headline: 'The Google Maps GPS Navigator Analogy',
      story: `When Google Maps computes your route from Home to Campus:
1. It considers all roads leaving your house with their travel times (Edge Weights).
2. It greedily expands the quickest intersection first.
3. If taking a new shortcut through an intersection yields a shorter total time than your current route, it updates your estimated arrival time (Edge Relaxation)!

By always choosing the closest unvisited intersection, Dijkstra builds the fastest route to everywhere!`
    },
    sections: [
      {
        id: 'dijkstra-time',
        badge: 'Time • O((V + E) log V)',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        title: "Complexity Math: Min-Heap Priority Queue vs Array",
        content: `1. With a Min-Heap / Priority Queue (Industry Standard):
• Extracting minimum distance vertex: O(log V) performed V times = O(V log V).
• Relaxing edges and inserting updated distance: O(log V) performed E times = O(E log V).
• Total Time: O((V + E) log V).

2. With a Simple Array / Linear Scan:
• Finding min vertex: O(V) per vertex = O(V²).
• Edge relaxation: O(1) per edge = O(E).
• Total Time: O(V²). (Better only for very dense graphs where E ≈ V²).`
      },
      {
        id: 'dijkstra-space',
        badge: 'Space • O(V + E)',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        title: 'Space Complexity Breakdown',
        content: `• Distance Table: O(V) memory to hold shortest known distances.
• Priority Queue: Holds up to O(E) elements during edge relaxations.
• Visited / Settled Set: O(V) to record finalized vertices.
• Total Space: O(V + E).`
      },
      {
        id: 'dijkstra-traps',
        badge: 'Placement & Exam Traps',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: "Top 3 Viva & Interview Questions on Dijkstra",
        content: `Q1: Why does Dijkstra fail on graphs with NEGATIVE edge weights?
Ans: Because Dijkstra assumes that once a vertex is finalized (extracted from the min-heap), its distance can never decrease. A negative edge later could offer a shorter path, breaking this greedy assumption! (Use Bellman-Ford for negative weights).

Q2: What is the concept of 'Edge Relaxation'?
Ans: Testing whether traveling from source to vertex v through vertex u (dist[u] + weight(u, v)) is strictly smaller than the existing dist[v]. If so, dist[v] is updated!

Q3: Does Dijkstra work on disconnected graphs?
Ans: Yes, vertices unreachable from the source simply retain their distance value of Infinity (∞).`
      }
    ]
  }
};

export default function GraphComplexityDeepDive({ algoKey = 'bfs' }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSection, setOpenSection] = useState(0);

  const data = graphDeepDiveData[algoKey] || graphDeepDiveData.bfs;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs font-sans text-slate-900 mt-6">
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                {data.title}
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Graph Guide
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {data.subtitle}
            </p>
          </div>
        </div>

        <button 
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title={isExpanded ? 'Collapse guide' : 'Expand guide'}
        >
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-6">
          {/* Analogy Box */}
          <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/40 to-slate-50 border border-purple-200/80 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                {data.analogy.headline}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
              {data.analogy.story}
            </p>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-3">
            {data.sections.map((sec, idx) => {
              const isOpen = openSection === idx;

              return (
                <div
                  key={sec.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-purple-300 bg-white shadow-sm' 
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <button
                    onClick={() => setOpenSection(isOpen ? -1 : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${sec.badgeColor}`}>
                        {sec.badge}
                      </span>
                      <span className="font-extrabold text-xs sm:text-sm text-slate-800">
                        {sec.title}
                      </span>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100 font-normal">
                      {sec.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Tip */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Interview Tip: BFS uses a Queue (Level-by-Level); DFS uses a Stack (Depth-First).</span>
            </span>
            <span className="text-purple-700 font-bold">
              AlgoArena Graph Dungeon &bull; Stage 3
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

