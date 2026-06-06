import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps { title?: string; children: ReactNode; className?: string; }

export function FormSection({ title, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && <h3 className="text-[var(--font-size-label-bold)] font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider">{title}</h3>}
      {children}
    </div>
  );
}
