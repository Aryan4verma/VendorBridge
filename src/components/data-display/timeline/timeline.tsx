import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

interface TimelineStep { label: string; date?: string; completed: boolean; current?: boolean; }

interface TimelineProps { steps: TimelineStep[]; className?: string; }

export function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="mt-0.5">
            {step.completed ? <CheckCircle className="h-5 w-5 text-[var(--color-status-active)]" /> : <Circle className="h-5 w-5 text-[var(--color-outline-variant)]" />}
          </div>
          <div>
            <p className={cn("text-sm font-medium", step.completed || step.current ? "text-[var(--color-on-surface)]" : "text-[var(--color-on-surface-variant)]")}>{step.label}</p>
            {step.date && <p className="text-xs text-[var(--color-outline)] mt-0.5">{step.date}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
