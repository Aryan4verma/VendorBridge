"use client";
import { useState, useEffect, useCallback } from "react";
import { invoiceService, type InvoiceFilters } from "@/features/invoices/services/invoice.service";
import type { Invoice } from "@/types/database";

export function useInvoices(filters?: InvoiceFilters) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = JSON.stringify(filters);

  const fetchInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parsed = filtersKey ? (JSON.parse(filtersKey) as InvoiceFilters) : undefined;
      const data = await invoiceService.getAll(parsed);
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch invoices");
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return { invoices, isLoading, error, refetch: fetchInvoices };
}
