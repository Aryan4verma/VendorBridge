"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { useToast } from "@/providers/toast-provider";
import { quotationService } from "@/features/quotations/services/quotation.service";

export default function EditQuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState({ price: "", delivery_days: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await quotationService.update(id, { price: Number(form.price), delivery_days: Number(form.delivery_days), notes: form.notes || null });
      toast("Quotation updated", "success");
      router.push("/vendor/rfqs");
    } catch (err) { toast(err instanceof Error ? err.message : "Failed", "error"); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div>
      <PageHeader title="Edit Quotation" backHref="/vendor/rfqs" />
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Price (₹)" required><Input type="number" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} disabled={isSubmitting} /></FormField>
              <FormField label="Delivery Days" required><Input type="number" placeholder="0" value={form.delivery_days} onChange={(e) => setForm({ ...form, delivery_days: e.target.value })} disabled={isSubmitting} /></FormField>
            </div>
            <FormField label="Notes"><Textarea defaultValue="" placeholder="Notes..." rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} disabled={isSubmitting} /></FormField>
            <FormActions>
              <Button variant="secondary" type="button" onClick={() => router.push("/vendor/rfqs")} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update Quotation"}</Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
