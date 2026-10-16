import apiRequest from "./api";

export const uploadDataset = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return apiRequest("/datasets/upload", {
    method: "POST",
    body: formData,
  });
};

export const getDatasets = async () => {
  return apiRequest("/datasets", {
    method: "GET",
  });
};

export const getDataset = async (datasetId) => {
  return apiRequest(`/datasets/${datasetId}`, {
    method: "GET",
  });
};

export const deleteDataset = async (datasetId) => {
  return apiRequest(`/datasets/${datasetId}`, {
    method: "DELETE",
  });
};