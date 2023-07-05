import { t } from "i18next";
import { useState } from "react";
import NameBox from "./NameBox";
import SelectFilters from "./SelectFilters";
import BirthdayBox from "./BirthdayBox";
import InterestBox from "./InterestBox";
function Navbar() {
  const [filters, setFilters] = useState<string[]>([]);
  const addNameFilter = () => {
    setFilters((prev) => (!prev.includes("Name") ? [...prev, "Name"] : prev));
  };

  const addBirthdayFilter = () => {
    setFilters((prev) =>
      !prev.includes("Birthday") ? [...prev, "Birthday"] : prev
    );
  };

  const addInterestFilter = () => {
    setFilters((prev) =>
      !prev.includes("Interest") ? [...prev, "Interest"] : prev
    );
  };

  return (
    <div
      className="w-[350px] h-full bg-[#F7F7F8] rounded-r-sm shadow-md  p-8 flex flex-col items-center gap-8"
    >
      <div className="w-full flex items-center gap-4 flex-col">
        <span className="text-xl text-[#BEC1C5] font-semibold self-start">
          {t("Search")}
        </span>
        <input className="w-full px-3 py-2" />
      </div>
      <div className="w-full flex items-center gap-4 flex-col mb-5 relative">
        <span className="text-xl text-[#BEC1C5] font-semibold self-start">
          {t("Filters")}
        </span>
        <span className=" ml-5 mt-3 text-md text-[#BEC1C5] font-semibold self-start">
          {t("Select Filters")}
        </span>
        <SelectFilters
          addNameFilter={addNameFilter}
          addBirthdayFilter={addBirthdayFilter}
          addInterestFilter={addInterestFilter}
        />
      </div>
      <div className="w-full max-h-[400px] flex flex-col items-center gap-5">
        {filters.map((el: string, index: number) => {
          if (el === "Name") {
            return <NameBox key={el} setFilters={setFilters} />;
          } else if (el === "Birthday") {
            return <BirthdayBox key={el} setFilters={setFilters} />;
          } else if (el === "Interest") {
            return <InterestBox setFilters={setFilters} />;
          }
        })}
      </div>
      <div className="w-full flex items-center  justify-around">
        <button className="w-36 text-blue-600 font-semibold text-sm">
          {t("Clear Filters")}
        </button>
        <button className="w-28 rounded-3xl text-white font-semibold bg-blue-600 text-sm py-2 px-2">
          {t("Search")}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
