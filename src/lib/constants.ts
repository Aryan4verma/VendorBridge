export const APP_NAME = "VendorBridge";
export const APP_DESCRIPTION = "AI-Powered Procurement & Vendor Management ERP";

export const ROLES = {
  ADMIN: "admin",
  PROCUREMENT: "procurement",
  MANAGER: "manager",
  VENDOR: "vendor",
} as const;

export const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  procurement: "Procurement Officer",
  manager: "Manager",
  vendor: "Vendor",
};

export const VENDOR_STATUSES = ["active", "inactive", "blacklisted"] as const;
export const RFQ_STATUSES = ["draft", "open", "closed", "awarded"] as const;
export const QUOTATION_STATUSES = ["submitted", "shortlisted", "selected", "rejected"] as const;
export const APPROVAL_STATUSES = ["pending", "approved", "rejected"] as const;
export const PO_STATUSES = ["generated", "sent", "completed"] as const;
export const INVOICE_STATUSES = ["draft", "generated", "sent", "paid"] as const;

export const VENDOR_CATEGORIES = [
  "IT Hardware",
  "Software",
  "Office Supplies",
  "Furniture",
  "Services",
  "Raw Materials",
  "Logistics",
  "Other",
] as const;

export const PAGE_SIZE = 10;

export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  VENDORS: "/vendors",
  VENDOR_NEW: "/vendors/new",
  RFQS: "/rfqs",
  RFQ_NEW: "/rfqs/new",
  RFQ_AI: "/rfqs/new/ai",
  QUOTATIONS: "/quotations",
  APPROVALS: "/approvals",
  PURCHASE_ORDERS: "/purchase-orders",
  INVOICES: "/invoices",
  ANALYTICS: "/analytics",
  ACTIVITY_LOGS: "/activity-logs",
  ADMIN_USERS: "/admin/users",
  ADMIN_VENDORS: "/admin/vendors",
  VENDOR_RFQS: "/vendor/rfqs",
} as const;
