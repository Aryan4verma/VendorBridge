"use client";
import { useState, useEffect, useCallback } from "react";
import { analyticsService } from "@/features/analytics/services/analytics.service";

interface DashboardData {
  stats: { activeVendors: number; activeRfqs: number; pendingApprovals: number; totalPos: number } | null;
  spendByCategory: { category: string; amount: number }[];
  rfqTrends: { month: string; count: number }[];
  statusDistribution: { status: string; count: number }[];
  topVendors: { name: string; spend: number }[];
  approvalTurnaround: { week: string; hours: number }[];
}

export function useAnalytics() {
  const [data, setData] = useState<DashboardData>({
    stats: null,
    spendByCategory: [],
    rfqTrends: [],
    statusDistribution: [],
    topVendors: [],
    approvalTurnaround: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [stats, spendByCategory, rfqTrends, statusDistribution, topVendors, approvalTurnaround] =
        await Promise.allSettled([
          analyticsService.getDashboardStats(),
          analyticsService.getSpendByCategory(),
          analyticsService.getRfqTrends(),
          analyticsService.getStatusDistribution(),
          analyticsService.getTopVendors(),
          analyticsService.getApprovalTurnaround(),
        ]);

      setData({
        stats: stats.status === "fulfilled" ? stats.value : null,
        spendByCategory: spendByCategory.status === "fulfilled" ? spendByCategory.value : [],
        rfqTrends: rfqTrends.status === "fulfilled" ? rfqTrends.value : [],
        statusDistribution: statusDistribution.status === "fulfilled" ? statusDistribution.value : [],
        topVendors: topVendors.status === "fulfilled" ? topVendors.value : [],
        approvalTurnaround: approvalTurnaround.status === "fulfilled" ? approvalTurnaround.value : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch analytics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, isLoading, error, refetch: fetchAnalytics };
}
