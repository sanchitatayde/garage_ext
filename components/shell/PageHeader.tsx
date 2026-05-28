"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
  trailing?: React.ReactNode;
};

export function PageHeader({ title, subtitle, trailing }: Props) {
  const router = useRouter();
  return (
    <header className="flex items-center gap-2 px-3 py-3 border-b border-border bg-surface">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Back"
        className="w-9 h-9 rounded-full inline-flex items-center justify-center hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
      >
        <ChevronLeft size={20} />
      </button>
      {(title || subtitle) && (
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-[15px] font-semibold text-ink leading-tight truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[12px] text-muted leading-tight truncate">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {trailing && <div className="ml-auto">{trailing}</div>}
    </header>
  );
}
