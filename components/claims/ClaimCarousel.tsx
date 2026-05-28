"use client";
import * as React from "react";
import { ClaimCard } from "./ClaimCard";
import { cn } from "@/lib/cn";
import type { Claim } from "@/types";

export function ClaimCarousel({ claims }: { claims: Claim[] }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  }

  function scrollTo(idx: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="space-y-3">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="overflow-x-auto snap-x snap-mandatory flex gap-3 no-scrollbar -mx-5 px-5"
      >
        {claims.map((c) => (
          <div
            key={c.id}
            className="snap-center shrink-0 w-[calc(100%-0px)] first:ml-0"
            style={{ scrollSnapAlign: "center" }}
          >
            <ClaimCard claim={c} />
          </div>
        ))}
      </div>
      {claims.length > 1 && (
        <div
          role="tablist"
          aria-label="Claim navigation"
          className="flex justify-center gap-1.5"
        >
          {claims.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to claim ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-5 bg-ink" : "w-1.5 bg-border-strong"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
