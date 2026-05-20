"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, RotateCcw, UserCheck, Pencil, Trash2, Printer, ChevronDown } from "lucide-react";

interface UrgentTask {
    id: number;
    reference: string;
    employee: string;
    description: string;
    task: string;
    status: string;
    priority: string;
    submittedDate: string;
}

export default function UrgentTaskPage() {
    const [search, setSearch] = useState("");

    const tasks: UrgentTask[] = [
        { id: 1, reference: "UT-1001", employee: "Alice Johnson", description: "Server Shiffing", task: "Server Shiffing", status: "Pending", priority: "High", submittedDate: "2026-02-01" },
        { id: 2, reference: "UT-1002", employee: "Bob Smith", description: "Server Shiffing Gulshan Zone", task: "Server Shiffing Gulshan Zone", status: "Inprogress", priority: "High", submittedDate: "2026-02-02" },
        { id: 3, reference: "UT-1003", employee: "Charlie Brown", description: "Door Server Replacement", task: "Door Server Replacement", status: "Completed", priority: "Medium", submittedDate: "2026-02-03" },
        { id: 4, reference: "UT-1004", employee: "Dana White", description: "Device Shiffing for Hitech", task: "Device Shiffing for Hitech", status: "Pending", priority: "Low", submittedDate: "2026-02-04" },
        { id: 5, reference: "UT-1005", employee: "Evan Lee", description: "Office Shifting", task: "Office Shifting", status: "Inprogress", priority: "Critical", submittedDate: "2026-02-05" },
    ];

    const filtered = tasks.filter((item) =>
        item.reference.toLowerCase().includes(search.toLowerCase())
    );

    /* ================= Action Handlers ================= */
    const handleView = (item: UrgentTask) => console.log("View", item);
    const handleEdit = (item: UrgentTask) => console.log("Edit", item);
    const handleDelete = (id: number) => console.log("Delete", id);

    return (
        <div className="p-6 space-y-6">

            {/* ================= Header ================= */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-medium text-blue-700 inline-block border-b border-blue-300 pb-1">
                        Urgent Tasks
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage and monitor all urgent tasks.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline">Export Excel</Button>
                    <Button variant="outline">Export PDF</Button>
                </div>
            </div>


            {/* ================= Summary Cards ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Tasks */}
                <div className="border rounded-xl p-5 shadow-sm bg-white flex flex-col">
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-3xl font-bold text-blue-700 mt-2">{tasks.length}</p>
                </div>

                {/* Status Summary */}
                <div className="border rounded-xl p-5 shadow-sm bg-white flex flex-col">
                    <p className="text-sm text-muted-foreground mb-2">Task Status</p>
                    <div className="flex flex-wrap gap-2">
                        {["Pending", "In Progress", "Completed"].map((status) => {
                            const colors: Record<string, string> = {
                                Pending: "bg-yellow-100 text-yellow-700",
                                "In Progress": "bg-blue-100 text-blue-700",
                                Completed: "bg-green-100 text-green-700",
                            };
                            const count = tasks.filter((t) => t.status === status).length;
                            return (
                                <span
                                    key={status}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status]}`}
                                >
                                    {status}: {count}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Priority Summary */}
                <div className="border rounded-xl p-5 shadow-sm bg-white flex flex-col">
                    <p className="text-sm text-muted-foreground mb-2">Priority Levels</p>
                    <div className="flex flex-wrap gap-2">
                        {["Critical", "High", "Medium", "Low"].map((level) => {
                            const colors: Record<string, string> = {
                                Critical: "bg-red-100 text-red-600",
                                High: "bg-orange-100 text-orange-600",
                                Medium: "bg-yellow-100 text-yellow-700",
                                Low: "bg-green-100 text-green-700",
                            };
                            const emojiMap: Record<string, string> = {
                                Critical: "🔴",
                                High: "🟠",
                                Medium: "🟡",
                                Low: "🟢",
                            };
                            const count = tasks.filter((c) => c.priority === level).length;
                            return (
                                <span
                                    key={level}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[level]}`}
                                >
                                    {emojiMap[level]} {level}: {count}
                                </span>
                            );
                        })}
                    </div>
                </div>

            </div>
            {/* ================= Table ================= */}
            <div className="border rounded-xl bg-white shadow-sm">

                {/* Table Top Bar */}
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-sm text-muted-foreground">
                        Showing {filtered.length} of {tasks.length} entries
                    </span>

                    <div className="w-64">
                        <Input
                            placeholder="Search by Reference..."
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
                                <th className="p-4 text-left">Responsible Person</th>

                                <th className="p-4 text-left">Task</th>
                                <th className="p-4 text-left">Description</th>
                                <th className="p-4 text-left">Submitted</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Priority</th>
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
                                    <td className="p-4">{item.task}</td>
                                    <td className="p-4">{item.description}</td>
                                    <td className="p-4 text-muted-foreground">{item.submittedDate}</td>
                                    <td className="p-4"><StatusBadge status={item.status} /></td>
                                    <td className="p-4"><PriorityBadge priority={item.priority} /></td>
                                    <td className="p-4">
                                        <ActionsDropdown
                                            item={item}
                                            onView={handleView}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
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
function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-700",
        "In Progress": "bg-blue-100 text-blue-700",
        Completed: "bg-green-100 text-green-700",
    };
    return (
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${colors[status] || "bg-muted text-gray-700"}`}>
            {status}
        </span>
    );
}

/* ================= Priority Badge ================= */
// function PriorityBadge({ priority }: { priority: string }) {
//     const colors: Record<string, string> = {
//         High: "bg-red-100 text-red-600",
//         Medium: "bg-yellow-100 text-yellow-700",
//         Low: "bg-green-100 text-green-700",
//     };
//     return (
//         <span className={`px-3 py-1 text-xs rounded-full font-medium ${colors[priority] || "bg-muted text-gray-700"}`}>
//             {priority}
//         </span>
//     );
// }

/* ================= Priority Badge ================= */
function PriorityBadge({ priority }: { priority: string }) {
    const colors: Record<string, string> = {
        Critical: "bg-red-100 text-red-600 border border-red-200",
        High: "bg-orange-100 text-orange-600 border border-orange-200",
        Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        Low: "bg-green-100 text-green-700 border border-green-200",
    };

    const emojiMap: Record<string, string> = {
        Critical: "🔴",
        High: "🟠",
        Medium: "🟡",
        Low: "🟢",
    };

    return (
        <span
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full font-semibold ${colors[priority] || "bg-muted text-gray-700"
                }`}
        >
            {emojiMap[priority]} {priority}
        </span>
    );
}

