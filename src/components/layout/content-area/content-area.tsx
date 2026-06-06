import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentAreaProps { children: ReactNode; className?: string; }

export function ContentArea({ children, className }: ContentAreaProps) {
  return (
    <main className={cn("ml-[var(--spacing-sidebar-width)] mt-[var(--spacing-header-height)] min-h-[calc(100vh-var(--spacing-header-height))] bg-[var(--color-background)] p-[var(--spacing-container-padding)]", className)}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </main>
  );
}
