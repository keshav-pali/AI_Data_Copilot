const isMissing = (value) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
};

const isNumericValue = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  return Number.isFinite(Number(value));
};

const toNumber = (value) => {
  return typeof value === "number" ? value : Number(value);
};

const calculateMean = (values) => {
  if (values.length === 0) return null;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const calculateMedian = (values) => {
  if (values.length === 0) return null;

  const sorted = [...values].sort((a, b) => a - b);

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

const calculateStandardDeviation = (values) => {
  if (values.length === 0) return null;

  const mean = calculateMean(values);

  const variance =
    values.reduce((sum, value) => {
      return sum + Math.pow(value - mean, 2);
    }, 0) / values.length;

  return Math.sqrt(variance);
};

const calculateCorrelation = (x, y) => {
  if (x.length !== y.length || x.length < 2) {
    return null;
  }

  const meanX = calculateMean(x);
  const meanY = calculateMean(y);

  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;

  for (let i = 0; i < x.length; i++) {
    const diffX = x[i] - meanX;
    const diffY = y[i] - meanY;

    numerator += diffX * diffY;
    denominatorX += diffX * diffX;
    denominatorY += diffY * diffY;
  }

  const denominator = Math.sqrt(denominatorX * denominatorY);

  if (denominator === 0) {
    return null;
  }

  return numerator / denominator;
};

const roundNumber = (value, decimals = 4) => {
  if (value === null || value === undefined) {
    return null;
  }

  return Number(value.toFixed(decimals));
};

export const analyzeData = (rows) => {
  if (!Array.isArray(rows)) {
    throw new Error("Data must be an array");
  }

  if (rows.length === 0) {
    return {
      rowCount: 0,
      columnCount: 0,
      columns: [],
    };
  }

  const columns = [
    ...new Set(rows.flatMap((row) => Object.keys(row))),
  ];

  return {
    rowCount: rows.length,
    columnCount: columns.length,
    columns,
  };
};

export const analyzeDataset = (rows) => {
  if (!Array.isArray(rows)) {
    throw new Error("Data must be an array");
  }

  if (rows.length === 0) {
    return {
      overview: {
        rowCount: 0,
        columnCount: 0,
      },
      columns: [],
      numericStatistics: {},
      categoricalStatistics: {},
      correlations: {},
    };
  }

  const columns = [
    ...new Set(rows.flatMap((row) => Object.keys(row))),
  ];

  const columnAnalysis = [];
  const numericStatistics = {};
  const categoricalStatistics = {};

  for (const column of columns) {
    const values = rows.map((row) => row[column]);

    const missingCount = values.filter(isMissing).length;

    const nonMissingValues = values.filter(
      (value) => !isMissing(value)
    );

    const numericValues = nonMissingValues
      .filter(isNumericValue)
      .map(toNumber);

    const isNumeric =
      nonMissingValues.length > 0 &&
      numericValues.length === nonMissingValues.length;

    const uniqueValues = [
      ...new Set(
        nonMissingValues.map((value) => String(value))
      ),
    ];

    const columnInfo = {
      name: column,
      type: isNumeric ? "numeric" : "categorical",
      totalValues: values.length,
      missingCount,
      missingPercentage: roundNumber(
        (missingCount / values.length) * 100,
        2
      ),
      uniqueCount: uniqueValues.length,
    };

    columnAnalysis.push(columnInfo);

    if (isNumeric) {
      const sortedValues = [...numericValues].sort(
        (a, b) => a - b
      );

      numericStatistics[column] = {
        count: numericValues.length,
        min: roundNumber(sortedValues[0]),
        max: roundNumber(
          sortedValues[sortedValues.length - 1]
        ),
        mean: roundNumber(calculateMean(numericValues)),
        median: roundNumber(calculateMedian(numericValues)),
        standardDeviation: roundNumber(
          calculateStandardDeviation(numericValues)
        ),
      };
    } else {
      const frequencyMap = {};

      for (const value of nonMissingValues) {
        const key = String(value);

        frequencyMap[key] =
          (frequencyMap[key] || 0) + 1;
      }

      const topValues = Object.entries(frequencyMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([value, count]) => ({
          value,
          count,
          percentage: roundNumber(
            (count / nonMissingValues.length) * 100,
            2
          ),
        }));

      categoricalStatistics[column] = {
        uniqueCount: uniqueValues.length,
        topValues,
      };
    }
  }

  const numericColumns = columnAnalysis
    .filter((column) => column.type === "numeric")
    .map((column) => column.name);

  const correlations = {};

  for (let i = 0; i < numericColumns.length; i++) {
    for (let j = i + 1; j < numericColumns.length; j++) {
      const columnA = numericColumns[i];
      const columnB = numericColumns[j];

      const pairedA = [];
      const pairedB = [];

      for (const row of rows) {
        const valueA = row[columnA];
        const valueB = row[columnB];

        if (
          !isMissing(valueA) &&
          !isMissing(valueB) &&
          isNumericValue(valueA) &&
          isNumericValue(valueB)
        ) {
          pairedA.push(toNumber(valueA));
          pairedB.push(toNumber(valueB));
        }
      }

      const correlation = calculateCorrelation(
        pairedA,
        pairedB
      );

      if (correlation !== null) {
        if (!correlations[columnA]) {
          correlations[columnA] = {};
        }

        correlations[columnA][columnB] =
          roundNumber(correlation);
      }
    }
  }

  return {
    overview: {
      rowCount: rows.length,
      columnCount: columns.length,
      numericColumnCount: numericColumns.length,
      categoricalColumnCount:
        columns.length - numericColumns.length,
    },

    columns: columnAnalysis,

    numericStatistics,

    categoricalStatistics,

    correlations,
  };
};