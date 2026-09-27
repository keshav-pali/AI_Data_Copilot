import {
  getUserDatasets,
  getDatasetById,
  deleteDataset,
} from "../services/datasetService.js";

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
    const dataset = await deleteDataset(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Dataset deleted successfully",
      datasetId: dataset._id,
    });
  } catch (error) {
    next(error);
  }
};