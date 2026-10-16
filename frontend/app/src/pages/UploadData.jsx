import { useEffect, useRef, useState } from "react";
import { uploadDataset, getDatasets } from "../services/datasetService";

function UploadData() {
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true);

  const allowedTypes = [
    "text/csv",
    "application/json",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const allowedExtensions = [
    ".csv",
    ".json",
    ".xlsx",
    ".xls",
  ];

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      setIsLoadingDatasets(true);

      const response = await getDatasets();

      const datasets = response.datasets || [];

      setUploadedFiles(
        datasets.map((dataset) => ({
          id: dataset._id,
          name:
            dataset.originalFileName ||
            dataset.name ||
            "Unnamed Dataset",
          type: getFileType(
            dataset.originalFileName || dataset.name
          ),
          size: formatFileSize(dataset.fileSize || 0),
          rows: formatNumber(dataset.rowCount || 0),
          status:
            dataset.status === "ready"
              ? "Processed"
              : dataset.status === "failed"
              ? "Failed"
              : "Processing",
        }))
      );
    } catch (err) {
      setError(
        err.message || "Failed to load your datasets."
      );
    } finally {
      setIsLoadingDatasets(false);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;

    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    const isValidType =
      allowedTypes.includes(file.type) ||
      allowedExtensions.includes(extension);

    if (!isValidType) {
      setError(
        "Unsupported file format. Please upload CSV, XLSX, XLS or JSON."
      );
      return false;
    }

    const maxSize = 50 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("File size must be less than 50MB.");
      return false;
    }

    setError("");
    setSuccess("");

    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    setUploadProgress(0);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatNumber = (number) => {
    return Number(number || 0).toLocaleString();
  };

  const getFileType = (fileName = "") => {
    const extension = fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toUpperCase();

    return extension || "FILE";
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      setUploadProgress(10);
      setError("");
      setSuccess("");

      // UI progress while request is being processed.
      setUploadProgress(30);

      const response = await uploadDataset(selectedFile);

      setUploadProgress(80);

      const dataset = response.dataset;

      if (!dataset) {
        throw new Error(
          "Upload succeeded but dataset information was not returned."
        );
      }

      const newFile = {
        id: dataset._id,
        name:
          dataset.originalFileName ||
          dataset.name ||
          selectedFile.name,
        type: getFileType(
          dataset.originalFileName ||
          selectedFile.name
        ),
        size: formatFileSize(
          dataset.fileSize || selectedFile.size
        ),
        rows: formatNumber(dataset.rowCount || 0),
        status:
          dataset.status === "ready"
            ? "Processed"
            : "Processing",
      };

      setUploadedFiles((prev) => [
        newFile,
        ...prev.filter((file) => file.id !== newFile.id),
      ]);

      setUploadProgress(100);

      setSuccess(
        `${selectedFile.name} uploaded successfully.`
      );

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh from backend to keep UI synchronized.
      await loadDatasets();

      setTimeout(() => {
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while uploading the dataset."
      );

      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const removeSelectedFile = () => {
    if (isUploading) return;

    setSelectedFile(null);
    setUploadProgress(0);
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="upload-page upload-page-v2">

      {/* ================= HEADER ================= */}

      <div className="page-title upload-page-title">

        <div>
          <span className="page-eyebrow">
            DATA MANAGEMENT
          </span>

          <h2>
            Upload your data
          </h2>

          <p>
            Bring your datasets into AI Data Copilot and
            start discovering insights.
          </p>
        </div>

        <div className="upload-limit">
          <span>
            STORAGE
          </span>

          <strong>
            2.4 GB / 10 GB
          </strong>

          <div className="storage-bar">
            <span style={{ width: "24%" }}></span>
          </div>
        </div>

      </div>


      {/* ================= UPLOAD AREA ================= */}

      {!selectedFile ? (

        <div
          className={`upload-box upload-box-v2 ${
            isDragging ? "dragging" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".csv,.json,.xlsx,.xls"
            onChange={handleInputChange}
          />

          <div className="upload-cloud-icon">
            ↑
          </div>

          <h3>
            Drop your dataset here
          </h3>

          <p>
            Drag and drop your file or browse from your computer
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Browse files
          </button>

          <div className="upload-supported">
            <span>CSV</span>
            <span>XLSX</span>
            <span>XLS</span>
            <span>JSON</span>
          </div>

          <small>
            Maximum file size: 50MB
          </small>

        </div>

      ) : (

        /* ================= SELECTED FILE ================= */

        <div className="selected-file-card">

          <div className="selected-file-main">

            <div className="selected-file-icon">
              ▤
            </div>

            <div className="selected-file-info">

              <strong>
                {selectedFile.name}
              </strong>

              <span>
                {getFileType(selectedFile.name)}
                {" • "}
                {formatFileSize(selectedFile.size)}
              </span>

            </div>

            {!isUploading && (
              <button
                className="remove-file-button"
                onClick={removeSelectedFile}
              >
                ×
              </button>
            )}

          </div>


          {isUploading && (

            <div className="upload-progress-section">

              <div className="upload-progress-info">

                <span>
                  Uploading dataset...
                </span>

                <strong>
                  {uploadProgress}%
                </strong>

              </div>

              <div className="upload-progress-bar">

                <span
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                ></span>

              </div>

            </div>

          )}


          {!isUploading && (

            <div className="selected-file-actions">

              <button
                className="cancel-upload-button"
                onClick={removeSelectedFile}
              >
                Cancel
              </button>

              <button
                className="start-upload-button"
                onClick={handleUpload}
              >
                <span>↑</span>
                Upload dataset
              </button>

            </div>

          )}

        </div>

      )}


      {/* ================= ERROR ================= */}

      {error && (
        <div className="upload-error">
          <span>!</span>
          {error}
        </div>
      )}


      {/* ================= SUCCESS ================= */}

      {success && (
        <div className="upload-success">
          <span>✓</span>
          {success}
        </div>
      )}


      {/* ================= HOW IT WORKS ================= */}

      <div className="upload-how-section">

        <div className="section-heading">

          <div>
            <h3>
              How it works
            </h3>

            <p>
              From raw data to actionable insights
            </p>
          </div>

        </div>


        <div className="upload-steps">

          <div className="upload-step">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              ↑
            </div>

            <h4>
              Upload
            </h4>

            <p>
              Upload your CSV, Excel or JSON dataset.
            </p>

          </div>


          <div className="step-connector"></div>


          <div className="upload-step">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              ◈
            </div>

            <h4>
              Analyze
            </h4>

            <p>
              AI prepares and understands your data.
            </p>

          </div>


          <div className="step-connector"></div>


          <div className="upload-step">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              ✦
            </div>

            <h4>
              Ask
            </h4>

            <p>
              Ask questions and discover insights.
            </p>

          </div>

        </div>

      </div>


      {/* ================= RECENT DATASETS ================= */}

      <div className="uploaded-datasets-section">

        <div className="section-heading">

          <div>
            <h3>
              Your datasets
            </h3>

            <p>
              Recently uploaded datasets
            </p>
          </div>

          <span className="dataset-count">
            {uploadedFiles.length} datasets
          </span>

        </div>


        <div className="uploaded-datasets">

          {isLoadingDatasets ? (

            <div className="dataset-loading">
              Loading datasets...
            </div>

          ) : uploadedFiles.length === 0 ? (

            <div className="dataset-loading">
              No datasets uploaded yet.
            </div>

          ) : (

            uploadedFiles.map((file) => (

              <div
                className="uploaded-file-card"
                key={file.id}
              >

                <div className="uploaded-file-icon">
                  ▤
                </div>

                <div className="uploaded-file-info">

                  <strong>
                    {file.name}
                  </strong>

                  <span>
                    {file.type}
                    {" • "}
                    {file.size}
                  </span>

                </div>

                <div className="uploaded-file-rows">

                  <small>
                    ROWS
                  </small>

                  <span>
                    {file.rows}
                  </span>

                </div>

                <span
                  className={`dataset-status ${
                    file.status === "Processed"
                      ? "processed"
                      : file.status === "Failed"
                      ? "failed"
                      : "processing"
                  }`}
                >
                  ● {file.status}
                </span>

                <button className="dataset-more">
                  ⋮
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default UploadData;