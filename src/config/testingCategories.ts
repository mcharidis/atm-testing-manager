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
        const amount = tc.optionValues.amount;
        return `Withdrawal ${amount}s`;
      }},
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
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
        return `Balance ${tc.optionValues.receiptOptions}`;
      }},
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
  {
    id: "miniStatement",
    name: "category.miniStatement",
    icon: "Receipt",
    options: [
      {
        key: "statementType",
        label: "config.statementType",
        type: "checkbox-list",
        defaults: ["On-screen", "Printed"],
        allowCustom: false,
      },
    ],
    excelColumns: [
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => `Mini Statement ${tc.optionValues.statementType}` },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
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
      { key: "summary", header: "Summary", width: 30, buildValue: (tc) => `Deposit ${tc.optionValues.depositType}` },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
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
      { key: "summary", header: "Summary", width: 30, buildValue: () => "Fund Transfer" },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
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
      { key: "summary", header: "Summary", width: 30, buildValue: () => "PIN Change" },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
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
      { key: "summary", header: "Summary", width: 30, buildValue: () => "Card Retention" },
      { key: "productType", header: "Product type", width: 15, buildValue: (tc) => tc.card.type },
      { key: "productFamily", header: "Product Family", width: 15, buildValue: (tc) => tc.card.family },
      { key: "transactionType", header: "Transaction type", width: 18, buildValue: (tc) => tc.transactionType },
      { key: "language", header: "Language", width: 12, buildValue: (tc) => tc.language },
      { key: "status", header: "Status", width: 12, buildValue: (tc) => tc.status },
      { key: "comments", header: "Comments", width: 35, buildValue: (tc) => tc.comments },
    ],
  },
];
