import React, { useState } from 'react';
import { 
  Code2, Copy, Check, ChevronDown, Sparkles, Terminal, 
  FileCode, CheckCircle2, ArrowRight, AlertCircle, Info, Zap, HelpCircle, Layers, Network, Compass
} from 'lucide-react';

const graphCodeExplanations = {
  bfs: {
    title: 'Breadth-First Search (BFS): Complete Code & Line-by-Line Logic',
    subtitle: 'Master every line of BFS: FIFO Queue, visited set cycle prevention, neighbor exploration, and level-order discovery.',
    badge: 'GRAPH TRAVERSAL • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `function bfs(graph, start) {
  // 1. Track visited nodes to avoid infinite loops in cyclic graphs
  const visited = new Set([start]);
  // 2. FIFO Queue holds nodes waiting to have their neighbors explored
  const queue = [start];
  const order = [];

  // 3. Process nodes level by level until queue is empty
  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue front element (FIFO)
    order.push(node);

    // 4. Inspect all adjacent neighbors connected by an edge
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor); // Mark visited immediately upon discovery
        queue.push(neighbor);  // Enqueue for next exploration round
      }
    }
  }
  return order;
}`,
        optimizedCode: `// Level-by-Level BFS (Records distances / depths from start)
function bfsWithLevels(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const distance = { [start]: 0 };

  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distance[neighbor] = distance[node] + 1; // Shortest unweighted hop count!
        queue.push(neighbor);
      }
    }
  }
  return distance;
}`,
        linesBreakdown: [
          {
            codeLine: 'function bfs(graph, start)',
            title: 'Line 1: function bfs(graph, start) — The Search Engine Machine',
            badge: 'ENTRY POINT • ABSOLUTE BEGINNER',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares a reusable search function named "bfs" accepting a network "graph" and a starting node "start".',
            keyQuestion: 'What is a graph and what does (graph, start) mean for a non-coder?',
            explanation: '• Imagine a City Road Map or Facebook:\nA Graph is a collection of locations (cities / people) connected by roads (friendships). In JavaScript, graph is stored as an object like { A: ["B", "C"], B: ["D"] }.\n• What is "start"?\nIt is the home address or starting city where your search begins (e.g. node "A").\n• What does BFS do?\nBFS spreads out in ripples like throwing a pebble into a calm pond — it explores all immediate neighbors (distance 1) before exploring neighbors of neighbors (distance 2).',
            invariant: 'Establishes the input network and declares the origin vertex.'
          },
          {
            codeLine: 'const visited = new Set([start]);',
            title: 'Line 2: const visited = new Set([start]); — The Theme Park Hand Stamp',
            badge: 'CYCLE GUARD',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Creates a lookup record "visited" pre-populated with the start node.',
            keyQuestion: 'Why is "visited" strictly mandatory in graphs? What is a Set?',
            explanation: '• Why we MUST track visited:\nUnlike a Tree, a Graph can have CYCLES (e.g., A connects to B, and B connects back to A). Without a visited tracker, the computer would ping-pong between A and B endlessly in an INFINITE LOOP until the browser freezes or crashes!\n• What is a "Set"?\nA Set is a collection of unique items. Checking `visited.has(x)` takes lightning-fast O(1) time.\n• Real-World Analogy:\nWhen entering a theme park, they stamp your hand. Every time you approach an attraction, you check if your hand is stamped so you don\'t pay or wait twice.',
            invariant: 'Ensures each vertex is processed at most once, guaranteeing O(V + E) time.'
          },
          {
            codeLine: 'const queue = [start];',
            title: 'Line 3: const queue = [start]; — The FIFO Waiting Line',
            badge: 'FIFO QUEUE',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Initializes a First-In-First-Out list with the starting node.',
            keyQuestion: 'What is a Queue and why does BFS specifically demand a Queue?',
            explanation: '• What is a Queue?\nThink of people standing in line at a movie ticket counter: the first person to arrive is the first person served (FIFO: First In, First Out).\n• Why a Queue gives Breadth-First behavior:\nWhen you discover new nodes, you add them to the BACK of the line. The nodes from the current layer (distance 1) are at the FRONT, so they are examined before any nodes from the next layer (distance 2) ever get a turn!',
            invariant: 'Maintains monotonic non-decreasing distance ordering: all distance d nodes are processed before distance (d+1).'
          },
          {
            codeLine: 'while (queue.length > 0)',
            title: 'Line 4: while (queue.length > 0) — Processing Loop',
            badge: 'MAIN LOOP',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Repeats exploration instructions as long as there are nodes waiting in line.',
            keyQuestion: 'When does this loop terminate?',
            explanation: '• How the loop behaves:\nEach iteration takes a node from the queue, inspects its neighbors, and enqueues unvisited ones.\n• Termination Condition:\nEventually, all reachable nodes in the graph component have been discovered and popped. When `queue.length === 0`, no frontier nodes remain, and the loop naturally terminates.',
            invariant: 'Halts once all vertices reachable from start have been discovered.'
          },
          {
            codeLine: 'const node = queue.shift();',
            title: 'Line 5: const node = queue.shift(); — Dequeueing the Front Person',
            badge: 'DEQUEUE (FIFO)',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Removes the very first element from the front of the queue.',
            keyQuestion: 'What does "shift()" do? What is the time complexity in practice?',
            explanation: '• What "shift()" does:\nIt removes element index 0 from the array and shifts all remaining elements down by one spot.\n• Viva Tip:\nIn basic JavaScript arrays, `.shift()` is O(n) because of element shifting. In high-performance production code or competitive programming, developers use a true two-pointer Queue or linked-list queue for strict O(1) dequeueing.',
            invariant: 'Selects the oldest discovered node whose neighborhood has not yet been explored.'
          },
          {
            codeLine: 'for (const neighbor of graph[node])',
            title: 'Line 6: for (const neighbor of graph[node]) — Checking All Connected Roads',
            badge: 'NEIGHBOR SCAN',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Loops through every neighbor connected to the current node by an outgoing edge.',
            keyQuestion: 'What is graph[node]? What if a node has zero neighbors?',
            explanation: '• What is graph[node]?\nIn our adjacency list representation, `graph["A"]` returns `["B", "C"]`. The loop examines "B", then examines "C".\n• If a node has no outgoing edges (isolated node or dead end), `graph[node]` is empty `[]`, the loop runs 0 times, and the code smoothly moves on.',
            invariant: 'Explores every incident edge of the currently dequeued vertex.'
          },
          {
            codeLine: 'if (!visited.has(neighbor))',
            title: 'Line 7: if (!visited.has(neighbor)) — The Discovery Check',
            badge: 'UNVISITED GATE',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Checks if this neighbor has already been discovered in an earlier round.',
            keyQuestion: 'What does the exclamation mark "!" mean?',
            explanation: '• What "!" means:\nIn programming, "!" means NOT. So `!visited.has(neighbor)` translates into plain English: "If the neighbor is NOT already in our visited list".\n• If it is already in visited, we do nothing and skip it (preventing infinite loops and duplicate work).',
            invariant: 'Filters out backward edges, cross edges, and previously processed vertices.'
          },
          {
            codeLine: 'visited.add(neighbor); queue.push(neighbor);',
            title: 'Line 8: visited.add(neighbor); queue.push(neighbor); — Marking & Enqueueing',
            badge: 'ENQUEUE & MARK',
            badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
            whatItDoes: 'Instantly marks the neighbor as visited and puts it at the back of the queue.',
            keyQuestion: 'Why must we mark visited BEFORE pushing into queue, not when popping?',
            explanation: '• #1 Most Critical BFS Exam Trap:\nIf you wait to mark visited when popping (`shift()`), multiple nodes pointing to the same neighbor will EACH push duplicate copies of that neighbor into the queue! The queue blows up exponentially and wastes memory. Always mark visited the exact millisecond you discover and push the node.',
            invariant: 'Every vertex enters the queue at most once across the entire algorithm run.'
          },
          {
            codeLine: 'return order;',
            title: 'Line 9: return order; — Returning Level-Order Result',
            badge: 'OUTPUT',
            badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
            whatItDoes: 'Hands back the complete list of nodes visited in breadth-first sequence.',
            keyQuestion: 'What special property does the returned BFS order have?',
            explanation: '• Unweighted Shortest Path Property:\nBecause BFS explores in concentric rings (all distance 1 first, then all distance 2, then distance 3), the order in which a node is first reached is GUARANTEED to be the shortest path from the start node in an unweighted graph!',
            invariant: 'Delivers a full traversal sequence respecting graph connectivity.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `from collections import deque

