import { createContext, useState } from "react";
export interface FilterItemsInterface {
  exact_age: number[] | [];
  range_age: number[] | [];
  birth_date: Date | "";
  interests: string[];
  name: string;
}
export interface SearchDataInterface {
  age: number;
  birth_date: Date|string;
  interests: string[];
  name: string;
}
export const appContext = createContext();

function ContextProvider({ children }: any) {
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
      {children}
    </appContext.Provider>
  );
}
export default ContextProvider;
