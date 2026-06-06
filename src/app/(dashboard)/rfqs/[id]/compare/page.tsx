"use client";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { AIRecommendationCard } from "@/components/data-display/ai-recommendation-card/ai-recommendation-card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { mockRfqs, mockQuotations, getVendorName } from "@/lib/mock-data";

export default function QuotationComparisonPage() {
  const rfq = mockRfqs[0];
  const quotations = mockQuotations.filter((q) => q.rfq_id === rfq.id);
  const lowestPrice = Math.min(...quotations.map((q) => q.price));
  const fastestDelivery = Math.min(...quotations.map((q) => q.delivery_days));

  return (
    <div>
      <PageHeader title="Quotation Comparison" backHref={`/rfqs/${rfq.id}`} subtitle={rfq.title} />
      <div className="mb-6">
        <AIRecommendationCard vendorName="GlobalTech Industries" confidence={87} reasoning="Best balance of price and delivery time" onAccept={() => {}} />
      </div>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Delivery Days</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.map((q) => (
              <TableRow key={q.id}>
                <TableCell className="font-medium">{getVendorName(q.vendor_id)}</TableCell>
                <TableCell className={`data-mono ${q.price === lowestPrice ? "text-[var(--color-status-active)] font-semibold" : ""}`}>
                  ₹{q.price.toLocaleString("en-IN")} {q.price === lowestPrice && "✓ Lowest"}
                </TableCell>
                <TableCell className={`data-mono ${q.delivery_days === fastestDelivery ? "text-[var(--color-status-active)] font-semibold" : ""}`}>
                  {q.delivery_days} days {q.delivery_days === fastestDelivery && "✓ Fastest"}
                </TableCell>
                <TableCell className="text-[var(--color-on-surface-variant)]">{q.notes}</TableCell>
                <TableCell><Button size="sm">Select</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}