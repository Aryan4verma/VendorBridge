"use client";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useRfqs } from "@/features/rfqs/hooks/use-rfqs";

export default function VendorRfqListPage() {
  const { rfqs, isLoading, error } = useRfqs({ status: "open" });

  return (
    <div>
      <PageHeader title="My RFQs" subtitle={`${rfqs.length} open`} />
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : rfqs.length === 0 ? (
        <div className="p-8 text-center text-[var(--color-on-surface-variant)] rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">No open RFQs</div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Quantity</TableHead><TableHead>Deadline</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {rfqs.map((r) => (
                <TableRow key={r.id}>
                  <TableCell><Link href={`/vendor/rfqs/${r.id}/quote`} className="font-medium hover:text-[var(--color-primary)]">{r.title}</Link></TableCell>
                  <TableCell className="data-mono">{r.quantity}</TableCell>
                  <TableCell className="data-mono">{r.deadline}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
