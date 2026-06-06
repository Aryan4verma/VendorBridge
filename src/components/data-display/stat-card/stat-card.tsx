import { cn } from "@/lib/utils";
import { TrendIndicator } from "@/components/data-display/trend-indicator/trend-indicator";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

export function StatCard({ title, value, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] p-6", className)}>
      <p className="text-[var(--font-size-label-bold)] font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider">{title}</p>
      <p className="mt-2 text-[var(--font-size-headline-md)] font-semibold text-[var(--color-on-surface)]">{value}</p>
      {trend && <div className="mt-2"><TrendIndicator value={trend.value} isPositive={trend.isPositive} /></div>}
    </div>
  );
}
