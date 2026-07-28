import React from "react";
import { FiClock, FiGrid, FiUsers, FiHeart, FiCopy, FiDownload, FiStar } from "react-icons/fi";

export default function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onCopy,
  onDownload
}) {
  if (!recipe) return null;

  // Use a dynamic search parameter based on recipe name for Unsplash image,
  // falling back to a high-quality global culinary image.
  const query = encodeURIComponent(recipe.recipeName);
  const imageUrl = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop`;

  return (
    <div className="glass-card rounded-[32px] overflow-hidden w-full relative transition-all duration-300">
      {/* Recipe Cover Image */}
      <div className="h-56 md:h-64 w-full relative overflow-hidden">
        <img
          src={imageUrl}
          alt={recipe.recipeName}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop";
          }}
        />
        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent pointer-events-none" />

        {/* Favorite Icon inside Image header */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border hover:scale-110 active:scale-95 transition-all ${
            isFavorite
              ? "bg-accent text-white border-accent/40 shadow-glowAccent"
              : "bg-white/30 text-white border-white/20 hover:bg-white/40"
          }`}
          aria-label="Add to favorites"
        >
          <FiStar className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        {/* Quick Meta Badge (Difficulty) */}
        <span className={`absolute bottom-4 left-4 text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md border text-white ${
          recipe.difficulty === "Easy"
            ? "bg-success/40 border-success/30"
            : recipe.difficulty === "Medium"
              ? "bg-warning/40 border-warning/30"
              : "bg-danger/40 border-danger/30"
        }`}>
          {recipe.difficulty}
        </span>
      </div>

      {/* Main Info */}
      <div className="p-6 md:p-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            {recipe.recipeName}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Sub-meta details bar */}
        <div className="flex items-center gap-6 border-y border-slate-200/50 dark:border-slate-700/50 py-4 my-2 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <FiClock className="text-primary w-4.5 h-4.5" />
            <span className="text-sm font-medium">{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiGrid className="text-accent w-4.5 h-4.5" />
            <span className="text-sm font-medium">{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers className="text-success w-4.5 h-4.5" />
            <span className="text-sm font-medium">{recipe.servings} Servings</span>
          </div>
        </div>

        {/* Inline Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onCopy}
            className="flex-1 min-w-[120px] py-3 px-4 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 bg-white/20 dark:bg-slate-800/20 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <FiCopy />
            <span>Copy Text</span>
          </button>
          <button
            onClick={onDownload}
            className="flex-1 min-w-[120px] py-3 px-4 rounded-xl font-semibold bg-gradient-to-tr from-primary to-secondary text-white hover:shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <FiDownload />
            <span>Save JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
