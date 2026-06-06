import { createClient } from "@/services/supabase/client";
import type { Quotation, QuotationStatus } from "@/types/database";

const supabase = createClient();

export interface QuotationFilters {
  rfq_id?: string;
  vendor_id?: string;
  status?: QuotationStatus;
}

export const quotationService = {
  async getAll(filters?: QuotationFilters): Promise<Quotation[]> {
    let query = supabase.from("quotations").select("*").order("submitted_at", { ascending: false });

    if (filters?.rfq_id) query = query.eq("rfq_id", filters.rfq_id);
    if (filters?.vendor_id) query = query.eq("vendor_id", filters.vendor_id);
    if (filters?.status) query = query.eq("status", filters.status);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<Quotation | null> {
    const { data, error } = await supabase.from("quotations").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(quotation: Omit<Quotation, "id" | "submitted_at" | "updated_at">): Promise<Quotation> {
    const { data, error } = await supabase.from("quotations").insert(quotation).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Quotation>): Promise<Quotation> {
    const { data, error } = await supabase.from("quotations").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("quotations").delete().eq("id", id);
    if (error) throw error;
  },

  async getByRfq(rfqId: string): Promise<Quotation[]> {
    const { data, error } = await supabase
      .from("quotations")
      .select("*, vendors!inner(company_name, vendor_code)")
      .eq("rfq_id", rfqId)
      .order("price", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
};
