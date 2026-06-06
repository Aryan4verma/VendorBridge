"use client";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useInvoices } from "@/features/invoices/hooks/use-invoices";

export default function InvoiceListPage() {
  const { invoices, isLoading, error } = useInvoices();

  return (
    <div>
      <PageHeader title="Invoices" subtitle={`${invoices.length} total`} actions={<Link href="/invoices/new"><Button>Generate Invoice</Button></Link>} />
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : invoices.length === 0 ? (
        <div className="p-8 text-center text-[var(--color-on-surface-variant)] rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">No invoices found</div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader><TableRow><TableHead>Invoice #</TableHead><TableHead>PO #</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Generated</TableHead></TableRow></TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell><Link href={`/invoices/${inv.id}`} className="font-medium hover:text-[var(--color-primary)] data-mono">{inv.invoice_number}</Link></TableCell>
                  <TableCell className="data-mono">{String((inv.purchase_orders as Record<string, unknown>)?.po_number ?? "—")}</TableCell>
                  <TableCell className="data-mono">{inv.total != null ? `₹${inv.total.toLocaleString("en-IN")}` : "—"}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(inv.generated_at).toLocaleDateString("en-IN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
