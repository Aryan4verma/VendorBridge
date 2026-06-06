import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, backHref, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-6", className)}>
      <div className="flex items-start gap-3">
        {backHref && (
          <Link href={backHref} className="mt-1 p-1 hover:bg-[var(--color-surface-container)] rounded-[var(--radius-default)]">
            <ArrowLeft className="h-5 w-5 text-[var(--color-on-surface-variant)]" />
          </Link>
        )}
        <div>
          <h1 className="text-[var(--font-size-headline-md)] font-semibold text-[var(--color-on-surface)]">{title}</h1>
          {subtitle && <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
