import * as React from "react";
import { cn } from "@/lib/cn";

export type ChipTone =
  | "neutral"
  | "brand"
  | "success"
  | "warn"
  | "danger"
  | "info";

export type ChipProps = {
  tone?: ChipTone;
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
};

const tones: Record<ChipTone, string> = {
  neutral: "bg-surface-sunken text-ink-2",
  brand: "bg-brand-soft text-brand-strong",
  success: "bg-success-soft text-success",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
};

export function Chip({
  tone = "neutral",
  size = "md",
  children,
  className,
}: ChipProps) {
  const sz =
    size === "sm" ? "text-[11px] h-5 px-2" : "text-[12px] h-6 px-2.5";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap",
        tones[tone],
        sz,
        className
      )}
    >
      {children}
    </span>
  );
}
