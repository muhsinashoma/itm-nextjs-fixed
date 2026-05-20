

//app/api/reports/service/route.ts

import { NextResponse } from "next/server";
//import { warrantyDevices } from "@/services/warrantyDeviceService";
import { serviceRequestedDevices } from "@/services/serviceRequestService";    //this functions (serviceRequestedDevices) is conncected with service page  //services/serviceRequestService.ts


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // If no status is provided, return all records
    if (!status) {
        return NextResponse.json(serviceRequestedDevices);
    }

    // Filter by status (case-insensitive)
    const filtered = serviceRequestedDevices.filter(
        device =>
            device.status.toLowerCase() === status.toLowerCase()
    );

    return NextResponse.json(filtered);
}
