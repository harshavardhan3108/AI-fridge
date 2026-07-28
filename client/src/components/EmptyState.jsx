import React from "react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 glass-card rounded-[32px] w-full transition-all duration-300 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Chef Hat / Pan Graphic */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-glow animate-float-medium">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a4 4 0 00-4 4 4 4 0 00-1.9 6.2 3 3 0 00.9 5.8h10a3 3 0 00.9-5.8 4 4 0 00-1.9-6.2 4 4 0 00-4-4zM8 18h8v2H8v-2z" />
          </svg>
        </div>
        {/* Steam rings */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col gap-0.5 opacity-60">
          <div className="w-1.5 h-3 bg-secondary/30 rounded-full blur-[1px] animate-pulse" />
          <div className="w-2 h-4 bg-primary/30 rounded-full blur-[1px] animate-pulse delay-75" />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
        Your Kitchen is Waiting
      </h2>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
        Enter whatever ingredients you have in your fridge, and let the AI Chef build a customized gourmet recipe.
      </p>

      {/* Mini user guide steps */}
      <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md border-t border-slate-200/50 dark:border-slate-700/50 pt-6">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mb-2">
            1
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">List Items</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mb-2">
            2
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Generate</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center text-xs font-bold mb-2">
            3
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Cook Dish</span>
        </div>
      </div>
    </div>
  );
}
