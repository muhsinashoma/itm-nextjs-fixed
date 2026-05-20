// app/dashboard/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OverviewChart from "@/components/overview-chart";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/tt-columns";
import { sections } from "@/components/tt-data";
import { CHART_FONT } from "@/lib/chart-font";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie,
    LineChart, Line, Tooltip, ResponsiveContainer, Cell,
    LabelList, XAxis, Legend,
} from "recharts";

// ─── Shared card wrapper ───────────────────────────────────────────────
function DashCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow p-5">
            {children}
        </div>
    );
}

function CardHeader({ title, kpi, kpiClass = "text-primary", badge }: {
    title: string; kpi: string | number; kpiClass?: string; badge?: string;
}) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</h3>
            <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${kpiClass} tabular-nums`}>{kpi}</span>
                {badge && (
                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{badge}</span>
                )}
            </div>
        </div>
    );
}

function LegendList({ items, onClickPath }: {
    items: { label: string; value: number; color: string; status?: string }[];
    onClickPath?: (status: string) => void;
}) {
    const router = useRouter();
    return (
        <div className="space-y-1.5">
            {items.map((item) => (
                <div
                    key={item.label}
                    onClick={() => onClickPath && router.push(onClickPath.toString().replace("{s}", item.status || item.label))}
                    className="flex justify-between items-center cursor-pointer hover:bg-muted/60 px-2 py-1.5 rounded-lg transition-colors"
                >
                    <span className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        {item.label}
                    </span>
                    <span className="text-xs font-semibold text-foreground tabular-nums">
                        {item.value.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ─── Chart data ────────────────────────────────────────────────────────
const activeAssetsData = [
    { label: "Assigned", value: 11797, color: "#3b82f6" },
    { label: "Transferred", value: 540, color: "#f59e0b" },
    { label: "Returned", value: 210, color: "#10b981" },
    { label: "Available", value: 320, color: "#8b5cf6" },
];

const nonOpData = [
    { label: "Lost", value: 120, color: "#ef4444" },
    { label: "Damaged", value: 55, color: "#f59e0b" },
    { label: "Ownership", value: 1000, color: "#10b981" },
];

const warrantyData = [
    { label: "Claimed", value: 820, color: "#f97316" },
    { label: "To Vendor", value: 260, color: "#8b5cf6" },
    { label: "Recovered", value: 710, color: "#3b82f6" },
    { label: "Expired", value: 150, color: "#ef4444" },
];

const serviceData = [
    { label: "Open", value: 500, color: "#3b82f6" },
    { label: "In Progress", value: 250, color: "#f59e0b" },
    { label: "Closed", value: 175, color: "#10b981" },
];

const resignationData = [
    { month: "Jan", "Pending Clearance": 2, Completed: 5, "In Process": 1 },
    { month: "Feb", "Pending Clearance": 1, Completed: 4, "In Process": 2 },
    { month: "Mar", "Pending Clearance": 2, Completed: 3, "In Process": 1 },
    { month: "Apr", "Pending Clearance": 5, Completed: 3, "In Process": 2 },
];

const renewalData = [
    { month: "Jan", Upcoming: 5, Completed: 10, Delayed: 2 },
    { month: "Feb", Upcoming: 4, Completed: 9, Delayed: 3 },
    { month: "Mar", Upcoming: 6, Completed: 12, Delayed: 2 },
    { month: "Apr", Upcoming: 5, Completed: 14, Delayed: 3 },
];

export default function DashboardPage() {
    const router = useRouter();
    const totalAssets = activeAssetsData.reduce((s, i) => s + i.value, 0);
    const totalNonOp = nonOpData.reduce((s, i) => s + i.value, 0);
    const totalWarranty = warrantyData.reduce((s, i) => s + i.value, 0);
    const totalService = serviceData.reduce((s, i) => s + i.value, 0);
    const totalResig = resignationData.reduce((s, d) => s + (d["Pending Clearance"] + d["Completed"] + d["In Process"]), 0);
    const totalRenewal = renewalData.reduce((s, d) => s + (d.Upcoming + d.Completed + d.Delayed), 0);

    return (
        <div className="space-y-4">
            {/* ── Stat Cards ─────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                {/* Card 1 — Active Assets */}
                <DashCard>
                    <CardHeader title="Total Active Assets" kpi={totalAssets.toLocaleString()} badge="↑ 48%" />
                    <div className="flex items-stretch gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="h-32">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={activeAssetsData} barSize={14}>
                                        <XAxis dataKey="label" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {activeAssetsData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                        </Bar>
                                        <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="w-px bg-border shrink-0" />
                        <div className="flex-1 min-w-0 flex items-center">
                            <LegendList
                                items={activeAssetsData}
                                onClickPath={`/dashboard/reports/assets?status={s}`}
                            />
                        </div>
                    </div>
                </DashCard>

                {/* Card 2 — Non-Operational */}
                <DashCard>
                    <CardHeader title="Non-Operational Assets" kpi={totalNonOp.toLocaleString()} kpiClass="text-red-500" badge="↑ 12%" />
                    <div className="flex items-stretch gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="h-32">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={nonOpData} dataKey="value" nameKey="label" cx="50%" cy="50%"
                                            outerRadius={52} innerRadius={32} paddingAngle={4}>
                                            {nonOpData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                        </Pie>
                                        <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="w-px bg-border shrink-0" />
                        <div className="flex-1 min-w-0 flex items-center">
                            <LegendList items={nonOpData} />
                        </div>
                    </div>
                </DashCard>

                {/* Card 3 — Warranty */}
                <DashCard>
                    <CardHeader title="Warranty Overview" kpi={totalWarranty.toLocaleString()} badge="↑ 18%" />
                    <div className="flex items-stretch gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="h-32">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={warrantyData} barSize={14}>
                                        <XAxis dataKey="label" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {warrantyData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                        </Bar>
                                        <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="w-px bg-border shrink-0" />
                        <div className="flex-1 min-w-0 flex items-center">
                            <LegendList items={warrantyData} />
                        </div>
                    </div>
                </DashCard>

                {/* Card 4 — Service Requests */}
                <DashCard>
                    <CardHeader title="Service Requests In Progress" kpi={totalService.toLocaleString()} badge="↑ 24%" />
                    <div className="flex items-stretch gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="h-32">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[{ name: "Requests", ...Object.fromEntries(serviceData.map(d => [d.label, d.value])) }]} barSize={18}>
                                        <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                        {serviceData.map((d) => (
                                            <Bar key={d.label} dataKey={d.label} fill={d.color} radius={[4, 4, 0, 0]} />
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="w-px bg-border shrink-0" />
                        <div className="flex-1 min-w-0 flex items-center">
                            <LegendList items={serviceData} />
                        </div>
                    </div>
                </DashCard>

                {/* Card 5 — Resignation */}
                <DashCard>
                    <CardHeader title="Resignation Clearance" kpi={totalResig} kpiClass="text-red-500" badge={`↑ 6%`} />
                    <div className="h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={resignationData}>
                                <defs>
                                    <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                <Area type="monotone" dataKey="Pending Clearance" stroke="#f59e0b" strokeWidth={2} fill="url(#rg1)" dot={false} />
                                <Area type="monotone" dataKey="Completed" stroke="#10b981" strokeWidth={2} fill="url(#rg2)" dot={false} />
                                <Area type="monotone" dataKey="In Process" stroke="#3b82f6" strokeWidth={2} fill="none" dot={false} />
                                <Legend wrapperStyle={{ fontSize: 10 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </DashCard>

                {/* Card 6 — Renewal */}
                <DashCard>
                    <CardHeader title="Contract Renewal" kpi={totalRenewal} kpiClass="text-emerald-600" badge="↑ 12%" />
                    <div className="h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={renewalData}>
                                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                <Bar dataKey="Upcoming" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="Completed" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="Delayed" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                <Legend wrapperStyle={{ fontSize: 10 }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </DashCard>
            </div>

            {/* ── Overview Chart ──────────────────────────────────────── */}
            <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
                <OverviewChart />
            </div>

            {/* ── TT Table ────────────────────────────────────────────── */}
            <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
                <h2 className="text-sm font-semibold text-foreground mb-4">Trouble Ticket Table</h2>
                <div className="overflow-x-auto">
                    <DataTable columns={columns} data={sections} />
                </div>
            </div>
        </div>
    );
}
