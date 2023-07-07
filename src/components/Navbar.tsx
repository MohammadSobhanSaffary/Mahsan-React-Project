import { t } from "i18next";
import { useState, useContext } from "react";
import NameBox from "./NameBox";
import SelectFilters from "./SelectFilters";
import BirthdayBox from "./BirthdayBox";
import InterestBox from "./InterestBox";
import ExactAgeBox from "./ExactAgeBox";
import BetweenAgeBox from "./BetweenAge";
import { ToastContainer } from "react-toastify";
import { appContext } from "../Context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:5000";
function Navbar() {
  const [filters, setFilters] = useState<string[]>([]);
  const { setSearchData, setIsLoading, isLoading, filterItems }: any =
    useContext(appContext);

  //###################//
  //#### HANDELERS ####//
  //###################//
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

  const addAgeFilter = () => {
    setFilters((prev) =>
      !prev.includes("ExactAge") || !prev.includes("BetweenAge")
        ? [...prev, "ExactAge", "BetweenAge"]
        : prev
    );
  };
  const handleClearFilters = () => {
    setFilters([]);
  };
  //###############//
  //#### FETCH ####//
  //###############//
  const SearchRequest = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/api/v1/search`, {
        filters: filterItems,
        query: "",
      });
      setIsLoading(false);
      setSearchData(res.data);
      res.data.length === 0
        ? toast.info(t("Nothing Found"))
        : toast.success(t("Search Completed"));
      console.log(res.data);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message);
      console.error(err);
    }
  };
  return (
    <div className="w-[350px] h-full bg-[#F7F7F8] rounded-r-sm shadow-md  p-8 flex flex-col items-center gap-8">
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
          addAgeFilter={addAgeFilter}
        />
      </div>
      <div className="w-full max-h-[500px] overflow-y-auto flex flex-col items-center gap-5">
        {filters.map((el: string, index: number) => {
          if (el === "Name") {
            return <NameBox key={el} setFilters={setFilters} />;
          } else if (el === "Birthday") {
            return <BirthdayBox key={el} setFilters={setFilters} />;
          } else if (el === "Interest") {
            return <InterestBox key={el} setFilters={setFilters} />;
          } else if (el === "ExactAge") {
            return <ExactAgeBox key={el} setFilters={setFilters} />;
          } else if (el === "BetweenAge") {
            return <BetweenAgeBox key={el} setFilters={setFilters} />;
          }
        })}
      </div>
      <div className="w-full flex items-center  justify-around">
        <button
          disabled={isLoading}
          onClick={handleClearFilters}
          className="w-36 text-blue-600 font-semibold text-sm"
        >
          {t("Clear Filters")}
        </button>
        <button
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-400" : "bg-blue-600"
          } w-28 rounded-3xl text-white font-semibold  text-sm py-2 px-2 `}
          onClick={SearchRequest}
        >
          {t("Search")}
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Navbar;
