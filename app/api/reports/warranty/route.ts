

//app/api/reports/warranty/route.ts

import { NextResponse } from "next/server";
import { warrantyDevices } from "@/services/warrantyDeviceService";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // If no status is provided, return all records
    if (!status) {
        return NextResponse.json(warrantyDevices);
    }

    // Filter by status (case-insensitive)
    const filtered = warrantyDevices.filter(
        device =>
            device.status.toLowerCase() === status.toLowerCase()
    );

    return NextResponse.json(filtered);
}
