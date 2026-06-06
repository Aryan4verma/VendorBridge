import { createClient } from "@/services/supabase/client";
import type { ActivityLog } from "@/types/database";

const supabase = createClient();

export const activityLogService = {
  async getAll(limit = 50): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  },

  async getByEntity(entityType: string, entityId: string): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("entity_type", entityType)
      .eq("entity_id", entityId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async getByUser(userId: string): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async log(action: string, entityType: string, entityId?: string, metadata?: Record<string, unknown>, userId?: string): Promise<void> {
    const { error } = await supabase.from("activity_logs").insert({
      action,
      entity_type: entityType,
      entity_id: entityId ?? null,
      metadata: metadata ?? null,
      user_id: userId ?? null,
    });
    if (error) throw error;
  },
};
