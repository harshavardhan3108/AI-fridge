import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function CookingSteps({ steps }) {
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (index) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!steps || steps.length === 0) return null;

  const totalSteps = steps.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col gap-6 w-full transition-all duration-300">
      {/* Header & Progress Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
            Preparation Timeline
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Follow the instructions step-by-step.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            {progressPercent}% Done
          </span>
        </div>
      </div>

      {/* Vertical Steps Timeline */}
      <div className="relative pl-6 md:pl-8 flex flex-col gap-8">
        {/* Timeline bar */}
        <div className="absolute left-[13px] md:left-[17px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800">
          {/* Active timeline bar progress */}
          <div
            className="w-full bg-primary transition-all duration-500"
            style={{ height: `${progressPercent}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isDone = !!completedSteps[index];

          return (
            <div key={index} className="relative flex items-start gap-4 md:gap-6 group">
              {/* Timeline dot / bubble */}
              <button
                onClick={() => toggleStep(index)}
                className={`absolute -left-9 md:-left-11 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center border font-bold text-xs md:text-sm transition-all duration-300 z-10 ${
                  isDone
                    ? "bg-success border-success text-white scale-110 shadow-glow"
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-500 hover:border-primary hover:text-primary"
                }`}
                aria-label={`Mark step ${index + 1} as ${isDone ? "incomplete" : "complete"}`}
              >
                {isDone ? <FiCheck className="w-4 h-4" /> : index + 1}
              </button>

              {/* Instruction card bubble */}
              <div
                onClick={() => toggleStep(index)}
                className={`flex-1 p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isDone
                    ? "bg-success/5 border-success/30 opacity-70 text-slate-400 dark:text-slate-500 line-through"
                    : "bg-white/20 dark:bg-slate-800/20 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:scale-[1.01] text-slate-700 dark:text-slate-200"
                }`}
              >
                <p className="text-sm md:text-base font-medium leading-relaxed">
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
