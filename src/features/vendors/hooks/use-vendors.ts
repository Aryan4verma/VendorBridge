"use client";
import { useState, useEffect, useCallback } from "react";
import { vendorService, type VendorFilters } from "@/features/vendors/services/vendor.service";
import type { Vendor } from "@/types/database";

export function useVendors(filters?: VendorFilters) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = JSON.stringify(filters);

  const fetchVendors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parsed = filtersKey ? (JSON.parse(filtersKey) as VendorFilters) : undefined;
      const data = await vendorService.getAll(parsed);
      setVendors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vendors");
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  return { vendors, isLoading, error, refetch: fetchVendors };
}
