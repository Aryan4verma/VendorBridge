"use client";
import { useState, useEffect, useCallback } from "react";
import { invoiceService, type InvoiceWithDetails, type InvoiceFilters } from "@/features/invoices/services/invoice.service";

export function useInvoices(filters?: InvoiceFilters) {
  const [invoices, setInvoices] = useState<InvoiceWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filtersKey = JSON.stringify(filters);

  const fetchData = useCallback(async () => {
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

  useEffect(() => { fetchData(); }, [fetchData]);
  return { invoices, isLoading, error, refetch: fetchData };
}

export function useInvoice(id?: string) {
  const [invoice, setInvoice] = useState<InvoiceWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) { setInvoice(null); setIsLoading(false); return; }
    try {
      setIsLoading(true);
      setError(null);
      const data = await invoiceService.getById(id);
      setInvoice(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch invoice");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { invoice, isLoading, error, refetch: fetchData };
}
