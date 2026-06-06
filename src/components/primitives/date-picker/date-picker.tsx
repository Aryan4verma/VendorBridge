"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type DatePickerProps = InputHTMLAttributes<HTMLInputElement>;

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="date"
      className={cn(
        "flex h-9 w-full rounded-[var(--radius-default)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] px-3 py-1 text-sm text-[var(--color-on-surface)] focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[0_0_0_2px_rgba(70,72,212,0.2)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
DatePicker.displayName = "DatePicker";

export { DatePicker };
