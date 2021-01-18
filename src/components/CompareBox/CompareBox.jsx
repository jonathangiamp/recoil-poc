import { useEffect, useContext } from "react";

import { getProprietyForOneSale } from "../../recoil";
import { useRecoilStateLoadable } from "recoil";
import SalesContext from "../../utils/salesContext";

const ACTIONS = ["increase", "decrease"];

const CompareBox = ({ propriety }) => {
  const saleId = useContext(SalesContext);
  const [state, setState] = useRecoilStateLoadable(
    getProprietyForOneSale({ id: saleId, propriety })
  );

  useEffect(() => {
    const interval = setInterval(
      () => setState(ACTIONS[Math.floor(Math.random() * ACTIONS.length)]),
      Math.random() * (3000 - 100) + 100
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (state.state === "loading") return <p>loading...</p>;
  if (state.state === "hasError") return null;

  const filteredValues = Object.entries(state.contents.value).filter(
    ([_, data]) => data !== undefined
  );

  return (
    <article>
      <h2>{propriety}</h2>
      {filteredValues.map(([key, data]) => (
        <p key={key}>
          {key}:{data} - {state.contents.goal[key]}
        </p>
      ))}
    </article>
  );
};

export default CompareBox;
