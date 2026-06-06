"use client";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useActivityLogs } from "@/features/activity-logs/hooks/use-activity-logs";
import { formatDateTime } from "@/lib/utils";

export default function ActivityLogPage() {
  const { logs, isLoading, error } = useActivityLogs(50);

  return (
    <div>
      <PageHeader title="Activity Logs" subtitle={`${logs.length} entries`} />
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="p-8 text-center text-[var(--color-error)]">{error}</div>
      ) : logs.length === 0 ? (
        <div className="p-8 text-center text-[var(--color-on-surface-variant)] rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">No activity logs found</div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)]">
          <Table>
            <TableHeader><TableRow><TableHead>Action</TableHead><TableHead>Entity Type</TableHead><TableHead>Entity ID</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="capitalize font-medium">{log.action.replace(/_/g, " ")}</TableCell>
                  <TableCell className="capitalize">{log.entity_type.replace(/_/g, " ")}</TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{log.entity_id?.slice(0, 8) ?? "—"}</TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{formatDateTime(log.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
