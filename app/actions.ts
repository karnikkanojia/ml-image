"use server";
import axios, { AxiosError } from "axios";
import { FormDataType } from "@/lib/definitions";

export const uploadImage = async (
  prevdata: any,
  data: FormData
): Promise<FormDataType[]> => {
  const files = data.getAll("file");
  const k = data.get("number");
  const methods = data.getAll("methods");
  if (files.length === 0 || !k || methods.length === 0)
    throw new Error("Invalid request");

  const azure_url = process.env.FUNCTION_URL;
  const result = await Promise.all(
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
          data: res.data,
          error: null,
        } as FormDataType;
      } catch (err: AxiosError | any) {
        return {
          data: null,
          error: err.message,
        } as FormDataType;
      }
    })
  );

  return result;
};