// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

// i18next
import {join} from 'path';
import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: join(__dirname, '../public/locales/{{lng}}/{{ns}}.json'),
    },
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
