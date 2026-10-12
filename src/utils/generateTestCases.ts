import { v4 as uuidv4 } from 'uuid';
import type { TestingSession, TestCase, Card } from '@/types/testing';
import { testingCategories } from '@/config/testingCategories';

/**
 * Generates all test cases based on the session configuration.
 *
 * For each selected category, creates the cartesian product of:
 *   cards × transactionTypes × languages × categoryOptions
 *
 * Additional scenarios generate:
 *   scenarios × cards × transactionTypes (per selected category)
 */
export function generateTestCases(session: TestingSession): TestCase[] {
  const testCases: TestCase[] = [];

  for (const categoryId of session.selectedCategoryIds) {
    const categoryDef = testingCategories.find((c) => c.id === categoryId);
    if (!categoryDef) continue;

    const categoryConfig = session.categoryConfigs[categoryId] || {};

    // Card-independent categories (e.g. Supervisor Functions):
    // one test case per option combination, no cards/languages/scenarios
    if (categoryDef.cardIndependent) {
      const optionCombinations = getOptionCombinations(categoryDef.options, categoryConfig);
      for (const optionValues of optionCombinations) {
        testCases.push(createTestCase(categoryId, NO_CARD, 'N/A', '', optionValues));
      }
      continue;
    }

    // Determine transaction types per card
    const cardTransactionPairs = getCardTransactionPairs(session.cards);

    if (categoryDef.options.length === 0) {
      // Categories with no options (e.g., Transfer, PIN Change)
      // Generate: cards × transactionTypes × languages
      for (const { card, transactionType } of cardTransactionPairs) {
        for (const language of session.languages) {
          testCases.push(createTestCase(categoryId, card, transactionType, language, {}));
        }
      }
    } else {
      // Categories with options — generate cartesian product of all option values
      const optionCombinations = getOptionCombinations(categoryDef.options, categoryConfig);

      for (const { card, transactionType } of cardTransactionPairs) {
        for (const language of session.languages) {
          for (const optionValues of optionCombinations) {
            testCases.push(createTestCase(categoryId, card, transactionType, language, optionValues));
          }
        }
      }
    }

    // Additional scenarios for this category
    for (const scenario of session.additionalScenarios) {
      for (const { card, transactionType } of cardTransactionPairs) {
        testCases.push(
          createTestCase(categoryId, card, transactionType, '', {}, scenario)
        );
      }
    }
  }

  return testCases;
}

// === Helpers ===

/** Placeholder card used for card-independent categories (e.g. Supervisor Functions). */
const NO_CARD: Card = {
  id: 'no-card',
  type: '—',
  family: '',
  pan: '',
  contact: false,
  contactless: false,
};

interface CardTransactionPair {
  card: Card;
  transactionType: 'Contact' | 'Contactless';
}

function getCardTransactionPairs(cards: Card[]): CardTransactionPair[] {
  const pairs: CardTransactionPair[] = [];
  for (const card of cards) {
    if (card.contact) {
      pairs.push({ card, transactionType: 'Contact' });
    }
    if (card.contactless) {
      pairs.push({ card, transactionType: 'Contactless' });
    }
  }
  return pairs;
}

/**
 * Generates all combinations of option values across multiple option definitions.
 * 
 * For example, if a category has:
 *   - amounts: [10, 20, 50]
 *   - receiptOptions: ["With receipt", "No receipt"]
 * 
 * This produces 6 combinations:
 *   { amount: 10, receiptOptions: "With receipt" }
 *   { amount: 10, receiptOptions: "No receipt" }
 *   { amount: 20, receiptOptions: "With receipt" }
 *   ... etc.
 */
function getOptionCombinations(
  optionDefs: { key: string; defaults: (string | number)[] }[],
  categoryConfig: Record<string, (string | number)[]>
): Record<string, string | number>[] {
  if (optionDefs.length === 0) return [{}];

  let combinations: Record<string, string | number>[] = [{}];

  for (const optionDef of optionDefs) {
    const values = categoryConfig[optionDef.key] ?? optionDef.defaults;
    const newCombinations: Record<string, string | number>[] = [];

    for (const combo of combinations) {
      for (const value of values) {
        newCombinations.push({ ...combo, [optionDef.key]: value });
      }
    }

    combinations = newCombinations;
  }

  return combinations;
}

function createTestCase(
  categoryId: string,
  card: Card,
  transactionType: TestCase['transactionType'],
  language: string,
  optionValues: Record<string, string | number>,
  scenario?: string
): TestCase {
  return {
    id: uuidv4(),
    categoryId,
    card,
    transactionType,
    language,
    optionValues,
    scenario,
    status: 'Untested',
    comments: '',
  };
}
