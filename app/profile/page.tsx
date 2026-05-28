"use client";
import { PageHeader } from "@/components/shell/PageHeader";
import { useSession } from "@/lib/store/session";

export default function ProfileStub() {
  const garage = useSession((s) => s.garage);
  return (
    <div className="app-frame">
      <PageHeader />
      <section className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-full bg-ink text-white inline-flex items-center justify-center font-semibold">
            {garage?.initials ?? "SG"}
          </span>
          <div>
            <p className="text-[17px] font-semibold text-ink">
              {garage?.name ?? "Sai Garage"}
            </p>
            <p className="text-[13px] text-muted font-mono">
              {garage?.contact.phone ?? "+91 98765 43210"}
            </p>
          </div>
        </div>
        <p className="text-[13px] text-muted pt-2">
          {/* TODO: gate 8 specs the garage-profile screen properly. */}
          Stub — gate 8 builds the full garage-profile screen (Personal info,
          contact, KYC).
        </p>
      </section>
    </div>
  );
}
