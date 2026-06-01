"use client";

import { usePathname } from "next/navigation";

const CUSTOMER_URL = "https://customerext.vercel.app/";

interface FlowSwitchFabProps {
  /** Tailwind bottom-* class. Use bottom-5 on auth screens, bottom-20 above
   *  the BottomTabBar on app screens. */
  bottomClass?: string;
}

/**
 * Floating "Switch to Customer" CTA pinned to the bottom-right of the phone
 * shell. Lets the visitor jump to the Customer prototype from anywhere in
 * the Garage flow without going back through the unlock gate.
 *
 * Hidden on /unlock — that page lives outside both auth and app layouts so
 * this guard is belt-and-braces.
 */
export function FlowSwitchFab({ bottomClass = "bottom-5" }: FlowSwitchFabProps) {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/unlock")) return null;

  return (
    <a
      href={CUSTOMER_URL}
      aria-label="Switch to Customer flow"
      className={[
        "absolute right-4 z-30 inline-flex items-center gap-2 h-12 pl-3 pr-4 rounded-full",
        "bg-ink text-white shadow-lg shadow-black/20",
        "hover:bg-ink-2 transition-colors",
        bottomClass,
      ].join(" ")}
    >
      <span
        className="h-8 w-8 rounded-full bg-white/15 inline-flex items-center justify-center"
        aria-hidden
      >
        <PersonIcon />
      </span>
      <span className="font-sans text-[13px] font-semibold leading-none">
        Switch to Customer
      </span>
    </a>
  );
}

function PersonIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
