import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ComparisonCardProps { label: string; children: ReactNode; highlight?: boolean; className?: string; }

export function ComparisonCard({ label, children, highlight, className }: ComparisonCardProps) {
  return (
    <div className={cn("rounded-[var(--radius-lg)] border p-4", highlight ? "border-[var(--color-status-active)] bg-[rgba(34,197,94,0.05)]" : "border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]", className)}>
      <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2">{label}</p>
      <div className="text-sm text-[var(--color-on-surface)]">{children}</div>
    </div>
  );
}
