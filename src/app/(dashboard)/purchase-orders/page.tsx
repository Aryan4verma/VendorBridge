"use client";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";

export default function PoListPage() {
  const { purchaseOrders, isLoading, error } = usePurchaseOrders();

  return (
    <div>
      <PageHeader title="Purchase Orders" subtitle={`${purchaseOrders.length} total`} />
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : purchaseOrders.length === 0 ? (
        <div className="p-8 text-center text-[var(--color-on-surface-variant)] rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">No purchase orders found</div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader><TableRow><TableHead>PO Number</TableHead><TableHead>Vendor</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Generated</TableHead></TableRow></TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => {
                const vendorName = (po.quotations as Record<string, unknown>)?.vendors;
                return (
                  <TableRow key={po.id}>
                    <TableCell><Link href={`/purchase-orders/${po.id}`} className="font-medium hover:text-[var(--color-primary)] data-mono">{po.po_number}</Link></TableCell>
                    <TableCell>{typeof vendorName === "object" && vendorName !== null && "company_name" in vendorName ? (vendorName as { company_name: string }).company_name : "—"}</TableCell>
                    <TableCell className="data-mono">₹{(po.quotations as Record<string, unknown>)?.price != null ? ((po.quotations as Record<string, unknown>).price as number).toLocaleString("en-IN") : "—"}</TableCell>
                    <TableCell><StatusBadge status={po.status} /></TableCell>
                    <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(po.generated_at).toLocaleDateString("en-IN")}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
