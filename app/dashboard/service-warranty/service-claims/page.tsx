
// app/dashboard/service-warranty/service-claims/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    Search, FileSpreadsheet, FileText, Wrench, Package,
    ArrowRightLeft, CheckCircle2, X, ChevronDown, Eye,
    Pencil, Trash2, Printer, RotateCcw, Monitor, AlertCircle, Calendar
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface Claim {
    id: number;
    reference: string;
    category: string;
    submitted: string;
    deviceCategory: string;
    serial: string;
    problem: string;
    status: string;
    vendor: string;
}

const data: Claim[] = [
    { id: 1, reference: "14494", category: "User Device", submitted: "2026-02-10 11:13:23", deviceCategory: "Mouse", serial: "2508APW6YT49", problem: "Mouse not working", status: "Claimed", vendor: "Startech" },
    { id: 2, reference: "12794", category: "User Device", submitted: "2026-01-08 15:10:29", deviceCategory: "Laptop-LC1", serial: "2RL19T3", problem: "Touchpad not working", status: "Transfer To Vendor", vendor: "Digital Equipment Ltd" },
    { id: 3, reference: "12795", category: "User Device", submitted: "2026-01-07 15:10:29", deviceCategory: "Laptop-LC2", serial: "2RL19T3", problem: "Touchpad not working", status: "Transfer To Vendor", vendor: "Digital Equipment Ltd" },
    { id: 4, reference: "12796", category: "User Device", submitted: "2026-01-05 15:10:29", deviceCategory: "Laptop-LC3", serial: "2RL19T3", problem: "Touchpad not working", status: "Transfer To Vendor", vendor: "Digital Equipment Ltd" },
    { id: 5, reference: "12797", category: "User Device", submitted: "2026-01-04 15:10:29", deviceCategory: "Mouse", serial: "2RL19T3", problem: "Touchpad not working", status: "Closed", vendor: "Digital Equipment Ltd" },
    { id: 6, reference: "12798", category: "User Device", submitted: "2026-01-03 15:10:29", deviceCategory: "Laptop-LC3", serial: "2RL19T3", problem: "Touchpad not working", status: "Closed", vendor: "Digital Equipment Ltd" },
    { id: 7, reference: "12799", category: "User Device", submitted: "2026-01-12 15:10:29", deviceCategory: "Laptop", serial: "2RL19T3", problem: "Touchpad not working", status: "Transfer To Vendor", vendor: "Digital Equipment Ltd" },
    { id: 8, reference: "127800", category: "User Device", submitted: "2026-02-21 15:10:29", deviceCategory: "Desktop", serial: "2RL19T3", problem: "Touchpad not working", status: "Closed", vendor: "Digital Equipment Ltd" },
    { id: 9, reference: "127801", category: "User Device", submitted: "2026-02-20 15:10:29", deviceCategory: "Laptop-LC2", serial: "2RL19T3", problem: "Touchpad not working", status: "Claimed", vendor: "Digital Equipment Ltd" },
    { id: 10, reference: "127802", category: "User Device", submitted: "2026-01-21 15:10:29", deviceCategory: "RAM", serial: "2RL19T3", problem: "Touchpad not working", status: "Transfer To Vendor", vendor: "Digital Equipment Ltd" },
];

const statusCfg: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode; desc: string }> = {
    "Claimed": { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", icon: <Package size={10} />, desc: "Service has been claimed and is under review." },
    "Transfer To Vendor": { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", icon: <ArrowRightLeft size={10} />, desc: "Device has been transferred to vendor for service." },
    "Closed": { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: <CheckCircle2 size={10} />, desc: "Service claim has been resolved and closed." },
};

function StatusBadge({ status }: { status: string }) {
    const cfg = statusCfg[status] || { color: "text-muted-foreground", bg: "bg-muted", border: "border-border", icon: null };
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full font-semibold border whitespace-nowrap ${cfg.bg} ${cfg.color} ${cfg.border}`}>
            {cfg.icon} {status}
        </span>
    );
}

function exportCSV(rows: Claim[]) {
    const headers = ["SL", "Reference", "Category", "Submitted", "Device", "Serial", "Problem", "Status", "Vendor"];
    const csv = [headers, ...rows.map((r, i) => [i + 1, r.reference, r.category, r.submitted, r.deviceCategory, r.serial, r.problem, r.status, r.vendor])]
        .map(row => row.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `service-claims-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
}

function exportPDF(rows: Claim[]) {
    const trs = rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r.reference}</td><td>${r.deviceCategory}</td><td>${r.serial}</td><td>${r.problem}</td><td>${r.status}</td><td>${r.vendor}</td><td>${r.submitted}</td></tr>`).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Service Claims</title>
    <style>body{font-family:Arial,sans-serif;font-size:11px;padding:24px;color:#111}h2{font-size:16px;margin-bottom:4px}p{color:#666;font-size:10px;margin-bottom:16px}table{width:100%;border-collapse:collapse}th{background:#f1f5f9;text-align:left;padding:8px 10px;font-size:10px;text-transform:uppercase;border-bottom:2px solid #e2e8f0}td{padding:7px 10px;border-bottom:1px solid #e2e8f0}tr:nth-child(even) td{background:#f8fafc}.footer{margin-top:20px;font-size:10px;color:#999;text-align:right}</style>
    </head><body><h2>Service Claims Report</h2><p>Generated: ${new Date().toLocaleString()} · Total: ${rows.length}</p>
    <table><thead><tr><th>#</th><th>Reference</th><th>Device</th><th>Serial</th><th>Problem</th><th>Status</th><th>Vendor</th><th>Submitted</th></tr></thead>
    <tbody>${trs}</tbody></table><div class="footer">Fiber@Home Ltd. · ITM Portal</div></body></html>`;
    const win = window.open(URL.createObjectURL(new Blob([html], { type: "text/html" })), "_blank");
    win?.addEventListener("load", () => win.print());
}

function InfoField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className={`text-[11px] font-semibold text-foreground mt-0.5 break-words ${mono ? "font-mono" : ""}`}>{value || "—"}</p>
        </div>
    );
}

