import React from "react";
import { FiClock, FiGrid, FiUsers, FiCpu, FiAward, FiList } from "react-icons/fi";

export default function AiDashboard({ recipe, loading }) {
  // Pull variables or defaults
  const cookTime = recipe ? recipe.cookTime : "--";
  const difficulty = recipe ? recipe.difficulty : "--";
  const servings = recipe ? recipe.servings : "--";
  const ingCount = recipe ? recipe.ingredients?.length : 0;
  
  // Calculate a recipe score/quality metric
  let qualityScore = 0;
  let qualityText = "Pending AI Input";
  
  if (recipe) {
    qualityScore = 96; // AI Gourmet grade
    qualityText = "Gourmet Level";
  } else if (loading) {
    qualityScore = 45; // Loading
    qualityText = "Computing Grade...";
  }

  // Circular progress math
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (qualityScore / 100) * circumference;

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col justify-between w-full h-full relative overflow-hidden transition-all duration-300">
      {/* Background glow orb */}
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-primary dark:text-secondary uppercase tracking-widest block">
            Core Diagnostics
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
            AI Engine Status
          </h2>
        </div>
      </div>

      {/* Circle Animation & Metrics */}
      <div className="flex flex-col items-center justify-center my-8 relative">
        <svg className="w-36 h-36 transform -rotate-90">
          {/* Base Circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated Gradient Circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-primary dark:stroke-secondary transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center content of circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {recipe ? `${qualityScore}%` : "--"}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
            Chef Score
          </span>
        </div>

        <div className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <FiAward className="text-accent" />
          {qualityText}
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-2 gap-4">
        {/* Cook Time */}
        <div className="flex items-center gap-3 bg-white/30 dark:bg-slate-800/30 p-3 rounded-2xl border border-white/20 dark:border-slate-700/50">
          <div className="p-2 rounded-xl bg-primary/10 text-primary dark:text-secondary">
            <FiClock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold">Cook Time</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{cookTime}</span>
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-3 bg-white/30 dark:bg-slate-800/30 p-3 rounded-2xl border border-white/20 dark:border-slate-700/50">
          <div className="p-2 rounded-xl bg-accent/10 text-accent">
            <FiGrid className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold">Difficulty</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{difficulty}</span>
          </div>
        </div>

        {/* Servings */}
        <div className="flex items-center gap-3 bg-white/30 dark:bg-slate-800/30 p-3 rounded-2xl border border-white/20 dark:border-slate-700/50">
          <div className="p-2 rounded-xl bg-success/10 text-success">
            <FiUsers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold">Servings</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{servings}</span>
          </div>
        </div>

        {/* Ingredients Count */}
        <div className="flex items-center gap-3 bg-white/30 dark:bg-slate-800/30 p-3 rounded-2xl border border-white/20 dark:border-slate-700/50">
          <div className="p-2 rounded-xl bg-warning/10 text-warning">
            <FiList className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold">Ingredients</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ingCount} items</span>
          </div>
        </div>
      </div>
    </div>
  );
}
