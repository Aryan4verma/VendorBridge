"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder = "Select...", className }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (value: string) => {
    onChange(selected.filter((v) => v !== value));
  };

  const selectedLabels = options.filter((o) => selected.includes(o.value));

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-full items-center justify-between rounded-[var(--radius-default)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] px-3 py-1 text-sm text-left focus-visible:outline-none focus-visible:border-[var(--color-primary)]"
      >
        <span className={selectedLabels.length ? "text-[var(--color-on-surface)]" : "text-[var(--color-outline)]"}>
          {selectedLabels.length ? `${selectedLabels.length} selected` : placeholder}
        </span>
        <span className="text-[var(--color-outline)]">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-[var(--radius-default)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] shadow-[var(--shadow-soft-lift)] max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={cn(
                "flex w-full items-center px-3 py-2 text-sm hover:bg-[var(--color-surface-container-low)] text-left",
                selected.includes(option.value) && "bg-[var(--color-surface-container-low)]"
              )}
            >
              <span className="mr-2 h-4 w-4 rounded border border-[var(--color-surface-border)] flex items-center justify-center">
                {selected.includes(option.value) && "✓"}
              </span>
              {option.label}
            </button>
          ))}
        </div>
      )}

      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {selectedLabels.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--color-surface-container)] px-2 py-0.5 text-xs"
            >
              {option.label}
              <button type="button" onClick={() => removeOption(option.value)} className="hover:text-[var(--color-error)]">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
