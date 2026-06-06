import type { Vendor, Rfq, Quotation, Approval, PurchaseOrder, Invoice, ActivityLog, Profile } from "@/types/database";

export const mockProfile: Profile = {
  id: "1",
  full_name: "Rahul Kumar",
  email: "rahul@vendorbridge.com",
  role: "procurement",
  avatar_url: null,
  is_active: true,
  created_at: "2025-01-15T00:00:00Z",
  updated_at: "2025-01-15T00:00:00Z",
};

export const mockVendors: Vendor[] = [
  { id: "v1", company_name: "TechNova Solutions", vendor_code: "VN-001", gst_number: "27AABCT1234F1Z5", category: "IT Hardware", contact_person: "Priya Sharma", email: "priya@technova.com", phone: "+91 98765 43210", address: "Mumbai, Maharashtra", rating: 4.5, status: "active", created_by: "1", created_at: "2025-01-20T00:00:00Z", updated_at: "2025-01-20T00:00:00Z" },
  { id: "v2", company_name: "GlobalTech Industries", vendor_code: "VN-002", gst_number: "29BBAGT5678G1Z3", category: "Software", contact_person: "Amit Patel", email: "amit@globaltech.com", phone: "+91 87654 32109", address: "Bangalore, Karnataka", rating: 4.2, status: "active", created_by: "1", created_at: "2025-02-05T00:00:00Z", updated_at: "2025-02-05T00:00:00Z" },
  { id: "v3", company_name: "OfficePro Supplies", vendor_code: "VN-003", gst_number: "06CCOPT9012H1Z1", category: "Office Supplies", contact_person: "Neha Gupta", email: "neha@officepro.com", phone: "+91 76543 21098", address: "Delhi, NCR", rating: 3.8, status: "active", created_by: "1", created_at: "2025-02-15T00:00:00Z", updated_at: "2025-02-15T00:00:00Z" },
  { id: "v4", company_name: "DigitalEdge Systems", vendor_code: "VN-004", gst_number: "33DDESY3456I1Z9", category: "IT Hardware", contact_person: "Vikram Singh", email: "vikram@digitaledge.com", phone: "+91 65432 10987", address: "Chennai, Tamil Nadu", rating: 4.0, status: "inactive", created_by: "1", created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: "v5", company_name: "CloudFirst Technologies", vendor_code: "VN-005", gst_number: "09EECFT7890J1Z7", category: "Software", contact_person: "Ananya Reddy", email: "ananya@cloudfirst.com", phone: "+91 54321 09876", address: "Hyderabad, Telangana", rating: 4.7, status: "active", created_by: "1", created_at: "2025-03-10T00:00:00Z", updated_at: "2025-03-10T00:00:00Z" },
];

export const mockRfqs: Rfq[] = [
  { id: "r1", title: "Procurement of 100 Laptops", description: "Need 100 laptops with i7 processor, 16GB RAM, 512GB SSD for engineering team.", quantity: 100, deadline: "2025-06-15", status: "open", attachment_url: null, created_by: "1", created_at: "2025-05-01T00:00:00Z", updated_at: "2025-05-01T00:00:00Z" },
  { id: "r2", title: "Office Furniture - Ergonomic Chairs", description: "Purchase 50 ergonomic office chairs for new office setup.", quantity: 50, deadline: "2025-06-20", status: "open", attachment_url: null, created_by: "1", created_at: "2025-05-05T00:00:00Z", updated_at: "2025-05-05T00:00:00Z" },
  { id: "r3", title: "Cloud Infrastructure Setup", description: "Annual cloud subscription for AWS services.", quantity: 1, deadline: "2025-05-30", status: "awarded", attachment_url: null, created_by: "1", created_at: "2025-04-15T00:00:00Z", updated_at: "2025-04-15T00:00:00Z" },
  { id: "r4", title: "Network Security Appliances", description: "Firewall and security appliances for 3 office locations.", quantity: 3, deadline: "2025-06-25", status: "draft", attachment_url: null, created_by: "1", created_at: "2025-05-10T00:00:00Z", updated_at: "2025-05-10T00:00:00Z" },
];

export const mockQuotations: Quotation[] = [
  { id: "q1", rfq_id: "r1", vendor_id: "v1", price: 8500000, delivery_days: 14, notes: "Includes 3-year warranty and on-site support.", status: "submitted", submitted_at: "2025-05-10T00:00:00Z", updated_at: "2025-05-10T00:00:00Z" },
  { id: "q2", rfq_id: "r1", vendor_id: "v2", price: 7800000, delivery_days: 21, notes: "Standard warranty, extended available.", status: "submitted", submitted_at: "2025-05-11T00:00:00Z", updated_at: "2025-05-11T00:00:00Z" },
  { id: "q3", rfq_id: "r1", vendor_id: "v4", price: 8200000, delivery_days: 10, notes: "Fastest delivery, premium support included.", status: "submitted", submitted_at: "2025-05-12T00:00:00Z", updated_at: "2025-05-12T00:00:00Z" },
  { id: "q4", rfq_id: "r2", vendor_id: "v3", price: 375000, delivery_days: 7, notes: "Ergonomic chairs with 5-year warranty.", status: "submitted", submitted_at: "2025-05-08T00:00:00Z", updated_at: "2025-05-08T00:00:00Z" },
];

