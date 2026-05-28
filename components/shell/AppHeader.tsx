"use client";
import { Menu, Bell } from "lucide-react";
import { useMenu } from "@/lib/store/menu";

type Props = {
  title: string;
  subtitle?: string;
  hasNotification?: boolean;
};

export function AppHeader({ title, subtitle, hasNotification = true }: Props) {
  const openMenu = useMenu((s) => s.open);
  return (
    <header className="flex items-center gap-3 px-3 py-3 border-b border-border bg-surface">
      <button
        type="button"
        aria-label="Open menu"
        onClick={openMenu}
        className="w-10 h-10 rounded-full inline-flex items-center justify-center hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
      >
        <Menu size={20} />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] font-semibold text-ink leading-tight truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-muted leading-tight truncate">
            {subtitle}
          </p>
        )}
      </div>
      <button
        type="button"
        aria-label="Notifications"
        className="relative w-10 h-10 rounded-full inline-flex items-center justify-center hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand border border-border"
      >
        <Bell size={18} />
        {hasNotification && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
        )}
      </button>
    </header>
  );
}
