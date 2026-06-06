"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { Sparkles } from "lucide-react";

export default function AiRfqGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { title: string; description: string; quantity: number; deadline: string }>(null);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({ title: "Procurement of 50 Desktop Monitors", description: "Need 50 27-inch 4K monitors with IPS panel for design team.", quantity: 50, deadline: "2025-07-15" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <PageHeader title="AI RFQ Generator" backHref="/rfqs/new" />
      <Card className="mb-6">
        <CardBody>
          <div className="space-y-4">
            <Textarea placeholder="Describe your requirement in natural language... (e.g., Need 100 laptops with i7, 16GB RAM)" rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <Button onClick={handleGenerate} disabled={!prompt || loading}>
              <Sparkles className="h-4 w-4" />
              {loading ? "Generating..." : "Generate RFQ"}
            </Button>
          </div>
        </CardBody>
      </Card>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>}
      {result && !loading && (
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--color-primary)]" /> Generated RFQ</h3></CardHeader>
          <CardBody className="space-y-3">
            <div><p className="text-xs text-[var(--color-on-surface-variant)]">Title</p><p className="text-sm font-medium">{result.title}</p></div>
            <div><p className="text-xs text-[var(--color-on-surface-variant)]">Description</p><p className="text-sm">{result.description}</p></div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-[var(--color-on-surface-variant)]">Quantity</p><p className="text-sm font-medium data-mono">{result.quantity}</p></div>
              <div><p className="text-xs text-[var(--color-on-surface-variant)]">Deadline</p><p className="text-sm font-medium data-mono">{result.deadline}</p></div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="secondary" onClick={() => setResult(null)}>Regenerate</Button>
              <Link href="/rfqs/new"><Button>Use This RFQ</Button></Link>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}