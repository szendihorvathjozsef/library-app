import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		ns: ["validation", "table"],
		whitelist: ["hu"],
		fallbackLng: "hu",
		debug: process.env.NODE_ENV === "development",

		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
