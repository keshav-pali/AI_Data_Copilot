import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    originalFileName: {
      type: String,
      trim: true,
      default: null,
    },

    fileType: {
      type: String,
      trim: true,
      default: null,
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    filePath: {
      type: String,
      default: null,
    },

    rowCount: {
      type: Number,
      default: 0,
    },

    columnCount: {
      type: Number,
      default: 0,
    },

    columns: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["processing", "ready", "failed"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

const Dataset = mongoose.model("Dataset", datasetSchema);

export default Dataset;