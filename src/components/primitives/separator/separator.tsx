import { cn } from "@/lib/utils";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Separator({ orientation = "horizontal", className }: SeparatorProps) {
  return (
    <div
      className={cn(
        "shrink-0 bg-[var(--color-surface-border)]",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
}
