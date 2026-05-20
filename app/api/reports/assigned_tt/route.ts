
// app/api/reports/assigned_tt/route.ts

import { NextResponse } from "next/server";
import { getAssignedTTs } from "@/services/assignedTTService";

export async function GET() {
    try {
        const data = await getAssignedTTs();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Assigned TT API Error:", error);
        return NextResponse.json(
            { message: "Failed to load assigned TT data" },
            { status: 500 }
        );
    }
}
