
import fs from "node:fs";
import path from "node:path";

import Dataset from "../models/Dataset.js";

export const queryCopilot = async ({
  datasetId,
  userId,
  question,
}) => {
  // 1. Verify that the dataset belongs to the authenticated user.
  const dataset = await Dataset.findOne({
    _id: datasetId,
    user: userId,
  });

  if (!dataset) {
    const error = new Error("Dataset not found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Ensure that the dataset is ready.
  if (dataset.status !== "ready") {
    const error = new Error(
      "Dataset is not ready for analysis"
    );
    error.statusCode = 400;
    throw error;
  }

  // 3. Resolve the stored path from the backend directory.
  const csvPath = path.resolve(dataset.filePath || "");

  if (
    !dataset.filePath ||
    !fs.existsSync(csvPath)
  ) {
    const error = new Error(
      "Dataset file is not available"
    );
    error.statusCode = 404;
    throw error;
  }

  // 4. The current Python agent supports CSV only.
  if (
    path.extname(dataset.originalFileName || csvPath)
      .toLowerCase() !== ".csv"
  ) {
    const error = new Error(
      "The AI SQL agent currently supports CSV datasets only"
    );
    error.statusCode = 400;
    throw error;
  }

  // 5. Call the Python LangGraph service.
  const agentUrl =
    process.env.PYTHON_AGENT_URL ||
    "http://127.0.0.1:8001";

  let response;

  try {
    response = await fetch(`${agentUrl}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        csv_path: csvPath,
      }),
    });
  } catch (cause) {
    const error = new Error(
      "Python AI agent is unavailable. Ensure the agent service is running."
    );
    error.statusCode = 502;
    error.cause = cause;
    throw error;
  }

  let agentResult;

  try {
    agentResult = await response.json();
  } catch {
    const error = new Error(
      "Python AI agent returned an invalid response"
    );
    error.statusCode = 502;
    throw error;
  }

  if (!response.ok || !agentResult.success) {
    const error = new Error(
      agentResult.detail ||
      "Python AI agent failed to process the question"
    );
    error.statusCode = 502;
    throw error;
  }

  // 6. Return the result in the existing Copilot response format.
  return {
    dataset: {
      id: dataset._id,
      name: dataset.name,
      rowCount: dataset.rowCount,
      columnCount: dataset.columnCount,
    },
    question,
    answer: agentResult.answer,
    sqlQuery: agentResult.sqlQuery,
    queryResult: agentResult.queryResult,
  };
};
