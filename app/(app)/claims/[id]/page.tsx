"use client";
import { use } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { VerticalStepper } from "@/components/claims/VerticalStepper";
import { InsurerLogo } from "@/components/claims/InsurerLogo";
import { MediaStrip } from "@/components/claims/MediaStrip";
import { getClaim } from "@/lib/mock-data";
import { inr } from "@/lib/format";
import { statusLabel } from "@/lib/claim-helpers";
import { toast } from "@/lib/store/toast";
import { cn } from "@/lib/cn";

export default function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const claim = getClaim(id);

  if (!claim) {
    return (
      <>
        <PageHeader title="Claim not found" />
        <main className="px-5 py-8 text-center">
          <p className="text-[14px] text-muted">
            We couldn&apos;t find that claim. Tap back to return.
          </p>
        </main>
      </>
    );
  }

  const isNegative =
    claim.status === "repudiated" || claim.status === "rejected";
  const isClosed = claim.status === "closed" || claim.status === "settled";
  const hasStages = !!claim.stages && claim.stages.length > 0;
  const mediaCount =
    (claim.damagePhotos?.count ?? 0) + (claim.documents?.count ?? 0);
  const damageOnlyCount = claim.damagePhotos?.count ?? 0;

  function uploadPhotos() {
    toast("Camera opening to capture repair photos…", "info");
  }

  return (
    <main>
      <PageHeader
        title={claim.claimNo}
        subtitle="Claim Status"
        trailing={
          <Link
            href="/support"
            aria-label="Open chat support"
            className="w-9 h-9 rounded-full border border-border inline-flex items-center justify-center hover:bg-surface-sunken transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <MessageCircle size={18} />
          </Link>
        }
      />

      {/* Vehicle + insurer banner */}
      <section
        className={cn(
          "px-5 py-4",
          isNegative
            ? "bg-danger-soft"
            : isClosed
            ? "bg-surface-sunken"
            : "bg-brand-soft"
        )}
      >
        <div className="flex items-start gap-3">
          <InsurerLogo insurer={claim.insurer} />
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-semibold text-ink leading-tight truncate">
              {claim.vehicle}
            </p>
            <p className="font-mono text-[12px] text-muted truncate">
              {claim.regNo} · {claim.shortRef ?? claim.claimNo}
            </p>
            {claim.insured && (
              <p className="text-[12px] text-muted mt-0.5 truncate">
                {claim.insured.name}
              </p>
            )}
          </div>
          {claim.payoutMode === "cashless" && (
            <Chip tone="neutral" className="font-mono">
              CASHLESS
            </Chip>
          )}
        </div>
        {/* Status caption when not the rich settlement layout */}
        {(isNegative || isClosed || !claim.approvedAmount) && (
          <p
            className={cn(
              "font-mono text-[11px] tracking-wide font-semibold uppercase mt-2",
              isNegative
                ? "text-danger"
                : isClosed
                ? "text-muted"
                : "text-brand-strong"
            )}
          >
            {statusLabel(claim.status)}
          </p>
        )}
      </section>

      <section className="px-5 py-4 space-y-5">
        {/* Repudiation reason card */}
        {isNegative && claim.statusDetail && (
          <Card padding="md" className="border-danger/30 bg-danger-soft/60">
            <p className="text-[12px] font-mono uppercase tracking-wide text-danger">
              Reason
            </p>
            <p className="text-[15px] font-semibold text-ink mt-1">
              {claim.statusDetail}
            </p>
          </Card>
        )}

        {/* Status card (non-detail-rich, non-negative claims) */}
        {!isNegative && !hasStages && claim.statusDetail && (
          <Card padding="md">
            <p className="text-[12px] font-mono uppercase tracking-wide text-muted">
              Current status
            </p>
            <p className="text-[16px] font-semibold text-ink mt-1">
              {claim.statusDetail}
            </p>
            <p className="text-[12px] text-muted mt-2">
              Updated {claim.updatedAt}
            </p>
          </Card>
        )}

        {/* Estimate Approved card */}
        {claim.approvedAmount && (
          <Card padding="md" className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-[16px] font-semibold text-ink">
                Estimate Approved
              </h2>
              {claim.payoutMode === "cashless" && (
                <Chip tone="neutral" className="font-mono">
                  CASHLESS
                </Chip>
              )}
            </div>
            <div className="rounded-[12px] bg-brand-soft p-3.5 border border-brand/15">
              {claim.payoutMessage && (
                <p className="text-[13px] font-semibold text-brand-strong">
                  {claim.payoutMessage}
                </p>
              )}
              <p className="mt-1.5">
                <span className="text-[26px] font-semibold text-ink">
                  {inr(claim.approvedAmount)}
                </span>
                <span className="text-[13px] text-muted ml-1.5">
                  approved
                </span>
              </p>
            </div>
            <p className="text-[11px] text-muted leading-snug">
              Amount is insurer-reported. DSP relays status; it does not
              control the payout.
            </p>
          </Card>
        )}

        {/* Upload Repair photos CTA — only when this is a repair-stage claim */}
        {claim.approvedAmount && (
          <Button fullWidth size="lg" type="button" onClick={uploadPhotos}>
            Upload Repair photos
          </Button>
        )}

        {/* Timeline (inline, no card wrap — matches new design) */}
        {hasStages && (
          <div className="pt-1">
            <h2 className="text-[18px] font-semibold text-ink mb-3">
              Timeline
            </h2>
            <VerticalStepper stages={claim.stages!} />
          </div>
        )}

        {/* Documents & Photos (merged) */}
        {mediaCount > 0 && (
          <div>
            <h2 className="text-[18px] font-semibold text-ink mb-2">
              Documents &amp; Photos
            </h2>
            <Card padding="md">
              <MediaStrip
                count={damageOnlyCount}
                label="Damage"
                maxVisible={3}
                onOpen={() =>
                  toast("Photo gallery coming soon", "info")
                }
              />
            </Card>
          </div>
        )}

        <p className="text-[12px] text-muted text-center pt-4 pb-2">
          IAR Services — Supporting your claims since 2003
        </p>
      </section>
    </main>
  );
}
