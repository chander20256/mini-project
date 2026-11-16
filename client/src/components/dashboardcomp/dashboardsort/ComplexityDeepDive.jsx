import React, { useState } from 'react';
import { 
  BookOpen, ChevronDown, Sparkles, Brain, Lightbulb, 
  HelpCircle, ArrowRight, CheckCircle2, ShieldAlert, Zap 
} from 'lucide-react';

const deepDiveData = {
  bubble: {
    title: 'Bubble Sort: Deep Dive & Intuitive Breakdown',
    subtitle: 'Everything you need to master Bubble Sort for exams & placement interviews.',
    analogy: {
      headline: 'The Morning Assembly Height Line Analogy',
      story: `Imagine 5 school students standing in random order during morning prayer. The teacher wants them arranged from shortest to tallest.

Bubble sort walks down the row comparing two neighbors at a time:
1. Look at Student 1 and Student 2. If Student 1 is taller, they swap places!
2. Move to Student 2 and Student 3. If Student 2 is taller, swap!
3. Continue to the end of the line.

By the time the teacher reaches the end of the first pass, the TALLEST student in the entire school is guaranteed to be standing at the very end of the line (just like the heaviest bubble rises to the surface).

In the second pass, the 2nd tallest settles. You repeat this until everyone is in order.`
    },
    sections: [
      {
        id: 'worst-case',
        badge: 'Worst Time • O(n²)',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
        title: 'Why Worst Case is O(n²) — The Math Made Ultra Simple',
        content: `When does the worst case happen?
When the array is in completely reverse order: [50, 40, 30, 20, 10]. Every single pair is wrong and must swap.

Let's count how many comparisons the teacher makes for n = 5 students:
• Pass 1: compares 4 pairs (5 - 1)
• Pass 2: compares 3 pairs (5 - 2)
• Pass 3: compares 2 pairs (5 - 3)
• Pass 4: compares 1 pair  (5 - 4)

Total comparisons = 4 + 3 + 2 + 1 = 10 comparisons.

For ANY general number of elements n:
Total = (n - 1) + (n - 2) + (n - 3) + ... + 2 + 1
Formula: Sum = n × (n - 1) / 2 = (n² - n) / 2

In Big-O notation:
1. We ignore smaller terms (-n).
2. We drop constant fractions (1/2).
3. We are left with: O(n²) (Quadratic time).

Why is this bad for big data?
• If n = 10 items   → ~45 operations   (Instant)
• If n = 1,000 items → ~500,000 operations (Noticeable)
• If n = 100,000 items → ~5,000,000,000 operations (Takes MINUTES or crashes!)`
      },
      {
        id: 'best-case',
        badge: 'Best Time • O(n)',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        title: 'Why Best Case is O(n) — The "Early Exit" Trick',
        content: `When does the best case happen?
When the array is ALREADY 100% sorted from the start: [10, 20, 30, 40, 50].

How does the computer know?
We use a boolean flag called 'swapped = false'.

1. The teacher walks through the line once, comparing all (n - 1) neighbors.
2. Because everyone is already in height order, ZERO swaps happen!
3. At the end of Pass 1, the teacher checks: "Did we swap anyone? No? Then we are done!"
4. The algorithm stops immediately without running the remaining passes.

Total comparisons = n - 1 = O(n) (Linear Time).`
      },
      {
        id: 'space-and-stability',
        badge: 'Aux Space O(1) & Stable',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        title: 'Why Space is O(1) & Why Bubble Sort is "Stable"',
        content: `1. Why Space is O(1) (In-Place Sorting):
• You DO NOT need to create a second array or allocate extra memory.
• To swap two neighbors, you only need one tiny temporary variable ('temp') to hold a number for a fraction of a millisecond.
• Whether you sort 5 numbers or 50,000,000 numbers, you still only need that single 'temp' variable.
• Therefore, Auxiliary Space is constant: O(1).

2. Why Bubble Sort is "Stable":
• What is stability? If two elements have the EXACT SAME value (e.g. two 25's), a stable sort guarantees the 25 that appeared first originally stays in front.
• In Bubble sort: we check 'if (arr[j] > arr[j + 1])'.
• Notice we check strictly GREATER (>), NOT greater-than-or-equal (>=).
• If two neighbors are equal (25 and 25), they are NEVER swapped. They preserve their original order!`
      },
      {
        id: 'interview-traps',
        badge: 'Placement & Exam Traps',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: 'Top 3 Viva & Interview Questions to Ace',
        content: `Q1: Can Bubble Sort ever run in O(n) time?
Ans: YES! Only if optimized with a 'swapped' boolean flag and the input array is already sorted. An unoptimized bubble sort always takes O(n²).

Q2: Is Bubble Sort suitable for large production systems?
Ans: No. Because O(n²) grows too quickly. Production systems use O(n log n) algorithms like Merge Sort (Timsort in Python/Java) or Quick Sort.

Q3: What is the maximum number of swaps possible in Bubble Sort?
Ans: In the worst case (reverse order), the number of swaps equals n(n - 1) / 2.`
      }
    ]
  },
  selection: {
    title: 'Selection Sort: Deep Dive & Intuitive Breakdown',
    subtitle: 'Understand minimum selection, O(n²) in ALL cases, and why it is NOT stable.',
    analogy: {
      headline: 'The Shopping Cart Lowest Price Analogy',
      story: `Imagine you have 5 price tags on a table.
1. You scan the entire table with your eyes, find the absolute CHEAPEST tag, and swap it to the 1st position.
2. Next, you scan the remaining 4 tags, find the smallest among them, and swap it to the 2nd position.
3. You repeat this until every spot is filled with the correct minimum.

Because you always SELECT the minimum element and put it in place, it is called Selection Sort!`
    },
    sections: [
      {
        id: 'selection-time',
        badge: 'Time Complexity • O(n²) Always',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
        title: 'Why Selection Sort is ALWAYS O(n²) — Even if Already Sorted!',
        content: `Unlike Bubble Sort, Selection Sort DOES NOT have an early exit.
Even if the array is already [10, 20, 30, 40, 50], to be 100% sure that 10 is the minimum, it MUST scan all remaining elements.

In every pass i, it scans (n - 1 - i) elements:
Total comparisons = (n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2 = O(n²).

• Best Case: O(n²)
• Average Case: O(n²)
• Worst Case: O(n²)

Key Advantage: While it does O(n²) comparisons, it does at most O(n) swaps! This is useful when memory write operations are very expensive (like old EEPROM flash memory).`
      },
      {
        id: 'selection-stability',
        badge: 'Unstable • O(1) Space',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        title: 'Why Selection Sort is NOT Stable (Exam Favorite!)',
        content: `Interview Trap Question: "Why is Selection Sort unstable?"
Example: Consider [4a, 4b, 2].
• Step 1: Minimum element in the array is 2 at index 2.
• Step 2: Swap 2 with the first element (4a).
• Result: [2, 4b, 4a].

Notice that 4b is now BEFORE 4a! Their relative order flipped. Hence, Selection Sort is UNSTABLE.`
      }
    ]
  },
  insertion: {
    title: 'Insertion Sort: Deep Dive & Intuitive Breakdown',
    subtitle: 'The card player algorithm. Blazing fast O(n) for nearly sorted data.',
    analogy: {
      headline: 'The Playing Cards in Hand Analogy',
      story: `Imagine you are dealt cards in a game of Rummy or Uno:
1. You hold the first card in your hand (a hand of 1 card is already sorted).
2. You pick the next card from the deck. You compare it backwards against the cards in your hand and SLIDE it into its correct position.
3. You repeat this for each new card.

This is exactly Insertion Sort: it picks one element (the 'key') and inserts it into its proper place in the sorted left subarray.`
    },
    sections: [
      {
        id: 'insertion-performance',
        badge: 'Best O(n) • Worst O(n²)',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: 'Why Insertion Sort is the King of Small or Nearly-Sorted Data',
        content: `• Best Case O(n): If the cards are already sorted, for each card you check once with the left neighbor and stop immediately. Only n-1 comparisons!
• Worst Case O(n²): If the array is backwards, each card must shift past all previous cards. Total shifts = n(n - 1) / 2 = O(n²).
• Space: O(1) (In-place).
• Stability: YES, it is stable because equal cards are not shifted past each other.

Fun Fact: Standard libraries in Java, Python, and C++ (Timsort & Introsort) use Insertion Sort for small arrays (size < 16 to 32) because of its tiny overhead and cache friendliness!`
      }
    ]
  },
  merge: {
    title: 'Merge Sort: Deep Dive & Intuitive Breakdown',
    subtitle: 'Divide and Conquer: Guaranteed O(n log n) efficiency for huge datasets.',
    analogy: {
      headline: 'The Textbook Splitting Analogy',
      story: `Imagine sorting 100 exam papers:
1. Divide: Split the stack into two halves of 50. Split those into 25, then 12, until you have single papers.
2. A single paper is trivially sorted by itself!
3. Conquer: Merge pairs of sorted papers by comparing their top sheets and taking the smaller one.
4. Continue merging upward until you have one master sorted stack of 100 papers!`
    },
    sections: [
      {
        id: 'merge-math',
        badge: 'Time O(n log n) • Space O(n)',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        title: 'Why Merge Sort is Always O(n log n) — The Recurrence Tree',
        content: `1. Tree Depth (Divide Phase):
Every time we divide by 2, how many times can we split n before reaching 1?
Formula: log₂(n) levels!
• For 1,024 items: log₂(1024) = 10 splits!

2. Work Per Level (Merge Phase):
At every level of the tree, merging all elements takes O(n) total comparisons.

Total Runtime = (Number of levels) × (Work per level) = log₂(n) × n = O(n log n).

Crucial Trade-off:
To merge two halves without overwriting data, Merge Sort requires a temporary helper array of size n. Therefore, its Auxiliary Space is O(n), NOT O(1)!`
      }
    ]
  },
  quick: {
    title: 'Quick Sort: Deep Dive & Intuitive Breakdown',
    subtitle: 'Partitioning around a pivot: Average O(n log n), in-place, and cache friendly.',
    analogy: {
      headline: 'The Class Leader Partitioning Analogy',
      story: `1. Pick one student as the "Leader" (Pivot).
2. Everyone shorter than the Leader goes to the LEFT room.
3. Everyone taller than the Leader goes to the RIGHT room.
4. The Leader now stands in their EXACT final spot between the two rooms!
5. Repeat the same process independently inside the left and right rooms.`
    },
    sections: [
      {
        id: 'quick-analysis',
        badge: 'Avg O(n log n) • Worst O(n²)',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        title: 'Why Average is O(n log n) but Worst is O(n²)',
        content: `• Average Case O(n log n): If the pivot splits the array into roughly equal halves, the recursion tree has log₂(n) depth, taking O(n log n) time.
• Worst Case O(n²): If the pivot chosen is always the smallest or largest element (e.g., array is already sorted and we pick the first/last element as pivot), the partitions become of sizes 1 and n-1. The tree depth degrades to n, resulting in O(n²) time!
• Space: O(log n) call stack space for recursion.
• Stability: UNSTABLE (swaps over long distances during partitioning).`
      }
    ]
  }
};

export default function ComplexityDeepDive({ algoKey = 'bubble' }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSection, setOpenSection] = useState(0);

  const data = deepDiveData[algoKey] || deepDiveData.bubble;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs font-sans text-slate-900 mt-6">
      {/* Header with Expand / Collapse Toggle */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                {data.title}
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Beginner Guide
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {data.subtitle}
            </p>
          </div>
        </div>

        <button 
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title={isExpanded ? 'Collapse guide' : 'Expand guide'}
        >
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-6">
          {/* Real-World Analogy Banner */}
          <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/80 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                {data.analogy.headline}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
              {data.analogy.story}
            </p>
          </div>

          {/* Detailed Accordion Sections */}
          <div className="space-y-3">
            {data.sections.map((sec, idx) => {
              const isOpen = openSection === idx;

              return (
                <div
                  key={sec.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-blue-300 bg-white shadow-sm' 
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

          {/* Quick Summary Pill Bar */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Exam Tip: Remember both Big-O formula &amp; stability for college viva!</span>
            </span>
            <span className="text-blue-700 font-bold">
              AlgoArena Study Hub &bull; Level 1
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

