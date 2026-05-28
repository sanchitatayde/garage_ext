"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";
import { useSession } from "@/lib/store/session";
import { toast } from "@/lib/store/toast";

const RESEND_SECONDS = 45;

export default function VerifyPage() {
  const router = useRouter();
  const mobile = useSession((s) => s.mobile);
  const setVerified = useSession((s) => s.setVerified);
  const [otp, setOtp] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(RESEND_SECONDS);

  React.useEffect(() => {
    if (!mobile) {
      router.replace("/login");
    }
  }, [mobile, router]);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const maskedMobile = mobile
    ? `+91 ${mobile.slice(0, 2)}··· ${mobile.slice(-4)}`
    : "your mobile";

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (otp.length !== 6 || submitting) return;
    setSubmitting(true);
    setHasError(false);
    await new Promise((r) => setTimeout(r, 600));
    if (otp === "000000") {
      setSubmitting(false);
      setHasError(true);
      toast("Incorrect OTP. Try again.", "error");
      setOtp("");
      return;
    }
    setVerified(true);
    router.push("/home");
  }

  function resend() {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    toast(`New OTP sent to ${maskedMobile}`, "success");
  }

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <form onSubmit={onSubmit} className="flex flex-col min-h-[100dvh]">
      <PageHeader title="Verify OTP" />

      <section className="flex-1 px-5 py-6 space-y-3">
        <h1 className="text-[22px] font-semibold text-ink">
          Enter the 6-digit OTP
        </h1>
        <p className="text-[13px] text-muted">
          Sent to {maskedMobile} and your registered email.
        </p>

        <div className="pt-5">
          <OtpInput
            value={otp}
            onChange={(v) => {
              setOtp(v);
              if (hasError) setHasError(false);
            }}
            onComplete={() => onSubmit()}
            error={hasError}
          />
        </div>

        <div className="pt-4 flex items-center gap-2 text-[13px]">
          <Clock size={14} className="text-muted" />
          {secondsLeft > 0 ? (
            <p className="text-muted">
              Resend in{" "}
              <span className="text-ink font-medium font-mono">
                {fmt(secondsLeft)}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={resend}
              className="text-ink font-semibold underline underline-offset-2"
            >
              Resend OTP
            </button>
          )}
        </div>
      </section>

      <footer className="px-5 pb-6 pt-3 border-t border-border bg-surface">
        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={otp.length !== 6 || submitting}
          kbd="⏎"
        >
          {submitting ? "Verifying…" : "Verify and Continue"}
        </Button>
        <p className="text-[12px] text-muted text-center mt-3">
          Having trouble?{" "}
          <Link href="/support" className="text-ink font-medium">
            Get help
          </Link>
        </p>
      </footer>
    </form>
  );
}
