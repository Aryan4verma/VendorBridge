"use client";

import { useState } from "react";

export function usePagination(initialPage = 1, initialPageSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);

  return {
    page,
    pageSize,
    totalPages,
    setPage,
    setTotalPages,
  };
}
