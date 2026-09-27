import { useRef, useState } from "react";

function UploadData() {
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Sales_Data.csv",
      type: "CSV",
      size: "2.4 MB",
      rows: "12,450",
      status: "Processed",
    },
    {
      id: 2,
      name: "Customer_Data.xlsx",
      type: "XLSX",
      size: "1.8 MB",
      rows: "8,921",
      status: "Processed",
    },
  ]);

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
    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    setUploadProgress(0);
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
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileType = (fileName) => {
    return fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toUpperCase();
  };

  const simulateUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          const newFile = {
            id: Date.now(),
            name: selectedFile.name,
            type: getFileType(selectedFile.name),
            size: formatFileSize(selectedFile.size),
            rows: "Analyzing...",
            status: "Processing",
          };

          setUploadedFiles((prev) => [
            newFile,
            ...prev,
          ]);

          setIsUploading(false);
          setSelectedFile(null);
          setUploadProgress(0);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }, 400);
      }
    }, 120);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setError("");

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

            <span>
              CSV
            </span>

            <span>
              XLSX
            </span>

            <span>
              XLS
            </span>

            <span>
              JSON
            </span>

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
                onClick={simulateUpload}
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

          {uploadedFiles.map((file) => (

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
                    : "processing"
                }`}
              >
                ● {file.status}
              </span>

              <button className="dataset-more">
                ⋮
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default UploadData;