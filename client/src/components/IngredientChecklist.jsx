import React, { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function IngredientChecklist({ ingredients }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-8 flex flex-col gap-5 w-full transition-all duration-300">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
          Ingredient Checklist
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Check off items as you gather them from your kitchen.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {ingredients.map((ing, index) => {
          const isChecked = !!checkedItems[index];

          return (
            <label
              key={index}
              onClick={() => toggleCheck(index)}
              className={`flex items-center justify-between p-3.5 px-5 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
                isChecked
                  ? "bg-success/5 border-success/30 opacity-70 text-slate-400 dark:text-slate-500 line-through"
                  : "bg-white/20 dark:bg-slate-800/20 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Custom Checkbox */}
                <div
                  className={`w-5.5 h-5.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isChecked
                      ? "bg-success border-success text-white animate-cb scale-110"
                      : "border-slate-300 dark:border-slate-600 bg-transparent"
                  }`}
                >
                  {isChecked && <FiCheckCircle className="w-4 h-4" />}
                </div>
                <span className="font-medium text-sm md:text-base">{ing.name}</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                isChecked 
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-400" 
                  : "bg-primary/10 text-primary dark:text-secondary"
              }`}>
                {ing.quantity}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
