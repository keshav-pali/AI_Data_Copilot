import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:datasetId", getAnalytics);

export default router;