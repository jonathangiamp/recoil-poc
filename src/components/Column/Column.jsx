import { useRecoilValueLoadable } from "recoil";

import CompareBox from "../CompareBox";
import { proprietiesState } from "../../recoil";

const Column = () => {
  const proprieties = useRecoilValueLoadable(proprietiesState);

  if (proprieties.state === "loading") return <p>loading...</p>;
  if (proprieties.state === "hasError") return null;

  return (
    <div>
      {proprieties.contents.map((propriety) => (
        <CompareBox key={propriety} propriety={propriety} />
      ))}
    </div>
  );
};

export default Column;
