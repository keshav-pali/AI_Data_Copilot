import express from "express";

import {
  getDatasets,
  getDataset,
  removeDataset,
} from "../controllers/datasetController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getDatasets);

router.get("/:id", getDataset);

router.delete("/:id", removeDataset);

export default router;