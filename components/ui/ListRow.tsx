import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ListRowProps = {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  destructive?: boolean;
  divider?: boolean;
};

export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  className,
  destructive,
  divider = false,
}: ListRowProps) {
  const interactive = !!onClick;
  const Comp = (interactive ? "button" : "div") as React.ElementType;
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 py-3 px-2 -mx-2 text-left",
        interactive &&
          "hover:bg-surface-sunken transition rounded-[12px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand",
        divider && "border-b border-border",
        className
      )}
    >
      {leading}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-[15px] font-medium truncate",
            destructive ? "text-danger" : "text-ink"
          )}
        >
          {title}
        </div>
        {subtitle && (
          <div className="text-[13px] text-muted truncate">{subtitle}</div>
        )}
      </div>
      {trailing ??
        (interactive ? (
          <ChevronRight className="w-5 h-5 text-subtle shrink-0" />
        ) : null)}
    </Comp>
  );
}
