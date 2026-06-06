import { TrendingUp, TrendingDown } from "lucide-react";

interface TrendIndicatorProps { value: number; isPositive: boolean; }

export function TrendIndicator({ value, isPositive }: TrendIndicatorProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${isPositive ? "text-[var(--color-status-active)]" : "text-[var(--color-error)]"}`}>
      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {isPositive ? "+" : ""}{value}%
    </span>
  );
}
