"use client";
import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Inbox,
  FileText,
  Camera,
  Check,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { AppHeader } from "@/components/shell/AppHeader";
import { ClaimCarousel } from "@/components/claims/ClaimCarousel";
import { TaskRow } from "@/components/tasks/TaskRow";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { useSession } from "@/lib/store/session";
import {
  getClaims,
  getTasks,
  getOnboardingTasks,
} from "@/lib/mock-data";
import { toast } from "@/lib/store/toast";
import type { Claim, OnboardingTask, Task } from "@/types";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const garage = useSession((s) => s.garage);
  const params = useSearchParams();
  const isOnboarding =
    params.get("empty") === "1" || params.get("onboarding") === "1";

  if (isOnboarding) {
    return <OnboardingView garageName={garage?.name ?? "Sai Garage"} />;
  }

  return <DashboardView garageName={garage?.name ?? "Sai Garage"} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Normal dashboard (claims + tasks)
// ─────────────────────────────────────────────────────────────────────────────
function DashboardView({ garageName }: { garageName: string }) {
  const [loading, setLoading] = React.useState(true);
  const [claims, setClaims] = React.useState<Claim[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setClaims(getClaims());
      setTasks(getTasks());
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const subtitle = loading
    ? "Loading…"
    : `You have ${claims.length} active claim${
        claims.length === 1 ? "" : "s"
      }`;

  return (
    <>
      <AppHeader title={`${garageName} Claims`} subtitle={subtitle} />
      <section className="px-5 pt-5 pb-8 space-y-7">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-44 w-full" />
            <div className="flex justify-center gap-1.5">
              <Skeleton className="h-1.5 w-5" />
              <Skeleton className="h-1.5 w-1.5" />
            </div>
          </div>
        ) : claims.length === 0 ? (
          <EmptyClaims />
        ) : (
          <ClaimCarousel claims={claims} />
        )}

        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <h2 className="text-[15px] font-semibold text-ink">
              Tasks for you
            </h2>
            {!loading && tasks.length > 0 && (
              <span className="inline-flex items-center justify-center text-[11px] h-5 px-2 rounded-full bg-surface-sunken text-ink-2 font-medium">
                {tasks.length}
              </span>
            )}
          </div>

          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-[68px] w-full" />
              <Skeleton className="h-[68px] w-full" />
            </div>
          ) : tasks.length === 0 ? (
            <EmptyTasks />
          ) : (
            <Card padding="none" className="overflow-hidden">
              {tasks.map((t, i) => (
                <div
                  key={t.id}
                  className={
                    i < tasks.length - 1 ? "border-b border-border" : ""
                  }
                >
                  <TaskRow task={t} />
                </div>
              ))}
            </Card>
          )}
        </div>

        <Link
          href="/home?empty=1"
          className="block text-center text-[12px] text-muted underline underline-offset-2 pt-2"
        >
          View first-time / empty state →
        </Link>
      </section>
    </>
  );
}

function EmptyClaims() {
  return (
    <div className="border border-dashed border-border rounded-[16px] p-6 text-center space-y-2 bg-surface-sunken/40">
      <Inbox size={22} className="mx-auto text-muted" />
      <p className="text-[14px] font-medium text-ink">No active claims</p>
      <p className="text-[12px] text-muted">
        New claims sent your way will appear here.
      </p>
    </div>
  );
}

