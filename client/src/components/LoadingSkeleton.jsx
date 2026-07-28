import React, { useState, useEffect } from "react";
import { FiLoader, FiCpu } from "react-icons/fi";

const STAGES = [
  "Reading Ingredients...",
  "Thinking Like a Chef...",
  "Building Recipe...",
  "Calculating Nutrition...",
  "Almost Ready..."
];

export default function LoadingSkeleton() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 animate-pulse select-none pointer-events-none">
      {/* Top Banner Stage Status */}
      <div className="glass-card rounded-2xl p-4 md:p-5 flex items-center justify-between border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 text-primary rounded-lg animate-spin">
            <FiLoader className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">AI Culinary Core</span>
            <span className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200">
              {STAGES[stageIndex]}
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Stage {stageIndex + 1} of {STAGES.length}
        </span>
      </div>

      {/* Main Grid Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Recipe Outline Skeleton */}
        <div className="md:col-span-2 glass-card rounded-[32px] overflow-hidden flex flex-col gap-5">
          {/* Cover Image Mock */}
          <div className="h-56 bg-slate-200 dark:bg-slate-800 w-full" />
          {/* Card Body Mock */}
          <div className="p-6 md:p-8 flex flex-col gap-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-5/6" />

            {/* Meta tags Mock */}
            <div className="flex gap-4 border-y border-slate-200/50 dark:border-slate-700/50 py-4 my-2">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-20" />
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-20" />
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-20" />
            </div>

            {/* Buttons Mock */}
            <div className="flex gap-4">
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl flex-1" />
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl flex-1" />
            </div>
          </div>
        </div>

        {/* Right Side: Dashboard Outline Skeleton */}
        <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col gap-6 justify-between">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-24" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-12" />
          </div>

          {/* Circle mock */}
          <div className="w-28 h-28 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-primary/30 mx-auto animate-spin" />

          {/* Bottom Grid mock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
