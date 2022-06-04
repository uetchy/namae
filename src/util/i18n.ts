import i18n from 'i18next';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const TRANSLATION_VERSION = '18';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [LocalStorageBackend, XHR],
      backendOptions: [
        {
          versions: {
            en: TRANSLATION_VERSION,
            de: TRANSLATION_VERSION,
            fr: TRANSLATION_VERSION,
            ja: TRANSLATION_VERSION,
            'zh-Hans': TRANSLATION_VERSION,
            'zh-Hant': TRANSLATION_VERSION,
            'pt-BR': TRANSLATION_VERSION,
            es: TRANSLATION_VERSION,
            it: TRANSLATION_VERSION,
            ru: TRANSLATION_VERSION,
            nl: TRANSLATION_VERSION,
            id: TRANSLATION_VERSION,
          },
        },
      ],
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
