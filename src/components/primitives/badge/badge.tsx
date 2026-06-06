import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "active" | "pending" | "rejected" | "draft" | "inactive" | "default";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "badge-active",
  pending: "badge-pending",
  rejected: "badge-rejected",
  draft: "badge-draft",
  inactive: "badge-inactive",
  default: "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold label-bold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
