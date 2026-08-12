import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const VARIANTS = {
  primary:
    "bg-charcoal text-cream hover:bg-gold-deep",
  gold: "bg-gold text-cream hover:bg-gold-deep",
  outline:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
  ghost: "text-charcoal hover:text-gold-deep",
} as const;

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4.5 text-sm",
} as const;

type BaseProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 uppercase tracking-[0.14em] font-medium transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, VARIANTS[variant], SIZES[size], className)}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: BaseProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, VARIANTS[variant], SIZES[size], className)}
      {...props}
    />
  );
}
