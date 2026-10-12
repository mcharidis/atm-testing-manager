import { TestingCategoryDef } from "@/types/testing";

export const testingCategories: TestingCategoryDef[] = [
  {
    id: "cashWithdrawal",
    name: "category.cashWithdrawal",
    icon: "AccountBalance",
    options: [
      {
        key: "amounts",
        label: "config.amounts",
        type: "amount-list",
        defaults: [10, 20, 50, 70, 100],
        allowCustom: true,
      },
    ],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => {
        if (tc.scenario) return tc.scenario;
        const amount = tc.optionValues.amounts;
        return `${amount} Euro`;
      }},
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "pan", header: "PAN", width: 22, buildValue: (tc) => tc.card.pan },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "balance",
    name: "category.balance",
    icon: "AccountBalanceWallet",
    options: [
      {
        key: "receiptOptions",
        label: "config.receipt",
        type: "checkbox-list",
        defaults: ["With receipt", "No receipt"],
        allowCustom: false,
      },
    ],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => {
        if (tc.scenario) return tc.scenario;
        return tc.optionValues.receiptOptions as string;
      }},
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "pan", header: "PAN", width: 22, buildValue: (tc) => tc.card.pan },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "pinUnblock",
    name: "category.pinUnblock",
    icon: "LockOpen",
    options: [
      {
        key: "pinEntry",
        label: "config.pinEntry",
        type: "checkbox-list",
        defaults: ["Correct PIN Inserted", "Wrong PIN Inserted"],
        allowCustom: true,
      },
    ],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => tc.scenario ? tc.scenario : String(tc.optionValues.pinEntry) },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "pan", header: "PAN", width: 22, buildValue: (tc) => tc.card.pan },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "deposit",
    name: "category.deposit",
    icon: "Savings",
    options: [
      {
        key: "depositType",
        label: "config.depositType",
        type: "checkbox-list",
        defaults: ["Cash", "Check"],
        allowCustom: true,
      },
    ],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => tc.scenario ? tc.scenario : (tc.optionValues.depositType as string) },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "pan", header: "PAN", width: 22, buildValue: (tc) => tc.card.pan },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "transfer",
    name: "category.transfer",
    icon: "SwapHoriz",
    options: [],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => tc.scenario ? tc.scenario : "Standard" },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "pan", header: "PAN", width: 22, buildValue: (tc) => tc.card.pan },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "pinChange",
    name: "category.pinChange",
    icon: "Pin",
    options: [],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => tc.scenario ? tc.scenario : "Standard" },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "pan", header: "PAN", width: 22, buildValue: (tc) => tc.card.pan },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "cardRetention",
    name: "category.cardRetention",
    icon: "CreditCardOff",
    options: [],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => tc.scenario ? tc.scenario : "Standard" },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "pan", header: "PAN", width: 22, buildValue: (tc) => tc.card.pan },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "supervisorFunctions",
    name: "category.supervisorFunctions",
    icon: "Settings",
    cardIndependent: true,
    options: [
      {
        key: "function",
        label: "config.supervisorFunction",
        type: "checkbox-list",
        defaults: [
          "Add Cash",
          "Clear Cash",
          "Test Cash",
          "Display Counters",
          "Print Counters",
          "Clear Bins",
          "Device Status",
        ],
        allowCustom: true,
      },
    ],
    excelColumns: [
      { key: "function", header: "Supervisor Function", width: 30, buildValue: (tc) => String(tc.optionValues.function) },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 50, buildValue: (tc) => tc.comments },
    ],
  },
];
