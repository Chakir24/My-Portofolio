'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import enTranslations from '@/locales/en.json'
import frTranslations from '@/locales/fr.json'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Preload all translations synchronously
const translationsMap: Record<Language, Record<string, any>> = {
  en: enTranslations,
  fr: frTranslations,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language from HTML attribute or localStorage synchronously
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en'
    const htmlLang = document.documentElement.getAttribute('data-language') as Language
    if (htmlLang) return htmlLang
    try {
      return (localStorage.getItem('language') as Language) || 'en'
    } catch {
      return 'en'
    }
  }

  // Always start with 'en' to avoid hydration mismatch, but load translations immediately
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Record<string, any>>(translationsMap.en)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load translations immediately after mount
    const savedLanguage = getInitialLanguage()
    setLanguageState(savedLanguage)
    setTranslations(translationsMap[savedLanguage] || translationsMap.en)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.setAttribute('data-language', lang)
    setTranslations(translationsMap[lang] || translationsMap.en)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

