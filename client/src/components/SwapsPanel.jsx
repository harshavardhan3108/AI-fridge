import React from "react";
import { FiRefreshCw, FiInfo } from "react-icons/fi";

export default function SwapsPanel({ swaps }) {
  if (!swaps || swaps.length === 0) return null;

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col gap-5 w-full transition-all duration-300">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
          Chef's Ingredient Swaps
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Alternative ingredients you can use to fit what is in your pantry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {swaps.map((swap, index) => {
          // Check if swap matches the pattern "No X? Try Y"
          const parts = swap.split(/\?|\btry\b/i);
          let heading = "Ingredient Swap";
          let body = swap;

          if (parts.length >= 2) {
            heading = parts[0].trim() + "?";
            body = "Try " + parts.slice(1).join(" ").trim().replace(/^try\s*/i, "");
          }

          return (
            <div
              key={index}
              className="flex gap-4 p-4 bg-white/20 dark:bg-slate-800/20 rounded-2xl border border-white/20 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary dark:text-secondary shrink-0">
                <FiRefreshCw className="w-5 h-5" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {heading}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                  {body}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
