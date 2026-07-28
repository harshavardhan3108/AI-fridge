import React from "react";
import { FiClock, FiCalendar, FiBookOpen, FiTrash2 } from "react-icons/fi";

export default function RecipeHistory({ history, onSelectRecipe, activeRecipeId, onDeleteRecipe }) {
  if (!history || history.length === 0) {
    return (
      <div className="glass-card rounded-[30px] p-6 text-center text-slate-400 dark:text-slate-500">
        <FiBookOpen className="w-10 h-10 mx-auto opacity-40 mb-3" />
        <p className="text-sm font-semibold">No history in this session yet.</p>
        <p className="text-[11px] mt-1">Generated recipes will appear here.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col gap-5 w-full transition-all duration-300">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
          Session History
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Access recipes generated during this session.
        </p>
      </div>

      <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
        {history.map((item) => {
          const isActive = activeRecipeId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectRecipe(item)}
              className={`flex items-center gap-3.5 p-3 rounded-2xl border cursor-pointer transition-all group relative ${
                isActive
                  ? "bg-primary/10 border-primary/40 text-primary dark:text-secondary shadow-sm"
                  : "bg-white/20 dark:bg-slate-800/20 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-200"
              }`}
            >
              {/* Thumbnail Placeholder */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 border border-white/20">
                <span className="text-lg">🍲</span>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate tracking-tight">{item.recipeName}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                  <FiClock className="w-3 h-3" />
                  <span>{item.cookTime}</span>
                  <span>•</span>
                  <FiCalendar className="w-3 h-3" />
                  <span>{item.timestamp}</span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRecipe(item.id);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-danger hover:bg-danger/10 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shrink-0"
                title="Delete recipe"
                aria-label="Delete recipe"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
