import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import XLSX from "xlsx";

const parseCSV = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
};

const parseJSON = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const data = JSON.parse(fileContent);

  if (!Array.isArray(data)) {
    throw new Error("JSON file must contain an array of objects");
  }

  return data;
};

const parseExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);

  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("Excel file does not contain any worksheet");
  }

  const worksheet = workbook.Sheets[firstSheetName];

  return XLSX.utils.sheet_to_json(worksheet, {
    defval: null,
  });
};

export const parseFile = (filePath, originalFileName) => {
  const extension = path.extname(originalFileName).toLowerCase();

  switch (extension) {
    case ".csv":
      return parseCSV(filePath);

    case ".json":
      return parseJSON(filePath);

    case ".xlsx":
    case ".xls":
      return parseExcel(filePath);

    default:
      throw new Error(
        "Unsupported file type. Only CSV, JSON, XLSX and XLS are allowed"
      );
  }
};