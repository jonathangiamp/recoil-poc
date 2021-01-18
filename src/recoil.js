import { selector, selectorFamily, atom, atomFamily } from "recoil";

/* atom used to save init data */
const initData = atom({
  key: "data/state",
  default: selector({
    key: "data/state/default",
    get: async () => {
      const response = await fetch("/api/pipedrive");
      return response.json();
    },
  }),
});

/* atom used to save sales list */
const salesState = atom({
  key: "data/state/sales",
  default: selector({
    key: "data/state/sales/default",
    get: ({ get }) => {
      const data = get(initData);
      const sales = data.data.reduce(
        (sales_id, { pipedrive_id: id }) => [...sales_id, id],
        []
      );
      return sales;
    },
  }),
});

/* atom used to save sales list */
const proprietiesState = atom({
  key: "data/state/proprieties",
  default: selector({
    key: "data/state/proprieties/default",
    get: ({ get }) => {
      const data = get(initData);
      const excludedProprieties = [
        "name",
        "pipedrive_id",
        "percentage_completed",
      ];

      /* As sale data share the same keys, I'm only using
       ** first element to determines data shape.
       */
      return Object.keys(data.data[0]).filter(
        (key) => !excludedProprieties.includes(key)
      );
    },
  }),
});

/*
 ** That's the tricky one.
 ** This atom family dynamically create atoms for all id/propriety combination.
 ** -> id variable represents sale ids
 ** -> propriety variable represents object data from pipedrive (visits, deals...).
 */
const proprietyState = atomFamily({
  key: "data/state/propriety",
  default: ({ id, propriety }) => {
    return selector({
      key: `data/state/propriety/${propriety}/${id}`,
      get: ({ get }) => {
        const data = get(initData);
        return data.data.find((elem) => elem.pipedrive_id === id)[propriety];
      },
    });
  },
});

const ACTION_MAP = { increase: 1, decrease: -1 };

/***** SELECTORS *****/
const getProprietyForOneSale = selectorFamily({
  key: "data/propriety/unique",

  get: ({ id, propriety }) => ({ get }) => {
    const data = get(proprietyState({ id, propriety }));
    return data;
  },

  set: ({ id, propriety }) => ({ get, set }, order) => {
    if (!Object.keys(ACTION_MAP).includes(order)) return;

    const currentData = get(proprietyState({ id, propriety }));
    const newValue = {
      week:
        currentData.value.week !== undefined
          ? currentData.value.week + ACTION_MAP[order]
          : undefined,
      month:
        currentData.value.month !== undefined
          ? currentData.value.month + ACTION_MAP[order]
          : undefined,
      quarter:
        currentData.value.quarter !== undefined
          ? currentData.value.quarter + ACTION_MAP[order]
          : undefined,
      year:
        currentData.value.year !== undefined
          ? currentData.value.year + ACTION_MAP[order]
          : undefined,
    };

    const newData = { ...currentData, value: { ...newValue } };

    set(proprietyState({ id, propriety }), newData);
  },
});

export { salesState, proprietiesState, getProprietyForOneSale };
