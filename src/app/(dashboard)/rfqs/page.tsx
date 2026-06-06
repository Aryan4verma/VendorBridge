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
import { useRfqs } from "@/features/rfqs/hooks/use-rfqs";

export default function RfqListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { rfqs, isLoading } = useRfqs({
    search: search || undefined,
    status: (status as "draft" | "open" | "closed" | "awarded") || undefined,
  });

  return (
    <div>
      <PageHeader
        title="RFQs"
        actions={
          <Link href="/rfqs/new">
            <Button>Create RFQ</Button>
          </Link>
        }
      />
      <FilterBar>
        <SearchInput
          placeholder="Search RFQs..."
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select className="w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="awarded">Awarded</option>
        </Select>
      </FilterBar>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        {isLoading ? (
          <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading RFQs...</div>
        ) : rfqs.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-on-surface-variant)]">No RFQs found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfqs.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <Link href={`/rfqs/${r.id}`} className="font-medium hover:text-[var(--color-primary)]">
                      {r.title}
                    </Link>
                  </TableCell>
                  <TableCell className="data-mono">{r.quantity}</TableCell>
                  <TableCell className="data-mono">{r.deadline}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">
                    {new Date(r.created_at).toLocaleDateString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
