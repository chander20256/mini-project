import React, { useState } from 'react';
import { 
  BookOpen, ChevronDown, Sparkles, Lightbulb, GitFork 
} from 'lucide-react';

const deepDiveData = {
  bst_insert: {
    title: 'BST Insertion: Deep Dive & Intuitive Breakdown',
    subtitle: 'Learn how elements organize into a Binary Search Tree in O(log n) average time.',
    analogy: {
      headline: 'The Company Hierarchy / Guessing Game Analogy',
      story: `Imagine entering a company where every employee is given an ID badge number:
1. You meet the CEO at the entrance (Root Node).
2. If your number is smaller, the CEO points you to the Left wing of the office.
3. If your number is larger, the CEO points you to the Right wing.
4. You repeat this comparison at every manager's desk until you find an empty cubicle!

Because each decision halves the remaining search space, you find your spot in O(log n) steps instead of checking every single employee!`
    },
    sections: [
      {
        id: 'bst-time',
        badge: 'Time • O(log n) Avg vs O(n) Worst',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        title: 'Why Average is O(log n) but Worst Case is O(n) (Skewed Tree)',
        content: `1. Balanced Tree (Average Case - O(log n)):
• If numbers are inserted in random order (e.g. 50, 25, 75, 10, 30), the tree branches evenly into left and right subtrees.
• Each step cuts the problem size in half (n/2, n/4, n/8 ...).
• Height of a balanced tree is h = log₂(n).
• For 1,000,000 nodes, log₂(1,000,000) ≈ 20 comparisons only!

2. Skewed Tree (Worst Case - O(n)):
• What happens if you insert sorted numbers: [10, 20, 30, 40, 50]?
• 20 goes right of 10, 30 goes right of 20, 40 goes right of 30...
• The tree turns into a straight line (linked list / stick)!
• Height becomes h = n, meaning insertion takes O(n) time.
• Solution: Self-balancing trees like AVL or Red-Black trees prevent skewing.`
      },
      {
        id: 'bst-space',
        badge: 'Space • O(h) Recursion',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        title: 'Memory Analysis: Why Auxiliary Space is O(h)',
        content: `• Memory is consumed by the recursion call stack.
• At each step downward, the system pushes a stack frame until it reaches null.
• For a balanced tree, maximum depth is h = O(log n).
• For a skewed tree, maximum depth is h = O(n).
• Can be optimized to O(1) space using an iterative while loop instead of recursion!`
      },
      {
        id: 'interview-traps',
        badge: 'Placement & Exam Traps',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: 'Top 3 Viva & Interview Questions on BST',
        content: `Q1: What happens if you do an Inorder Traversal on any BST?
Ans: You ALWAYS get the elements in strictly sorted, ascending order! (Guaranteed interview favorite).

Q2: Does a standard BST allow duplicate values?
Ans: Typically NO. Standard BSTs store unique keys. If duplicates are allowed, they are placed either strictly in the left subtree, right subtree, or stored as a frequency counter inside the node.

Q3: What is the height difference between Best and Worst Case BST?
Ans: Best case height is O(log n); Worst case height is O(n) (when elements are inserted in already sorted or reverse sorted order).`
      }
    ]
  },
  bst_search: {
    title: 'BST Search: Deep Dive & Binary Search on Nodes',
    subtitle: 'Lookups in O(log n) time: why BST search is faster than linear array scans.',
    analogy: {
      headline: 'The Dictionary Page Flip Analogy',
      story: `When you open a paper dictionary looking for "Mango":
1. You open roughly in the middle (Page 'M').
2. If your target is alphabetically before, you ignore the entire right half of the book and focus left.
3. If after, you focus right.

A BST does the exact same thing on every node: with 1 comparison, it discards an entire half of the tree!`
    },
    sections: [
      {
        id: 'search-math',
        badge: 'Time • O(log n) Avg',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        title: 'Search Complexity: Why It Beats Linear Search',
        content: `• Linear search in an unsorted array takes O(n) (checks every element).
• BST search takes O(h) where h is the tree height.
• On average, h = log₂(n).
• For 10,000 items: linear search takes up to 10,000 steps; BST search takes only ~14 steps!`
      }
    ]
  },
  inorder: {
    title: 'Inorder Traversal: Left → Root → Right',
    subtitle: 'The golden traversal that produces sorted ascending output for any BST.',
    analogy: {
      headline: 'The Left-To-Right Projection Analogy',
      story: `Imagine shining a bright flashlight directly down from the ceiling onto the binary search tree:
• Every node casts a shadow on the floor.
• Reading the shadows from Left to Right gives you the exact Inorder Traversal!
• For any valid BST, this shadow sequence is GUARANTEED to be in sorted ascending order.`
    },
    sections: [
      {
        id: 'inorder-properties',
        badge: 'Sorted Output • O(n)',
        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
        title: 'Why Inorder Traversal Time is O(n) and Space is O(h)',
        content: `• Time Complexity: O(n) because every node is visited exactly once.
• Space Complexity: O(h) where h is the call stack depth.
• Key Application: Checking whether a given binary tree is a valid BST (its inorder traversal must be strictly increasing with no decreasing steps).`
      }
    ]
  },
  preorder: {
    title: 'Preorder Traversal: Root → Left → Right',
    subtitle: 'Root-first hierarchical traversal used for cloning and serializing trees.',
    analogy: {
      headline: 'The Book Table of Contents Analogy',
      story: `Think of a textbook:
1. First, you read the Chapter Title (Root).
2. Then you read Sub-section A (Left).
3. Then you read Sub-section B (Right).

Preorder visits the parent node before any of its children. This makes it ideal for saving a tree to a file or creating an exact duplicate clone!`
    },
    sections: [
      {
        id: 'preorder-properties',
        badge: 'Tree Serialization • O(n)',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        title: 'Key Applications of Preorder Traversal',
        content: `• Tree Serialization: Storing a binary tree into a string or database record.
• Tree Copying / Cloning: Duplicating a tree structure in memory.
• Expression Trees: Prefix notation (Polish notation) in compiler design.`
      }
    ]
  }
};

export default function TreeComplexityDeepDive({ algoKey = 'bst_insert' }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSection, setOpenSection] = useState(0);

  const data = deepDiveData[algoKey] || deepDiveData.bst_insert;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs font-sans text-slate-900 mt-6">
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                {data.title}
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tree Guide
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
          {/* Analogy */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 border border-emerald-200/80 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                {data.analogy.headline}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
              {data.analogy.story}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {data.sections.map((sec, idx) => {
              const isOpen = openSection === idx;

              return (
                <div
                  key={sec.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-emerald-300 bg-white shadow-sm' 
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
              <span>Exam Tip: Inorder traversal on a BST always gives sorted output!</span>
            </span>
            <span className="text-emerald-700 font-bold">
              AlgoArena Tree Realm &bull; Stage 2
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