function EmptyTasks() {
  return (
    <div className="border border-border rounded-[14px] p-4 text-center">
      <p className="text-[13px] text-muted">
        You&apos;re all caught up — no tasks pending.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// First-time / empty onboarding view
// ─────────────────────────────────────────────────────────────────────────────
function OnboardingView({ garageName }: { garageName: string }) {
  const [tasks, setTasks] = React.useState<OnboardingTask[]>(() =>
    getOnboardingTasks()
  );

  const docs = tasks.filter((t) => t.type === "doc");
  const survey = tasks.find((t) => t.type === "survey");
  const doneCount = tasks.filter((t) => t.state === "done").length;
  const totalCount = tasks.length;

  function markDone(id: string, label: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, state: "done" } : t))
    );
    toast(`${label} uploaded`, "success");
  }

  function startSurvey() {
    toast("Launching camera for live image survey…", "info");
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.type === "survey" ? { ...t, state: "done" } : t
        )
      );
      toast("Live image survey submitted", "success");
    }, 1200);
  }

  return (
    <>
      <AppHeader
        title={`${garageName} Claims`}
        subtitle="Setting up your account"
      />

      <section className="px-5 pt-5 pb-8 space-y-6">
        {/* Hero card with progress */}
        <Card tone="brand" padding="md" className="space-y-3">
          <div>
            <h2 className="text-[18px] font-semibold text-ink leading-tight">
              Finish setting up your garage
            </h2>
            <p className="text-[13px] text-muted mt-1">
              Complete these to start receiving claim assignments from your
              tied-up insurers.
            </p>
          </div>
          <div className="space-y-2">
            <ProgressDots total={totalCount} current={doneCount} />
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted">Setup progress</span>
              <span className="font-mono font-semibold text-ink">
                {doneCount} of {totalCount}
              </span>
            </div>
          </div>
        </Card>

        {/* Required documents */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <h3 className="text-[15px] font-semibold text-ink">
              Required documents
            </h3>
            <span className="inline-flex items-center justify-center text-[11px] h-5 px-2 rounded-full bg-surface-sunken text-ink-2 font-medium">
              {docs.filter((d) => d.state === "pending").length} remaining
            </span>
          </div>
          <Card padding="none" className="overflow-hidden">
            {docs.map((d, i) => (
              <DocTaskRow
                key={d.id}
                task={d}
                onUpload={() => markDone(d.id, d.title)}
                divider={i < docs.length - 1}
              />
            ))}
          </Card>
        </div>

        {/* Verification — live image survey */}
        {survey && (
          <div>
            <h3 className="text-[15px] font-semibold text-ink mb-2.5">
              Verification
            </h3>
            <Card
              tone={survey.state === "done" ? "default" : "default"}
              padding="md"
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <IconTile
                  size="lg"
                  tone={survey.state === "done" ? "brand" : "warn"}
                >
                  {survey.state === "done" ? (
                    <Check size={20} strokeWidth={2.5} />
                  ) : (
                    <Camera size={20} />
                  )}
                </IconTile>
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-semibold text-ink leading-tight">
                    {survey.title}
                  </p>
                  <p className="text-[13px] text-muted mt-0.5">
                    {survey.description}
                  </p>
                </div>
                {survey.state === "done" && (
                  <Chip tone="success" size="sm">
                    Done
                  </Chip>
                )}
              </div>
              {survey.state === "pending" && (
                <Button
                  fullWidth
                  size="md"
                  trailingIcon={<ArrowRight size={16} />}
                  onClick={startSurvey}
                >
                  Start survey
                </Button>
              )}
            </Card>
          </div>
        )}

        {/* What happens next */}
        <Card padding="md" tone="sunken">
          <p className="text-[12px] font-mono uppercase tracking-wide text-muted">
            What happens next
          </p>
          <p className="text-[13px] text-ink mt-2 leading-relaxed">
            Once we verify your details, you&apos;ll start receiving claim
            assignments on the <strong>Home</strong> tab. You&apos;ll be
            notified by SMS + WhatsApp.
          </p>
        </Card>

        {doneCount === totalCount && (
          <Card tone="brand" padding="md" className="text-center space-y-1">
            <Check size={20} className="mx-auto text-brand-strong" />
            <p className="text-[14px] font-semibold text-brand-strong">
              All set!
            </p>
            <p className="text-[12px] text-muted">
              We&apos;re reviewing your details — you&apos;ll hear back within
              24 hours.
            </p>
          </Card>
        )}

        <Link
          href="/home"
          className="block text-center text-[12px] text-muted underline underline-offset-2 pt-2"
        >
          ← Back to demo dashboard
        </Link>
      </section>
    </>
  );
}

function DocTaskRow({
  task,
  onUpload,
  divider,
}: {
  task: OnboardingTask;
  onUpload: () => void;
  divider?: boolean;
}) {
  const isDone = task.state === "done";
  return (
    <button
      type="button"
      onClick={isDone ? undefined : onUpload}
      disabled={isDone}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${
        isDone ? "bg-surface" : "hover:bg-surface-sunken"
      } ${divider ? "border-b border-border" : ""}`}
    >
      <IconTile tone={isDone ? "brand" : "neutral"}>
        {isDone ? (
          <Check size={18} strokeWidth={2.5} />
        ) : (
          <FileText size={18} />
        )}
      </IconTile>
      <div className="flex-1 min-w-0">
        <p
          className={`text-[14px] font-semibold truncate ${
            isDone ? "text-muted line-through" : "text-ink"
          }`}
        >
          {task.title}
        </p>
        {task.required && !isDone && (
          <p className="text-[11px] text-muted">Required</p>
        )}
      </div>
      {isDone ? (
        <Chip tone="success" size="sm">
          Uploaded
        </Chip>
      ) : (
        <span className="text-[13px] font-semibold text-ink inline-flex items-center gap-0.5">
          Upload
          <ChevronRight size={16} className="text-subtle" />
        </span>
      )}
    </button>
  );
}
