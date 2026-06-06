"use client";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { mockQuotations } from "@/lib/mock-data";

export default function EditQuotationPage() {
  const q = mockQuotations[0];
  return (
    <div>
      <PageHeader title="Edit Quotation" backHref="/vendor/rfqs" />
      <Card>
        <CardBody>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Price (₹)" required><Input type="number" defaultValue={q.price} /></FormField>
              <FormField label="Delivery Days" required><Input type="number" defaultValue={q.delivery_days} /></FormField>
            </div>
            <FormField label="Notes"><Textarea defaultValue={q.notes || ""} rows={3} /></FormField>
            <FormActions>
              <Button variant="secondary" type="button">Cancel</Button>
              <Button type="submit">Update Quotation</Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
