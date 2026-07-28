import React from "react";
import { FiCopy, FiPrinter, FiDownload, FiRefreshCw, FiEdit2, FiStar, FiGrid } from "react-icons/fi";

export default function QuickActions({
  isFavorite,
  onToggleFavorite,
  onCopy,
  onPrint,
  onDownload,
  onRegenerate,
  onEditIngredients
}) {
  return (
    <div className="glass-panel rounded-[30px] p-6 flex flex-col gap-6 w-full shadow-glass relative">
      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FiGrid className="text-primary" />
          <span>Quick Actions</span>
        </h3>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          Perform actions on this current recipe.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Favorite */}
        <button
          onClick={onToggleFavorite}
          className={`w-full py-3 px-4 rounded-2xl font-semibold flex items-center gap-3 transition-all active:scale-[0.98] border ${
            isFavorite
              ? "bg-accent/15 border-accent/30 text-accent"
              : "bg-white/30 dark:bg-slate-800/30 border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:scale-[1.02]"
          }`}
        >
          <FiStar className={`w-4.5 h-4.5 ${isFavorite ? "fill-accent" : ""}`} />
          <span className="text-sm">{isFavorite ? "Favorited" : "Favorite Recipe"}</span>
        </button>

        {/* Copy */}
        <button
          onClick={onCopy}
          className="w-full py-3 px-4 rounded-2xl font-semibold bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
        >
          <FiCopy className="w-4.5 h-4.5 text-primary" />
          <span className="text-sm">Copy Recipe</span>
        </button>

        {/* Print */}
        <button
          onClick={onPrint}
          className="w-full py-3 px-4 rounded-2xl font-semibold bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
        >
          <FiPrinter className="w-4.5 h-4.5 text-success" />
          <span className="text-sm">Print / PDF</span>
        </button>

        {/* Download JSON */}
        <button
          onClick={onDownload}
          className="w-full py-3 px-4 rounded-2xl font-semibold bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
        >
          <FiDownload className="w-4.5 h-4.5 text-secondary" />
          <span className="text-sm">Download JSON</span>
        </button>

        {/* Edit Ingredients */}
        <button
          onClick={onEditIngredients}
          className="w-full py-3 px-4 rounded-2xl font-semibold bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
        >
          <FiEdit2 className="w-4.5 h-4.5 text-warning" />
          <span className="text-sm">Edit Ingredients</span>
        </button>

        <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-2" />

        {/* Regenerate */}
        <button
          onClick={onRegenerate}
          className="w-full py-3 px-4 rounded-2xl font-semibold bg-gradient-to-tr from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <FiRefreshCw className="w-4.5 h-4.5 animate-spin-slow" />
          <span className="text-sm">Regenerate Recipe</span>
        </button>
      </div>
    </div>
  );
}
