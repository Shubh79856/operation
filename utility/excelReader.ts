import * as xlsx from "node-xlsx";
import * as fs from "fs";

// Define a type for the row data to ensure consistent structure
interface RowData {
  [key: string]: string | null;
}

/**
 * Reads data from an Excel file and returns it as an array of objects.
 * @param {string} filePath - Path to the Excel file.
 * @param {string} sheetName - Name of the sheet to read.
 * @returns {Array<RowData>} - An array of row objects.
 */
function readExcel(filePath: string, sheetName: string): RowData[] {
  // Parse the Excel file
  const workSheets = xlsx.parse(fs.readFileSync(filePath));

  // Find the specified sheet
  const targetSheet = workSheets.find((sheet) => sheet.name === sheetName);

  if (!targetSheet) {
    throw new Error(`Sheet with name "${sheetName}" not found.`);
  }

  const data = targetSheet.data; // Get the sheet data (2D array)
  if (data.length === 0) {
    return []; // Return an empty array if the sheet is empty
  }

  const headers = data[0]; // Assume the first row contains headers
  const rows: RowData[] = [];

  // Map each subsequent row to an object using the headers
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowData: RowData = {};

    headers.forEach((header, index) => {
      rowData[header] =
        row[index] !== undefined ? row[index].toString().trim() : null;
    });

    rows.push(rowData);
  }

  return rows; // Return the array of objects
}

export default readExcel;
