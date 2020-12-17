import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import frTranslations from './translations/fr.json';

const resources = {
    en: {
        translation: enTranslations
    },
    es: {
        translation: esTranslations
    },
    fr: {
        translation: frTranslations
    }
};

export const fallbackLanguage = 'en';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: fallbackLanguage,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
