import { cn } from "@/lib/cn";

type Props = {
  count: number;
  label?: string;
  maxVisible?: number;
  onOpen?: () => void;
  className?: string;
};

/**
 * Horizontal thumbnail strip with overflow indicator (e.g. "+5").
 * For the prototype, thumbs are grey placeholders. Replace with <img />
 * once real media exists.
 */
export function MediaStrip({
  count,
  label = "Damage",
  maxVisible = 3,
  onOpen,
  className,
}: Props) {
  if (count <= 0) return null;
  const visible = Math.min(count, maxVisible);
  const overflow = count - visible;
  const cells = Array.from({ length: visible }).map((_, i) => ({
    label,
    overflow: false,
    key: `t-${i}`,
  }));
  if (overflow > 0) {
    cells.push({
      label: `+${overflow}`,
      overflow: true,
      key: "overflow",
    });
  }

  return (
    <div className={cn("grid grid-cols-4 gap-2", className)}>
      {cells.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={onOpen}
          className="aspect-square rounded-[10px] bg-zinc-300 relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          aria-label={c.overflow ? `View ${c.label.slice(1)} more` : c.label}
        >
          <span
            className={cn(
              "absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-white text-[10px] font-semibold",
              c.overflow ? "bg-ink/90" : "bg-ink/80"
            )}
          >
            {c.label}
          </span>
        </button>
      ))}
    </div>
  );
}
