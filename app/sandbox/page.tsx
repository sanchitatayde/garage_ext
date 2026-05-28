"use client";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { ListRow } from "@/components/ui/ListRow";
import { ProgressSegmented } from "@/components/ui/ProgressSegmented";
import { IconTile } from "@/components/ui/IconTile";
import {
  ArrowRight,
  Car,
  Phone,
  Camera,
  FileText,
  CheckCircle2,
  User,
  Globe,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";

export default function Sandbox() {
  const [seg, setSeg] = React.useState("vehicle");
  const [reg, setReg] = React.useState("");
  return (
    <div className="app-frame px-5 py-6 space-y-8">
      <header>
        <p className="text-[12px] uppercase tracking-wide text-muted">
          Sandbox
        </p>
        <h1 className="text-[22px] font-semibold text-ink">
          Tokens & base components
        </h1>
        <p className="text-[13px] text-muted mt-1">
          Gate 1 — confirm the visual base before screens are built.
        </p>
      </header>

      <Section title="Colour tokens">
        <div className="grid grid-cols-3 gap-2">
          <Swatch name="ink" cls="bg-ink" />
          <Swatch name="muted" cls="bg-muted" />
          <Swatch name="subtle" cls="bg-subtle" />
          <Swatch name="surface" cls="bg-surface border border-border" />
          <Swatch name="sunken" cls="bg-surface-sunken" />
          <Swatch name="border" cls="bg-border" />
          <Swatch name="brand" cls="bg-brand" />
          <Swatch name="brand-soft" cls="bg-brand-soft" />
          <Swatch name="brand-strong" cls="bg-brand-strong" />
          <Swatch name="warn" cls="bg-warn" />
          <Swatch name="warn-soft" cls="bg-warn-soft" />
          <Swatch name="danger" cls="bg-danger" />
        </div>
      </Section>

      <Section title="Typography">
        <h2 className="text-[28px] font-semibold text-ink leading-tight">
          Manage your motor insurance claims
        </h2>
        <p className="text-[15px] text-muted leading-snug">
          Body — Inter Regular 15. Used for descriptions, helper text and
          claim card meta.
        </p>
        <p className="text-[13px] text-ink font-medium">
          Label — Inter Medium 13.
        </p>
        <p className="font-mono text-[13px] text-ink">
          MH 56 M 7854 · ₹35,200
        </p>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-col gap-2">
          <Button fullWidth size="lg" trailingIcon={<ArrowRight size={18} />}>
            Send OTP
          </Button>
          <Button fullWidth size="lg" variant="secondary">
            Secondary
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="md">
              Ghost
            </Button>
            <Button variant="danger" size="md">
              Log out
            </Button>
            <Button size="sm">Small</Button>
          </div>
        </div>
      </Section>

      <Section title="Input + segmented toggle">
        <SegmentedToggle
          value={seg}
          onChange={setSeg}
          items={[
            {
              value: "vehicle",
              label: "Vehicle number",
              leadingIcon: <Car size={14} />,
            },
            {
              value: "phone",
              label: "Phone number",
              leadingIcon: <Phone size={14} />,
            },
          ]}
        />
        <Input
          label={
            seg === "vehicle" ? "Vehicle registration number" : "Phone number"
          }
          placeholder={seg === "vehicle" ? "MH 56 M 7854" : "98213 44210"}
          leadingIcon={seg === "vehicle" ? <Car size={18} /> : <Phone size={18} />}
          value={reg}
          onChange={(e) => setReg(e.target.value)}
          helper={
            seg === "vehicle"
              ? "Enter the registration number as printed on your RC."
              : "We'll send a one-time password to this number."
          }
        />
        <Input label="With error" defaultValue="MH" error="Looks too short — check your RC." />
      </Section>

      <Section title="Chips">
        <div className="flex flex-wrap gap-2">
          <Chip tone="warn">In Survey</Chip>
          <Chip tone="brand">Approved</Chip>
          <Chip tone="success">Settled</Chip>
          <Chip tone="danger">Rejected</Chip>
          <Chip tone="info">Under review</Chip>
          <Chip tone="neutral">Closed</Chip>
          <Chip tone="warn" size="sm">due 2 days</Chip>
        </div>
      </Section>

      <Section title="Claim card (brand tone)">
        <Card tone="brand" padding="md">
          <p className="font-mono text-[11px] text-muted uppercase tracking-wide">
            ZP-CLM-2026-04-1842
          </p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h3 className="text-[18px] font-semibold text-ink">
              Hyundai Verna Lxi
            </h3>
            <Chip tone="warn">In Survey</Chip>
          </div>
          <p className="mt-2 text-[13px] text-muted">
            Stage 2 of 4 — Under assessment
          </p>
          <ProgressSegmented total={4} current={2} className="mt-2" />
          <Card
            tone="default"
            padding="sm"
            className="mt-3 border-warn/40 bg-warn-soft/60"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-warn">
                  Action needed
                </p>
                <p className="text-[12px] text-ink-2">
                  Re-upload front bumper photo · Due 4 hrs
                </p>
              </div>
              <ChevronRight size={18} className="text-warn" />
            </div>
          </Card>
        </Card>
      </Section>

      <Section title="List rows + icon tiles">
        <Card padding="sm" className="divide-y divide-border">
          <ListRow
            leading={
              <IconTile tone="brand">
                <Camera size={18} />
              </IconTile>
            }
            title="Garage uploaded 6 inspection photos"
            subtitle="2h ago · Hyundai Verna Lxi"
            onClick={() => {}}
          />
          <ListRow
            leading={
              <IconTile tone="brand">
                <FileText size={18} />
              </IconTile>
            }
            title="Estimate received · ₹35,200"
            subtitle="4h ago · Hyundai Verna Lxi"
            onClick={() => {}}
          />
          <ListRow
            leading={
              <IconTile tone="brand">
                <CheckCircle2 size={18} />
              </IconTile>
            }
            title="Handler approved estimate"
            subtitle="Yesterday · Hyundai Verna Lxi"
            onClick={() => {}}
          />
        </Card>
      </Section>

      <Section title="Settings rows">
        <Card padding="none">
          <ListRow
            leading={
              <IconTile tone="neutral">
                <User size={18} />
              </IconTile>
            }
            title="Profile"
            subtitle="Personal info, contact, KYC"
            onClick={() => {}}
            className="px-3"
            divider
          />
          <ListRow
            leading={
              <IconTile tone="neutral">
                <Globe size={18} />
              </IconTile>
            }
            title="Language"
            subtitle="English"
            onClick={() => {}}
            className="px-3"
            divider
          />
          <ListRow
            leading={
              <IconTile tone="danger">
                <LogOut size={18} />
              </IconTile>
            }
            title="Log out"
            subtitle="Sign out of this device"
            onClick={() => {}}
            destructive
            className="px-3"
          />
        </Card>
      </Section>

      <Section title="Bell + counts (header chrome preview)">
        <Card padding="sm" className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconTile tone="ink" size="sm">
              Z
            </IconTile>
            <p className="font-semibold text-ink">Zoop.one</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-surface-sunken inline-flex items-center justify-center">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
            </button>
            <span className="w-9 h-9 rounded-full bg-brand text-white inline-flex items-center justify-center font-semibold">
              R
            </span>
          </div>
        </Card>
      </Section>

      <p className="text-[12px] text-muted text-center pt-2">
        Reply with “OK to proceed” to start gate 2 (shell + routing skeleton).
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-[11px] uppercase tracking-wide text-muted font-mono">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Swatch({ name, cls }: { name: string; cls: string }) {
  return (
    <div className="flex flex-col items-stretch">
      <div className={`${cls} h-12 rounded-[10px]`} />
      <p className="text-[11px] font-mono text-muted mt-1 truncate">{name}</p>
    </div>
  );
}
