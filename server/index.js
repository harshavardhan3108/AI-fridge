import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with permissive config for local Vite dev server
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// API routes
app.use("/api", recipeRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

// Catch-all route for unmatched endpoints
app.use("*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({
    error: err.message || "An unexpected system error occurred."
  });
});

app.listen(PORT, () => {
  console.log(`[Server] AI Fridge to Recipe backend running on port ${PORT}`);
});
