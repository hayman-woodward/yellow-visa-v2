'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function DashboardThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Carregar tema do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // Salvar tema no localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('dashboard-theme', newTheme);
  };

  // Evita flash durante SSR - agora light por padrão
  if (!mounted) {
    return <div className='dashboard-light'>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`dashboard-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      'useDashboardTheme must be used within DashboardThemeProvider'
    );
  }
  return context;
}
