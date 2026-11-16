import React, { useState } from 'react';
import { Code2, Copy, Check, Info, Sparkles, MessageSquareCode } from 'lucide-react';

const algorithmCodeMap = {
  bubble: {
    name: 'Bubble Sort',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `for (let i = 0; i < n - 1; i++) {
  for (let j = 0; j < n - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}`,
        lines: [
          { code: 'for (let i = 0; i < n - 1; i++) {', comment: '// outer pass (n-1 times)', explanation: 'Outer Loop: Controls number of passes. After pass i, the (i+1)-th largest element settles at the end.' },
          { code: '  for (let j = 0; j < n - i - 1; j++) {', comment: '// unsorted window', explanation: 'Inner Loop: Compares adjacent pairs. "n - i - 1" stops before already-sorted elements at the end.' },
          { code: '    if (arr[j] > arr[j + 1]) {', comment: '// out of order?', explanation: 'Comparison: Checks if left element is greater than right neighbor. If true, they violate ascending order.' },
          { code: '      let temp = arr[j];', comment: '// swap', explanation: 'Swap (Part 1): Stores left element into temporary variable temp.' },
          { code: '      arr[j] = arr[j + 1];', comment: '', explanation: 'Swap (Part 2): Moves smaller right element into position j.' },
          { code: '      arr[j + 1] = temp;', comment: '// bubble up', explanation: 'Swap (Part 3): Places larger element into position j+1 (bubbled rightward).' },
          { code: '    }', comment: '', explanation: 'End of swap block.' },
          { code: '  }', comment: '', explanation: 'Pass complete: one more element locked in sorted position.' },
          { code: '}', comment: '', explanation: 'Algorithm complete: entire array is sorted.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `for i in range(n - 1):
    for j in range(0, n - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
        lines: [
          { code: 'for i in range(n - 1):', comment: '# n-1 passes', explanation: 'Outer Loop: Runs n-1 passes. After each round, largest remaining element bubbles to the end.' },
          { code: '    for j in range(0, n - i - 1):', comment: '# unsorted range', explanation: 'Inner Loop: Iterates over unsorted prefix. (n - i - 1) ignores already sorted elements.' },
          { code: '        if arr[j] > arr[j + 1]:', comment: '# out of order?', explanation: 'Condition: Evaluates if neighbor on left is greater than neighbor on right.' },
          { code: '            arr[j], arr[j + 1] = arr[j + 1], arr[j]', comment: '# O(1) tuple swap', explanation: 'Pythonic Swap: Simultaneously swaps adjacent elements using tuple unpacking in O(1).' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}`,
        lines: [
          { code: 'for (int i = 0; i < n - 1; i++) {', comment: '// n-1 passes', explanation: 'Outer Loop: Executes n-1 passes over the array to place all elements.' },
          { code: '    for (int j = 0; j < n - i - 1; j++) {', comment: '// unsorted window', explanation: 'Inner Loop: Compares adjacent elements, avoiding the already sorted tail.' },
          { code: '        if (arr[j] > arr[j + 1]) {', comment: '// compare pair', explanation: 'Check: True if left element is strictly greater than right element.' },
          { code: '            int temp = arr[j];', comment: '// 3-step swap', explanation: 'Swap: Saves current element into integer temp.' },
          { code: '            arr[j] = arr[j + 1];', comment: '', explanation: 'Swap: Shifts smaller element leftward to index j.' },
          { code: '            arr[j + 1] = temp;', comment: '', explanation: 'Swap: Assigns temp value to index j+1.' },
          { code: '        }', comment: '', explanation: 'End if condition.' },
          { code: '    }', comment: '', explanation: 'End inner loop.' },
          { code: '}', comment: '', explanation: 'End outer loop. Array is fully sorted.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            std::swap(arr[j], arr[j + 1]);
        }
    }
}`,
        lines: [
          { code: 'for (int i = 0; i < n - 1; i++) {', comment: '// n-1 passes', explanation: 'Outer Loop: Runs n-1 passes through the container.' },
          { code: '    for (int j = 0; j < n - i - 1; j++) {', comment: '// unsorted boundary', explanation: 'Inner Loop: Scans adjacent elements within the unsorted section.' },
          { code: '        if (arr[j] > arr[j + 1]) {', comment: '// compare', explanation: 'Condition: Detects inverted adjacent elements.' },
          { code: '            std::swap(arr[j], arr[j + 1]);', comment: '// std::swap', explanation: 'STL Swap: Swaps elements in-place to bubble up the larger value.' },
          { code: '        }', comment: '', explanation: 'End if.' },
          { code: '    }', comment: '', explanation: 'End inner loop.' },
          { code: '}', comment: '', explanation: 'Sorted.' }
        ]
      }
    }
  },
  selection: {
    name: 'Selection Sort',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `for (let i = 0; i < n - 1; i++) {
  let minIdx = i;
  for (let j = i + 1; j < n; j++) {
    if (arr[j] < arr[minIdx]) minIdx = j;
  }
  let temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
}`,
        lines: [
          { code: 'for (let i = 0; i < n - 1; i++) {', comment: '// sorted boundary', explanation: 'Outer Loop: Moves the boundary between sorted and unsorted regions forward.' },
          { code: '  let minIdx = i;', comment: '// assume i is min', explanation: 'Min Candidate: Assumes the first unsorted element is currently the minimum.' },
          { code: '  for (let j = i + 1; j < n; j++) {', comment: '// scan rest', explanation: 'Inner Loop: Scans remaining unsorted elements to find the true minimum.' },
          { code: '    if (arr[j] < arr[minIdx]) minIdx = j;', comment: '// update min', explanation: 'Min Check: Updates minIdx whenever an element smaller than arr[minIdx] is found.' },
          { code: '  }', comment: '', explanation: 'Scan finished: minIdx points to smallest element in unsorted section.' },
          { code: '  let temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;', comment: '// swap to i', explanation: 'Swap: Places found minimum into its final sorted position at index i.' },
          { code: '}', comment: '', explanation: 'Entire array is now sorted.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `for i in range(n - 1):
    min_idx = i
    for j in range(i + 1, n):
        if arr[j] < arr[min_idx]:
            min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
        lines: [
          { code: 'for i in range(n - 1):', comment: '# sorted boundary', explanation: 'Outer Loop: Iterates through array to place smallest remaining element at index i.' },
          { code: '    min_idx = i', comment: '# assume i is min', explanation: 'Initialize candidate minimum index to current position i.' },
          { code: '    for j in range(i + 1, n):', comment: '# find smallest', explanation: 'Inner Loop: Checks each remaining element in the unsorted subarray.' },
          { code: '        if arr[j] < arr[min_idx]:', comment: '# smaller found?', explanation: 'Check: True if element at j is strictly smaller than element at min_idx.' },
          { code: '            min_idx = j', comment: '# record index', explanation: 'Record index: min_idx now tracks newly discovered smallest value.' },
          { code: '    arr[i], arr[min_idx] = arr[min_idx], arr[i]', comment: '# swap to pos i', explanation: 'Swap: Swaps minimum element into index i in one step.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
    }
    int temp = arr[minIdx]; arr[minIdx] = arr[i]; arr[i] = temp;
}`,
        lines: [
          { code: 'for (int i = 0; i < n - 1; i++) {', comment: '// move boundary', explanation: 'Outer Loop: Advances sorted boundary index by index.' },
          { code: '    int minIdx = i;', comment: '// candidate min', explanation: 'Initialize minimum index candidate to current index i.' },
          { code: '    for (int j = i + 1; j < n; j++) {', comment: '// linear scan', explanation: 'Inner Loop: Scans remaining unsorted elements.' },
          { code: '        if (arr[j] < arr[minIdx]) minIdx = j;', comment: '// update min', explanation: 'Update: If element at j is smaller, remember index j as new min.' },
          { code: '    }', comment: '', explanation: 'Search completed for pass i.' },
          { code: '    int temp = arr[minIdx]; arr[minIdx] = arr[i]; arr[i] = temp;', comment: '// swap', explanation: 'Swap: Moves smallest unsorted element to its final spot at index i.' },
          { code: '}', comment: '', explanation: 'Array sorted.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
    }
    std::swap(arr[i], arr[minIdx]);
}`,
        lines: [
          { code: 'for (int i = 0; i < n - 1; i++) {', comment: '// boundary', explanation: 'Outer Loop: Expands sorted partition.' },
          { code: '    int minIdx = i;', comment: '// candidate', explanation: 'Current minimum candidate.' },
          { code: '    for (int j = i + 1; j < n; j++) {', comment: '// scan', explanation: 'Search unsorted partition for smaller value.' },
          { code: '        if (arr[j] < arr[minIdx]) minIdx = j;', comment: '// update', explanation: 'Record new minimum index.' },
          { code: '    }', comment: '', explanation: 'Search complete.' },
          { code: '    std::swap(arr[i], arr[minIdx]);', comment: '// swap', explanation: 'Swap minimum into position i.' },
          { code: '}', comment: '', explanation: 'Sorted.' }
        ]
      }
    }
  },
  insertion: {
    name: 'Insertion Sort',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `for (let i = 1; i < n; i++) {
  let key = arr[i];
  let j = i - 1;
  while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j];
    j = j - 1;
  }
  arr[j + 1] = key;
}`,
        lines: [
          { code: 'for (let i = 1; i < n; i++) {', comment: '// start at index 1', explanation: 'Outer Loop: Starts at index 1 (element 0 is trivially sorted by itself).' },
          { code: '  let key = arr[i];', comment: '// pick key', explanation: 'Pick Key: Element to be inserted into the sorted subarray on the left.' },
          { code: '  let j = i - 1;', comment: '// predecessor', explanation: 'Pointer: j points to the last element of the sorted left partition.' },
          { code: '  while (j >= 0 && arr[j] > key) {', comment: '// shift greater', explanation: 'Shift Check: While sorted elements are greater than key, shift them right.' },
          { code: '    arr[j + 1] = arr[j];', comment: '// shift right', explanation: 'Shift: Copies arr[j] one slot ahead to open a space.' },
          { code: '    j = j - 1;', comment: '', explanation: 'Step: Moves pointer left to check next predecessor.' },
          { code: '  }', comment: '', explanation: 'Correct insertion index found at j + 1.' },
          { code: '  arr[j + 1] = key;', comment: '// insert key', explanation: 'Insert: Drops key into its sorted slot.' },
          { code: '}', comment: '', explanation: 'Array sorted.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `for i in range(1, n):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key`,
        lines: [
          { code: 'for i in range(1, n):', comment: '# index 1 to n-1', explanation: 'Outer Loop: Examines each unsorted element from index 1 to the end.' },
          { code: '    key = arr[i]', comment: '# store key', explanation: 'Save current value into key.' },
          { code: '    j = i - 1', comment: '# predecessor', explanation: 'Point j to rightmost element of sorted prefix.' },
          { code: '    while j >= 0 and arr[j] > key:', comment: '# shift condition', explanation: 'Shift Condition: True while previous elements are larger than key.' },
          { code: '        arr[j + 1] = arr[j]', comment: '# shift right', explanation: 'Shift: Slides element one spot rightward.' },
          { code: '        j -= 1', comment: '# move left', explanation: 'Decrement pointer j.' },
          { code: '    arr[j + 1] = key', comment: '# insert key', explanation: 'Insert key into its final sorted position.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
    }
    arr[j + 1] = key;
}`,
        lines: [
          { code: 'for (int i = 1; i < n; ++i) {', comment: '// start at 1', explanation: 'Iterate from second element to end of array.' },
          { code: '    int key = arr[i];', comment: '// key element', explanation: 'Extract key to insert into sorted prefix.' },
          { code: '    int j = i - 1;', comment: '// predecessor', explanation: 'Index of predecessor in sorted subarray.' },
          { code: '    while (j >= 0 && arr[j] > key) {', comment: '// shift', explanation: 'Shift elements greater than key one position ahead.' },
          { code: '        arr[j + 1] = arr[j];', comment: '', explanation: 'Copy element forward.' },
          { code: '        j = j - 1;', comment: '', explanation: 'Move backward.' },
          { code: '    }', comment: '', explanation: 'Slot found.' },
          { code: '    arr[j + 1] = key;', comment: '// place key', explanation: 'Insert key at correct position.' },
          { code: '}', comment: '', explanation: 'Sorted.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}`,
        lines: [
          { code: 'for (int i = 1; i < n; i++) {', comment: '// start at 1', explanation: 'Start from second element.' },
          { code: '    int key = arr[i];', comment: '// extract key', explanation: 'Store key element.' },
          { code: '    int j = i - 1;', comment: '// predecessor', explanation: 'Pointer to predecessor.' },
          { code: '    while (j >= 0 && arr[j] > key) {', comment: '// shift loop', explanation: 'Shift elements greater than key.' },
          { code: '        arr[j + 1] = arr[j];', comment: '', explanation: 'Shift element right.' },
          { code: '        j--;', comment: '', explanation: 'Decrement j.' },
          { code: '    }', comment: '', explanation: 'Found position.' },
          { code: '    arr[j + 1] = key;', comment: '// insert', explanation: 'Place key into position.' },
          { code: '}', comment: '', explanation: 'Sorted.' }
        ]
      }
    }
  },
  merge: {
    name: 'Merge Sort',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function mergeSort(arr, l, r) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}`,
        lines: [
          { code: 'function mergeSort(arr, l, r) {', comment: '// divide & conquer', explanation: 'Function: Recursively divides and sorts subarray arr[l..r].' },
          { code: '  if (l >= r) return;', comment: '// base case', explanation: 'Base Case: Subarray of length 1 or 0 is already sorted.' },
          { code: '  const m = Math.floor((l + r) / 2);', comment: '// midpoint', explanation: 'Divide: Computes midpoint to split subarray into two equal halves.' },
          { code: '  mergeSort(arr, l, m);', comment: '// sort left', explanation: 'Recurse: Recursively sorts the left half [l..m].' },
          { code: '  mergeSort(arr, m + 1, r);', comment: '// sort right', explanation: 'Recurse: Recursively sorts the right half [m+1..r].' },
          { code: '  merge(arr, l, m, r);', comment: '// conquer & merge', explanation: 'Conquer: Merges two sorted halves in O(n) linear time.' },
          { code: '}', comment: '', explanation: 'End mergeSort.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `def merge_sort(arr, l, r):
    if l >= r:
        return
    m = (l + r) // 2
    merge_sort(arr, l, m)
    merge_sort(arr, m + 1, r)
    merge(arr, l, m, r)`,
        lines: [
          { code: 'def merge_sort(arr, l, r):', comment: '# recursive split', explanation: 'Defines recursive divide-and-conquer function.' },
          { code: '    if l >= r:', comment: '# base check', explanation: 'Base case check: Single element subarray is sorted.' },
          { code: '        return', comment: '', explanation: 'Stop recursion.' },
          { code: '    m = (l + r) // 2', comment: '# midpoint', explanation: 'Integer division midpoint calculation.' },
          { code: '    merge_sort(arr, l, m)', comment: '# left half', explanation: 'Sort left partition.' },
          { code: '    merge_sort(arr, m + 1, r)', comment: '# right half', explanation: 'Sort right partition.' },
          { code: '    merge(arr, l, m, r)', comment: '# merge halves', explanation: 'Merge two sorted halves together.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
        lines: [
          { code: 'void mergeSort(int arr[], int l, int r) {', comment: '// recursive', explanation: 'Sorts arr[l..r] using divide-and-conquer.' },
          { code: '    if (l < r) {', comment: '// valid range', explanation: 'Continue while range has 2 or more elements.' },
          { code: '        int m = l + (r - l) / 2;', comment: '// overflow-safe midpoint', explanation: 'Safe midpoint avoids integer overflow for large indices.' },
          { code: '        mergeSort(arr, l, m);', comment: '// sort left', explanation: 'Recursive call on left half.' },
          { code: '        mergeSort(arr, m + 1, r);', comment: '// sort right', explanation: 'Recursive call on right half.' },
          { code: '        merge(arr, l, m, r);', comment: '// merge', explanation: 'Merge sorted halves into one sorted range.' },
          { code: '    }', comment: '', explanation: 'End if.' },
          { code: '}', comment: '', explanation: 'End method.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
        lines: [
          { code: 'void mergeSort(int arr[], int l, int r) {', comment: '', explanation: 'Divide and conquer function.' },
          { code: '    if (l >= r) return;', comment: '// base case', explanation: 'Base case.' },
          { code: '    int m = l + (r - l) / 2;', comment: '// midpoint', explanation: 'Compute middle index.' },
          { code: '    mergeSort(arr, l, m);', comment: '// left', explanation: 'Sort left half.' },
          { code: '    mergeSort(arr, m + 1, r);', comment: '// right', explanation: 'Sort right half.' },
          { code: '    merge(arr, l, m, r);', comment: '// merge', explanation: 'Merge halves in linear time.' },
          { code: '}', comment: '', explanation: 'End function.' }
        ]
      }
    }
  },
  quick: {
    name: 'Quick Sort',
    languages: {
      javascript: {
        label: 'JavaScript',
        codeText: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
        lines: [
          { code: 'function quickSort(arr, low, high) {', comment: '// in-place', explanation: 'Function: Sorts array segment [low..high] in place.' },
          { code: '  if (low < high) {', comment: '// range valid', explanation: 'Check: Continue while range has 2 or more elements.' },
          { code: '    let pi = partition(arr, low, high);', comment: '// partition pivot', explanation: 'Partition: Places pivot in sorted position pi; smaller elements move left, larger move right.' },
          { code: '    quickSort(arr, low, pi - 1);', comment: '// sort left', explanation: 'Recurse: Sorts elements strictly before pivot index pi.' },
          { code: '    quickSort(arr, pi + 1, high);', comment: '// sort right', explanation: 'Recurse: Sorts elements strictly after pivot index pi.' },
          { code: '  }', comment: '', explanation: 'End if.' },
          { code: '}', comment: '', explanation: 'Array is sorted in-place.' }
        ]
      },
      python: {
        label: 'Python',
        codeText: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`,
        lines: [
          { code: 'def quick_sort(arr, low, high):', comment: '# in-place quicksort', explanation: 'Recursive partitioning function.' },
          { code: '    if low < high:', comment: '# bounds check', explanation: 'Verify bounds.' },
          { code: '        pi = partition(arr, low, high)', comment: '# partition', explanation: 'Partition around pivot; returns sorted pivot position pi.' },
          { code: '        quick_sort(arr, low, pi - 1)', comment: '# sort left', explanation: 'Recursively sort left sub-array.' },
          { code: '        quick_sort(arr, pi + 1, high)', comment: '# sort right', explanation: 'Recursively sort right sub-array.' }
        ]
      },
      java: {
        label: 'Java',
        codeText: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        lines: [
          { code: 'void quickSort(int arr[], int low, int high) {', comment: '', explanation: 'Main QuickSort recursive method.' },
          { code: '    if (low < high) {', comment: '// check bounds', explanation: 'Continue while range contains multiple elements.' },
          { code: '        int pi = partition(arr, low, high);', comment: '// partition', explanation: 'Places pivot at index pi.' },
          { code: '        quickSort(arr, low, pi - 1);', comment: '// sort left', explanation: 'Sorts elements before partition.' },
          { code: '        quickSort(arr, pi + 1, high);', comment: '// sort right', explanation: 'Sorts elements after partition.' },
          { code: '    }', comment: '', explanation: 'End if.' },
          { code: '}', comment: '', explanation: 'Sorted.' }
        ]
      },
      cpp: {
        label: 'C++',
        codeText: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        lines: [
          { code: 'void quickSort(int arr[], int low, int high) {', comment: '', explanation: 'In-place QuickSort.' },
          { code: '    if (low < high) {', comment: '// check', explanation: 'Bounds check.' },
          { code: '        int pi = partition(arr, low, high);', comment: '// partition', explanation: 'Partition step.' },
          { code: '        quickSort(arr, low, pi - 1);', comment: '// recurse left', explanation: 'Recurse left partition.' },
          { code: '        quickSort(arr, pi + 1, high);', comment: '// recurse right', explanation: 'Recurse right partition.' },
          { code: '    }', comment: '', explanation: 'End if.' },
          { code: '}', comment: '', explanation: 'Sorted.' }
        ]
      }
    }
  }
};

export default function CodeViewer({ algoKey = 'bubble', activeLine = -1 }) {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [showComments, setShowComments] = useState(true);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [copied, setCopied] = useState(false);

  const algoData = algorithmCodeMap[algoKey] || algorithmCodeMap.bubble;
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
        {/* Left: Window Dots + Clean Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-bold text-slate-100 text-xs sm:text-sm tracking-tight whitespace-nowrap">
            Code &amp; Tracing
          </span>
        </div>

        {/* Right: Language Switcher Tabs & Actions */}
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
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
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

      {/* Code Editor Body */}
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
                  ? 'bg-blue-600/30 text-cyan-200 border-l-2 border-cyan-400 font-semibold shadow-inner'
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

      {/* Bottom Panel: Interactive Line Logic & Meaning */}
      <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/50">
        <div className="w-5 h-5 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5" />
        </div>
        <div className="text-xs leading-relaxed min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-slate-200 text-[11px]">
              Line {activeOrHoveredIndex + 1} Logic:
            </span>
            <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800/60">
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
