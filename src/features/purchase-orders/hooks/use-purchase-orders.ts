"use client";
import { useState, useEffect, useCallback } from "react";
import { poService, type PoFilters } from "@/features/purchase-orders/services/po.service";
import type { PurchaseOrder } from "@/types/database";

export function usePurchaseOrders(filters?: PoFilters) {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = JSON.stringify(filters);

  const fetchPurchaseOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parsed = filtersKey ? (JSON.parse(filtersKey) as PoFilters) : undefined;
      const data = await poService.getAll(parsed);
      setPurchaseOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch purchase orders");
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchPurchaseOrders();
  }, [fetchPurchaseOrders]);

  return { purchaseOrders, isLoading, error, refetch: fetchPurchaseOrders };
}
