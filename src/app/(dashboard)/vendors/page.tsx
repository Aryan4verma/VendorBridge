"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { FilterBar } from "@/components/forms/filter-bar/filter-bar";
import { SearchInput } from "@/components/forms/search-input/search-input";
import { Select } from "@/components/primitives/select/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { useVendors } from "@/features/vendors/hooks/use-vendors";

export default function VendorListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const { vendors, isLoading } = useVendors({
    search: search || undefined,
    status: (status as "active" | "inactive" | "blacklisted") || undefined,
    category: category || undefined,
  });

  return (
    <div>
      <PageHeader
        title="Vendors"
        actions={
          <Link href="/vendors/new">
            <Button>Add Vendor</Button>
          </Link>
        }
      />
      <FilterBar>
        <SearchInput
          placeholder="Search vendors..."
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select className="w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
        <Select className="w-40" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="IT Hardware">IT Hardware</option>
          <option value="Software">Software</option>
          <option value="Office Supplies">Office Supplies</option>
        </Select>
      </FilterBar>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        {isLoading ? (
          <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading vendors...</div>
        ) : vendors.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-on-surface-variant)]">No vendors found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <Link href={`/vendors/${v.id}`} className="font-medium hover:text-[var(--color-primary)]">
                      {v.company_name}
                    </Link>
                  </TableCell>
                  <TableCell>{v.category}</TableCell>
                  <TableCell>{v.contact_person}</TableCell>
                  <TableCell className="data-mono">{v.email}</TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
