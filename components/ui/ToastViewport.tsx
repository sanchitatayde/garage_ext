"use client";
import { useToasts } from "@/lib/store/toast";
import { cn } from "@/lib/cn";

export function ToastViewport() {
  const toasts = useToasts((s) => s.toasts);
  if (!toasts.length) return null;
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed left-1/2 -translate-x-1/2 top-4 z-50 flex flex-col gap-2 w-[90%] max-w-[400px] pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            "pointer-events-auto px-4 py-3 rounded-[12px] shadow-md border bg-surface text-[14px]",
            t.tone === "error"
              ? "border-danger/40 bg-danger-soft text-danger"
              : t.tone === "success"
              ? "border-brand/30 bg-brand-soft text-brand-strong"
              : "border-border text-ink"
          )}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
