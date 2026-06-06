"use client";
import { useState } from "react";
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
import { vendorService } from "@/features/vendors/services/vendor.service";

export default function CreateVendorPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    category: "",
    gst_number: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name || !form.contact_person || !form.email || !form.category) {
      toast("Please fill in all required fields", "error");
      return;
    }
    setIsLoading(true);
    try {
      await vendorService.create({
        ...form,
        vendor_code: `VN-${Date.now().toString().slice(-4)}`,
        status: "active",
        rating: 5,
        created_by: null,
      });
      toast("Vendor created successfully", "success");
      router.push("/vendors");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to create vendor", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add Vendor" backHref="/vendors" />
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Company Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Company Name" required>
                  <Input placeholder="Company name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} disabled={isLoading} />
                </FormField>
                <FormField label="Category" required>
                  <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} disabled={isLoading}>
                    <option value="">Select category</option>
                    <option value="IT Hardware">IT Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Services">Services</option>
                  </Select>
                </FormField>
                <FormField label="GST Number">
                  <Input placeholder="27AABCT1234F1Z5" value={form.gst_number} onChange={(e) => setForm({ ...form, gst_number: e.target.value })} disabled={isLoading} />
                </FormField>
              </div>
            </FormSection>
            <FormSection title="Contact Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Contact Person" required>
                  <Input placeholder="Full name" value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} disabled={isLoading} />
                </FormField>
                <FormField label="Email" required>
                  <Input type="email" placeholder="email@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isLoading} />
                </FormField>
                <FormField label="Phone">
                  <Input placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={isLoading} />
                </FormField>
              </div>
            </FormSection>
            <FormSection title="Address">
              <FormField label="Address">
                <Textarea placeholder="Full address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} disabled={isLoading} />
              </FormField>
            </FormSection>
            <FormActions>
              <Button variant="secondary" type="button" onClick={() => router.push("/vendors")} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Vendor"}
              </Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
