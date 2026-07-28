import React from "react";

export default function NutritionPanel({ nutrition }) {
  if (!nutrition) return null;

  // Helper to parse numbers from strings like "450 kcal" or "15g"
  const parseNum = (str, fallback = 1) => {
    if (!str) return fallback;
    const match = str.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : fallback;
  };

  const calVal = parseNum(nutrition.calories, 450);
  const protVal = parseNum(nutrition.protein, 15);
  const fatVal = parseNum(nutrition.fat, 12);
  const carbVal = parseNum(nutrition.carbs, 50);

  // Targets
  const calPercent = Math.min(Math.round((calVal / 2000) * 100), 100);
  const protPercent = Math.min(Math.round((protVal / 80) * 100), 100);
  const fatPercent = Math.min(Math.round((fatVal / 70) * 100), 100);
  const carbPercent = Math.min(Math.round((carbVal / 250) * 100), 100);

  const renderRing = (label, value, percent, colorClass, baseColorClass) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <div className="flex flex-col items-center p-4 bg-white/20 dark:bg-slate-800/20 rounded-2xl border border-white/20 dark:border-slate-700/50">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Ring */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="5"
              fill="transparent"
            />
            {/* Active Ring */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className={`transition-all duration-1000 ease-out ${colorClass}`}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          {/* Label inside ring */}
          <div className="absolute text-center">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
              {percent}%
            </span>
          </div>
        </div>
        <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mt-2">
          {value}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold mt-0.5">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col gap-5 w-full transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
            Nutrition Diagnostics
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Estimation based on average single serving proportions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {renderRing(
          "Calories",
          nutrition.calories,
          calPercent,
          "stroke-primary dark:stroke-secondary",
          "stroke-slate-200"
        )}
        {renderRing(
          "Protein",
          nutrition.protein,
          protPercent,
          "stroke-accent",
          "stroke-slate-200"
        )}
        {renderRing(
          "Fat",
          nutrition.fat,
          fatPercent,
          "stroke-danger",
          "stroke-slate-200"
        )}
        {renderRing(
          "Carbs",
          nutrition.carbs,
          carbPercent,
          "stroke-warning",
          "stroke-slate-200"
        )}
      </div>
    </div>
  );
}
