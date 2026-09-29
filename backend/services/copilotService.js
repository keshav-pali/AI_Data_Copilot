import fs from "fs";

import Dataset from "../models/Dataset.js";

import {
  parseFile,
} from "../utils/fileParser.js";

import {
  analyzeDataset,
} from "../utils/dataAnalyzer.js";

import {
  generateCopilotResponse,
} from "./llmService.js";

const buildDatasetContext = (analytics) => {
  const {
    overview,
    columns,
    numericStatistics,
    categoricalStatistics,
    correlations,
  } = analytics;

  const usefulCategoricalStatistics = {};

  for (const [column, data] of Object.entries(
    categoricalStatistics
  )) {
    // Avoid sending high-cardinality ID-like columns
    // to the LLM.
    if (data.uniqueCount <= 20) {
      usefulCategoricalStatistics[column] = data;
    }
  }

  return JSON.stringify(
    {
      overview,

      columns,

      numericStatistics,

      categoricalStatistics:
        usefulCategoricalStatistics,

      correlations,
    },
    null,
    2
  );
};

export const queryCopilot = async ({
  datasetId,
  userId,
  question,
}) => {
  const dataset = await Dataset.findOne({
    _id: datasetId,
    user: userId,
  });

  if (!dataset) {
    const error = new Error(
      "Dataset not found"
    );

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

  const datasetContext = buildDatasetContext(
    analytics
  );

  const answer = await generateCopilotResponse({
    question,
    datasetContext,
  });

  return {
    dataset: {
      id: dataset._id,
      name: dataset.name,
      rowCount: dataset.rowCount,
      columnCount: dataset.columnCount,
    },

    question,

    answer,
  };
};