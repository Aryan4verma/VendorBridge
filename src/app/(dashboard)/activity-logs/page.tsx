"use client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { FilterBar } from "@/components/forms/filter-bar/filter-bar";
import { SearchInput } from "@/components/forms/search-input/search-input";
import { Select } from "@/components/primitives/select/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { mockActivityLogs } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function ActivityLogPage() {
  return (
    <div>
      <PageHeader title="Activity Logs" />
      <FilterBar>
        <SearchInput placeholder="Search by user..." className="w-64" />
        <Select className="w-40"><option value="">All Types</option><option value="rfq">RFQ</option><option value="quotation">Quotation</option><option value="approval">Approval</option><option value="purchase_order">Purchase Order</option><option value="invoice">Invoice</option></Select>
      </FilterBar>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Entity Type</TableHead><TableHead>Entity ID</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockActivityLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.user_id === "1" ? "Rahul Kumar" : log.user_id}</TableCell>
                <TableCell className="capitalize">{log.action.replace(/_/g, " ")}</TableCell>
                <TableCell className="capitalize">{log.entity_type.replace(/_/g, " ")}</TableCell>
                <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{log.entity_id}</TableCell>
                <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{formatDateTime(log.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
