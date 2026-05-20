// // //app/dashboard/stock/all-status/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { assignedColumns } from "@/components/reports/assigned-columns";
import { AssignedDevice } from "@/models/AssignedDevice";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AssignedPage() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");

    const [data, setData] = useState<AssignedDevice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ MODAL STATES
    const [viewDevice, setViewDevice] = useState<AssignedDevice | null>(null);
    const [assignDevice, setAssignDevice] = useState<AssignedDevice | null>(null);

    // ✅ FORM STATE (NEW)
    const [formData, setFormData] = useState<AssignedDevice | null>(null);

    const [allData, setAllData] = useState<AssignedDevice[]>([]);
    const [statusCount, setStatusCount] = useState<Record<string, number>>({});
    const router = useRouter();

    useEffect(() => {
        async function loadAssignedDevices() {
            try {
                setLoading(true);

                // ✅ 1. GET ALL DATA (for cards)
                const allRes = await fetch(`/api/reports/assigned`);
                const allResult: AssignedDevice[] = await allRes.json();

                setAllData(allResult);

                // ✅ CREATE STATUS COUNT
                const counts: Record<string, number> = {};

                allResult.forEach((item) => {
                    const key = item.status?.toLowerCase() || "unknown";
                    counts[key] = (counts[key] || 0) + 1;
                });

                setStatusCount(counts);

                // ✅ 2. FILTERED DATA (for table)
                const url = status
                    ? `/api/reports/assigned?status=${status}`
                    : `/api/reports/assigned`;

                const res = await fetch(url);

                if (!res.ok) throw new Error("Failed to load assigned devices");

                const result: AssignedDevice[] = await res.json();
                setData(result);

            } catch (err) {
                setError("Unable to load data");
            } finally {
                setLoading(false);
            }
        }

        loadAssignedDevices();
    }, [status]);
    // ✅ PASS HANDLERS TO COLUMNS
    const columns = assignedColumns({
        onView: (device) => setViewDevice(device),

        onAssign: (device) => {
            setAssignDevice(device);
            setFormData(device); // ✅ preload all fields
        },
    });

    const Info = ({ label, value }: any) => (
        <div>
            <p className="text-muted-foreground text-xs font-medium">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );

    const LocalInput = ({ label, ...props }: any) => (
        <div>
            <p className="text-muted-foreground text-xs font-medium">{label}</p>
            <input
                {...props}
                className="border border-border p-2 rounded-lg w-full mt-1 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
        </div>
    );

    if (loading) return (
        <div className="space-y-3 p-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-10 w-full rounded-lg" />
            ))}
        </div>
    );
    if (error) return <p className="p-6 text-red-600">{error}</p>;



    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">
                {status ?? "All"} Devices
            </h1>

            {/* ================= STATUS FILTER BAR ================= */}


            {/* ================= STATUS FILTER ================= */}
            <div className="mb-6 bg-white border rounded-xl shadow-sm p-3">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Status Overview
                    </p>
                    <p className="text-[10px] text-muted-foreground">Quick Filter</p>
                </div>


                {/* ALL */}
                <button
                    onClick={() => router.push(`/dashboard/stock/all-status`)}
                    className={`w-full flex justify-between items-center px-3 py-2 text-xs rounded-md transition mb-3
    ${!status
                            ? "bg-muted text-gray-800 shadow"
                            : "bg-muted text-gray-700 hover:bg-muted"}
    `}
                >
                    <span>All</span>
                    <span className="font-bold">{allData.length}</span>
                </button>

                <div className="border-t mb-3"></div>

                {/* ================= STATUS GRID ================= */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-2">

                    {Object.entries(statusCount).map(([key, count]) => {
                        const label = key.charAt(0).toUpperCase() + key.slice(1);
                        const active = status === key;

                        return (
                            <button
                                key={key}
                                onClick={() =>
                                    router.push(`/dashboard/stock/all-status?status=${key}`)
                                }
                                className={`w-full flex justify-between items-center px-3 py-2 text-xs rounded-md transition border
                    ${active
                                        ? "bg-blue-600 text-white shadow"
                                        : "bg-muted text-gray-700 hover:bg-muted border-border"}
                    `}
                            >
                                <span className="truncate">{label}</span>

                                <span
                                    className={`text-[11px] font-semibold px-2 py-[2px] rounded-full
    ${active ? "bg-background text-primary" : "bg-muted text-muted-foreground"}`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}

                </div>
            </div>

            {/* ================= Data Table ================= */}

            <div className="overflow-x-auto rounded-xl"><DataTable columns={columns} data={data} />

            {/* ================= VIEW MODAL ================= */}
            <DialogPrimitive.Root
                open={!!viewDevice}
                onOpenChange={() => setViewDevice(null)}
            >
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

                    <DialogPrimitive.Content className="fixed top-1/2 left-1/2 w-[800px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl overflow-hidden">

                        {/* HEADER */}
                        <div className="border-b p-5 bg-muted">
                            <DialogPrimitive.Title className="text-lg font-semibold">
                                Device Details
                            </DialogPrimitive.Title>

                            <p className="text-sm text-muted-foreground">
                                Reference: {viewDevice?.referenceNumber}
                            </p>
                        </div>

                        {/* BODY */}
                        {viewDevice && (
                            <div className="p-6 grid grid-cols-2 gap-5 text-sm">

                                {/* Employee Info */}
                                <div className="col-span-2">
                                    <h3 className="font-semibold text-gray-700 mb-2">Employee Information</h3>
                                    <div className="grid grid-cols-2 gap-3 bg-muted p-4 rounded-lg">
                                        <p><span className="text-muted-foreground">Name:</span> {viewDevice.employeeName}</p>
                                        <p><span className="text-muted-foreground">ID:</span> {viewDevice.employeeId}</p>
                                        <p><span className="text-muted-foreground">Department:</span> {viewDevice.department}</p>
                                        <p><span className="text-muted-foreground">Designation:</span> {viewDevice.designation}</p>
                                    </div>
                                </div>

                                {/* Device Info */}
                                <div className="col-span-2">
                                    <h3 className="font-semibold text-gray-700 mb-2">Device Information</h3>
                                    <div className="grid grid-cols-2 gap-3 bg-muted p-4 rounded-lg">
                                        <p><span className="text-muted-foreground">Category:</span> {viewDevice.category}</p>
                                        <p><span className="text-muted-foreground">Model:</span> {viewDevice.model}</p>
                                        <p><span className="text-muted-foreground">Device SL:</span> {viewDevice.deviceSl}</p>
                                        <p><span className="text-muted-foreground">Vendor:</span> {viewDevice.vendor}</p>
                                        <p><span className="text-muted-foreground">Type:</span> {viewDevice.deviceType}</p>
                                        <p>
                                            <span className="text-muted-foreground">Status:</span>{" "}
                                            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                                                {viewDevice.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="col-span-2">
                                    <h3 className="font-semibold text-gray-700 mb-2">Timeline</h3>
                                    <div className="grid grid-cols-2 gap-3 bg-muted p-4 rounded-lg">
                                        <p><span className="text-muted-foreground">Assigned Date:</span> {viewDevice.assignedDate}</p>
                                        <p><span className="text-muted-foreground">Purchase Date:</span> {viewDevice.purchaseDate}</p>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* FOOTER */}
                        <div className="p-5 border-t flex justify-end">
                            <Button onClick={() => setViewDevice(null)}>
                                Close
                            </Button>
                        </div>

                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>



            {/* ================= ASSIGN MODAL ================= */}
            <DialogPrimitive.Root
                open={!!assignDevice}
                onOpenChange={() => {
                    setAssignDevice(null);
                    setFormData(null); // ✅ reset form
                }}
            >
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

                    <DialogPrimitive.Content className="fixed top-1/2 left-1/2 w-[600px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                        <DialogPrimitive.Title className="text-lg font-semibold mb-4">
                            Assign Device - {assignDevice?.referenceNumber}
                        </DialogPrimitive.Title>

                        {formData && (
                            <div className="space-y-6 text-sm">

                                {/* ================= HEADER SUMMARY ================= */}
                                <div className="bg-blue-50 border rounded p-3">
                                    <h2 className="text-base font-semibold text-blue-700">
                                        Assign Device Preview
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        Review device and employee details before assignment
                                    </p>
                                </div>

                                {/* ================= DEVICE INFO ================= */}
                                <div>
                                    <h3 className="font-semibold text-sm mb-2">
                                        Device Information
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3 bg-muted p-3 rounded border">

                                        <Info label="Reference No" value={formData.referenceNumber} />
                                        <Info label="Category" value={formData.category} />
                                        <Info label="Model" value={formData.model} />
                                        <Info label="Device SL" value={formData.deviceSl} />
                                        <Info label="Vendor" value={formData.vendor} />
                                        <Info label="Warranty" value={formData.warranty} />
                                        <Info label="Device Age" value={formData.deviceAge} />
                                        <Info label="Status" value={formData.status} />

                                    </div>
                                </div>

                                {/* ================= EMPLOYEE INFO ================= */}
                                <div>
                                    <h3 className="font-semibold text-sm mb-2">
                                        Employee Assignment
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3">

                                        <Input
                                            label="Employee ID"
                                            value={formData.employeeId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, employeeId: e.target.value })
                                            }
                                        />

                                        <Input
                                            label="Employee Name"
                                            value={formData.employeeName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, employeeName: e.target.value })
                                            }
                                        />

                                        <Input
                                            label="Department"
                                            value={formData.department}
                                            onChange={(e) =>
                                                setFormData({ ...formData, department: e.target.value })
                                            }
                                        />

                                        <Input
                                            label="Designation"
                                            value={formData.designation}
                                            onChange={(e) =>
                                                setFormData({ ...formData, designation: e.target.value })
                                            }
                                        />

                                        <Input
                                            label="Assign Date"
                                            type="date"
                                            value={formData.purchaseDate}
                                            onChange={(e) =>
                                                setFormData({ ...formData, purchaseDate: e.target.value })
                                            }
                                        />

                                        <Input
                                            label="Remarks"
                                            value={formData.remarks}
                                            onChange={(e) =>
                                                setFormData({ ...formData, remarks: e.target.value })
                                            }
                                        />

                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setAssignDevice(null);
                                    setFormData(null);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button className="bg-blue-600 text-white">
                                Confirm Assign
                            </Button>
                        </div>
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>


        </div>
    );
}







