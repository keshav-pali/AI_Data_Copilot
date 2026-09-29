import fs from "fs";

import Dataset from "../models/Dataset.js";
import { parseFile } from "../utils/fileParser.js";
import { analyzeDataset } from "../utils/dataAnalyzer.js";

export const getDatasetAnalytics = async (
  datasetId,
  userId
) => {
  const dataset = await Dataset.findOne({
    _id: datasetId,
    user: userId,
  });

  if (!dataset) {
    const error = new Error("Dataset not found");
    error.statusCode = 404;
    throw error;
  }

  if (dataset.status !== "ready") {
    const error = new Error(
      "Dataset is not ready for analysis"
    );

    error.statusCode = 400;
    throw error;
  }

  if (
    !dataset.filePath ||
    !fs.existsSync(dataset.filePath)
  ) {
    const error = new Error(
      "Dataset file is not available"
    );

    error.statusCode = 404;
    throw error;
  }

  const rows = parseFile(
    dataset.filePath,
    dataset.originalFileName
  );

  const analytics = analyzeDataset(rows);

  return {
    dataset: {
      id: dataset._id,
      name: dataset.name,
      originalFileName: dataset.originalFileName,
      rowCount: dataset.rowCount,
      columnCount: dataset.columnCount,
      status: dataset.status,
      createdAt: dataset.createdAt,
    },

    analytics,
  };
};