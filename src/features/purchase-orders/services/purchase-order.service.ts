import { createClient } from "@/services/supabase/client";
import type { PurchaseOrder, PoStatus } from "@/types/database";

const supabase = createClient();

export interface PoWithDetails extends PurchaseOrder {
  quotations?: {
    vendor_id: number;
    price: number;
    vendors?: { company_name: string };
  } | null;
}

export interface PoFilters {
  status?: PoStatus;
}

export const purchaseOrderService = {
  async getAll(filters?: PoFilters): Promise<PoWithDetails[]> {
    let query = supabase
      .from("purchase_orders")
      .select("*, quotations(vendor_id, price, vendors(company_name))")
      .order("generated_at", { ascending: false });
    if (filters?.status) query = query.eq("status", filters.status);
    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<PoWithDetails | null> {
    const { data, error } = await supabase
      .from("purchase_orders")
      .select("*, quotations(vendor_id, price, vendors(company_name))")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(po: Omit<PurchaseOrder, "id" | "generated_at">): Promise<PurchaseOrder> {
    const { data, error } = await supabase.from("purchase_orders").insert(po).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<PurchaseOrder>): Promise<PurchaseOrder> {
    const { data, error } = await supabase.from("purchase_orders").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },
};
