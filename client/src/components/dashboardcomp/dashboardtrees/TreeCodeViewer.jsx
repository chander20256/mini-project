import React, { useState } from 'react';
import { Code2, Copy, Check, Info, MessageSquareCode } from 'lucide-react';

const treeCodeMap = {
  bst_insert: {
    name: 'BST Insertion',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) {
    root.left = insert(root.left, val);
  } else if (val > root.val) {
    root.right = insert(root.right, val);
  }
  return root;
}`,
        lines: [
          { code: 'function insert(root, val) {', comment: '// recursive BST insertion', explanation: 'Function: Traverses tree to place new value according to BST rules.' },
          { code: '  if (!root) return new TreeNode(val);', comment: '// base case: found empty spot', explanation: 'Base Case: When an empty pointer (null) is reached, create the new node here!' },
          { code: '  if (val < root.val) {', comment: '// smaller -> go left', explanation: 'BST Property: Values smaller than current node must live in the left subtree.' },
          { code: '    root.left = insert(root.left, val);', comment: '// recurse left', explanation: 'Recurse: Traverse down into left child and link returned node.' },
          { code: '  } else if (val > root.val) {', comment: '// greater -> go right', explanation: 'BST Property: Values greater than current node must live in the right subtree.' },
          { code: '    root.right = insert(root.right, val);', comment: '// recurse right', explanation: 'Recurse: Traverse down into right child and link returned node.' },
          { code: '  }', comment: '', explanation: 'Duplicates ignored (standard BST contains unique keys).' },
          { code: '  return root;', comment: '// return updated root', explanation: 'Return: Returns root pointer after child links are updated.' },
          { code: '}', comment: '', explanation: 'Insertion complete.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    elif val > root.val:
        root.right = insert(root.right, val)
    return root`,
        lines: [
          { code: 'def insert(root, val):', comment: '# recursive insertion', explanation: 'Recursive function to insert node val into BST.' },
          { code: '    if not root:', comment: '# empty spot found', explanation: 'Base Case: None reached; allocate new TreeNode with value.' },
          { code: '        return TreeNode(val)', comment: '', explanation: 'Return newly created leaf node.' },
          { code: '    if val < root.val:', comment: '# go left if smaller', explanation: 'BST rule: Smaller values route to the left subtree.' },
          { code: '        root.left = insert(root.left, val)', comment: '# link left', explanation: 'Recursively insert in left subtree.' },
          { code: '    elif val > root.val:', comment: '# go right if larger', explanation: 'BST rule: Larger values route to the right subtree.' },
          { code: '        root.right = insert(root.right, val)', comment: '# link right', explanation: 'Recursively insert in right subtree.' },
          { code: '    return root', comment: '# return root', explanation: 'Return current root pointer up the recursion stack.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `TreeNode insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) {
        root.left = insert(root.left, val);
    } else if (val > root.val) {
        root.right = insert(root.right, val);
    }
    return root;
}`,
        lines: [
          { code: 'TreeNode insert(TreeNode root, int val) {', comment: '// BST insert', explanation: 'Java recursive method to insert val into BST.' },
          { code: '    if (root == null) return new TreeNode(val);', comment: '// base case', explanation: 'If null reached, instantiate new TreeNode(val).' },
          { code: '    if (val < root.val) {', comment: '// route left', explanation: 'If val is strictly less than current node, branch left.' },
          { code: '        root.left = insert(root.left, val);', comment: '', explanation: 'Recursive left call.' },
          { code: '    } else if (val > root.val) {', comment: '// route right', explanation: 'If val is strictly greater than current node, branch right.' },
          { code: '        root.right = insert(root.right, val);', comment: '', explanation: 'Recursive right call.' },
          { code: '    }', comment: '', explanation: 'Equal values ignored.' },
          { code: '    return root;', comment: '// return pointer', explanation: 'Return root node reference.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val)
        root->left = insert(root->left, val);
    else if (val > root->val)
        root->right = insert(root->right, val);
    return root;
}`,
        lines: [
          { code: 'TreeNode* insert(TreeNode* root, int val) {', comment: '// pointer insert', explanation: 'C++ pointer-based BST insertion.' },
          { code: '    if (!root) return new TreeNode(val);', comment: '// base case', explanation: 'Heap allocate new node when null pointer reached.' },
          { code: '    if (val < root->val)', comment: '// left subtree', explanation: 'Traverse left if val is smaller.' },
          { code: '        root->left = insert(root->left, val);', comment: '', explanation: 'Assign returned pointer to left child.' },
          { code: '    else if (val > root->val)', comment: '// right subtree', explanation: 'Traverse right if val is greater.' },
          { code: '        root->right = insert(root->right, val);', comment: '', explanation: 'Assign returned pointer to right child.' },
          { code: '    return root;', comment: '// return root', explanation: 'Return root pointer.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  },
  bst_search: {
    name: 'BST Search',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function search(root, target) {
  if (!root || root.val === target) return root;
  if (target < root.val) {
    return search(root.left, target);
  }
  return search(root.right, target);
}`,
        lines: [
          { code: 'function search(root, target) {', comment: '// recursive search', explanation: 'Function: Locates node matching target value in O(h) time.' },
          { code: '  if (!root || root.val === target) return root;', comment: '// found or empty', explanation: 'Base Case: If root is null (not found) or matches target (found!), return root.' },
          { code: '  if (target < root.val) {', comment: '// target smaller -> go left', explanation: 'BST Property: Target must be in left subtree since it is smaller.' },
          { code: '    return search(root.left, target);', comment: '// search left', explanation: 'Discard right half of tree; recurse left.' },
          { code: '  }', comment: '', explanation: 'Target is larger.' },
          { code: '  return search(root.right, target);', comment: '// search right', explanation: 'Discard left half of tree; recurse right.' },
          { code: '}', comment: '', explanation: 'Search complete.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `def search(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search(root.left, target)
    return search(root.right, target)`,
        lines: [
          { code: 'def search(root, target):', comment: '# BST search', explanation: 'Recursive lookup for target value.' },
          { code: '    if not root or root.val == target:', comment: '# found or reached leaf', explanation: 'Base Case: Stop if target matched or None reached.' },
          { code: '        return root', comment: '', explanation: 'Return node or None.' },
          { code: '    if target < root.val:', comment: '# check left', explanation: 'If target is smaller, search left subtree.' },
          { code: '        return search(root.left, target)', comment: '', explanation: 'Return left search result.' },
          { code: '    return search(root.right, target)', comment: '# check right', explanation: 'Otherwise search right subtree.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `TreeNode search(TreeNode root, int target) {
    if (root == null || root.val == target) return root;
    if (target < root.val) return search(root.left, target);
    return search(root.right, target);
}`,
        lines: [
          { code: 'TreeNode search(TreeNode root, int target) {', comment: '// binary search on tree', explanation: 'Java BST search method.' },
          { code: '    if (root == null || root.val == target) return root;', comment: '// base case', explanation: 'Return root if null or target match.' },
          { code: '    if (target < root.val) return search(root.left, target);', comment: '// branch left', explanation: 'Search left subtree if target < root.val.' },
          { code: '    return search(root.right, target);', comment: '// branch right', explanation: 'Search right subtree if target > root.val.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `TreeNode* search(TreeNode* root, int target) {
    if (!root || root->val == target) return root;
    if (target < root->val) return search(root->left, target);
    return search(root->right, target);
}`,
        lines: [
          { code: 'TreeNode* search(TreeNode* root, int target) {', comment: '// O(h) search', explanation: 'C++ BST search implementation.' },
          { code: '    if (!root || root->val == target) return root;', comment: '// base case', explanation: 'Base case.' },
          { code: '    if (target < root->val) return search(root->left, target);', comment: '// recurse left', explanation: 'Branch left.' },
          { code: '    return search(root->right, target);', comment: '// recurse right', explanation: 'Branch right.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  },
  inorder: {
    name: 'Inorder Traversal (L-Root-R)',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);  // 1. Visit Left Subtree
  result.push(root.val);       // 2. Visit Root Node
  inorder(root.right, result); // 3. Visit Right Subtree
  return result;
}`,
        lines: [
          { code: 'function inorder(root, result = []) {', comment: '// L -> Root -> R', explanation: 'Inorder Traversal: Left Subtree -> Current Root -> Right Subtree.' },
          { code: '  if (!root) return result;', comment: '// base case: empty leaf', explanation: 'Base Case: Stop when null node is reached.' },
          { code: '  inorder(root.left, result);', comment: '// 1. Traverse Left Subtree', explanation: 'Step 1: Recurse into all smaller elements in the left subtree.' },
          { code: '  result.push(root.val);', comment: '// 2. Process Current Root', explanation: 'Step 2: Visit current node (For BST, this yields SORTED order!).' },
          { code: '  inorder(root.right, result);', comment: '// 3. Traverse Right Subtree', explanation: 'Step 3: Recurse into all larger elements in the right subtree.' },
          { code: '  return result;', comment: '// return array', explanation: 'Returns sorted array of tree values.' },
          { code: '}', comment: '', explanation: 'Traversal finished.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)`,
        lines: [
          { code: 'def inorder(root):', comment: '# Left -> Root -> Right', explanation: 'Python recursive inorder traversal.' },
          { code: '    if not root:', comment: '# base case', explanation: 'Base case returns empty list.' },
          { code: '        return []', comment: '', explanation: 'Return empty list.' },
          { code: '    # Inorder: Left Subtree + [Root] + Right Subtree', comment: '# sorted order for BST', explanation: 'Combines left list + root + right list.' },
          { code: '    return inorder(root.left) + [root.val] + inorder(root.right)', comment: '', explanation: 'Concatenates recursive sub-traversals.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `void inorder(TreeNode root, List<Integer> res) {
    if (root == null) return;
    inorder(root.left, res);  // 1. Left
    res.add(root.val);         // 2. Root
    inorder(root.right, res); // 3. Right
}`,
        lines: [
          { code: 'void inorder(TreeNode root, List<Integer> res) {', comment: '// L-Root-R', explanation: 'Java recursive inorder traversal.' },
          { code: '    if (root == null) return;', comment: '// base case', explanation: 'Return if node is null.' },
          { code: '    inorder(root.left, res);', comment: '// 1. Traverse left', explanation: 'Traverse left subtree.' },
          { code: '    res.add(root.val);', comment: '// 2. Add root value', explanation: 'Add root value to result list.' },
          { code: '    inorder(root.right, res);', comment: '// 3. Traverse right', explanation: 'Traverse right subtree.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `void inorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}`,
        lines: [
          { code: 'void inorder(TreeNode* root, vector<int>& res) {', comment: '// Left-Root-Right', explanation: 'C++ inorder traversal with reference vector.' },
          { code: '    if (!root) return;', comment: '// base case', explanation: 'Base case.' },
          { code: '    inorder(root->left, res);', comment: '// 1. Left', explanation: 'Recurse left.' },
          { code: '    res.push_back(root->val);', comment: '// 2. Root', explanation: 'Push root value.' },
          { code: '    inorder(root->right, res);', comment: '// 3. Right', explanation: 'Recurse right.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  },
  preorder: {
    name: 'Preorder Traversal (Root-L-R)',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);        // 1. Visit Root Node First
  preorder(root.left, result);  // 2. Visit Left Subtree
  preorder(root.right, result); // 3. Visit Right Subtree
  return result;
}`,
        lines: [
          { code: 'function preorder(root, result = []) {', comment: '// Root -> L -> R', explanation: 'Preorder Traversal: Root -> Left Subtree -> Right Subtree.' },
          { code: '  if (!root) return result;', comment: '// base case', explanation: 'Base case: empty node.' },
          { code: '  result.push(root.val);', comment: '// 1. Visit Root First!', explanation: 'Step 1: Visit root before its children (useful for cloning/serializing trees).' },
          { code: '  preorder(root.left, result);', comment: '// 2. Traverse Left', explanation: 'Step 2: Recurse into left subtree.' },
          { code: '  preorder(root.right, result);', comment: '// 3. Traverse Right', explanation: 'Step 3: Recurse into right subtree.' },
          { code: '  return result;', comment: '', explanation: 'Returns preorder list.' },
          { code: '}', comment: '', explanation: 'Traversal finished.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)`,
        lines: [
          { code: 'def preorder(root):', comment: '# Root -> Left -> Right', explanation: 'Python preorder traversal.' },
          { code: '    if not root:', comment: '# base case', explanation: 'Base case returns empty list.' },
          { code: '        return []', comment: '', explanation: 'Return empty.' },
          { code: '    # Preorder: [Root] + Left Subtree + Right Subtree', comment: '# root first', explanation: 'Root is evaluated first.' },
          { code: '    return [root.val] + preorder(root.left) + preorder(root.right)', comment: '', explanation: 'Concatenates root + left + right.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `void preorder(TreeNode root, List<Integer> res) {
    if (root == null) return;
    res.add(root.val);         // 1. Root
    preorder(root.left, res);  // 2. Left
    preorder(root.right, res); // 3. Right
}`,
        lines: [
          { code: 'void preorder(TreeNode root, List<Integer> res) {', comment: '// Root-L-R', explanation: 'Java preorder traversal.' },
          { code: '    if (root == null) return;', comment: '// base case', explanation: 'Return on null.' },
          { code: '    res.add(root.val);', comment: '// 1. Visit Root First', explanation: 'Process root node.' },
          { code: '    preorder(root.left, res);', comment: '// 2. Left', explanation: 'Recurse left.' },
          { code: '    preorder(root.right, res);', comment: '// 3. Right', explanation: 'Recurse right.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `void preorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    res.push_back(root->val);
    preorder(root->left, res);
    preorder(root->right, res);
}`,
        lines: [
          { code: 'void preorder(TreeNode* root, vector<int>& res) {', comment: '// Root-Left-Right', explanation: 'C++ preorder traversal.' },
          { code: '    if (!root) return;', comment: '// base case', explanation: 'Base case.' },
          { code: '    res.push_back(root->val);', comment: '// 1. Root', explanation: 'Add root value.' },
          { code: '    preorder(root->left, res);', comment: '// 2. Left', explanation: 'Recurse left.' },
          { code: '    preorder(root->right, res);', comment: '// 3. Right', explanation: 'Recurse right.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  }
};

export default function TreeCodeViewer({ algoKey = 'bst_insert', activeLine = -1 }) {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [showComments, setShowComments] = useState(true);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [copied, setCopied] = useState(false);

  const algoData = treeCodeMap[algoKey] || treeCodeMap.bst_insert;
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
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-bold text-slate-100 text-xs sm:text-sm tracking-tight whitespace-nowrap">
            Tree Code &amp; Tracing
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
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
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
                ? 'bg-slate-800 text-emerald-400 border-slate-700'
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
              <Check className="w-3.5 h-3.5 text-emerald-400" />
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
                  ? 'bg-emerald-600/30 text-emerald-200 border-l-2 border-emerald-400 font-semibold shadow-inner'
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
                <span className="text-[11px] text-emerald-400/80 font-mono italic whitespace-nowrap ml-6 select-none shrink-0">
                  {lineObj.comment}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Panel: Interactive Line Logic */}
      <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/50">
        <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5" />
        </div>
        <div className="text-xs leading-relaxed min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-slate-200 text-[11px]">
              Line {activeOrHoveredIndex + 1} Logic:
            </span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800/60">
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

