import type {
  Claim,
  ClaimStatus,
  Garage,
  OnboardingTask,
  Task,
} from "@/types";

export const SAI_GARAGE: Garage = {
  name: "Sai Garage",
  city: "Pune",
  gstin: "27AABCS1234N1ZZ",
  address: "Plot 14, MIDC Industrial Area, Viman Nagar",
  contact: { name: "Ramesh Pawar", phone: "+91 98765 43210" },
  initials: "SG",
};

// Single source of truth for claims. Dashboard filters to active statuses;
// My Claims shows everything; detail pages look up by id.
const CLAIMS: Claim[] = [
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
    stage: 1,
    totalStages: 4,
    stageLabel: "Documents needed",
    alert: {
      title: "Action needed",
      subtitle: "Upload required documents",
      due: "Due in 4 days",
    },
    stages: [
      {
        id: "s1",
        title: "Registered",
        state: "current",
        timestamp: "Today at 11:00 AM",
      },
      { id: "s2", title: "Under investigation", state: "future" },
      { id: "s3", title: "Approved", state: "future" },
      { id: "s4", title: "Closed", state: "future" },
    ],
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
    stage: 2,
    totalStages: 4,
    stageLabel: "Under assessment",
    alert: null,
    stages: [
      {
        id: "s1",
        title: "Registered",
        state: "done",
        timestamp: "20 Feb, 11:00 AM",
      },
      {
        id: "s2",
        title: "Under investigation",
        state: "current",
        timestamp: "22 Feb, 11:00 AM",
      },
      { id: "s3", title: "Approved", state: "future" },
      { id: "s4", title: "Closed", state: "future" },
    ],
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
    stage: 3,
    totalStages: 4,
    stageLabel: "Under settlement",
    alert: null,
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
    documents: {
      count: 6,
      lastAddedRelative: "Last added today · tap to view",
    },
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

const ACTIVE_STATUSES = new Set<ClaimStatus>([
  "registered",
  "investigation",
  "settlement",
  "in-survey",
  "approved",
]);

const TASKS: Task[] = [
  {
    id: "t1",
    title: "Upload Driving License",
    vehicle: "Hyundai Verna Lxi",
    claimRef: "c-1842",
    due: "2 days",
    type: "doc",
  },
  {
    id: "t2",
    title: "Reupload front bumper",
    vehicle: "Hyundai Verna Lxi",
    claimRef: "c-1842",
    type: "photo",
  },
];

// First-time garage onboarding checklist — used when the user hasn't given
// anything yet (no claims, nothing uploaded).
const ONBOARDING_TASKS: OnboardingTask[] = [
  { id: "ob-pan", title: "PAN card", state: "pending", type: "doc", required: true },
  { id: "ob-gst", title: "GST certificate", state: "pending", type: "doc", required: true },
  { id: "ob-license", title: "Garage license", state: "pending", type: "doc", required: true },
  { id: "ob-cheque", title: "Bank cancelled cheque", state: "pending", type: "doc", required: true },
  { id: "ob-id", title: "Owner photo ID (Aadhaar / DL)", state: "pending", type: "doc", required: true },
  { id: "ob-agreement", title: "Signed service agreement", state: "pending", type: "doc", required: true },
  {
    id: "ob-survey",
    title: "Live image survey",
    description: "Verify your garage premises · ~5 min",
    state: "pending",
    type: "survey",
    required: true,
  },
];

// Accessors.
export function getDashboardClaims(): Claim[] {
  return CLAIMS.filter((c) => ACTIVE_STATUSES.has(c.status));
}

export function getMyClaims(): Claim[] {
  return CLAIMS;
}

export function getClaim(id: string): Claim | undefined {
  return CLAIMS.find((c) => c.id === id);
}

export function getTasks(): Task[] {
  return TASKS;
}

export function getOnboardingTasks(): OnboardingTask[] {
  return ONBOARDING_TASKS;
}

// Legacy alias for older imports that used getClaims().
export const getClaims = getDashboardClaims;
