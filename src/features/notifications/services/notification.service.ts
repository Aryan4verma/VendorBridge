import { createClient } from "@/services/supabase/client";
import type { Notification } from "@/types/database";

const supabase = createClient();

export const notificationService = {
  async getAll(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async getUnread(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .eq("is_read", false)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    if (error) throw error;
  },

  async markAllAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);
    if (error) throw error;
  },

  async create(userId: string, title: string, message: string): Promise<void> {
    const { error } = await supabase.from("notifications").insert({ user_id: userId, title, message });
    if (error) throw error;
  },

  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_read", false);
    if (error) throw error;
    return count ?? 0;
  },
};
