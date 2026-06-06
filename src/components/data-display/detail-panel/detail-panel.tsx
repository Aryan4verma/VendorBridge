import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DetailPanelProps { children: ReactNode; className?: string; }
export function DetailPanel({ children, className }: DetailPanelProps) {
  return <div className={cn("rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] p-6", className)}>{children}</div>;
}

interface DetailRowProps { label: string; value: ReactNode; className?: string; mono?: boolean; }
export function DetailRow({ label, value, className, mono }: DetailRowProps) {
  return (
    <div className={cn("flex items-start justify-between py-3 border-b border-[var(--color-surface-border)] last:border-0", className)}>
      <span className="text-sm text-[var(--color-on-surface-variant)] font-medium">{label}</span>
      <span className={cn("text-sm text-[var(--color-on-surface)] text-right", mono && "data-mono")}>{value}</span>
    </div>
  );
}
