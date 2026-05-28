import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  total: number;
  current: number; // 1-based; number of stages completed
  className?: string;
};

/**
 * Dot-connector progress (e.g. Stage 2 of 4):
 *   ●—●—○—○
 * Filled dots + connecting line are brand-green; remaining are grey.
 */
export function ProgressDots({ total, current, className }: Props) {
  const c = Math.min(Math.max(current, 0), total);
  return (
    <div
      role="progressbar"
      aria-valuenow={c}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Stage ${c} of ${total}`}
      className={cn("flex items-center w-full", className)}
    >
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <span
            className={cn(
              "w-3 h-3 rounded-full shrink-0 border-2",
              i < c
                ? "bg-brand border-brand"
                : "bg-surface border-border-strong"
            )}
          />
          {i < total - 1 && (
            <span
              className={cn(
                "flex-1 h-0.5",
                i < c - 1 ? "bg-brand" : "bg-border-strong"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
