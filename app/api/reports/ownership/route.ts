//app/api/reports/ownership/route.ts

import { NextResponse } from "next/server";
import { assignedDevices } from "@/services/assignedDeviceService";

/* ================= NORMALIZE ================= */
const normalize = (value?: string) =>
    value?.toLowerCase().trim() || "";

/* ================= OWNERSHIP STATUS ================= */
const OWNERSHIP_STATUS = ["user", "vendor"];

/* ================= GET API ================= */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = normalize(searchParams.get("status") || "");

        /* ================= FILTER OWNERSHIP ONLY ================= */
        let filtered = assignedDevices.filter((item) =>
            OWNERSHIP_STATUS.includes(normalize(item.status))
        );

        /* ================= APPLY STATUS FILTER ================= */
        if (status) {
            filtered = filtered.filter(
                (item) => normalize(item.status) === status
            );
        }

        /* ================= STATS (ALWAYS FROM FULL DATA) ================= */
        const fullStats = assignedDevices.filter((item) =>
            OWNERSHIP_STATUS.includes(normalize(item.status))
        );

        const stats = {
            total: fullStats.length,
            user: fullStats.filter((i) => normalize(i.status) === "user").length,
            vendor: fullStats.filter((i) => normalize(i.status) === "vendor").length,
        };

        /* ================= RESPONSE ================= */
        return NextResponse.json({
            success: true,
            data: filtered,
            stats,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to load ownership data" },
            { status: 500 }
        );
    }
}