"use client";
import { useState, useEffect, useCallback } from "react";
import { quotationService, type QuotationFilters } from "@/features/quotations/services/quotation.service";
import type { Quotation } from "@/types/database";

export function useQuotations(filters?: QuotationFilters) {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = JSON.stringify(filters);

  const fetchQuotations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parsed = filtersKey ? (JSON.parse(filtersKey) as QuotationFilters) : undefined;
      const data = await quotationService.getAll(parsed);
      setQuotations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch quotations");
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  return { quotations, isLoading, error, refetch: fetchQuotations };
}
