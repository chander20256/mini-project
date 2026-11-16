import React from 'react';
import { Eye, Terminal, HelpCircle, Trophy, CheckCircle2 } from 'lucide-react';

export default function DsaHowToPlay() {
  const steps = [
    {
      step: '01',
      title: 'Watch the Visual Block Simulation',
      description: 'See the sorting algorithm in action using height-scaled blocks. Comparisons glow yellow, swaps flash red, and settled elements turn emerald green.',
      icon: Eye,
      accent: 'border-blue-200 text-blue-600 bg-blue-50'
    },
    {
      step: '02',
      title: 'Follow Step-by-Step Execution on the Right',
      description: 'The right-hand panel breaks down every pointer comparison, swap counter, and highlighted pseudo-code line as it happens in real-time.',
      icon: Terminal,
      accent: 'border-indigo-200 text-indigo-600 bg-indigo-50'
    },
    {
      step: '03',
      title: 'Solve the 5 Most Asked Interview Questions',
      description: 'As soon as the sorting finishes, a 5-question interview boss challenge unlocks testing best/worst time complexities, stability, space complexity, and edge cases.',
      icon: HelpCircle,
      accent: 'border-amber-200 text-amber-600 bg-amber-50'
    },
    {
      step: '04',
      title: 'Earn XP, Badges & Level Up',
      description: 'Pass the quiz with flying colors to earn XP points, collect algorithm mastery badges, and unlock the next arena!',
      icon: Trophy,
      accent: 'border-purple-200 text-purple-600 bg-purple-50'
    }
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Game Mechanics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-slate-900">
            How to Play &amp; Learn
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            From intuitive visual intuition to technical interview readiness in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 relative flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${s.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
