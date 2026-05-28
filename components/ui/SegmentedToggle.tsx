"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

export type SegmentedItem = {
  value: string;
  label: React.ReactNode;
  leadingIcon?: React.ReactNode;
};

export type SegmentedToggleProps = {
  items: SegmentedItem[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  ariaLabel?: string;
};

export function SegmentedToggle({
  items,
  value,
  onChange,
  className,
  ariaLabel,
}: SegmentedToggleProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex p-1 gap-1 rounded-[12px] bg-surface-sunken w-full",
        className
      )}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={cn(
              "flex-1 h-10 px-3 rounded-[10px] text-[13px] transition inline-flex items-center justify-center gap-2",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand",
              active
                ? "bg-surface text-ink shadow-sm font-medium"
                : "text-muted hover:text-ink"
            )}
          >
            {it.leadingIcon}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
