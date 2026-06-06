"use client";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { useRfq } from "@/features/rfqs/hooks/use-rfq";
import { useQuotations } from "@/features/quotations/hooks/use-quotations";
import { useToast } from "@/providers/toast-provider";
import { quotationService } from "@/features/quotations/services/quotation.service";
import { rfqService } from "@/features/rfqs/services/rfq.service";

export default function QuotationComparisonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const { rfq } = useRfq(id);
  const { quotations, refetch } = useQuotations({ rfq_id: id });

  const sortedByPrice = [...quotations].sort((a, b) => a.price - b.price);
  const sortedByDelivery = [...quotations].sort((a, b) => a.delivery_days - b.delivery_days);
  const lowestPrice = sortedByPrice[0]?.price;
  const fastestDelivery = sortedByDelivery[0]?.delivery_days;

  const handleSelectWinner = async (quotationId: string) => {
    if (!confirm("Select this quotation as the winner? This will close the RFQ.")) return;
    try {
      await quotationService.update(quotationId, { status: "selected" });
      await rfqService.update(id, { status: "awarded" });
      toast("Quotation selected and RFQ awarded!", "success");
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to select winner", "error");
    }
  };

  if (!rfq) {
    return <div className="p-8 text-center text-[var(--color-error)]">RFQ not found</div>;
  }

  return (
    <div>
      <PageHeader
        title="Quotation Comparison"
        backHref={`/rfqs/${id}`}
        subtitle={rfq.title}
        actions={
          <Link href={`/rfqs/${id}`}>
            <Button variant="secondary">Back to RFQ</Button>
          </Link>
        }
      />

      {quotations.length === 0 ? (
        <div className="p-8 text-center text-[var(--color-on-surface-variant)] rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          No quotations to compare
        </div>
      ) : (
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
              {sortedByPrice.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">Vendor {q.vendor_id.slice(0, 8)}</TableCell>
                  <TableCell className={`data-mono ${q.price === lowestPrice ? "text-[var(--color-status-active)] font-semibold" : ""}`}>
                    ₹{q.price.toLocaleString("en-IN")} {q.price === lowestPrice && "(Lowest)"}
                  </TableCell>
                  <TableCell className={`data-mono ${q.delivery_days === fastestDelivery ? "text-[var(--color-status-active)] font-semibold" : ""}`}>
                    {q.delivery_days} days {q.delivery_days === fastestDelivery && "(Fastest)"}
                  </TableCell>
                  <TableCell className="text-[var(--color-on-surface-variant)]">{q.notes || "—"}</TableCell>
                  <TableCell>
                    {q.status === "submitted" ? (
                      <Button size="sm" onClick={() => handleSelectWinner(q.id)}>Select</Button>
                    ) : (
                      <span className="text-sm text-[var(--color-on-surface-variant)]">{q.status}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
