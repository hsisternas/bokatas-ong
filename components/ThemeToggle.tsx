import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  const { t } = useTranslation();
  const label = isDark ? t('themeLight') : t('themeDark');

  return (
    <button
      onClick={onToggle}
      className="text-white hover:bg-black/10 rounded-full p-2 transition-colors"
      aria-label={label}
      title={label}
    >
      <span className="material-symbols-outlined text-2xl opacity-80 transition-opacity">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
