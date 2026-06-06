import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  children: ReactNode;
  variant?: "default" | "destructive" | "success";
  className?: string;
}

const variantStyles = {
  default: "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]",
  destructive: "bg-[var(--color-error-container)] text-[var(--color-on-error-container)]",
  success: "bg-[rgba(34,197,94,0.1)] text-[#16a34a]",
};

export function Alert({ children, variant = "default", className }: AlertProps) {
  return <div className={cn("rounded-[var(--radius-default)] px-4 py-3 text-sm", variantStyles[variant], className)}>{children}</div>;
}
