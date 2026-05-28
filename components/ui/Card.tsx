import * as React from "react";
import { cn } from "@/lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "brand" | "sunken";
  padding?: "none" | "sm" | "md" | "lg";
};

export function Card({
  tone = "default",
  padding = "md",
  className,
  ...rest
}: CardProps) {
  const tones = {
    default: "bg-surface border-border",
    brand: "bg-brand-soft border-brand-soft",
    sunken: "bg-surface-sunken border-transparent",
  } as const;
  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
  } as const;
  return (
    <div
      {...rest}
      className={cn(
        "rounded-[16px] border",
        tones[tone],
        paddings[padding],
        className
      )}
    />
  );
}
