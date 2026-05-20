

//app/api/reports/assets/route.ts

import { NextResponse } from "next/server";
import { assignedDevices } from "@/services/assignedDeviceService";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // If no status is provided, return all records
    if (!status) {
        return NextResponse.json(assignedDevices);
    }

    // Filter by status (case-insensitive)
    const filtered = assignedDevices.filter(
        device =>
            device.status.toLowerCase() === status.toLowerCase()
    );

    return NextResponse.json(filtered);
}
