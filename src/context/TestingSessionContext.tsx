'use client';

import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type {
  TestingSession,
  GeneralInfo,
  Card,
  TestCase,
  TestStatus,
} from '@/types/testing';

// === Initial State ===
const initialSession: TestingSession = {
  generalInfo: {
    project: '',
    atm: '',
    version: '',
    environment: 'SIT',
    date: new Date().toISOString().split('T')[0],
    tester: '',
  },
  selectedCategoryIds: [],
  cards: [],
  languages: [],
  categoryConfigs: {},
  additionalScenarios: [],
  testCases: [],
};

// === Actions ===
type SessionAction =
  | { type: 'SET_GENERAL_INFO'; payload: GeneralInfo }
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'REMOVE_CARD'; payload: string }
  | { type: 'UPDATE_CARD'; payload: Card }
  | { type: 'SET_LANGUAGES'; payload: string[] }
  | { type: 'SET_CATEGORY_CONFIG'; payload: { categoryId: string; config: Record<string, (string | number)[]> } }
  | { type: 'SET_SCENARIOS'; payload: string[] }
  | { type: 'SET_TEST_CASES'; payload: TestCase[] }
  | { type: 'UPDATE_TEST_CASE'; payload: { id: string; status: TestStatus; comments: string } }
  | { type: 'RESET' };

// === Reducer ===
function sessionReducer(state: TestingSession, action: SessionAction): TestingSession {
  switch (action.type) {
    case 'SET_GENERAL_INFO':
      return { ...state, generalInfo: action.payload };

    case 'TOGGLE_CATEGORY': {
      const id = action.payload;
      const selected = state.selectedCategoryIds.includes(id)
        ? state.selectedCategoryIds.filter((c) => c !== id)
        : [...state.selectedCategoryIds, id];
      return { ...state, selectedCategoryIds: selected };
    }

    case 'SET_CATEGORIES':
      return { ...state, selectedCategoryIds: action.payload };

    case 'ADD_CARD':
      return { ...state, cards: [...state.cards, action.payload] };

    case 'REMOVE_CARD':
      return { ...state, cards: state.cards.filter((c) => c.id !== action.payload) };

    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case 'SET_LANGUAGES':
      return { ...state, languages: action.payload };

    case 'SET_CATEGORY_CONFIG':
      return {
        ...state,
        categoryConfigs: {
          ...state.categoryConfigs,
          [action.payload.categoryId]: action.payload.config,
        },
      };

    case 'SET_SCENARIOS':
      return { ...state, additionalScenarios: action.payload };

    case 'SET_TEST_CASES':
      return { ...state, testCases: action.payload };

    case 'UPDATE_TEST_CASE':
      return {
        ...state,
        testCases: state.testCases.map((tc) =>
          tc.id === action.payload.id
            ? { ...tc, status: action.payload.status, comments: action.payload.comments }
            : tc
        ),
      };

    case 'RESET':
      return initialSession;

    default:
      return state;
  }
}

// === Context ===
interface TestingSessionContextType {
  session: TestingSession;
  dispatch: React.Dispatch<SessionAction>;
}

const TestingSessionContext = createContext<TestingSessionContextType | null>(null);

// === Provider ===
interface TestingSessionProviderProps {
  children: ReactNode;
}

export function TestingSessionProvider({ children }: TestingSessionProviderProps) {
  const [session, dispatch] = useReducer(sessionReducer, initialSession);

  return (
    <TestingSessionContext.Provider value={{ session, dispatch }}>
      {children}
    </TestingSessionContext.Provider>
  );
}

// === Hook ===
export function useTestingSession() {
  const context = useContext(TestingSessionContext);
  if (!context) {
    throw new Error('useTestingSession must be used within a TestingSessionProvider');
  }
  return context;
}
