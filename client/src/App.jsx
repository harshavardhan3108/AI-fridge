import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Components
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import IngredientInput from "./components/IngredientInput";
import AiDashboard from "./components/AiDashboard";
import RecipeCard from "./components/RecipeCard";
import IngredientChecklist from "./components/IngredientChecklist";
import CookingSteps from "./components/CookingSteps";
import NutritionPanel from "./components/NutritionPanel";
import SwapsPanel from "./components/SwapsPanel";
import QuickActions from "./components/QuickActions";
import RecipeHistory from "./components/RecipeHistory";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ErrorCard from "./components/ErrorCard";
import EmptyState from "./components/EmptyState";

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // State management
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [viewMode, setViewMode] = useState("input"); // "input" | "workspace"
  const [activeTab, setActiveTab] = useState("recipe"); // "recipe" | "ingredients" | "cooking" | "nutrition" | "history" | "favorites"
  const [searchText, setSearchText] = useState("");
  
  // Cache systems
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const abortControllerRef = useRef(null);

  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Request Execution with AbortController
  const handleGenerate = async () => {
    if (!ingredients.trim()) return;

    // Abort previous running request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-recipe",
        { ingredients },
        { signal: controller.signal }
      );

      const data = response.data;
      const formattedRecipe = {
        ...data,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setRecipe(formattedRecipe);
      setHistory((prev) => [formattedRecipe, ...prev]);
      setViewMode("workspace");
      setActiveTab("recipe");
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("AI request canceled:", err.message);
        return;
      }
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to connect to AI Chef. Please check server."
      );
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  // Quick Action Handlers
  const handleToggleFavorite = () => {
    if (!recipe) return;
    const isFav = favorites.some((fav) => fav.id === recipe.id);
    if (isFav) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  const handleCopyRecipe = () => {
    if (!recipe) return;
    
    // Format recipe text beautifully for clipboard
    const text = `
🍳 RECIPE: ${recipe.recipeName}
${recipe.description}

Difficulty: ${recipe.difficulty} | Cook Time: ${recipe.cookTime} | Servings: ${recipe.servings}

INGREDIENTS:
${recipe.ingredients.map((i) => `- ${i.name} (${i.quantity})`).join("\n")}

STEPS:
${recipe.steps.map((s, idx) => `${idx + 1}. ${s}`).join("\n")}

NUTRITION (per serving):
- Calories: ${recipe.nutrition.calories}
- Protein: ${recipe.nutrition.protein}
- Fat: ${recipe.nutrition.fat}
- Carbs: ${recipe.nutrition.carbs}

SWAPS:
${recipe.swaps.map((sw) => `- ${sw}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(text);
    alert("Recipe copied to clipboard!");
  };

  const handlePrintRecipe = () => {
    if (!recipe) return;

    // Create a temporary hidden iframe to isolate the print layout
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;

    // Compile a beautiful, high-contrast, paper-optimized print template
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${recipe.recipeName} - Recipe Export</title>
          <style>
            body {
              font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #1e293b;
              padding: 30px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #4F7DFF;
              padding-bottom: 18px;
              margin-bottom: 25px;
            }
            .title {
              font-size: 28px;
              font-weight: 800;
              margin: 0;
              color: #0f172a;
            }
            .description {
              font-size: 15px;
              color: #64748b;
              margin-top: 8px;
              font-style: italic;
            }
            .meta {
              display: flex;
              justify-content: center;
              gap: 30px;
              margin-top: 15px;
              font-size: 13px;
              font-weight: bold;
              text-transform: uppercase;
              color: #4F7DFF;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 18px;
              font-weight: 700;
              border-bottom: 1px solid #cbd5e1;
              padding-bottom: 6px;
              margin-bottom: 12px;
              color: #0f172a;
            }
            .ingredients-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
              list-style-type: none;
              padding: 0;
              margin: 0;
            }
            .ingredient-card {
              padding: 8px 12px;
              background-color: #f8fafc;
              border-radius: 6px;
              border: 1px solid #e2e8f0;
              display: flex;
              justify-content: space-between;
              font-size: 13.5px;
            }
            .ingredient-name {
              font-weight: 600;
            }
            .ingredient-qty {
              color: #4f7dff;
              font-weight: 700;
            }
            .steps-list {
              padding-left: 20px;
              margin: 0;
            }
            .step-item {
              margin-bottom: 12px;
              font-size: 14px;
            }
            .nutrition-grid {
              display: flex;
              gap: 15px;
              margin: 0;
            }
            .nutrition-card {
              flex: 1;
              background-color: #f1f5f9;
              padding: 10px;
              border-radius: 8px;
              text-align: center;
              border: 1px solid #e2e8f0;
            }
            .nutrition-val {
              font-size: 15px;
              font-weight: bold;
              color: #0f172a;
            }
            .nutrition-lbl {
              font-size: 10px;
              text-transform: uppercase;
              color: #64748b;
              margin-top: 3px;
              font-weight: bold;
              letter-spacing: 0.5px;
            }
            .swaps-list {
              padding-left: 20px;
              margin: 0;
              font-size: 14px;
            }
            .swap-item {
              margin-bottom: 8px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 11px;
              color: #94a3b8;
              border-top: 1px dashed #cbd5e1;
              padding-top: 15px;
            }
            @media print {
              body {
                padding: 0;
              }
              .ingredient-card {
                background-color: transparent;
                border: none;
                border-bottom: 1px solid #f1f5f9;
                border-radius: 0;
                padding: 6px 0;
              }
              .nutrition-card {
                background-color: transparent;
                border: 1px solid #cbd5e1;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">${recipe.recipeName}</h1>
            <p class="description">${recipe.description}</p>
            <div class="meta">
              <span>⏱️ Cook Time: ${recipe.cookTime}</span>
              <span>🔥 Difficulty: ${recipe.difficulty}</span>
              <span>👥 Servings: ${recipe.servings}</span>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Ingredients List</h2>
            <ul class="ingredients-grid">
              ${recipe.ingredients.map(ing => `
                <li class="ingredient-card">
                  <span class="ingredient-name">${ing.name}</span>
                  <span class="ingredient-qty">${ing.quantity}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">Cooking Process & Steps</h2>
            <ol class="steps-list">
              ${recipe.steps.map(step => `
                <li class="step-item">${step}</li>
              `).join('')}
            </ol>
          </div>

          <div class="section">
            <h2 class="section-title">Nutrition Breakdown (Per Serving)</h2>
            <div class="nutrition-grid">
              <div class="nutrition-card">
                <div class="nutrition-val">${recipe.nutrition.calories}</div>
                <div class="nutrition-lbl">Calories</div>
              </div>
              <div class="nutrition-card">
                <div class="nutrition-val">${recipe.nutrition.protein}</div>
                <div class="nutrition-lbl">Protein</div>
              </div>
              <div class="nutrition-card">
                <div class="nutrition-val">${recipe.nutrition.fat}</div>
                <div class="nutrition-lbl">Fat</div>
              </div>
              <div class="nutrition-card">
                <div class="nutrition-val">${recipe.nutrition.carbs}</div>
                <div class="nutrition-lbl">Carbs</div>
              </div>
            </div>
          </div>

          ${recipe.swaps && recipe.swaps.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Chef's Ingredient Swaps & Sub-Tips</h2>
              <ul class="swaps-list">
                ${recipe.swaps.map(swap => `
                  <li class="swap-item">${swap}</li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="footer">
            Generated with AI Fridge to Recipe Assistant. Compiled on ${new Date().toLocaleDateString()}.
          </div>
        </body>
      </html>
    `);

    doc.close();

    // Trigger printing once content is written
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Remove the temporary iframe from the DOM
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1500);
  };

  const handleDownloadJson = () => {
    if (!recipe) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(recipe, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `${recipe.recipeName.toLowerCase().replace(/\s+/g, "_")}_recipe.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSelectRecipe = (selected) => {
    setRecipe(selected);
    setViewMode("workspace");
    setActiveTab("recipe");
  };

  const handleDeleteRecipe = (id) => {
    // Remove from history
    const updatedHistory = history.filter((r) => r.id !== id);
    setHistory(updatedHistory);

    // Remove from favorites
    setFavorites((prev) => prev.filter((r) => r.id !== id));

    // Handle case where we delete the currently active recipe
    if (recipe && recipe.id === id) {
      if (updatedHistory.length > 0) {
        setRecipe(updatedHistory[0]);
      } else {
        setRecipe(null);
        setViewMode("input");
      }
    }
  };

  // Filters for History / Favorites list
  const filteredHistory = history.filter((r) =>
    r.recipeName.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const filteredFavorites = favorites.filter((r) =>
    r.recipeName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-animated-gradient min-h-screen relative p-4 md:p-6 lg:p-8 flex flex-col gap-6 z-10 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="bg-orb w-[400px] h-[400px] bg-primary/20 top-[-100px] left-[-100px]" />
      <div className="bg-orb w-[400px] h-[400px] bg-accent/20 bottom-[-100px] right-[-100px]" />

      <div className="w-full flex flex-col gap-6 relative z-10">
        {/* Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {/* Loading Phase */}
        {loading && (
          <div className="w-full mt-4">
            <LoadingSkeleton />
          </div>
        )}

        {/* Error Phase */}
        {error && !loading && (
          <div className="w-full mt-4">
            <ErrorCard
              error={error}
              onRetry={handleGenerate}
              onEdit={() => {
                setError(null);
                setViewMode("input");
              }}
            />
          </div>
        )}

        {/* Pre-generation Mode (Standard Input & Status Dashboard) */}
        {!loading && !error && viewMode === "input" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-2">
            {/* Input card */}
            <IngredientInput
              ingredients={ingredients}
              setIngredients={setIngredients}
              onGenerate={handleGenerate}
              loading={loading}
            />

            {/* Dashboard card */}
            <AiDashboard recipe={recipe} loading={loading} />
          </div>
        )}

        {/* Workspace Mode (Post-generation view) */}
        {!loading && !error && viewMode === "workspace" && recipe && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 items-start mt-2">
            {/* Left Nav Column */}
            <div className="md:col-span-1 lg:col-span-1 flex justify-center">
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Center Main Stage Content */}
            <div className="md:col-span-3 lg:col-span-8 flex flex-col gap-6">
              {activeTab === "recipe" && (
                <RecipeCard
                  recipe={recipe}
                  isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onCopy={handleCopyRecipe}
                  onDownload={handleDownloadJson}
                />
              )}

              {activeTab === "ingredients" && (
                <IngredientChecklist ingredients={recipe.ingredients} />
              )}

              {activeTab === "cooking" && (
                <CookingSteps steps={recipe.steps} />
              )}

              {activeTab === "nutrition" && (
                <div className="flex flex-col gap-6 w-full">
                  <NutritionPanel nutrition={recipe.nutrition} />
                  <SwapsPanel swaps={recipe.swaps} />
                </div>
              )}

              {activeTab === "history" && (
                <RecipeHistory
                  history={filteredHistory}
                  onSelectRecipe={handleSelectRecipe}
                  activeRecipeId={recipe.id}
                  onDeleteRecipe={handleDeleteRecipe}
                />
              )}

              {activeTab === "favorites" && (
                <RecipeHistory
                  history={filteredFavorites}
                  onSelectRecipe={handleSelectRecipe}
                  activeRecipeId={recipe.id}
                  onDeleteRecipe={handleDeleteRecipe}
                />
              )}
            </div>

            {/* Right Action Sidebar Panel */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
              <QuickActions
                isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                onToggleFavorite={handleToggleFavorite}
                onCopy={handleCopyRecipe}
                onPrint={handlePrintRecipe}
                onDownload={handleDownloadJson}
                onRegenerate={handleGenerate}
                onEditIngredients={() => setViewMode("input")}
              />
              <RecipeHistory
                history={filteredHistory.slice(0, 3)}
                onSelectRecipe={handleSelectRecipe}
                activeRecipeId={recipe.id}
                onDeleteRecipe={handleDeleteRecipe}
              />
            </div>
          </div>
        )}

        {/* Empty state fallback inside input mode if no input is typed and user clears text */}
        {viewMode === "input" && !ingredients && !loading && !error && !recipe && (
          <div className="w-full mt-4">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}
