import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import datasetRoutes from "./routes/datasetRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import copilotRoutes from "./routes/copilotRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// ===============================
// Global Middleware
// ===============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Root Route
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to AI Data Copilot API",
  });
});

// ===============================
// Health Check
// ===============================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Data Copilot backend is running",
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// API Routes
// ===============================

// Authentication
app.use("/api/auth", authRoutes);

app.use("/api/datasets", datasetRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/copilot", copilotRoutes);

// ===============================
// 404 Route
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// Global Error Handler
// ===============================

app.use(errorMiddleware);

// ===============================
// Start Application
// ===============================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `🚀 AI Data Copilot server running on port ${PORT}`
      );

      console.log(`🌐 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);

    process.exit(1);
  }
};



startServer();