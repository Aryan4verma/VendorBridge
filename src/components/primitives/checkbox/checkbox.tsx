"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 shrink-0 rounded-[var(--radius-default)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[0_0_0_2px_rgba(70,72,212,0.2)] disabled:cursor-not-allowed disabled:opacity-50 accent-[var(--color-primary)]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
