import { createClient } from "@/services/supabase/client";
import { demoStats } from "@/lib/demo-data";

const supabase = createClient();

export interface DashboardStats {
  totalVendors: number;
  activeVendors: number;
  totalRfqs: number;
  openRfqs: number;
  pendingApprovals: number;
  totalQuotations: number;
  totalSpend: number;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const [vendors, rfqs, approvals, quotations, purchaseOrders] = await Promise.all([
      supabase.from("vendors").select("id, status"),
      supabase.from("rfqs").select("id, status"),
      supabase.from("approvals").select("id, status"),
      supabase.from("quotations").select("id, price"),
      supabase.from("purchase_orders").select("id, quotation_id, quotations(price)"),
    ]);

    const vendorData = vendors.data ?? [];
    const rfqData = rfqs.data ?? [];
    const approvalData = approvals.data ?? [];
    const quotationData = quotations.data ?? [];
    const poData = purchaseOrders.data ?? [];

    const totalSpend = poData.reduce((sum, po) => {
      const price = (po as Record<string, unknown>).quotations;
      if (price && typeof price === "object" && "price" in price) {
        return sum + ((price as { price: number }).price || 0);
      }
      return sum;
    }, 0);

    const stats: DashboardStats = {
      totalVendors: vendorData.length,
      activeVendors: vendorData.filter((v) => v.status === "active").length,
      totalRfqs: rfqData.length,
      openRfqs: rfqData.filter((r) => r.status === "open").length,
      pendingApprovals: approvalData.filter((a) => a.status === "pending").length,
      totalQuotations: quotationData.length,
      totalSpend,
    };

    const hasData = vendorData.length > 0 || rfqData.length > 0;
    if (!hasData) return demoStats;
    return stats;
  },
};
