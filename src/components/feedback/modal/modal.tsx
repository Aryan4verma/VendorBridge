"use client";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[rgba(30,41,59,0.6)]" onClick={onClose} />
      <div className={cn("relative z-50 w-full max-w-lg rounded-[var(--radius-lg)] bg-[var(--color-surface-container-lowest)] shadow-[var(--shadow-soft-lift)] p-6", className)}>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, onClose, className }: { children: ReactNode; onClose?: () => void; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="text-[var(--font-size-title-sm)] font-semibold text-[var(--color-on-surface)]">{children}</h2>
      {onClose && (
        <button onClick={onClose} className="rounded-[var(--radius-default)] p-1 hover:bg-[var(--color-surface-container)]">
          <X className="h-4 w-4 text-[var(--color-on-surface-variant)]" />
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-sm text-[var(--color-on-surface)]", className)}>{children}</div>;
}

export function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex justify-end gap-2 mt-6", className)}>{children}</div>;
}
