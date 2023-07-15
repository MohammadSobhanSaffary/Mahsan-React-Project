import { t } from "i18next";
import {
  useState,
  useContext,
  FC,
  ChangeEvent,
} from "react";
import NameBox from "./NameBox";
import SelectFilters from "./SelectFilters";
import BirthdayBox from "./BirthdayBox";
import InterestBox from "./InterestBox";
import ExactAgeBox from "./ExactAgeBox";
import BetweenAgeBox from "./BetweenAge";
import { ToastContainer } from "react-toastify";
import { Values, appContext } from "../Context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:5000";
const Navbar: FC = () => {
  //#################//
  //#### STATES #####//
  //#################//

  const [filters, setFilters] = useState<string[]>([]);
  const [query, setQuery] = useState<string>();
  const contextValues: Values = useContext(appContext);

  //#####################//
  //#### HANDLERS #####//
  //####################//

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

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const addAgeFilter = () => {
    if (!filters.includes("ExactAge")) {
      setFilters((prev) => [...prev, "ExactAge"]);
    }
    if (!filters.includes("BetweenAge")) {
      setFilters((prev) => [...prev, "BetweenAge"]);
    }
  };

  const handleClearFilters = () => {
    setFilters([]);
    contextValues.setSearchData([]);
    contextValues.setFilterItems({
      birth_date: "",
      exact_age: [],
      range_age: [],
      interests: [],
      name: "",
    });
  };

  //###############//
  //#### FETCH ####//
  //###############//

  const SearchRequest = async () => {
    try {
      contextValues.setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/api/v1/search`, {
        filters: contextValues.filterItems,
        query: query,
      });
      contextValues.setIsLoading(false);
      contextValues.setSearchData(res.data);
      res.data.length === 0
        ? toast.info(t("Nothing Found"))
        : toast.success(t("Search Completed"));
      console.log(res.data);
    } catch (err: any) {
      contextValues.setIsLoading(false);
      toast.error(err.message);
      console.error(err);
    }
  };

  // ################ //
  // ##### JSX ##### //
  // ############### //

  return (
    <div className="w-[350px] h-full bg-[#F7F7F8] rounded-r-sm shadow-md  pt-8 px-6 flex flex-col items-center gap-8">
      <div className="w-full flex items-center gap-4 flex-col">
        <span className="text-xl text-[#BEC1C5] font-semibold self-start">
          {t("Search")}
        </span>
        <input className="w-[90%] px-3 py-2" onChange={handleChangeQuery} />
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
      <div className="w-full h-[70%]  overflow-y-auto flex flex-col items-center gap-5">
        {filters.map((el: string, index: number) => {
          if (el === "Name") {
            return <NameBox key={index} setFilters={setFilters} />;
          } else if (el === "Birthday") {
            return <BirthdayBox key={index} setFilters={setFilters} />;
          } else if (el === "Interest") {
            return <InterestBox key={index} setFilters={setFilters} />;
          } else if (el === "ExactAge") {
            return <ExactAgeBox key={index} setFilters={setFilters} />;
          } else if (el === "BetweenAge") {
            return <BetweenAgeBox key={index} setFilters={setFilters} />;
          }
        })}
      </div>
      <div className="w-full flex items-center  justify-around">
        <button
          disabled={contextValues.isLoading}
          onClick={handleClearFilters}
          className="w-28 text-blue-600 font-semibold text-sm"
        >
          {t("Clear Filters")}
        </button>
        <button
          disabled={contextValues.isLoading}
          className={`${
            contextValues.isLoading ? "bg-gray-400" : "bg-blue-600"
          } w-28 rounded-3xl text-white font-semibold  text-sm py-2 px-2 `}
          onClick={SearchRequest}
        >
          {t("Search")}
        </button>
      </div>
      <ToastContainer
        position="bottom-center"
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
};

export default Navbar;
