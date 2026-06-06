"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useApprovals } from "@/features/approvals/hooks/use-approvals";
import type { ApprovalStatus } from "@/types/database";

const statusFilters: { label: string; value: ApprovalStatus | "" }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function ApprovalsPage() {
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | "">("");
  const { approvals, isLoading, error } = useApprovals(statusFilter ? { status: statusFilter } : undefined);

  return (
    <div>
      <PageHeader
        title="Approvals"
        subtitle={`${approvals.length} total`}
        actions={
          <div className="flex gap-1">
            {statusFilters.map((f) => (
              <Button
                key={f.value}
                variant={statusFilter === f.value ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatusFilter(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : approvals.length === 0 ? (
        <div className="p-8 text-center text-[var(--color-on-surface-variant)] rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          No approvals found
        </div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RFQ</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((a) => {
                const rfqTitle = a.quotations?.rfqs?.title ?? "—";
                const vendorName = a.quotations?.vendors?.company_name ?? "—";
                const price = a.quotations?.price;
                const deliveryDays = a.quotations?.delivery_days;

                return (
                  <TableRow key={a.id}>
                    <TableCell>
                      <Link href={`/approvals/${a.id}`} className="font-medium hover:text-[var(--color-primary)]">
                        {rfqTitle}
                      </Link>
                    </TableCell>
                    <TableCell>{vendorName}</TableCell>
                    <TableCell className="data-mono">
                      {price != null ? `₹${price.toLocaleString("en-IN")}` : "—"}
                    </TableCell>
                    <TableCell className="data-mono">
                      {deliveryDays != null ? `${deliveryDays} days` : "—"}
                    </TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="data-mono text-[var(--color-on-surface-variant)]">
                      {new Date(a.created_at).toLocaleDateString("en-IN")}
                    </TableCell>
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
