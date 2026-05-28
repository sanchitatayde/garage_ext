"use client";
import { cn } from "@/lib/cn";

export type FilterChipOption = {
  value: string;
  label: string;
  count?: number;
};

export function FilterChips({
  options,
  value,
  onChange,
  className,
}: {
  options: FilterChipOption[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5",
        className
      )}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "shrink-0 h-10 inline-flex items-center gap-2 pl-3.5 pr-1.5 rounded-full border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand",
              active
                ? "bg-ink border-ink text-white"
                : "bg-surface border-border text-ink hover:bg-surface-sunken"
            )}
          >
            <span className="text-[13px] font-medium whitespace-nowrap">
              {o.label}
            </span>
            {typeof o.count === "number" && (
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-semibold font-mono",
                  active
                    ? "bg-zinc-700 text-white"
                    : "bg-surface-sunken text-muted"
                )}
              >
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
