"use client";

import { useCallback, useState } from "react";

export function useFilter(initialFilters: Record<string, unknown> = {}) {
  const [filters, setFilters] = useState<Record<string, unknown>>(initialFilters);

  const setFilter = useCallback((key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const removeFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilters,
  };
}
