import React, { useState } from 'react';
import { 
  Code2, Copy, Check, ChevronDown, Sparkles, Terminal, 
  FileCode, CheckCircle2, ArrowRight, AlertCircle, Info, Zap, HelpCircle, Layers, Split, ArrowDownUp
} from 'lucide-react';

const sortingCodeExplanations = {
  bubble: {
    title: 'Bubble Sort: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of Bubble Sort: Loop boundaries (n - i - 1), adjacent swaps, stability, and the O(n) early-exit optimization.',
    badge: 'CODE DEEP DIVE • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `function bubbleSort(arr) {
  const n = arr.length;
  // Outer Loop: Controls passes (n - 1 passes total)
  for (let i = 0; i < n - 1; i++) {
    // Inner Loop: Compares adjacent pairs in unsorted window
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison: Detect inverted adjacent elements
      if (arr[j] > arr[j + 1]) {
        // In-Place 3-Step Swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
        optimizedCode: `function bubbleSortOptimized(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // Flag to track if any swap happens
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    // If no two elements were swapped, array is already sorted!
    if (!swapped) break;
  }
  return arr;
}`,
        linesBreakdown: [
          {
            codeLine: 'function bubbleSort(arr)',
            title: 'Line 1: function bubbleSort(arr) — The Function Machine & Input Box',
            badge: 'ENTRY POINT • ABSOLUTE BEGINNER',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares a reusable sorting machine named "bubbleSort" that accepts an unsorted list of numbers named "arr".',
            keyQuestion: 'What is a "function" and what does "(arr)" mean if I have never coded?',
            explanation: '• Think of a Function like a Kitchen Juicer Machine:\nYou hand it whole fruits, its blades spin, and it produces fresh juice. Here, function bubbleSort(arr) defines a machine that takes in messy numbers and outputs a neat, sorted list.\n• What is "arr"?\n"arr" is short for Array (a row of numbered boxes containing numbers, like [45, 12, 85, 32]). Putting (arr) inside the parentheses tells the computer: "Whenever someone runs this bubbleSort machine, expect them to hand over a list of numbers called arr."\n• The Curly Braces { ... }:\nEverything written between the opening "{" and closing "}" is the exact recipe / instruction manual the computer will follow.',
            invariant: 'Sets up the sorting workspace and receives the input data safely.'
          },
          {
            codeLine: 'const n = arr.length;',
            title: 'Line 2: const n = arr.length; — Counting Total Items in the List',
            badge: 'COUNT ITEMS',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Asks the computer: "How many numbers are in this list?" and saves that count into a shortcut label called "n".',
            keyQuestion: 'What does ".length" mean, and why use "const"?',
            explanation: '• What is ".length"?\nEvery array in programming has a built-in counter property called ".length". If your list has 5 numbers [5, 1, 4, 2, 8], then arr.length is automatically 5.\n• Why store it in "n"?\nTyping "n" is much shorter, faster, and cleaner than typing "arr.length" over and over throughout our loops!\n• What does "const" mean?\n"const" stands for Constant. It tells the computer: "This number n will never change during this sorting run (the array size stays fixed at 5)." This prevents accidental bugs.',
            invariant: 'Stores the fixed size n so our loops know exactly where to start and where to stop.'
          },
          {
            codeLine: 'for (let i = 0; i < n - 1; i++)',
            title: 'Line 3: for (let i = 0; i < n - 1; i++) — The Outer Loop (Rounds / Passes)',
            badge: 'PASS CONTROLLER',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Controls how many total rounds (passes) the computer makes over the array.',
            keyQuestion: 'What is a "for" loop? Why start at 0 and end at (n - 1)?',
            explanation: '• What is a "for" loop?\nThink of running laps around a sports field. A loop tells the computer: "Repeat the instructions inside my body until my target condition is met."\n• Why "let i = 0"?\nIn programming, we always start counting from 0 (index 0). So Round 1 is represented by i = 0.\n• Why run (n - 1) times instead of n times?\nConsider 5 books on a table. Once you put the first 4 books into their correct spots, the 5th remaining book is GUARANTEED to be in its correct place by default! You only ever need (n - 1) rounds (4 rounds for 5 items). Running a 5th round would compare 0 elements and waste time.\n• What is "i++"?\nIt means "after each round, add 1 to i" (i = i + 1), advancing to the next round.',
            invariant: 'After pass i, the (i + 1)-th largest element in the entire array is permanently locked in its final sorted position at index (n - 1 - i).'
          },
          {
            codeLine: 'for (let j = 0; j < n - i - 1; j++)',
            title: 'Line 4: for (let j = 0; j < n - i - 1; j++) — The Inner Loop (Walking the Line)',
            badge: 'WINDOW LIMITER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Iterates through adjacent pairs from left to right within the currently unsorted portion of the array.',
            keyQuestion: 'Why subtract BOTH i and 1 (n - i - 1)?',
            explanation: 'This is the #1 most asked viva question in colleges:\n• The Pointer "j": Pointer j looks at two side-by-side neighbors: arr[j] and its right neighbor arr[j + 1].\n• Why "- i"?\nIn each previous round, the largest number ALREADY bubbled up to its final correct spot at the end! After round 1, the biggest number is already sitting at the end. We don\'t need to touch it again. Subtracting "i" ignores already-sorted elements and cuts unnecessary work by 50%!\n• Why "- 1"?\nBecause we compare arr[j] with arr[j + 1]. If you have 5 items (indexed 0, 1, 2, 3, 4) and you allowed j = 4, then j + 1 would be 5 (which does not exist!). The program would crash with an "IndexOutOfBoundsException". Subtracting 1 safely stops j at index 3, pairing 3 with 4.',
            invariant: 'Subtracting i saves 50% of CPU work; subtracting 1 prevents crashes.'
          },
          {
            codeLine: 'if (arr[j] > arr[j + 1])',
            title: 'Line 5: if (arr[j] > arr[j + 1]) — The Decision Check (Are They Inverted?)',
            badge: 'INVERSION CHECK',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Checks whether the number on the left is strictly greater than the number on the right.',
            keyQuestion: 'What does "if" do? Why strict (>) and NOT greater-or-equal (>=)?',
            explanation: '• How "if" works:\nJust like real life: "If it rains, open umbrella." Here: "If the student on the left is taller than the student on the right, swap them!"\n• Why strict (>) and NOT (>=)?\nWhat if two neighboring numbers are equal (like 5 and 5)? With strict (>), 5 > 5 is FALSE, so they DO NOT swap! This ensures equal duplicate numbers stay in their original relative positions. In computer science, this is called STABILITY (a frequent exam question!). If you used ">=", duplicate numbers would swap needlessly and destroy stability.',
            invariant: 'Strict inequality guarantees correct ascending order and algorithm stability.'
          },
          {
            codeLine: 'let temp = arr[j];  arr[j] = arr[j + 1];  arr[j + 1] = temp;',
            title: 'Lines 6–8: The 3-Step Swap — The Two Juice Glasses Analogy',
            badge: 'IN-PLACE SWAP',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Exchanges the positions of the two numbers without losing either value, using O(1) memory.',
            keyQuestion: 'Why can\'t we just write "arr[j] = arr[j + 1]" directly? Why do we need "temp"?',
            explanation: '• The Famous Two-Glasses Analogy:\nImagine Glass A has 🍎 Apple Juice and Glass B has 🍊 Orange Juice.\nYou want to swap their contents. If you pour Glass B directly into Glass A, the Apple juice is OVERWRITTEN and permanently lost!\nTo swap safely without spilling, you need a 3rd temporary empty cup called "temp":\n1. Step 1 (temp = arr[j]): Pour Apple juice into the empty "temp" cup (safe backup).\n2. Step 2 (arr[j] = arr[j + 1]): Pour Orange juice from Glass B into Glass A.\n3. Step 3 (arr[j + 1] = temp): Pour Apple juice from the "temp" cup into Glass B!\n• Now both numbers are successfully swapped in place without losing any data!',
            invariant: 'Requires only O(1) auxiliary memory — no secondary arrays needed.'
          },
          {
            codeLine: 'return arr;',
            title: 'Line 11: return arr; — Delivering the Sorted Result',
            badge: 'RETURN RESULT',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Hands the finished, fully sorted list back to whoever called the function.',
            keyQuestion: 'What does "return" mean in programming?',
            explanation: '• The Chef Analogy:\nWhen you order a dish at a restaurant, the chef cooks it in the kitchen and the waiter RETURNS the finished plate to your table.\nIn programming, "return arr;" sends the organized, sorted array back so our visualizer can display the colorful sorted bars on your screen.\n• Once return is reached, the function is officially done and terminates.',
            invariant: 'Exits the function and delivers the final sorted array.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def bubble_sort(arr):
    n = len(arr)
    # Outer loop runs n - 1 passes
    for i in range(n - 1):
        # Inner loop ignores already settled elements at the end
        for j in range(0, n - i - 1):
            # Check if left neighbor is greater than right
            if arr[j] > arr[j + 1]:
                # Pythonic tuple swap in O(1)
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
        optimizedCode: `def bubble_sort_optimized(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Early exit: array is already sorted in O(n)
        if not swapped:
            break
    return arr`,
        linesBreakdown: [
          {
            codeLine: 'def bubble_sort(arr):',
            title: 'Line 1: def bubble_sort(arr): — Defining a Python Function',
            badge: 'DEF KEYWORD • PYTHONIC',
            badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
            whatItDoes: 'Creates a Python function named "bubble_sort" that accepts a list of numbers "arr".',
            keyQuestion: 'What is "def" and why is there a colon (:) instead of curly braces {}?',
            explanation: '• In Python, "def" stands for "Define". It tells Python: "I am defining a new reusable recipe called bubble_sort."\n• The Colon (:) & Indentation:\nUnlike JavaScript, Python does NOT use curly braces { }. Instead, Python uses a colon (:) and indentation (tab/spaces) to group code blocks. Every line indented beneath this belongs to the function.',
            invariant: 'Entry point for Python list sorting.'
          },
          {
            codeLine: 'n = len(arr)',
            title: 'Line 2: n = len(arr) — Python\'s Built-in Length Function',
            badge: 'COUNT ITEMS',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Calculates the total number of elements in the list using len() and stores it in variable "n".',
            keyQuestion: 'How does len() work in Python?',
            explanation: '• len() is a built-in Python function that returns the total count of items in any collection.\n• If arr = [5, 1, 4, 2, 8], len(arr) returns 5.\n• Storing this in "n" lets our loops know the list boundaries without recounting every iteration.',
            invariant: 'Records the list size n in O(1) time.'
          },
          {
            codeLine: 'for i in range(n - 1):',
            title: 'Line 4: for i in range(n - 1): — The Outer Pass Loop',
            badge: 'RANGE FUNCTION • ROUNDS',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Runs (n - 1) total passes over the list.',
            keyQuestion: 'How does range() work in Python?',
            explanation: '• In Python, range(n - 1) generates numbers starting at 0 up to (n - 2).\n• For n = 5, range(4) generates: 0, 1, 2, 3 (exactly 4 passes).\n• Why not range(n)? Because once 4 out of 5 elements are placed in order, the 5th element is already in place!',
            invariant: 'After pass i, the (i + 1)-th largest element bubbles to its final index (n - 1 - i).'
          },
          {
            codeLine: 'for j in range(0, n - i - 1):',
            title: 'Line 6: for j in range(0, n - i - 1): — The Inner Scanning Window',
            badge: 'PAIR SCANNER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Scans adjacent pairs from index 0 up to (n - i - 1).',
            keyQuestion: 'Why subtract both i and 1 in range(0, n - i - 1)?',
            explanation: '• The "- i": The last i elements have already bubbled to the end in previous passes! Skipping them saves 50% of unnecessary comparisons.\n• The "- 1": Because Python accesses arr[j + 1]. If j reached the end, j + 1 would trigger an "IndexError: list index out of range". Subtracting 1 guarantees safe boundaries.',
            invariant: 'Scans only the unsorted portion of the list without index errors.'
          },
          {
            codeLine: 'if arr[j] > arr[j + 1]:',
            title: 'Line 8: if arr[j] > arr[j + 1]: — Clean Python Comparison',
            badge: 'INVERSION CHECK',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Checks if the left element is strictly greater than its right neighbor.',
            keyQuestion: 'Why no parentheses in Python?',
            explanation: '• In Python, if statements are clean and readable — no parentheses () are required!\n• Strict (>): If arr[j] and arr[j + 1] are identical (e.g. 5 and 5), 5 > 5 is False, so they never swap. This preserves Stability.',
            invariant: 'Triggers a swap only when two numbers violate ascending order.'
          },
          {
            codeLine: 'arr[j], arr[j + 1] = arr[j + 1], arr[j]',
            title: 'Line 10: arr[j], arr[j + 1] = arr[j + 1], arr[j] — Pythonic Simultaneous Tuple Swap',
            badge: 'TUPLE UNPACKING • NO TEMP NEEDED',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Swaps both numbers in a single line of code without using a temporary variable!',
            keyQuestion: 'Why does Python not need a "temp" variable?',
            explanation: '• This is one of Python\'s coolest superpowers called "Tuple Unpacking":\n1. Python first evaluates the right side (arr[j + 1], arr[j]) as a pair in memory.\n2. Then it assigns both values to the left side simultaneously in one step!\n• No temporary variable needed! It\'s like switching items in both hands at the exact same millisecond.',
            invariant: 'Simultaneous in-place swap in O(1) time.'
          },
          {
            codeLine: 'return arr',
            title: 'Line 11: return arr — Delivering the Sorted List',
            badge: 'RETURN RESULT',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Outputs the sorted list back to the user or visualizer.',
            keyQuestion: 'What does return do in Python?',
            explanation: '• Exits the function and gives back the newly sorted list so you can print it or display it on screen.',
            invariant: 'Delivers the final sorted list.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    // Outer loop controls number of passes
    for (int i = 0; i < n - 1; i++) {
        // Inner loop checks unsorted portion up to (n - i - 1)
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Standard 3-step swap with temp
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
        optimizedCode: `public static void bubbleSortOptimized(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // If no swaps occurred in this pass, array is sorted!
        if (!swapped) break;
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'public static void bubbleSort(int[] arr)',
            title: 'Line 1: public static void bubbleSort(int[] arr) — Java Method Signature',
            badge: 'METHOD SIGNATURE • STATICALLY TYPED',
            badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
            whatItDoes: 'Declares a Java method that sorts an integer array in place.',
            keyQuestion: 'What do "public", "static", "void", and "int[]" mean for beginners?',
            explanation: '• public: Means any class or file in the project can call this method.\n• static: Means you can run it directly without creating a "new" object instance.\n• void: Means it does not return a new array because Java sorts the original arr directly in place!\n• int[] arr: Java is strongly typed. "int[]" means this container can ONLY hold integer numbers (whole numbers).',
            invariant: 'Defines the Java method interface for integer array sorting.'
          },
          {
            codeLine: 'int n = arr.length;',
            title: 'Line 2: int n = arr.length; — Array Length Property',
            badge: 'COUNT ITEMS',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Reads the length property of the array and stores it in integer variable n.',
            keyQuestion: 'Why no parentheses () after .length in Java?',
            explanation: '• In Java, arrays are special objects where "length" is a built-in property (not a method). So it is written as arr.length without ().\n• "int n": We explicitly tell Java that n is an integer variable.',
            invariant: 'Stores the fixed length of the array.'
          },
          {
            codeLine: 'for (int i = 0; i < n - 1; i++)',
            title: 'Line 4: for (int i = 0; i < n - 1; i++) — Outer Pass Loop',
            badge: 'PASS CONTROLLER',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Executes (n - 1) passes through the array.',
            keyQuestion: 'How does Java\'s standard for-loop operate?',
            explanation: '• int i = 0: Initializes counter i as an integer starting at index 0.\n• i < n - 1: Loop condition. Stops after (n - 1) passes because the last element is automatically sorted.\n• i++: Increments counter i by 1 after each pass.',
            invariant: 'Locks the next largest element at the tail after each pass.'
          },
          {
            codeLine: 'for (int j = 0; j < n - i - 1; j++)',
            title: 'Line 6: for (int j = 0; j < n - i - 1; j++) — Inner Loop Window',
            badge: 'WINDOW LIMITER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Scans adjacent pairs in the unsorted portion of the array.',
            keyQuestion: 'What error happens in Java if we forget the "- 1"?',
            explanation: '• If you forget "- 1", accessing arr[j + 1] when j = n - 1 will throw Java\'s famous "ArrayIndexOutOfBoundsException" and crash the program!\n• The "- i" skips already sorted elements at the end, saving 50% time.',
            invariant: 'Prevents ArrayIndexOutOfBoundsException and skips sorted elements.'
          },
          {
            codeLine: 'if (arr[j] > arr[j + 1])',
            title: 'Line 8: if (arr[j] > arr[j + 1]) — Comparison Check',
            badge: 'INVERSION CHECK',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Checks if adjacent elements are in descending order.',
            keyQuestion: 'Why is strict > required for stability in Java?',
            explanation: '• Using strict > guarantees that identical numbers (e.g. two 7s) are never swapped, maintaining their original order (Stability).',
            invariant: 'Detects out-of-order pairs.'
          },
          {
            codeLine: 'int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;',
            title: 'Lines 9–11: 3-Step Swap with Temporary Variable',
            badge: 'IN-PLACE SWAP',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Swaps arr[j] and arr[j + 1] using an integer temp register.',
            keyQuestion: 'Why is int temp needed?',
            explanation: '• The Two Glasses Analogy: Glass A (Apple Juice) and Glass B (Orange Juice). To swap without spilling, you pour Glass A into temp, Glass B into Glass A, and temp into Glass B.\n• Keeps auxiliary space O(1).',
            invariant: 'Safe in-place value swap.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    // Outer loop controls passes
    for (int i = 0; i < n - 1; i++) {
        // Inner loop boundary stops before sorted tail
        for (int j = 0; j < n - i - 1; j++) {
            // Comparison
            if (arr[j] > arr[j + 1]) {
                // In-place swap using STL
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
        optimizedCode: `void bubbleSortOptimized(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // Early break if no elements were inverted
        if (!swapped) break;
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'void bubbleSort(std::vector<int>& arr)',
            title: 'Line 1: void bubbleSort(std::vector<int>& arr) — Pass-by-Reference Vector',
            badge: 'C++ FUNCTION • PASS-BY-REFERENCE',
            badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
            whatItDoes: 'Declares a C++ function taking an integer vector by reference (&).',
            keyQuestion: 'What does the ampersand (&) mean in C++?',
            explanation: '• The Ampersand (&) means "Pass-by-Reference". This is the most crucial concept in C++!\n• If you wrote "std::vector<int> arr" without &, C++ would make a duplicate copy of the entire array, sort the copy, and discard it when the function ends — leaving the user\'s array completely unsorted!\n• The "&" tells C++: "Modify the caller\'s original array directly in-place!"',
            invariant: 'Sorts the original vector in-place without duplicating memory.'
          },
          {
            codeLine: 'int n = arr.size();',
            title: 'Line 2: int n = arr.size(); — Vector Size Method',
            badge: 'COUNT ITEMS',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Calls the .size() method on the vector to find the element count.',
            keyQuestion: 'Why does C++ use .size() with parentheses?',
            explanation: '• In C++, std::vector is a standard template library (STL) container class. Getting its size requires calling the member function .size().',
            invariant: 'Stores the vector length in integer n.'
          },
          {
            codeLine: 'for (int i = 0; i < n - 1; i++)',
            title: 'Line 4: for (int i = 0; i < n - 1; i++) — Outer Pass Loop',
            badge: 'PASS CONTROLLER',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Runs (n - 1) passes through the vector.',
            keyQuestion: 'Why does C++ stop at n - 1?',
            explanation: '• Placing the first (n - 1) elements leaves the last element in its correct place automatically.',
            invariant: 'Locks the next largest element at the end of the vector.'
          },
          {
            codeLine: 'for (int j = 0; j < n - i - 1; j++)',
            title: 'Line 6: for (int j = 0; j < n - i - 1; j++) — Inner Boundary Check',
            badge: 'WINDOW LIMITER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Iterates through adjacent pairs in the unsorted section.',
            keyQuestion: 'Why subtract i and 1?',
            explanation: '• "- i": The last i elements are already in their final sorted spots.\n• "- 1": Prevents arr[j + 1] from causing undefined behavior or segmentation faults by reading beyond the vector boundary.',
            invariant: 'Safe vector boundary access and 50% comparison savings.'
          },
          {
            codeLine: 'if (arr[j] > arr[j + 1])',
            title: 'Line 8: if (arr[j] > arr[j + 1]) — Comparison Check',
            badge: 'INVERSION CHECK',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Evaluates if adjacent elements violate ascending order.',
            keyQuestion: 'Why strict > in C++?',
            explanation: '• Keeps Bubble Sort stable by ensuring identical elements do not swap.',
            invariant: 'Detects out-of-order pairs.'
          },
          {
            codeLine: 'std::swap(arr[j], arr[j + 1]);',
            title: 'Line 10: std::swap(arr[j], arr[j + 1]); — C++ STL Fast Swap',
            badge: 'STL STD::SWAP • IN-PLACE',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Swaps both elements using the optimized C++ Standard Template Library swap utility.',
            keyQuestion: 'Why use std::swap instead of manual temp variables?',
            explanation: '• In C++, you don\'t need to write 3 lines of temp variable code. std::swap uses move semantics in modern C++ to exchange elements with maximum CPU hardware performance!',
            invariant: 'Fast, native O(1) in-place swap.'
          }
        ]
      }
    },
    dryRun: {
      initialArray: [5, 1, 4, 2, 8],
      passes: [
        {
          pass: 'Pass 1 (i = 0)',
          goal: 'Bubble the largest element (8) to index 4',
          steps: [
            { compare: 'arr[0] (5) > arr[1] (1)', swap: true, result: '[1, 5, 4, 2, 8]', reason: '5 > 1 → Swap' },
            { compare: 'arr[1] (5) > arr[2] (4)', swap: true, result: '[1, 4, 5, 2, 8]', reason: '5 > 4 → Swap' },
            { compare: 'arr[2] (5) > arr[3] (2)', swap: true, result: '[1, 4, 2, 5, 8]', reason: '5 > 2 → Swap' },
            { compare: 'arr[3] (5) > arr[4] (8)', swap: false, result: '[1, 4, 2, 5, 8]', reason: '5 < 8 → No Swap' }
          ],
          settled: 'Element 8 is locked at index 4.'
        },
        {
          pass: 'Pass 2 (i = 1)',
          goal: 'Bubble the 2nd largest element (5) to index 3',
          steps: [
            { compare: 'arr[0] (1) > arr[1] (4)', swap: false, result: '[1, 4, 2, 5, 8]', reason: '1 < 4 → No Swap' },
            { compare: 'arr[1] (4) > arr[2] (2)', swap: true, result: '[1, 2, 4, 5, 8]', reason: '4 > 2 → Swap' },
            { compare: 'arr[2] (4) > arr[3] (5)', swap: false, result: '[1, 2, 4, 5, 8]', reason: '4 < 5 → No Swap' }
          ],
          settled: 'Elements [5, 8] are permanently sorted.'
        },
        {
          pass: 'Pass 3 (i = 2)',
          goal: 'Check remaining prefix [1, 2, 4]',
          steps: [
            { compare: 'arr[0] (1) > arr[1] (2)', swap: false, result: '[1, 2, 4, 5, 8]', reason: '1 < 2 → No Swap' },
            { compare: 'arr[1] (2) > arr[2] (4)', swap: false, result: '[1, 2, 4, 5, 8]', reason: '2 < 4 → No Swap' }
          ],
          settled: 'No swaps occurred! Array is already fully sorted.'
        }
      ]
    },
    vivaTraps: [
      {
        q: 'Q1: What happens if the array is already sorted? Does standard Bubble Sort know?',
        a: 'Standard Bubble Sort will still blindly run all (n - 1) passes and make n(n - 1)/2 comparisons, resulting in O(n²) time. However, the Optimized version checks the "swapped" boolean flag after Pass 1. Seeing 0 swaps, it exits immediately in O(n) best-case time!'
      },
      {
        q: 'Q2: What is the maximum number of swaps possible in Bubble Sort?',
        a: 'Maximum swaps occur when the array is in strictly descending order (reverse sorted). For n elements, maximum swaps = n(n - 1) / 2. For n = 10, max swaps = 45.'
      },
      {
        q: 'Q3: Is Bubble Sort an in-place algorithm? What is its auxiliary space?',
        a: 'Yes, Bubble Sort is strictly in-place. It only requires a single O(1) temporary variable ("temp") to perform adjacent exchanges, keeping auxiliary space O(1).'
      }
    ]
  },

  selection: {
    title: 'Selection Sort: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of Selection Sort: Linear minimum scan, minIdx tracking, single pass swap, and O(n²) comparisons.',
    badge: 'CODE DEEP DIVE • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `function selectionSort(arr) {
  const n = arr.length;
  // Outer Loop: Move the boundary of the sorted subarray
  for (let i = 0; i < n - 1; i++) {
    // Assume the first unsorted element is currently the minimum
    let minIdx = i;
    // Inner Loop: Scan remaining elements to find the true minimum
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j; // Found new smallest element, remember its index
      }
    }
    // Swap the found minimum element with the first unsorted element
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}`,
        optimizedCode: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    // Only swap if minIdx changed (prevents redundant self-swaps)
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}`,
        linesBreakdown: [
          {
            codeLine: 'function selectionSort(arr)',
            title: 'Line 1: function selectionSort(arr) — Entry Point',
            badge: 'ENTRY POINT • FUNCTION',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Defines the Selection Sort machine that takes in an unsorted array "arr".',
            keyQuestion: 'What is the core strategy of Selection Sort?',
            explanation: '• Selection Sort works like picking the smallest apple from a basket one by one:\n1. Scan the entire basket to find the smallest apple.\n2. Place it in position 1.\n3. Scan the rest to find the second smallest, place it in position 2, and so on.',
            invariant: 'Sets up the workspace for selecting minimums pass by pass.'
          },
          {
            codeLine: 'const n = arr.length;',
            title: 'Line 2: const n = arr.length; — Storing Size',
            badge: 'ARRAY SIZE',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Stores how many numbers are in the array into "n".',
            keyQuestion: 'Why do we need n?',
            explanation: '• Both outer and inner loops need to know the total length of the array so they never exceed memory bounds.',
            invariant: 'Fixed array boundary stored in n.'
          },
          {
            codeLine: 'for (let i = 0; i < n - 1; i++)',
            title: 'Line 4: for (let i = 0; i < n - 1; i++) — Sorted Boundary Mover',
            badge: 'OUTER LOOP • BOUNDARY',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Moves the dividing line between the sorted left section and the unsorted right section.',
            keyQuestion: 'Why stop at (n - 1)?',
            explanation: '• Once you select and lock the first (n - 1) smallest elements into indices 0, 1, 2... the final remaining element at index (n - 1) is automatically the largest and already in place.',
            invariant: 'Elements from index 0 up to (i - 1) are permanently sorted in ascending order.'
          },
          {
            codeLine: 'let minIdx = i;',
            title: 'Line 6: let minIdx = i; — The Minimum Candidate Pointer',
            badge: 'MIN CANDIDATE',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Assumes the first element in the unsorted section (at index i) is the minimum candidate.',
            keyQuestion: 'Why store the INDEX (minIdx) instead of the value itself?',
            explanation: '• Storing the index (minIdx) is crucial because at the end of the pass we need to know WHERE the minimum came from so we can swap it into position i!',
            invariant: 'Tracks the position of the smallest element seen so far in this pass.'
          },
          {
            codeLine: 'for (let j = i + 1; j < n; j++)',
            title: 'Line 8: for (let j = i + 1; j < n; j++) — The Unsorted Scanner',
            badge: 'INNER LOOP • SCANNER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Scans all remaining unsorted elements to see if any number is smaller than arr[minIdx].',
            keyQuestion: 'Why start at (i + 1)?',
            explanation: '• Index i is already our initial candidate! Comparing element i with itself is a waste of time. So we start scanning from the very next element (i + 1) to the end of the array (n - 1).',
            invariant: 'Examines all unsorted elements to guarantee finding the true global minimum.'
          },
          {
            codeLine: 'if (arr[j] < arr[minIdx]) minIdx = j;',
            title: 'Lines 9–11: Updating the Minimum Index',
            badge: 'NEW MIN DISCOVERED',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Whenever an element smaller than arr[minIdx] is discovered, update minIdx to point to j.',
            keyQuestion: 'Does Selection Sort swap immediately here?',
            explanation: '• NO! This is the huge difference between Selection Sort and Bubble Sort. Selection Sort does NOT swap here. It just quietly notes down: "The new smallest number is at index j." It waits until the ENTIRE pass finishes before swapping once!',
            invariant: 'At the end of the inner loop, minIdx is guaranteed to point to the smallest value in [i..n-1].'
          },
          {
            codeLine: 'if (minIdx !== i) { swap(arr[i], arr[minIdx]); }',
            title: 'Lines 14–18: Single Pass Swap to Target Position',
            badge: 'SINGLE SWAP • O(n) WRITES',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Swaps the true minimum element into its final sorted position at index i.',
            keyQuestion: 'Why check (minIdx !== i)?',
            explanation: '• If the smallest element was ALREADY at index i, swapping with itself is redundant! Checking (minIdx !== i) saves unnecessary memory writes.\n• Key Exam Fact: Selection sort performs at most (n - 1) swaps in total — making it ideal when writing to memory is expensive.',
            invariant: 'Index i is now permanently finalized.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
        optimizedCode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
        linesBreakdown: [
          {
            codeLine: 'def selection_sort(arr):',
            title: 'Line 1: def selection_sort(arr): — Python Function Entry',
            badge: 'PYTHON DEF',
            badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
            whatItDoes: 'Defines the Python function taking list "arr".',
            keyQuestion: 'What is Selection Sort\'s goal in Python?',
            explanation: '• Repeatedly selects the minimum remaining element and swaps it to the front.',
            invariant: 'Sets up Python list sorting.'
          },
          {
            codeLine: 'for i in range(n - 1):',
            title: 'Line 3: for i in range(n - 1): — Boundary Loop',
            badge: 'RANGE PASSES',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Advances the sorted front index by index.',
            keyQuestion: 'Why (n - 1)?',
            explanation: '• Once (n - 1) items are in place, the last element is automatically in place.',
            invariant: 'Places smallest remaining item into index i.'
          },
          {
            codeLine: 'min_idx = i',
            title: 'Line 4: min_idx = i — Candidate Minimum',
            badge: 'MIN INDEX',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Initializes min_idx to the current position i.',
            keyQuestion: 'What does min_idx track?',
            explanation: '• The index of the smallest number found so far in the unsorted remainder.',
            invariant: 'Initial candidate set.'
          },
          {
            codeLine: 'for j in range(i + 1, n):',
            title: 'Line 5: for j in range(i + 1, n): — Linear Scan',
            badge: 'INNER SCANNER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Scans from (i + 1) to the end of the list.',
            keyQuestion: 'Why range(i + 1, n)?',
            explanation: '• Avoids comparing index i with itself and checks every remaining item.',
            invariant: 'Full linear scan of unsorted elements.'
          },
          {
            codeLine: 'if arr[j] < arr[min_idx]:  min_idx = j',
            title: 'Lines 6–7: Update Minimum Index',
            badge: 'UPDATE MIN',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Updates min_idx whenever a smaller value is found.',
            keyQuestion: 'Why not swap right here?',
            explanation: '• We only want to swap ONCE per round after finding the true smallest value!',
            invariant: 'min_idx holds the true smallest index in range [i..n-1].'
          },
          {
            codeLine: 'arr[i], arr[min_idx] = arr[min_idx], arr[i]',
            title: 'Line 9: Tuple Swap in Python',
            badge: 'ONE-LINE SWAP',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Swaps the discovered minimum element into position i in O(1) time.',
            keyQuestion: 'How does Python perform this swap?',
            explanation: '• Simultaneous assignment using tuple packing/unpacking without temp variables.',
            invariant: 'Index i is sorted.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
        optimizedCode: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'public static void selectionSort(int[] arr)',
            title: 'Line 1: Java Selection Sort Method',
            badge: 'JAVA METHOD',
            badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
            whatItDoes: 'Declares method sorting array in-place.',
            keyQuestion: 'What does void mean?',
            explanation: '• Returns nothing because the original array arr is mutated in place.',
            invariant: 'In-place sorting method.'
          },
          {
            codeLine: 'int minIdx = i;',
            title: 'Line 4: int minIdx = i; — Typed Index Variable',
            badge: 'MIN INDEX',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Stores index of current minimum candidate in integer minIdx.',
            keyQuestion: 'Why track index instead of value?',
            explanation: '• Needed to know the target position to swap at the end of the pass.',
            invariant: 'Candidate index tracking.'
          },
          {
            codeLine: 'for (int j = i + 1; j < n; j++)',
            title: 'Line 5: Inner Scan Loop in Java',
            badge: 'SCANNER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Scans unsorted slice [i+1..n-1].',
            keyQuestion: 'Boundary bounds?',
            explanation: '• Starts at i + 1 and stops before n.',
            invariant: 'Scans all remaining elements.'
          },
          {
            codeLine: 'int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;',
            title: 'Lines 11–13: 3-Step Swap in Java',
            badge: 'SWAP WITH TEMP',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Moves smallest element to index i.',
            keyQuestion: 'Why check minIdx != i?',
            explanation: '• Skips swapping if the element was already in the right spot.',
            invariant: 'Index i locked.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            std::swap(arr[i], arr[minIdx]);
        }
    }
}`,
        optimizedCode: `void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            std::swap(arr[i], arr[minIdx]);
        }
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'void selectionSort(std::vector<int>& arr)',
            title: 'Line 1: Pass-by-Reference Vector',
            badge: 'C++ REFERENCE',
            badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
            whatItDoes: 'Modifies the vector directly via reference &.',
            keyQuestion: 'Why & is required?',
            explanation: '• Without &, C++ creates a copy and discards changes.',
            invariant: 'Direct in-place vector sorting.'
          },
          {
            codeLine: 'std::swap(arr[i], arr[minIdx]);',
            title: 'Line 11: std::swap in C++',
            badge: 'FAST STL SWAP',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Exchanges arr[i] and arr[minIdx] using C++ STL.',
            keyQuestion: 'Why std::swap?',
            explanation: '• Standard, safe, and heavily optimized by modern C++ compilers.',
            invariant: 'Fast O(1) swap.'
          }
        ]
      }
    },
    dryRun: {
      initialArray: [64, 25, 12, 22, 11],
      passes: [
        {
          pass: 'Pass 1 (i = 0)',
          goal: 'Find smallest element in [64, 25, 12, 22, 11]',
          steps: [
            { compare: 'Scan 25, 12, 22, 11', swap: true, result: '[11, 25, 12, 22, 64]', reason: 'Min is 11 at index 4 → Swap with arr[0]' }
          ],
          settled: 'Element 11 is locked at index 0.'
        },
        {
          pass: 'Pass 2 (i = 1)',
          goal: 'Find smallest element in [25, 12, 22, 64]',
          steps: [
            { compare: 'Scan 12, 22, 64', swap: true, result: '[11, 12, 25, 22, 64]', reason: 'Min is 12 at index 2 → Swap with arr[1]' }
          ],
          settled: 'Elements [11, 12] are locked.'
        },
        {
          pass: 'Pass 3 (i = 2)',
          goal: 'Find smallest element in [25, 22, 64]',
          steps: [
            { compare: 'Scan 22, 64', swap: true, result: '[11, 12, 22, 25, 64]', reason: 'Min is 22 at index 3 → Swap with arr[2]' }
          ],
          settled: 'Elements [11, 12, 22] are locked.'
        },
        {
          pass: 'Pass 4 (i = 3)',
          goal: 'Find smallest element in [25, 64]',
          steps: [
            { compare: 'Scan 64', swap: false, result: '[11, 12, 22, 25, 64]', reason: 'Min is 25 already at index 3 → No swap' }
          ],
          settled: 'Array is fully sorted in 4 passes!'
        }
      ]
    },
    vivaTraps: [
      {
        q: 'Q1: Why is Selection Sort considered unstable?',
        a: 'Consider [4a, 5, 4b, 2]. The minimum is 2. Swapping 4a with 2 moves 4a past 4b, resulting in [2, 5, 4b, 4a]. The relative order of equal elements (4a and 4b) is inverted, proving it is unstable.'
      },
      {
        q: 'Q2: When is Selection Sort preferred over other O(n²) sorts?',
        a: 'When write operations to memory are very expensive (such as Flash memory / EEPROM). Selection Sort makes at most O(n) swaps, whereas Bubble Sort makes up to O(n²) swaps.'
      }
    ]
  },

  insertion: {
    title: 'Insertion Sort: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of Insertion Sort: Playing cards analogy, key extraction, right-shifting while loop, and O(n) adaptive behavior.',
    badge: 'CODE DEEP DIVE • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `function insertionSort(arr) {
  const n = arr.length;
  // Start from index 1 (element at index 0 is trivially sorted)
  for (let i = 1; i < n; i++) {
    let key = arr[i]; // Pick up element to insert
    let j = i - 1;   // Pointer to last element of sorted prefix
    // Shift elements of arr[0..i-1] that are greater than key to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // Shift right
      j = j - 1;          // Move left
    }
    // Place key into its correct sorted slot
    arr[j + 1] = key;
  }
  return arr;
}`,
        optimizedCode: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
        linesBreakdown: [
          {
            codeLine: 'function insertionSort(arr)',
            title: 'Line 1: Function Definition & Playing Cards Analogy',
            badge: 'ENTRY POINT • CARDS ANALOGY',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares Insertion Sort function.',
            keyQuestion: 'What real-world analogy explains Insertion Sort best?',
            explanation: '• Imagine holding playing cards in your hand:\n1. Your first card is already sorted.\n2. You pick the next card from the table (the "key").\n3. You slide larger cards to the right.\n4. You insert your card into the open space.',
            invariant: 'Sets up card-by-card insertion sorting.'
          },
          {
            codeLine: 'for (let i = 1; i < n; i++)',
            title: 'Line 3: for (let i = 1; i < n; i++) — Why Start at Index 1?',
            badge: 'CARD SELECTOR',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Iterates through each unsorted card starting from index 1 to the end.',
            keyQuestion: 'Why does i start at 1 instead of 0?',
            explanation: '• A single number (at index 0) by itself is trivially sorted! You don\'t need to insert the first card; you start inserting from the 2nd card (index 1).',
            invariant: 'At step i, subarray arr[0..i-1] is always sorted.'
          },
          {
            codeLine: 'let key = arr[i];',
            title: 'Line 4: let key = arr[i]; — Picking Up the Card',
            badge: 'EXTRACT KEY',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Extracts the value of arr[i] into variable "key" so it can be inserted into the sorted prefix.',
            keyQuestion: 'Why do we need to store it in "key"?',
            explanation: '• During the shift loop, neighboring elements will copy over each other to make room! Storing arr[i] in "key" prevents it from being overwritten.',
            invariant: 'Stores candidate value safely in CPU register.'
          },
          {
            codeLine: 'let j = i - 1;',
            title: 'Line 5: let j = i - 1; — Predecessor Pointer',
            badge: 'POINTER',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Sets pointer j to the rightmost element of the sorted left hand.',
            keyQuestion: 'Why start at (i - 1)?',
            explanation: '• We compare our key with the largest sorted card first (the one immediately to its left at i - 1).',
            invariant: 'Points to candidate comparison predecessor.'
          },
          {
            codeLine: 'while (j >= 0 && arr[j] > key)',
            title: 'Line 7: The Shifting Condition (While Loop)',
            badge: 'SHIFT CHECK',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Loops backwards while previous elements are larger than our key.',
            keyQuestion: 'What do the two conditions check?',
            explanation: '1. j >= 0: Ensures we don\'t fall off the left end of the array.\n2. arr[j] > key: Keeps shifting cards right as long as they are bigger than our key. If arr[j] <= key, the loop stops immediately!',
            invariant: 'Stops at the exact slot where key belongs.'
          },
          {
            codeLine: 'arr[j + 1] = arr[j];  j = j - 1;',
            title: 'Lines 8–9: Shifting Elements Right',
            badge: 'RIGHT SHIFT',
            badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
            whatItDoes: 'Copies arr[j] one slot to the right into arr[j + 1] to create a gap for key.',
            keyQuestion: 'Is this a swap?',
            explanation: '• NO! It is a simple shift (copy). It does NOT swap back and forth like Bubble Sort. It just slides larger elements forward.',
            invariant: 'Opens up space for the key.'
          },
          {
            codeLine: 'arr[j + 1] = key;',
            title: 'Line 12: Dropping Key into Sorted Slot',
            badge: 'INSERT KEY',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Places the key into its final sorted position at index (j + 1).',
            keyQuestion: 'Why (j + 1)?',
            explanation: '• When the while loop finishes, j points to an element smaller than key (or -1). The empty slot is therefore directly ahead at j + 1!',
            invariant: 'Expands the sorted prefix to include the key.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        optimizedCode: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        linesBreakdown: [
          {
            codeLine: 'for i in range(1, n):',
            title: 'Line 3: for i in range(1, n): — Start at 1 in Python',
            badge: 'RANGE START 1',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Loops through indices 1 to (n - 1).',
            keyQuestion: 'Why range(1, n)?',
            explanation: '• First card arr[0] is already sorted by definition.',
            invariant: 'Considers one new card per round.'
          },
          {
            codeLine: 'while j >= 0 and arr[j] > key:',
            title: 'Line 6: Python While Loop Condition',
            badge: 'WHILE CONDITION',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Checks boundary and compares with key using clean Python "and".',
            keyQuestion: 'How does Python evaluate "and"?',
            explanation: '• Short-circuit evaluation: if j < 0, it stops immediately without touching arr[j], avoiding IndexError!',
            invariant: 'Guaranteed safe index access.'
          },
          {
            codeLine: 'arr[j + 1] = arr[j]',
            title: 'Line 7: Slide Item Right in Python',
            badge: 'SLIDE RIGHT',
            badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
            whatItDoes: 'Slides element forward.',
            keyQuestion: 'Why slide?',
            explanation: '• Opens the gap for key.',
            invariant: 'Shifts larger elements.'
          },
          {
            codeLine: 'arr[j + 1] = key',
            title: 'Line 9: Drop Key into Slot',
            badge: 'INSERT KEY',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Inserts key at (j + 1).',
            keyQuestion: 'Why j + 1?',
            explanation: '• j was decremented one step past the slot; j + 1 restores the insertion point.',
            invariant: 'Sorted prefix extended.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
        optimizedCode: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'int key = arr[i];',
            title: 'Line 4: Extract Key in Java',
            badge: 'TYPED KEY',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Stores current element in integer key.',
            keyQuestion: 'Why typed int?',
            explanation: '• Java requires type declarations for all local variables.',
            invariant: 'Key stored in integer variable.'
          },
          {
            codeLine: 'while (j >= 0 && arr[j] > key)',
            title: 'Line 6: Java While Condition',
            badge: 'SHORT-CIRCUIT',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Loops backwards with short-circuit &&.',
            keyQuestion: 'Why is order of conditions critical in Java?',
            explanation: '• If arr[j] > key was written before j >= 0, then when j = -1 Java would crash with ArrayIndexOutOfBoundsException! Writing j >= 0 first prevents this.',
            invariant: 'Short-circuit safety.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        optimizedCode: `void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'void insertionSort(std::vector<int>& arr)',
            title: 'Line 1: C++ Reference Sorting',
            badge: 'PASS-BY-REFERENCE',
            badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
            whatItDoes: 'Passes vector by reference &.',
            keyQuestion: 'Why is Insertion Sort fast in C++?',
            explanation: '• Highly cache-friendly: accesses contiguous memory sequential elements in L1/L2 CPU cache.',
            invariant: 'In-place vector sorting.'
          }
        ]
      }
    },
    dryRun: {
      initialArray: [12, 11, 13, 5, 6],
      passes: [
        {
          pass: 'Round 1 (i = 1)',
          goal: 'Insert key = 11 into sorted [12]',
          steps: [
            { compare: '12 > 11', swap: true, result: '[11, 12, 13, 5, 6]', reason: 'Shift 12 right, insert 11' }
          ],
          settled: 'Sorted prefix: [11, 12]'
        },
        {
          pass: 'Round 2 (i = 2)',
          goal: 'Insert key = 13 into sorted [11, 12]',
          steps: [
            { compare: '12 < 13', swap: false, result: '[11, 12, 13, 5, 6]', reason: '12 < 13 → No shift! Drop 13 at index 2' }
          ],
          settled: 'Sorted prefix: [11, 12, 13]'
        },
        {
          pass: 'Round 3 (i = 3)',
          goal: 'Insert key = 5 into sorted [11, 12, 13]',
          steps: [
            { compare: '13 > 5, 12 > 5, 11 > 5', swap: true, result: '[5, 11, 12, 13, 6]', reason: 'Shift 13, 12, 11 right, drop 5 at index 0' }
          ],
          settled: 'Sorted prefix: [5, 11, 12, 13]'
        },
        {
          pass: 'Round 4 (i = 4)',
          goal: 'Insert key = 6 into sorted [5, 11, 12, 13]',
          steps: [
            { compare: '13 > 6, 12 > 6, 11 > 6', swap: true, result: '[5, 6, 11, 12, 13]', reason: 'Shift 13, 12, 11 right, stop at 5. Drop 6 at index 1' }
          ],
          settled: 'Array is fully sorted!'
        }
      ]
    },
    vivaTraps: [
      {
        q: 'Q1: Why is Insertion Sort the fastest sorting algorithm for nearly-sorted data?',
        a: 'If an array is already sorted, the inner while loop test (arr[j] > key) evaluates to FALSE on the very first comparison! It makes exactly 1 check per element, running in pure O(n) linear time.'
      },
      {
        q: 'Q2: How does modern Python (Timsort) and C++ (Introsort) use Insertion Sort?',
        a: 'Both Python and C++ use hybrid algorithms: they divide large arrays with QuickSort/MergeSort, but when sub-arrays become small (e.g. n <= 16 or 32), they switch to Insertion Sort because of its low constant factors and superior CPU cache locality.'
      }
    ]
  },

  merge: {
    title: 'Merge Sort: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of Merge Sort: Divide and Conquer, recursive midpoint splitting (l + r)/2, auxiliary merging, and guaranteed O(n log n) time.',
    badge: 'CODE DEEP DIVE • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `function mergeSort(arr, l = 0, r = arr.length - 1) {
  // Base Case: Subarray of size 1 or 0 is already sorted
  if (l >= r) return;

  // Divide: Find midpoint to split into equal halves
  const m = Math.floor((l + r) / 2);

  // Conquer: Recursively sort left and right halves
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);

  // Combine: Merge two sorted halves in linear O(n) time
  merge(arr, l, m, r);
  return arr;
}

