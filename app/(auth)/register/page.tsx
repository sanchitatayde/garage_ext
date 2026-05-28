"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSession } from "@/lib/store/session";
import { SAI_GARAGE } from "@/lib/mock-data";
import { toast } from "@/lib/store/toast";

export default function RegisterPage() {
  const router = useRouter();
  const setGarage = useSession((s) => s.setGarage);
  const [name, setName] = React.useState(SAI_GARAGE.name);
  const [gstin, setGstin] = React.useState(SAI_GARAGE.gstin);
  const [city, setCity] = React.useState(SAI_GARAGE.city);
  const [address, setAddress] = React.useState(SAI_GARAGE.address);
  const [contact, setContact] = React.useState(
    `${SAI_GARAGE.contact.name} · ${SAI_GARAGE.contact.phone}`
  );
  const [submitting, setSubmitting] = React.useState(false);

  const valid =
    name.trim().length > 1 &&
    gstin.trim().length >= 10 &&
    city.trim().length > 1 &&
    address.trim().length > 5 &&
    contact.trim().length > 5;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const [contactName = "", contactPhone = ""] = contact
      .split("·")
      .map((p) => p.trim());
    setGarage({
      name,
      gstin,
      city,
      address,
      contact: { name: contactName, phone: contactPhone },
      initials:
        name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || "SG",
    });
    toast("Garage saved — please log in to continue.", "success");
    router.push("/login");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col min-h-[100dvh]">
      <PageHeader />
      <section className="flex-1 px-5 py-4 space-y-4">
        <h1 className="text-[22px] font-semibold text-ink">
          Confirm your garage
        </h1>

        <Input
          label="GARAGE NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="GSTIN"
            value={gstin}
            onChange={(e) => setGstin(e.target.value.toUpperCase())}
            maxLength={15}
          />
          <Input
            label="CITY"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <Input
          label="ADDRESS"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          label="PRIMARY CONTACT"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <p className="text-[12px] text-muted">
          We pre-filled this from your DSP network record. Confirm to continue.
        </p>
      </section>

      <footer className="px-5 pb-6 pt-3 border-t border-border bg-surface">
        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={!valid || submitting}
          leadingIcon={<Check size={18} />}
          kbd="⏎"
        >
          {submitting ? "Saving…" : "Confirm & continue"}
        </Button>
      </footer>
    </form>
  );
}
