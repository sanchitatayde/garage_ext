import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-surface-sunken rounded-[10px]",
        className
      )}
      aria-hidden
    />
  );
}
