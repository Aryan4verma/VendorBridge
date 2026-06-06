"use client";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { mockPurchaseOrders, mockQuotations, getVendorName } from "@/lib/mock-data";
import { Download } from "lucide-react";

export default function PoDetailPage() {
  const po = mockPurchaseOrders[0];
  const q = mockQuotations.find((q) => q.id === po.quotation_id);
  return (
    <div>
      <PageHeader title={po.po_number} backHref="/purchase-orders" actions={<StatusBadge status={po.status} />} />
      <DetailPanel className="mb-6">
        <DetailRow label="PO Number" value={po.po_number} mono />
        <DetailRow label="Vendor" value={q ? getVendorName(q.vendor_id) : "—"} />
        <DetailRow label="Amount" value={q ? "₹" + q.price.toLocaleString("en-IN") : "—"} mono />
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
