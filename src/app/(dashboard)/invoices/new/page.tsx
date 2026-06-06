"use client";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Select } from "@/components/primitives/select/select";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormActions } from "@/components/forms/form-actions/form-actions";

export default function GenerateInvoicePage() {
  return (
    <div>
      <PageHeader title="Generate Invoice" backHref="/invoices" />
      <Card>
        <CardBody>
          <form className="space-y-4">
            <FormField label="Purchase Order" required>
              <Select><option value="">Select PO</option><option>PO-2505-0001</option></Select>
            </FormField>
            <FormField label="Tax Rate (%)">
              <Input type="number" defaultValue="18" />
            </FormField>
            <FormActions>
              <Button variant="secondary" type="button">Cancel</Button>
              <Button type="submit">Generate Invoice</Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
