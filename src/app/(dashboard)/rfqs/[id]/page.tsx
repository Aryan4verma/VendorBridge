"use client";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { useRfq } from "@/features/rfqs/hooks/use-rfq";
import { useQuotations } from "@/features/quotations/hooks/use-quotations";
import { useToast } from "@/providers/toast-provider";
import { rfqService } from "@/features/rfqs/services/rfq.service";

export default function RfqDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { rfq, isLoading, error } = useRfq(id);
  const { quotations } = useQuotations({ rfq_id: id });

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this RFQ?")) return;
    try {
      await rfqService.delete(id);
      toast("RFQ deleted", "success");
      router.push("/rfqs");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete RFQ", "error");
    }
  };

  const handleStatusChange = async (newStatus: "draft" | "open" | "closed" | "awarded") => {
    try {
      await rfqService.update(id, { status: newStatus });
      toast(`RFQ status changed to ${newStatus}`, "success");
      window.location.reload();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to update status", "error");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading...</div>;
  }

  if (error || !rfq) {
    return <div className="p-8 text-center text-[var(--color-error)]">{error || "RFQ not found"}</div>;
  }

  return (
    <div>
      <PageHeader
        title={rfq.title}
        backHref="/rfqs"
        subtitle={`Deadline: ${rfq.deadline}`}
        actions={
          <div className="flex gap-2">
            <StatusBadge status={rfq.status} />
            {rfq.status === "open" && (
              <Link href={`/rfqs/${id}/quote`}>
                <Button>Submit Quotation</Button>
              </Link>
            )}
            {rfq.status === "draft" && (
              <Button onClick={() => handleStatusChange("open")}>Publish</Button>
            )}
            {rfq.status === "open" && (
              <Button variant="secondary" onClick={() => handleStatusChange("closed")}>Close</Button>
            )}
            <Button variant="secondary" onClick={handleDelete} className="text-[var(--color-error)]">Delete</Button>
          </div>
        }
      />
      <DetailPanel className="mb-6">
        <DetailRow label="Description" value={rfq.description || "—"} />
        <DetailRow label="Quantity" value={rfq.quantity} mono />
        <DetailRow label="Deadline" value={rfq.deadline} mono />
        <DetailRow label="Status" value={<StatusBadge status={rfq.status} />} />
        <DetailRow label="Created" value={new Date(rfq.created_at).toLocaleDateString("en-IN")} mono />
      </DetailPanel>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-[var(--font-size-title-sm)] font-semibold">Quotations ({quotations.length})</h3>
            {quotations.length > 1 && (
              <Link href={`/rfqs/${id}/compare`}>
                <Button variant="secondary" size="sm">Compare All</Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {quotations.length === 0 ? (
            <div className="p-8 text-center text-[var(--color-on-surface-variant)]">
              No quotations submitted yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotations.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="data-mono font-medium">
                      ₹{q.price.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="data-mono">{q.delivery_days} days</TableCell>
                    <TableCell className="text-[var(--color-on-surface-variant)]">{q.notes || "—"}</TableCell>
                    <TableCell><StatusBadge status={q.status} /></TableCell>
                    <TableCell className="data-mono text-[var(--color-on-surface-variant)]">
                      {new Date(q.submitted_at).toLocaleDateString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
