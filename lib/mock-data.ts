import type { Claim, Garage, Task } from "@/types";

export const SAI_GARAGE: Garage = {
  name: "Sai Garage",
  city: "Pune",
  gstin: "27AABCS1234N1ZZ",
  address: "Plot 14, MIDC Industrial Area, Viman Nagar",
  contact: { name: "Ramesh Pawar", phone: "+91 98765 43210" },
  initials: "SG",
};

// Dashboard carousel claims — short / active for the home page.
const DASHBOARD_CLAIMS: Claim[] = [
  {
    id: "ZP-CLM-2026-04-1842",
    claimNo: "ZP-CLM-2026-04-1842",
    vehicle: "Hyundai Verna Lxi",
    regNo: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "in-survey",
    stage: 2,
    totalStages: 4,
    stageLabel: "Under assessment",
    alert: {
      title: "Action needed",
      subtitle: "Re-upload front bumper photo",
      due: "Due 4 hrs",
    },
    updatedAt: "Today",
  },
  {
    id: "ZP-CLM-2026-04-1843",
    claimNo: "ZP-CLM-2026-04-1843",
    vehicle: "Maruti Swift VXi",
    regNo: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "approved",
    stage: 3,
    totalStages: 4,
    stageLabel: "Approved for repair",
    alert: null,
    updatedAt: "1 day ago",
  },
];

// My Claims list — all claims, including history.
const MY_CLAIMS: Claim[] = [
  {
    id: "c-1842",
    claimNo: "CLM-2026-04-1842",
    vehicle: "Hyundai Verna Lxi",
    regNo: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "registered",
    statusDetail: "Documents requested",
    statusDetailTone: "positive",
    updatedAt: "6 days ago",
  },
  {
    id: "c-1843",
    claimNo: "CLM-2026-04-1843",
    vehicle: "Hyundai Verna Lxi",
    regNo: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "investigation",
    statusDetail: "₹18,400 estimated",
    statusDetailTone: "positive",
    updatedAt: "6 days ago",
  },
  {
    id: "c-1844",
    claimNo: "CLM-2026-04-1844",
    vehicle: "Hyundai Verna",
    regNo: "MH 32 MM 56483",
    insurer: "HDFC Ergo",
    status: "settlement",
    statusDetail: "Repair ongoing",
    statusDetailTone: "positive",
    updatedAt: "1 day ago",
    approvedAmount: 38420,
    payoutMode: "cashless",
    payoutMessage: "Insurer will pay your Garage directly",
    stages: [
      {
        id: "s1",
        title: "Registered",
        state: "done",
        timestamp: "22 Feb, 11:00 AM",
      },
      {
        id: "s2",
        title: "Under investigation",
        state: "done",
        timestamp: "24 Feb, 11:00 AM",
      },
      {
        id: "s3",
        title: "Under Settlement",
        state: "current",
        timestamp: "Last updated 22 Feb, 11:00 AM",
        subItems: [
          {
            title: "Repair ongoing",
            timestamp: "Last updated 26 Feb, 11:00 AM",
            state: "in-progress",
            icon: "spinner",
          },
          {
            title: "Repair photos uploaded",
            timestamp: "Last updated 26 Feb, 11:00 AM",
            state: "in-progress",
            icon: "spinner",
          },
          { title: "Invoice uploaded", state: "pending", icon: "doc" },
          { title: "Repair evaluated", state: "pending", icon: "image" },
          { title: "Discharge approved", state: "pending", icon: "image" },
        ],
      },
      { id: "s4", title: "Closed", state: "future" },
    ],
    documents: { count: 6, lastAddedRelative: "Last added today · tap to view" },
    damagePhotos: {
      count: 6,
      lastAddedRelative: "Last added today · tap to view",
    },
  },
  {
    id: "c-1845",
    claimNo: "CLM-2026-04-1845",
    vehicle: "Mahindra Scorpio S5",
    regNo: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "repudiated",
    statusDetail: "DL not valid at date of loss",
    statusDetailTone: "negative",
    updatedAt: "6 days ago",
  },
  {
    id: "c-1846",
    claimNo: "CLM-2026-04-1846",
    vehicle: "Mahindra Scorpio S5",
    regNo: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "closed",
    statusDetail: "Claim Settled",
    statusDetailTone: "neutral",
    updatedAt: "20 Apr 2024",
  },
];

const TASKS: Task[] = [
  {
    id: "t1",
    title: "Upload Driving License",
    vehicle: "Hyundai Verna Lxi",
    claimRef: "CLM-2026-04-18",
    due: "2 days",
    type: "doc",
  },
  {
    id: "t2",
    title: "Reupload front bumper",
    vehicle: "Hyundai Verna Lxi",
    claimRef: "CLM-2026-04-184",
    type: "photo",
  },
];

// Accessors.
export function getDashboardClaims(): Claim[] {
  return DASHBOARD_CLAIMS;
}
export function getMyClaims(): Claim[] {
  return MY_CLAIMS;
}
export function getClaim(id: string): Claim | undefined {
  // Look in both lists; fall back to the detail-rich claim so any tap shows
  // the "Repair Approved · repair ongoing" detail per spec.
  return (
    MY_CLAIMS.find((c) => c.id === id) ||
    DASHBOARD_CLAIMS.find((c) => c.id === id) ||
    MY_CLAIMS.find((c) => !!c.stages)
  );
}
export function getTasks(): Task[] {
  return TASKS;
}

// Legacy alias for screens still using getClaims() (e.g. dashboard).
export const getClaims = getDashboardClaims;
