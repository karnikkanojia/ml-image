import { Dispatch, createContext, useReducer } from "react";
import { ApiResponse, DataState, Cache } from "@/lib/definitions";

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
  payload: Cache;
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
      let cacheKey = JSON.stringify({
        file: action.payload.file,
        camMethods: action.payload.camMethods,
        topk: action.payload.topk,
        fetched: action.payload.fetched,
        name: action.payload.name,
      });
      try {
        console.log(localStorage.getItem(cacheKey));
        localStorage.removeItem(cacheKey);
        console.log("Deleted from localStorage");
        console.log(localStorage.length)
      }
      catch (err) {
        console.error("Error deleting from localStorage", err);
      }
      console.log("Deleted from state");
      return state.filter((data) => data.name !== action.payload.name);
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
    if (localStorage.key(i) === null) continue;
    const key = localStorage.key(i);
    let cacheValue: DataState;
    try {
      cacheValue = JSON.parse(key || "");
    } catch {
      continue;
    }
    if (key && cacheValue.hasOwnProperty("fetched")) {
      const data: { data: ApiResponse; expiration: number } = JSON.parse(
        localStorage.getItem(key) || ""
      );
      if (data.expiration < Date.now()) {
        localStorage.removeItem(key);
        continue;
      }
      cacheValue = { ...cacheValue, data: data.data };
      initialState.push(cacheValue);
    }
  }
  return initialState;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(DataReducer, null, createInitialState);
  if (typeof window === "undefined")
    return (
      <DataContext.Provider value={{ state, dispatch }}>
        {children}
      </DataContext.Provider>
    );

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
