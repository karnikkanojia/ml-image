import { ApiResponse, DataState } from "@/lib/definitions";

const setCache = (key: string, data: any, ttl: number = 3600) => {
  const expiration = Date.now() + ttl * 1000;
  const cachedObject = { data, expiration };
  try {
    localStorage.setItem(key, JSON.stringify(cachedObject));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

const getCache = (key: string) => {
  try {
    const cachedData = localStorage.getItem(key);
    if (!cachedData) return null;

    const { data, expiration } = JSON.parse(cachedData);
    if (Date.now() > expiration) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error reading from localStorage", err);
    return null;
  }
};

export const fetchData = async (state: DataState): Promise<ApiResponse> => {
  const methodsKey = state.camMethods.join('-');
  const cacheKey = `${state.file.name}-${methodsKey}`;

  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const payload = new FormData();
  payload.append("image", state.file);
  state.camMethods.forEach((method) => {
    payload.append("method", method);
  });
  payload.append("k", state.topk.toString());

  const response = await fetch("/api/model", {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    return { error: `Error ${response.status}: Failed to fetch from API` };
  }

  const data: ApiResponse = await response.json();
  setCache(cacheKey, data);
  return data;
};
