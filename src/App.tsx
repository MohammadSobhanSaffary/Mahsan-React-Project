import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { englishDictionry } from "../translations/en";
import { persianDictionry } from "../translations/fa";
// import { t } from "i18next";
import Navbar from "./components/Navbar";
function App() {
  // set i18next
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: englishDictionry,
      },
      fa: {
        translation: persianDictionry,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
  return (
    <div className="w-full h-screen flex items-center justify-between">
      <Navbar />
      <main></main>
    </div>
  );
}

export default App;
