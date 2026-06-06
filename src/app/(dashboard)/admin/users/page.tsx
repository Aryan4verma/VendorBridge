"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/services/supabase/client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { Badge } from "@/components/primitives/badge/badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";

interface Profile { id: string; full_name: string; email: string; role: string; is_active: boolean; created_at: string; }

export default function UserManagementPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error: err } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (err) throw err;
      setUsers(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return (
    <div>
      <PageHeader title="User Management" subtitle={`${users.length} users`} />
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Joined</TableHead></TableRow></TableHeader>
            <TableBody>
              {users.map((u) => (
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
      )}
    </div>
  );
}
