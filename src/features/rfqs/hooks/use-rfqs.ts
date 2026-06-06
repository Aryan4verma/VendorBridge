"use client";
import { useState, useEffect, useCallback } from "react";
import { rfqService, type RfqFilters } from "@/features/rfqs/services/rfq.service";
import type { Rfq } from "@/types/database";

export function useRfqs(filters?: RfqFilters) {
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = JSON.stringify(filters);

  const fetchRfqs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parsed = filtersKey ? (JSON.parse(filtersKey) as RfqFilters) : undefined;
      const data = await rfqService.getAll(parsed);
      setRfqs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch RFQs");
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchRfqs();
  }, [fetchRfqs]);

  return { rfqs, isLoading, error, refetch: fetchRfqs };
}
