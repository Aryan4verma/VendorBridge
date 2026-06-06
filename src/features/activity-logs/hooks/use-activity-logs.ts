"use client";
import { useState, useEffect, useCallback } from "react";
import { activityLogService } from "@/features/activity-logs/services/activity-log.service";
import type { ActivityLog } from "@/types/database";

export function useActivityLogs(limit?: number) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await activityLogService.getAll(limit);
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch activity logs");
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, isLoading, error, refetch: fetchLogs };
}
