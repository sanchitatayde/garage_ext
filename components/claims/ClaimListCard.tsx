import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";
import { statusLabel, statusTone } from "@/lib/claim-helpers";
import type { Claim } from "@/types";

export function ClaimListCard({ claim }: { claim: Claim }) {
  return (
    <Link
      href={`/claims/${claim.id}`}
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand rounded-[16px]"
    >
      <Card padding="md" className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
            {claim.claimNo}
          </p>
          <Chip tone={statusTone(claim.status)}>{statusLabel(claim.status)}</Chip>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold text-ink leading-tight">
            {claim.vehicle}
          </h3>
          <p className="font-mono text-[12px] text-muted mt-0.5">
            {claim.regNo} · {claim.insurer}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          {claim.statusDetail && (
            <p
              className={cn(
                "text-[14px] font-semibold truncate",
                claim.statusDetailTone === "positive" && "text-brand-strong",
                claim.statusDetailTone === "negative" && "text-danger",
                claim.statusDetailTone === "neutral" && "text-muted"
              )}
            >
              {claim.statusDetail}
            </p>
          )}
          <div className="flex items-center gap-1 text-muted shrink-0">
            <span className="text-[11px]">{claim.updatedAt}</span>
            <ChevronRight size={16} className="text-subtle" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
