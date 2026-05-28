"use client";
import * as React from "react";
import { Inbox } from "lucide-react";
import { AppHeader } from "@/components/shell/AppHeader";
import { ClaimCarousel } from "@/components/claims/ClaimCarousel";
import { TaskRow } from "@/components/tasks/TaskRow";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import { useSession } from "@/lib/store/session";
import { getClaims, getTasks } from "@/lib/mock-data";
import type { Claim, Task } from "@/types";

export default function HomePage() {
  const garage = useSession((s) => s.garage);
  const [loading, setLoading] = React.useState(true);
  const [claims, setClaims] = React.useState<Claim[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  // Simulate a brief fetch so the skeletons are visible.
  React.useEffect(() => {
    const t = setTimeout(() => {
      setClaims(getClaims());
      setTasks(getTasks());
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const title = `${garage?.name ?? "Sai Garage"} Claims`;
  const subtitle = loading
    ? "Loading…"
    : `You have ${claims.length} active claim${claims.length === 1 ? "" : "s"}`;

  return (
    <>
      <AppHeader title={title} subtitle={subtitle} />
      <section className="px-5 pt-5 pb-8 space-y-7">
        {/* Claim carousel */}
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

        {/* Tasks for you */}
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
                  className={i < tasks.length - 1 ? "border-b border-border" : ""}
                >
                  <TaskRow task={t} />
                </div>
              ))}
            </Card>
          )}
        </div>
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
