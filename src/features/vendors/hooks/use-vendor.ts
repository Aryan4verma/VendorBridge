"use client";
import { useState, useEffect, useCallback } from "react";
import { vendorService } from "@/features/vendors/services/vendor.service";
import type { Vendor } from "@/types/database";

export function useVendor(id: string | null) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendor = useCallback(async () => {
    if (!id) {
      setVendor(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const data = await vendorService.getById(id);
      setVendor(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vendor");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  return { vendor, isLoading, error, refetch: fetchVendor };
}
