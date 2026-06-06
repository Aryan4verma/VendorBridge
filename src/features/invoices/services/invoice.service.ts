import { createClient } from "@/services/supabase/client";
import type { Invoice, InvoiceStatus } from "@/types/database";

const supabase = createClient();

export interface InvoiceWithDetails extends Invoice {
  purchase_orders?: {
    po_number: string;
    quotations?: { vendors?: { company_name: string } };
  } | null;
}

export interface InvoiceFilters {
  status?: InvoiceStatus;
}

export const invoiceService = {
  async getAll(filters?: InvoiceFilters): Promise<InvoiceWithDetails[]> {
    let query = supabase
      .from("invoices")
      .select("*, purchase_orders(po_number, quotations(vendors(company_name)))")
      .order("generated_at", { ascending: false });
    if (filters?.status) query = query.eq("status", filters.status);
    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<InvoiceWithDetails | null> {
    const { data, error } = await supabase
      .from("invoices")
      .select("*, purchase_orders(po_number, quotations(vendors(company_name)))")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(invoice: Omit<Invoice, "id" | "generated_at">): Promise<Invoice> {
    const { data, error } = await supabase.from("invoices").insert(invoice).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Invoice>): Promise<Invoice> {
    const { data, error } = await supabase.from("invoices").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },
};
