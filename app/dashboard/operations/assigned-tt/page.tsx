
// app/dashboard/operations/assigned-tt/page.tsx

"use client";

import { useEffect, useState } from "react";
import { sections } from "@/components/tt-data";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface TT {
    id: number;
    title: string;
    date: string;
}

interface Task {
    id: string; // assigned_id (unique)
    assigned_id: string;
    assigned_name: string; // IT Personnel name
    assigned_tt_no: number;
    tt_history: TT[];
}

const assignedNameMap: Record<string, string> = {
    "EMP002-0007": "Shakil Akhter Khan - Deputy General Manager",
    "EMP002-0008": "Md. Saulad Zahir Alvi - Manager",
    "EMP002-0009": "Nur Hosen - Assist Manager",
    "EMP002-0010": "Rustam Ali - Assist Manager",
    "EMP002-0011": "S.M. Ariful - Sr. Engineer",
    "EMP002-0012": "Sakib Mashrafi Apu - Engineer",
    "EMP002-0013": "Ruhul Amin - Engineer",
};

export default function AssignedTTPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTT, setCurrentTT] = useState<Task | null>(null);
    const [memberFilter, setMemberFilter] = useState("");

    // Group TTs by assigned_id
    useEffect(() => {
        const grouped: Record<string, Task> = {};

        sections.forEach((item) => {
            const emp = item.assigned_id?.toString().trim();

            if (!grouped[emp]) {
                grouped[emp] = {
                    id: emp,
                    assigned_id: emp,
                    assigned_name: assignedNameMap[emp] || "Unknown",
                    assigned_tt_no: 0,
                    tt_history: [],
                };
            }

            grouped[emp].assigned_tt_no += 1;
            grouped[emp].tt_history.push({
                id: Number(item.id),
                title: item.tt_no,
                date: item.created_at || "",
            });
        });

        setTasks(Object.values(grouped));
        setLoading(false);
    }, []);

    // Filter tasks by member
    const filteredTasks = tasks.filter(
        (task) => memberFilter === "" || task.assigned_name === memberFilter
    );

    const openModal = (task: Task) => {
        setCurrentTT(task);
        setModalOpen(true);
    };

    return (
        <div className="p-6 bg-muted min-h-screen">
            <h1 className="text-2xl font-semibold text-blue-600 text-center mb-6">
                Assigned TT
            </h1>

            {/* Filters */}
            <div className="bg-card rounded-xl shadow-sm border p-5 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    {/* Member Filter */}
                    <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                            ITM Member
                        </label>
                        <select
                            value={memberFilter}
                            onChange={(e) => setMemberFilter(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Members</option>
                            {[...new Set(tasks.map((t) => t.assigned_name))].map((member) => (
                                <option key={member} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Clear Filter */}
                    <div>
                        <button
                            onClick={() => setMemberFilter("")}
                            className="w-full bg-blue-50 border border-blue-200 text-blue-700 rounded-lg py-2 hover:bg-blue-100 transition"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Counter */}
                    <div className="text-sm text-muted-foreground text-center md:text-right">
                        Showing <b>{filteredTasks.length}</b> of {tasks.length}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card shadow-md rounded-lg overflow-hidden border border-border">
                {loading ? (
                    <div className="text-center py-12 text-muted-foreground font-medium">
                        Loading tasks...
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-6 py-3 text-gray-700 font-semibold uppercase text-sm tracking-wider">
                                    Emp ID
                                </th>
                                <th className="px-6 py-3 text-gray-700 font-semibold uppercase text-sm tracking-wider">
                                    Assigned To
                                </th>
                                <th className="px-6 py-3 text-gray-700 font-semibold uppercase text-sm tracking-wider">
                                    Total TT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-8 text-muted-foreground font-medium">
                                        No tasks found
                                    </td>
                                </tr>
                            ) : (
                                filteredTasks.map((task) => (
                                    <tr
                                        key={task.id}
                                        className="border-b border-border even:bg-muted hover:bg-muted transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-800">{task.assigned_id}</td>
                                        <td className="px-6 py-4">
                                            {(() => {
                                                const [name, designation] = task.assigned_name.split(" - ");
                                                return (
                                                    <>
                                                        <span className="font-medium text-gray-800">{name}</span>
                                                        {designation && (
                                                            <span className="ml-1 text-blue-400 font-normal">{` - ${designation}`}</span>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => openModal(task)}
                                                className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold"
                                                title={`${task.assigned_tt_no} TT(s)`}
                                            >
                                                {task.assigned_tt_no}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                {currentTT && (
                    <DialogContent className="max-w-4xl w-full bg-white rounded-xl p-6">
                        <DialogClose asChild>
                            <button className="absolute top-4 right-4 text-muted-foreground hover:text-gray-700">
                                ✕
                            </button>
                        </DialogClose>

                        <DialogTitle className="text-lg font-semibold text-blue-600 mb-4 text-center">
                            {`${currentTT.assigned_name} TT History (${currentTT.assigned_tt_no})`}
                        </DialogTitle>

                        {currentTT.tt_history.length ? (
                            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead className="bg-muted sticky top-0 z-10">
                                        <tr>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                SL No
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                TT No
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Employee ID
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Department
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Function
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Delivered Status
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Query Type
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                TT Age
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Created At
                                            </th>
                                            <th className="px-3 py-2 text-gray-700 font-semibold uppercase tracking-wider">
                                                Mobile No
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTT.tt_history.map((tt, index) => {
                                            const ttData = sections.find((s) => Number(s.id) === tt.id);
                                            if (!ttData) return null;

                                            const statusColor = ttData.status?.toLowerCase();
                                            const statusClass =
                                                statusColor === "open"
                                                    ? "bg-green-100 text-green-700"
                                                    : statusColor === "closed"
                                                        ? "bg-red-100 text-red-700"
                                                        : statusColor === "pending"
                                                            ? "bg-orange-100 text-orange-700"
                                                            : statusColor === "not started"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-muted text-muted-foreground";

                                            return (
                                                <tr
                                                    key={tt.id}
                                                    className={`border-b border-border ${index % 2 === 0 ? "bg-muted" : "bg-white"
                                                        } hover:bg-muted transition-colors`}
                                                >
                                                    <td className="px-3 py-2 font-medium text-gray-800">{index + 1}</td>
                                                    <td className="px-3 py-2 font-medium text-gray-800">{ttData.tt_no}</td>
                                                    <td className="px-3 py-2 text-muted-foreground">{ttData.employee_id}</td>
                                                    <td className="px-3 py-2">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
                                                        >
                                                            {ttData.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 text-muted-foreground">{ttData.dept_name}</td>
                                                    <td className="px-3 py-2 text-muted-foreground">{ttData.func_name}</td>
                                                    <td className="px-3 py-2 text-muted-foreground">{ttData.delivered_status || "-"}</td>
                                                    <td className="px-3 py-2 text-muted-foreground">{ttData.query_type}</td>
                                                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                                                        {ttData.tt_age
                                                            ? ttData.tt_age.replace(/\s*Hours$/, " Hours").replace(/\s+/g, " ").trim()
                                                            : "-"}
                                                    </td>
                                                    <td className="px-3 py-2 text-muted-foreground">{ttData.created_at}</td>
                                                    <td className="px-3 py-2 text-muted-foreground">{ttData.mobile_no}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-6 text-sm">No TT history available</p>
                        )}
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}