import {
  getUserDatasets,
  getDatasetById,
  deleteDataset,
  createDataset,
} from "../services/datasetService.js";

import { parseFile } from "../utils/fileParser.js";
import { analyzeData } from "../utils/dataAnalyzer.js";

export const uploadDataset = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please upload a file");
      error.statusCode = 400;
      throw error;
    }

    const rows = parseFile(
      req.file.path,
      req.file.originalname
    );

    const analysis = analyzeData(rows);

    const dataset = await createDataset({
      userId: req.user.userId,
      name: req.file.originalname,
      originalFileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
      rowCount: analysis.rowCount,
      columnCount: analysis.columnCount,
      columns: analysis.columns,
    });

    res.status(201).json({
      success: true,
      message: "Dataset uploaded successfully",
      dataset,
    });
  } catch (error) {
    next(error);
  }
};

export const getDatasets = async (req, res, next) => {
  try {
    const datasets = await getUserDatasets(req.user.userId);

    res.status(200).json({
      success: true,
      count: datasets.length,
      datasets,
    });
  } catch (error) {
    next(error);
  }
};

export const getDataset = async (req, res, next) => {
  try {
    const dataset = await getDatasetById(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      dataset,
    });
  } catch (error) {
    next(error);
  }
};

export const removeDataset = async (req, res, next) => {
  try {
    await deleteDataset(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Dataset deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};