"use client";
import { useRouter } from "next/navigation";
import { User, Globe, LogOut, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { useSession } from "@/lib/store/session";
import { toast } from "@/lib/store/toast";

export default function ProfilePage() {
  const router = useRouter();
  const garage = useSession((s) => s.garage);
  const reset = useSession((s) => s.reset);

  function logout() {
    reset();
    toast("Signed out", "info");
    router.push("/login");
  }

  return (
    <div className="app-frame">
      <PageHeader />

      <main className="px-4 py-3 space-y-4">
        {/* Garage header card */}
        <Card padding="md" tone="brand" className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-full bg-ink text-white inline-flex items-center justify-center font-semibold text-[15px]">
            {garage?.initials ?? "SG"}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-semibold text-ink leading-tight">
              {garage?.name ?? "Sai Garage"}
            </p>
            <p className="text-[13px] text-muted">
              {garage?.contact.name ?? "Ramesh Pawar"}{" "}
              <span className="font-mono">
                · {garage?.contact.phone ?? "+91 98765 43210"}
              </span>
            </p>
          </div>
        </Card>

        {/* Settings rows */}
        <Card padding="none" className="overflow-hidden">
          <button
            type="button"
            onClick={() =>
              toast("Personal info screen coming soon", "info")
            }
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-sunken transition border-b border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <IconTile tone="neutral">
              <User size={18} />
            </IconTile>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-semibold text-ink">Profile</p>
              <p className="text-[12px] text-muted">
                Personal info, contact, KYC
              </p>
            </div>
            <ChevronRight size={18} className="text-subtle" />
          </button>

          <button
            type="button"
            onClick={() =>
              toast("Language picker coming soon", "info")
            }
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-sunken transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <IconTile tone="neutral">
              <Globe size={18} />
            </IconTile>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-semibold text-ink">Language</p>
              <p className="text-[12px] text-muted">English</p>
            </div>
            <ChevronRight size={18} className="text-subtle" />
          </button>
        </Card>

        {/* Logout */}
        <Card padding="none" className="overflow-hidden">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-danger-soft/40 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-danger"
          >
            <IconTile tone="danger">
              <LogOut size={18} />
            </IconTile>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-semibold text-danger">Log out</p>
              <p className="text-[12px] text-muted">
                Sign out of this device
              </p>
            </div>
          </button>
        </Card>
      </main>
    </div>
  );
}
