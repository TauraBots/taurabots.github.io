import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

function detectInitialLanguage() {
  const storedLanguage = window.localStorage.getItem('taurabots-language');

  if (storedLanguage === 'pt' || storedLanguage === 'en') {
    return storedLanguage;
  }

  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem('taurabots-language', language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      isEnglish: language === 'en',
      setLanguage,
      toggleLanguage: () => setLanguage((value) => (value === 'pt' ? 'en' : 'pt')),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
