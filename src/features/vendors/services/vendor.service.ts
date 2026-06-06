import { createClient } from "@/services/supabase/client";
import type { Vendor, VendorStatus } from "@/types/database";

const supabase = createClient();

export interface VendorFilters {
  status?: VendorStatus;
  category?: string;
  search?: string;
}

export const vendorService = {
  async getAll(filters?: VendorFilters): Promise<Vendor[]> {
    let query = supabase.from("vendors").select("*").order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.category) query = query.eq("category", filters.category);
    if (filters?.search) {
      query = query.or(`company_name.ilike.%${filters.search}%,vendor_code.ilike.%${filters.search}%,contact_person.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<Vendor | null> {
    const { data, error } = await supabase.from("vendors").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(vendor: Omit<Vendor, "id" | "created_at" | "updated_at">): Promise<Vendor> {
    const { data, error } = await supabase.from("vendors").insert(vendor).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Vendor>): Promise<Vendor> {
    const { data, error } = await supabase.from("vendors").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("vendors").delete().eq("id", id);
    if (error) throw error;
  },

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase.from("vendors").select("category").order("category");
    if (error) throw error;
    const unique = [...new Set((data ?? []).map((r) => r.category))];
    return unique;
  },

  async getStats() {
    const { data: all, error: allErr } = await supabase.from("vendors").select("id, status");
    if (allErr) throw allErr;

    const total = all?.length ?? 0;
    const active = all?.filter((v) => v.status === "active").length ?? 0;
    const inactive = all?.filter((v) => v.status === "inactive").length ?? 0;
    const blacklisted = all?.filter((v) => v.status === "blacklisted").length ?? 0;

    return { total, active, inactive, blacklisted };
  },
};
