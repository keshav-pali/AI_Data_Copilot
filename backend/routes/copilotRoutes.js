import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  askCopilot,
} from "../controllers/copilotController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/query", askCopilot);

export default router;