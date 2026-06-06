"use client";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { mockApprovals, mockQuotations, getRfqTitle, getVendorName } from "@/lib/mock-data";

export default function ApprovalQueuePage() {
  return (
    <div>
      <PageHeader title="Approvals" />
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>RFQ</TableHead><TableHead>Vendor</TableHead><TableHead>Price</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockApprovals.map((a) => {
              const q = mockQuotations.find((q) => q.id === a.quotation_id);
              return (
                <TableRow key={a.id} onClick={() => {}}>
                  <TableCell><Link href={`/approvals/${a.id}`} className="font-medium hover:text-[var(--color-primary)]">{q ? getRfqTitle(q.rfq_id) : "—"}</Link></TableCell>
                  <TableCell>{q ? getVendorName(q.vendor_id) : "—"}</TableCell>
                  <TableCell className="data-mono">{q ? `₹${q.price.toLocaleString("en-IN")}` : "—"}</TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(a.created_at).toLocaleDateString("en-IN")}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
