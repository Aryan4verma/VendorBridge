"use client";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { DatePicker } from "@/components/primitives/date-picker/date-picker";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormSection } from "@/components/forms/form-section/form-section";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { FileUpload } from "@/components/forms/file-upload/file-upload";
import { MultiSelect } from "@/components/primitives/multi-select/multi-select";

const vendorOptions = [
  { label: "TechNova Solutions", value: "v1" },
  { label: "GlobalTech Industries", value: "v2" },
  { label: "OfficePro Supplies", value: "v3" },
  { label: "DigitalEdge Systems", value: "v4" },
  { label: "CloudFirst Technologies", value: "v5" },
];

export default function CreateRfqPage() {
  return (
    <div>
      <PageHeader title="Create RFQ" backHref="/rfqs" actions={<Link href="/rfqs/new/ai"><Button variant="secondary">AI Generator</Button></Link>} />
      <Card>
        <CardBody>
          <form className="space-y-6">
            <FormSection title="RFQ Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Title" required><Input placeholder="RFQ title" /></FormField>
                <FormField label="Quantity" required><Input type="number" placeholder="0" /></FormField>
                <FormField label="Deadline" required><DatePicker /></FormField>
              </div>
              <FormField label="Description" required><Textarea placeholder="Describe your requirement..." rows={4} /></FormField>
            </FormSection>
            <FormSection title="Attachments"><FileUpload /></FormSection>
            <FormSection title="Assign Vendors"><MultiSelect options={vendorOptions} selected={[]} onChange={() => {}} placeholder="Select vendors..." /></FormSection>
            <FormActions>
              <Button variant="secondary" type="button">Cancel</Button>
              <Button type="submit">Create RFQ</Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}