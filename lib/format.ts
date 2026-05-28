// India locale formatters.
export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const numIN = (n: number) => new Intl.NumberFormat("en-IN").format(n);

export const dateDDMMM = (d: Date | string) => {
  const x = typeof d === "string" ? new Date(d) : d;
  // "28-May-2026"
  return x
    .toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};

export function relativeTime(d: Date | string): string {
  const x = typeof d === "string" ? new Date(d) : d;
  const ms = Date.now() - x.getTime();
  const m = Math.round(ms / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const day = Math.round(h / 24);
  if (day === 1) return "Yesterday";
  if (day < 7) return `${day}d ago`;
  return dateDDMMM(x);
}
