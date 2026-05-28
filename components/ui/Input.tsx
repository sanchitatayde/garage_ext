import * as React from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helper?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, helper, error, leadingIcon, trailingIcon, className, id, ...rest },
    ref
  ) {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] text-ink mb-1.5 font-medium"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center gap-2 rounded-[12px] border bg-surface px-3 h-12 transition",
            "focus-within:ring-2 focus-within:ring-brand/30 focus-within:border-brand",
            error ? "border-danger" : "border-border"
          )}
        >
          {leadingIcon && (
            <span className="text-muted flex items-center">{leadingIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            {...rest}
            className={cn(
              "flex-1 bg-transparent text-[15px] outline-none placeholder:text-subtle text-ink",
              className
            )}
          />
          {trailingIcon && <span className="text-muted">{trailingIcon}</span>}
        </div>
        {helper && !error && (
          <p className="mt-1.5 text-[12px] text-muted">{helper}</p>
        )}
        {error && <p className="mt-1.5 text-[12px] text-danger">{error}</p>}
      </div>
    );
  }
);
