import { generateRecipeFromIngredients } from "../services/geminiService.js";
import { validateRecipe } from "../utils/recipeValidator.js";

/**
 * Endpoint controller for recipe generation.
 */
export async function getRecipe(req, res) {
  try {
    const { ingredients } = req.body;

    if (!ingredients || typeof ingredients !== "string" || !ingredients.trim()) {
      return res.status(400).json({
        error: "Invalid request. Please provide an 'ingredients' string."
      });
    }

    // Call the Gemini service
    const rawAiResponse = await generateRecipeFromIngredients(ingredients);

    // Validate, sanitize and parse JSON response
    const recipeData = validateRecipe(rawAiResponse);

    return res.status(200).json(recipeData);
  } catch (error) {
    console.error("Recipe Controller Error:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred while generating your recipe."
    });
  }
}
