import { AiOutlineDown } from "react-icons/ai";
import { useContext, useState } from "react";
import { t } from "i18next";
import { FilterItemsInterface, appContext } from "../Context";
function ExactAgeBox(props: any) {
  const [openToggle, setOpenToggle] = useState(false);
  const { setFilterItems }: any = useContext(appContext);

  const handleDelteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "ExactAge")
    );
  };
  const handleToggle = () => {
    setOpenToggle((prev) => !prev);
  };
  const addBetweenAgeBox = () => {
    props.setFilters((prev: any) =>
      !prev.includes("BetweenAge") ? [...prev, "BetweenAge"] : prev
    );
  };
  const handleExactAgeChange = (e: any) => {
    setFilterItems((prev: FilterItemsInterface) => {
      return { ...prev, exact_age: [e.target.value] };
    });
  };
  return (
    <div className="relative  w-[250px] h-[150px] rounded-lg bg-[#E9F3F0] flex flex-col items-center  gap-5 p-3">
      <div className="w-full flex items-center justify-between">
        <span className="text-[#A7C9B9] font-semibold text-lg">
          {t("Age (Number)")}
        </span>
        <button
          className="text-[#AEB2B1] text-xl font-semibold"
          onClick={handleDelteFilter}
        >
          x
        </button>
      </div>
      <div className="flex flex-col w-full item-center gap-4">
        <div>
          <div className="w-full flex flex-col items-center">
            <div
              onClick={handleToggle}
              className="cursor-pointer w-[230px] flex items-center justify-between py-2 px-3 bg-white rounded-3xl"
            >
              <span className="text-xs text-gray-500 font-light">
                {t("Exact")}
              </span>
              <AiOutlineDown />
            </div>
            {openToggle && (
              <div
                className="absolute w-[230px]  flex flex-col items-center  cursor-pointer top-[100px] bg-white rounded-md shadow-md mt-2"
                onClick={handleToggle}
              >
                <span className="text-xs font-light  p-2 self-start">
                  {t("Exact")}
                </span>
                <span
                  className="text-xs font-light  p-2 self-start"
                  onClick={addBetweenAgeBox}
                >
                  {t("between")}
                </span>
              </div>
            )}
          </div>
        </div>
        <input
          type="number"
          placeholder="Enter Value 1"
          className="w-full rounded-3xl text-xs font-light py-2 px-3"
          onChange={handleExactAgeChange}
        />
      </div>
    </div>
  );
}

export default ExactAgeBox;
