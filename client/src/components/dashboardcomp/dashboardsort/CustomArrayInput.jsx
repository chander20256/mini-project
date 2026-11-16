import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles, Check, AlertCircle, RotateCcw } from 'lucide-react';

export default function CustomArrayInput({ onApplyArray, algoName = 'Algorithm', accentColor = 'blue' }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const presets = [
    { label: 'Reversed', values: [95, 80, 65, 50, 35, 20] },
    { label: 'Nearly Sorted', values: [15, 25, 40, 35, 70, 85] },
    { label: 'Duplicates', values: [30, 70, 30, 90, 70, 15] },
    { label: 'Random 8', values: null } // generated dynamically
  ];

  const handleApply = (nums) => {
    setError('');
    if (!nums || nums.length < 3) {
      setError('Please provide at least 3 numbers.');
      return;
    }
    if (nums.length > 15) {
      setError('Maximum 15 numbers allowed for clear visualization.');
      return;
    }
    if (nums.some(n => isNaN(n) || n < 1 || n > 100)) {
      setError('All numbers must be between 1 and 100.');
      return;
    }

    onApplyArray(nums);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Enter comma-separated numbers (e.g. 45, 12, 85, 32).');
      return;
    }

    const parsed = inputValue
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(s => parseInt(s, 10));

    handleApply(parsed);
  };

  const handlePreset = (preset) => {
    setError('');
    let vals = preset.values;
    if (!vals) {
      // Random 8
      vals = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 12);
    }
    setInputValue(vals.join(', '));
    handleApply(vals);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs font-sans">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Custom Array Input
            </h3>
            <span className="text-[11px] text-slate-400">
              Enter your own numbers to test {algoName}
            </span>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
          3 - 15 values (1-100)
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            placeholder="e.g. 45, 18, 92, 33, 67, 12, 54"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            {appliedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Loaded!</span>
              </>
            ) : (
              <span>Set Values</span>
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Presets */}
        <div className="pt-1 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePreset(preset)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

