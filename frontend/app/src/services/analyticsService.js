import apiRequest from "./api";

export const getDatasetAnalytics = async (datasetId) => {
  if (!datasetId) {
    throw new Error("Dataset ID is required");
  }

  return apiRequest(`/analytics/${datasetId}`, {
    method: "GET",
  });
};