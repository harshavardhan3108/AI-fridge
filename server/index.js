import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import recipeRoutes from "./routes/recipeRoutes.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// API routes
app.use("/api", recipeRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

// Serve static frontend assets built by Vite
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// Catch-all route to serve React app for SPA routes
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API endpoint not found." });
  }
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({
    error: err.message || "An unexpected system error occurred."
  });
});

app.listen(PORT, () => {
  console.log(`[Server] AI Fridge to Recipe running on port ${PORT}`);
});

