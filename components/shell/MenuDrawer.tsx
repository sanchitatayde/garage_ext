"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { FileText, MessageCircle, X } from "lucide-react";
import { useMenu } from "@/lib/store/menu";
import { useSession } from "@/lib/store/session";

export function MenuDrawer() {
  const isOpen = useMenu((s) => s.isOpen);
  const close = useMenu((s) => s.close);
  const garage = useSession((s) => s.garage);
  const router = useRouter();

  // Esc closes the drawer.
  React.useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  function go(href: string) {
    close();
    router.push(href);
  }

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-30">
      {/* Backdrop — click to close. */}
      <div
        onClick={close}
        aria-hidden="true"
        className="absolute inset-0 bg-black/45 drawer-backdrop-enter"
      />

      {/* Drawer panel. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-surface shadow-xl flex flex-col drawer-panel-enter"
      >
        <div className="px-3 pt-4 pb-2 flex items-center justify-end">
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full inline-flex items-center justify-center hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 pb-6 space-y-1.5">
          <button
            type="button"
            onClick={() => go("/profile")}
            className="w-full flex items-center gap-3 p-3 rounded-[14px] bg-brand-soft text-left hover:bg-brand-soft/80 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span className="w-11 h-11 rounded-full bg-ink text-white inline-flex items-center justify-center font-semibold">
              {garage?.initials ?? "SG"}
            </span>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[15px] font-semibold text-ink truncate">
                {garage?.name ?? "Sai Garage"}
              </p>
              <p className="text-[12px] text-muted">
                Personal info, contact, KYC
              </p>
            </div>
            <span className="text-subtle text-lg leading-none">›</span>
          </button>

          <button
            type="button"
            onClick={() => go("/claims")}
            className="w-full flex items-center gap-3 p-3 rounded-[14px] hover:bg-surface-sunken text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span className="w-10 h-10 rounded-[10px] bg-surface-sunken inline-flex items-center justify-center text-ink">
              <FileText size={18} />
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-ink">My Claims</p>
              <p className="text-[12px] text-muted">Current claims and history</p>
            </div>
            <span className="text-subtle text-lg leading-none">›</span>
          </button>

          <button
            type="button"
            onClick={() => go("/support")}
            className="w-full flex items-center gap-3 p-3 rounded-[14px] hover:bg-surface-sunken text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span className="w-10 h-10 rounded-[10px] bg-surface-sunken inline-flex items-center justify-center text-ink">
              <MessageCircle size={18} />
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-ink">Support</p>
              <p className="text-[12px] text-muted">24*7 chat service</p>
            </div>
            <span className="text-subtle text-lg leading-none">›</span>
          </button>
        </nav>
      </aside>
    </div>
  );
}
