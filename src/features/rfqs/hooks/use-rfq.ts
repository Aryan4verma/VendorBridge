"use client";
import { useState, useEffect, useCallback } from "react";
import { rfqService } from "@/features/rfqs/services/rfq.service";
import type { Rfq } from "@/types/database";

export function useRfq(id: string | null) {
  const [rfq, setRfq] = useState<Rfq | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRfq = useCallback(async () => {
    if (!id) {
      setRfq(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const data = await rfqService.getById(id);
      setRfq(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch RFQ");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRfq();
  }, [fetchRfq]);

  return { rfq, isLoading, error, refetch: fetchRfq };
}
