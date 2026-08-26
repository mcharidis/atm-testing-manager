'use client';

import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import en from './locales/en.json';
import el from './locales/el.json';

type Locale = 'en' | 'el';

const locales: Record<Locale, Record<string, string>> = { en, el };

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { locale, setLocale } = context;

  const t = (key: string): string => {
    return locales[locale]?.[key] ?? locales.en[key] ?? key;
  };

  return { t, locale, setLocale };
}
