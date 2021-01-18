import { useRecoilValueLoadable } from "recoil";

import styles from "./Table.module.css";
import Column from "../Column";
import { salesState } from "../../recoil";
import SalesContext from "../../utils/salesContext";

const Table = () => {
  const sales = useRecoilValueLoadable(salesState);

  if (sales.state === "loading") return <p>loading...</p>;
  if (sales.state === "hasError") return null;

  return (
    <main className={styles.main}>
      <div className={styles.table}>
        {sales.contents.map((saleId) => (
          <SalesContext.Provider key={saleId} value={saleId}>
            <Column />
          </SalesContext.Provider>
        ))}
      </div>
    </main>
  );
};

export default Table;
