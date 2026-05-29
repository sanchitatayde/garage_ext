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
import { toast } from "@/lib/store/toast";

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

  function uploadPhotos() {
    toast("Camera opening to capture repair photos…", "info");
  }

  function openGallery() {
    toast("Photo gallery coming soon", "info");
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
      <section className="bg-brand-soft px-5 py-4">
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
          <Chip tone="neutral" className="font-mono">
            CASHLESS
          </Chip>
        </div>
      </section>

      <section className="px-5 py-4 space-y-5">
        {/* Estimate Approved card */}
        <Card padding="md" className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[16px] font-semibold text-ink">
              Estimate Approved
            </h2>
            <Chip tone="neutral" className="font-mono">
              CASHLESS
            </Chip>
          </div>
          <div className="rounded-[12px] bg-brand-soft p-3.5 border border-brand/15">
            <p className="text-[13px] font-semibold text-brand-strong">
              {claim.payoutMessage ?? "Insurer will pay you directly"}
            </p>
            <p className="mt-1.5">
              <span className="text-[26px] font-semibold text-ink">
                {inr(claim.approvedAmount ?? 38420)}
              </span>
              <span className="text-[13px] text-muted ml-1.5">approved</span>
            </p>
          </div>
          <p className="text-[11px] text-muted leading-snug">
            Amount is insurer-reported. DSP relays status; it does not
            control the payout.
          </p>
        </Card>

        {/* Upload Repair photos CTA */}
        <Button fullWidth size="lg" type="button" onClick={uploadPhotos}>
          Upload Repair photos
        </Button>

        {/* Timeline (inline, no card wrap) */}
        <div className="pt-1">
          <h2 className="text-[18px] font-semibold text-ink mb-3">
            Timeline
          </h2>
          {claim.stages && claim.stages.length > 0 ? (
            <VerticalStepper stages={claim.stages} />
          ) : (
            <p className="text-[13px] text-muted">
              Timeline will appear once the claim progresses.
            </p>
          )}
        </div>

        {/* Documents & Photos */}
        <div>
          <h2 className="text-[18px] font-semibold text-ink mb-2">
            Documents &amp; Photos
          </h2>
          <Card padding="md">
            <MediaStrip
              count={claim.damagePhotos?.count ?? 8}
              label="Damage"
              maxVisible={3}
              onOpen={openGallery}
            />
          </Card>
        </div>

        <p className="text-[12px] text-muted text-center pt-4 pb-2">
          IAR Services — Supporting your claims since 2003
        </p>
      </section>
    </main>
  );
}
