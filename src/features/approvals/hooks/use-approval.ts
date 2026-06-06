"use client";
import { useState, useEffect, useCallback } from "react";
import { approvalService, type ApprovalWithDetails } from "@/features/approvals/services/approval.service";

export function useApproval(id?: string) {
  const [approval, setApproval] = useState<ApprovalWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApproval = useCallback(async () => {
    if (!id) {
      setApproval(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const data = await approvalService.getById(id);
      setApproval(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch approval");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchApproval();
  }, [fetchApproval]);

  return { approval, isLoading, error, refetch: fetchApproval };
}
