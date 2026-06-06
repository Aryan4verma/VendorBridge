"use client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { FilterBar } from "@/components/forms/filter-bar/filter-bar";
import { SearchInput } from "@/components/forms/search-input/search-input";
import { Select } from "@/components/primitives/select/select";
import { Badge } from "@/components/primitives/badge/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { mockUsers } from "@/lib/mock-data";

export default function UserManagementPage() {
  return (
    <div>
      <PageHeader title="User Management" />
      <FilterBar>
        <SearchInput placeholder="Search users..." className="w-64" />
        <Select className="w-40"><option value="">All Roles</option><option>Admin</option><option>Procurement</option><option>Manager</option><option>Vendor</option></Select>
      </FilterBar>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Joined</TableHead></TableRow></TableHeader>
          <TableBody>
            {mockUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.full_name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell><Badge variant={u.role === "admin" ? "active" : u.role === "manager" ? "pending" : "default"}>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</Badge></TableCell>
                <TableCell><Badge variant={u.is_active ? "active" : "inactive"}>{u.is_active ? "Active" : "Inactive"}</Badge></TableCell>
                <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{new Date(u.created_at).toLocaleDateString("en-IN")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
