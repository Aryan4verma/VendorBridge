import { createClient } from "@/services/supabase/client";
import type { Invoice, InvoiceStatus } from "@/types/database";

const supabase = createClient();

export interface InvoiceFilters {
  status?: InvoiceStatus;
  po_id?: string;
}

export const invoiceService = {
  async getAll(filters?: InvoiceFilters): Promise<Invoice[]> {
    let query = supabase.from("invoices").select("*").order("generated_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.po_id) query = query.eq("po_id", filters.po_id);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<Invoice | null> {
    const { data, error } = await supabase.from("invoices").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(invoice: Omit<Invoice, "id" | "generated_at">): Promise<Invoice> {
    const { data, error } = await supabase.from("invoices").insert(invoice).select().single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
    const { data, error } = await supabase.from("invoices").update({ status }).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async getStats() {
    const { data, error } = await supabase.from("invoices").select("id, status, total");
    if (error) throw error;

    const total = data?.length ?? 0;
    const draft = data?.filter((i) => i.status === "draft").length ?? 0;
    const generated = data?.filter((i) => i.status === "generated").length ?? 0;
    const sent = data?.filter((i) => i.status === "sent").length ?? 0;
    const paid = data?.filter((i) => i.status === "paid").length ?? 0;
    const totalAmount = data?.reduce((sum, i) => sum + (i.total ?? 0), 0) ?? 0;

    return { total, draft, generated, sent, paid, totalAmount };
  },
};
