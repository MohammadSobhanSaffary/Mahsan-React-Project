import React, { SetStateAction, createContext, useState, FC } from "react";
export interface FilterItemsInterface {
  exact_age: number[] | [];
  range_age: number[] | null[] | [];
  birth_date: Date | string | undefined;
  interests: string[];
  name: string;
}
export interface SearchDataInterface {
  age: number;
  birth_date: Date | string;
  interests: string[];
  name: string;
}
export interface Values {
  filterItems: FilterItemsInterface;
  setFilterItems: React.Dispatch<SetStateAction<FilterItemsInterface>>;
  searchData: SearchDataInterface[];
  setSearchData: React.Dispatch<SetStateAction<SearchDataInterface[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const appContext = createContext<Values>({} as Values);

const ContextProvider: FC<{ children: React.ReactNode }> = (props) => {
  const [filterItems, setFilterItems] = useState<FilterItemsInterface>({
    birth_date: "",
    exact_age: [],
    range_age: [],
    interests: [],
    name: "",
  });
  const [searchData, setSearchData] = useState<SearchDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <appContext.Provider
      value={{
        filterItems,
        setFilterItems,
        searchData,
        setSearchData,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};
export default ContextProvider;
