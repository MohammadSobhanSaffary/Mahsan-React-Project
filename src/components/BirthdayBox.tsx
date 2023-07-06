import { t } from "i18next";
import { useState } from "react";
function BirthdayBox(props: any) {
  const [date, setDate] = useState();
  const iHandleChangeDate = (e: any) => {
    setDate(e.target.value);
  };
  const handleDelteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "Birthday")
    );
  };
  return (
    <div className="w-[250px] h-[130px] rounded-lg bg-[#E9F3F0] flex flex-col items-center  gap-5 p-3">
      <div className="w-full flex items-center justify-between">
        <span className="text-[#A7C9B9] font-semibold text-lg">
          {t("Birthday(Date)")}
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
          value={date}
          onChange={iHandleChangeDate}
          className="px-3 py-2 rouned-3xl w-[20%] cursor-pointer"
          type="date"
        />
        <span className={[undefined, false, null].includes(date)
            ?"w-[80%] text-xs text-gray-300 ":"w-[80%] text-xs text-gray-600"}>
          {[undefined, false, null].includes(date)
            ? t("Choose Date Value")
            : date}
        </span>
      </div>
    </div>
  );
}

export default BirthdayBox;
