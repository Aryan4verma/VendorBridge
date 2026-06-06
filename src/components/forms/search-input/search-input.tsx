"use client";
import { forwardRef, type InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ className, ...props }, ref) => {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-outline)]" />
      <input ref={ref} className="flex h-9 w-full rounded-[var(--radius-default)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] pl-8 pr-3 py-1 text-sm placeholder:text-[var(--color-outline)] focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[0_0_0_2px_rgba(70,72,212,0.2)]" {...props} />
    </div>
  );
});
SearchInput.displayName = "SearchInput";
export { SearchInput };
