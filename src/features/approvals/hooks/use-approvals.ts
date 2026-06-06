"use client";
import { useState, useEffect, useCallback } from "react";
import { approvalService, type ApprovalFilters } from "@/features/approvals/services/approval.service";
import type { Approval } from "@/types/database";

export function useApprovals(filters?: ApprovalFilters) {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = JSON.stringify(filters);

  const fetchApprovals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parsed = filtersKey ? (JSON.parse(filtersKey) as ApprovalFilters) : undefined;
      const data = await approvalService.getAll(parsed);
      setApprovals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch approvals");
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  return { approvals, isLoading, error, refetch: fetchApprovals };
}
