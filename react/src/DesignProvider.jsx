import React, { createContext, useEffect, useState } from 'react';

export const DesignContext = createContext();

export function DesignProvider({ children }) {
  // טען את ההגדרות מ-localStorage אם יש, אחרת ברירת מחדל
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('designSettings');
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
        themeColor: '#6466f1',
        font: "'Heebo', sans-serif",
        background: "url('/img/3.jpg')",
      };
  });

  // עידכון ה-localStorage וה-CSS כאשר ההגדרות משתנות
  useEffect(() => {
    if (settings) {
      localStorage.setItem('designSettings', JSON.stringify(settings));
      const root = document.documentElement;
      root.style.setProperty('--main-color', settings.themeColor);
      root.style.setProperty('--font', settings.font);
      root.style.setProperty('--main-background', settings.background);
    }
  }, [settings]);

  return (
    <DesignContext.Provider value={{ settings, setSettings }}>
      {children}
    </DesignContext.Provider>
  );
}
