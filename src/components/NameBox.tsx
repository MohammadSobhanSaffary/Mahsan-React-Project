import { t } from "i18next";
import { useState, useContext, useEffect } from "react";
import { SearchDataInterface, appContext } from "../Context";
function NameBox(props: any) {
  const [name, setName] = useState<string>();
  const { setFilterItems }: any = useContext(appContext);
  const handleDelteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "Name")
    );
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setFilterItems((prev: SearchDataInterface) => {
        return { ...prev, name: name };
      });
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, [name]);

  return (
    <div className="w-[250px] h-[130px] rounded-lg bg-[#E9F3F0] flex flex-col items-center  gap-5 p-3">
      <div className="w-full flex items-center justify-between">
        <span className="text-[#A7C9B9] font-semibold text-lg">
          {t("Name (String)")}
        </span>
        <button
          className="text-[#AEB2B1] text-xl font-semibold"
          onClick={handleDelteFilter}
        >
          x
        </button>
      </div>
      <input
        className="py-2 px-3 w-full  rouned-3xl text-xs "
        placeholder="Enter value"
        onChange={(e: any) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
}

export default NameBox;
