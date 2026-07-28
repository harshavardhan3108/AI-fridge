import { getGeminiModel } from "../config/gemini.js";

/**
 * Invokes the Google Gemini model to generate a custom recipe.
 * Expects a string containing ingredients.
 */
export async function generateRecipeFromIngredients(ingredients) {
  if (!ingredients || typeof ingredients !== "string" || !ingredients.trim()) {
    throw new Error("Ingredients parameter is required and must be a non-empty string.");
  }

  const model = getGeminiModel();

  const prompt = `You are a professional chef.
Return ONLY valid JSON.
No markdown.
No explanation.
Return EXACTLY in this JSON format:
{
 "recipeName": "Provide a descriptive, creative name of the dish",
 "description": "Provide a 1-2 sentence appetizing description of the dish",
 "cookTime": "e.g., 25 mins",
 "difficulty": "e.g., Easy, Medium, or Hard",
 "servings": 2,
 "ingredients": [
   {
     "name": "ingredient name",
     "quantity": "amount/volume/units"
   }
 ],
 "steps": [
   "step description 1",
   "step description 2"
 ],
 "swaps": [
   "e.g., No Cheese? Try Paneer",
   "e.g., No Butter? Try Olive Oil"
 ],
 "nutrition": {
      "calories": "e.g., 450 kcal",
      "protein": "e.g., 15g",
      "fat": "e.g., 12g",
      "carbs": "e.g., 50g"
 }
}

Given ingredients list: ${ingredients.trim()}`;

  const response = await model.generateContent(prompt);
  return response.response.text();
}
