import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { englishDictionry } from "../translations/en";
import { persianDictionry } from "../translations/fa";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { useContext } from "react";
import { appContext } from "./Context";

function App() {
  const { searchData }: any = useContext(appContext);
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
      <main className="w-[70%] flex flex-col items-center justify-center gap-5">
        {searchData.length === 0 ? <></> : <Table />}
      </main>
    </div>
  );
}

export default App;
