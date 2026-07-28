import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. Please add it to your server/.env file.");
}

const genAI = new GoogleGenerativeAI(apiKey || "dummy-key");

// We default to gemini-flash-latest which is fast, lightweight, and suitable for JSON generation.
export const getGeminiModel = (modelName = "gemini-flash-latest") => {
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json"
    }
  });
};
