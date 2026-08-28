import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface HeaderProps {
  title: string;
  showBackButton: boolean;
  onBack: () => void;
  brandAsset?: React.ReactNode;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBack, brandAsset, children }) => {
  const { t } = useTranslation();
  const isHome = title === t('appName');

  return (
    <header className="header-surface safe-top sticky top-0 z-30 text-text-main backdrop-blur">
      <div className="container mx-auto flex min-h-14 items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <div className="flex items-center min-w-0">
          {showBackButton && (
            <button onClick={onBack} className="icon-button me-2 flex-shrink-0" aria-label="Volver">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">{brandAsset}<h1 className="text-lg font-extrabold tracking-tight truncate">{isHome ? 'Bokatas' : title}</h1></div>
            {isHome && (
              <p className="text-xs text-text-light truncate">{t('headerSubtitle')}</p>
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
