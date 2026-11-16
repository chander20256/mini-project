import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Swords, Flame, HelpCircle } from 'lucide-react';

export default function DsaHero({ onStart }) {
  const [bars, setBars] = useState([45, 80, 25, 95, 60, 35, 75, 50]);
  const [comparing, setComparing] = useState([2, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => {
        const next = [...prev];
        const idx1 = Math.floor(Math.random() * (next.length - 1));
        const idx2 = idx1 + 1;
        setComparing([idx1, idx2]);
        if (next[idx1] > next[idx2]) {
          const temp = next[idx1];
          next[idx1] = next[idx2];
          next[idx2] = temp;
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50/70 to-white text-slate-900">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-cyan-200/30 blur-3xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Column */}
          <div className="flex-1 text-center lg:text-left">
            {/* Gamified Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Flame className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Interactive DSA Game &bull; Visualizer + Interview Arena</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight sm:leading-none text-slate-900">
              Master DSA Like a Game. <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Visualize. Trace. Conquer.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Watch algorithms come alive with interactive block animations. Follow step-by-step code execution in real time. Once the sort finishes, 
              <span className="text-blue-700 font-bold"> defeat the 5 most asked interview questions</span> to level up!
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onStart && onStart(null)}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Swords className="w-5 h-5 text-white" />
                <span>Enter Arena Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#modes"
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-blue-600 fill-current" />
                <span>Explore Game Modes</span>
              </a>
            </div>

            {/* Highlights */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Animated Block Sorting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>Line-by-Line Tracing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>Top 5 Interview Quizzes</span>
              </div>
            </div>
          </div>

          {/* Right Visualizer Preview Card */}
          <div className="w-full lg:w-5/12">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs font-mono text-slate-600 font-semibold ml-2">bubble_sort.visualizer</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Live Preview
                </span>
              </div>

              {/* Dynamic Animated Bars */}
              <div className="h-56 flex items-end justify-between gap-2 pt-8 pb-4 px-2">
                {bars.map((val, idx) => {
                  const isComp = comparing.includes(idx);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">{val}</span>
                      <div
                        style={{ height: `${val}%` }}
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isComp
                            ? 'bg-gradient-to-t from-amber-500 to-amber-300 shadow-md shadow-amber-400/30 scale-105'
                            : 'bg-gradient-to-t from-blue-600 to-cyan-500'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Step info banner */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono flex items-center justify-between">
                <span className="text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Comparing indices [{comparing[0]}, {comparing[1]}]</span>
                </span>
                <span className="text-blue-600 font-bold">Step 12</span>
              </div>

              {/* Quiz teaser */}
              <div className="mt-4 p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-900 font-medium">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Interview Challenge unlocks at finish!</span>
                </div>
                <span className="text-amber-600 font-bold text-[10px] uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                  +50 XP
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
