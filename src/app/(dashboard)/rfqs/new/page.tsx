"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { DatePicker } from "@/components/primitives/date-picker/date-picker";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormSection } from "@/components/forms/form-section/form-section";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { useToast } from "@/providers/toast-provider";
import { rfqService } from "@/features/rfqs/services/rfq.service";

export default function CreateRfqPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    quantity: "",
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.quantity || !form.deadline) {
      toast("Please fill in all required fields", "error");
      return;
    }
    setIsLoading(true);
    try {
      await rfqService.create({
        title: form.title,
        description: form.description,
        quantity: Number(form.quantity),
        deadline: form.deadline,
        status: "draft",
        attachment_url: null,
        created_by: null,
      });
      toast("RFQ created successfully", "success");
      router.push("/rfqs");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to create RFQ", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Create RFQ" backHref="/rfqs" />
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="RFQ Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Title" required>
                  <Input placeholder="RFQ title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} disabled={isLoading} />
                </FormField>
                <FormField label="Quantity" required>
                  <Input type="number" placeholder="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} disabled={isLoading} />
                </FormField>
                <FormField label="Deadline" required>
                  <DatePicker value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} disabled={isLoading} />
                </FormField>
              </div>
              <FormField label="Description" required>
                <Textarea placeholder="Describe your requirement..." rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={isLoading} />
              </FormField>
            </FormSection>
            <FormActions>
              <Button variant="secondary" type="button" onClick={() => router.push("/rfqs")} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create RFQ"}
              </Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