def bfs(graph, start):
    # 1. Set for O(1) visited checks
    visited = {start}
    # 2. collections.deque provides strict O(1) popleft()
    queue = deque([start])
    order = []

    # 3. Continue while queue has items
    while queue:
        node = queue.popleft() # O(1) front pop
        order.append(node)

        # 4. Explore all neighbor nodes
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)   # Mark immediately
                queue.append(neighbor)  # Push to back

    return order`,
        optimizedCode: `# Python BFS with Shortest Path Parent Backtracking
from collections import deque

def bfs_shortest_path(graph, start, target):
    visited = {start}
    queue = deque([start])
    parent = {start: None}

    while queue:
        curr = queue.popleft()
        if curr == target:
            # Reconstruct path from target back to start
            path = []
            while curr is not None:
                path.append(curr)
                curr = parent[curr]
            return path[::-1] # Reverse to get start -> target

        for neighbor in graph.get(curr, []):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = curr
                queue.append(neighbor)
    return [] # No path exists`,
        linesBreakdown: [
          {
            codeLine: 'from collections import deque',
            title: 'Line 1: from collections import deque — High-Performance Queue',
            badge: 'IMPORT',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Imports Python\'s optimized double-ended queue data structure.',
            keyQuestion: 'Why use "deque" instead of a regular Python list `[]`?',
            explanation: '• In standard Python lists, `list.pop(0)` takes O(n) time because all other elements have to slide over in memory. `deque.popleft()` takes O(1) constant time, making graph searches lightning fast!',
            invariant: 'Enables genuine O(V + E) runtime complexity.'
          },
          {
            codeLine: 'def bfs(graph, start):',
            title: 'Line 2: def bfs(graph, start): — Function Header',
            badge: 'ENTRY POINT',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Defines the BFS search function taking graph adjacency dictionary and starting node.',
            keyQuestion: 'What does "def" mean?',
            explanation: '"def" is Python\'s keyword for "define function". It introduces a block of reusable code.',
            invariant: 'Initializes function scope and binds parameters.'
          },
          {
            codeLine: 'visited = {start}',
            title: 'Line 3: visited = {start} — Hash Set for Visited Nodes',
            badge: 'HASH SET',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Creates a Python `set` containing the start node.',
            keyQuestion: 'Why `{start}` curly braces?',
            explanation: 'Curly braces with single items create a `set` in Python. Checking `x in visited` is an instant O(1) hash lookup.',
            invariant: 'Prevents infinite cycles in cyclic graphs.'
          },
          {
            codeLine: 'queue = deque([start])',
            title: 'Line 4: queue = deque([start]) — Enqueue Start Node',
            badge: 'QUEUE INIT',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Creates a FIFO queue with the start node sitting ready at the front.',
            keyQuestion: 'What is inside the queue at the start?',
            explanation: 'Only the initial node. As we visit its friends, they will be appended to the back.',
            invariant: 'Sets up level 0 exploration.'
          },
          {
            codeLine: 'while queue:',
            title: 'Line 5: while queue: — Loop While Elements Remain',
            badge: 'LOOP',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Runs as long as `queue` has at least 1 element (in Python, an empty container evaluates to False).',
            keyQuestion: 'Why write `while queue:` instead of `while len(queue) > 0:`?',
            explanation: 'Both work identically! In Python, writing `while queue:` is idiomatic ("Pythonic") shorthand.',
            invariant: 'Continues until no reachable undiscovered vertices remain.'
          },
          {
            codeLine: 'node = queue.popleft()',
            title: 'Line 6: node = queue.popleft() — Pulling the Oldest Frontier Node',
            badge: 'FIFO POP',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Pops the leftmost element from the queue in O(1) time.',
            keyQuestion: 'What is the difference between pop() and popleft()?',
            explanation: '`pop()` removes from the RIGHT (Stack / LIFO). `popleft()` removes from the LEFT (Queue / FIFO). For BFS, you MUST use `popleft()`.',
            invariant: 'Maintains breadth-first order (closest nodes processed first).'
          },
          {
            codeLine: 'for neighbor in graph.get(node, []):',
            title: 'Line 7: for neighbor in graph.get(node, []): — Safe Neighbor Iteration',
            badge: 'SAFE LOOP',
            badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
            whatItDoes: 'Iterates through the neighbors of current node, safely handling nodes with no outgoing edges.',
            keyQuestion: 'Why `.get(node, [])` instead of `graph[node]`?',
            explanation: 'If a node has no outgoing edges and is missing from dictionary keys, `.get(node, [])` returns an empty list instead of crashing with a `KeyError`.',
            invariant: 'Safely iterates across all incident outgoing edges.'
          },
          {
            codeLine: 'if neighbor not in visited:',
            title: 'Line 8: if neighbor not in visited: visited.add(neighbor); queue.append(neighbor)',
            badge: 'DISCOVERY',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'If unseen, marks neighbor immediately and appends to the queue.',
            keyQuestion: 'Why append to queue and add to visited together?',
            explanation: 'Marking visited on discovery prevents duplicate queue entries when multiple current nodes share the same neighbor.',
            invariant: 'Vertices are marked visited at the exact time of enqueueing.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `import java.util.*;

public class BFS {
    public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> order = new ArrayList<>();

        visited.add(start);
        queue.offer(start); // Enqueue start node

        while (!queue.isEmpty()) {
            int node = queue.poll(); // Dequeue front element (FIFO)
            order.add(node);

            List<Integer> neighbors = graph.getOrDefault(node, Collections.emptyList());
            for (int neighbor : neighbors) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor); // Mark visited immediately
                    queue.offer(neighbor); // Add to back of queue
                }
            }
        }
        return order;
    }
}`,
        optimizedCode: `// Java BFS Distance Array for unweighted shortest paths
