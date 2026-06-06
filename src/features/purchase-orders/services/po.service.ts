import { createClient } from "@/services/supabase/client";
import type { PurchaseOrder, PoStatus } from "@/types/database";

const supabase = createClient();

export interface PoFilters {
  status?: PoStatus;
}

export const poService = {
  async getAll(filters?: PoFilters): Promise<PurchaseOrder[]> {
    let query = supabase.from("purchase_orders").select("*").order("generated_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<PurchaseOrder | null> {
    const { data, error } = await supabase.from("purchase_orders").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(po: Omit<PurchaseOrder, "id" | "generated_at">): Promise<PurchaseOrder> {
    const { data, error } = await supabase.from("purchase_orders").insert(po).select().single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: PoStatus): Promise<PurchaseOrder> {
    const { data, error } = await supabase.from("purchase_orders").update({ status }).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async getStats() {
    const { data, error } = await supabase.from("purchase_orders").select("id, status");
    if (error) throw error;

    const total = data?.length ?? 0;
    const generated = data?.filter((po) => po.status === "generated").length ?? 0;
    const sent = data?.filter((po) => po.status === "sent").length ?? 0;
    const completed = data?.filter((po) => po.status === "completed").length ?? 0;

    return { total, generated, sent, completed };
  },
};
