"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home as HomeIcon, FileText, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/home", label: "Home", Icon: HomeIcon, key: "home" },
  { href: "/claims", label: "My Claims", Icon: FileText, key: "claims" },
  { href: "/support", label: "Support", Icon: MessageCircle, key: "support" },
] as const;

export function BottomTabBar() {
  const pathname = usePathname() ?? "";

  // Hide tabs on claim-detail screens (matches the screenshot).
  if (/^\/claims\/[^/]+/.test(pathname) && pathname !== "/claims") return null;

  function isActive(href: string) {
    if (href === "/home") return pathname === "/home";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav
      aria-label="Primary"
      className="bg-surface border-t border-border"
    >
      <ul className="flex px-2 py-2">
        {tabs.map(({ href, label, Icon, key }) => {
          const active = isActive(href);
          return (
            <li key={key} className="flex-1 flex justify-center">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-[12px] transition",
                  active ? "bg-brand-soft" : "hover:bg-surface-sunken"
                )}
              >
                <Icon
                  size={20}
                  className={active ? "text-brand-strong" : "text-muted"}
                />
                <span
                  className={cn(
                    "text-[11px]",
                    active
                      ? "text-brand-strong font-medium"
                      : "text-muted"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
