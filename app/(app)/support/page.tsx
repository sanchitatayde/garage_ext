"use client";
import {
  Clock,
  IndianRupee,
  Search,
  Receipt,
  Upload,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { AppHeader } from "@/components/shell/AppHeader";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/store/toast";

const TOPICS = [
  { id: "delayed", title: "Why is my claim delayed?", Icon: Clock },
  { id: "payment", title: "When will I get payment?", Icon: IndianRupee },
  { id: "survey", title: "Survey not done yet", Icon: Search },
  { id: "estimate", title: "Estimate or amount query", Icon: Receipt },
  { id: "upload", title: "Upload a document", Icon: Upload },
  { id: "other", title: "Something else", Icon: MessageCircle },
];

export default function SupportPage() {
  function pick(title: string) {
    toast(`Got it — we'll reply on “${title}” shortly.`, "success");
  }
  function escalate() {
    toast("Connecting you to your handler…", "info");
  }

  return (
    <>
      <AppHeader title="Support" subtitle="24/7 chat service" />

      <section className="px-5 py-5 space-y-4">
        <div>
          <h2 className="text-[22px] font-semibold text-ink leading-tight">
            How can we help?
          </h2>
          <p className="text-[14px] text-muted mt-1">
            Pick a topic — most answers are instant.
          </p>
        </div>

        <Card padding="none" className="overflow-hidden">
          {TOPICS.map(({ id, title, Icon }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => pick(title)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-sunken transition text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${
                i < TOPICS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <IconTile size="sm" tone="neutral">
                <Icon size={14} />
              </IconTile>
              <p className="flex-1 text-[14px] font-medium text-ink">
                {title}
              </p>
              <ChevronRight size={16} className="text-subtle" />
            </button>
          ))}
        </Card>

        <Button
          fullWidth
          variant="secondary"
          size="lg"
          trailingIcon={<MessageCircle size={18} />}
          onClick={escalate}
        >
          Message your handler
        </Button>
        <p className="text-[12px] text-muted text-center">
          Typically replies within a few hours
        </p>
      </section>
    </>
  );
}
