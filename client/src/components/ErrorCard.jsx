import React from "react";
import { FiAlertOctagon, FiRefreshCw, FiEdit3 } from "react-icons/fi";

export default function ErrorCard({ error, onRetry, onEdit }) {
  return (
    <div className="glass-panel border-danger/30 bg-danger/10 text-slate-800 dark:text-slate-100 rounded-[30px] p-6 md:p-8 flex flex-col items-center text-center gap-6 max-w-xl mx-auto shadow-glass relative overflow-hidden transition-all duration-300">
      {/* Red accent blur circle */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-danger/15 rounded-full blur-xl pointer-events-none" />

      {/* Danger Icon */}
      <div className="w-14 h-14 rounded-full bg-danger/25 text-danger flex items-center justify-center shadow-lg border border-danger/30">
        <FiAlertOctagon className="w-7 h-7" />
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
          Recipe Synthesis Interrupted
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {error || "We ran into an issue connecting to the AI Chef. Make sure your GEMINI_API_KEY is configured in server/.env and try again."}
        </p>
      </div>

      <div className="flex items-center gap-3 w-full">
        {/* Edit ingredients */}
        <button
          onClick={onEdit}
          className="flex-1 py-3 px-4 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 bg-white/20 dark:bg-slate-800/20 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <FiEdit3 className="w-4 h-4" />
          <span>Edit Ingredients</span>
        </button>

        {/* Retry */}
        <button
          onClick={onRetry}
          className="flex-1 py-3 px-4 rounded-xl font-semibold bg-danger text-white hover:bg-danger/95 hover:scale-105 active:scale-95 shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    </div>
  );
}
