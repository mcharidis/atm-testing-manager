// === General Info ===
export interface GeneralInfo {
  project: string;
  atm: string;
  version: string;
  environment: string;
  date: string;
  tester: string;
}

// === Card ===
export interface Card {
  id: string;
  type: string;           // "Visa", "Mastercard", "Maestro"
  family: string;         // "Credit", "Debit", "Prepaid"
  pan: string;
  contact: boolean;
  contactless: boolean;
}

// === Category Configuration ===
export interface CategoryOptionDef {
  key: string;            // e.g. "amounts", "receiptOptions"
  label: string;          // i18n key
  type: "checkbox-list" | "amount-list";
  defaults: (string | number)[];
  allowCustom: boolean;
}

export interface ExcelColumnDef {
  key: string;
  header: string;
  width?: number;
  buildValue: (tc: TestCase) => string;
}

export interface TestingCategoryDef {
  id: string;
  name: string;           // i18n key
  icon: string;           // MUI icon name
  options: CategoryOptionDef[];
  excelColumns: ExcelColumnDef[];
}

// === Test Case ===
export type TestStatus = "Untested" | "Pass" | "Fail" | "Blocked" | "N/A";

export interface TestCase {
  id: string;
  categoryId: string;
  card: Card;
  transactionType: "Contact" | "Contactless";
  language: string;
  optionValues: Record<string, string | number>;
  scenario?: string;
  status: TestStatus;
  comments: string;
}

// === Session ===
export interface TestingSession {
  generalInfo: GeneralInfo;
  selectedCategoryIds: string[];
  cards: Card[];
  languages: string[];
  categoryConfigs: Record<string, Record<string, (string | number)[]>>;
  additionalScenarios: string[];
  testCases: TestCase[];
}

// === Card Preset ===
export interface CardPreset {
  type: string;
  family: string;
}

// === Language Option ===
export interface LanguageOption {
  code: string;
  name: string;
}
