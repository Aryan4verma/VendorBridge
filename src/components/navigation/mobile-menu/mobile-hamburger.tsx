"use client";
import { Menu, X } from "lucide-react";

interface MobileMenuProps { isOpen: boolean; onToggle: () => void; }

export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  return (
    <button onClick={onToggle} className="lg:hidden p-2 hover:bg-[var(--color-surface-container)] rounded-[var(--radius-default)]">
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}
