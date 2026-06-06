"use client";
import { useState } from "react";
import { Button } from "@/components/primitives/button/button";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/feedback/modal/modal";
import { mockApprovals, mockQuotations, getRfqTitle, getVendorName } from "@/lib/mock-data";

export default function ApprovalDetailPage() {
  const approval = mockApprovals[0];
  const quotation = mockQuotations.find((q) => q.id === approval.quotation_id);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [remarks, setRemarks] = useState("");

  return (
    <div>
      <PageHeader title="Approval Detail" backHref="/approvals" actions={<StatusBadge status={approval.status} />} />
      <DetailPanel className="mb-6">
        <DetailRow label="RFQ" value={quotation ? getRfqTitle(quotation.rfq_id) : "—"} />
        <DetailRow label="Vendor" value={quotation ? getVendorName(quotation.vendor_id) : "—"} />
        <DetailRow label="Price" value={quotation ? "₹" + quotation.price.toLocaleString("en-IN") : "—"} mono />
        <DetailRow label="Delivery" value={quotation ? quotation.delivery_days + " days" : "—"} mono />
        <DetailRow label="Notes" value={quotation?.notes || "—"} />
        {approval.remarks && <DetailRow label="Remarks" value={approval.remarks} />}
      </DetailPanel>
      {approval.status === "pending" && (
        <div className="flex gap-2">
          <Button>Approve</Button>
          <Button variant="danger" onClick={() => setRejectOpen(true)}>Reject</Button>
        </div>
      )}
      <Modal open={rejectOpen} onClose={() => setRejectOpen(false)}>
        <ModalHeader onClose={() => setRejectOpen(false)}>Reject Approval</ModalHeader>
        <ModalBody>
          <Textarea placeholder="Enter rejection remarks..." value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setRejectOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setRejectOpen(false)}>Reject</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
