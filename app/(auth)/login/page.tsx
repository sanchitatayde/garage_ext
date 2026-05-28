"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSession } from "@/lib/store/session";
import { toast } from "@/lib/store/toast";

const MOBILE_RX = /^[6-9]\d{9}$/;

export default function LoginPage() {
  const router = useRouter();
  const setMobile = useSession((s) => s.setMobile);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  function validate(v: string) {
    if (!v) return "Mobile number is required.";
    if (!MOBILE_RX.test(v)) return "Enter a valid 10-digit mobile number.";
    return null;
  }

  function onBlur() {
    setError(validate(value));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(value);
    setError(err);
    if (err) return;
    setSubmitting(true);
    setMobile(value);
    await new Promise((r) => setTimeout(r, 600));
    toast(
      `OTP sent to +91 ${value.slice(0, 5)} ${value.slice(5)}`,
      "success"
    );
    router.push("/login/verify");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col min-h-[100dvh]">
      <header className="px-5 py-4 border-b border-border flex items-center gap-2">
        <span className="w-8 h-8 rounded-[8px] bg-ink text-white inline-flex items-center justify-center font-semibold text-[14px] font-mono">
          Z
        </span>
        <div>
          <p className="font-semibold text-ink leading-tight">Zoop.one</p>
          <p className="text-[11px] text-muted leading-tight">Claims</p>
        </div>
      </header>

      <section className="flex-1 px-5 py-6 space-y-3">
        <p className="text-[13px] text-muted">Welcome</p>
        <h1 className="text-[26px] font-semibold text-ink leading-tight">
          Manage your
          <br />
          claimed repairs
        </h1>
        <p className="text-[14px] text-muted">
          Login to view active claims, file a new one, or check the status of
          past claims.
        </p>

        <div className="pt-6 bg-surface-sunken/60 -mx-5 px-5 py-6">
          <Input
            label="Registered Mobile Number"
            inputMode="numeric"
            placeholder="9839274020"
            autoFocus
            maxLength={10}
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
            onBlur={onBlur}
            error={error ?? undefined}
            helper={
              !error
                ? "We'll send a one-time password to this number."
                : undefined
            }
          />
        </div>
      </section>

      <footer className="px-5 pb-6 pt-3 border-t border-border bg-surface">
        <Button
          type="submit"
          fullWidth
          size="lg"
          trailingIcon={<ArrowRight size={18} />}
          disabled={submitting}
          kbd="⏎"
        >
          {submitting ? "Sending OTP…" : "Send OTP"}
        </Button>
        <p className="text-[13px] text-muted text-center mt-3">
          New here?{" "}
          <Link
            href="/register"
            className="text-ink font-semibold underline underline-offset-2"
          >
            Register now
          </Link>
        </p>
      </footer>
    </form>
  );
}
