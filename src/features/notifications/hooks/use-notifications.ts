"use client";
import { useState, useEffect, useCallback } from "react";
import { notificationService } from "@/features/notifications/services/notification.service";
import type { Notification } from "@/types/database";

export function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const [data, count] = await Promise.all([
        notificationService.getAll(userId),
        notificationService.getUnreadCount(userId),
      ]);
      setNotifications(data);
      setUnreadCount(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notifications");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setUnreadCount((c) => Math.max(0, c - 1));
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const markAllAsRead = async () => {
    if (!userId) return;
    await notificationService.markAllAsRead(userId);
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return { notifications, unreadCount, isLoading, error, refetch: fetchNotifications, markAsRead, markAllAsRead };
}
