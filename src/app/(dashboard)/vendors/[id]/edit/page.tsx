"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Textarea } from "@/components/primitives/textarea/textarea";
import { Select } from "@/components/primitives/select/select";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { Card, CardBody } from "@/components/cards/card/card";
import { FormField } from "@/components/forms/form-field/form-field";
import { FormSection } from "@/components/forms/form-section/form-section";
import { FormActions } from "@/components/forms/form-actions/form-actions";
import { useToast } from "@/providers/toast-provider";
import { useVendor } from "@/features/vendors/hooks/use-vendor";
import { vendorService } from "@/features/vendors/services/vendor.service";

export default function EditVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { vendor, isLoading: isLoadingVendor } = useVendor(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    category: "",
    gst_number: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (vendor) {
      setForm({
        company_name: vendor.company_name,
        contact_person: vendor.contact_person,
        email: vendor.email,
        category: vendor.category,
        gst_number: vendor.gst_number || "",
        phone: vendor.phone || "",
        address: vendor.address || "",
      });
    }
  }, [vendor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name || !form.contact_person || !form.email || !form.category) {
      toast("Please fill in all required fields", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      await vendorService.update(id, form);
      toast("Vendor updated successfully", "success");
      router.push(`/vendors/${id}`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to update vendor", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingVendor) {
    return <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading...</div>;
  }

  if (!vendor) {
    return <div className="p-8 text-center text-[var(--color-error)]">Vendor not found</div>;
  }

  return (
    <div>
      <PageHeader title="Edit Vendor" backHref={`/vendors/${id}`} />
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Company Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Company Name" required>
                  <Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} disabled={isSubmitting} />
                </FormField>
                <FormField label="Category" required>
                  <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} disabled={isSubmitting}>
                    <option value="">Select category</option>
                    <option value="IT Hardware">IT Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Services">Services</option>
                  </Select>
                </FormField>
                <FormField label="GST Number">
                  <Input value={form.gst_number} onChange={(e) => setForm({ ...form, gst_number: e.target.value })} disabled={isSubmitting} />
                </FormField>
              </div>
            </FormSection>
            <FormSection title="Contact Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Contact Person" required>
                  <Input value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} disabled={isSubmitting} />
                </FormField>
                <FormField label="Email" required>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isSubmitting} />
                </FormField>
                <FormField label="Phone">
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={isSubmitting} />
                </FormField>
              </div>
            </FormSection>
            <FormSection title="Address">
              <FormField label="Address">
                <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} disabled={isSubmitting} />
              </FormField>
            </FormSection>
            <FormActions>
              <Button variant="secondary" type="button" onClick={() => router.push(`/vendors/${id}`)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
