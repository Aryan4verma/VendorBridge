"use client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { mockQuotations, getRfqTitle, getVendorName } from "@/lib/mock-data";
import Link from "next/link";

export default function QuotationListPage() {
  return (
    <div>
      <PageHeader title="Quotations" />
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>RFQ</TableHead><TableHead>Vendor</TableHead><TableHead>Price</TableHead><TableHead>Delivery</TableHead><TableHead>Status</TableHead><TableHead>Submitted</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockQuotations.map((q) => (
              <TableRow key={q.id}>
                <TableCell><Link href={`/rfqs/${q.rfq_id}`} className="font-medium hover:text-[var(--color-primary)]">{getRfqTitle(q.rfq_id)}</Link></TableCell>
                <TableCell>{getVendorName(q.vendor_id)}</TableCell>
                <TableCell className="data-mono">₹{q.price.toLocaleString("en-IN")}</TableCell>
                <TableCell className="data-mono">{q.delivery_days} days</TableCell>
                <TableCell><StatusBadge status={q.status} /></TableCell>
                <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(q.submitted_at).toLocaleDateString("en-IN")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
