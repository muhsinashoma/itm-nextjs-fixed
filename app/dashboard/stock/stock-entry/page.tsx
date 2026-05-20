// //app/dashboard/stock/stock-entry/page.tsx

// "use client";

// import React, { useState } from "react";

// interface SCMInventory {
//     mrNumber: string;
//     prId: string;
//     vendorName: string;
//     receivedDate: string;
//     serialNo: string;
//     purchaseDate: string;
//     itemGroup: string;
//     itemName: string;
// }

// interface ITMPart {
//     category: string;
//     brand: string;
//     model: string;
//     cpu: string;
//     ram: string;
//     ssd: string;
//     monitor: string;
//     warrantyEndDate: string;
//     remarks: string;
// }

// interface StockRow {
//     scm: SCMInventory;
//     itm: ITMPart;
//     mrQuantity: number | "";
// }

// export default function StockEntry() {
//     const [rows, setRows] = useState<StockRow[]>([
//         {
//             scm: {
//                 mrNumber: "FAHSC02-22972025-10-19MR125732",
//                 prId: "FAHSC02-22972025-09-04PR13795",
//                 vendorName: "Daffodil Computers Limited",
//                 receivedDate: "2025-10-13T15:17",
//                 serialNo: "2514APC6KVZ9",
//                 purchaseDate: "2025-10-13T15:17",
//                 itemGroup: "Computer Accessories",
//                 itemName: "Mouse-Wireless (Standard)",
//             },
//             itm: {
//                 category: "",
//                 brand: "",
//                 model: "",
//                 cpu: "",
//                 ram: "",
//                 ssd: "",
//                 monitor: "",
//                 warrantyEndDate: "",
//                 remarks: "",
//             },
//             mrQuantity: 5,
//         },
//     ]);

//     const [entryDate, setEntryDate] = useState(
//         new Date().toISOString().slice(0, 16)
//     );
//     const employeeName = "Muhsina Akter";
//     const employeeId = "02-0501";

//     // Handle field change
//     const handleRowChange = (
//         index: number,
//         section: "scm" | "itm" | "mrQuantity",
//         field: string,
//         value: string
//     ) => {
//         const newRows = [...rows];

//         if (section === "mrQuantity") {
//             const num = value === "" ? "" : parseInt(value);
//             if (num === "" || (num >= 1 && num <= 5)) {
//                 newRows[index].mrQuantity = num;
//             }
//         } else {
//             // @ts-ignore
//             newRows[index][section][field] = value;
//         }

//         setRows(newRows);
//     };

//     // Add new row (max 5)
//     const addRow = () => {
//         if (rows.length >= 5) {
//             alert("Maximum 5 rows allowed.");
//             return;
//         }

//         const lastRow = rows[rows.length - 1];
//         // Check if current row is complete
//         const itmFields = Object.values(lastRow.itm);
//         if (
//             !lastRow.mrQuantity ||
//             itmFields.some((v) => v === "")
//         ) {
//             alert("Please fill all ITM fields in the current row before adding a new one.");
//             return;
//         }

//         setRows([
//             ...rows,
//             {
//                 scm: {
//                     mrNumber: "",
//                     prId: "",
//                     vendorName: "",
//                     receivedDate: "",
//                     serialNo: "",
//                     purchaseDate: "",
//                     itemGroup: "",
//                     itemName: "",
//                 },
//                 itm: {
//                     category: "",
//                     brand: "",
//                     model: "",
//                     cpu: "",
//                     ram: "",
//                     ssd: "",
//                     monitor: "",
//                     warrantyEndDate: "",
//                     remarks: "",
//                 },
//                 mrQuantity: 1,
//             },
//         ]);
//     };

//     // Remove row
//     const removeRow = (index: number) => {
//         setRows(rows.filter((_, i) => i !== index));
//     };

//     // Submit
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         for (let i = 0; i < rows.length; i++) {
//             const r = rows[i];
//             if (!r.mrQuantity || r.mrQuantity > 5 || Object.values(r.itm).some(v => !v)) {
//                 alert(`Row ${i + 1} is incomplete or invalid.`);
//                 return;
//             }
//         }

//         alert("Stock entry submitted successfully!");
//         console.log("Rows data:", rows);
//     };

//     return (
//         <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
//             <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-400 pb-2 text-center">
//                 IT Stock Input Form with Material Requisition (MR)
//             </h2>

//             {/* Top Row */}
//             <div className="grid grid-cols-6 gap-4 mb-4">
//                 <div>
//                     <label className="text-red-500">MR Number *</label>
//                     <input
//                         type="text"
//                         value={rows[0].scm.mrNumber}
//                         readOnly
//                         className="w-full border rounded px-2 py-1 bg-muted"
//                     />
//                 </div>
//                 <div>
//                     <label className="text-red-500">MR Quantity *</label>
//                     <input
//                         type="number"
//                         min={1}
//                         max={5}
//                         value={rows[0].mrQuantity}
//                         onChange={(e) => handleRowChange(0, "mrQuantity", "", e.target.value)}
//                         className="w-full border rounded px-2 py-1"
//                     />
//                 </div>
//                 <div>
//                     <label>Entry Date </label>
//                     <input
//                         type="datetime-local"
//                         value={entryDate}
//                         onChange={(e) => setEntryDate(e.target.value)}
//                         className="w-full border rounded px-2 py-1"
//                     />
//                 </div>
//                 <div>
//                     <label>Employee Name </label>
//                     <input
//                         type="text"
//                         value={employeeName}
//                         readOnly
//                         className="w-full border rounded px-2 py-1 bg-muted"
//                     />
//                 </div>
//                 <div>
//                     <label>Employee ID </label>
//                     <input
//                         type="text"
//                         value={employeeId}
//                         readOnly
//                         className="w-full border rounded px-2 py-1 bg-muted"
//                     />
//                 </div>
//                 <div className="flex items-end">
//                     <button
//                         type="submit"
//                         onClick={handleSubmit}
//                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </div>

"use client";

import React, { useState } from "react";

interface SCMInventory {
    mrNumber: string;
    prId: string;
    vendorName: string;
    receivedDate: string;
    serialNo: string;
    purchaseDate: string;
    itemGroup: string;
    itemName: string;
}

interface ITMPart {
    category: string;
    brand: string;
    model: string;
    cpu: string;
    ram: string;
    ssd: string;
    monitor: string;
    warrantyEndDate: string;
    remarks: string;
}

interface StockRow {
    scm: SCMInventory;
    itm: ITMPart;
    mrQuantity: number | "";
}

export default function StockEntry() {
    const [rows, setRows] = useState<StockRow[]>([
        {
            scm: {
                mrNumber: "FAHSC02-22972025-10-19MR125732",
                prId: "FAHSC02-22972025-09-04PR13795",
                vendorName: "Daffodil Computers Limited",
                receivedDate: "2025-10-13T15:17",
                serialNo: "2514APC6KVZ9",
                purchaseDate: "2025-10-13T15:17",
                itemGroup: "Computer Accessories",
                itemName: "Mouse-Wireless (Standard)",
            },
            itm: {
                category: "",
                brand: "",
                model: "",
                cpu: "",
                ram: "",
                ssd: "",
                monitor: "",
                warrantyEndDate: "",
                remarks: "",
            },
            mrQuantity: 5,
        },
    ]);

    const [entryDate, setEntryDate] = useState(
        new Date().toISOString().slice(0, 16)
    );
    const employeeName = "Muhsina Akter";
    const employeeId = "02-0501";

    // Handle field change
    const handleRowChange = (
        index: number,
        section: "scm" | "itm" | "mrQuantity",
        field: string,
        value: string
    ) => {
        const newRows = [...rows];

        if (section === "mrQuantity") {
            const num = value === "" ? "" : parseInt(value);
            if (num === "" || (num >= 1 && num <= 5)) {
                newRows[index].mrQuantity = num;
            }
        } else {
            // @ts-ignore
            newRows[index][section][field] = value;
        }

        setRows(newRows);
    };

    // Add new row (max 5)
    const addRow = () => {
        if (rows.length >= 5) {
            alert("Maximum 5 rows allowed.");
            return;
        }

        const lastRow = rows[rows.length - 1];
        const itmFields = Object.values(lastRow.itm);
        if (!lastRow.mrQuantity || itmFields.some((v) => v === "")) {
            alert(
                "Please fill all ITM fields in the current row before adding a new one."
            );
            return;
        }

        setRows([
            ...rows,
            {
                scm: {
                    mrNumber: "",
                    prId: "",
                    vendorName: "",
                    receivedDate: "",
                    serialNo: "",
                    purchaseDate: "",
                    itemGroup: "",
                    itemName: "",
                },
                itm: {
                    category: "",
                    brand: "",
                    model: "",
                    cpu: "",
                    ram: "",
                    ssd: "",
                    monitor: "",
                    warrantyEndDate: "",
                    remarks: "",
                },
                mrQuantity: 1,
            },
        ]);
    };

    // Remove row
    const removeRow = (index: number) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    // Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            if (!r.mrQuantity || r.mrQuantity > 5 || Object.values(r.itm).some(v => !v)) {
                alert(`Row ${i + 1} is incomplete or invalid.`);
                return;
            }
        }

        alert("Stock entry submitted successfully!");
        console.log("Rows data:", rows);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-background rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2 text-center">
                IT Stock Input Form with Material Requisition (MR)
            </h2>

            {/* Top Row */}
            <div className="grid grid-cols-6 gap-4 mb-4">
                <div>
                    <label className="text-red-500">MR Number *</label>
                    <input
                        type="text"
                        value={rows[0].scm.mrNumber}
                        readOnly
                        className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                    />
                </div>
                <div>
                    <label className="text-red-500">MR Quantity *</label>
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={rows[0].mrQuantity}
                        onChange={(e) =>
                            handleRowChange(0, "mrQuantity", "", e.target.value)
                        }
                        className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                    />
                </div>
                <div>
                    <label>Entry Date </label>
                    <input
                        type="datetime-local"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                    />
                </div>
                <div>
                    <label>Employee Name </label>
                    <input
                        type="text"
                        value={employeeName}
                        readOnly
                        className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                    />
                </div>
                <div>
                    <label>Employee ID </label>
                    <input
                        type="text"
                        value={employeeId}
                        readOnly
                        className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn-primary w-full"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Dynamic Rows */}
            {rows.map((row, index) => (
                <div
                    key={index}
                    className="border border-border p-4 mb-4 rounded bg-background"
                >
                    <h3 className="font-semibold text-primary mb-2">Row #{index + 1}</h3>

                    <div className="grid grid-cols-2 gap-4">
                        {/* SCM Inventory */}
                        <div className="bg-card p-3 rounded">

                            <h4 className="text-primary font-semibold mb-2">SCM Inventory</h4>

                            {Object.entries(row.scm).map(([key, value]) => (
                                <div key={key} className="mb-2">
                                    <label className="block text-muted-foreground capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    <input
                                        type="text"
                                        value={value}
                                        readOnly
                                        className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* ITM Part */}
                        <div className="bg-muted p-3 rounded">
                            <h4 className="text-primary font-semibold mb-2">ITM Part</h4>
                            {Object.entries(row.itm).map(([key, value]) => (
                                <div key={key} className="mb-2">
                                    <label className="block text-muted-foreground capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {key === "remarks" ? (
                                        <textarea
                                            value={value}
                                            onChange={(e) =>
                                                handleRowChange(index, "itm", key, e.target.value)
                                            }
                                            className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                                            placeholder="Enter remarks..."
                                        />
                                    ) : (
                                        <input
                                            type={key === "warrantyEndDate" ? "date" : "text"}
                                            value={value}
                                            onChange={(e) =>
                                                handleRowChange(index, "itm", key, e.target.value)
                                            }
                                            className="w-full border border-border rounded px-2 py-1 bg-input text-foreground"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {rows.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeRow(index)}
                            className="btn-danger mt-2"
                        >
                            Remove Row
                        </button>
                    )}
                </div>
            ))}

            {/* Add Row Button */}
            <button
                type="button"
                onClick={addRow}
                className="btn-primary"
            >
                Add Row
            </button>
        </div>
    );
}

