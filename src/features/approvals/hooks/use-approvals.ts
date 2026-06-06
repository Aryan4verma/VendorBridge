"use client";
import { useState, useEffect, useCallback } from "react";
import { approvalService, type ApprovalWithDetails, type ApprovalFilters } from "@/features/approvals/services/approval.service";
import type { ApprovalStatus } from "@/types/database";

export function useApprovals(filters?: ApprovalFilters) {
  const [approvals, setApprovals] = useState<ApprovalWithDetails[]>([]);
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

  const updateStatus = useCallback(
    async (id: string, status: ApprovalStatus, remarks: string, approverId: string) => {
      await approvalService.updateStatus(id, status, remarks, approverId);
      await fetchApprovals();
    },
    [fetchApprovals],
  );

  const approve = useCallback(
    async (id: string, remarks: string, approverId: string) => {
      await approvalService.approve(id, remarks, approverId);
      await fetchApprovals();
    },
    [fetchApprovals],
  );

  const reject = useCallback(
    async (id: string, remarks: string, approverId: string) => {
      await approvalService.reject(id, remarks, approverId);
      await fetchApprovals();
    },
    [fetchApprovals],
  );

  return { approvals, isLoading, error, refetch: fetchApprovals, updateStatus, approve, reject };
}
