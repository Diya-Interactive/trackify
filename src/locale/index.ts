import en from "./en.json";
import sv from "./sv.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.on("initialized", () => {
    if (!i18n.language || i18n.language === "sv") {
        i18n.changeLanguage("en");
    }
});

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            sv: { translation: sv },
            en: { translation: en },
        },
        fallbackLng: ["sv", "en"],
        detection: {
            order: ["querystring", "localStorage", "cookie", "navigator", "htmlTag"],
            caches: ["localStorage", "cookie"],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
