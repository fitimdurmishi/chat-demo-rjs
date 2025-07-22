import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ReactCountryFlag from "react-country-flag";

const getSystemTheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const LanguageSelector = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(getSystemTheme());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

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

  // Theme classes
  const bgClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const hoverClass = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const dropdownBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const dropdownTextClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[120px] h-full ${bgClass} ${hoverClass}`}
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
        <div className={`absolute top-full mt-2 right-0 rounded-lg shadow-lg z-50 min-w-[180px] max-h-60 overflow-y-auto border ${borderClass} ${dropdownBgClass}`}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 transition-colors flex items-center space-x-3 text-sm ${hoverClass} ${dropdownTextClass} ${i18n.language === language.code ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
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