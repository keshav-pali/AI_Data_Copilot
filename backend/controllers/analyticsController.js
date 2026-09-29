import { getDatasetAnalytics } from "../services/analyticsService.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const result = await getDatasetAnalytics(
      req.params.datasetId,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};