import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps { children: ReactNode; className?: string; }
export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]", className)}>{children}</div>;
}

interface CardHeaderProps { children: ReactNode; className?: string; }
export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("px-6 py-4 border-b border-[var(--color-surface-border)]", className)}>{children}</div>;
}

interface CardBodyProps { children: ReactNode; className?: string; }
export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

interface CardFooterProps { children: ReactNode; className?: string; }
export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn("px-6 py-4 border-t border-[var(--color-surface-border)]", className)}>{children}</div>;
}
