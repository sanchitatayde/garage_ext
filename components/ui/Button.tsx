import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  kbd?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      fullWidth,
      leadingIcon,
      trailingIcon,
      kbd,
      className,
      children,
      type = "button",
      ...rest
    },
    ref
  ) {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-[12px] font-medium transition active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:cursor-not-allowed select-none";
    const sizes: Record<Size, string> = {
      sm: "h-9 px-3 text-[13px]",
      md: "h-11 px-4 text-sm",
      lg: "h-14 px-5 text-[15px]",
    };
    const variants: Record<Variant, string> = {
      primary: "bg-ink text-white hover:bg-ink-2",
      secondary: "bg-surface-sunken text-ink hover:bg-zinc-200",
      ghost: "bg-transparent text-ink hover:bg-surface-sunken",
      danger: "bg-danger text-white hover:opacity-95",
    };
    return (
      <button
        ref={ref}
        type={type}
        {...rest}
        className={cn(
          base,
          sizes[size],
          variants[variant],
          fullWidth && "w-full",
          className
        )}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
        {kbd && (
          <kbd className="ml-1 hidden sm:inline-flex items-center px-1.5 h-5 rounded-md bg-white/10 text-[11px] font-mono">
            {kbd}
          </kbd>
        )}
      </button>
    );
  }
);
