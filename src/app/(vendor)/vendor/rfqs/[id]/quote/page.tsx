"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { useRfq } from "@/features/rfqs/hooks/use-rfq";
import { useToast } from "@/providers/toast-provider";
import { quotationService } from "@/features/quotations/services/quotation.service";

export default function VendorQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { rfq, isLoading } = useRfq(id);
  const [form, setForm] = useState({ price: "", delivery_days: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.price || !form.delivery_days) { toast("Fill in price and delivery days", "error"); return; }
    setIsSubmitting(true);
    try {
      await quotationService.create({ rfq_id: id, vendor_id: "00000000-0000-0000-0000-000000000000", price: Number(form.price), delivery_days: Number(form.delivery_days), notes: form.notes || null, status: "submitted" });
      toast("Quotation submitted", "success");
      router.push("/vendor/rfqs");
    } catch (err) { toast(err instanceof Error ? err.message : "Failed", "error"); }
    finally { setIsSubmitting(false); }
  };

  if (isLoading) return <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>;
  if (!rfq) return <div className="p-8 text-center text-[var(--color-error)]">RFQ not found</div>;

  return (
    <div>
      <PageHeader title="Submit Quotation" backHref="/vendor/rfqs" subtitle={rfq.title} />
      <DetailPanel className="mb-6">
        <DetailRow label="Quantity" value={rfq.quantity} mono />
        <DetailRow label="Deadline" value={rfq.deadline} mono />
        <DetailRow label="Description" value={rfq.description || "—"} />
      </DetailPanel>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Price (₹)" required><Input type="number" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} disabled={isSubmitting} /></FormField>
              <FormField label="Delivery Days" required><Input type="number" placeholder="0" value={form.delivery_days} onChange={(e) => setForm({ ...form, delivery_days: e.target.value })} disabled={isSubmitting} /></FormField>
            </div>
            <FormField label="Notes"><Textarea placeholder="Additional notes..." rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} disabled={isSubmitting} /></FormField>
            <FormActions>
              <Button variant="secondary" type="button" onClick={() => router.push("/vendor/rfqs")} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Quotation"}</Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
