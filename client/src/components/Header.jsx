import React from "react";
import { FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { RiFridgeLine } from "react-icons/ri";

export default function Header({ darkMode, setDarkMode, searchText, setSearchText }) {
  return (
    <header className="w-full glass-panel rounded-[30px] p-4 px-6 md:px-8 flex items-center justify-between z-10 transition-all duration-300 relative">
      {/* Logo Area */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-glow">
          <RiFridgeLine className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
          AI Fridge
        </span>
      </div>

      {/* Search Input */}
      <div className="hidden md:flex items-center gap-2 glass-input rounded-full px-4 py-2 w-64">
        <FiSearch className="text-slate-400 dark:text-slate-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Button (simplified) */}
        <button
          onClick={() => {
            const val = prompt("Enter search term:") || "";
            setSearchText(val);
          }}
          className="md:hidden p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 transition-colors"
          aria-label="Search"
        >
          <FiSearch className="w-5 h-5" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-full bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <FiSun className="w-5 h-5 text-warning" />
          ) : (
            <FiMoon className="w-5 h-5 text-primary" />
          )}
        </button>

      </div>
    </header>
  );
}
