export type Garage = {
  name: string;
  city: string;
  gstin: string;
  address: string;
  contact: { name: string; phone: string };
  initials: string;
};

export type ClaimStatus =
  | "registered"
  | "investigation"
  | "settlement"
  | "in-survey"
  | "approved"
  | "settled"
  | "rejected"
  | "repudiated"
  | "closed";

export type StageState = "done" | "current" | "future";

export type StageSubItem = {
  title: string;
  timestamp?: string;
  state?: "in-progress" | "pending" | "done";
  icon?: "spinner" | "doc" | "image" | "check";
};

export type Stage = {
  id: string;
  title: string;
  state: StageState;
  timestamp?: string;
  detail?: string;
  detailTone?: "warn" | "danger" | "muted";
  pill?: string;
  subItems?: StageSubItem[];
};

export type Claim = {
  id: string;
  claimNo: string;
  shortRef?: string;
  vehicle: string;
  regNo: string;
  insurer: string;
  insured?: { name: string };
  status: ClaimStatus;
  statusDetail?: string;
  statusDetailTone?: "positive" | "negative" | "neutral";
  updatedAt: string; // human-readable
  // Dashboard-only display fields
  stage?: number;
  totalStages?: number;
  stageLabel?: string;
  alert?: { title: string; subtitle: string; due?: string } | null;
  // Detail-page fields
  approvedAmount?: number;
  payoutMode?: "cashless" | "reimbursement";
  payoutMessage?: string;
  stages?: Stage[];
  documents?: { count: number; lastAddedRelative: string };
  damagePhotos?: { count: number; lastAddedRelative: string };
};

export type TaskType = "doc" | "photo";

export type Task = {
  id: string;
  title: string;
  vehicle: string;
  claimRef: string;
  due?: string;
  type: TaskType;
};

export type OnboardingTaskType = "doc" | "survey";
export type OnboardingTaskState = "pending" | "done";
export type OnboardingTask = {
  id: string;
  title: string;
  description?: string;
  state: OnboardingTaskState;
  type: OnboardingTaskType;
  required?: boolean;
};
