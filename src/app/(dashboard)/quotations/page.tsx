"use client";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useQuotations } from "@/features/quotations/hooks/use-quotations";

export default function QuotationListPage() {
  const { quotations, isLoading, error } = useQuotations();

  return (
    <div>
      <PageHeader title="Quotations" subtitle={`${quotations.length} total`} />
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : quotations.length === 0 ? (
        <div className="p-8 text-center text-[var(--color-on-surface-variant)] rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">No quotations found</div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader><TableRow><TableHead>RFQ</TableHead><TableHead>Vendor</TableHead><TableHead>Price</TableHead><TableHead>Delivery</TableHead><TableHead>Status</TableHead><TableHead>Submitted</TableHead></TableRow></TableHeader>
            <TableBody>
              {quotations.map((q) => (
                <TableRow key={q.id}>
                  <TableCell><Link href={`/rfqs/${q.rfq_id}`} className="font-medium hover:text-[var(--color-primary)]">{q.rfq_id.slice(0, 8)}</Link></TableCell>
                  <TableCell>{q.vendor_id.slice(0, 8)}</TableCell>
                  <TableCell className="data-mono">₹{q.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="data-mono">{q.delivery_days} days</TableCell>
                  <TableCell><StatusBadge status={q.status} /></TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(q.submitted_at).toLocaleDateString("en-IN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
