//This will now work with your API route.

// services/assignedTTService.ts

import { assignedTTService } from "@/models/AssignedTT";    //connecting model shape

// Simulated fetch function to get assigned TTs              //connects to API route

export async function getAssignedTTs(): Promise<assignedTTService[]> {
    // Mock data (later replace with DB)
    return [
        {
            id: 1,
            employee_id: "EMP016",
            title: "Design Dashboard UI",
            assignedTo: "Shakil Akhter Khan",
            assigned_tt_no: "2",
        },
        {
            id: 2,
            employee_id: "EMP015",
            title: "Fix API Integration",
            assignedTo: "Md. Saulad",
            assigned_tt_no: "2",
        },
        {
            id: 3,
            employee_id: "EMP014",
            title: "Fix API Integration",
            assignedTo: "Nur Hosen",
            assigned_tt_no: "3",
        },
        {
            id: 4,
            employee_id: "EMP013",
            title: "Fix API Integration",
            assignedTo: "S. M. Ariful",
            assigned_tt_no: "5",
        },

        {
            id: 5,
            employee_id: "EMP012",
            title: "Fix API Integration",
            assignedTo: "Ruhul Amin",
            assigned_tt_no: "4",
        },
    ];
}
