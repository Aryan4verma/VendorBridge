"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: ReactNode;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ children, content, side = "top", className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-flex" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 rounded-[var(--radius-default)] bg-[var(--color-inverse-surface)] px-2 py-1 text-xs text-[var(--color-inverse-on-surface)] whitespace-nowrap",
            positionStyles[side],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
