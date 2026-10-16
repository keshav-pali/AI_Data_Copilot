import { useEffect, useMemo, useState } from "react";

import { getDatasets } from "../services/datasetService";
import { getDatasetAnalytics } from "../services/analyticsService";

function Analytics() {
  const [timeRange, setTimeRange] = useState("Last 30 days");

  const [datasets, setDatasets] = useState([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState("");

  const [analytics, setAnalytics] = useState(null);

  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  const [error, setError] = useState("");

  // ============================================================
  // LOAD DATASETS
  // ============================================================

  useEffect(() => {
    const loadDatasets = async () => {
      try {
        setIsLoadingDatasets(true);
        setError("");

        const response = await getDatasets();

        const datasetList = response.datasets || [];

        setDatasets(datasetList);

        if (datasetList.length > 0) {
          setSelectedDatasetId(datasetList[0]._id);
        }
      } catch (err) {
        setError(
          err.message || "Failed to load datasets"
        );
      } finally {
        setIsLoadingDatasets(false);
      }
    };

    loadDatasets();
  }, []);

  // ============================================================
  // LOAD ANALYTICS
  // ============================================================

  useEffect(() => {
    if (!selectedDatasetId) {
      setAnalytics(null);
      return;
    }

    const loadAnalytics = async () => {
      try {
        setIsLoadingAnalytics(true);
        setError("");

        const response = await getDatasetAnalytics(
          selectedDatasetId
        );

        /*
         * Backend analytics response is expected to contain:
         *
         * {
         *   success: true,
         *   analysis: {
         *      overview,
         *      columns,
         *      numericStatistics,
         *      categoricalStatistics,
         *      correlations
         *   }
         * }
         *
         * We also support a direct analytics/data object
         * so the frontend remains flexible.
         */

        const analysis =
          response.analysis ||
          response.analytics ||
          response.data ||
          response;

        setAnalytics(analysis);
      } catch (err) {
        setAnalytics(null);

        setError(
          err.message || "Failed to load analytics"
        );
      } finally {
        setIsLoadingAnalytics(false);
      }
    };

    loadAnalytics();
  }, [selectedDatasetId]);

  // ============================================================
  // SELECTED DATASET
  // ============================================================

  const selectedDataset = useMemo(() => {
    return datasets.find(
      (dataset) => dataset._id === selectedDatasetId
    );
  }, [datasets, selectedDatasetId]);

  // ============================================================
  // ANALYTICS HELPERS
  // ============================================================

  const overview = analytics?.overview || {};

  const numericStatistics =
    analytics?.numericStatistics || {};

  const categoricalStatistics =
    analytics?.categoricalStatistics || {};

  const correlations =
    analytics?.correlations || {};

  const numericEntries = useMemo(() => {
    if (!numericStatistics) return [];

    if (Array.isArray(numericStatistics)) {
      return numericStatistics;
    }

    return Object.entries(numericStatistics).map(
      ([name, value]) => ({
        name,
        ...(value || {}),
      })
    );
  }, [numericStatistics]);

  const categoricalEntries = useMemo(() => {
    if (!categoricalStatistics) return [];

    if (Array.isArray(categoricalStatistics)) {
      return categoricalStatistics;
    }

    return Object.entries(categoricalStatistics).map(
      ([name, value]) => ({
        name,
        ...(value || {}),
      })
    );
  }, [categoricalStatistics]);

  // ============================================================
  // KPI DATA
  // ============================================================

  const totalRows =
    overview.rowCount ??
    selectedDataset?.rowCount ??
    0;

  const totalColumns =
    overview.columnCount ??
    selectedDataset?.columnCount ??
    0;

  const numericColumnCount =
    overview.numericColumnCount ??
    numericEntries.length;

  const categoricalColumnCount =
    overview.categoricalColumnCount ??
    categoricalEntries.length;

  const missingValues =
    overview.missingValueCount ??
    overview.missingValues ??
    0;

  const metrics = [
    {
      title: "Total Rows",
      value: formatNumber(totalRows),
      change: "Dataset",
      icon: "▤",
    },
    {
      title: "Total Columns",
      value: formatNumber(totalColumns),
      change: "Columns",
      icon: "▥",
    },
    {
      title: "Numeric Columns",
      value: formatNumber(numericColumnCount),
      change: "Numeric",
      icon: "#",
    },
    {
      title: "Missing Values",
      value: formatNumber(missingValues),
      change: "Data quality",
      icon: "!",
    },
  ];

  // ============================================================
  // NUMERIC COLUMN
  // ============================================================

  const primaryNumericColumn =
    numericEntries.length > 0
      ? numericEntries[0]
      : null;

  const primaryNumericName =
    primaryNumericColumn?.name ||
    primaryNumericColumn?.column ||
    primaryNumericColumn?.field ||
    "Numeric column";

  const numericChart = primaryNumericColumn
    ? [
        {
          label: "Min",
          value: Number(
            primaryNumericColumn.min ?? 0
          ),
        },
        {
          label: "Mean",
          value: Number(
            primaryNumericColumn.mean ?? 0
          ),
        },
        {
          label: "Median",
          value: Number(
            primaryNumericColumn.median ?? 0
          ),
        },
        {
          label: "Max",
          value: Number(
            primaryNumericColumn.max ?? 0
          ),
        },
      ]
    : [];

  const maxChartValue = Math.max(
    ...numericChart.map((item) => item.value),
    1
  );

  // ============================================================
  // CATEGORICAL DATA
  // ============================================================

  const primaryCategoricalColumn =
    categoricalEntries.length > 0
      ? categoricalEntries[0]
      : null;

  const primaryCategoricalName =
    primaryCategoricalColumn?.name ||
    primaryCategoricalColumn?.column ||
    primaryCategoricalColumn?.field ||
    "Categorical column";

  const categoryItems = normalizeCategories(
    primaryCategoricalColumn
  );

  // ============================================================
  // CORRELATIONS
  // ============================================================

  const correlationItems = normalizeCorrelations(
    correlations
  );

  // ============================================================
  // AI-STYLE INSIGHT
  // ============================================================

  const insight = generateInsight({
    selectedDataset,
    totalRows,
    totalColumns,
    numericColumnCount,
    categoricalColumnCount,
    missingValues,
    primaryNumericColumn,
    primaryCategoricalColumn,
    categoryItems,
    correlationItems,
  });

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="analytics-page analytics-page-v2">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="analytics-header">

        <div className="page-title">

          <span className="page-eyebrow">
            DATA INSIGHTS
          </span>

          <h2>
            Analytics
          </h2>

          <p>
            Understand your data through interactive insights
            and visualizations.
          </p>

        </div>

        <div className="analytics-actions">

          <button
            className="export-button"
            type="button"
            disabled={!analytics}
          >
            ↓ Export
          </button>

          <select
            value={selectedDatasetId}
            onChange={(e) =>
              setSelectedDatasetId(e.target.value)
            }
            disabled={
              isLoadingDatasets ||
              datasets.length === 0
            }
          >
            {isLoadingDatasets ? (
              <option>
                Loading datasets...
              </option>
            ) : datasets.length === 0 ? (
              <option>
                No datasets
              </option>
            ) : (
              datasets.map((dataset) => (
                <option
                  key={dataset._id}
                  value={dataset._id}
                >
                  {dataset.originalFileName ||
                    dataset.name}
                </option>
              ))
            )}
          </select>

          <select
            value={timeRange}
            onChange={(e) =>
              setTimeRange(e.target.value)
            }
          >
            <option>
              Last 7 days
            </option>

            <option>
              Last 30 days
            </option>

            <option>
              Last 90 days
            </option>

            <option>
              This year
            </option>
          </select>

        </div>

      </div>


      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="analytics-error">
          {error}
        </div>
      )}


      {/* ======================================================
          LOADING
      ====================================================== */}

      {isLoadingAnalytics ? (

        <div className="analytics-loading">

          <div className="analytics-loading-spinner">
            ⟳
          </div>

          <h3>
            Analyzing your dataset...
          </h3>

          <p>
            Calculating statistics and discovering
            patterns.
          </p>

        </div>

      ) : !selectedDataset ? (

        <div className="analytics-empty">

          <div className="analytics-empty-icon">
            ◈
          </div>

          <h3>
            No dataset available
          </h3>

          <p>
            Upload a dataset first to see analytics.
          </p>

        </div>

      ) : analytics ? (

        <>

          {/* ==================================================
              DATASET INFO
          ================================================== */}

          <div className="analytics-dataset-banner">

            <div>

              <span>
                ANALYZING DATASET
              </span>

              <h3>
                {selectedDataset.originalFileName ||
                  selectedDataset.name}
              </h3>

            </div>

            <div className="analytics-dataset-meta">

              <span>
                {formatFileType(
                  selectedDataset.originalFileName ||
                  selectedDataset.name
                )}
              </span>

              <span>
                {formatFileSize(
                  selectedDataset.fileSize
                )}
              </span>

            </div>

          </div>


          {/* ==================================================
              KPI CARDS
          ================================================== */}

          <div className="analytics-kpi-grid">

            {metrics.map((metric) => (

              <div
                className="analytics-kpi"
                key={metric.title}
              >

                <div className="analytics-kpi-top">

                  <div className="analytics-kpi-icon">
                    {metric.icon}
                  </div>

                  <span className="analytics-growth">
                    {metric.change}
                  </span>

                </div>

                <p>
                  {metric.title}
                </p>

                <h3>
                  {metric.value}
                </h3>

              </div>

            ))}

          </div>


          {/* ==================================================
              MAIN ANALYTICS
          ================================================== */}

          <div className="analytics-main-grid">

            {/* ================================================
                NUMERIC STATISTICS
            ================================================ */}

            <div className="analytics-card revenue-card">

              <div className="analytics-card-header">

                <div>

                  <h3>
                    Numeric Overview
                  </h3>

                  <p>
                    Statistics for{" "}
                    <strong>
                      {primaryNumericName}
                    </strong>
                  </p>

                </div>

                {primaryNumericColumn && (
                  <div className="chart-legend">

                    <span>
                      <i></i>
                      {primaryNumericName}
                    </span>

                  </div>
                )}

              </div>


              {numericChart.length > 0 ? (

                <div className="revenue-chart">

                  <div className="revenue-y-axis">

                    <span>
                      {formatCompactNumber(
                        maxChartValue
                      )}
                    </span>

                    <span>
                      {formatCompactNumber(
                        maxChartValue * 0.75
                      )}
                    </span>

                    <span>
                      {formatCompactNumber(
                        maxChartValue * 0.5
                      )}
                    </span>

                    <span>
                      {formatCompactNumber(
                        maxChartValue * 0.25
                      )}
                    </span>

                    <span>
                      0
                    </span>

                  </div>


                  <div className="revenue-chart-area">

                    <div className="revenue-grid">

                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>

                    </div>


                    <div className="revenue-bars">

                      {numericChart.map((item) => (

                        <div
                          className="revenue-bar-wrapper"
                          key={item.label}
                        >

                          <div className="revenue-tooltip">
                            {formatNumber(
                              item.value
                            )}
                          </div>

                          <div
                            className="revenue-bar"
                            style={{
                              height: `${Math.max(
                                (item.value /
                                  maxChartValue) *
                                  100,
                                3
                              )}%`,
                            }}
                          ></div>

                          <span>
                            {item.label}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              ) : (

                <div className="analytics-no-data">

                  <h4>
                    No numeric columns
                  </h4>

                  <p>
                    This dataset does not contain
                    numeric columns to visualize.
                  </p>

                </div>

              )}

            </div>


            {/* ================================================
                CATEGORY DISTRIBUTION
            ================================================ */}

            <div className="analytics-card category-card">

              <div className="analytics-card-header">

                <div>

                  <h3>
                    Category Distribution
                  </h3>

                  <p>
                    {primaryCategoricalName}
                  </p>

                </div>

              </div>


              {categoryItems.length > 0 ? (

                <>

                  <div className="category-chart">

                    <div
                      className="category-donut"
                      style={{
                        background:
                          createDonutGradient(
                            categoryItems
                          ),
                      }}
                    >

                      <div>

                        <strong>
                          {categoryItems.reduce(
                            (sum, item) =>
                              sum + item.count,
                            0
                          )}
                        </strong>

                        <span>
                          Values
                        </span>

                      </div>

                    </div>

                  </div>


                  <div className="category-list">

                    {categoryItems
                      .slice(0, 6)
                      .map(
                        (category, index) => (

                          <div
                            className="category-item"
                            key={`${category.name}-${index}`}
                          >

                            <div className="category-name">

                              <span
                                className={`category-dot dot-${index}`}
                              ></span>

                              <span>
                                {category.name}
                              </span>

                            </div>

                            <strong>
                              {formatNumber(
                                category.count
                              )}
                            </strong>

                            <span>
                              {category.percentage.toFixed(
                                1
                              )}
                              %
                            </span>

                          </div>

                        )
                      )}

                  </div>

                </>

              ) : (

                <div className="analytics-no-data">

                  <h4>
                    No categorical data
                  </h4>

                  <p>
                    No categorical column was detected
                    in this dataset.
                  </p>

                </div>

              )}

            </div>

          </div>


          {/* ==================================================
              DATASET INSIGHT
          ================================================== */}

          <div className="analytics-ai-insight">

            <div className="analytics-ai-icon">
              ✦
            </div>

            <div className="analytics-ai-content">

              <span>
                DATASET INSIGHT
              </span>

              <h3>
                {insight.title}
              </h3>

              <p>
                {insight.description}
              </p>

            </div>

            <button type="button">
              Ask Copilot →
            </button>

          </div>


          {/* ==================================================
              CORRELATIONS / NUMERIC COLUMNS
          ================================================== */}

          <div className="analytics-card products-card">

            <div className="analytics-card-header">

              <div>

                <h3>
                  Data Relationships
                </h3>

                <p>
                  Numeric column correlations and
                  statistical information
                </p>

              </div>

            </div>


            {correlationItems.length > 0 ? (

              <div className="products-table-wrapper">

                <table className="products-table">

                  <thead>

                    <tr>

                      <th>
                        COLUMN A
                      </th>

                      <th>
                        COLUMN B
                      </th>

                      <th>
                        CORRELATION
                      </th>

                      <th>
                        RELATIONSHIP
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {correlationItems
                      .slice(0, 10)
                      .map(
                        (item, index) => (

                          <tr
                            key={`${item.first}-${item.second}-${index}`}
                          >

                            <td>

                              <div className="product-cell">

                                <div className="product-rank">
                                  {index + 1}
                                </div>

                                <strong>
                                  {item.first}
                                </strong>

                              </div>

                            </td>

                            <td>
                              <span className="product-category">
                                {item.second}
                              </span>
                            </td>

                            <td>
                              <strong className="product-revenue">
                                {item.value.toFixed(3)}
                              </strong>
                            </td>

                            <td>

                              <span className="product-growth">
                                {getCorrelationLabel(
                                  item.value
                                )}
                              </span>

                            </td>

                          </tr>

                        )
                      )}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="analytics-no-data">

                <h4>
                  No correlations available
                </h4>

                <p>
                  Correlations require at least two
                  numeric columns.
                </p>

              </div>

            )}

          </div>

        </>

      ) : null}

    </div>
  );
}


// ============================================================
// HELPERS
// ============================================================

function formatNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US").format(
    Math.round(number)
  );
}


function formatCompactNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  if (Math.abs(number) >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}M`;
  }

  if (Math.abs(number) >= 1_000) {
    return `${(number / 1_000).toFixed(1)}K`;
  }

  return number.toFixed(0);
}


function formatFileType(fileName = "") {
  const extension =
    fileName.split(".").pop() || "";

  return extension.toUpperCase();
}


function formatFileSize(bytes = 0) {
  const size = Number(bytes);

  if (!size) {
    return "Unknown size";
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}


// ============================================================
// CATEGORY NORMALIZATION
// ============================================================

function normalizeCategories(column) {
  if (!column) return [];

  const possibleValues =
    column.topValues ||
    column.values ||
    column.categories ||
    column.distribution;

  if (Array.isArray(possibleValues)) {
    const items = possibleValues
      .map((item) => {

        if (
          typeof item === "string" ||
          typeof item === "number"
        ) {
          return {
            name: String(item),
            count: 1,
          };
        }

        return {
          name: String(
            item.value ??
            item.name ??
            item.category ??
            "Unknown"
          ),

          count: Number(
            item.count ??
            item.frequency ??
            item.total ??
            0
          ),
        };
      })
      .filter(
        (item) =>
          item.name !== "Unknown" &&
          Number.isFinite(item.count)
      );

    const total = items.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return items.map((item) => ({
      ...item,
      percentage:
        total > 0
          ? (item.count / total) * 100
          : 0,
    }));
  }

  if (
    typeof possibleValues === "object" &&
    possibleValues !== null
  ) {
    const items = Object.entries(
      possibleValues
    ).map(([name, value]) => ({
      name,
      count:
        typeof value === "object"
          ? Number(
              value.count ??
                value.frequency ??
                value.total ??
                0
            )
          : Number(value),
    }));

    const total = items.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return items.map((item) => ({
      ...item,
      percentage:
        total > 0
          ? (item.count / total) * 100
          : 0,
    }));
  }

  return [];
}


// ============================================================
// CORRELATION NORMALIZATION
// ============================================================

function normalizeCorrelations(data) {
  if (!data) return [];

  const result = [];

  if (Array.isArray(data)) {
    data.forEach((item) => {

      if (!item) return;

      const first =
        item.first ??
        item.columnA ??
        item.column1 ??
        item.x;

      const second =
        item.second ??
        item.columnB ??
        item.column2 ??
        item.y;

      const value = Number(
        item.value ??
        item.correlation ??
        item.coefficient
      );

      if (
        first &&
        second &&
        Number.isFinite(value)
      ) {
        result.push({
          first,
          second,
          value,
        });
      }
    });

    return result;
  }

  Object.entries(data).forEach(
    ([first, values]) => {

      if (
        !values ||
        typeof values !== "object"
      ) {
        return;
      }

      Object.entries(values).forEach(
        ([second, value]) => {

          const correlation =
            Number(
              typeof value === "object"
                ? value.value ??
                    value.correlation
                : value
            );

          if (
            Number.isFinite(correlation) &&
            first !== second
          ) {
            result.push({
              first,
              second,
              value: correlation,
            });
          }
        }
      );
    }
  );

  return result;
}


// ============================================================
// DONUT GRADIENT
// ============================================================

function createDonutGradient(items) {
  if (!items.length) {
    return "conic-gradient(#e5e7eb 0deg 360deg)";
  }

  const degrees = [];
  let current = 0;

  items
    .slice(0, 6)
    .forEach((item, index) => {

      const next =
        current +
        (item.percentage / 100) * 360;

      degrees.push(
        `var(--donut-${index}, #6366f1) ${current}deg ${next}deg`
      );

      current = next;
    });

  if (current < 360) {
    degrees.push(
      `#e5e7eb ${current}deg 360deg`
    );
  }

  return `conic-gradient(${degrees.join(", ")})`;
}


