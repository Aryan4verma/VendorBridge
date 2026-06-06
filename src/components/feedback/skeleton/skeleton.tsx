import { cn } from "@/lib/utils";

interface SkeletonProps { className?: string; }

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-[var(--radius-default)] bg-[var(--color-surface-container)]", className)} />;
}
