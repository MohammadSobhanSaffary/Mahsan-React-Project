import { t } from "i18next";
import { AiOutlineDown } from "react-icons/ai";
import { useState, useEffect } from "react";
function InterestBox(props: any) {
  const [openToggle, setOpenToggle] = useState(false);
  const [data, setData] = useState([
    { name: "Football", value: false },
    { name: "Basketball", value: false },
    { name: "Online gaming", value: false },
    { name: "Swimming", value: false },
  ]);

  const handleToggle = () => {
    setOpenToggle((prev) => !prev);
  };

  const handleDelteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "Interest")
    );
  };
  return (
    <div className="w-[250px] h-[130px] rounded-lg bg-[#E9F3F0] flex flex-col items-center  gap-5 p-3 relative">
      <div className="w-full flex items-center justify-between">
        <span className="text-[#A7C9B9] font-semibold text-lg">
          {t("Interest (Select)")}
        </span>
        <button
          className="text-[#AEB2B1] text-xl font-semibold"
          onClick={handleDelteFilter}
        >
          x
        </button>
      </div>

      <div className="w-full flex flex-col items-center">
        <div
          onClick={handleToggle}
          className="cursor-pointer w-[230px] flex items-center justify-between py-2 px-3 bg-white rounded-3xl"
        >
          <span className="text-xs text-gray-500 font-light">
            {t("Select")}
          </span>
          <AiOutlineDown />
        </div>
        {openToggle && (
          <div className="absolute w-[230px]  flex flex-col items-center  cursor-pointer top-[100px] bg-white rounded-md shadow-md mt-2">
            {data.map((el: any, index: number) => {
              return (
                <div
                  className={
                    index !== 3
                      ? "w-full flex items-center p-3 gap-3 border-b border-gray-400"
                      : "w-full flex items-center p-3 gap-3"
                  }
                >
                  <input
                    type="checkbox"
                    name={el.name}
                    value={el.value}
                    checked={el.value}
                    className=""
                    onChange={() => {
                      setData((prev: any) =>
                        prev.map((element: any) => {
                          if (element.name === el.name)
                            return { ...element, value: !element.value };
                          else return element;
                        })
                      );
                    }}
                  />
                  <label className="text-xs font-light">{t(el.name)}</label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterestBox;