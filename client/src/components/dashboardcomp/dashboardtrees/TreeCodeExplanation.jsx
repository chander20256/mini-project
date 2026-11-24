import React, { useState } from 'react';
import { 
  Code2, Copy, Check, ChevronDown, Sparkles, Terminal, 
  FileCode, CheckCircle2, ArrowRight, AlertCircle, Info, Zap, HelpCircle, Layers, GitBranch, Binary
} from 'lucide-react';

const treeCodeExplanations = {
  bst_insert: {
    title: 'BST Insertion: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of BST Insert: Base case leaf allocation, left vs right routing rules, pointer rewiring, and time complexity.',
    badge: 'BINARY SEARCH TREE • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `// Standard Recursive BST Insertion
function insert(root, val) {
  // 1. Base Case: Reached an empty slot! Plant new node here
  if (!root) {
    return new TreeNode(val);
  }

  // 2. BST Property: Smaller values go Left, Larger go Right
  if (val < root.val) {
    root.left = insert(root.left, val);  // Recurse left and link child
  } else if (val > root.val) {
    root.right = insert(root.right, val); // Recurse right and link child
  }
  // If val === root.val, duplicates are typically ignored in standard BST

  // 3. Return original root pointer to maintain tree connectivity
  return root;
}`,
        optimizedCode: `// Iterative BST Insertion (O(1) Auxiliary Space - Zero Call Stack Overhead)
function insertIterative(root, val) {
  const newNode = new TreeNode(val);
  if (!root) return newNode;

  let curr = root;
  while (true) {
    if (val < curr.val) {
      if (!curr.left) {
        curr.left = newNode; // Found left leaf spot!
        break;
      }
      curr = curr.left;
    } else if (val > curr.val) {
      if (!curr.right) {
        curr.right = newNode; // Found right leaf spot!
        break;
      }
      curr = curr.right;
    } else {
      break; // Duplicate value, skip insertion
    }
  }
  return root;
}`,
        linesBreakdown: [
          {
            codeLine: 'function insert(root, val)',
            title: 'Line 1: function insert(root, val) — The Insertion Machine',
            badge: 'ENTRY POINT • ABSOLUTE BEGINNER',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares a recursive function taking the current tree root and the value to insert.',
            keyQuestion: 'What is a "TreeNode" and what does "root" mean?',
            explanation: '• Imagine a Family Tree Node:\nA TreeNode is an object box holding 3 things: its value (`val`), a pointer arrow to its left child (`left`), and a pointer arrow to its right child (`right`).\n• What is "root"?\nThe root is the top-most king/starting node of the entire tree. Every operation starts from the root.',
            invariant: 'Receives the sub-tree root and the payload to place.'
          },
          {
            codeLine: 'if (!root) return new TreeNode(val);',
            title: 'Line 2: if (!root) return new TreeNode(val); — The Base Case Spot',
            badge: 'BASE CASE',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'When we walk down and hit an empty null spot (`!root`), create and return the new node right there.',
            keyQuestion: 'What does "!root" mean for a beginner?',
            explanation: 'In JavaScript, if a parent has no child, that pointer is `null` (or empty). `!root` checks: "Are we standing on an empty plot of land?" If yes, we build a new house (`new TreeNode(val)`) and return it so the parent can attach it!',
            invariant: 'Leaves are allocated at the exact location where BST order requires them.'
          },
          {
            codeLine: 'if (val < root.val)',
            title: 'Line 3: if (val < root.val) — The Binary Search Rule',
            badge: 'BST INVARIANT',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Compares the new number against the current node\'s number to choose which branch to take.',
            keyQuestion: 'Why do smaller values always go to the left?',
            explanation: 'This is the golden rule of a Binary Search Tree (BST):\n• ALL numbers in the LEFT subtree MUST be strictly SMALLER than the root.\n• ALL numbers in the RIGHT subtree MUST be strictly LARGER than the root.\nBecause `val < root.val`, our only valid destination is somewhere down the left branch.',
            invariant: 'Preserves the strict ordering invariant of Binary Search Trees.'
          },
          {
            codeLine: 'root.left = insert(root.left, val);',
            title: 'Line 4: root.left = insert(root.left, val); — Recursive Rewiring',
            badge: 'RECURSION & LINK',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Dives into the left child, and connects whatever node is returned back to `root.left`.',
            keyQuestion: 'Why write `root.left = insert(...)` instead of just calling `insert(root.left, val)`?',
            explanation: 'When the base case creates a brand new `TreeNode`, it returns it upward. The parent MUST assign `root.left = ...` to tie the knot and physically attach the new baby node to the parent!',
            invariant: 'Reconnects child pointers as recursive calls return up the call stack.'
          },
          {
            codeLine: 'return root;',
            title: 'Line 5: return root; — Returning the Tree Anchor',
            badge: 'RETURN POINTER',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Returns the root pointer back up to the caller.',
            keyQuestion: 'Why return root?',
            explanation: 'The original caller (our visualizer or UI) needs to keep hold of the top of the tree. Returning `root` ensures the master pointer to the root of the tree never gets lost.',
            invariant: 'Guarantees the root reference remains valid.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def insert(root, val):
    # 1. Base case: empty leaf position found
    if not root:
        return TreeNode(val)

    # 2. BST Property routing
    if val < root.val:
        root.left = insert(root.left, val)
    elif val > root.val:
        root.right = insert(root.right, val)

    # 3. Return root pointer
    return root`,
        optimizedCode: `# Python Iterative BST Insert (O(1) Auxiliary Memory)
def insert_iterative(root, val):
    if not root:
        return TreeNode(val)

    curr = root
    while True:
        if val < curr.val:
            if not curr.left:
                curr.left = TreeNode(val)
                break
            curr = curr.left
        elif val > curr.val:
            if not curr.right:
                curr.right = TreeNode(val)
                break
            curr = curr.right
        else:
            break # Duplicate key
    return root`,
        linesBreakdown: [
          {
            codeLine: 'if not root: return TreeNode(val)',
            title: 'Line 1: if not root: return TreeNode(val) — Python Base Case',
            badge: 'PYTHONIC',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'If root is None, creates a new TreeNode instance with the value.',
            keyQuestion: 'What does `if not root:` check?',
            explanation: 'In Python, `None` evaluates to False in a boolean condition. `if not root:` is the standard Pythonic check for an empty pointer.',
            invariant: 'Allocates leaf node at the correct boundary.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class BST {
    public static TreeNode insert(TreeNode root, int val) {
        if (root == null) {
            return new TreeNode(val);
        }

        if (val < root.val) {
            root.left = insert(root.left, val);
        } else if (val > root.val) {
            root.right = insert(root.right, val);
        }

        return root;
    }
}`,
        optimizedCode: `// Java Iterative BST Insert
public static TreeNode insertIterative(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);

    TreeNode curr = root;
    while (true) {
        if (val < curr.val) {
            if (curr.left == null) {
                curr.left = new TreeNode(val);
                break;
            }
            curr = curr.left;
        } else if (val > curr.val) {
            if (curr.right == null) {
                curr.right = new TreeNode(val);
                break;
            }
            curr = curr.right;
        } else {
            break; // Duplicate
        }
    }
    return root;
}`,
        linesBreakdown: [
          {
            codeLine: 'if (root == null) return new TreeNode(val);',
            title: 'Line 1: Null pointer check in Java',
            badge: 'JAVA SYNTAX',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Checks whether the pointer reference is null before dereferencing.',
            keyQuestion: 'What happens if we forget `root == null`?',
            explanation: 'Attempting to access `root.val` on a null reference triggers the dreaded `NullPointerException` (NPE). Always guard with `root == null`!',
            invariant: 'Prevents NullPointerExceptions.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `#include <iostream>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* insert(TreeNode* root, int val) {
    if (root == nullptr) {
        return new TreeNode(val);
    }

    if (val < root->val) {
        root->left = insert(root->left, val);
    } else if (val > root->val) {
        root->right = insert(root->right, val);
    }

    return root;
}`,
        optimizedCode: `// C++ Insert by Reference-to-Pointer (Zero return rewiring needed!)
void insertByRef(TreeNode*& root, int val) {
    if (root == nullptr) {
        root = new TreeNode(val);
        return;
    }
    if (val < root->val) {
        insertByRef(root->left, val);
    } else if (val > root->val) {
        insertByRef(root->right, val);
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'TreeNode* root; root->left;',
            title: 'Line 1: Pointers and the Arrow Operator (->) in C++',
            badge: 'C++ POINTERS',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Dereferences the node pointer to access members in heap memory.',
            keyQuestion: 'Why use `->` instead of `.`?',
            explanation: 'In C++, `root` is a pointer (memory address). `root->val` is shorthand for `(*root).val`, which dereferences the address to access the value.',
            invariant: 'Direct heap memory manipulation.'
          }
        ]
      }
    },
    dryRun: {
      graphDescription: 'Starting tree with root = 50. Inserting numbers: 30, 70, 20, 40.',
      steps: [
        { round: 'Step 1', action: 'Insert 50 into empty tree.', queue: 'Tree: (50)', visited: 'Root allocated', visitedOrder: '50 is Root' },
        { round: 'Step 2', action: 'Insert 30. 30 < 50 -> go left. Left is empty -> attach 30 as 50.left.', queue: 'Tree: 50 -> Left: 30', visited: '30 placed', visitedOrder: '50 -> L:30' },
        { round: 'Step 3', action: 'Insert 70. 70 > 50 -> go right. Right is empty -> attach 70 as 50.right.', queue: 'Tree: 50 -> L:30, R:70', visited: '70 placed', visitedOrder: '50 -> L:30, R:70' },
        { round: 'Step 4', action: 'Insert 20. 20 < 50 -> go left (to 30). 20 < 30 -> go left. Left empty -> attach 20 as 30.left.', queue: 'Tree: 50 -> L:30 (L:20), R:70', visited: '20 placed', visitedOrder: 'Complete balanced subtree' }
      ]
    },
    vivaTraps: [
      {
        q: 'What is the WORST-CASE time complexity of inserting into a standard BST, and when does it happen?',
        a: 'The worst case is O(n) (linear time!). It happens when keys are inserted in strictly ascending order (e.g., [10, 20, 30, 40, 50]) or strictly descending order. The tree degenerates into a single long line (skewed tree / linked list), making tree height equal to n. (Self-balancing trees like AVL or Red-Black trees fix this to guarantee O(log n)).'
      },
      {
        q: 'What is the average time complexity of BST insertion?',
        a: 'O(h) where h is the tree height. In a reasonably balanced binary tree, height h = O(log n), so average time is O(log n).'
      }
    ]
  },

  bst_search: {
    title: 'BST Search: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of BST Search: Constant-branch pruning, base cases, null bounds, and iterative O(1) space optimization.',
    badge: 'BINARY SEARCH TREE • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `// Recursive BST Search
function search(root, target) {
  // 1. Base Case: Reached null (not found) OR found target!
  if (!root || root.val === target) {
    return root; // Returns node if found, null if not found
  }

  // 2. Binary Decision: Prune half the remaining tree!
  if (target < root.val) {
    return search(root.left, target);  // Target must be in left subtree
  } else {
    return search(root.right, target); // Target must be in right subtree
  }
}`,
        optimizedCode: `// Iterative BST Search (Optimal: O(1) Memory Space)
function searchIterative(root, target) {
  let curr = root;

  while (curr !== null) {
    if (curr.val === target) {
      return curr; // Found!
    } else if (target < curr.val) {
      curr = curr.left; // Walk left
    } else {
      curr = curr.right; // Walk right
    }
  }
  return null; // Not found
}`,
        linesBreakdown: [
          {
            codeLine: 'function search(root, target)',
            title: 'Line 1: function search(root, target) — The Search Engine Machine',
            badge: 'ENTRY POINT',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Searches the binary tree for a node matching the target value.',
            keyQuestion: 'Why is searching in a BST so much faster than a standard list?',
            explanation: '• The Dictionary Analogy:\nIf you look up "Mango" in a physical dictionary, you don\'t read from page 1 one by one. You flip to the middle (letter M). In a BST, every comparison discards an entire half of the remaining tree in 1 single step!',
            invariant: 'Filters candidate search space by 50% at each non-null comparison.'
          },
          {
            codeLine: 'if (!root || root.val === target) return root;',
            title: 'Line 2: Dual Base Case: Null or Match Found',
            badge: 'DUAL BASE CASE',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Stops recursion if we walked past a leaf (`!root`) or if we hit the target element.',
            keyQuestion: 'Why write `!root` FIRST before checking `root.val === target`?',
            explanation: 'In JavaScript (and most languages), `||` is short-circuiting. If `root` is null, evaluating `root.val` would throw an immediate crash! Checking `!root` first safely terminates before null can be accessed.',
            invariant: 'Guarantees null-safety and immediate return upon discovery.'
          },
          {
            codeLine: 'if (target < root.val) return search(root.left, target);',
            title: 'Line 3: Left Branch Decision & Tail Return',
            badge: 'PRUNING',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'If target is smaller than current node, recurse into left child.',
            keyQuestion: 'What does "return" do before search(...) here?',
            explanation: 'Without `return`, the result found deep in the tree would be computed and then thrown away! The `return` keyword passes the found node all the way back up to the original caller.',
            invariant: 'Propagates the lookup result upward through the call stack.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def search(root, target):
    # 1. Base cases: empty tree or target found
    if not root or root.val == target:
        return root

    # 2. Prune right half if target is smaller
    if target < root.val:
        return search(root.left, target)
    
    # 3. Otherwise prune left half
    return search(root.right, target)`,
        optimizedCode: `# Iterative BST Search in Python (O(1) Space)
def search_iterative(root, target):
    curr = root
    while curr:
        if curr.val == target:
            return curr
        elif target < curr.val:
            curr = curr.left
        else:
            curr = curr.right
    return None`,
        linesBreakdown: [
          {
            codeLine: 'if not root or root.val == target: return root',
            title: 'Line 1: Python Dual Base Case',
            badge: 'BASE CASE',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Short-circuit check in Python.',
            keyQuestion: 'What does Python return if target is not found?',
            explanation: 'It returns `None` (since root was None when hitting the end of a branch).',
            invariant: 'Returns TreeNode or None.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `public class BSTSearch {
    public static TreeNode search(TreeNode root, int target) {
        if (root == null || root.val == target) {
            return root;
        }

        if (target < root.val) {
            return search(root.left, target);
        } else {
            return search(root.right, target);
        }
    }
}`,
        optimizedCode: `// Java Iterative BST Search
public static TreeNode searchIterative(TreeNode root, int target) {
    TreeNode curr = root;
    while (curr != null) {
        if (curr.val == target) return curr;
        curr = (target < curr.val) ? curr.left : curr.right;
    }
    return null;
}`,
        linesBreakdown: [
          {
            codeLine: 'curr = (target < curr.val) ? curr.left : curr.right;',
            title: 'Ternary pointer traversal in Java',
            badge: 'OPTIMIZATION',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Clean single-line pointer update in the iterative search loop.',
            keyQuestion: 'What is the auxiliary memory consumption of iterative search?',
            explanation: 'Strictly O(1) auxiliary space! No recursion stack frames are allocated, avoiding stack overflows even on 1,000,000-deep skewed trees.',
            invariant: 'O(1) auxiliary space guarantee.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `TreeNode* search(TreeNode* root, int target) {
    if (root == nullptr || root->val == target) {
        return root;
    }

    if (target < root->val) {
        return search(root->left, target);
    } else {
        return search(root->right, target);
    }
}`,
        optimizedCode: `// C++ Iterative Search
TreeNode* searchIterative(TreeNode* root, int target) {
    TreeNode* curr = root;
    while (curr != nullptr && curr->val != target) {
        curr = (target < curr->val) ? curr->left : curr->right;
    }
    return curr;
}`,
        linesBreakdown: [
          {
            codeLine: 'root == nullptr || root->val == target',
            title: 'nullptr check in Modern C++',
            badge: 'MODERN C++',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Uses C++11 `nullptr` instead of legacy NULL or 0.',
            keyQuestion: 'Why prefer `nullptr` over NULL in C++?',
            explanation: '`nullptr` has strong type safety (`std::nullptr_t`) and avoids ambiguous function overloads where NULL could be misinterpreted as integer 0.',
            invariant: 'Type-safe pointer comparison.'
          }
        ]
      }
    },
    dryRun: {
      graphDescription: 'Tree: Root=50, Left=30 (L:20, R:40), Right=70. Searching for target = 40.',
      steps: [
        { round: 'Step 1', action: 'At Root (50). Compare: 40 < 50. Target is smaller -> Discard entire right subtree (70)! Go left to 30.', queue: 'Current: 50', visited: 'Pruned right half', visitedOrder: 'Visiting 50' },
        { round: 'Step 2', action: 'At Node (30). Compare: 40 > 30. Target is larger -> Discard left child (20)! Go right to 40.', queue: 'Current: 30', visited: 'Pruned left child', visitedOrder: 'Visiting 30' },
        { round: 'Step 3', action: 'At Node (40). Compare: 40 === 40. Target MATCHED! Return Node 40.', queue: 'Current: 40', visited: 'Target Found', visitedOrder: 'Success: Node 40 returned!' }
      ]
    },
    vivaTraps: [
      {
        q: 'Why is BST search better than binary search on an array for dynamic datasets?',
        a: 'Searching takes O(log n) on both. However, inserting or deleting an element in a sorted array takes O(n) because elements must be shifted in memory. In a BST, insertion and deletion take only O(log n) without shifting elements in memory!'
      }
    ]
  },

  inorder: {
    title: 'In-Order Traversal: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of In-Order (Left -> Root -> Right): Recursive call stack mechanics and why it yields sorted order on BSTs.',
    badge: 'TREE TRAVERSAL • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `// Standard Recursive In-Order Traversal (Left -> Root -> Right)
function inorder(root) {
  const result = [];

  function traverse(node) {
    if (!node) return; // 1. Base Case: Reached null pointer, stop

    traverse(node.left);  // 2. LEFT: Visit all smaller elements first
    result.push(node.val); // 3. ROOT: Process current node value
    traverse(node.right); // 4. RIGHT: Visit all larger elements last
  }

  traverse(root);
  return result;
}`,
        optimizedCode: `// Iterative In-Order Traversal using an Explicit Stack
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    // 1. Reach the leftmost node of the current subtree
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    // 2. Current must be null at this point; pop top item
    curr = stack.pop();
    result.push(curr.val); // Process node

    // 3. We have visited the node and its left subtree; now move right
    curr = curr.right;
  }

  return result;
}`,
        linesBreakdown: [
          {
            codeLine: 'traverse(node.left);',
            title: 'Line 1: traverse(node.left); — Visiting Left Subtree First',
            badge: 'STEP 1: LEFT',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Recursively visits all nodes in the left branch.',
            keyQuestion: 'What does "In-Order" mean?',
            explanation: '• Memory Trick:\n"In" means the root is IN BETWEEN its two children:\nLEFT -> [ROOT] -> RIGHT.\nSince all nodes in the left branch are smaller, we must visit all of them BEFORE we touch the current root!',
            invariant: 'All descendants in left subtree are processed prior to current node.'
          },
          {
            codeLine: 'result.push(node.val);',
            title: 'Line 2: result.push(node.val); — The Golden Exam Question',
            badge: 'STEP 2: ROOT • VIVA GOLD',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Records the current node\'s value into the output sequence.',
            keyQuestion: 'Why does In-Order traversal of a BST ALWAYS produce strictly sorted numbers?',
            explanation: '• #1 Most Asked College Viva Question:\nIn any BST, every left child is smaller than root, and every right child is larger than root. By visiting LEFT (all smaller) -> ROOT (middle) -> RIGHT (all larger), you naturally read the numbers in strictly ascending sorted order (e.g., [10, 20, 30, 40, 50])!',
            invariant: 'Yields monotonically increasing sequence for any valid BST.'
          },
          {
            codeLine: 'traverse(node.right);',
            title: 'Line 3: traverse(node.right); — Visiting Right Subtree Last',
            badge: 'STEP 3: RIGHT',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Recursively visits all nodes in the right branch after the root is recorded.',
            keyQuestion: 'What happens when right is null?',
            explanation: 'The function hits the base case (`if (!node) return;`), terminates, and backtracks to its parent on the call stack.',
            invariant: 'Completes traversal for current subtree.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def inorder(root):
    result = []

    def traverse(node):
        if not node:
            return
        traverse(node.left)     # 1. Left
        result.append(node.val) # 2. Root
        traverse(node.right)    # 3. Right

    traverse(root)
    return result`,
        optimizedCode: `# Python In-Order Generator (Lazy Streaming Evaluation)
def inorder_generator(root):
    if root:
        yield from inorder_generator(root.left)
        yield root.val
        yield from inorder_generator(root.right)`,
        linesBreakdown: [
          {
            codeLine: 'traverse(node.left); result.append(node.val); traverse(node.right)',
            title: 'Line 1: Left -> Root -> Right Pattern in Python',
            badge: 'L-N-R PATTERN',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Core traversal structure.',
            keyQuestion: 'What is the time complexity of In-Order traversal?',
            explanation: 'O(n) where n is the total number of nodes in the tree, because every single node is visited exactly once.',
            invariant: 'O(n) time, O(h) call stack memory.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `public class InorderTraversal {
    public static List<Integer> inorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }

    private static void traverse(TreeNode node, List<Integer> result) {
        if (node == null) return;
        traverse(node.left, result);  // Left
        result.add(node.val);         // Root
        traverse(node.right, result); // Right
    }
}`,
        optimizedCode: `// Java Iterative Inorder with Deque Stack
