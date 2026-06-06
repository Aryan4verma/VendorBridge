"use client";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { FileUpload } from "@/components/forms/file-upload/file-upload";
import { mockRfqs } from "@/lib/mock-data";

export default function SubmitQuotationPage() {
  const rfq = mockRfqs[0];
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
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Price (₹)" required><Input type="number" placeholder="0" /></FormField>
              <FormField label="Delivery Days" required><Input type="number" placeholder="0" /></FormField>
            </div>
            <FormField label="Notes"><Textarea placeholder="Additional notes..." rows={3} /></FormField>
            <FormField label="Attachments"><FileUpload /></FormField>
            <FormActions>
              <Button variant="secondary" type="button">Cancel</Button>
              <Button type="submit">Submit Quotation</Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
