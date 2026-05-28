import * as React from "react";
import { Check, Loader2, FileText, Image as ImageIcon, CircleCheck } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { cn } from "@/lib/cn";
import type { Stage, StageSubItem, StageState } from "@/types";

export function VerticalStepper({ stages }: { stages: Stage[] }) {
  return (
    <div>
      {stages.map((s, i) => {
        const isLast = i === stages.length - 1;
        const next = stages[i + 1];
        const lineSolid = !!next && next.state !== "future";
        return (
          <div key={s.id} className="flex gap-3">
            <div className="flex flex-col items-center w-5 shrink-0">
              <Marker state={s.state} />
              {!isLast && (
                <span
                  className={cn(
                    "flex-1 my-0.5",
                    lineSolid
                      ? "w-0.5 bg-brand"
                      : "w-0.5 bg-[repeating-linear-gradient(to_bottom,#d4d4d8_0_3px,transparent_3px_7px)]"
                  )}
                />
              )}
            </div>
            <div className={cn("flex-1 min-w-0", !isLast && "pb-5")}>
              <p
                className={cn(
                  "text-[15px] font-semibold leading-tight",
                  s.state === "future" ? "text-muted" : "text-ink"
                )}
              >
                {s.title}
              </p>
              {s.timestamp && (
                <p className="text-[12px] text-muted mt-0.5">{s.timestamp}</p>
              )}
              {s.subItems && s.subItems.length > 0 && (
                <div className="mt-3 space-y-2">
                  {s.subItems.map((item, j) => (
                    <SubItemRow key={j} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Marker({ state }: { state: StageState }) {
  if (state === "done") {
    return (
      <span className="w-5 h-5 rounded-full bg-brand inline-flex items-center justify-center shrink-0">
        <Check size={12} className="text-white" strokeWidth={3.5} />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span className="w-5 h-5 rounded-full border-[3px] border-brand bg-surface shrink-0" />
    );
  }
  return (
    <span className="w-5 h-5 rounded-full border-2 border-border-strong bg-surface shrink-0" />
  );
}

function SubItemRow({ item }: { item: StageSubItem }) {
  const isProgress = item.state === "in-progress";
  const Icon =
    item.icon === "spinner"
      ? Loader2
      : item.icon === "image"
      ? ImageIcon
      : item.icon === "check"
      ? CircleCheck
      : FileText;
  return (
    <div className="flex items-center gap-2.5">
      <IconTile size="sm" tone={isProgress ? "warn" : "neutral"}>
        <Icon
          size={14}
          className={cn(isProgress && item.icon === "spinner" && "animate-spin")}
        />
      </IconTile>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-ink truncate">
          {item.title}
        </p>
        {item.timestamp && (
          <p className="text-[11px] text-muted truncate">{item.timestamp}</p>
        )}
      </div>
    </div>
  );
}