public static List<Integer> inorderIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode curr = root;

    while (curr != null || !stack.isEmpty()) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        result.add(curr.val);
        curr = curr.right;
    }
    return result;
}`,
        linesBreakdown: [
          {
            codeLine: 'traverse(node.left, result); result.add(node.val);',
            title: 'Recursive accumulator in Java',
            badge: 'JAVA L-N-R',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Passes shared ArrayList down the stack.',
            keyQuestion: 'What is the maximum depth of recursion stack?',
            explanation: 'The height of the tree h. On balanced trees, h = log n. On completely skewed trees, h = n.',
            invariant: 'Space complexity is O(h).'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `#include <vector>

void inorderHelper(TreeNode* node, std::vector<int>& res) {
    if (!node) return;
    inorderHelper(node->left, res);  // Left
    res.push_back(node->val);        // Root
    inorderHelper(node->right, res); // Right
}

std::vector<int> inorder(TreeNode* root) {
    std::vector<int> res;
    inorderHelper(root, res);
    return res;
}`,
        optimizedCode: `// C++ Morris Inorder Traversal (O(1) Space - Threaded Binary Tree!)
std::vector<int> morrisInorder(TreeNode* root) {
    std::vector<int> res;
    TreeNode* curr = root;

    while (curr) {
        if (!curr->left) {
            res.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* prev = curr->left;
            while (prev->right && prev->right != curr) prev = prev->right;
            if (!prev->right) {
                prev->right = curr; // Create temporary thread
                curr = curr->left;
            } else {
                prev->right = nullptr; // Remove thread
                res.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return res;
}`,
        linesBreakdown: [
          {
            codeLine: 'inorderHelper(node->left, res); res.push_back(node->val);',
            title: 'C++ Pass-by-reference vector',
            badge: 'C++ STL',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Efficiently appends to single result vector.',
            keyQuestion: 'What is Morris Traversal in the optimized tab?',
            explanation: 'Morris Traversal is an advanced interview technique that uses temporary "threads" in unused leaf pointers to achieve In-Order traversal in O(n) time and strictly O(1) space with NO stack at all!',
            invariant: 'Optimal memory footprint.'
          }
        ]
      }
    },
    dryRun: {
      graphDescription: 'BST: Root = 4, Left = 2 (L:1, R:3), Right = 5.',
      steps: [
        { round: 'Step 1', action: 'Go left from 4 to 2, then left from 2 to 1. 1 has no left child.', queue: 'Stack: [4, 2, 1]', visited: 'Reached 1', visitedOrder: 'Leftmost node found' },
        { round: 'Step 2', action: 'Record 1. 1 has no right child -> Backtrack to 2.', queue: 'Stack: [4, 2]', visited: '1 processed', visitedOrder: '[1]' },
        { round: 'Step 3', action: 'Record 2. Move to 2\'s right child 3. Record 3 -> Backtrack to 4.', queue: 'Stack: [4]', visited: '2 & 3 processed', visitedOrder: '[1, 2, 3]' },
        { round: 'Step 4', action: 'Record 4. Move to 4\'s right child 5. Record 5. Complete!', queue: 'Stack: []', visited: '4 & 5 processed', visitedOrder: '[1, 2, 3, 4, 5] (Strictly Sorted!)' }
      ]
    },
    vivaTraps: [
      {
        q: 'How can you verify whether a given binary tree is a VALID Binary Search Tree (BST)?',
        a: 'Perform an In-Order traversal! If the output sequence is strictly monotonically increasing (each element strictly greater than the previous one with no duplicates), the tree is guaranteed to be a valid BST.'
      }
    ]
  },

  preorder: {
    title: 'Pre-Order Traversal: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of Pre-Order (Root -> Left -> Right): Tree serialization, directory hierarchy cloning, and prefix notation.',
    badge: 'TREE TRAVERSAL • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `// Standard Recursive Pre-Order Traversal (Root -> Left -> Right)
function preorder(root) {
  const result = [];

  function traverse(node) {
    if (!node) return; // Base Case: empty pointer

    result.push(node.val); // 1. ROOT: Process current node FIRST
    traverse(node.left);   // 2. LEFT: Recursively visit left child
    traverse(node.right);  // 3. RIGHT: Recursively visit right child
  }

  traverse(root);
  return result;
}`,
        optimizedCode: `// Iterative Pre-Order Traversal using an Explicit Stack
function preorderIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val); // Process Root

    // Note: Push RIGHT child first so that LEFT child sits on top (LIFO)!
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}`,
        linesBreakdown: [
          {
            codeLine: 'result.push(node.val);',
            title: 'Line 1: result.push(node.val); — Processing Root FIRST',
            badge: 'STEP 1: ROOT FIRST',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Processes the current node before visiting either of its children.',
            keyQuestion: 'Why is it named "Pre-Order"?',
            explanation: '• The Meaning of "Pre":\n"Pre" means BEFORE. The root is processed BEFORE any children are explored:\n[ROOT] -> LEFT -> RIGHT.\n• Real-World Example:\nThink of creating a backup copy or file directory printout. You must create the main folder BEFORE you can create the sub-folders inside it!',
            invariant: 'Every parent node appears before all of its descendants in the output array.'
          },
          {
            codeLine: 'traverse(node.left); traverse(node.right);',
            title: 'Line 2: Visiting Children in Natural Hierarchy',
            badge: 'STEP 2 & 3: CHILDREN',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Traverses the entire left branch, followed by the entire right branch.',
            keyQuestion: 'In iterative Pre-Order, why do we push the RIGHT child before the LEFT child?',
            explanation: '• The LIFO Stack Rule:\nA Stack is Last-In, First-Out. If you want the LEFT child to be processed first, it MUST sit on top of the stack! Therefore, you must push RIGHT first, and then push LEFT second so LEFT is popped first.',
            invariant: 'Maintains canonical depth-first prefix sequencing.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def preorder(root):
    result = []

    def traverse(node):
        if not node:
            return
        result.append(node.val) # 1. Root
        traverse(node.left)      # 2. Left
        traverse(node.right)     # 3. Right

    traverse(root)
    return result`,
        optimizedCode: `# Iterative Preorder in Python
def preorder_iterative(root):
    if not root:
        return []
    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right:
            stack.append(node.right) # Push right first
        if node.left:
            stack.append(node.left)  # Push left second (popped first)
    return result`,
        linesBreakdown: [
          {
            codeLine: 'result.append(node.val); traverse(node.left); traverse(node.right)',
            title: 'Line 1: Root -> Left -> Right in Python',
            badge: 'N-L-R PATTERN',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Pre-order traversal order.',
            keyQuestion: 'What is Pre-Order used for in software engineering?',
            explanation: 'Pre-Order traversal is used to clone a tree, serialize a tree into a file/database, and evaluate prefix mathematical expressions (Polish Notation).',
            invariant: 'Generates canonical tree serialization.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `public class PreorderTraversal {
    public static List<Integer> preorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }

    private static void traverse(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);         // Root
        traverse(node.left, result);  // Left
        traverse(node.right, result); // Right
    }
}`,
        optimizedCode: `// Java Iterative Preorder with Deque