function merge(arr, l, m, r) {
  const temp = [];
  let i = l;     // Pointer for left half [l..m]
  let j = m + 1; // Pointer for right half [m+1..r]

  // Compare elements from both halves and push smaller into temp
  while (i <= m && j <= r) {
    if (arr[i] <= arr[j]) {
      temp.push(arr[i++]);
    } else {
      temp.push(arr[j++]);
    }
  }

  // Copy remaining elements
  while (i <= m) temp.push(arr[i++]);
  while (j <= r) temp.push(arr[j++]);

  // Copy merged sorted elements back to original array
  for (let k = 0; k < temp.length; k++) {
    arr[l + k] = temp[k];
  }
}`,
        optimizedCode: `function mergeSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
  return arr;
}`,
        linesBreakdown: [
          {
            codeLine: 'function mergeSort(arr, l = 0, r = arr.length - 1)',
            title: 'Line 1: Divide & Conquer Function Signature',
            badge: 'DIVIDE & CONQUER',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Accepts the array and left/right index boundaries (defaulting to whole array 0 to n-1).',
            keyQuestion: 'What is the Divide and Conquer paradigm?',
            explanation: '• Divide: Break a big problem into two smaller halves.\n• Conquer: Solve each half recursively.\n• Combine: Merge the two sorted halves back together seamlessly.',
            invariant: 'Sorts subarray arr[l..r] recursively.'
          },
          {
            codeLine: 'if (l >= r) return;',
            title: 'Line 3: if (l >= r) return; — The Essential Base Case',
            badge: 'BASE CASE',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Stops recursion when the subarray length is 1 or 0.',
            keyQuestion: 'Why does this stop recursion?',
            explanation: '• If l == r, you have a slice with only 1 number (e.g. [5]). A single number is ALREADY sorted! No division needed. Stop and return up the call stack.',
            invariant: 'Guarantees the recursive tree terminates safely.'
          },
          {
            codeLine: 'const m = Math.floor((l + r) / 2);',
            title: 'Line 6: const m = Math.floor((l + r) / 2); — The Midpoint Split',
            badge: 'MIDPOINT FORMULA',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Calculates the center index m to split the subarray in two equal halves.',
            keyQuestion: 'Why Math.floor?',
            explanation: '• If l = 0 and r = 5, (0 + 5) / 2 is 2.5. Computers need integer indices, so Math.floor rounds down to index 2.',
            invariant: 'Splits [l..r] into [l..m] and [m+1..r].'
          },
          {
            codeLine: 'mergeSort(arr, l, m);  mergeSort(arr, m + 1, r);',
            title: 'Lines 9–10: Recursive Subtree Sorting',
            badge: 'RECURSIVE CALLS',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Recursively divides and sorts the left half and right half.',
            keyQuestion: 'How many times does it divide?',
            explanation: '• It divides repeatedly until every subarray has length 1. For n items, it creates log₂(n) levels of division.',
            invariant: 'Both left half [l..m] and right half [m+1..r] become sorted.'
          },
          {
            codeLine: 'merge(arr, l, m, r);',
            title: 'Line 13: merge(arr, l, m, r); — Combining the Halves',
            badge: 'LINEAR CONQUER',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Combines two sorted halves into a single sorted range in O(n) time.',
            keyQuestion: 'How does the two-pointer merge work?',
            explanation: '• Pointer i starts at l (left half), pointer j starts at m+1 (right half).\n• Compare arr[i] with arr[j]. Place the smaller one into temp array.\n• Advance that pointer. Repeat until all items are merged.',
            invariant: 'Merged subarray [l..r] is now completely in sorted order.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
        optimizedCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)`,
        linesBreakdown: [
          {
            codeLine: 'mid = len(arr) // 2',
            title: 'Line 4: Integer Division Midpoint in Python',
            badge: 'PYTHON // OPERATOR',
            badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
            whatItDoes: 'Calculates the middle index using integer division (//).',
            keyQuestion: 'What does // do in Python?',
            explanation: '• In Python, "//" automatically discards fractional decimals (e.g. 5 // 2 = 2).',
            invariant: 'Exact midpoint index.'
          },
          {
            codeLine: 'left = merge_sort(arr[:mid])',
            title: 'Line 5: Python List Slicing',
            badge: 'LIST SLICE',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Recursively sorts the left slice arr[:mid].',
            keyQuestion: 'How does arr[:mid] work?',
            explanation: '• Slices list from index 0 up to (mid - 1).',
            invariant: 'Sorts left sub-list.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2; // Overflow-safe midpoint
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
        optimizedCode: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'int m = l + (r - l) / 2;',
            title: 'Line 3: Overflow-Safe Midpoint Formula in Java',
            badge: 'OVERFLOW SAFE',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Calculates midpoint avoiding integer 32-bit overflow.',
            keyQuestion: 'Why not (l + r) / 2 in Java?',
            explanation: '• If l and r are very large (near 2 billion), (l + r) can exceed 2³¹ - 1 and overflow to a negative number! Using l + (r - l) / 2 is completely safe from overflow.',
            invariant: 'Safe midpoint calculation.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
        optimizedCode: `void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
        linesBreakdown: [
          {
            codeLine: 'int m = l + (r - l) / 2;',
            title: 'C++ Safe Midpoint Calculation',
            badge: 'C++ MIDPOINT',
            badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
            whatItDoes: 'Calculates midpoint with zero integer overflow risk.',
            keyQuestion: 'Why divide by 2?',
            explanation: '• Guarantees balanced logarithmic tree depth log₂(n).',
            invariant: 'Balanced recursion tree.'
          }
        ]
      }
    },
    dryRun: {
      initialArray: [38, 27, 43, 3],
      passes: [
        {
          pass: 'Step 1: Divide',
          goal: 'Split [38, 27, 43, 3] at midpoint',
          steps: [
            { compare: 'Split left [38, 27] and right [43, 3]', swap: false, result: '[38], [27] & [43], [3]', reason: 'Split to size 1 base cases' }
          ],
          settled: 'Base cases reached.'
        },
        {
          pass: 'Step 2: Merge Pairs',
          goal: 'Merge [38] with [27] → [27, 38]; Merge [43] with [3] → [3, 43]',
          steps: [
            { compare: 'Merge 38 & 27', swap: true, result: '[27, 38]', reason: '27 < 38' },
            { compare: 'Merge 43 & 3', swap: true, result: '[3, 43]', reason: '3 < 43' }
          ],
          settled: 'Two sorted halves: [27, 38] and [3, 43].'
        },
        {
          pass: 'Step 3: Final Merge',
          goal: 'Merge [27, 38] and [3, 43] into [3, 27, 38, 43]',
          steps: [
            { compare: '3 < 27 → pick 3', swap: true, result: '[3]', reason: 'Smallest' },
            { compare: '27 < 43 → pick 27', swap: true, result: '[3, 27]', reason: 'Next' },
            { compare: '38 < 43 → pick 38', swap: true, result: '[3, 27, 38, 43]', reason: 'Sorted!' }
          ],
          settled: 'Array fully sorted in O(n log n)!'
        }
      ]
    },
    vivaTraps: [
      {
        q: 'Q1: Why is Merge Sort guaranteed O(n log n) even in the worst case?',
        a: 'Because the array is ALWAYS split strictly in half (depth = log n), and merging two halves always takes linear time (O(n)). Multiplying them gives O(n log n) in best, average, and worst cases!'
      },
      {
        q: 'Q2: What is the main drawback of Merge Sort?',
        a: 'It requires O(n) auxiliary memory space to store temporary arrays during the merge step, unlike QuickSort/HeapSort which sort in-place in O(1) extra space.'
      }
    ]
  },

  quick: {
    title: 'Quick Sort: Complete Code Breakdown & Line-by-Line Logic',
    subtitle: 'Master every line of Quick Sort: Pivot selection, Lomuto partitioning, recursive partition boundaries, and in-place O(n log n) sorting.',
    badge: 'CODE DEEP DIVE • EXAM & INTERVIEW READY',
    languages: {
      javascript: {
        label: 'JavaScript',
        standardCode: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition: places pivot in its permanent sorted spot pi
    let pi = partition(arr, low, high);

    // Recursively sort elements before and after pivot
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high]; // Lomuto scheme: pick last element as pivot
  let i = low - 1;       // Index of smaller element

  for (let j = low; j < high; j++) {
    // If current element is smaller than pivot, swap it into left partition
    if (arr[j] < pivot) {
      i++;
      let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
  }

  // Swap pivot into its final resting position at (i + 1)
  let temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
  return i + 1; // Return pivot position
}`,
        optimizedCode: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}`,
        linesBreakdown: [
          {
            codeLine: 'function quickSort(arr, low = 0, high = arr.length - 1)',
            title: 'Line 1: Function Signature & Range Pointers',
            badge: 'ENTRY POINT • POINTERS',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            whatItDoes: 'Declares Quick Sort function using "low" and "high" boundary indices.',
            keyQuestion: 'Why does Quick Sort sort in-place unlike Merge Sort?',
            explanation: '• Quick Sort does not need auxiliary arrays. It reorganizes numbers directly inside the original array by swapping them around a chosen "Pivot" element.',
            invariant: 'Sorts arr[low..high] in place.'
          },
          {
            codeLine: 'if (low < high)',
            title: 'Line 2: if (low < high) — Range Validity Condition',
            badge: 'RANGE CHECK',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            whatItDoes: 'Ensures the subarray contains at least two elements before partitioning.',
            keyQuestion: 'What if low >= high?',
            explanation: '• If low == high, only 1 item exists (already sorted). If low > high, range is empty. Quick Sort stops recursing.',
            invariant: 'Recursion base case.'
          },
          {
            codeLine: 'let pi = partition(arr, low, high);',
            title: 'Line 4: let pi = partition(...) — The Heart of QuickSort',
            badge: 'PARTITION CORE',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Partitions the array around the pivot and returns the pivot\'s final locked index "pi".',
            keyQuestion: 'What guarantee does partition() provide?',
            explanation: '• After partition returns pi:\n1. All elements to the left (arr[low..pi-1]) are SMALLER than the pivot.\n2. All elements to the right (arr[pi+1..high]) are GREATER than the pivot.\n3. The pivot at index pi is PERMANENTLY sorted and will never move again!',
            invariant: 'Pivot locked in final place.'
          },
          {
            codeLine: 'quickSort(arr, low, pi - 1);  quickSort(arr, pi + 1, high);',
            title: 'Lines 7–8: Recursive Sorting Around the Pivot',
            badge: 'DIVIDE & RECURSE',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            whatItDoes: 'Recursively sorts the left partition and right partition.',
            keyQuestion: 'Why is index pi excluded from both recursive calls?',
            explanation: '• Because index pi is ALREADY in its 100% correct sorted resting place! Touching it again would be redundant.',
            invariant: 'Sorts strictly before pi and strictly after pi.'
          },
          {
            codeLine: 'let pivot = arr[high];',
            title: 'Line 14: let pivot = arr[high]; — Choosing the Pivot',
            badge: 'PIVOT ELEMENT',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Selects the rightmost element (high) as our reference pivot value.',
            keyQuestion: 'What is a "Pivot"?',
            explanation: '• Think of a pivot like the captain of a team. All players shorter than the captain go to the left side, and all players taller go to the right side.',
            invariant: 'Reference benchmark for comparisons.'
          },
          {
            codeLine: 'let i = low - 1;',
            title: 'Line 15: let i = low - 1; — Partition Boundary Marker',
            badge: 'SMALLER BOUNDARY',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Marks the boundary of elements smaller than the pivot.',
            keyQuestion: 'Why start at low - 1?',
            explanation: '• Initially, before scanning, we haven\'t verified any smaller elements yet. As soon as a smaller element is found, we increment i and swap it into slot i.',
            invariant: 'arr[low..i] contains all elements known to be smaller than pivot.'
          },
          {
            codeLine: 'if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); }',
            title: 'Lines 19–22: Partition Swap',
            badge: 'PARTITION SWAP',
            badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
            whatItDoes: 'Moves smaller numbers to the left side of the array.',
            keyQuestion: 'How does pointer j scan?',
            explanation: '• j walks from low to high-1. If it encounters a number smaller than the pivot, i increments and we swap arr[i] with arr[j].',
            invariant: 'Grows the smaller partition.'
          },
          {
            codeLine: 'swap(arr[i + 1], arr[high]);  return i + 1;',
            title: 'Lines 26–27: Final Pivot Placement',
            badge: 'PIVOT LOCK',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            whatItDoes: 'Swaps the pivot from the end into index (i + 1), between the smaller and larger partitions.',
            keyQuestion: 'Why return i + 1?',
            explanation: '• Because index (i + 1) is now the pivot\'s permanent resting position!',
            invariant: 'Pivot is locked in sorted place.'
          }
        ]
      },
      python: {
        label: 'Python',
        standardCode: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
        optimizedCode: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`,
        linesBreakdown: [
          {
            codeLine: 'pivot = arr[high]',
            title: 'Pivot Selection in Python',
            badge: 'PIVOT VALUE',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            whatItDoes: 'Picks last item as benchmark pivot.',
            keyQuestion: 'What is Lomuto partition?',
            explanation: '• Standard algorithm textbook scheme picking the rightmost element.',
            invariant: 'Benchmark set.'
          },
          {
            codeLine: 'arr[i], arr[j] = arr[j], arr[i]',
            title: 'Python In-Place Partition Swap',
            badge: 'TUPLE SWAP',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Swaps smaller elements into left partition.',
            keyQuestion: 'Why tuple swap?',
            explanation: '• Clean Python O(1) swap without temporary variables.',
            invariant: 'Left partition updated.'
          }
        ]
      },
      java: {
        label: 'Java',
        standardCode: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}`,
        optimizedCode: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'int pi = partition(arr, low, high);',
            title: 'Java Partition Call',
            badge: 'PARTITION METHOD',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            whatItDoes: 'Computes pivot index pi.',
            keyQuestion: 'Why is QuickSort popular in Java?',
            explanation: '• Java\'s Arrays.sort() for primitive types uses Dual-Pivot QuickSort because of its speed.',
            invariant: 'Partition index found.'
          }
        ]
      },
      cpp: {
        label: 'C++',
        standardCode: `void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
        optimizedCode: `void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        linesBreakdown: [
          {
            codeLine: 'std::swap(arr[i + 1], arr[high]);',
            title: 'C++ Final Pivot Placement',
            badge: 'STD::SWAP PIVOT',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            whatItDoes: 'Moves pivot to final spot.',
            keyQuestion: 'Why std::swap?',
            explanation: '• Native hardware move exchange.',
            invariant: 'Pivot locked.'
          }
        ]
      }
    },
    dryRun: {
      initialArray: [10, 80, 30, 90, 40, 50, 70],
      passes: [
        {
          pass: 'Partition 1 (Pivot = 70)',
          goal: 'Partition around pivot 70',
          steps: [
            { compare: '10 < 70 → keep in left partition', swap: false, result: '[10, ...]', reason: 'Smaller' },
            { compare: '30, 40, 50 < 70 → swapped into left partition', swap: true, result: '[10, 30, 40, 50, 80, 90, 70]', reason: 'Smaller' },
            { compare: 'Final swap pivot 70 with 80', swap: true, result: '[10, 30, 40, 50, 70, 90, 80]', reason: 'Pivot placed at index 4' }
          ],
          settled: 'Pivot 70 is permanently locked at index 4.'
        },
        {
          pass: 'Step 2: Recurse',
          goal: 'Sort left [10, 30, 40, 50] and right [90, 80]',
          steps: [
            { compare: 'Right half [90, 80] with pivot 80', swap: true, result: '[..., 70, 80, 90]', reason: '80 < 90' }
          ],
          settled: 'All partitions sorted in-place!'
        }
      ]
    },
    vivaTraps: [
      {
        q: 'Q1: What is the worst-case time complexity of Quick Sort, and when does it happen?',
        a: 'Worst case is O(n²). It occurs when the chosen pivot is always the smallest or largest element (e.g. when the array is already sorted in ascending or descending order and we pick the last item as pivot).'
      },
      {
        q: 'Q2: How do engineers prevent Quick Sort worst-case in real-world systems?',
        a: 'By using Randomized QuickSort (picking a random index as pivot) or the "Median-of-Three" technique (median of first, middle, and last elements).'
      }
    ]
  }
};

export default function CodeExplanation({ algoKey = 'bubble' }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [isOptimizedView, setIsOptimizedView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'dryrun' | 'traps'

  const data = sortingCodeExplanations[algoKey] || sortingCodeExplanations.bubble;
  const currentLangData = data.languages[selectedLang] || data.languages.javascript;
  const currentCode = isOptimizedView 
    ? (currentLangData.optimizedCode || currentLangData.standardCode)
    : currentLangData.standardCode;

  const currentLinesBreakdown = currentLangData.linesBreakdown || data.languages.javascript.linesBreakdown;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs transition-all">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0 mt-0.5">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {data.title}
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {data.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              {data.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
          title={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-6">
          
          {/* Sub-Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'breakdown' 
                    ? 'bg-white shadow-xs text-indigo-700' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Line-by-Line Anatomy
              </button>
              <button
                onClick={() => setActiveTab('dryrun')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'dryrun' 
                    ? 'bg-white shadow-xs text-indigo-700' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dry Run Walkthrough
              </button>
              <button
                onClick={() => setActiveTab('traps')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'traps' 
                    ? 'bg-white shadow-xs text-indigo-700' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Viva &amp; Exam Traps
              </button>
            </div>

            {/* Language & Optimization Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Standard vs Optimized Toggle */}
              <button
                onClick={() => setIsOptimizedView(!isOptimizedView)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isOptimizedView
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{isOptimizedView ? 'Optimized O(n)' : 'Standard Code'}</span>
              </button>

              {/* Languages */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                {Object.keys(data.languages).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => setSelectedLang(langKey)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      selectedLang === langKey
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {data.languages[langKey].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Full Code Display Box */}
          <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-4 sm:p-5 font-mono text-xs overflow-hidden border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-slate-300">
                  {currentLangData.label} Implementation &bull; {isOptimizedView ? 'Early-Exit / Optimized' : 'Standard'}
                </span>
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer text-[10px]"
              >
                {copied ? <><Check className="w-3 h-3 text-emerald-400" /><span>Copied!</span></> : <><Copy className="w-3 h-3" /><span>Copy Code</span></>}
              </button>
            </div>
            <pre className="overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-slate-200">
              {currentCode}
            </pre>
          </div>

          {/* Beginner Primer: What is Code? */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-50/50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">👶</span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                New to Coding? Read this 30-Second Primer First!
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-white/80 rounded-xl border border-amber-100">
                <strong className="text-amber-900 block mb-0.5">1. What is an Array [ ]?</strong>
                A row of numbered lockers starting at locker 0. If you have 5 lockers, they are numbered 0, 1, 2, 3, 4.
              </div>
              <div className="p-2.5 bg-white/80 rounded-xl border border-amber-100">
                <strong className="text-amber-900 block mb-0.5">2. What is a Loop (for / while)?</strong>
                A repeat command. Instead of writing instructions 100 times by hand, a loop repeats the checks automatically until finished.
              </div>
              <div className="p-2.5 bg-white/80 rounded-xl border border-amber-100">
                <strong className="text-amber-900 block mb-0.5">3. What is a Variable?</strong>
                A labeled sticky note or box where the computer remembers a number temporarily so it doesn't get lost.
              </div>
            </div>
          </div>

          {/* TAB 1: Line-by-Line Anatomy */}
          {activeTab === 'breakdown' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-extrabold text-sm text-slate-800">
                    Line-by-Line Execution Mechanics ({currentLangData.label})
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Explaining {currentLangData.label} syntax
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentLinesBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200/90 rounded-2xl p-5 bg-gradient-to-br from-white to-slate-50/50 hover:border-indigo-300 transition-all shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-extrabold text-slate-700">
                        {item.title}
                      </span>
                    </div>

                    <div className="bg-slate-900 text-indigo-300 font-mono text-xs px-3.5 py-2 rounded-xl mb-3 border border-slate-800">
                      <code>{item.codeLine}</code>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      <strong className="text-slate-800">Function: </strong>
                      {item.whatItDoes}
                    </p>

                    <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200/60 mb-2">
                      <span className="text-[11px] font-bold text-blue-900 block mb-1">
                        💡 {item.keyQuestion}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                        {item.explanation}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50/60 px-3 py-1.5 rounded-lg border border-emerald-200/60 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item.invariant}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Dry Run Walkthrough */}
          {activeTab === 'dryrun' && data.dryRun && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/60 border border-indigo-200/70 rounded-2xl">
                <span className="text-xs font-bold text-indigo-900 block mb-1">
                  Example Array: [{data.dryRun.initialArray.join(', ')}] &bull; Length n = {data.dryRun.initialArray.length}
                </span>
                <p className="text-xs text-slate-600">
                  Follow how comparisons and element movements happen step-by-step to reach fully sorted order.
                </p>
              </div>

              <div className="space-y-4">
                {data.dryRun.passes.map((passItem, pIdx) => (
                  <div key={pIdx} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <span className="font-extrabold text-sm text-slate-900">
                        {passItem.pass}
                      </span>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        {passItem.goal}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {passItem.steps.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex flex-wrap items-center justify-between gap-3 text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <span className="font-mono font-bold text-slate-700">
                            {st.compare}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            st.swap 
                              ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {st.reason}
                          </span>
                          <span className="font-mono text-slate-500">
                            Array: <strong className="text-slate-800">{st.result}</strong>
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{passItem.settled}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Viva & Exam Traps */}
          {activeTab === 'traps' && data.vivaTraps && (
            <div className="space-y-3">
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

          {/* Bottom Footer Tip */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Exam Tip: Understand line-by-line boundaries and stability to ace coding rounds!</span>
            </span>
            <span className="text-indigo-700 font-bold">
              AlgoArena Code Master &bull; {data.title.split(':')[0]}
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
