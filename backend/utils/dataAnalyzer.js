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

  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];

  return {
    rowCount: rows.length,
    columnCount: columns.length,
    columns,
  };
};

//hfskjhfkja

