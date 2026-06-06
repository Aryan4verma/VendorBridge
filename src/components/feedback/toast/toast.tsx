"use client";
import { useToast } from "@/providers/toast-provider";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: "bg-[var(--color-status-active)]",
  error: "bg-[var(--color-error)]",
  info: "bg-[var(--color-status-draft)]",
};

export function ToastContainer() {
  const { toasts, dismiss } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div key={t.id} className={`flex items-center gap-2 rounded-[var(--radius-default)] px-4 py-3 text-sm text-white shadow-lg ${colors[t.type]}`}>
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{t.message}</span>
            <button onClick={() => dismiss(t.id)} className="shrink-0 hover:opacity-80"><X className="h-4 w-4" /></button>
          </div>
        );
      })}
    </div>
  );
}
