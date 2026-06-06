export type UserRole = "admin" | "procurement" | "manager" | "vendor";

export type VendorStatus = "active" | "inactive" | "blacklisted";

export type RfqStatus = "draft" | "open" | "closed" | "awarded";

export type QuotationStatus = "submitted" | "shortlisted" | "selected" | "rejected";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type PoStatus = "generated" | "sent" | "completed";

export type InvoiceStatus = "draft" | "generated" | "sent" | "paid";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  company_name: string;
  vendor_code: string;
  gst_number: string | null;
  category: string;
  contact_person: string;
  email: string;
  phone: string | null;
  address: string | null;
  rating: number;
  status: VendorStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Rfq {
  id: string;
  title: string;
  description: string | null;
  quantity: number;
  deadline: string;
  status: RfqStatus;
  attachment_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface RfqVendor {
  id: string;
  rfq_id: string;
  vendor_id: string;
  invited_at: string;
}

export interface Quotation {
  id: string;
  rfq_id: string;
  vendor_id: string;
  price: number;
  delivery_days: number;
  notes: string | null;
  status: QuotationStatus;
  submitted_at: string;
  updated_at: string;
}

export interface Approval {
  id: string;
  quotation_id: string;
  approver_id: string | null;
  status: ApprovalStatus;
  remarks: string | null;
  approved_at: string | null;
  created_at: string;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  quotation_id: string;
  status: PoStatus;
  pdf_url: string | null;
  generated_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  po_id: string;
  subtotal: number | null;
  tax: number | null;
  total: number | null;
  status: InvoiceStatus;
  pdf_url: string | null;
  generated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AiRecommendation {
  id: string;
  rfq_id: string;
  recommended_vendor_id: string;
  confidence_score: number;
  reasoning: string | null;
  created_at: string;
}
