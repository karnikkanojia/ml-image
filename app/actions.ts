"use server";
import axios, { AxiosError } from "axios";

export async function uploadImage(prevdata: any, data: FormData) {
  const files = data.getAll("file");
  const k = data.get("number");
  const methods = data.getAll("methods");
  if (files.length == 0 || !k || methods.length == 0)
    return [
      {
        error: "Invalid request",
        data: null,
      },
    ];
  const azure_url = process.env.FUNCTION_URL;
  const result = Promise.all(
    files.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("k", k);
      methods.map((method) => formData.append("method", method));
      const res = await axios.post(
        azure_url || "http://localhost:7071/api/model_req",
        formData,
        {
          headers: {
            "x-functions-key": process.env.FUNCTION_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.statusText !== "OK") {
        throw new AxiosError("Request failed");
      }
      return {
        error: null,
        data: res.data,
      };
    } catch (err: AxiosError | any) {
      return {
        error: `${err.message}`,
        data: null,
      };
    }
  }));
  return result;
}
