import type { TestingSession, TestCase, TestStatus } from '@/types/testing';
import { testingCategories } from '@/config/testingCategories';

/**
 * Exports the testing session results to a styled .xlsx file.
 * Creates one sheet per selected category + a Summary sheet.
 *
 * Uses dynamic import of exceljs to avoid SSR issues.
 */
export async function exportToExcel(session: TestingSession): Promise<void> {
  // Dynamic imports for browser-only libraries
  const ExcelJS = await import('exceljs');
  const { saveAs } = await import('file-saver');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = session.generalInfo.tester;
  workbook.created = new Date();

  // === Summary Sheet ===
  createSummarySheet(workbook, session);

  // === Category Sheets ===
  for (const categoryId of session.selectedCategoryIds) {
    const categoryDef = testingCategories.find((c) => c.id === categoryId);
    if (!categoryDef) continue;

    const categoryTestCases = session.testCases.filter(
      (tc) => tc.categoryId === categoryId
    );

    createCategorySheet(workbook, categoryDef.name, categoryDef.excelColumns, categoryTestCases);
  }

  // === Generate and download ===
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const date = session.generalInfo.date.replace(/-/g, '');
  const filename = `ATM_Testing_${session.generalInfo.atm}_${date}.xlsx`;
  saveAs(blob, filename);
}

// === Summary Sheet ===
function createSummarySheet(
  workbook: InstanceType<typeof import('exceljs').Workbook>,
  session: TestingSession
): void {
  const sheet = workbook.addWorksheet('Summary');

  // Title
  sheet.mergeCells('A1:D1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = 'ATM Testing Report';
  titleCell.font = { bold: true, size: 16, color: { argb: 'FF1A237E' } };
  titleCell.alignment = { horizontal: 'center' };

  // General Info
  const infoRows = [
    ['ATM', session.generalInfo.atm],
    ['Version', session.generalInfo.version],
    ['Environment', session.generalInfo.environment],
    ['Date', session.generalInfo.date],
    ['Tester', session.generalInfo.tester],
  ];

  let rowIndex = 3;
  for (const [label, value] of infoRows) {
    const row = sheet.getRow(rowIndex);
    row.getCell(1).value = label;
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = value;
    rowIndex++;
  }

  // Stats
  rowIndex += 1;
  sheet.getRow(rowIndex).getCell(1).value = 'Test Results';
  sheet.getRow(rowIndex).getCell(1).font = { bold: true, size: 14 };
  rowIndex += 1;

  const stats = calculateStats(session.testCases);
  const statRows: [string, number, string][] = [
    ['Total Tests', stats.total, 'FF424242'],
    ['Pass', stats.pass, 'FF4CAF50'],
    ['Fail', stats.fail, 'FFF44336'],
    ['Blocked', stats.blocked, 'FFFF9800'],
    ['N/A', stats.na, 'FF9E9E9E'],
    ['Untested', stats.untested, 'FFBDBDBD'],
  ];

  for (const [label, count, color] of statRows) {
    const row = sheet.getRow(rowIndex);
    row.getCell(1).value = label;
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = count;
    row.getCell(2).font = { color: { argb: color } };
    rowIndex++;
  }

  // Column widths
  sheet.getColumn(1).width = 20;
  sheet.getColumn(2).width = 30;
}

// === Category Sheet ===
function createCategorySheet(
  workbook: InstanceType<typeof import('exceljs').Workbook>,
  categoryName: string,
  columns: { key: string; header: string; width?: number; buildValue: (tc: TestCase) => string }[],
  testCases: TestCase[]
): void {
  // Clean sheet name (Excel has 31 char limit and no special chars)
  const sheetName = categoryName
    .replace('category.', '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .substring(0, 31);

  const sheet = workbook.addWorksheet(sheetName);

  // Header row
  const headerRow = sheet.getRow(1);
  columns.forEach((col, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = col.header;
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1A237E' },
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
    };
  });
  headerRow.height = 25;

  // Set column widths
  columns.forEach((col, index) => {
    sheet.getColumn(index + 1).width = col.width ?? 15;
  });

  // Data rows
  testCases.forEach((tc, rowIdx) => {
    const row = sheet.getRow(rowIdx + 2);

    columns.forEach((col, colIdx) => {
      const cell = row.getCell(colIdx + 1);
      cell.value = col.buildValue(tc);

      // Apply status-based coloring
      if (col.key === 'status') {
        cell.font = { bold: true, color: { argb: getStatusColor(tc.status) } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: getStatusBgColor(tc.status) },
        };
      }

      cell.border = {
        bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
      };
    });

    // Alternate row shading
    if (rowIdx % 2 === 1) {
      columns.forEach((_, colIdx) => {
        const cell = row.getCell(colIdx + 1);
        if (columns[colIdx].key !== 'status') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF5F5F5' },
          };
        }
      });
    }
  });

  // Auto-filter
  if (testCases.length > 0) {
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: testCases.length + 1, column: columns.length },
    };
  }
}

// === Helpers ===

function getStatusColor(status: TestStatus): string {
  const colors: Record<TestStatus, string> = {
    'Pass': 'FF1B5E20',
    'Fail': 'FFB71C1C',
    'Blocked': 'FFE65100',
    'N/A': 'FF616161',
    'Untested': 'FF757575',
  };
  return colors[status];
}

function getStatusBgColor(status: TestStatus): string {
  const colors: Record<TestStatus, string> = {
    'Pass': 'FFC8E6C9',
    'Fail': 'FFFFCDD2',
    'Blocked': 'FFFFE0B2',
    'N/A': 'FFF5F5F5',
    'Untested': 'FFFAFAFA',
  };
  return colors[status];
}

interface TestStats {
  total: number;
  pass: number;
  fail: number;
  blocked: number;
  na: number;
  untested: number;
}

function calculateStats(testCases: TestCase[]): TestStats {
  return {
    total: testCases.length,
    pass: testCases.filter((tc) => tc.status === 'Pass').length,
    fail: testCases.filter((tc) => tc.status === 'Fail').length,
    blocked: testCases.filter((tc) => tc.status === 'Blocked').length,
    na: testCases.filter((tc) => tc.status === 'N/A').length,
    untested: testCases.filter((tc) => tc.status === 'Untested').length,
  };
}
