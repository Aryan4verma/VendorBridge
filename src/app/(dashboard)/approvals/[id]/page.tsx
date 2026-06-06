"use client";
import { use, useState } from "react";
import { Button } from "@/components/primitives/button/button";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/feedback/modal/modal";
import { FormField } from "@/components/forms/form-field/form-field";
import { useAuth } from "@/providers/auth-provider";
import { useApproval } from "@/features/approvals/hooks/use-approval";
import { approvalService } from "@/features/approvals/services/approval.service";
import { useToast } from "@/providers/toast-provider";
import { CheckCircle, XCircle } from "lucide-react";

export default function ApprovalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const { user } = useAuth();
  const { approval, isLoading, error, refetch } = useApproval(id);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState<"approved" | "rejected">("approved");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quotation = approval?.quotations;
  const rfqTitle = quotation?.rfqs?.title ?? "—";
  const vendorName = quotation?.vendors?.company_name ?? "—";

  const openModal = (type: "approved" | "rejected") => {
    setAction(type);
    setRemarks("");
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast("You must be logged in", "error");
      return;
    }
    if (!remarks.trim()) {
      toast("Remarks are required", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      await approvalService.updateStatus(id, action, remarks.trim(), user.id);
      toast(`Quotation ${action}`, "success");
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to update approval", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>;
  }

  if (error || !approval) {
    return <div className="p-8 text-center text-[var(--color-error)]">{error || "Approval not found"}</div>;
  }

  return (
    <div>
      <PageHeader
        title="Approval Detail"
        backHref="/approvals"
        actions={
          approval.status === "pending" ? (
            <div className="flex gap-2">
              <Button onClick={() => openModal("approved")}>
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
              <Button variant="danger" onClick={() => openModal("rejected")}>
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </div>
          ) : (
            <StatusBadge status={approval.status} />
          )
        }
      />

      <DetailPanel className="mb-6">
        <DetailRow label="RFQ" value={rfqTitle} />
        <DetailRow label="Vendor" value={vendorName} />
        <DetailRow
          label="Price"
          value={quotation?.price != null ? `₹${quotation.price.toLocaleString("en-IN")}` : "—"}
          mono
        />
        <DetailRow
          label="Delivery"
          value={quotation?.delivery_days != null ? `${quotation.delivery_days} days` : "—"}
          mono
        />
        <DetailRow label="Notes" value={quotation?.notes || "—"} />
        <DetailRow label="Status" value={<StatusBadge status={approval.status} />} />
        {approval.remarks && <DetailRow label="Remarks" value={approval.remarks} />}
        {approval.approved_at && (
          <DetailRow
            label="Decided At"
            value={new Date(approval.approved_at).toLocaleString("en-IN")}
            mono
          />
        )}
        <DetailRow label="Submitted" value={new Date(approval.created_at).toLocaleString("en-IN")} mono />
      </DetailPanel>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader onClose={() => setModalOpen(false)}>
          {action === "approved" ? "Approve Quotation" : "Reject Quotation"}
        </ModalHeader>
        <ModalBody>
          <FormField label="Remarks" required>
            <Textarea
              placeholder={action === "approved" ? "Enter approval remarks..." : "Enter rejection reason..."}
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              disabled={isSubmitting}
            />
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant={action === "approved" ? "primary" : "danger"}
            onClick={handleSubmit}
            disabled={isSubmitting || !remarks.trim()}
          >
            {isSubmitting
              ? "Submitting..."
              : action === "approved"
                ? "Approve"
                : "Reject"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
