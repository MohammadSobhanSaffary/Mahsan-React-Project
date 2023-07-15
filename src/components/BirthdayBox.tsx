import { t } from "i18next";
import { ChangeEvent, useContext } from "react";
import { FilterItemsInterface, Values, appContext } from "../Context";
function BirthdayBox(props: any) {
  //#################//
  //#### STATES #####//
  //#################//
  const { setFilterItems, filterItems }: any = useContext(appContext);
  const contextValues: Values = useContext(appContext);
  //#####################//
  //#### HANDELERS #####//
  //####################//
  const iHandleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterItems((prev: FilterItemsInterface) => {
      return { ...prev, birth_date: e.target.value };
    });
  };
  const handleDelteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "Birthday")
    );
    contextValues.setFilterItems((prev: FilterItemsInterface) => {
      return { ...prev, birth_date: "" };
    });
  };
  // ################ //
  // ##### JSX ##### //
  // ############### //
  return (
    <div className="w-[250px] h-[130px] rounded-lg bg-[#E9F3F0] flex flex-col items-center  gap-5 p-3">
      <div className="w-full flex items-center justify-between">
        <span className="text-[#A7C9B9] font-semibold text-lg">
          {t("Birthday (Date)")}
        </span>
        <button
          className="text-[#AEB2B1] text-xl font-semibold"
          onClick={handleDelteFilter}
        >
          x
        </button>
      </div>
      <div className="w-full bg-white rounded-3xl flex items-center ">
        <input
          value={contextValues.filterItems.birth_date as string}
          onChange={iHandleChangeDate}
          className="px-3 py-2 rouned-3xl w-[20%] cursor-pointer"
          type="date"
        />
        <span
          className={
            contextValues.filterItems.birth_date === ""
              ? "w-[80%] text-xs text-gray-300 "
              : "w-[80%] text-xs text-gray-600"
          }
        >
          {contextValues.filterItems.birth_date === ""
            ? t("Choose Date Value")
            : filterItems.birth_date}
        </span>
      </div>
    </div>
  );
}

export default BirthdayBox;
