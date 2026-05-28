import * as React from "react";
import { cn } from "@/lib/cn";

export type IconTileTone =
  | "brand"
  | "warn"
  | "danger"
  | "neutral"
  | "info"
  | "ink";

export type IconTileProps = {
  tone?: IconTileTone;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

const tones: Record<IconTileTone, string> = {
  brand: "bg-brand-soft text-brand-strong",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-sunken text-ink-2",
  ink: "bg-ink text-white",
};

export function IconTile({
  tone = "neutral",
  size = "md",
  children,
  className,
}: IconTileProps) {
  const sizes = {
    sm: "w-8 h-8 rounded-[8px] text-[14px]",
    md: "w-10 h-10 rounded-[10px] text-[16px]",
    lg: "w-12 h-12 rounded-[12px] text-[18px]",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        tones[tone],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
