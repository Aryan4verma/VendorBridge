"use client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { mockPurchaseOrders, mockQuotations, getVendorName } from "@/lib/mock-data";
import Link from "next/link";

export default function PoListPage() {
  return (
    <div>
      <PageHeader title="Purchase Orders" />
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>PO Number</TableHead><TableHead>Vendor</TableHead><TableHead>Status</TableHead><TableHead>Generated</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockPurchaseOrders.map((po) => {
              const q = mockQuotations.find((q) => q.id === po.quotation_id);
              return (
                <TableRow key={po.id}>
                  <TableCell><Link href={`/purchase-orders/${po.id}`} className="font-medium hover:text-[var(--color-primary)] data-mono">{po.po_number}</Link></TableCell>
                  <TableCell>{q ? getVendorName(q.vendor_id) : "—"}</TableCell>
                  <TableCell><StatusBadge status={po.status} /></TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(po.generated_at).toLocaleDateString("en-IN")}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
