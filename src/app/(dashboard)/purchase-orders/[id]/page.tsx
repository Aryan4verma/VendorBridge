"use client";
import { use } from "react";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { usePurchaseOrder } from "@/features/purchase-orders/hooks/use-purchase-orders";
import { Download } from "lucide-react";

export default function PoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { purchaseOrder: po, isLoading, error } = usePurchaseOrder(id);

  if (isLoading) return <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>;
  if (error || !po) return <div className="p-8 text-center text-[var(--color-error)]">{error || "Purchase order not found"}</div>;

  const vendorName = (po.quotations as Record<string, unknown>)?.vendors;
  const price = (po.quotations as Record<string, unknown>)?.price;

  return (
    <div>
      <PageHeader title={po.po_number} backHref="/purchase-orders" actions={<StatusBadge status={po.status} />} />
      <DetailPanel className="mb-6">
        <DetailRow label="PO Number" value={po.po_number} mono />
        <DetailRow label="Vendor" value={typeof vendorName === "object" && vendorName !== null && "company_name" in vendorName ? (vendorName as { company_name: string }).company_name : "—"} />
        <DetailRow label="Amount" value={price != null ? `₹${(price as number).toLocaleString("en-IN")}` : "—"} mono />
        <DetailRow label="Status" value={<StatusBadge status={po.status} />} />
        <DetailRow label="Generated" value={new Date(po.generated_at).toLocaleDateString("en-IN")} />
      </DetailPanel>
      <Card>
        <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Document</h3></CardHeader>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--color-surface-border)] rounded-[var(--radius-lg)]">
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">Purchase Order Document</p>
            <Button variant="secondary"><Download className="h-4 w-4" /> Download PDF</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
