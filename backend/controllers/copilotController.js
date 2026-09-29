import {
  queryCopilot,
} from "../services/copilotService.js";

export const askCopilot = async (
  req,
  res,
  next
) => {
  try {
    const {
      datasetId,
      question,
    } = req.body;

    if (!datasetId) {
      const error = new Error(
        "datasetId is required"
      );

      error.statusCode = 400;
      throw error;
    }

    if (!question || !question.trim()) {
      const error = new Error(
        "question is required"
      );

      error.statusCode = 400;
      throw error;
    }

    if (question.trim().length > 2000) {
      const error = new Error(
        "Question cannot exceed 2000 characters"
      );

      error.statusCode = 400;
      throw error;
    }

    const result = await queryCopilot({
      datasetId,
      userId: req.user.userId,
      question: question.trim(),
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};