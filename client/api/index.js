import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "../../server/routes/recipeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", recipeRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

export default app;
