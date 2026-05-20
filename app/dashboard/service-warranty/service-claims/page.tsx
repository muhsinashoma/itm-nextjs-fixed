"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ================= Status Badge Component ================= */
function StatusBadge({ status }: { status: string }) {
    const base = "px-3 py-1 text-xs rounded-full font-medium";

    if (status === "Claimed")
        return <span className={`${base} bg-blue-100 text-blue-700`}>{status}</span>;

    if (status === "Transfer To Vendor")
        return (
            <span className={`${base} bg-yellow-100 text-yellow-700`}>
                {status}
            </span>
        );

    if (status === "Closed")
        return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;

    return <span className={`${base} bg-muted text-muted-foreground`}>{status}</span>;
}

/* ================= Page Component ================= */
export default function WarrantyClaimsPage() {
    const [search, setSearch] = useState("");

    const data = [
        {
            id: 1,
            reference: "14494",
            category: "User Device",
            submitted: "2026-02-10 11:13:23",
            deviceCategory: "Mouse",
            serial: "2508APW6YT49",
            problem: "Mouse not working",
            status: "Claimed",
            vendor: "Startech",
        },
        {
            id: 2,
            reference: "12794",
            category: "User Device",
            submitted: "2026-01-08 15:10:29",
            deviceCategory: "Laptop-LC1",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Transfer To Vendor",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 3,
            reference: "12795",
            category: "User Device",
            submitted: "2026-01-07 15:10:29",
            deviceCategory: "Laptop-LC2",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Transfer To Vendor",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 4,
            reference: "12796",
            category: "User Device",
            submitted: "2026-01-05 15:10:29",
            deviceCategory: "Laptop-LC3",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Transfer To Vendor",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 5,
            reference: "12797",
            category: "User Device",
            submitted: "2026-01-04 15:10:29",
            deviceCategory: "Mouse",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Closed",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 6,
            reference: "12798",
            category: "User Device",
            submitted: "2026-01-03 15:10:29",
            deviceCategory: "Laptop-LC3",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Closed",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 7,
            reference: "12799",
            category: "User Device",
            submitted: "2026-01-12 15:10:29",
            deviceCategory: "Laptop",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Transfer To Vendor",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 8,
            reference: "127800",
            category: "User Device",
            submitted: "2026-02-21 15:10:29",
            deviceCategory: "Desktop",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Closed",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 9,
            reference: "127801",
            category: "User Device",
            submitted: "2026-02-20 15:10:29",
            deviceCategory: "Laptop-LC2",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Claimed",
            vendor: "Digital Equipment Ltd",
        },
        {
            id: 10,
            reference: "127802",
            category: "User Device",
            submitted: "2026-01-21 15:10:29",
            deviceCategory: "RAM",
            serial: "2RL19T3",
            problem: "Touchpad not working",
            status: "Transfer To Vendor",
            vendor: "Digital Equipment Ltd",
        },
    ];

    const filtered = data.filter((item) =>
        item.reference.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">

            {/* ================= Page Header ================= */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-blue-600 inline-block border-b-2 border-blue-600 pb-1">
                        Service Claims
                    </h1>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline">Export Excel</Button>
                    <Button variant="outline">Export PDF</Button>
                </div>
            </div>


            {/* ================= Summary Cards ================= */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="rounded-xl border p-4 bg-white shadow-sm">
                    <p className="text-sm text-muted-foreground">Total Claims</p>
                    <p className="text-2xl font-semibold">{data.length}</p>
                </div>

                <div className="rounded-xl border p-4 bg-white shadow-sm">
                    <p className="text-sm text-muted-foreground">Claimed</p>
                    <p className="text-2xl font-semibold text-blue-600">
                        {data.filter((d) => d.status === "Claimed").length}
                    </p>
                </div>

                <div className="rounded-xl border p-4 bg-white shadow-sm">
                    <p className="text-sm text-muted-foreground">Transfer To Vendor</p>
                    <p className="text-2xl font-semibold text-yellow-600">
                        {data.filter((d) => d.status === "Transfer To Vendor").length}
                    </p>
                </div>

                <div className="rounded-xl border p-4 bg-white shadow-sm">
                    <p className="text-sm text-muted-foreground">Closed</p>
                    <p className="text-2xl font-semibold text-green-600">
                        {data.filter((d) => d.status === "Closed").length}
                    </p>
                </div>
            </div>

            {/* ================= Table Section ================= */}
            <div className="bg-card border rounded-xl shadow-sm">

                {/* Table Top Bar */}
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-sm text-muted-foreground">
                        Showing {filtered.length} of {data.length} entries
                    </span>

                    <div className="w-72">
                        <Input
                            placeholder="Search by Reference No..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted border-b">
                            <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                                <th className="p-4 text-left">SL</th>
                                <th className="p-4 text-left">Reference</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Submitted</th>
                                <th className="p-4 text-left">Device</th>
                                <th className="p-4 text-left">Serial</th>
                                <th className="p-4 text-left">Problem</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Vendor</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-b last:border-none hover:bg-muted transition"
                                >
                                    <td className="p-4 font-medium">{index + 1}</td>
                                    <td className="p-4 font-semibold text-blue-600">
                                        {item.reference}
                                    </td>
                                    <td className="p-4">{item.category}</td>
                                    <td className="p-4 text-muted-foreground">
                                        {item.submitted}
                                    </td>
                                    <td className="p-4">{item.deviceCategory}</td>
                                    <td className="p-4">{item.serial}</td>
                                    <td className="p-4">{item.problem}</td>
                                    <td className="p-4">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="p-4">{item.vendor}</td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="text-center p-6 text-muted-foreground">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
