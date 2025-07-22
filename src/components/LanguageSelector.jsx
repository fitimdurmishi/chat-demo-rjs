import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ReactCountryFlag from "react-country-flag";

const LanguageSelector = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: t('languages.en'), countryCode: 'US' },
    { code: 'es', name: t('languages.es'), countryCode: 'ES' },
    { code: 'fr', name: t('languages.fr'), countryCode: 'FR' },
    { code: 'de', name: t('languages.de'), countryCode: 'DE' },
    { code: 'it', name: t('languages.it'), countryCode: 'IT' },
    { code: 'pt', name: t('languages.pt'), countryCode: 'PT' },
    { code: 'ru', name: t('languages.ru'), countryCode: 'RU' },
    { code: 'zh', name: t('languages.zh'), countryCode: 'CN' },
    { code: 'ja', name: t('languages.ja'), countryCode: 'JP' },
    { code: 'ko', name: t('languages.ko'), countryCode: 'KR' },
    { code: 'ar', name: t('languages.ar'), countryCode: 'SA' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-3 bg-gray-800 hover:bg-gray-700 
                   rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-white text-sm min-w-[120px] h-full"
        aria-label={t('common.language')}
        type="button"
      >
        <span className="text-sm">
          <ReactCountryFlag countryCode={currentLanguage.countryCode} svg style={{ width: '1.5em', height: '1.5em' }} />
        </span>
        <span className="truncate">{currentLanguage.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 
                        rounded-lg shadow-lg z-50 min-w-[180px] max-h-60 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors
                        flex items-center space-x-3 text-white text-sm
                        ${i18n.language === language.code ? 'bg-gray-700' : ''}`}
              type="button"
            >
              <span className="text-lg">
                <ReactCountryFlag countryCode={language.countryCode} svg style={{ width: '1.5em', height: '1.5em' }} />
              </span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

LanguageSelector.propTypes = {
  className: PropTypes.string
};

export default LanguageSelector;
