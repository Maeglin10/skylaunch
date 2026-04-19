"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const LOCALES = ["fr", "en", "es", "de", "pt"] as const;
export type Locale = typeof LOCALES[number];

export const LOCALE_META = [
  { code: "fr" as Locale, label: "Français",  flag: "🇫🇷" },
  { code: "en" as Locale, label: "English",   flag: "🇬🇧" },
  { code: "es" as Locale, label: "Español",   flag: "🇪🇸" },
  { code: "de" as Locale, label: "Deutsch",   flag: "🇩🇪" },
  { code: "pt" as Locale, label: "Português", flag: "🇵🇹" },
];

interface LangCtx { locale: Locale; setLocale: (l: Locale) => void; }
const LangContext = createContext<LangCtx>({ locale: "fr", setLocale: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  useEffect(() => {
    const saved = localStorage.getItem("aevia-locale") as Locale | null;
    if (saved && LOCALES.includes(saved)) setLocaleState(saved);
  }, []);
  function setLocale(l: Locale) { setLocaleState(l); localStorage.setItem("aevia-locale", l); }
  return <LangContext.Provider value={{ locale, setLocale }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