public static int[] bfsDistances(List<List<Integer>> adj, int start, int n) {
    int[] dist = new int[n];
    Arrays.fill(dist, -1);
    Queue<Integer> queue = new LinkedList<>();

    dist[start] = 0;
    queue.offer(start);

    while (!queue.isEmpty()) {
        int u = queue.poll();
        for (int v : adj.get(u)) {
            if (dist[v] == -1) { // Unvisited
                dist[v] = dist[u] + 1;
                queue.offer(v);
            }
        }
    }
    return dist;
}`,
        linesBreakdown: [
          {
            codeLine: 'Queue<Integer> queue = new LinkedList<>();',
            title: 'Line 1: Queue<Integer> queue = new LinkedList<>(); — Queue Interface in Java',
            badge: 'DATA STRUCTURE',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Instantiates a Queue using the LinkedList implementation class.',
            keyQuestion: 'Why can’t we do `new Queue<Integer>()` in Java?',
            explanation: 'In Java, `Queue` is an interface, not a concrete class. `LinkedList` implements the `Queue` interface and provides O(1) `offer()` and `poll()`.',
            invariant: 'Guarantees FIFO ordering.'
          },
          {
            codeLine: 'queue.offer(start); queue.poll();',
            title: 'Line 2: queue.offer(start) and queue.poll() — Enqueue & Dequeue Methods',
            badge: 'QUEUE METHODS',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: '`offer()` pushes to the back; `poll()` retrieves and removes the head.',
            keyQuestion: 'Why use `poll()` instead of `remove()`?',
            explanation: '`poll()` gracefully returns `null` if the queue is unexpectedly empty, whereas `remove()` throws a `NoSuchElementException`.',
            invariant: 'Safe retrieval and removal from front.'
          },
          {
            codeLine: 'if (!visited.contains(neighbor))',
            title: 'Line 3: if (!visited.contains(neighbor)) — HashSet Lookup',
            badge: 'VISITED CHECK',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Checks the HashSet for the neighbor in average O(1) time.',
            keyQuestion: 'What happens if we used ArrayList for visited instead of HashSet?',
            explanation: '`ArrayList.contains()` is O(n). Using ArrayList would blow up the overall runtime to O(V²), failing test cases in placement coding rounds.',
            invariant: 'Maintains optimal O(V + E) search efficiency.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> bfs(const vector<vector<int>>& adj, int start, int V) {
    vector<bool> visited(V, false);
    queue<int> q;
    vector<int> order;

    visited[start] = true;
    q.push(start); // Enqueue start node

    while (!q.empty()) {
        int node = q.front(); // Read head of queue
        q.pop();              // Remove head (FIFO)
        order.push_back(node);

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true; // Mark visited immediately
                q.push(neighbor);        // Enqueue
            }
        }
    }
    return order;
}`,
        optimizedCode: `// C++ BFS Single Source Shortest Path (SSSP)
vector<int> bfsSSSP(const vector<vector<int>>& adj, int start, int V) {
    vector<int> dist(V, -1);
    queue<int> q;

    dist[start] = 0;
    q.push(start);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}`,
        linesBreakdown: [
          {
            codeLine: 'vector<bool> visited(V, false);',
            title: 'Line 1: vector<bool> visited(V, false); — Space-Optimized Bitset',
            badge: 'OPTIMIZATION',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Creates a boolean lookup array of size V initialized to false.',
            keyQuestion: 'What is special about vector<bool> in C++?',
            explanation: 'In C++, `std::vector<bool>` is specialized to allocate 1 bit per boolean rather than 1 full byte, using 8x less RAM memory!',
            invariant: 'O(1) direct index lookup for visited status.'
          },
          {
            codeLine: 'int node = q.front(); q.pop();',
            title: 'Line 2: int node = q.front(); q.pop(); — 2-Step Pop in STL',
            badge: 'STL QUEUE',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Reads the front item with `.front()`, then removes it with `.pop()`.',
            keyQuestion: 'Why does C++ queue pop() not return the value?',
            explanation: 'In C++ STL design, `.pop()` returns `void` for exception safety. You must read with `q.front()` before popping.',
            invariant: 'Safely copies front vertex before popping.'
          }
        ]
      }
    },
    dryRun: {
      graphDescription: 'Graph with 5 vertices (0, 1, 2, 3, 4). Start Node = 0. Edges: 0-1, 0-2, 1-3, 2-4',
      steps: [
        { round: 'Init', action: 'Enqueue Start (0)', queue: '[0]', visited: '{0}', visitedOrder: '[]' },
        { round: 'Step 1', action: 'Pop 0. Explore neighbors 1 & 2. Mark & push both.', queue: '[1, 2]', visited: '{0, 1, 2}', visitedOrder: '[0]' },
        { round: 'Step 2', action: 'Pop 1. Explore neighbor 3. Mark & push 3.', queue: '[2, 3]', visited: '{0, 1, 2, 3}', visitedOrder: '[0, 1]' },
        { round: 'Step 3', action: 'Pop 2. Explore neighbor 4. Mark & push 4.', queue: '[3, 4]', visited: '{0, 1, 2, 3, 4}', visitedOrder: '[0, 1, 2]' },
        { round: 'Step 4', action: 'Pop 3. No unvisited neighbors.', queue: '[4]', visited: '{0, 1, 2, 3, 4}', visitedOrder: '[0, 1, 2, 3]' },
        { round: 'Step 5', action: 'Pop 4. Queue empty -> Done!', queue: '[]', visited: '{0, 1, 2, 3, 4}', visitedOrder: '[0, 1, 2, 3, 4]' }
      ]
    },
    vivaTraps: [
      {
        q: 'Why does BFS guarantee the shortest path in unweighted graphs, but DFS does not?',
        a: 'BFS explores nodes in order of their hop count from the start (first all distance 1, then distance 2, etc.). Therefore, the first time BFS discovers any target node, it is mathematically impossible for a path with fewer edges to exist.'
      },
      {
        q: 'What is the most common bug that causes BFS to freeze or run out of memory?',
        a: 'Marking a node as "visited" when it is POPPED from the queue instead of when it is PUSHED. This allows the same neighbor to be enqueued dozens of times by other nodes, causing queue memory to explode exponentially.'
      },
      {
        q: 'What is the time and auxiliary space complexity of BFS?',
        a: 'Time Complexity is O(V + E) where V is the number of vertices and E is the number of edges. Space Complexity is O(V) in the worst case (for example, in a star graph where the center connects to all (V - 1) other nodes, the queue holds O(V) nodes).'
      }
    ]
  },

  dfs: {
    title: 'Depth-First Search (DFS): Complete Code & Line-by-Line Logic',
    subtitle: 'Master every line of DFS: Recursive call stack vs explicit LIFO stack, backtracking, and deep path exploration.',
    badge: 'GRAPH TRAVERSAL • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `// Recursive DFS implementation
function dfs(graph, start) {
  const visited = new Set();
  const order = [];

  function explore(node) {
    visited.add(node); // 1. Mark visited upon visiting
    order.push(node);

    // 2. Dive deep into the first unvisited branch
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        explore(neighbor); // 3. Recursive call (Call Stack acts as LIFO stack)
      }
    }
    // 4. Backtracks automatically when neighbor loop finishes!
  }

  explore(start);
  return order;
}`,
        optimizedCode: `// Iterative DFS using an Explicit LIFO Stack (Prevents Stack Overflow)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];

  while (stack.length > 0) {
    const node = stack.pop(); // LIFO: Pops the most recently added node!
    if (!visited.has(node)) {
      visited.add(node);
      order.push(node);

      // Push neighbors (reversed if you want left-to-right order)
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  return order;
}`,
        linesBreakdown: [
          {
            codeLine: 'function dfs(graph, start)',
            title: 'Line 1: function dfs(graph, start) — The Deep Maze Explorer',
            badge: 'ENTRY POINT',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares the DFS algorithm function taking a graph and starting node.',
            keyQuestion: 'How is DFS fundamentally different from BFS?',
            explanation: '• Maze Analogy:\nBFS is like water flooding every hallway equally in all directions at the same speed. DFS is like a brave explorer who walks down a single hallway as far as possible until hitting a dead end, and then BACKTRACKS to the previous crossroads to try the next hallway.',
            invariant: 'Prepares data structures and launches recursive depth exploration.'
          },
          {
            codeLine: 'function explore(node)',
            title: 'Line 2: function explore(node) — The Recursive Helper',
            badge: 'RECURSION',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'A helper function that visits the current node and recursively calls itself for unvisited neighbors.',
            keyQuestion: 'What is a "recursive call" for a student with zero coding background?',
            explanation: '• Think of Russian Nesting Dolls (Matryoshka):\nYou open the outer doll, inside is a smaller doll, and inside that is an even smaller doll. In code, `explore(node)` calls `explore(neighbor)`, pausing the parent function on the computer\'s "Call Stack" while the child function runs!',
            invariant: 'Every stack frame represents an active ancestor on the current search path.'
          },
          {
            codeLine: 'visited.add(node); order.push(node);',
            title: 'Line 3: visited.add(node); — Marking the Breadcrumb Trail',
            badge: 'VISIT RECORD',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Records that we have arrived at this node so we never explore it again.',
            keyQuestion: 'What happens if we forget `visited.add(node)` in a cyclic graph?',
            explanation: 'If node A calls node B, and node B calls node A, they will call each other in an infinite recursive loop until your computer runs out of memory and crashes with a "Maximum call stack size exceeded" error!',
            invariant: 'Each node is visited exactly once.'
          },
          {
            codeLine: 'for (const neighbor of graph[node])',
            title: 'Line 4: for (const neighbor of graph[node]) — Checking Outgoing Paths',
            badge: 'NEIGHBOR CHECK',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Iterates through every path leading away from the current node.',
            keyQuestion: 'In what order are paths explored?',
            explanation: 'It explores neighbors in the order they appear in the adjacency list. If node A connects to [B, C], it dives down B\'s entire subtree completely before ever looking at C!',
            invariant: 'Traverses edges outgoing from the current stack frame.'
          },
          {
            codeLine: 'explore(neighbor); // Backtracking happens after this',
            title: 'Line 5: explore(neighbor); — The Deep Dive & Backtracking',
            badge: 'BACKTRACKING',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Recursively visits the neighbor; once all deep branches finish, execution resumes right here.',
            keyQuestion: 'What is "backtracking" in DFS?',
            explanation: 'When a path hits a dead end (no unvisited neighbors), the function completes and returns to the previous caller. That return step is called BACKTRACKING. It rewinds your steps so you can explore alternative choices.',
            invariant: 'Post-order unwinding guarantees complete branch coverage.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def dfs(graph, start):
    visited = set()
    order = []

    def explore(node):
        visited.add(node)
        order.append(node)
        
        # Recurse on each unvisited neighbor
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                explore(neighbor) # Deep dive

    explore(start)
    return order`,
        optimizedCode: `# Iterative DFS in Python using Explicit List as LIFO Stack
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []

    while stack:
        node = stack.pop() # LIFO pop
        if node not in visited:
            visited.add(node)
            order.append(node)
            # Push neighbors in reverse to match recursive left-to-right visit order
            for neighbor in reversed(graph.get(node, [])):
                if neighbor not in visited:
                    stack.append(neighbor)
    return order`,
        linesBreakdown: [
          {
            codeLine: 'def dfs(graph, start):',
            title: 'Line 1: def dfs(graph, start): — Function Header',
            badge: 'ENTRY POINT',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares the DFS algorithm function in Python.',
            keyQuestion: 'How deep can recursive DFS go in Python?',
            explanation: 'By default, Python has a recursion limit of 1,000 calls (`sys.getrecursionlimit()`). For graphs deeper than 1,000 nodes, use the iterative stack version!',
            invariant: 'Defines root search context.'
          },
          {
            codeLine: 'explore(neighbor)',
            title: 'Line 2: explore(neighbor) — Recursive Call',
            badge: 'RECURSION',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Invokes the explore function with the neighbor as the new active node.',
            keyQuestion: 'How does Python remember where to return?',
            explanation: 'Python maintains an internal Call Stack. Each function call pushes a frame with local variables; when `explore()` ends, that frame is popped and execution resumes right after the call.',
            invariant: 'Preserves execution context on the runtime call stack.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `import java.util.*;

public class DFS {
    public static List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        List<Integer> order = new ArrayList<>();
        explore(graph, start, visited, order);
        return order;
    }

    private static void explore(Map<Integer, List<Integer>> graph, int node, 
                                Set<Integer> visited, List<Integer> order) {
        visited.add(node);
        order.add(node);

        for (int neighbor : graph.getOrDefault(node, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                explore(graph, neighbor, visited, order);
            }
        }
    }
}`,
        optimizedCode: `// Java Iterative DFS with Deque Stack
public static List<Integer> dfsIterative(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();
    List<Integer> order = new ArrayList<>();

    stack.push(start);
    while (!stack.isEmpty()) {
        int node = stack.pop();
        if (!visited.contains(node)) {
            visited.add(node);
            order.add(node);
            List<Integer> neighbors = graph.getOrDefault(node, Collections.emptyList());
            for (int i = neighbors.size() - 1; i >= 0; i--) {
                int neighbor = neighbors.get(i);
                if (!visited.contains(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    return order;
}`,
        linesBreakdown: [
          {
            codeLine: 'explore(graph, neighbor, visited, order);',
            title: 'Line 1: explore(graph, neighbor, visited, order); — Recursive Helper in Java',
            badge: 'RECURSION',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Passes shared references to visited Set and order List down the recursion tree.',
            keyQuestion: 'Why pass `visited` and `order` as arguments?',
            explanation: 'In Java, passing object references allows every recursive level to modify the exact same shared set and list without re-allocating memory.',
            invariant: 'Mutates global accumulator lists in-place.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `#include <iostream>
#include <vector>

using namespace std;

void dfsExplore(int u, const vector<vector<int>>& adj, vector<bool>& visited, vector<int>& order) {
    visited[u] = true;
    order.push_back(u);

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfsExplore(v, adj, visited, order);
        }
    }
}

vector<int> dfs(const vector<vector<int>>& adj, int start, int V) {
    vector<bool> visited(V, false);
    vector<int> order;
    dfsExplore(start, adj, visited, order);
    return order;
}`,
        optimizedCode: `// C++ Iterative DFS using std::stack
#include <stack>

vector<int> dfsIterative(const vector<vector<int>>& adj, int start, int V) {
    vector<bool> visited(V, false);
    stack<int> s;
    vector<int> order;

    s.push(start);
    while (!s.empty()) {
        int u = s.top();
        s.pop();

        if (!visited[u]) {
            visited[u] = true;
            order.push_back(u);

            // Push in reverse order
            for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it) {
                if (!visited[*it]) {
                    s.push(*it);
                }
            }
        }
    }
    return order;
}`,
        linesBreakdown: [
          {
            codeLine: 'void dfsExplore(int u, ..., vector<bool>& visited, ...)',
            title: 'Line 1: Pass-by-Reference (&) in C++',
            badge: 'REFERENCE',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Uses `&` to pass `visited` and `order` by reference instead of making expensive copies.',
            keyQuestion: 'What happens if you forget the `&` symbol in C++?',
            explanation: 'Without `&`, C++ creates a full duplicate copy of the vector on every single recursive step! This causes an immediate Time Limit Exceeded (TLE) and memory exhaustion.',
            invariant: 'Zero copy overhead across all recursive frames.'
          }
        ]
      }
    },
    dryRun: {
      graphDescription: 'Tree-like graph: 0 -> [1, 2]; 1 -> [3, 4]; 2 -> [5]. Start = 0.',
      steps: [
        { round: 'Step 1', action: 'Visit 0. Dive into first child 1.', queue: 'Stack: [0]', visited: '{0}', visitedOrder: '[0]' },
        { round: 'Step 2', action: 'Visit 1. Dive into first child 3.', queue: 'Stack: [0, 1]', visited: '{0, 1}', visitedOrder: '[0, 1]' },
        { round: 'Step 3', action: 'Visit 3. Dead end! Backtrack to 1.', queue: 'Stack: [0, 1, 3]', visited: '{0, 1, 3}', visitedOrder: '[0, 1, 3]' },
        { round: 'Step 4', action: 'At 1, dive into second child 4.', queue: 'Stack: [0, 1, 4]', visited: '{0, 1, 3, 4}', visitedOrder: '[0, 1, 3, 4]' },
        { round: 'Step 5', action: 'Dead end at 4! Backtrack to 1, then back to 0.', queue: 'Stack: [0]', visited: '{0, 1, 3, 4}', visitedOrder: '[0, 1, 3, 4]' },
        { round: 'Step 6', action: 'At 0, dive into second child 2, then 5. Complete!', queue: 'Stack: [0, 2, 5]', visited: '{0, 1, 3, 4, 2, 5}', visitedOrder: '[0, 1, 3, 4, 2, 5]' }
      ]
    },
    vivaTraps: [
      {
        q: 'When should you choose DFS over BFS in real-world problems?',
        a: 'Choose DFS when you need to detect cycles, find topological ordering (DAGs), solve puzzles like mazes or Sudoku (where you try a branch and undo choices), or find strongly connected components (Tarjan / Kosaraju).'
      },
      {
        q: 'What is the space complexity of DFS versus BFS on a balanced binary tree?',
        a: 'On a balanced tree of height h and N nodes: DFS requires only O(h) = O(log N) memory on the call stack, whereas BFS requires O(N/2) = O(N) memory in the queue at the deepest level. DFS is dramatically more memory-efficient on wide graphs.'
      },
      {
        q: 'Why can recursive DFS crash on large linear graphs?',
        a: 'If a graph is a long single chain (0 -> 1 -> 2 -> ... -> 10,000), recursive DFS makes 10,000 nested function calls. Operating systems allocate limited call stack memory (often 1MB-8MB), triggering a STACK OVERFLOW exception.'
      }
    ]
  },

  dijkstra: {
    title: 'Dijkstra\'s Shortest Path Algorithm: Complete Code & Line-by-Line Logic',
    subtitle: 'Master every line of Dijkstra: Greedy distance relaxation, non-negative weight constraint, and min-heap optimization.',
    badge: 'SHORTEST PATH • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();
  const nodes = Object.keys(graph);

  // 1. Initialize distances: start is 0, all others are Infinity
  for (const node of nodes) {
    dist[node] = Infinity;
  }
  dist[start] = 0;

  // 2. Process all vertices
  while (visited.size < nodes.length) {
    // 3. Find unvisited node with smallest known distance
    let u = null;
    for (const node of nodes) {
      if (!visited.has(node)) {
        if (u === null || dist[node] < dist[u]) {
          u = node;
        }
      }
    }

    // If smallest distance is Infinity, remaining nodes are unreachable
    if (dist[u] === Infinity) break;
    visited.add(u);

    // 4. Relax outgoing edges from node u
    for (const { node: v, weight } of graph[u]) {
      if (!visited.has(v)) {
        const newDist = dist[u] + weight;
        if (newDist < dist[v]) {
          dist[v] = newDist; // Relaxation: Found a shorter shortcut!
        }
      }
    }
  }
  return dist;
}`,
        optimizedCode: `// Dijkstra with Parent Tracking for Path Reconstruction
function dijkstraWithPath(graph, start, target) {
  const dist = {};
  const prev = {};
  const unvisited = new Set(Object.keys(graph));

  for (const node of unvisited) dist[node] = Infinity;
  dist[start] = 0;

  while (unvisited.size > 0) {
    let u = null;
    for (const node of unvisited) {
      if (u === null || dist[node] < dist[u]) u = node;
    }
    if (dist[u] === Infinity || u === target) break;
    unvisited.delete(u);

    for (const { node: v, weight } of graph[u]) {
      const alt = dist[u] + weight;
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u; // Track best predecessor
      }
    }
  }

  // Reconstruct path
  const path = [];
  let curr = target;
  while (curr) { path.unshift(curr); curr = prev[curr]; }
  return { distance: dist[target], path };
}`,
        linesBreakdown: [
          {
            codeLine: 'function dijkstra(graph, start)',
            title: 'Line 1: function dijkstra(graph, start) — The GPS Navigation Machine',
            badge: 'ENTRY POINT',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares Dijkstra\'s algorithm to compute the shortest driving cost from a start location to all other cities.',
            keyQuestion: 'What does Dijkstra calculate?',
            explanation: '• Google Maps Analogy:\nGiven road distances (or travel times), Dijkstra calculates the absolute fastest route from your home address to every single destination in the entire city.',
            invariant: 'Finds single-source shortest paths on non-negative weighted graphs.'
          },
          {
            codeLine: 'dist[node] = Infinity; dist[start] = 0;',
            title: 'Line 2: dist[node] = Infinity; dist[start] = 0; — Initialization Table',
            badge: 'DISTANCE INIT',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Sets distance to yourself as 0, and all other cities as infinitely far away.',
            keyQuestion: 'Why start with "Infinity"?',
            explanation: 'Before we start exploring, we have no idea if a city is even reachable. Setting initial cost to `Infinity` guarantees that ANY real road distance we discover will be smaller and overwrite it!',
            invariant: 'Upper bounds all true shortest path distances initially.'
          },
          {
            codeLine: 'let u = findMinDistanceUnvisitedNode();',
            title: 'Line 3: let u = findMinDistanceUnvisitedNode(); — Greedy Choice',
            badge: 'GREEDY SELECTION',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Picks the unvisited city that currently has the lowest confirmed distance from start.',
            keyQuestion: 'Why is this called a "Greedy" strategy?',
            explanation: 'Dijkstra always greedily locks in the closest unvisited node. Because all road weights are POSITIVE, no future detour through farther cities could EVER make the route to this node any shorter! This confirms node u\'s shortest distance permanently.',
            invariant: 'Once a node is marked visited, its distance dist[u] is guaranteed final and optimal.'
          },
          {
            codeLine: 'if (newDist < dist[v]) dist[v] = newDist;',
            title: 'Line 4: Edge Relaxation (The Shortcut Discovery)',
            badge: 'EDGE RELAXATION',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Checks if traveling from start -> u -> v is faster than the previous best-known way to reach v.',
            keyQuestion: 'What does "relaxation" mean in computer science?',
            explanation: 'Imagine a rubber band stretched between your start city and city v. If you find a closer intermediate city u that provides a shorter detour, the rubber band "relaxes" because the tension/cost decreases. Hence the term edge relaxation!',
            invariant: 'Triangle inequality: dist[v] <= dist[u] + weight(u, v) is maintained.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `import heapq

def dijkstra(graph, start):
    # 1. Min-Heap Priority Queue stores tuples: (current_distance, node)
    pq = [(0, start)]
    # 2. Distance dictionary initialized with infinity
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    visited = set()

    # 3. Process priority queue until empty
    while pq:
        curr_dist, u = heapq.heappop(pq)

        # Skip outdated entries in min-heap
        if u in visited:
            continue
        visited.add(u)

        # 4. Relax outgoing edges (v, weight)
        for v, weight in graph.get(u, []):
            if v not in visited:
                new_dist = curr_dist + weight
                if new_dist < distances[v]:
                    distances[v] = new_dist
                    heapq.heappush(pq, (new_dist, v)) # Push updated distance

    return distances`,
        optimizedCode: `# Dijkstra with Path Reconstruction in Python
import heapq

def dijkstra_path(graph, start, end):
    pq = [(0, start)]
    dist = {start: 0}
    parent = {start: None}

    while pq:
        d, u = heapq.heappop(pq)
        if u == end:
            break
        if d > dist.get(u, float('inf')):
            continue

        for v, w in graph.get(u, []):
            if d + w < dist.get(v, float('inf')):
                dist[v] = d + w
                parent[v] = u
                heapq.heappush(pq, (dist[v], v))

    # Reconstruct path
    curr = end
    path = []
    while curr is not None:
        path.append(curr)
        curr = parent.get(curr)
    return dist.get(end, float('inf')), path[::-1]`,
        linesBreakdown: [
          {
            codeLine: 'import heapq; pq = [(0, start)]',
            title: 'Line 1: import heapq — Min-Heap Priority Queue',
            badge: 'MIN-HEAP',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Uses Python\'s built-in binary heap `heapq` to extract the minimum distance node in O(log V) time.',
            keyQuestion: 'Why use a min-heap instead of scanning all nodes with a loop?',
            explanation: 'Scanning an array takes O(V) per step, leading to total O(V²) time. A binary min-heap extracts the smallest distance in O(log V) time, reducing total time to a blisteringly fast O((V + E) log V)!',
            invariant: 'Extracts the globally closest unvisited frontier vertex in logarithmic time.'
          },
          {
            codeLine: 'if u in visited: continue',
            title: 'Line 2: Skipping Stale Min-Heap Entries',
            badge: 'STALE CHECK',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'If a node was already visited via an earlier shorter path, ignores this duplicate entry.',
            keyQuestion: 'Why can duplicate nodes exist in Python\'s `heapq`?',
            explanation: 'Python\'s `heapq` does not support an internal "decrease-key" operation. When we find a shorter distance to node v, we simply push the new (shorter_dist, v) pair into the heap. The stale, longer distance pair stays deeper in the heap and gets safely ignored by this check.',
            invariant: 'Ensures each vertex is expanded at most once.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `import java.util.*;

public class Dijkstra {
    static class Edge {
        int to, weight;
        Edge(int to, int weight) { this.to = to; this.weight = weight; }
    }

    static class Node implements Comparable<Node> {
        int id, dist;
        Node(int id, int dist) { this.id = id; this.dist = dist; }
        public int compareTo(Node other) { return Integer.compare(this.dist, other.dist); }
    }

    public static int[] dijkstra(List<List<Edge>> graph, int start, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        PriorityQueue<Node> pq = new PriorityQueue<>();

        dist[start] = 0;
        pq.offer(new Node(start, 0));

        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            int u = curr.id;
            if (curr.dist > dist[u]) continue; // Stale node check

            for (Edge edge : graph.get(u)) {
                if (dist[u] + edge.weight < dist[edge.to]) {
                    dist[edge.to] = dist[u] + edge.weight;
                    pq.offer(new Node(edge.to, dist[edge.to]));
                }
            }
        }
        return dist;
    }
}`,
        optimizedCode: `// Java Dijkstra with Path Predecessor Array
public static List<Integer> getShortestPath(List<List<Edge>> graph, int start, int target, int V) {
    int[] dist = new int[V];
    int[] parent = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    Arrays.fill(parent, -1);
    PriorityQueue<Node> pq = new PriorityQueue<>();

    dist[start] = 0;
    pq.offer(new Node(start, 0));

    while (!pq.isEmpty()) {
        Node curr = pq.poll();
        int u = curr.id;
        if (curr.dist > dist[u]) continue;
        if (u == target) break;

        for (Edge edge : graph.get(u)) {
            if (dist[u] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[u] + edge.weight;
                parent[edge.to] = u;
                pq.offer(new Node(edge.to, dist[edge.to]));
            }
        }
    }
    List<Integer> path = new ArrayList<>();
    for (int at = target; at != -1; at = parent[at]) path.add(at);
    Collections.reverse(path);
    return path;
}`,
        linesBreakdown: [
          {
            codeLine: 'PriorityQueue<Node> pq = new PriorityQueue<>();',
            title: 'Line 1: PriorityQueue in Java',
            badge: 'PRIORITY QUEUE',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Maintains candidate vertices ordered by ascending distance.',
            keyQuestion: 'Why must Node implement `Comparable<Node>`?',
            explanation: 'Java\'s `PriorityQueue` requires elements to be comparable so it knows how to keep the smallest distance at the top of the heap.',
            invariant: 'O(log V) insertion and minimum extraction.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

typedef pair<int, int> pii; // {distance, vertex}

vector<int> dijkstra(const vector<vector<pii>>& adj, int start, int V) {
    vector<int> dist(V, 1e9);
    // Min-heap: greater<pii> ensures smallest distance sits at top
    priority_queue<pii, vector<pii>, greater<pii>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue; // Ignore outdated pair

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight; // Relaxation
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        optimizedCode: `// C++ Dijkstra returning distance and path
pair<int, vector<int>> dijkstraPath(const vector<vector<pii>>& adj, int start, int target, int V) {
    vector<int> dist(V, 1e9);
    vector<int> parent(V, -1);
    priority_queue<pii, vector<pii>, greater<pii>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        if (d > dist[u]) continue;
        if (u == target) break;

        for (auto& edge : adj[u]) {
            int v = edge.first, w = edge.second;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }
    vector<int> path;
    for (int at = target; at != -1; at = parent[at]) path.push_back(at);
    reverse(path.begin(), path.end());
    return {dist[target], path};
}`,
        linesBreakdown: [
          {
            codeLine: 'priority_queue<pii, vector<pii>, greater<pii>> pq;',
            title: 'Line 1: priority_queue with greater<pii> Min-Heap',
            badge: 'MIN-HEAP STL',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Creates a min-heap priority queue in C++.',
            keyQuestion: 'Why is `greater<pii>` required?',
            explanation: 'By default, C++ `std::priority_queue` is a MAX-HEAP (largest element on top). Passing `greater<pii>` turns it into a MIN-HEAP so that the lowest distance is popped first!',
            invariant: 'Maintains smallest edge weights at the root of the heap.'
          }
        ]
      }
    },
    dryRun: {
      graphDescription: 'Start = A. Edges: A->B (wt 4), A->C (wt 2), C->B (wt 1), B->D (wt 5), C->D (wt 8)',
      steps: [
        { round: 'Init', action: 'Distances: A=0, B=inf, C=inf, D=inf. Unvisited: {A,B,C,D}', queue: 'Min node: A', visited: '{A}', visitedOrder: 'A finalized (dist=0)' },
        { round: 'Step 1 (From A)', action: 'Relax B: 0+4=4 < inf. Relax C: 0+2=2 < inf. Dist: A=0, B=4, C=2, D=inf.', queue: 'Min node: C (dist 2)', visited: '{A, C}', visitedOrder: 'C finalized (dist=2)' },
        { round: 'Step 2 (From C)', action: 'Relax B via C: 2+1=3 < 4 (Found shortcut!). Relax D: 2+8=10 < inf. Dist: A=0, B=3, C=2, D=10.', queue: 'Min node: B (dist 3)', visited: '{A, C, B}', visitedOrder: 'B finalized (dist=3)' },
        { round: 'Step 3 (From B)', action: 'Relax D via B: 3+5=8 < 10 (Found shortcut!). Dist: A=0, B=3, C=2, D=8.', queue: 'Min node: D (dist 8)', visited: '{A, C, B, D}', visitedOrder: 'D finalized (dist=8)' },
        { round: 'Final', action: 'All reachable nodes finalized: A=0, C=2, B=3, D=8.', queue: 'Empty', visited: 'Complete', visitedOrder: 'Shortest paths confirmed!' }
      ]
    },
    vivaTraps: [
      {
        q: 'Why does Dijkstra’s algorithm FAIL when there are NEGATIVE edge weights?',
        a: 'Dijkstra makes an irreversible greedy assumption: once a node is marked visited, its distance is assumed final because adding positive weights can only increase distances. With negative weights, taking a longer detour through a negative edge could retroactively reduce the distance to an already-visited node, violating Dijkstra’s invariant. (Use Bellman-Ford or SPFA instead).'
      },
      {
        q: 'What is the time complexity of Dijkstra using an Adjacency Matrix vs a Min-Heap (Priority Queue)?',
        a: 'With an Adjacency Matrix / linear search: O(V²). With an Adjacency List + Binary Min-Heap: O((V + E) log V). In sparse graphs where E << V², the min-heap version is orders of magnitude faster.'
      },
      {
        q: 'Can Dijkstra be used on Directed Acyclic Graphs (DAGs)?',
        a: 'Yes! However, on a DAG, you can find shortest paths even faster in linear O(V + E) time by simply relaxing edges in Topological Sort order, without needing a priority queue at all.'
      }
    ]
  }
};

export default function GraphCodeExplanation({ algoKey = 'bfs' }) {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [codeMode, setCodeMode] = useState('standard'); // 'standard' | 'optimized'
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'dryrun' | 'traps'
  const [copied, setCopied] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const data = graphCodeExplanations[algoKey] || graphCodeExplanations.bfs;
  const currentLangData = data.languages[selectedLang] || data.languages.javascript;
  const currentCode = codeMode === 'optimized' && currentLangData.optimizedCode 
    ? currentLangData.optimizedCode 
    : currentLangData.standardCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mt-10 mb-8 bg-white border border-slate-200/90 rounded-3xl shadow-xl shadow-slate-100/80 overflow-hidden font-sans">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{data.badge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white mb-2">
            {data.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {data.subtitle}
          </p>

          {/* Language Selector Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Language:</span>
            </span>
            {['javascript', 'python', 'java', 'cpp'].map((langKey) => {
              const langObj = data.languages[langKey];
              if (!langObj) return null;
              const isActive = selectedLang === langKey;
              return (
                <button
                  key={langKey}
                  onClick={() => setSelectedLang(langKey)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105 border border-indigo-400/50'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/5'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{langObj.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Code Viewer Bar */}
      <div className="bg-slate-950 border-y border-slate-800 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCodeMode('standard')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              codeMode === 'standard'
                ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Standard Implementation
          </button>
          {currentLangData.optimizedCode && (
            <button
              onClick={() => setCodeMode('optimized')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                codeMode === 'optimized'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Variant / Optimization</span>
            </button>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed border-b border-slate-800 text-slate-200">
        <pre className="selection:bg-indigo-500/30 selection:text-white">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 sm:px-8">
        <button
          onClick={() => setActiveTab('breakdown')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'breakdown'
              ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Line-by-Line Breakdown ({currentLangData.label})</span>
        </button>

        {data.dryRun && (
          <button
            onClick={() => setActiveTab('dryrun')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'dryrun'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Example Trace / Dry Run</span>
          </button>
        )}

        {data.vivaTraps && (
          <button
            onClick={() => setActiveTab('traps')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'traps'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Viva & Interview Traps</span>
          </button>
        )}
      </div>

      {/* Tab 1: Line-by-Line Breakdown */}
      {activeTab === 'breakdown' && (
        <div className="p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                Beginner-Friendly Line-by-Line Logic & Analogies
              </h3>
              <p className="text-xs text-slate-500">
                Designed for students learning data structures with zero prior programming experience.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              {currentLangData.label} Syntax Active
            </span>
          </div>

          <div className="space-y-4">
            {currentLangData.linesBreakdown.map((item, idx) => {
              const isExpanded = expandedCard === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:border-indigo-300 transition-all overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedCard(isExpanded ? null : idx)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide border ${item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                          {item.badge}
                        </span>
                        <code className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {item.codeLine}
                        </code>
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-800">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {item.whatItDoes}
                      </p>
                    </div>

                    <div className="shrink-0 p-2 text-slate-400 hover:text-slate-700 transition-transform">
                      <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180 text-indigo-600' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 border-t border-slate-100 bg-gradient-to-b from-slate-50/40 to-white space-y-3.5">
                      {item.keyQuestion && (
                        <div className="mt-3.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
                          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold block text-amber-950">Student Question:</strong>
                            <span>{item.keyQuestion}</span>
                          </div>
                        </div>
                      )}

                      <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-line font-normal">
                        {item.explanation}
                      </div>

                      {item.invariant && (
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-2 text-xs text-emerald-900 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Key Guarantee:</strong> {item.invariant}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Example Trace / Dry Run */}
      {activeTab === 'dryrun' && data.dryRun && (
        <div className="p-4 sm:p-8 space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-900">
            <strong>Example Network:</strong> {data.dryRun.graphDescription}
          </div>

          <div className="space-y-3">
            {data.dryRun.steps.map((st, sIdx) => (
              <div key={sIdx} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black px-2 py-0.5 rounded bg-slate-900 text-white text-[10px]">
                      {st.round}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      {st.action}
                    </span>
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    Frontier / Queue: <strong className="text-indigo-600">{st.queue}</strong> &bull; Visited: <strong className="text-emerald-700">{st.visited}</strong>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 font-mono text-slate-700 text-[11px] font-bold">
                  {st.visitedOrder}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Viva & Interview Traps */}
      {activeTab === 'traps' && data.vivaTraps && (
        <div className="p-4 sm:p-8 space-y-3">
          {data.vivaTraps.map((trap, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-start gap-2.5 mb-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                  {trap.q}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed font-normal">
                {trap.a}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Footer Note */}
      <div className="p-4 bg-slate-50 rounded-b-3xl border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-slate-600 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Switch between languages anytime to see syntax and explanation cards adapt dynamically.</span>
        </span>
        <span className="text-indigo-700 font-bold">
          AlgoArena Graph Code Master &bull; {data.title.split(':')[0]}
        </span>
      </div>
    </div>
  );
}

