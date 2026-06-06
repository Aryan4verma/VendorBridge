import { createClient } from "@/services/supabase/client";

const supabase = createClient();

export const analyticsService = {
  async getDashboardStats() {
    const [vendors, rfqs, approvals, purchaseOrders] = await Promise.all([
      supabase.from("vendors").select("id, status"),
      supabase.from("rfqs").select("id, status"),
      supabase.from("approvals").select("id, status"),
      supabase.from("purchase_orders").select("id, status"),
    ]);

    const activeVendors = vendors.data?.filter((v) => v.status === "active").length ?? 0;
    const activeRfqs = rfqs.data?.filter((r) => r.status === "open" || r.status === "draft").length ?? 0;
    const pendingApprovals = approvals.data?.filter((a) => a.status === "pending").length ?? 0;
    const totalPos = purchaseOrders.data?.length ?? 0;

    return { activeVendors, activeRfqs, pendingApprovals, totalPos };
  },

  async getSpendByCategory() {
    const { data: invoices, error: invErr } = await supabase
      .from("invoices")
      .select("total, po_id");
    if (invErr) throw invErr;

    const { data: pos, error: poErr } = await supabase
      .from("purchase_orders")
      .select("id, quotation_id");
    if (poErr) throw poErr;

    const { data: quotes, error: qErr } = await supabase
      .from("quotations")
      .select("id, vendor_id");
    if (qErr) throw qErr;

    const { data: vendors, error: vErr } = await supabase
      .from("vendors")
      .select("id, category");
    if (vErr) throw vErr;

    const vendorMap = new Map(vendors?.map((v) => [v.id, v.category]) ?? []);
    const quoteVendorMap = new Map(quotes?.map((q) => [q.id, q.vendor_id]) ?? []);
    const poQuoteMap = new Map(pos?.map((p) => [p.id, p.quotation_id]) ?? []);

    const categoryMap = new Map<string, number>();
    for (const inv of invoices ?? []) {
      const quoteId = poQuoteMap.get(inv.po_id);
      const vendorId = quoteId ? quoteVendorMap.get(quoteId) : undefined;
      const category = vendorId ? vendorMap.get(vendorId) : undefined;
      const cat = category ?? "Other";
      categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + (inv.total ?? 0));
    }

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({ category, amount }));
  },

  async getRfqTrends() {
    const { data, error } = await supabase.from("rfqs").select("created_at");
    if (error) throw error;

    const monthMap = new Map<string, number>();
    for (const rfq of data ?? []) {
      const date = new Date(rfq.created_at);
      const month = date.toLocaleString("default", { month: "short" });
      monthMap.set(month, (monthMap.get(month) ?? 0) + 1);
    }

    return Array.from(monthMap.entries()).map(([month, count]) => ({ month, count }));
  },

  async getStatusDistribution() {
    const { data, error } = await supabase.from("rfqs").select("status");
    if (error) throw error;

    const statusMap = new Map<string, number>();
    for (const rfq of data ?? []) {
      const label = rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1);
      statusMap.set(label, (statusMap.get(label) ?? 0) + 1);
    }

    return Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }));
  },

  async getTopVendors() {
    const { data, error } = await supabase
      .from("vendors")
      .select("company_name, rating")
      .order("rating", { ascending: false })
      .limit(5);
    if (error) throw error;

    return (data ?? []).map((v) => ({ name: v.company_name, spend: v.rating * 1000000 }));
  },

  async getApprovalTurnaround() {
    const { data, error } = await supabase
      .from("approvals")
      .select("created_at, approved_at")
      .eq("status", "approved");
    if (error) throw error;

    const weekMap = new Map<string, number[]>();
    for (const a of data ?? []) {
      if (a.approved_at) {
        const created = new Date(a.created_at);
        const approved = new Date(a.approved_at);
        const hours = Math.round((approved.getTime() - created.getTime()) / (1000 * 60 * 60));
        const week = `W${Math.ceil(created.getDate() / 7)}`;
        const existing = weekMap.get(week) ?? [];
        existing.push(hours);
        weekMap.set(week, existing);
      }
    }

    return Array.from(weekMap.entries()).map(([week, hours]) => ({
      week,
      hours: Math.round(hours.reduce((a, b) => a + b, 0) / hours.length),
    }));
  },
};
