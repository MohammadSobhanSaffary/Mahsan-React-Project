import { Values, appContext } from "../Context";
import { useContext } from "react";
import { SearchDataInterface } from "../Context";
import { t } from "i18next";
function Table() {
  const contextValues: Values = useContext(appContext);
  return (
    <div className="w-[90%] h-[700px] overflow-y-auto">
      <table>
        <thead>
          <tr className="sticky top-0">
            <th>{t("Name")}</th>
            <th>{t("Family")}</th>
            <th>{t("Age")}</th>
            <th>{t("Interests")}</th>
            <th>{t("Birthday")}</th>
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
}

export default Table;
