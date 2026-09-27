import Dataset from "../models/Dataset.js";

export const getUserDatasets = async (userId) => {
  const datasets = await Dataset.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return datasets;
};

export const getDatasetById = async (datasetId, userId) => {
  const dataset = await Dataset.findOne({
    _id: datasetId,
    user: userId,
  });

  if (!dataset) {
    const error = new Error("Dataset not found");
    error.statusCode = 404;
    throw error;
  }

  return dataset;
};

export const deleteDataset = async (datasetId, userId) => {
  const dataset = await Dataset.findOneAndDelete({
    _id: datasetId,
    user: userId,
  });

  if (!dataset) {
    const error = new Error("Dataset not found");
    error.statusCode = 404;
    throw error;
  }

  return dataset;
};