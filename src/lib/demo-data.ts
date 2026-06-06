import type { DashboardStats } from "@/features/dashboard/services/dashboard.service";

export const demoStats: DashboardStats = {
  totalVendors: 25,
  activeVendors: 22,
  totalRfqs: 15,
  openRfqs: 8,
  pendingApprovals: 3,
  totalQuotations: 40,
  totalSpend: 19476400,
};

export interface ActivityLogDemo {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  created_at: string;
}

export const demoActivityLogs: ActivityLogDemo[] = [
  { id: "d1", action: "rfq_published", entity_type: "rfq", entity_id: "c0000000", created_at: "2025-03-20T10:00:00Z" },
  { id: "d2", action: "quotation_submitted", entity_type: "quotation", entity_id: "d0000000", created_at: "2025-03-19T14:30:00Z" },
  { id: "d3", action: "approval_completed", entity_type: "approval", entity_id: "e0000000", created_at: "2025-03-18T16:00:00Z" },
  { id: "d4", action: "po_generated", entity_type: "purchase_order", entity_id: "f0000000", created_at: "2025-03-17T10:00:00Z" },
  { id: "d5", action: "vendor_added", entity_type: "vendor", entity_id: "b0000000", created_at: "2025-03-16T09:00:00Z" },
  { id: "d6", action: "invoice_generated", entity_type: "invoice", entity_id: "aa000000", created_at: "2025-03-15T11:00:00Z" },
  { id: "d7", action: "rfq_created", entity_type: "rfq", entity_id: "c0000001", created_at: "2025-03-14T10:00:00Z" },
  { id: "d8", action: "quotation_submitted", entity_type: "quotation", entity_id: "d0000001", created_at: "2025-03-13T15:00:00Z" },
];

export interface ChartData {
  month: string;
  count: number;
  [key: string]: unknown;
}

export const demoRfqTrends: ChartData[] = [
  { month: "Jan", count: 3 },
  { month: "Feb", count: 5 },
  { month: "Mar", count: 4 },
  { month: "Apr", count: 7 },
  { month: "May", count: 6 },
  { month: "Jun", count: 8 },
];

export interface StatusDist {
  status: string;
  count: number;
}

export const demoStatusDistribution: StatusDist[] = [
  { status: "Draft", count: 4 },
  { status: "Open", count: 8 },
  { status: "Closed", count: 2 },
  { status: "Awarded", count: 1 },
];

export interface SpendData {
  category: string;
  amount: number;
  [key: string]: unknown;
}

export const demoSpendByCategory: SpendData[] = [
  { category: "IT Hardware", amount: 16700000 },
  { category: "Cloud Services", amount: 4500000 },
  { category: "Cybersecurity", amount: 3150000 },
  { category: "Office Supplies", amount: 555000 },
  { category: "Networking", amount: 1800000 },
  { category: "Furniture", amount: 375000 },
];

export interface TopVendor {
  name: string;
  spend: number;
  [key: string]: unknown;
}

export const demoTopVendors: TopVendor[] = [
  { name: "TechSource Solutions", spend: 8500000 },
  { name: "CloudFirst Technologies", spend: 4800000 },
  { name: "SecureNet India", spend: 2400000 },
  { name: "NetWave Systems", spend: 1800000 },
  { name: "Global Office Systems", spend: 600000 },
];

export interface ApprovalTime {
  week: string;
  hours: number;
  [key: string]: unknown;
}

export const demoApprovalTurnaround: ApprovalTime[] = [
  { week: "W1", hours: 24 },
  { week: "W2", hours: 18 },
  { week: "W3", hours: 12 },
  { week: "W4", hours: 8 },
  { week: "W5", hours: 10 },
  { week: "W6", hours: 6 },
];
