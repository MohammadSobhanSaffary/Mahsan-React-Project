import { AiOutlineDown } from "react-icons/ai";
import {
  useContext,
  useState,
  useEffect,
  ChangeEvent,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import { t } from "i18next";
import { FilterItemsInterface, Values, appContext } from "../Context";

interface AgeRange {
  age1: string;
  age2: string;
}
interface Props {
  setFilters: Dispatch<SetStateAction<string[]>>;
}
const BetweenAgeBox: FC<Props> = (props) => {
  //#################//
  //#### STATES #####//
  //#################//

  const [openToggle, setOpenToggle] = useState(false);
  const [ageRange, setAgeRange] = useState<AgeRange>({ age1: "", age2: "" });
  const contextValues: Values = useContext(appContext);

  //####################//
  //##### HANDLERS #####//
  //####################//

  const handleDeleteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "BetweenAge")
    );
    contextValues.setFilterItems((prev: FilterItemsInterface) => {
      return { ...prev, range_age: [] };
    });
  };

  const handleToggle = () => {
    setOpenToggle((prev) => !prev);
  };
  const addExactAgeBox = () => {
    props.setFilters((prev: string[]) =>
      !prev.includes("ExactAge") ? [...prev, "ExactAge"] : prev
    );
  };

  const handleFromAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeRange((prev: AgeRange) => {
      return { ...prev, age1: e.target.value };
    });
  };
  const handleToAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeRange((prev: AgeRange) => {
      return { ...prev, age2: e.target.value };
    });
  };

  const handleCloseWithClickOnBox = () => {
    openToggle ? setOpenToggle(false) : null;
  };

  //##################//
  //#### EFFECTS #####//
  //##################//
  useEffect(() => {
    const timeout = setTimeout(() => {
      contextValues.setFilterItems((prev: FilterItemsInterface) => {
        if (ageRange?.age1 !== "" && ageRange?.age2 !== "")
          return {
            ...prev,
            range_age:
              ageRange?.age1 !== undefined && ageRange?.age2 !== undefined
                ? [+ageRange?.age1, +ageRange?.age2]
                : [],
          };
        return { ...prev, range_age: [] };
      });
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [ageRange]);
  // ############### //
  // ##### JSX ##### //
  // ############### //
  return (
    <div
      className="relative w-[250px] h-[210px] rounded-lg bg-[#E9F3F0] flex flex-col items-center  gap-5 p-3"
      onClick={handleCloseWithClickOnBox}
    >
      <div className="w-full flex items-center justify-between">
        <span className="text-[#A7C9B9] font-semibold text-lg">
          {t("Age (Number)")}
        </span>
        <button
          className="text-[#AEB2B1] text-xl font-semibold"
          onClick={handleDeleteFilter}
        >
          x
        </button>
      </div>
      <div className="flex flex-col w-full item-center gap-4">
        <div className="w-full flex flex-col items-center">
          <div
            onClick={handleToggle}
            className="cursor-pointer w-[230px] flex items-center justify-between py-2 px-3 bg-white rounded-3xl"
          >
            <span className="text-xs text-gray-500 font-light">
              {t("Between")}
            </span>
            <AiOutlineDown />
          </div>
          {openToggle && (
            <div
              className="absolute w-[230px]  flex flex-col items-center  cursor-pointer top-[100px] bg-white rounded-md shadow-md mt-2"
              onClick={handleToggle}
            >
              <span
                className="text-xs font-light p-2 self-start"
                onClick={addExactAgeBox}
              >
                {t("Exact")}
              </span>
              <span className="text-xs font-light  p-2 self-start">
                {t("between")}
              </span>
            </div>
          )}
        </div>

        <input
          type="number"
          placeholder="Enter Value 1"
          className="w-full rounded-3xl text-xs font-light py-2 px-3"
          onChange={handleFromAge}
        />
        <input
          type="number"
          placeholder="Enter Value 2"
          className="w-full rounded-3xl text-xs font-light py-2 px-3"
          onChange={handleToAge}
        />
      </div>
    </div>
  );
};

export default BetweenAgeBox;
