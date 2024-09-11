import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const azure_url = process.env.FUNCTION_URL || "http://localhost:7071/api/model_req";
    const formData = await req?.formData();
    const payload = new FormData();
    formData?.forEach((value, key) => {
        payload.append(key, value);
    });
    const response = await fetch(azure_url, {
        method: "POST",
        headers: {
            "x-functions-key": process.env.FUNCTION_KEY || "",
        },
        body: formData,
    });
    if (!response.ok) {
        return NextResponse.json({ error: response.statusText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
