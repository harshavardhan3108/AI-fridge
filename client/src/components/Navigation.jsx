import React from "react";
import { FiCompass, FiList, FiPlay, FiPieChart, FiRotateCcw, FiStar } from "react-icons/fi";

const NAV_ITEMS = [
  { id: "recipe", label: "Recipe", icon: FiCompass },
  { id: "ingredients", label: "Ingredients", icon: FiList },
  { id: "cooking", label: "Cooking", icon: FiPlay },
  { id: "nutrition", label: "Nutrition", icon: FiPieChart },
  { id: "history", label: "History", icon: FiRotateCcw },
  { id: "favorites", label: "Favorites", icon: FiStar },
];

export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border-t border-white/20 dark:border-slate-800 p-2 flex justify-around md:relative md:flex-col md:bottom-auto md:left-auto md:right-auto md:z-10 md:bg-transparent md:border-none md:p-0 md:justify-start md:gap-4 w-full md:w-auto">
      <div className="flex flex-row md:flex-col md:gap-4 justify-around md:justify-start w-full md:w-20 glass-panel md:p-4 rounded-none md:rounded-[30px] shadow-glass md:items-center">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center justify-center p-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-tr from-primary to-secondary text-white shadow-glow scale-110"
                  : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary hover:bg-white/40 dark:hover:bg-slate-800/40 hover:scale-105"
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />

              {/* Tooltip for desktop only */}
              <span className="absolute left-24 hidden md:group-hover:inline-block bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
