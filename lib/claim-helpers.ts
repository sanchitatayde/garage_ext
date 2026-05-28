import type { ClaimStatus } from "@/types";
import type { ChipTone } from "@/components/ui/Chip";

export function statusLabel(status: ClaimStatus): string {
  switch (status) {
    case "registered":
      return "REGISTERED";
    case "investigation":
      return "UNDER INVESTIGATION";
    case "settlement":
      return "UNDER SETTLEMENT";
    case "in-survey":
      return "IN SURVEY";
    case "approved":
      return "APPROVED";
    case "settled":
      return "SETTLED";
    case "rejected":
    case "repudiated":
      return "REPUDIATED";
    case "closed":
      return "CLOSED";
    default:
      return String(status).toUpperCase();
  }
}

export function statusTone(status: ClaimStatus): ChipTone {
  switch (status) {
    case "registered":
    case "investigation":
    case "settlement":
    case "approved":
      return "success";
    case "in-survey":
      return "warn";
    case "rejected":
    case "repudiated":
      return "danger";
    case "settled":
    case "closed":
      return "neutral";
    default:
      return "neutral";
  }
}
