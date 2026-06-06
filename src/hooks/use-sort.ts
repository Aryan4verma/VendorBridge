"use client";

import { useState } from "react";

export function useSort(defaultSort = "", defaultOrder: "asc" | "desc" = "asc") {
  const [sort, setSort] = useState(defaultSort);
  const [order, setOrder] = useState<"asc" | "desc">(defaultOrder);

  const toggleOrder = () => setOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  return {
    sort,
    order,
    setSort,
    setOrder,
    toggleOrder,
  };
}
