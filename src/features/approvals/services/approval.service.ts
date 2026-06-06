import { createClient } from "@/services/supabase/client";
import type { Approval, ApprovalStatus } from "@/types/database";

const supabase = createClient();

export interface ApprovalWithDetails extends Approval {
  quotations?: {
    rfq_id: string;
    vendor_id: string;
    price: number;
    delivery_days: number;
    notes: string | null;
    rfqs?: { title: string };
    vendors?: { company_name: string };
  } | null;
}

export interface ApprovalFilters {
  status?: ApprovalStatus;
}

export const approvalService = {
  async getAll(filters?: ApprovalFilters): Promise<ApprovalWithDetails[]> {
    let query = supabase
      .from("approvals")
      .select("*, quotations(rfqs(title), vendors(company_name), rfq_id, vendor_id, price, delivery_days, notes)")
      .order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<ApprovalWithDetails | null> {
    const { data, error } = await supabase
      .from("approvals")
      .select("*, quotations(rfqs(title), vendors(company_name), rfq_id, vendor_id, price, delivery_days, notes)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByQuotation(quotationId: string): Promise<Approval | null> {
    const { data, error } = await supabase
      .from("approvals")
      .select("*")
      .eq("quotation_id", quotationId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async create(approval: Omit<Approval, "id" | "created_at">): Promise<Approval> {
    const { data, error } = await supabase.from("approvals").insert(approval).select().single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: ApprovalStatus, remarks: string, approverId: string): Promise<Approval> {
    const updates: Partial<Approval> = {
      status,
      remarks,
      approver_id: approverId,
    };
    if (status === "approved" || status === "rejected") {
      updates.approved_at = new Date().toISOString();
    }

    const { data, error } = await supabase.from("approvals").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async approve(id: string, remarks: string, approverId: string): Promise<Approval> {
    return approvalService.updateStatus(id, "approved", remarks, approverId);
  },

  async reject(id: string, remarks: string, approverId: string): Promise<Approval> {
    return approvalService.updateStatus(id, "rejected", remarks, approverId);
  },

  async getStats() {
    const { data, error } = await supabase.from("approvals").select("id, status");
    if (error) throw error;

    const total = data?.length ?? 0;
    const pending = data?.filter((a) => a.status === "pending").length ?? 0;
    const approved = data?.filter((a) => a.status === "approved").length ?? 0;
    const rejected = data?.filter((a) => a.status === "rejected").length ?? 0;

    return { total, pending, approved, rejected };
  },
};
