"use server"
import axios, { AxiosError } from "axios";

export async function uploadImage(prevdata: any, data: FormData) {
    const files: FormDataEntryValue[] = data.getAll("image");
    if(!files) return [{
        error: "No files found",
        data: null
    }];
    const azure_url = process.env.AZURE_FUNCTION_URL;
    const result = await Promise.all(
        files.map(async (file) => {
            try{
                const formData = new FormData();
                formData.append("image", file);
                const res = await axios.post(
                    azure_url || "http://localhost:7071/api/model_req",
                    formData,
                    {
                        headers: {
                            "Authorization": `Bearer ${process.env.AZURE_FUNCTION_KEY}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }

                )
                if(res.statusText !== "OK") {
                    throw new AxiosError("Request failed");
                }
                return {
                    error: null,
                    data: res.data
                }
            }
            catch(err: AxiosError | any) {
                return {
                    error: `${err.message}`,
                    data: null
                };
            }

        })
    );
    return result;
}
