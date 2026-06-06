"use client";
import { use } from "react";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useInvoice } from "@/features/invoices/hooks/use-invoices";
import { Download, Mail } from "lucide-react";

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { invoice: inv, isLoading, error } = useInvoice(id);

  if (isLoading) return <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>;
  if (error || !inv) return <div className="p-8 text-center text-[var(--color-error)]">{error || "Invoice not found"}</div>;

  return (
    <div>
      <PageHeader title={inv.invoice_number} backHref="/invoices" actions={<StatusBadge status={inv.status} />} />
      <DetailPanel className="mb-6">
        <DetailRow label="Invoice Number" value={inv.invoice_number} mono />
        <DetailRow label="PO Number" value={(inv.purchase_orders as Record<string, unknown>)?.po_number as string ?? "—"} mono />
        <DetailRow label="Subtotal" value={inv.subtotal != null ? `₹${inv.subtotal.toLocaleString("en-IN")}` : "—"} mono />
        <DetailRow label="Tax" value={inv.tax != null ? `₹${inv.tax.toLocaleString("en-IN")}` : "—"} mono />
        <DetailRow label="Total" value={inv.total != null ? `₹${inv.total.toLocaleString("en-IN")}` : "—"} mono />
        <DetailRow label="Status" value={<StatusBadge status={inv.status} />} />
      </DetailPanel>
      <Card>
        <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Document</h3></CardHeader>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--color-surface-border)] rounded-[var(--radius-lg)]">
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">Invoice Document</p>
            <div className="flex gap-2">
              <Button variant="secondary"><Download className="h-4 w-4" /> Download PDF</Button>
              <Button><Mail className="h-4 w-4" /> Send via Email</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
