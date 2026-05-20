
// app/api/reports/non-operational/route.ts

import { NextResponse } from "next/server";
import { assignedDevices } from "@/services/assignedDeviceService";

const normalize = (value: string) =>
    value?.toLowerCase().trim();

const NON_OPERATIONAL_STATUS = [
    "lost",
    "stolen",
    "damaged",
    "obsoleted",
    "ownership",
];

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = normalize(searchParams.get("status") || "");

        // Step 1: normalize dataset
        let filtered = assignedDevices.filter((item) =>
            NON_OPERATIONAL_STATUS.includes(normalize(item.status))
        );

        // Step 2: apply query filter
        if (status) {
            filtered = filtered.filter(
                (item) => normalize(item.status) === status
            );
        }

        return NextResponse.json(filtered, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Failed to load non-operational data" },
            { status: 500 }
        );
    }
}