public static List<Integer> preorderIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    Deque<TreeNode> stack = new ArrayDeque<>();
    stack.push(root);

    while (!stack.isEmpty()) {
        TreeNode curr = stack.pop();
        result.add(curr.val);
        if (curr.right != null) stack.push(curr.right);
        if (curr.left != null) stack.push(curr.left);
    }
    return result;
}`,
        linesBreakdown: [
          {
            codeLine: 'stack.push(curr.right); stack.push(curr.left);',
            title: 'Java LIFO stack order inversion',
            badge: 'LIFO TRICK',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Pushes right child first so left child is popped first.',
            keyQuestion: 'What is the auxiliary space complexity?',
            explanation: 'O(h) where h is the maximum height of the tree.',
            invariant: 'O(h) space complexity.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `#include <vector>

void preorderHelper(TreeNode* node, std::vector<int>& res) {
    if (!node) return;
    res.push_back(node->val);         // Root
    preorderHelper(node->left, res);  // Left
    preorderHelper(node->right, res); // Right
}

std::vector<int> preorder(TreeNode* root) {
    std::vector<int> res;
    preorderHelper(root, res);
    return res;
}`,
        optimizedCode: `// C++ Iterative Preorder with std::stack
#include <stack>

std::vector<int> preorderIterative(TreeNode* root) {
    std::vector<int> res;
    if (!root) return res;
    std::stack<TreeNode*> s;
    s.push(root);

    while (!s.empty()) {
        TreeNode* curr = s.top();
        s.pop();
        res.push_back(curr->val);
        if (curr->right) s.push(curr->right);
        if (curr->left) s.push(curr->left);
    }
    return res;
}`,
        linesBreakdown: [
          {
            codeLine: 'res.push_back(node->val); preorderHelper(node->left, res);',
            title: 'C++ Root-first recursion',
            badge: 'ROOT FIRST',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Appends root value then recursively visits children.',
            keyQuestion: 'What is the time complexity in C++?',
            explanation: 'O(n) linear time, visiting every node exactly once.',
            invariant: 'O(n) runtime complexity.'
          }
        ]
      }
    },
    dryRun: {
      graphDescription: 'Tree: Root = 1, Left = 2 (L:4, R:5), Right = 3.',
      steps: [
        { round: 'Step 1', action: 'Process Root 1 immediately.', queue: 'Result: [1]', visited: '1 processed', visitedOrder: '[1]' },
        { round: 'Step 2', action: 'Move to Left child 2. Process Root 2 immediately.', queue: 'Result: [1, 2]', visited: '2 processed', visitedOrder: '[1, 2]' },
        { round: 'Step 3', action: 'Move to Left child 4. Process Root 4. Dead end -> backtrack to 2.', queue: 'Result: [1, 2, 4]', visited: '4 processed', visitedOrder: '[1, 2, 4]' },
        { round: 'Step 4', action: 'Move to 2\'s Right child 5. Process Root 5. Dead end -> backtrack to 1.', queue: 'Result: [1, 2, 4, 5]', visited: '5 processed', visitedOrder: '[1, 2, 4, 5]' },
        { round: 'Step 5', action: 'Move to 1\'s Right child 3. Process Root 3. Traversal complete!', queue: 'Result: [1, 2, 4, 5, 3]', visited: '3 processed', visitedOrder: '[1, 2, 4, 5, 3] (Pre-Order Result)' }
      ]
    },
    vivaTraps: [
      {
        q: 'Given only the Pre-Order traversal of a general binary tree, can you uniquely reconstruct the original tree?',
        a: 'No! Pre-Order alone is not sufficient for a general binary tree because you cannot determine where the left subtree ends and the right subtree begins. You need BOTH Pre-Order AND In-Order traversals. (Exception: If it is a Binary Search Tree (BST), Pre-Order alone IS sufficient because BST sorting properties allow you to find the split point!).'
      }
    ]
  }
};

export default function TreeCodeExplanation({ algoKey = 'bst_insert' }) {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [codeMode, setCodeMode] = useState('standard'); // 'standard' | 'optimized'
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'dryrun' | 'traps'
  const [copied, setCopied] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const data = treeCodeExplanations[algoKey] || treeCodeExplanations.bst_insert;
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
      <div className="relative bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Binary className="w-3.5 h-3.5" />
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
              <Code2 className="w-4 h-4 text-emerald-400" />
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
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105 border border-emerald-400/50'
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
                ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Standard (Recursive)
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
              <span>Iterative / Optimization</span>
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
        <pre className="selection:bg-emerald-500/30 selection:text-white">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 sm:px-8">
        <button
          onClick={() => setActiveTab('breakdown')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'breakdown'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-xl'
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
                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-xl'
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
                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-xl'
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
                Designed for students learning trees & recursion with zero prior programming experience.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              {currentLangData.label} Syntax Active
            </span>
          </div>

          <div className="space-y-4">
            {currentLangData.linesBreakdown.map((item, idx) => {
              const isExpanded = expandedCard === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:border-emerald-300 transition-all overflow-hidden"
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
                      <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
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

                      <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-line font-normal">
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
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900">
            <strong>Example Setup:</strong> {data.dryRun.graphDescription}
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
                    State / Subtree: <strong className="text-emerald-700">{st.queue}</strong>
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
          <span>Switch between languages anytime to inspect how pointers, recursion, and object classes map across JS, Python, Java, and C++.</span>
        </span>
        <span className="text-emerald-700 font-bold">
          AlgoArena Tree Code Master &bull; {data.title.split(':')[0]}
        </span>
      </div>
    </div>
  );
}

