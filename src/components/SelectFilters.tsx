import { t } from "i18next";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
interface Props{
  addNameFilter:()=>void;
  addAgeFilter:()=>void;
  addInterestFilter:()=>void;
  addBirthdayFilter:()=>void;
}
function SelectFilters(props:Props) {
  const [openToggle, setOpenToggle] = useState(false);
  const handleToggle = () => {
    setOpenToggle((prev) => !prev);
  };
  return (
    <div>
      <div
        onClick={handleToggle}
        className="cursor-pointer w-[230px] flex items-center justify-between py-3 px-3 bg-white rounded-3xl"
      >
        <span className="text-xs text-gray-500 font-light">
          {t("Choose an item")}
        </span>
        <AiOutlineDown />
      </div>
      {openToggle && (
        <div
          onClick={handleToggle}
          className="absolute w-[230px]  flex flex-col items-center  cursor-pointer top-[135px] bg-white rounded-md shadow-md mt-2 z-30"
        >
          <span
            onClick={props.addNameFilter}
            className=" p-2 w-full  divide-x-2 text-xs font-light  selectItemsBorder  selectHover rounded-md pl-4 py-3"
          >
            {t("Name (String)")}
          </span>
          <span
            onClick={props.addAgeFilter}
            className=" p-2 w-full divide-x-2 text-xs font-light   selectItemsBorder selectHover  pl-4 py-3"
          >
            {t("Age (Number)")}
          </span>
          <span
            onClick={props.addInterestFilter}
            className=" p-2 w-full divide-x-2 text-xs font-light   selectItemsBorder selectHover  pl-4 py-3"
          >
            {t("Interest (Select)")}
          </span>
          <span
            onClick={props.addBirthdayFilter}
            className=" p-2 w-full divide-x-2 text-xs font-light     selectHover rounded-b-md pl-4 py-3"
          >
            {t("Birthday (Date)")}
          </span>
        </div>
      )}
    </div>
  );
}

export default SelectFilters;
