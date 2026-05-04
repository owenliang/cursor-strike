import { createContext, useContext, useState, useEffect } from 'react';
import type { Lang, TKey } from './types';
import { translations } from './translations';
import { STORAGE_LANG_KEY } from '../utils/constants';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(STORAGE_LANG_KEY);
    if (stored === 'zh' || stored === 'en') return stored;
    return 'zh';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_LANG_KEY, newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = translations[lang].login_title;
  }, [lang]);

  const t = (key: TKey): string => translations[lang][key];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}