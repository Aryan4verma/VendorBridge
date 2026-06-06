"use client";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { mockRfqs } from "@/lib/mock-data";

export default function VendorRfqListPage() {
  return (
    <div>
      <PageHeader title="My RFQs" />
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Quantity</TableHead><TableHead>Deadline</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockRfqs.filter((r) => r.status === "open").map((r) => (
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
    </div>
  );
}
