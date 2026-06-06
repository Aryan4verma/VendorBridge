import { Sparkles } from "lucide-react";
import { Button } from "@/components/primitives/button/button";

interface AIRecommendationCardProps {
  vendorName: string;
  confidence: number;
  reasoning: string;
  onAccept: () => void;
}

export function AIRecommendationCard({ vendorName, confidence, reasoning, onAccept }: AIRecommendationCardProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-primary)] bg-[rgba(70,72,212,0.04)] p-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-[var(--color-primary)]" />
        <h3 className="text-[var(--font-size-title-sm)] font-semibold text-[var(--color-on-surface)]">AI Recommendation</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div><p className="text-xs text-[var(--color-on-surface-variant)]">Recommended Vendor</p><p className="text-sm font-medium">{vendorName}</p></div>
        <div><p className="text-xs text-[var(--color-on-surface-variant)]">Confidence</p><p className="text-sm font-medium data-mono">{confidence}%</p></div>
        <div><p className="text-xs text-[var(--color-on-surface-variant)]">Reasoning</p><p className="text-sm">{reasoning}</p></div>
      </div>
      <Button size="sm" onClick={onAccept}>Select Recommended</Button>
    </div>
  );
}
