"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormSection } from "@/components/forms/form-section/form-section";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { useToast } from "@/providers/toast-provider";
import { useRfq } from "@/features/rfqs/hooks/use-rfq";
import { useVendor } from "@/features/vendors/hooks/use-vendor";
import { quotationService } from "@/features/quotations/services/quotation.service";

export default function SubmitQuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { rfq, isLoading: isLoadingRfq } = useRfq(id);
  const { vendor } = useVendor(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    price: "",
    delivery_days: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.price || !form.delivery_days) {
      toast("Please fill in price and delivery days", "error");
      return;
    }
    setIsLoading(true);
    try {
      await quotationService.create({
        rfq_id: id,
        vendor_id: vendor?.id || "00000000-0000-0000-0000-000000000000",
        price: Number(form.price),
        delivery_days: Number(form.delivery_days),
        notes: form.notes || null,
        status: "submitted",
      });
      toast("Quotation submitted successfully", "success");
      router.push(`/rfqs/${id}`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to submit quotation", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingRfq) {
    return <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading...</div>;
  }

  if (!rfq) {
    return <div className="p-8 text-center text-[var(--color-error)]">RFQ not found</div>;
  }

  return (
    <div>
      <PageHeader title="Submit Quotation" backHref={`/rfqs/${id}`} subtitle={rfq.title} />
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Quotation Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Price (₹)" required>
                  <Input type="number" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} disabled={isLoading} />
                </FormField>
                <FormField label="Delivery Days" required>
                  <Input type="number" placeholder="0" value={form.delivery_days} onChange={(e) => setForm({ ...form, delivery_days: e.target.value })} disabled={isLoading} />
                </FormField>
              </div>
              <FormField label="Notes">
                <Textarea placeholder="Any additional notes..." rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} disabled={isLoading} />
              </FormField>
            </FormSection>
            <FormActions>
              <Button variant="secondary" type="button" onClick={() => router.push(`/rfqs/${id}`)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Quotation"}
              </Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
