import { cn } from "@/lib/cn";

export type ProgressSegmentedProps = {
  total: number;
  current: number; // number of filled segments (0..total)
  className?: string;
  tone?: "brand" | "ink";
};

export function ProgressSegmented({
  total,
  current,
  className,
  tone = "brand",
}: ProgressSegmentedProps) {
  const filled = tone === "brand" ? "bg-brand" : "bg-ink";
  const c = Math.min(Math.max(current, 0), total);
  return (
    <div
      className={cn("flex gap-1.5 w-full", className)}
      role="progressbar"
      aria-valuenow={c}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Stage ${c} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex-1 h-1.5 rounded-full",
            i < c ? filled : "bg-surface-sunken"
          )}
        />
      ))}
    </div>
  );
}
