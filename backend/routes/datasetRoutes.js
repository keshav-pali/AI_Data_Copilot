import express from "express";

import {
  uploadDataset,
  getDatasets,
  getDataset,
  removeDataset,
} from "../controllers/datasetController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/upload", upload.single("file"), uploadDataset);

router.get("/", getDatasets);

router.get("/:id", getDataset);

router.delete("/:id", removeDataset);

export default router;