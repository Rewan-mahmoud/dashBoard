import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importing the translation files
import translationEN from '../locales/en/en.json';
import translationAR from '../locales/ar/ar.json';

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
