import React, { useState } from 'react';
import { Copy, Check, Info, MessageSquareCode } from 'lucide-react';

const graphCodeMap = {
  bfs: {
    name: 'Breadth-First Search (BFS)',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
        lines: [
          { code: 'function bfs(graph, start) {', comment: '// Queue-based level-order search', explanation: 'BFS explores graph neighbor-by-neighbor in concentric rings using a FIFO Queue.' },
          { code: '  const visited = new Set([start]);', comment: '// Track visited to prevent infinite cycles', explanation: 'Crucial: Visited set ensures we never re-process a node in cyclic graphs.' },
          { code: '  const queue = [start];', comment: '// FIFO Queue initialized with start', explanation: 'FIFO Queue maintains First-In-First-Out exploration order.' },
          { code: '  const order = [];', comment: '// Store traversal order', explanation: 'List collecting the visited order of nodes.' },
          { code: '  while (queue.length > 0) {', comment: '// Process queue until empty', explanation: 'Main loop: Continues as long as unexplored frontier nodes remain in queue.' },
          { code: '    const node = queue.shift();', comment: '// Dequeue front node (FIFO)', explanation: 'Remove first element from queue to inspect its adjacent neighbors.' },
          { code: '    order.push(node);', comment: '// Record visit', explanation: 'Add current node to output path.' },
          { code: '    for (const neighbor of graph[node]) {', comment: '// Check all adjacent neighbors', explanation: 'Iterate over all directed/undirected edges connected to current node.' },
          { code: '      if (!visited.has(neighbor)) {', comment: '// Unvisited neighbor found?', explanation: 'Check if neighbor has not yet been discovered.' },
          { code: '        visited.add(neighbor);', comment: '// Mark visited immediately', explanation: 'Mark neighbor immediately to prevent adding duplicate nodes to queue.' },
          { code: '        queue.push(neighbor);', comment: '// Enqueue neighbor for next level', explanation: 'Enqueue neighbor to explore its children in the next level pass.' },
          { code: '      }', comment: '', explanation: 'Skip already-visited neighbors.' },
          { code: '    }', comment: '', explanation: 'Done inspecting neighbors for current node.' },
          { code: '  }', comment: '', explanation: 'Queue is now empty.' },
          { code: '  return order;', comment: '// Return BFS sequence', explanation: 'Returns complete level-order traversal sequence.' },
          { code: '}', comment: '', explanation: 'End BFS function.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
        lines: [
          { code: 'from collections import deque', comment: '# O(1) double-ended queue', explanation: 'Import deque for efficient O(1) pops from the left.' },
          { code: 'def bfs(graph, start):', comment: '# Breadth-First Search', explanation: 'Defines BFS function taking adjacency list and starting vertex.' },
          { code: '    visited = {start}', comment: '# Set of visited vertices', explanation: 'Initialize visited set with start node.' },
          { code: '    queue = deque([start])', comment: '# FIFO Queue initialization', explanation: 'Enqueue start node.' },
          { code: '    order = []', comment: '# Output sequence', explanation: 'List to collect traversed nodes.' },
          { code: '    while queue:', comment: '# While queue is non-empty', explanation: 'Loop until all reachable nodes have been processed.' },
          { code: '        node = queue.popleft()', comment: '# Pop front node (O(1))', explanation: 'Remove first node in queue.' },
          { code: '        order.append(node)', comment: '# Process node', explanation: 'Append node to visited traversal order.' },
          { code: '        for neighbor in graph[node]:', comment: '# Traverse neighbors', explanation: 'Loop through outgoing edges of current vertex.' },
          { code: '            if neighbor not in visited:', comment: '# Unseen node?', explanation: 'Check set membership in O(1) average time.' },
          { code: '                visited.add(neighbor)', comment: '# Mark visited', explanation: 'Add neighbor to visited set.' },
          { code: '                queue.append(neighbor)', comment: '# Enqueue neighbor', explanation: 'Push neighbor to back of queue.' },
          { code: '    return order', comment: '# Return level order', explanation: 'Return output list of vertices.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    List<Integer> order = new ArrayList<>();

    visited.add(start);
    queue.offer(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);

        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
    return order;
}`,
        lines: [
          { code: 'public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {', comment: '// Java BFS', explanation: 'Java method using adjacency map and start node.' },
          { code: '    Set<Integer> visited = new HashSet<>();', comment: '// HashSet for O(1) contains', explanation: 'Visited hash set to prevent cycles.' },
          { code: '    Queue<Integer> queue = new LinkedList<>();', comment: '// LinkedList as FIFO Queue', explanation: 'Queue interface implemented with LinkedList.' },
          { code: '    List<Integer> order = new ArrayList<>();', comment: '// Result list', explanation: 'Output list.' },
          { code: '    visited.add(start);', comment: '// Mark start visited', explanation: 'Add starting node to visited.' },
          { code: '    queue.offer(start);', comment: '// Enqueue start', explanation: 'Enqueue start node.' },
          { code: '    while (!queue.isEmpty()) {', comment: '// Loop while queue has items', explanation: 'Main loop.' },
          { code: '        int node = queue.poll();', comment: '// Poll front node', explanation: 'Extract node at head of queue.' },
          { code: '        order.add(node);', comment: '// Record visit', explanation: 'Record visited node.' },
          { code: '        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {', comment: '// Neighbors loop', explanation: 'Iterate over neighbors.' },
          { code: '            if (!visited.contains(neighbor)) {', comment: '// Check visited', explanation: 'Check if neighbor was not visited.' },
          { code: '                visited.add(neighbor);', comment: '// Add visited', explanation: 'Mark neighbor as visited.' },
          { code: '                queue.offer(neighbor);', comment: '// Push neighbor', explanation: 'Enqueue neighbor.' },
          { code: '            }', comment: '', explanation: 'Skip.' },
          { code: '        }', comment: '', explanation: 'End inner loop.' },
          { code: '    }', comment: '', explanation: 'End while.' },
          { code: '    return order;', comment: '', explanation: 'Return traversal order.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `vector<int> bfs(unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    queue<int> q;
    vector<int> order;

    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        order.push_back(node);

        for (int neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
    return order;
}`,
        lines: [
          { code: 'vector<int> bfs(unordered_map<int, vector<int>>& graph, int start) {', comment: '// C++ BFS with STL queue', explanation: 'C++ BFS function using standard queue.' },
          { code: '    unordered_set<int> visited;', comment: '// Visited hash set', explanation: 'Stores visited nodes.' },
          { code: '    queue<int> q;', comment: '// Standard FIFO queue', explanation: 'Queue to hold frontier vertices.' },
          { code: '    vector<int> order;', comment: '// Result vector', explanation: 'Result list.' },
          { code: '    visited.insert(start);', comment: '// Mark start visited', explanation: 'Insert start node.' },
          { code: '    q.push(start);', comment: '// Enqueue start', explanation: 'Push start node.' },
          { code: '    while (!q.empty()) {', comment: '// Process queue', explanation: 'While queue has nodes.' },
          { code: '        int node = q.front();', comment: '// Front element', explanation: 'Access front element.' },
          { code: '        q.pop();', comment: '// Pop front', explanation: 'Remove front element.' },
          { code: '        order.push_back(node);', comment: '// Record visit', explanation: 'Add to result.' },
          { code: '        for (int neighbor : graph[node]) {', comment: '// Adjacent edges', explanation: 'Iterate adjacent vertices.' },
          { code: '            if (visited.find(neighbor) == visited.end()) {', comment: '// If not visited', explanation: 'Check hash set.' },
          { code: '                visited.insert(neighbor);', comment: '// Mark visited', explanation: 'Mark visited.' },
          { code: '                q.push(neighbor);', comment: '// Enqueue', explanation: 'Push neighbor into queue.' },
          { code: '            }', comment: '', explanation: 'Skip.' },
          { code: '        }', comment: '', explanation: 'End for.' },
          { code: '    }', comment: '', explanation: 'End while.' },
          { code: '    return order;', comment: '', explanation: 'Return output vector.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  },
  dfs: {
    name: 'Depth-First Search (DFS)',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);

  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order);
    }
  }
  return order;
}`,
        lines: [
          { code: 'function dfs(graph, start, visited = new Set(), order = []) {', comment: '// Recursive DFS', explanation: 'DFS dives as deep as possible along each branch before backtracking.' },
          { code: '  visited.add(start);', comment: '// Mark current node as visited', explanation: 'Prevent re-visiting this node in cyclic graphs.' },
          { code: '  order.push(start);', comment: '// Process node upon discovery', explanation: 'Add node to traversal sequence.' },
          { code: '  for (const neighbor of graph[start]) {', comment: '// Inspect each adjacent edge', explanation: 'Examine each neighbor of current node.' },
          { code: '    if (!visited.has(neighbor)) {', comment: '// If unvisited, dive deeper!', explanation: 'Dive down this path before checking other siblings.' },
          { code: '      dfs(graph, neighbor, visited, order);', comment: '// Recursive call on call stack', explanation: 'System call stack holds the backtracking path.' },
          { code: '    }', comment: '', explanation: 'Backtrack here when branch hits dead end.' },
          { code: '  }', comment: '', explanation: 'Finished exploring all neighbors.' },
          { code: '  return order;', comment: '// Return complete traversal', explanation: 'Returns full DFS order.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `def dfs(graph, start, visited=None, order=None):
    if visited is None:
        visited = set()
        order = []

    visited.add(start)
    order.append(start)

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)

    return order`,
        lines: [
          { code: 'def dfs(graph, start, visited=None, order=None):', comment: '# Recursive DFS', explanation: 'Depth-First Search recursive implementation.' },
          { code: '    if visited is None:', comment: '# Initialize structures on first call', explanation: 'Initialize set and list.' },
          { code: '        visited = set()', comment: '', explanation: 'Visited set.' },
          { code: '        order = []', comment: '', explanation: 'Order list.' },
          { code: '    visited.add(start)', comment: '# Mark visited', explanation: 'Mark current node as visited.' },
          { code: '    order.append(start)', comment: '# Record node', explanation: 'Append start to order.' },
          { code: '    for neighbor in graph[start]:', comment: '# Check neighbors', explanation: 'Iterate over neighbors.' },
          { code: '        if neighbor not in visited:', comment: '# Unvisited neighbor?', explanation: 'Check visited set.' },
          { code: '            dfs(graph, neighbor, visited, order)', comment: '# Recurse deep', explanation: 'Recursively visit neighbor.' },
          { code: '    return order', comment: '# Return DFS sequence', explanation: 'Return result list.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited, List<Integer> order) {
    visited.add(node);
    order.add(node);

    for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited, order);
        }
    }
}`,
        lines: [
          { code: 'void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited, List<Integer> order) {', comment: '// Java recursive DFS', explanation: 'Recursive DFS method.' },
          { code: '    visited.add(node);', comment: '// Mark visited', explanation: 'Mark node in HashSet.' },
          { code: '    order.add(node);', comment: '// Record order', explanation: 'Add node to list.' },
          { code: '    for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {', comment: '// Iterate neighbors', explanation: 'Iterate neighbors.' },
          { code: '        if (!visited.contains(neighbor)) {', comment: '// Check visited', explanation: 'Check HashSet.' },
          { code: '            dfs(graph, neighbor, visited, order);', comment: '// Recurse', explanation: 'Recurse into neighbor.' },
          { code: '        }', comment: '', explanation: 'Skip.' },
          { code: '    }', comment: '', explanation: 'End for.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `void dfs(unordered_map<int, vector<int>>& graph, int node, unordered_set<int>& visited, vector<int>& order) {
    visited.insert(node);
    order.push_back(node);

    for (int neighbor : graph[node]) {
        if (visited.find(neighbor) == visited.end()) {
            dfs(graph, neighbor, visited, order);
        }
    }
}`,
        lines: [
          { code: 'void dfs(unordered_map<int, vector<int>>& graph, int node, unordered_set<int>& visited, vector<int>& order) {', comment: '// C++ DFS', explanation: 'C++ recursive DFS.' },
          { code: '    visited.insert(node);', comment: '// Mark visited', explanation: 'Insert into visited set.' },
          { code: '    order.push_back(node);', comment: '// Record visit', explanation: 'Push node.' },
          { code: '    for (int neighbor : graph[node]) {', comment: '// Inspect edges', explanation: 'Loop through neighbors.' },
          { code: '        if (visited.find(neighbor) == visited.end()) {', comment: '// Unvisited?', explanation: 'Check set.' },
          { code: '            dfs(graph, neighbor, visited, order);', comment: '// Recurse', explanation: 'Recurse.' },
          { code: '        }', comment: '', explanation: 'Skip.' },
          { code: '    }', comment: '', explanation: 'End loop.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  },
  dijkstra: {
    name: "Dijkstra's Shortest Path",
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();
  for (const node in graph) dist[node] = Infinity;
  dist[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let u = null;
    for (const node in dist) {
      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {
        u = node;
      }
    }
    if (u === null || dist[u] === Infinity) break;
    visited.add(u);

    for (const { neighbor, weight } of graph[u]) {
      if (!visited.has(neighbor)) {
        const newDist = dist[u] + weight;
        if (newDist < dist[neighbor]) dist[neighbor] = newDist;
      }
    }
  }
  return dist;
}`,
        lines: [
          { code: 'function dijkstra(graph, start) {', comment: '// Greedy shortest path algorithm', explanation: 'Finds the shortest distance from start vertex to all other vertices with non-negative weights.' },
          { code: '  const dist = {};', comment: '// Distance table initialized to Infinity', explanation: 'Distance array/map stores shortest distance found so far.' },
          { code: '  const visited = new Set();', comment: '// Settled vertices set', explanation: 'Tracks vertices whose minimum distance is finalized.' },
          { code: '  for (const node in graph) dist[node] = Infinity;', comment: '// Initialize with infinity', explanation: 'All distances begin at infinity.' },
          { code: '  dist[start] = 0;', comment: '// Distance to start node is 0', explanation: 'Base truth: Distance from source to itself is zero.' },
          { code: '  while (visited.size < Object.keys(graph).length) {', comment: '// Repeat until all nodes visited', explanation: 'Main greedy selection loop.' },
          { code: '    let u = null;', comment: '// Pick unvisited vertex with min dist', explanation: 'Greedy choice: Node with smallest tentative distance.' },
          { code: '    for (const node in dist) {', comment: '// Scan distances', explanation: 'Search for minimum unvisited vertex.' },
          { code: '      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {', comment: '// Compare dist', explanation: 'Find minimum distance node.' },
          { code: '        u = node;', comment: '// Found smaller tentative node', explanation: 'Update selected node.' },
          { code: '      }', comment: '', explanation: 'Continue search.' },
          { code: '    }', comment: '', explanation: 'Selected closest node u.' },
          { code: '    if (u === null || dist[u] === Infinity) break;', comment: '// Unreachable remaining nodes', explanation: 'Break if remaining nodes are unreachable.' },
          { code: '    visited.add(u);', comment: '// Mark u as finalized', explanation: 'Finalize distance for u.' },
          { code: '    for (const { neighbor, weight } of graph[u]) {', comment: '// Relax outgoing edges', explanation: 'Edge Relaxation step.' },
          { code: '      if (!visited.has(neighbor)) {', comment: '// Neighbor not finalized?', explanation: 'Check neighbor.' },
          { code: '        const newDist = dist[u] + weight;', comment: '// Tentative distance via u', explanation: 'Compute cost through node u.' },
          { code: '        if (newDist < dist[neighbor]) dist[neighbor] = newDist;', comment: '// Relax edge if shorter path!', explanation: 'Update distance if smaller path found!' },
          { code: '      }', comment: '', explanation: 'Skip.' },
          { code: '    }', comment: '', explanation: 'Done relaxing neighbors.' },
          { code: '  }', comment: '', explanation: 'End main loop.' },
          { code: '  return dist;', comment: '// Return shortest distances', explanation: 'Return map of finalized shortest distances.' },
          { code: '}', comment: '', explanation: 'End Dijkstra.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]  # (distance, node)

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue

        for neighbor, weight in graph[u]:
            new_dist = d + weight
            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))

    return dist`,
        lines: [
          { code: 'import heapq', comment: '# Min-Heap priority queue', explanation: 'Heapq gives O(log V) priority queue extractions.' },
          { code: 'def dijkstra(graph, start):', comment: "# Dijkstra's algorithm with min-heap", explanation: 'Dijkstra implementation using Python min-heap.' },
          { code: "    dist = {node: float('inf') for node in graph}", comment: '# Distance table', explanation: 'All distances initialized to infinity.' },
          { code: '    dist[start] = 0', comment: '# Source distance is 0', explanation: 'Start distance is 0.' },
          { code: '    pq = [(0, start)]  # (distance, node)', comment: '# Priority queue', explanation: 'Push (dist, start) into min-heap.' },
          { code: '    while pq:', comment: '# While heap not empty', explanation: 'Process closest nodes first.' },
          { code: '        d, u = heapq.heappop(pq)', comment: '# Extract minimum distance vertex', explanation: 'Extract node u with min distance.' },
          { code: '        if d > dist[u]:', comment: '# Skip outdated stale entries', explanation: 'Optimization: Ignore stale heap entries.' },
          { code: '            continue', comment: '', explanation: 'Skip.' },
          { code: '        for neighbor, weight in graph[u]:', comment: '# Relax neighbors', explanation: 'Iterate adjacent edges.' },
          { code: '            new_dist = d + weight', comment: '# Distance through u', explanation: 'Path distance via u.' },
          { code: '            if new_dist < dist[neighbor]:', comment: '# Better path found!', explanation: 'Edge relaxation test.' },
          { code: '                dist[neighbor] = new_dist', comment: '# Update distance', explanation: 'Update shorter distance.' },
          { code: '                heapq.heappush(pq, (new_dist, neighbor))', comment: '# Push updated entry', explanation: 'Enqueue improved distance.' },
          { code: '    return dist', comment: '# Return shortest distance table', explanation: 'Return final distances dictionary.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `public Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> graph, int start) {
    Map<Integer, Integer> dist = new HashMap<>();
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));

    for (int node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
    dist.put(start, 0);
    pq.offer(new int[]{start, 0});

    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int u = top[0], d = top[1];
        if (d > dist.get(u)) continue;

        for (int[] edge : graph.getOrDefault(u, new ArrayList<>())) {
            int v = edge[0], weight = edge[1];
            if (dist.get(u) + weight < dist.get(v)) {
                dist.put(v, dist.get(u) + weight);
                pq.offer(new int[]{v, dist.get(v)});
            }
        }
    }
    return dist;
}`,
        lines: [
          { code: 'public Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> graph, int start) {', comment: '// Java Dijkstra', explanation: 'Dijkstra implementation using PriorityQueue.' },
          { code: '    Map<Integer, Integer> dist = new HashMap<>();', comment: '// Distance map', explanation: 'Stores distances.' },
          { code: '    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));', comment: '// Min-heap by distance', explanation: 'Priority queue ordered by distance.' },
          { code: '    for (int node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);', comment: '// Init infinity', explanation: 'Set all to infinity.' },
          { code: '    dist.put(start, 0);', comment: '// Start dist is 0', explanation: 'Source distance is 0.' },
          { code: '    pq.offer(new int[]{start, 0});', comment: '// Enqueue start', explanation: 'Add start to PQ.' },
          { code: '    while (!pq.isEmpty()) {', comment: '// While PQ not empty', explanation: 'Main loop.' },
          { code: '        int[] top = pq.poll();', comment: '// Extract min', explanation: 'Extract min distance.' },
          { code: '        int u = top[0], d = top[1];', comment: '', explanation: 'Vertex and distance.' },
          { code: '        if (d > dist.get(u)) continue;', comment: '// Skip stale', explanation: 'Skip obsolete entry.' },
          { code: '        for (int[] edge : graph.getOrDefault(u, new ArrayList<>())) {', comment: '// Relax edges', explanation: 'Loop neighbors.' },
          { code: '            int v = edge[0], weight = edge[1];', comment: '', explanation: 'Edge dest and weight.' },
          { code: '            if (dist.get(u) + weight < dist.get(v)) {', comment: '// Relax condition', explanation: 'Test relaxation.' },
          { code: '                dist.put(v, dist.get(u) + weight);', comment: '// Update', explanation: 'Update distance.' },
          { code: '                pq.offer(new int[]{v, dist.get(v)});', comment: '// Offer to PQ', explanation: 'Push updated distance.' },
          { code: '            }', comment: '', explanation: 'End if.' },
          { code: '        }', comment: '', explanation: 'End for.' },
          { code: '    }', comment: '', explanation: 'End while.' },
          { code: '    return dist;', comment: '', explanation: 'Return distances map.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `vector<int> dijkstra(int n, vector<vector<pair<int, int>>>& adj, int start) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(n, 1e9);

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto& [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        lines: [
          { code: 'vector<int> dijkstra(int n, vector<vector<pair<int, int>>>& adj, int start) {', comment: '// C++ Dijkstra with std::priority_queue', explanation: 'C++ Dijkstra algorithm using min priority queue.' },
          { code: '    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;', comment: '// Min-heap', explanation: 'Min-heap priority queue.' },
          { code: '    vector<int> dist(n, 1e9);', comment: '// Init distance vector', explanation: 'Distances initialized to 1e9.' },
          { code: '    dist[start] = 0;', comment: '// Source is 0', explanation: 'Start vertex dist is 0.' },
          { code: '    pq.push({0, start});', comment: '// Push source', explanation: 'Push source.' },
          { code: '    while (!pq.empty()) {', comment: '// While PQ not empty', explanation: 'Main loop.' },
          { code: '        auto [d, u] = pq.top();', comment: '// Top element', explanation: 'Extract minimum.' },
          { code: '        pq.pop();', comment: '// Pop element', explanation: 'Pop element.' },
          { code: '        if (d > dist[u]) continue;', comment: '// Skip stale', explanation: 'Skip stale.' },
          { code: '        for (auto& [v, weight] : adj[u]) {', comment: '// Relax edges', explanation: 'Loop neighbors.' },
          { code: '            if (dist[u] + weight < dist[v]) {', comment: '// Relax condition', explanation: 'Relaxation check.' },
          { code: '                dist[v] = dist[u] + weight;', comment: '// Update dist', explanation: 'Update shorter distance.' },
          { code: '                pq.push({dist[v], v});', comment: '// Push to heap', explanation: 'Push updated vertex.' },
          { code: '            }', comment: '', explanation: 'Skip.' },
          { code: '        }', comment: '', explanation: 'End for.' },
          { code: '    }', comment: '', explanation: 'End while.' },
          { code: '    return dist;', comment: '', explanation: 'Return distance vector.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  }
};

export default function GraphCodeViewer({ algoKey = 'bfs', activeLine = -1 }) {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [showComments, setShowComments] = useState(true);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [copied, setCopied] = useState(false);

  const algoData = graphCodeMap[algoKey] || graphCodeMap.bfs;
  const currentLangData = algoData.languages[selectedLang] || algoData.languages.javascript;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentLangData.codeText || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeOrHoveredIndex = hoveredLine !== null ? hoveredLine : (activeLine >= 0 ? activeLine : 0);
  const activeLineData = currentLangData.lines[activeOrHoveredIndex] || currentLangData.lines[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col font-sans text-slate-200">
      {/* Top Header: Sleek macOS IDE Style */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500/80 inline-block" />
          </div>
          <span className="font-bold text-slate-100 text-xs sm:text-sm tracking-tight whitespace-nowrap">
            Graph Code &amp; Tracing
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Tabs */}
          <div className="flex items-center bg-slate-950/80 p-0.5 rounded-xl border border-slate-800 text-[11px] font-semibold">
            {Object.keys(algoData.languages).map((langKey) => {
              const lang = algoData.languages[langKey];
              const isSelected = selectedLang === langKey;
              return (
                <button
                  key={langKey}
                  onClick={() => setSelectedLang(langKey)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang.label === 'JavaScript' ? 'JS' : lang.label}
                </button>
              );
            })}
          </div>

          {/* Toggle Comments Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            title="Toggle inline comments"
            className={`p-1.5 rounded-xl text-xs transition-colors cursor-pointer border ${
              showComments
                ? 'bg-slate-800 text-purple-400 border-slate-700'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            title="Copy Code"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-medium border border-slate-700"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-purple-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Body with No-Overlap Layout */}
      <div className="py-3 font-mono text-xs overflow-x-auto space-y-0.5 select-text">
        {currentLangData.lines.map((lineObj, idx) => {
          const isHighlighted = activeLine === idx;
          const isHovered = hoveredLine === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredLine(idx)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-center px-3 py-1.5 rounded-lg transition-all cursor-pointer min-w-max ${
                isHighlighted
                  ? 'bg-purple-600/30 text-purple-200 border-l-2 border-purple-400 font-semibold shadow-inner'
                  : isHovered
                  ? 'bg-slate-800/60 text-slate-200'
                  : 'text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              <span className="text-slate-600 select-none w-5 text-right text-[11px] font-mono shrink-0 mr-3">
                {idx + 1}
              </span>
              <span className="font-mono whitespace-pre text-xs text-slate-200">
                {lineObj.code}
              </span>
              {showComments && lineObj.comment && (
                <span className="text-[11px] text-purple-400/80 font-mono italic whitespace-nowrap ml-6 select-none shrink-0">
                  {lineObj.comment}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Panel: Interactive Line Logic */}
      <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/50">
        <div className="w-5 h-5 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5" />
        </div>
        <div className="text-xs leading-relaxed min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-slate-200 text-[11px]">
              Line {activeOrHoveredIndex + 1} Logic:
            </span>
            <span className="text-[10px] text-purple-400 font-mono bg-purple-950/80 px-1.5 py-0.2 rounded border border-purple-800/60">
              {currentLangData.label}
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">
            {activeLineData?.explanation || 'Hover or step through code to inspect logic.'}
          </p>
        </div>
      </div>
    </div>
  );
}

