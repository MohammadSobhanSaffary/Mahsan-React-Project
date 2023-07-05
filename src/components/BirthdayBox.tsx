import { t } from "i18next";

function BirthdayBox(props: any) {
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
      <input
        className="p-2 pl-3 rouned-3xl w-full cursor-pointer"
        placeholder="Choose Date Value"
        type="date"
      />
    </div>
  );
}

export default BirthdayBox;
