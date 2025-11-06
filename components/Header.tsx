import React from 'react';

// FIX: Provided component implementation for Header, which was missing.
interface HeaderProps {
  title: string;
  showBackButton: boolean;
  onBack: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBack, children }) => {
  return (
    <header className="bg-[#22A9DF] text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center min-w-0">
          {showBackButton && (
            <button onClick={onBack} className="me-2 md:me-4 hover:bg-[#1f98c8] rounded-full p-2 flex-shrink-0" aria-label="Go back">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <h1 className="text-xl font-bold truncate">{title}</h1>
        </div>
        <div className="flex items-center flex-shrink-0">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
