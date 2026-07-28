import React from "react";
import { FiCpu, FiPlus } from "react-icons/fi";

const SUGGESTIONS = [
  "egg, onion, tomato",
  "chicken breast, garlic, spinach",
  "tofu, soy sauce, broccoli, rice",
  "salmon, lemon, asparagus",
  "pasta, tomato paste, basil, olive oil"
];

export default function IngredientInput({
  ingredients,
  setIngredients,
  onGenerate,
  loading
}) {
  const charLimit = 300;
  const charsRemaining = charLimit - ingredients.length;

  const handleTextChange = (e) => {
    if (e.target.value.length <= charLimit) {
      setIngredients(e.target.value);
    }
  };

  const addSuggestion = (sug) => {
    if (ingredients.trim()) {
      const merged = `${ingredients.trim()}, ${sug}`;
      if (merged.length <= charLimit) {
        setIngredients(merged);
      }
    } else {
      setIngredients(sug);
    }
  };

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col gap-6 w-full relative overflow-hidden transition-all duration-300">
      {/* Glow highlight background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          Gather Ingredients
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tell us what items you want to use, and we will formulate a recipe.
        </p>
      </div>

      <div className="relative">
        <textarea
          value={ingredients}
          onChange={handleTextChange}
          disabled={loading}
          placeholder="What's inside your fridge today? (e.g. egg, onion, tomato)"
          className="w-full h-40 p-4 rounded-2xl glass-input outline-none resize-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-base md:text-lg focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-400 dark:text-slate-500">
          {charsRemaining} / {charLimit}
        </div>
      </div>

      {/* Suggestion Tags */}
      <div>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-2 uppercase tracking-wider">
          Popular Combos
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              type="button"
              onClick={() => addSuggestion(sug)}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-secondary hover:border-primary/20 transition-all flex items-center gap-1 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" />
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onGenerate}
        disabled={loading || !ingredients.trim()}
        className={`w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-glow transition-all duration-300 active:scale-[0.98] ${
          !ingredients.trim() || loading
            ? "bg-slate-300 dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-none cursor-not-allowed"
            : "bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/95 hover:via-secondary/95 hover:to-accent/95 text-white hover:shadow-lg hover:scale-[1.02]"
        }`}
      >
        <FiCpu className="w-5 h-5 animate-pulse" />
        {loading ? "Chef is formulating..." : "Generate Recipe"}
      </button>
    </div>
  );
}
