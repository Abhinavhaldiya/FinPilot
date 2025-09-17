import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    ns: ["dashboard", "claims", "addClaim", "auth"],
    defaultNS: "dashboard",
    debug: true,
    lng: "en",
    fallbackLng: "en",
    returnObjects: true,
     backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;
