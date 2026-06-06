"use client";
import { useState, useEffect, useCallback } from "react";
import { quotationService } from "@/features/quotations/services/quotation.service";
import type { Quotation } from "@/types/database";

export function useQuotation(id: string | null) {
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotation = useCallback(async () => {
    if (!id) {
      setQuotation(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const data = await quotationService.getById(id);
      setQuotation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch quotation");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuotation();
  }, [fetchQuotation]);

  return { quotation, isLoading, error, refetch: fetchQuotation };
}
