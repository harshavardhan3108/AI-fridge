import express from "express";
import { getRecipe } from "../controllers/recipeController.js";

const router = express.Router();

// Define POST endpoint for generating recipes
router.post("/generate-recipe", getRecipe);

export default router;
