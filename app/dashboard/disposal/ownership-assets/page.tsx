// app/dashboard/service-warranty/warranty-ownership
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, RotateCcw, UserCheck, Pencil, Trash2, Printer, ChevronDown } from "lucide-react";

interface Claim {
    id: number;
    reference: string;
    employee: string;
    device: string;
    serial: string;
    status: string;
    warrantyStatus: string;
    submittedDate: string;
}

export default function WarrantyownershipPage() {
    const [search, setSearch] = useState("");

    const ownership: Claim[] = [
        {
            id: 1,
            reference: "14501",
            employee: "Bimal Chandra Gosh",
            device: "Laptop LC2",
            serial: "2JTWGJ3",
            status: "User",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-01",
        },
        {
            id: 2,
            reference: "14502",
            employee: "Md. Hanif Ahmmed",
            device: "Mouse",
            serial: "2234LXBUJA8",
            status: "User",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 3,
            reference: "14503",
            employee: "Md. Touhid Ahmmed",
            device: "Mouse",
            serial: "2234LXBUJA8",
            status: "User",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 4,
            reference: "14504",
            employee: "Md. Ali Ahmmed",
            device: "Mouse",
            serial: "2234LXBUJA8",
            status: "User",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 5,
            reference: "14505",
            employee: "Md. Zaber Ahmmed",
            device: "Laptop-1",
            serial: "2234LXBUJA8",
            status: "Vendor",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 6,
            reference: "14506",
            employee: "Md. Jalil Ahmmed",
            device: "Laptop-2",
            serial: "2234LXBUJA8",
            status: "Vendor",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 7,
            reference: "14507",
            employee: "Md. Bulbul Ahmmed",
            device: "RAM",
            serial: "2234LXBUJA8",
            status: "Vendor",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 8,
            reference: "14508",
            employee: "Abdullah",
            device: "Desktop",
            serial: "2234LXBUJA8",
            status: "Vendor",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 9,
            reference: "14509",
            employee: "Md. Murad Ahmmed",
            device: "Mouse",
            serial: "2234LXBUJA8",
            status: "Vendor",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
        {
            id: 10,
            reference: "14510",
            employee: "Md. Anwar Ahmmed",
            device: "Laptop",
            serial: "2234LXBUJA8",
            status: "Vendor",
            warrantyStatus: "Expired",
            submittedDate: "2024-02-05",
        },
    ];

    const filtered = ownership.filter((item) =>
        item.reference.toLowerCase().includes(search.toLowerCase())
    );

    /* ================= Action Handlers ================= */
    const handleServiceRequest = (item: Claim) => console.log("Service Request", item);
    const handleInventoryReturn = (item: Claim) => console.log("Inventory Return", item);
    const handleOwnership = (item: Claim) => console.log("Ownership", item);
    const handleEdit = (item: Claim) => console.log("Edit", item);
    const handleDelete = (id: number) => console.log("Delete", id);
    const handlePrintPreview = (item: Claim) => console.log("Print Preview", item);

    return (
        <div className="p-6 space-y-6">

            {/* ================= Header ================= */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-medium text-blue-700 inline-block border-b border-blue-300 pb-1">
                        Device Ownership
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage and monitor all warranty claim requests.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline">Export Excel</Button>
                    <Button variant="outline">Export PDF</Button>
                </div>
            </div>


            {/* ================= Summary Cards ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-xl p-4 shadow-sm bg-white">
                    <p className="text-sm text-muted-foreground">Total Ownership</p>
                    <p className="text-2xl font-semibold">{ownership.length}</p>
                </div>

                <div className="border rounded-xl p-4 shadow-sm bg-white">
                    <p className="text-sm text-muted-foreground">User Ownership</p>
                    <p className="text-2xl font-semibold text-green-600">
                        {ownership.filter((c) => c.status === "Owership").length}
                    </p>
                </div>

                <div className="border rounded-xl p-4 shadow-sm bg-white">
                    <p className="text-sm text-muted-foreground">Vendor Ownership</p>
                    <p className="text-2xl font-semibold text-red-600">
                        {ownership.filter((c) => c.status === "Vendor").length}
                    </p>
                </div>
            </div>


            {/* ================= Table ================= */}
            <div className="border rounded-xl bg-white shadow-sm">

                {/* Table Top Bar */}
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-sm text-muted-foreground">
                        Showing {filtered.length} of {ownership.length} entries
                    </span>

                    <div className="w-64">
                        <Input
                            placeholder="Search by Reference No..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted border-b text-xs uppercase tracking-wider text-muted-foreground">
                            <tr>
                                <th className="p-4 text-left">SL</th>
                                <th className="p-4 text-left">Reference</th>
                                <th className="p-4 text-left">Employee</th>
                                <th className="p-4 text-left">Device</th>
                                <th className="p-4 text-left">Serial</th>
                                <th className="p-4 text-left">Submitted</th>
                                <th className="p-4 text-left">Status</th>

                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-b last:border-none hover:bg-muted transition"
                                >
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4 text-blue-600 font-medium">{item.reference}</td>
                                    <td className="p-4">{item.employee}</td>
                                    <td className="p-4">{item.device}</td>
                                    <td className="p-4">{item.serial}</td>
                                    <td className="p-4 text-muted-foreground">{item.submittedDate}</td>
                                    <td className="p-4"><StatusBadge status={item.status} /></td>

                                    <td className="p-4">
                                        <ActionsDropdown
                                            item={item}
                                            onServiceRequest={handleServiceRequest}
                                            onInventoryReturn={handleInventoryReturn}
                                            onOwnership={handleOwnership}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onPrintPreview={handlePrintPreview}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ================= Status Badge ================= */
// function StatusBadge({ status }: { status: string }) {
//     return (
//         <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
//             {status}
//         </span>
//     );
// }

/* ================= Status Badge ================= */
function StatusBadge({ status }: { status: string }) {
    // Assign colors based on status
    const colorClasses = {
        User: "bg-green-100 text-green-700",
        Vendor: "bg-red-100 text-red-600",
        Owership: "bg-blue-100 text-blue-700", // optional if needed
    };

    return (
        <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${colorClasses[status] || "bg-muted text-gray-700"
                }`}
        >
            {status}
        </span>
    );
}


/* ================= Warranty Badge ================= */
function WarrantyBadge({ status }: { status: string }) {
    return (
        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
            {status}
        </span>
    );
}

/* ================= Actions Dropdown ================= */
interface ActionsDropdownProps {
    item: Claim;
    onServiceRequest: (item: Claim) => void;
    onInventoryReturn: (item: Claim) => void;
    onOwnership: (item: Claim) => void;
    onEdit: (item: Claim) => void;
    onDelete: (id: number) => void;
    onPrintPreview: (item: Claim) => void;
}

function ActionsDropdown({
    item,
    onServiceRequest,
    onInventoryReturn,
    onOwnership,
    onEdit,
    onDelete,
    onPrintPreview,
}: ActionsDropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            {/* Dropdown button with text "Actions" */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-3 py-1 bg-muted rounded hover:bg-muted text-gray-700 font-medium"
            >
                Actions <ChevronDown size={16} />
            </button>

            {open && (
                <div className="absolute right-0 mt-1 w-56 bg-white border rounded shadow-md z-50">
                    <DropdownButton text="Service Request" color="blue" icon={<Package size={16} />} onClick={() => { onServiceRequest(item); setOpen(false); }} />
                    <DropdownButton text="Inventory Return" color="purple" icon={<RotateCcw size={16} />} onClick={() => { onInventoryReturn(item); setOpen(false); }} />
                    <DropdownButton text="Ownership" color="green" icon={<UserCheck size={16} />} onClick={() => { onOwnership(item); setOpen(false); }} />
                    <DropdownButton text="Edit" color="yellow" icon={<Pencil size={16} />} onClick={() => { onEdit(item); setOpen(false); }} />
                    <DropdownButton text="Print Preview" color="blue" icon={<Printer size={16} />} onClick={() => { onPrintPreview(item); setOpen(false); }} />
                    <DropdownButton text="Delete" color="red" icon={<Trash2 size={16} />} onClick={() => { onDelete(item.id); setOpen(false); }} />
                </div>
            )}
        </div>
    );
}

/* ================= Dropdown Button Component ================= */
interface DropdownButtonProps {
    text: string;
    color: string;
    icon: React.ReactNode;
    onClick: () => void;
}

function DropdownButton({ text, color, icon, onClick }: DropdownButtonProps) {
    const colorClasses: Record<string, string> = {
        blue: "text-blue-700",
        purple: "text-purple-700",
        green: "text-green-700",
        yellow: "text-yellow-700",
        red: "text-red-600",
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${colorClasses[color]} hover:bg-muted`}
        >
            {icon} {text}
        </button>
    );
}
