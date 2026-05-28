"use client";
import * as React from "react";
import { PageHeader } from "@/components/shell/PageHeader";
import { FilterChips } from "@/components/ui/FilterChips";
import { ClaimListCard } from "@/components/claims/ClaimListCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { getMyClaims } from "@/lib/mock-data";
import type { Claim, ClaimStatus } from "@/types";

type Filter = {
  value: string;
  label: string;
  matches: (s: ClaimStatus) => boolean;
};

const FILTERS: Filter[] = [
  { value: "all", label: "All", matches: () => true },
  {
    value: "investigation",
    label: "Investigation",
    matches: (s) => s === "investigation",
  },
  {
    value: "registered",
    label: "Registered",
    matches: (s) => s === "registered",
  },
  {
    value: "settlement",
    label: "Settlement",
    matches: (s) => s === "settlement",
  },
  {
    value: "repudiated",
    label: "Rejected",
    matches: (s) => s === "repudiated" || s === "rejected",
  },
  {
    value: "closed",
    label: "Closed",
    matches: (s) => s === "closed" || s === "settled",
  },
];

export default function MyClaimsPage() {
  const [filter, setFilter] = React.useState("all");
  const [loading, setLoading] = React.useState(true);
  const [claims, setClaims] = React.useState<Claim[]>([]);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setClaims(getMyClaims());
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const selectedFilter = FILTERS.find((f) => f.value === filter) ?? FILTERS[0];
  const visible = loading
    ? []
    : claims.filter((c) => selectedFilter.matches(c.status));

  const options = FILTERS.map((f) => ({
    value: f.value,
    label: f.label,
    count:
      f.value === "all"
        ? claims.length
        : claims.filter((c) => f.matches(c.status)).length,
  }));

  return (
    <>
      <PageHeader title="My Claims" />
      <section className="px-5 py-4 space-y-4">
        <FilterChips
          options={options}
          value={filter}
          onChange={setFilter}
        />
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : visible.length === 0 ? (
          <div className="border border-dashed border-border rounded-[16px] p-6 text-center space-y-1 bg-surface-sunken/40">
            <p className="text-[14px] font-medium text-ink">No claims here</p>
            <p className="text-[12px] text-muted">
              Try a different filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {visible.map((c) => (
              <ClaimListCard key={c.id} claim={c} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
