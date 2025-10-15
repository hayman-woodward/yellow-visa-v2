'use client';

import { useDashboardTheme } from '../../context/ThemeContext';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useDashboardTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
        isDark ? 'bg-[#FFBD1A]' : 'bg-gray-300'
      }`}
      aria-label='Toggle theme'
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
