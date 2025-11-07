import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface HeaderProps {
  title: string;
  showBackButton: boolean;
  onBack: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBack, children }) => {
  const { t } = useTranslation();
  const isHome = title === t('appName');

  return (
    <header className="bg-gradient-to-br from-primary to-primary-dark text-white shadow-md sticky top-0 z-10 rounded-b-2xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center min-w-0">
          {showBackButton && (
            <button onClick={onBack} className="me-2 md:me-4 hover:bg-black/10 rounded-full p-2 flex-shrink-0 transition-colors" aria-label="Go back">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold truncate">{title}</h1>
            {isHome && (
              <p className="text-sm font-light text-white/80 truncate">{t('headerSubtitle')}</p>
            )}
          </div>
        </div>
        <div className="flex items-center flex-shrink-0">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;