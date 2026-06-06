"use client";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { mockInvoices } from "@/lib/mock-data";

export default function InvoiceListPage() {
  return (
    <div>
      <PageHeader title="Invoices" actions={<Link href="/invoices/new"><Button>Generate Invoice</Button></Link>} />
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>Invoice #</TableHead><TableHead>PO #</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Generated</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell><Link href={`/invoices/${inv.id}`} className="font-medium hover:text-[var(--color-primary)] data-mono">{inv.invoice_number}</Link></TableCell>
                <TableCell className="data-mono">PO-2505-0001</TableCell>
                <TableCell className="data-mono">₹{inv.total?.toLocaleString("en-IN")}</TableCell>
                <TableCell><StatusBadge status={inv.status} /></TableCell>
                <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(inv.generated_at).toLocaleDateString("en-IN")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
