"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { Sparkles } from "lucide-react";
import { useRfq } from "@/features/rfqs/hooks/use-rfq";
import { useAi } from "@/features/ai/hooks/use-ai";
import { useToast } from "@/providers/toast-provider";
import type { AiRecommendationResult } from "@/features/ai/services/ai.service";

export default function AiRecommendPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const { rfq, isLoading: isLoadingRfq } = useRfq(id);
  const { recommendations, isLoading: isLoadingAi, recommend } = useAi(id);
  const [result, setResult] = useState<AiRecommendationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const existing = recommendations.length > 0 ? recommendations[0] : null;

  const handleRecommend = async () => {
    setIsAnalyzing(true);
    const res = await recommend();
    if (res) {
      setResult(res);
      toast("AI recommendation generated", "success");
    } else {
      toast("Failed to generate recommendation", "error");
    }
    setIsAnalyzing(false);
  };

  const confidencePercent = ((result?.confidence_score ?? existing?.confidence_score ?? 0) * 100).toFixed(0);
  const vendorName = result?.recommended_vendor ?? "—";
  const reasoning = result?.reasoning ?? existing?.reasoning ?? "";
  const factors = result?.factors ?? [];

  if (isLoadingRfq) {
    return <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading...</div>;
  }

  if (!rfq) {
    return <div className="p-8 text-center text-[var(--color-error)]">RFQ not found</div>;
  }

  return (
    <div>
      <PageHeader
        title="AI Vendor Recommendation"
        backHref={`/rfqs/${id}`}
        subtitle={rfq.title}
      />

      <div className="space-y-6">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--font-size-body-md)] font-medium">
                  Analyze quotations and get an AI-powered vendor recommendation
                </p>
                <p className="text-[var(--font-size-body-sm)] text-[var(--color-on-surface-variant)] mt-1">
                  OpenAI will evaluate price, delivery speed, vendor ratings, and category expertise
                </p>
              </div>
              <Button onClick={handleRecommend} disabled={isAnalyzing || isLoadingAi}>
                <Sparkles className="h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : existing ? "Re-analyze" : "Get Recommendation"}
              </Button>
            </div>
          </CardBody>
        </Card>

        {(isAnalyzing || isLoadingAi) && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-[var(--color-on-surface-variant)]">AI is analyzing quotations...</p>
          </div>
        )}

        {(result || existing) && !isAnalyzing && (
          <>
            <Card>
              <CardHeader>
                <h3 className="text-[var(--font-size-title-sm)] font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
                  Recommended Vendor
                </h3>
              </CardHeader>
              <CardBody>
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <p className="text-[var(--font-size-display-sm)] font-bold text-[var(--color-on-surface)]">
                      {vendorName}
                    </p>
                    <p className="text-[var(--font-size-body-sm)] text-[var(--color-on-surface-variant)] mt-1">
                      Vendor ID: {(result?.recommended_vendor_id ?? existing?.recommended_vendor_id ?? "").slice(0, 8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[var(--font-size-display-sm)] font-bold data-mono text-[var(--color-primary)]">
                      {confidencePercent}%
                    </p>
                    <p className="text-[var(--font-size-body-xs)] text-[var(--color-on-surface-variant)]">Confidence</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-[var(--font-size-title-sm)] font-semibold">Reasoning</h3>
              </CardHeader>
              <CardBody>
                <p className="text-[var(--font-size-body-md)] text-[var(--color-on-surface)] leading-relaxed whitespace-pre-wrap">
                  {reasoning}
                </p>
              </CardBody>
            </Card>

            {factors.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-[var(--font-size-title-sm)] font-semibold">Key Factors Considered</h3>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    {factors.map((factor, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full text-[var(--font-size-body-xs)] font-medium bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {existing && (
              <DetailPanel>
                <DetailRow label="Saved At" value={new Date(existing.created_at).toLocaleString("en-IN")} />
                <DetailRow label="Status" value={<StatusBadge status="completed" />} />
              </DetailPanel>
            )}
          </>
        )}

        <div className="flex gap-2">
          <Link href={`/rfqs/${id}/compare`}>
            <Button variant="secondary">Compare Quotations</Button>
          </Link>
          <Link href={`/rfqs/${id}`}>
            <Button variant="secondary">Back to RFQ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
