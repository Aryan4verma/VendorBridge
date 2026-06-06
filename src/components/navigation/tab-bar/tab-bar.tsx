"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Tab { label: string; href: string; }

interface TabBarProps { tabs: Tab[]; className?: string; }

export function TabBar({ tabs, className }: TabBarProps) {
  const pathname = usePathname();
  return (
    <div className={cn("flex border-b border-[var(--color-surface-border)]", className)}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
              isActive ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
