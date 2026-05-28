"use client";
import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { statusLabel, statusTone } from "@/lib/claim-helpers";
import type { Claim } from "@/types";

export function ClaimCard({ claim }: { claim: Claim }) {
  const stage = claim.stage ?? 0;
  const totalStages = claim.totalStages ?? 4;
  const stageLabel = claim.stageLabel ?? "";

  return (
    <Link
      href={`/claims/${claim.id}`}
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand rounded-[16px]"
    >
      <Card tone="brand" padding="md" className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted truncate">
              {claim.claimNo}
            </p>
            <h3 className="text-[18px] font-semibold text-ink mt-0.5 truncate">
              {claim.vehicle}
            </h3>
          </div>
          <Chip tone={statusTone(claim.status)}>
            {statusLabel(claim.status)}
          </Chip>
        </div>

        <div>
          <p className="text-[13px] text-muted mb-2.5">
            Stage {stage} of {totalStages}
            {stageLabel ? ` — ${stageLabel}` : ""}
          </p>
          <ProgressDots total={totalStages} current={stage} />
        </div>

        {claim.alert && (
          <div className="flex items-center gap-3 rounded-[12px] border border-warn/40 bg-surface px-3 py-2.5">
            <AlertTriangle size={18} className="text-warn shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-warn">
                {claim.alert.title}
              </p>
              <p className="text-[12px] text-ink-2 truncate">
                {claim.alert.subtitle}
                {claim.alert.due ? ` · ${claim.alert.due}` : ""}
              </p>
            </div>
            <ChevronRight size={16} className="text-warn shrink-0" />
          </div>
        )}
      </Card>
    </Link>
  );
}
