import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import type { Locale } from '../types';

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:bg-[#1f98c8] rounded-full p-2"
        aria-label="Change language"
      >
        <span className="material-symbols-outlined text-2xl">language</span>
      </button>

      {isOpen && (
        <div className="absolute end-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <ul className="py-1">
            {languages.map(({ code, name, flag }) => (
              <li key={code}>
                <button
                  onClick={() => handleLanguageChange(code)}
                  className={`w-full text-start px-4 py-2 text-sm ${
                    locale === code ? 'bg-[#22A9DF]/20 text-[#1f98c8]' : 'text-gray-700'
                  } hover:bg-gray-100`}
                >
                  <span className="me-2">{flag}</span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
