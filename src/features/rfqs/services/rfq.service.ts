import { createClient } from "@/services/supabase/client";
import type { Rfq, RfqStatus } from "@/types/database";

const supabase = createClient();

export interface RfqFilters {
  status?: RfqStatus;
  search?: string;
}

export const rfqService = {
  async getAll(filters?: RfqFilters): Promise<Rfq[]> {
    let query = supabase.from("rfqs").select("*").order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<Rfq | null> {
    const { data, error } = await supabase.from("rfqs").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(rfq: Omit<Rfq, "id" | "created_at" | "updated_at">): Promise<Rfq> {
    const { data, error } = await supabase.from("rfqs").insert(rfq).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Rfq>): Promise<Rfq> {
    const { data, error } = await supabase.from("rfqs").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("rfqs").delete().eq("id", id);
    if (error) throw error;
  },

  async getStats() {
    const { data, error } = await supabase.from("rfqs").select("id, status");
    if (error) throw error;

    const total = data?.length ?? 0;
    const draft = data?.filter((r) => r.status === "draft").length ?? 0;
    const open = data?.filter((r) => r.status === "open").length ?? 0;
    const closed = data?.filter((r) => r.status === "closed").length ?? 0;
    const awarded = data?.filter((r) => r.status === "awarded").length ?? 0;

    return { total, draft, open, closed, awarded };
  },
};
