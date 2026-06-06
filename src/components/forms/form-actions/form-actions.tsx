import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormActionsProps { children: ReactNode; className?: string; }

export function FormActions({ children, className }: FormActionsProps) {
  return <div className={cn("flex justify-end gap-2 pt-4 border-t border-[var(--color-surface-border)]", className)}>{children}</div>;
}
