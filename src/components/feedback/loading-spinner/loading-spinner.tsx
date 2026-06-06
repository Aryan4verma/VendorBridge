import { cn } from "@/lib/utils";

interface LoadingSpinnerProps { size?: "sm" | "md" | "lg"; className?: string; }

const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-[var(--color-surface-container-high)] border-t-[var(--color-primary)]`} />
    </div>
  );
}
