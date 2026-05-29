"use client";
import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function UnlockPage() {
  return (
    <Suspense fallback={null}>
      <UnlockForm />
    </Suspense>
  );
}

function UnlockForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/";

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace(next);
        return;
      }
      if (res.status === 500) {
        setError("Credentials are not configured on the server.");
      } else {
        setError("Wrong username or password.");
      }
      setPassword("");
    } catch {
      setError("Network error — try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[400px] bg-surface border border-border rounded-[16px] p-6 space-y-4 shadow-sm"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-10 h-10 rounded-[10px] bg-ink text-white inline-flex items-center justify-center">
            <Lock size={18} />
          </span>
          <div className="leading-tight">
            <p className="font-semibold text-ink">Zoop.one Claims</p>
            <p className="text-[11px] text-muted">Prototype preview</p>
          </div>
        </div>

        <div>
          <h1 className="text-[20px] font-semibold text-ink">Sign in</h1>
          <p className="text-[13px] text-muted mt-1">
            This prototype is access-restricted.
          </p>
        </div>

        <Input
          label="Username"
          autoFocus
          autoComplete="username"
          placeholder="ZoopClaims"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          leadingIcon={<User size={16} />}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error ?? undefined}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={submitting || !username || !password}
          kbd="⏎"
        >
          {submitting ? "Unlocking…" : "Unlock"}
        </Button>
      </form>
    </main>
  );
}
