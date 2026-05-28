import Link from "next/link";
import { notFound } from "next/navigation";
import { Info, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { VerticalStepper } from "@/components/claims/VerticalStepper";
import { getClaim } from "@/lib/mock-data";
import { inr } from "@/lib/format";
import { statusLabel } from "@/lib/claim-helpers";

export default async function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const claim = getClaim(id);
  if (!claim) return notFound();

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

      {/* Vehicle status banner */}
      <section className="bg-brand-soft px-5 py-4">
        <div className="flex items-center gap-1.5 text-ink flex-wrap">
          <span className="text-[16px] font-semibold">{claim.vehicle}</span>
          <span className="text-muted">·</span>
          <span className="font-mono text-[14px] text-ink">{claim.regNo}</span>
          <Info size={14} className="text-muted ml-1" />
        </div>
        <p className="font-mono text-[11px] tracking-wide text-brand-strong font-semibold uppercase mt-1">
          {statusLabel(claim.status)}
        </p>
      </section>

      <section className="px-5 py-4 space-y-4">
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

        {/* View Repair photos CTA */}
        <Button fullWidth size="lg" type="button">
          View Repair photos
        </Button>

        {/* Timeline */}
        <div className="pt-2">
          <h2 className="text-[18px] font-semibold text-ink mb-3">Timeline</h2>
          <Card padding="md">
            {claim.stages && claim.stages.length > 0 ? (
              <VerticalStepper stages={claim.stages} />
            ) : (
              <p className="text-[13px] text-muted">
                Timeline will appear once the claim progresses.
              </p>
            )}
          </Card>
        </div>

        {/* Documents */}
        {claim.documents && (
          <div>
            <h2 className="text-[18px] font-semibold text-ink mb-2">
              Documents
            </h2>
            <DocsRow
              count={claim.documents.count}
              subtitle={claim.documents.lastAddedRelative}
            />
          </div>
        )}

        {/* Damage Photos */}
        {claim.damagePhotos && (
          <div>
            <h2 className="text-[18px] font-semibold text-ink mb-2">
              Damage Photos
            </h2>
            <DocsRow
              count={claim.damagePhotos.count}
              subtitle={claim.damagePhotos.lastAddedRelative}
            />
          </div>
        )}

        <p className="text-[12px] text-muted text-center pt-4 pb-2">
          IAR Services — Supporting your claims since 2003
        </p>
      </section>
    </main>
  );
}

function DocsRow({
  count,
  subtitle,
}: {
  count: number;
  subtitle: string;
}) {
  return (
    <Card
      padding="md"
      className="flex items-center gap-3 hover:bg-surface-sunken transition cursor-pointer"
    >
      <ThumbStack />
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-ink">
          {count} uploaded
        </p>
        <p className="text-[12px] text-muted">{subtitle}</p>
      </div>
      <span className="text-subtle text-lg">›</span>
    </Card>
  );
}

function ThumbStack() {
  return (
    <div className="flex shrink-0">
      <div className="w-11 h-11 rounded-[8px] bg-zinc-200 border-2 border-surface relative" />
      <div className="w-11 h-11 rounded-[8px] bg-zinc-300 border-2 border-surface relative -ml-3" />
      <div className="w-11 h-11 rounded-[8px] bg-zinc-400 border-2 border-surface relative -ml-3" />
    </div>
  );
}
