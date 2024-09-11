import { Dispatch, createContext, useReducer } from "react";
import { DataState, CacheKey } from "@/lib/definitions";

export enum DataStateActions {
  ADD_DATA = "ADD_DATA",
  DELETE_DATA = "DELETE_DATA",
}

export type AddDataStateAction = {
  type: DataStateActions.ADD_DATA;
  payload: DataState;
  name?: string;
};

export type DeleteDataStateAction = {
  type: DataStateActions.DELETE_DATA;
  payload: CacheKey;
};

export type DataStateAction = AddDataStateAction | DeleteDataStateAction;

export const DataReducer = (
  state: DataState[],
  action: DataStateAction
): DataState[] => {
  switch (action.type) {
    case DataStateActions.ADD_DATA:
      return [...state, action.payload];

    case DataStateActions.DELETE_DATA:
      const methodsKey = action.payload.camMethods.join('-');
      const cacheKey = `${action.payload.name}-${methodsKey}`;

      try {
        localStorage.removeItem(cacheKey);
      } catch (err) {
        console.error("Error deleting from localStorage", err);
      }

      console.log(`Deleted from state with key: ${cacheKey}`);
      console.log((action.payload));
      return state.filter((data) => data.name !== String(action.payload.name));

    default:
      return state;
  }
};

export const DataContext = createContext<{
  state: DataState[];
  dispatch: Dispatch<DataStateAction>;
}>({
  state: [],
  dispatch: () => null,
});

const createInitialState = () => {
  let initialState: DataState[] = [];
  if (typeof window === "undefined") return initialState;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const [fileName, ...methodsArray] = key.split('-');
    let cacheValue: DataState;

    try {
      const cachedObject = JSON.parse(localStorage.getItem(key) || "");
      const { data, expiration } = cachedObject;

      if (expiration < Date.now()) {
        localStorage.removeItem(key);
        continue;
      }

      cacheValue = {
        file: data.file,
        camMethods: methodsArray,
        topk: cachedObject.topk,
        name: fileName,
        data: data,
        fetched: true,
      };

      initialState.push(cacheValue);
    } catch (error) {
      console.error(`Error parsing cache for key: ${key}`, error);
      continue;
    }
  }

  return initialState;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(DataReducer, null, createInitialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
