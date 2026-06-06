"use client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useVendors } from "@/features/vendors/hooks/use-vendors";

export default function VendorOversightPage() {
  const { vendors, isLoading, error } = useVendors();

  return (
    <div>
      <PageHeader title="Vendor Oversight" subtitle={`${vendors.length} vendors`} />
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Code</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Rating</TableHead></TableRow></TableHeader>
            <TableBody>
              {vendors.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.company_name}</TableCell>
                  <TableCell className="data-mono">{v.vendor_code}</TableCell>
                  <TableCell>{v.category}</TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                  <TableCell className="data-mono">{v.rating > 0 ? v.rating.toFixed(1) : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
