/**
 * Sanitizes and validates the AI recipe response to guarantee frontend safety.
 */
export function validateRecipe(rawResponse) {
  if (!rawResponse || typeof rawResponse !== "string") {
    throw new Error("Empty or non-string response received from AI model.");
  }

  // 1. Clean markdown JSON blocks if present
  let cleaned = rawResponse.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
  }

  // 2. Attempt parsing JSON
  let data;
  try {
    data = JSON.parse(cleaned);
  } catch (error) {
    throw new Error(`Failed to parse AI response as JSON: ${error.message}`);
  }

  // 3. Define the strict verification and default-filling rules
  const validated = {};

  // recipeName
  if (!data.recipeName || typeof data.recipeName !== "string") {
    validated.recipeName = "AI Chef's Creation";
  } else {
    validated.recipeName = data.recipeName.trim();
  }

  // description
  if (!data.description || typeof data.description !== "string") {
    validated.description = "A customized gourmet recipe handcrafted by your AI Chef assistant.";
  } else {
    validated.description = data.description.trim();
  }

  // cookTime
  if (!data.cookTime || typeof data.cookTime !== "string") {
    validated.cookTime = "25 mins";
  } else {
    validated.cookTime = data.cookTime.trim();
  }

  // difficulty
  const allowedDifficulties = ["Easy", "Medium", "Hard"];
  if (!data.difficulty || typeof data.difficulty !== "string") {
    validated.difficulty = "Medium";
  } else {
    const formattedDiff = data.difficulty.trim();
    const match = allowedDifficulties.find(
      (d) => d.toLowerCase() === formattedDiff.toLowerCase()
    );
    validated.difficulty = match || "Medium";
  }

  // servings
  const rawServings = parseInt(data.servings, 10);
  validated.servings = isNaN(rawServings) || rawServings <= 0 ? 2 : rawServings;

  // ingredients
  validated.ingredients = [];
  if (Array.isArray(data.ingredients)) {
    const seenIngredients = new Set();
    for (const item of data.ingredients) {
      if (item && typeof item === "object") {
        const name = (item.name || "").toString().trim();
        const quantity = (item.quantity || "").toString().trim();

        if (name) {
          const lowerName = name.toLowerCase();
          if (!seenIngredients.has(lowerName)) {
            seenIngredients.add(lowerName);
            validated.ingredients.push({
              name,
              quantity: quantity || "to taste"
            });
          }
        }
      }
    }
  }

  if (validated.ingredients.length === 0) {
    throw new Error("AI returned a recipe with no valid ingredients.");
  }

  // steps
  validated.steps = [];
  if (Array.isArray(data.steps)) {
    const seenSteps = new Set();
    for (const step of data.steps) {
      if (step && typeof step === "string") {
        const cleanedStep = step.trim();
        if (cleanedStep && !seenSteps.has(cleanedStep)) {
          seenSteps.add(cleanedStep);
          validated.steps.push(cleanedStep);
        }
      }
    }
  }

  if (validated.steps.length === 0) {
    throw new Error("AI returned a recipe with no cooking steps.");
  }

  // swaps
  validated.swaps = [];
  if (Array.isArray(data.swaps)) {
    for (const swap of data.swaps) {
      if (swap && typeof swap === "string") {
        const cleanedSwap = swap.trim();
        if (cleanedSwap) {
          validated.swaps.push(cleanedSwap);
        }
      }
    }
  }

  // nutrition
  const defaultNutrition = {
    calories: "450 kcal",
    protein: "15g",
    fat: "12g",
    carbs: "50g"
  };

  validated.nutrition = {};
  const rawNutr = data.nutrition || {};

  validated.nutrition.calories = (rawNutr.calories || defaultNutrition.calories).toString().trim();
  validated.nutrition.protein = (rawNutr.protein || defaultNutrition.protein).toString().trim();
  validated.nutrition.fat = (rawNutr.fat || defaultNutrition.fat).toString().trim();
  validated.nutrition.carbs = (rawNutr.carbs || defaultNutrition.carbs).toString().trim();

  // Validate response size to prevent overflow or underflow
  const stringified = JSON.stringify(validated);
  if (stringified.length < 50) {
    throw new Error("Recipe response size is too small, likely corrupted.");
  }
  if (stringified.length > 50000) {
    throw new Error("Recipe response size exceeded safety limits.");
  }

  return validated;
}
