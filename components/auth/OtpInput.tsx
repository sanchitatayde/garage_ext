"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  length?: number;
  value: string;
  onChange: (v: string) => void;
  onComplete?: (v: string) => void;
  error?: boolean;
};

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  error,
}: Props) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const chars = (value + "".padEnd(length, "")).slice(0, length).split("");
  while (chars.length < length) chars.push("");

  function set(idx: number, ch: string) {
    const next = chars.slice();
    next[idx] = ch;
    const v = next.join("").slice(0, length);
    onChange(v);
    if (v.length === length && v.replace(/\s/g, "").length === length && onComplete)
      onComplete(v);
  }

  function onKey(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !chars[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      refs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      refs.current[idx + 1]?.focus();
    }
  }

  function onInput(idx: number, e: React.FormEvent<HTMLInputElement>) {
    const raw = (e.currentTarget as HTMLInputElement).value;
    const d = raw.replace(/\D/g, "").slice(-1);
    set(idx, d);
    if (d && idx < length - 1) refs.current[idx + 1]?.focus();
  }

  function onPaste(_idx: number, e: React.ClipboardEvent<HTMLInputElement>) {
    const data = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!data) return;
    e.preventDefault();
    const next = data.padEnd(length, " ").slice(0, length).replace(/\s/g, "");
    onChange(next);
    const focusIdx = Math.min(data.length, length - 1);
    refs.current[focusIdx]?.focus();
    if (next.length === length && onComplete) onComplete(next);
  }

  return (
    <div className="flex gap-2.5" role="group" aria-label="One-time password">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={chars[i] ?? ""}
          onChange={() => {}}
          onInput={(e) => onInput(i, e)}
          onKeyDown={(e) => onKey(i, e)}
          onPaste={(e) => onPaste(i, e)}
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          className={cn(
            "w-[48px] h-[56px] rounded-[12px] border bg-surface text-center text-[22px] font-medium text-ink",
            "focus:outline focus:outline-2 focus:outline-brand focus:border-brand",
            error ? "border-danger" : "border-border"
          )}
        />
      ))}
    </div>
  );
}
