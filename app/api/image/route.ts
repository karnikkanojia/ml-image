import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const fileName = req.nextUrl.searchParams.get("fileName");
    if (!fileName) {
        return new NextResponse(null, {
            status: 400,
            statusText: "FileName parameter is required.",
        });
    }
    const azureAccount = process.env.STORAGE_ACCOUNT_NAME;
    const sasKey = process.env.STORAGE_ACCESS_KEY;
    const containerName = process.env.STORAGE_CONTAINER_NAME;
    const hostUrl = `https://${azureAccount}.blob.core.windows.net/${containerName}/${fileName}?${sasKey}`;
    const response = await fetch(hostUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": "image/jpeg",
        },
    });

}