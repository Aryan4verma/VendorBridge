"use client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { FilterBar } from "@/components/forms/filter-bar/filter-bar";
import { SearchInput } from "@/components/forms/search-input/search-input";
import { Select } from "@/components/primitives/select/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { mockVendors } from "@/lib/mock-data";

export default function VendorOversightPage() {
  return (
    <div>
      <PageHeader title="Vendor Oversight" />
      <FilterBar>
        <SearchInput placeholder="Search vendors..." className="w-64" />
        <Select className="w-40"><option value="">All Status</option><option>Active</option><option>Inactive</option><option>Blacklisted</option></Select>
      </FilterBar>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Code</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Created By</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockVendors.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">{v.company_name}</TableCell>
                <TableCell className="data-mono">{v.vendor_code}</TableCell>
                <TableCell>{v.category}</TableCell>
                <TableCell><StatusBadge status={v.status} /></TableCell>
                <TableCell>{v.created_by === "1" ? "Rahul Kumar" : v.created_by}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
