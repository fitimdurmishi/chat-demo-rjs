import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const LanguageSelector = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
    { code: 'es', name: t('languages.es'), flag: '🇪🇸' },
    { code: 'fr', name: t('languages.fr'), flag: '🇫🇷' },
    { code: 'de', name: t('languages.de'), flag: '🇩🇪' },
    { code: 'it', name: t('languages.it'), flag: '🇮🇹' },
    { code: 'pt', name: t('languages.pt'), flag: '🇵🇹' },
    { code: 'ru', name: t('languages.ru'), flag: '🇷🇺' },
    { code: 'zh', name: t('languages.zh'), flag: '🇨🇳' },
    { code: 'ja', name: t('languages.ja'), flag: '🇯🇵' },
    { code: 'ko', name: t('languages.ko'), flag: '🇰🇷' },
    { code: 'ar', name: t('languages.ar'), flag: '🇸🇦' },
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
        <span className="text-lg">{currentLanguage.flag}</span>
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
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
              {i18n.language === language.code && (
                <svg className="w-4 h-4 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
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