export const mockApprovals: Approval[] = [
  { id: "a1", quotation_id: "q1", approver_id: "1", status: "pending", remarks: null, approved_at: null, created_at: "2025-05-13T00:00:00Z" },
  { id: "a2", quotation_id: "q4", approver_id: "1", status: "approved", remarks: "Good pricing, approved.", approved_at: "2025-05-09T00:00:00Z", created_at: "2025-05-08T00:00:00Z" },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: "po1", po_number: "PO-2505-0001", quotation_id: "q4", status: "sent", pdf_url: null, generated_at: "2025-05-09T00:00:00Z" },
];

export const mockInvoices: Invoice[] = [
  { id: "inv1", invoice_number: "INV-2505-0001", po_id: "po1", subtotal: 375000, tax: 67500, total: 442500, status: "generated", pdf_url: null, generated_at: "2025-05-10T00:00:00Z" },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: "al1", user_id: "1", action: "rfq_created", entity_type: "rfq", entity_id: "r1", metadata: { title: "Procurement of 100 Laptops" }, created_at: "2025-05-01T10:30:00Z" },
  { id: "al2", user_id: "1", action: "rfq_created", entity_type: "rfq", entity_id: "r2", metadata: { title: "Office Furniture" }, created_at: "2025-05-05T14:20:00Z" },
  { id: "al3", user_id: "v1", action: "quotation_submitted", entity_type: "quotation", entity_id: "q1", metadata: { rfq_title: "100 Laptops" }, created_at: "2025-05-10T09:15:00Z" },
  { id: "al4", user_id: "v2", action: "quotation_submitted", entity_type: "quotation", entity_id: "q2", metadata: { rfq_title: "100 Laptops" }, created_at: "2025-05-11T11:45:00Z" },
  { id: "al5", user_id: "1", action: "approval_given", entity_type: "approval", entity_id: "a2", metadata: { status: "approved" }, created_at: "2025-05-09T16:00:00Z" },
  { id: "al6", user_id: "1", action: "po_generated", entity_type: "purchase_order", entity_id: "po1", metadata: { po_number: "PO-2505-0001" }, created_at: "2025-05-09T16:30:00Z" },
  { id: "al7", user_id: "1", action: "invoice_generated", entity_type: "invoice", entity_id: "inv1", metadata: { invoice_number: "INV-2505-0001" }, created_at: "2025-05-10T10:00:00Z" },
  { id: "al8", user_id: "1", action: "rfq_created", entity_type: "rfq", entity_id: "r4", metadata: { title: "Network Security" }, created_at: "2025-05-10T13:00:00Z" },
];

export const mockUsers: Profile[] = [
  mockProfile,
  { id: "2", full_name: "Amit Verma", email: "amit@vendorbridge.com", role: "manager", avatar_url: null, is_active: true, created_at: "2025-01-10T00:00:00Z", updated_at: "2025-01-10T00:00:00Z" },
  { id: "3", full_name: "Priya Singh", email: "priya@vendorbridge.com", role: "vendor", avatar_url: null, is_active: true, created_at: "2025-01-20T00:00:00Z", updated_at: "2025-01-20T00:00:00Z" },
  { id: "4", full_name: "Neha Agarwal", email: "neha@vendorbridge.com", role: "admin", avatar_url: null, is_active: true, created_at: "2025-01-05T00:00:00Z", updated_at: "2025-01-05T00:00:00Z" },
];

export function getVendorName(vendorId: string): string {
  return mockVendors.find((v) => v.id === vendorId)?.company_name || "Unknown Vendor";
}

export function getRfqTitle(rfqId: string): string {
  return mockRfqs.find((r) => r.id === rfqId)?.title || "Unknown RFQ";
}

export const mockDashboardStats = { totalSpend: 442500, activeRfqs: 2, pendingApprovals: 1, activeVendors: 4 };

export const mockSpendByCategory = [
  { category: "IT Hardware", amount: 8500000 },
  { category: "Software", amount: 2400000 },
  { category: "Office Supplies", amount: 375000 },
  { category: "Furniture", amount: 500000 },
];

export const mockRfqTrends = [
  { month: "Jan", count: 3 },
  { month: "Feb", count: 5 },
  { month: "Mar", count: 4 },
  { month: "Apr", count: 6 },
  { month: "May", count: 4 },
];

export const mockStatusDistribution = [
  { status: "Draft", count: 1 },
  { status: "Open", count: 2 },
  { status: "Awarded", count: 1 },
];

export const mockApprovalTurnaround = [
  { week: "W1", hours: 24 },
  { week: "W2", hours: 18 },
  { week: "W3", hours: 12 },
  { week: "W4", hours: 8 },
];

export const mockTopVendors = [
  { name: "TechNova Solutions", spend: 8500000 },
  { name: "DigitalEdge Systems", spend: 8200000 },
  { name: "GlobalTech Industries", spend: 7800000 },
  { name: "CloudFirst Technologies", spend: 2400000 },
  { name: "OfficePro Supplies", spend: 375000 },
];
