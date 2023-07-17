import { Values, appContext } from "../Context";
import { FC, useContext } from "react";
import { SearchDataInterface } from "../Context";
import { t } from "i18next";

const Table: FC = () => {
  const contextValues: Values = useContext(appContext);
  const tableHeadItems: string[] = [
    "Name",
    "Family",
    "Age",
    "Interests",
    "Birthday",
  ];
  return (
    <div className="w-[90%] h-[700px] overflow-y-auto">
      <table>
        <thead className="sticky top-0">
          <tr>
            {tableHeadItems.map((item: string) => (
              <th>{t(item)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contextValues.searchData.map(
            (el: SearchDataInterface, index: number) => {
              return (
                <tr key={index}>
                  <td>{el.name.split(" ")[0]}</td>
                  <td>{el.name.split(" ")[1]}</td>
                  <td>{el.age}</td>
                  <td>
                    {el.interests.map((interest: string, index: number) => (
                      <span>{`${interest} ${
                        index !== el.interests.length - 1 ? "," : ""
                      } `}</span>
                    ))}
                  </td>
                  <td>{el.birth_date.toString()}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default Table;
