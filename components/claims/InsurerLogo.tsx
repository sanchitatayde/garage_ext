import { cn } from "@/lib/cn";

// Maps an insurer name → a small, brand-coloured logo tile.
// For the prototype these are simple coloured squares with the carrier name
// stacked inside; in production these would be real PNG/SVG logos.
const INSURERS: Record<
  string,
  { bg: string; fg: string; lines: [string, string?] }
> = {
  "ICICI Lombard": { bg: "#c1272d", fg: "#fff", lines: ["ICICI", "Lombard"] },
  "HDFC Ergo": { bg: "#cb0c2e", fg: "#fff", lines: ["HDFC", "ERGO"] },
  "Bajaj Allianz": { bg: "#003478", fg: "#fff", lines: ["Bajaj", "Allianz"] },
  "TATA AIG": { bg: "#0033a1", fg: "#fff", lines: ["TATA", "AIG"] },
  "Reliance General": { bg: "#1e1e5a", fg: "#fff", lines: ["Reliance"] },
  "Go Digit": { bg: "#7a2cf6", fg: "#fff", lines: ["Digit"] },
  "Acko": { bg: "#fbcb46", fg: "#111", lines: ["acko"] },
};

export function InsurerLogo({
  insurer,
  size = "md",
  className,
}: {
  insurer: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const cfg =
    INSURERS[insurer] ?? {
      bg: "#3f3f46",
      fg: "#fff",
      lines: [insurer.slice(0, 4)] as [string, string?],
    };
  const sizeCls =
    size === "sm" ? "w-9 h-9 text-[8px]" : "w-11 h-11 text-[8.5px]";
  return (
    <span
      role="img"
      aria-label={insurer}
      className={cn(
        "rounded-[6px] inline-flex flex-col items-center justify-center font-semibold leading-tight px-1 text-center shrink-0",
        sizeCls,
        className
      )}
      style={{ backgroundColor: cfg.bg, color: cfg.fg }}
    >
      {cfg.lines.map((l, i) => (
        <span key={i}>{l}</span>
      ))}
    </span>
  );
}
