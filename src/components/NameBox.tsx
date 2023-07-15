import { t } from "i18next";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import {
  FilterItemsInterface,
  Values,
  appContext,
} from "../Context";
export interface Props {
  setFilters: Dispatch<SetStateAction<string[]>>;
}
function NameBox(props: Props) {
  //#################//
  //#### STATES #####//
  //#################//
  const contextValues: Values = useContext(appContext);
  const [inputName, setInputName] = useState<string>("");
  //#####################//
  //#### HANDELERS #####//
  //####################//
  const handleDelteFilter = () => {
    props.setFilters((prev: string[]) =>
      prev.filter((el: string) => el !== "Name")
    );
    contextValues.setFilterItems((prev: FilterItemsInterface) => {
      return { ...prev, name: "" as string };
    });
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  //##################//
  //#### EFFECTS #####//
  //##################//
  useEffect(() => {
    const timeOut = setTimeout(() => {
      contextValues.setFilterItems((prev: FilterItemsInterface) => {
        return { ...prev, name: inputName };
      });
    }, 10);
    return () => {
      clearTimeout(timeOut);
    };
  }, [inputName]);
  // ############### //
  // ##### JSX ##### //
  // ############### //
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
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NameBox;
