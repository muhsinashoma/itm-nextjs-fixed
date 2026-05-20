
/**
 * Temporary static data
 * Later replace with database API
 */

//services/ → handles fetching, mock data, API calls, business logic

import { UserReport } from "@/models/UserReport";
const MOCK_USERS: UserReport[] = [
    {
        slNo: 1,
        employeeName: "Zubair Hasan Chowdhury",
        employeeId: "02-2161",
        designation: "Senior Engineer",
        function: "Network Planning, Integration and Operations",
        department: "Technology and Operations",
        postingArea: "NMC",
        postingDistrict: "Dhaka",
        personalMobile: "01554530574",
        officeMobile: "01894940365",
        email: "zubair.hasan@fiberathome.net",
        // status: "Assigned"
    },
    {
        slNo: 2,
        employeeName: "Sarah Khan",
        employeeId: "02-2190",
        designation: "System Analyst",
        function: "Infrastructure",
        department: "IT",
        postingArea: "HQ",
        postingDistrict: "Dhaka",
        personalMobile: "01700000000",
        officeMobile: "01811111111",
        email: "sarah.khan@example.com",
        //status: "Transferred"
    },
    {
        slNo: 3,
        employeeName: "Zohara Khanam",
        employeeId: "02-1889",
        designation: "Assistant General Manager",
        function: "Felicity",
        department: "Felicity IDC Limited",
        postingArea: "Head Office",
        postingDistrict: "Dhaka",
        personalMobile: "01712550629",
        officeMobile: "01712550629",
        email: "zohara@fiberathome.net",
        //  status: "Returned"
    },
    {
        slNo: 4,
        employeeName: "Zubair Hasan Chowdhury",
        employeeId: "02-2161",
        designation: "Senior Engineer",
        function: "Network Planning, Integration and Operations",
        department: "Technology and Operations",
        postingArea: "NMC",
        postingDistrict: "Dhaka",
        personalMobile: "01554530574",
        officeMobile: "01894940365",
        email: "zubair.hasan@fiberathome.net",
        // status: "Returned"
    },
    {
        slNo: 5,
        employeeName: "Zubaer Md. Tanvir",
        employeeId: "02-1536",
        designation: "Senior Engineer",
        function: "Network Operation Centre",
        department: "Technology and Operations",
        postingArea: "BHTC, Kaliakair",
        postingDistrict: "Gazipur",
        personalMobile: "01836433214",
        officeMobile: "01738908542",
        email: "zubaer@fiberathome.net",
        //status: "Transferred"
    },
    {
        slNo: 6,
        employeeName: "Zohara Khanam",
        employeeId: "02-1889",
        designation: "Assistant General Manager",
        function: "",
        department: "Felicity IDC Limited",
        postingArea: "Head Office",
        postingDistrict: "Dhaka",
        personalMobile: "01712550629",
        officeMobile: "01712550629",
        email: "zohara@fiberathome.net",
        //status: "Assigned"
    },
    {
        slNo: 7,
        employeeName: "Zubair Hasan Chowdhury",
        employeeId: "02-2161",
        designation: "Senior Engineer",
        function: "Network Planning, Integration and Operations",
        department: "Technology and Operations",
        postingArea: "NMC",
        postingDistrict: "Dhaka",
        personalMobile: "01554530574",
        officeMobile: "01894940365",
        email: "zubair.hasan@fiberathome.net",
        //status: "Transferred"
    },
    {
        slNo: 8,
        employeeName: "Zubaer Md. Tanvir",
        employeeId: "02-1536",
        designation: "Senior Engineer",
        function: "Network Operation Centre",
        department: "Technology and Operations",
        postingArea: "BHTC, Kaliakair",
        postingDistrict: "Gazipur",
        personalMobile: "01836433214",
        officeMobile: "01738908542",
        email: "zubaer@fiberathome.net",
        //status: "Returned"
    },
    {
        slNo: 9,
        employeeName: "Zohara Khanam",
        employeeId: "02-1889",
        designation: "Assistant General Manager",
        function: "",
        department: "Felicity IDC Limited",
        postingArea: "Head Office",
        postingDistrict: "Dhaka",
        personalMobile: "01712550629",
        officeMobile: "01712550629",
        email: "zohara@fiberathome.net",
        //status: "Returned"
    },
    {
        slNo: 10,
        employeeName: "Zubair Hasan Chowdhury",
        employeeId: "02-2161",
        designation: "Senior Engineer",
        function: "Network Planning, Integration and Operations",
        department: "Technology and Operations",
        postingArea: "NMC",
        postingDistrict: "Dhaka",
        personalMobile: "01554530574",
        officeMobile: "01894940365",
        email: "zubair.hasan@fiberathome.net",
        //status: "Transferred"
    },
    {
        slNo: 11,
        employeeName: "Zubaer Md. Tanvir",
        employeeId: "02-1536",
        designation: "Senior Engineer",
        function: "Network Operation Centre",
        department: "Technology and Operations",
        postingArea: "BHTC, Kaliakair",
        postingDistrict: "Gazipur",
        personalMobile: "01836433214",
        officeMobile: "01738908542",
        email: "zubaer@fiberathome.net",
        //status: "Returned"
    },
    {
        slNo: 12,
        employeeName: "Zohara Khanam",
        employeeId: "02-1889",
        designation: "Assistant General Manager",
        function: "",
        department: "Felicity IDC Limited",
        postingArea: "Head Office",
        postingDistrict: "Dhaka",
        personalMobile: "01712550629",
        officeMobile: "01712550629",
        email: "zohara@fiberathome.net",
        //status: "Assigned"
    },


];


export async function getUserReports(): Promise<UserReport[]> {
    // simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_USERS;
}