function ViewModal({ item, onClose }: { item: Claim; onClose: () => void }) {
    const cfg = statusCfg[item.status];
    return (
        <DialogPrimitive.Root open onOpenChange={onClose}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                <DialogPrimitive.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[560px] max-h-[88vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-card border border-border">

                    <div className="shrink-0 bg-primary px-5 py-3.5 flex items-center justify-between">
                        <div>
                            <DialogPrimitive.Title className="text-sm font-semibold text-primary-foreground">
                                Service Claim Details
                            </DialogPrimitive.Title>
                            <p className="text-[11px] text-primary-foreground/70 mt-0.5">Ref: {item.reference}</p>
                        </div>
                        <DialogPrimitive.Close className="rounded-lg p-1.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors">
                            <X className="h-4 w-4" />
                        </DialogPrimitive.Close>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-3">

                        <div className="rounded-xl border border-border overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
                                <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                                <p className="text-xs font-semibold text-foreground">Claim Information</p>
                            </div>
                            <div className="px-4 py-3 grid grid-cols-3 gap-3 bg-card">
                                <InfoField label="Reference" value={item.reference} />
                                <InfoField label="Category" value={item.category} />
                                <InfoField label="Submitted" value={item.submitted} />
                            </div>
                        </div>

                        <div className="rounded-xl border border-border overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
                                <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                                <p className="text-xs font-semibold text-foreground">Device Information</p>
                            </div>
                            <div className="px-4 py-3 grid grid-cols-3 gap-3 bg-card">
                                <InfoField label="Device" value={item.deviceCategory} />
                                <InfoField label="Serial" value={item.serial} mono />
                                <InfoField label="Vendor" value={item.vendor} />
                            </div>
                        </div>

                        <div className="rounded-xl border border-border overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
                                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                <p className="text-xs font-semibold text-foreground">Problem Description</p>
                            </div>
                            <div className="px-4 py-3 bg-card">
                                <p className="text-[11px] text-foreground font-medium">{item.problem}</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <p className="text-xs font-semibold text-foreground">Current Status</p>
                            </div>
                            <div className="px-4 py-3 bg-card flex items-center gap-3">
                                <StatusBadge status={item.status} />
                                {cfg && <p className="text-[10px] text-muted-foreground">{cfg.desc}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 px-5 py-3 border-t border-border bg-muted/40 flex justify-end">
                        <button onClick={onClose} className="px-5 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                            Close
                        </button>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

function ActionsDropdown({ item, onView, onEdit, onDelete, onReturn, onPrint }: {
    item: Claim;
    onView: (i: Claim) => void;
    onEdit: (i: Claim) => void;
    onDelete: (id: number) => void;
    onReturn: (i: Claim) => void;
    onPrint: (i: Claim) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);
    const close = () => setOpen(false);
    return (
        <div ref={ref} className="relative inline-block">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-muted hover:bg-border rounded-lg border border-border transition text-foreground">
                Actions <ChevronDown size={11} />
            </button>
            {open && (
                <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden py-1">
                    <DropItem icon={<Eye size={12} />} label="View" color="text-blue-600" onClick={() => { onView(item); close(); }} />
                    <DropItem icon={<Pencil size={12} />} label="Edit" color="text-amber-600" onClick={() => { onEdit(item); close(); }} />
                    <DropItem icon={<RotateCcw size={12} />} label="Return" color="text-purple-600" onClick={() => { onReturn(item); close(); }} />
                    <DropItem icon={<Printer size={12} />} label="Print Preview" color="text-slate-600" onClick={() => { onPrint(item); close(); }} />
                    <div className="border-t border-border my-1" />
                    <DropItem icon={<Trash2 size={12} />} label="Delete" color="text-red-600" onClick={() => { onDelete(item.id); close(); }} />
                </div>
            )}
        </div>
    );
}

function DropItem({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
    return (
        <button onClick={onClick} className={`flex items-center gap-2 w-full px-3 py-1.5 text-[11px] font-medium ${color} hover:bg-muted transition`}>
            {icon} {label}
        </button>
    );
}

export default function ServiceClaimsPage() {
    const [search, setSearch] = useState("");
    const [activeStatus, setActiveStatus] = useState<string | null>(null);
    const [viewItem, setViewItem] = useState<Claim | null>(null);

    const filtered = data.filter(item => {
        const matchSearch = !search ||
            item.reference.toLowerCase().includes(search.toLowerCase()) ||
            item.deviceCategory.toLowerCase().includes(search.toLowerCase()) ||
            item.vendor.toLowerCase().includes(search.toLowerCase()) ||
            item.problem.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !activeStatus || item.status === activeStatus;
        return matchSearch && matchStatus;
    });

    const stats = [
        { label: "Total Claims", value: data.length, color: "text-foreground", bg: "bg-muted border-border", icon: <Wrench size={14} />, status: null },
        { label: "Claimed", value: data.filter(d => d.status === "Claimed").length, color: "text-blue-700", bg: "bg-blue-50 border-blue-100", icon: <Package size={14} />, status: "Claimed" },
        { label: "Transfer To Vendor", value: data.filter(d => d.status === "Transfer To Vendor").length, color: "text-amber-700", bg: "bg-amber-50 border-amber-100", icon: <ArrowRightLeft size={14} />, status: "Transfer To Vendor" },
        { label: "Closed", value: data.filter(d => d.status === "Closed").length, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100", icon: <CheckCircle2 size={14} />, status: "Closed" },
    ];

    return (
        <div className="p-4 sm:p-6 space-y-4">

            {/* Header */}
            <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                            <Wrench className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-foreground">Service Claims</h1>
                            <p className="text-xs text-muted-foreground mt-0.5">Track and manage all device service claim requests</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => exportCSV(filtered)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition">
                            <FileSpreadsheet size={13} /> Excel
                        </button>
                        <button onClick={() => exportPDF(filtered)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition">
                            <FileText size={13} /> PDF
                        </button>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {stats.map(s => (
                        <button key={s.label}
                            onClick={() => setActiveStatus(activeStatus === s.status ? null : s.status)}
                            className={`rounded-xl border px-4 py-3 text-left transition ring-2 hover:opacity-80 ${s.bg} ${activeStatus === s.status && s.status !== null ? "ring-primary" : "ring-transparent"}`}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground leading-tight">{s.label}</p>
                                <span className={`${s.color} opacity-50`}>{s.icon}</span>
                            </div>
                            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex flex-wrap justify-between items-center px-4 py-3 border-b border-border gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[11px] text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {data.length} entries
                        </p>
                        {activeStatus && (
                            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                                {activeStatus} <button onClick={() => setActiveStatus(null)}><X size={10} /></button>
                            </span>
                        )}
                    </div>
                    <div className="relative">
                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <Input placeholder="Search reference, device, vendor..." value={search} onChange={e => setSearch(e.target.value)} className="pl-7 h-7 w-56 text-xs" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                {["#", "Reference", "Category", "Submitted", "Device", "Serial", "Problem", "Status", "Vendor", "Actions"].map(col => (
                                    <th key={col} className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filtered.map((item, i) => (
                                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-3 py-2.5 text-[11px] text-muted-foreground">{i + 1}</td>
                                    <td className="px-3 py-2.5">
                                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{item.reference}</span>
                                    </td>
                                    <td className="px-3 py-2.5 text-[11px] text-muted-foreground">{item.category}</td>
                                    <td className="px-3 py-2.5 text-[11px] text-muted-foreground whitespace-nowrap">{item.submitted}</td>
                                    <td className="px-3 py-2.5 text-[11px] text-foreground font-medium">{item.deviceCategory}</td>
                                    <td className="px-3 py-2.5 text-[11px] text-muted-foreground font-mono">{item.serial}</td>
                                    <td className="px-3 py-2.5 text-[11px] text-foreground max-w-[120px] truncate" title={item.problem}>{item.problem}</td>
                                    <td className="px-3 py-2.5"><StatusBadge status={item.status} /></td>
                                    <td className="px-3 py-2.5 text-[11px] text-foreground whitespace-nowrap">{item.vendor}</td>
                                    <td className="px-3 py-2.5">
                                        <ActionsDropdown
                                            item={item}
                                            onView={setViewItem}
                                            onEdit={i => console.log("Edit", i)}
                                            onDelete={id => console.log("Delete", id)}
                                            onReturn={i => console.log("Return", i)}
                                            onPrint={i => console.log("Print", i)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="py-8 text-center text-xs text-muted-foreground">
                                        No records match your search.
                                        {activeStatus && <button onClick={() => setActiveStatus(null)} className="ml-2 text-primary hover:underline">Clear filter</button>}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {viewItem && <ViewModal item={viewItem} onClose={() => setViewItem(null)} />}
        </div>
    );
}
