//app/api/reports/users/route.ts

import { NextResponse } from "next/server";
import { getUserReports } from "@/services/userReportService";

export async function GET() {
    const users = await getUserReports();
    return Response.json(users);
}



