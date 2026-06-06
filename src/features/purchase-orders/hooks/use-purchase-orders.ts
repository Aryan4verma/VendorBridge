"use client";
import { useState, useEffect, useCallback } from "react";
import { purchaseOrderService, type PoWithDetails, type PoFilters } from "@/features/purchase-orders/services/purchase-order.service";

export function usePurchaseOrders(filters?: PoFilters) {
  const [purchaseOrders, setPurchaseOrders] = useState<PoWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filtersKey = JSON.stringify(filters);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parsed = filtersKey ? (JSON.parse(filtersKey) as PoFilters) : undefined;
      const data = await purchaseOrderService.getAll(parsed);
      setPurchaseOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch purchase orders");
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { purchaseOrders, isLoading, error, refetch: fetchData };
}

export function usePurchaseOrder(id?: string) {
  const [purchaseOrder, setPurchaseOrder] = useState<PoWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) { setPurchaseOrder(null); setIsLoading(false); return; }
    try {
      setIsLoading(true);
      setError(null);
      const data = await purchaseOrderService.getById(id);
      setPurchaseOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch purchase order");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { purchaseOrder, isLoading, error, refetch: fetchData };
}