// ============================================================
// CORRELATION LABEL
// ============================================================

function getCorrelationLabel(value) {
  const absolute = Math.abs(value);

  if (absolute >= 0.8) {
    return value > 0
      ? "Strong positive"
      : "Strong negative";
  }

  if (absolute >= 0.5) {
    return value > 0
      ? "Moderate positive"
      : "Moderate negative";
  }

  if (absolute >= 0.3) {
    return value > 0
      ? "Weak positive"
      : "Weak negative";
  }

  return "Very weak";
}


// ============================================================
// DATASET INSIGHT
// ============================================================

function generateInsight({
  selectedDataset,
  totalRows,
  totalColumns,
  numericColumnCount,
  categoricalColumnCount,
  missingValues,
  primaryNumericColumn,
  primaryCategoricalColumn,
  categoryItems,
  correlationItems,
}) {
  const datasetName =
    selectedDataset?.originalFileName ||
    selectedDataset?.name ||
    "This dataset";

  if (missingValues > 0) {
    return {
      title: `${datasetName} contains ${formatNumber(
        missingValues
      )} missing values.`,

      description:
        "Review missing values before making important analytical decisions. The dataset contains " +
        `${formatNumber(
          numericColumnCount
        )} numeric and ${formatNumber(
          categoricalColumnCount
        )} categorical columns across ` +
        `${formatNumber(totalRows)} rows.`,
    };
  }

  if (
    correlationItems.length > 0
  ) {
    const strongest =
      [...correlationItems].sort(
        (a, b) =>
          Math.abs(b.value) -
          Math.abs(a.value)
      )[0];

    return {
      title: `${strongest.first} and ${strongest.second} show the strongest detected relationship.`,

      description:
        `The correlation coefficient is ${strongest.value.toFixed(
          3
        )}. Correlation indicates statistical association, not causation. ` +
        `${datasetName} contains ${formatNumber(
          totalRows
        )} rows and ${formatNumber(
          totalColumns
        )} columns.`,
    };
  }

  if (
    primaryCategoricalColumn &&
    categoryItems.length > 0
  ) {
    const topCategory =
      categoryItems[0];

    return {
      title: `${topCategory.name} is the most frequent category.`,

      description:
        `${topCategory.name} represents approximately ` +
        `${topCategory.percentage.toFixed(
          1
        )}% of the observed values in ${primaryCategoricalColumn.name || "this categorical column"}.`,
    };
  }

  if (primaryNumericColumn) {
    return {
      title: `${primaryNumericColumn.name || "Numeric data"} has been analyzed.`,

      description:
        `The dataset contains ${formatNumber(
          numericColumnCount
        )} numeric columns across ${formatNumber(
          totalRows
        )} rows. Statistical summaries include minimum, maximum, mean, median and standard deviation where available.`,
    };
  }

  return {
    title: `${datasetName} has been successfully analyzed.`,

    description:
      `The dataset contains ${formatNumber(
        totalRows
      )} rows and ${formatNumber(
        totalColumns
      )} columns. Upload a dataset with numeric or categorical fields to unlock deeper statistical visualizations.`,
  };
}


export default Analytics;