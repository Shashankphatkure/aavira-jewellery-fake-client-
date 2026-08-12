import { cn } from "@/lib/utils";

const VARIANTS = {
  new: "bg-charcoal text-cream",
  bestseller: "bg-gold text-cream",
  sale: "bg-blush-deep text-cream",
} as const;

export function Badge({
  children,
  variant = "new",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-[0.1em]",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
