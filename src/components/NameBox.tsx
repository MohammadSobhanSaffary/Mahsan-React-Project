import { t } from "i18next";

function NameBox(props: any) {
  const handleDelteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "Name")
    );
  };
  return (
    <div className="w-[250px] h-[130px] rounded-lg bg-[#E9F3F0] flex flex-col items-center  gap-5 p-3">
      <div className="w-full flex items-center justify-between">
        <span className="text-[#A7C9B9] font-semibold text-lg">
          {t("Name(String)")}
        </span>
        <button
          className="text-[#AEB2B1] text-xl font-semibold"
          onClick={handleDelteFilter}
        >
          x
        </button>
      </div>
      <input className="p-2 w-full pl-3 rouned-3xl" placeholder="Enter value" />
    </div>
  );
}

export default NameBox;
