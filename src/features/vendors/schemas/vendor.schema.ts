import { z } from "zod";

export const vendorSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  contact_person: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  category: z.string().min(1, "Category is required"),
  vendor_code: z.string().optional(),
  gst_number: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