/* ================= Actions Dropdown ================= */
interface ActionsDropdownProps {
    item: UrgentTask;
    onView: (item: UrgentTask) => void;
    onEdit: (item: UrgentTask) => void;
    onDelete: (id: number) => void;
}

function ActionsDropdown({ item, onView, onEdit, onDelete }: ActionsDropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-3 py-1 bg-muted rounded hover:bg-muted text-gray-700 font-medium"
            >
                Actions <ChevronDown size={16} />
            </button>

            {open && (
                <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-md z-50">
                    <DropdownButton text="View" color="blue" icon={<Package size={16} />} onClick={() => { onView(item); setOpen(false); }} />
                    <DropdownButton text="Edit" color="yellow" icon={<Pencil size={16} />} onClick={() => { onEdit(item); setOpen(false); }} />
                    <DropdownButton text="Delete" color="red" icon={<Trash2 size={16} />} onClick={() => { onDelete(item.id); setOpen(false); }} />
                </div>
            )}
        </div>
    );
}

/* ================= Dropdown Button ================= */
interface DropdownButtonProps {
    text: string;
    color: string;
    icon: React.ReactNode;
    onClick: () => void;
}

function DropdownButton({ text, color, icon, onClick }: DropdownButtonProps) {
    const colorClasses: Record<string, string> = {
        blue: "text-blue-700",
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