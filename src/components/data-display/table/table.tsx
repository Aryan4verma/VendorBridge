"use client";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Table
interface TableProps { children: ReactNode; className?: string; }
export function Table({ children, className }: TableProps) {
  return <div className={cn("w-full overflow-auto", className)}><table className="w-full caption-bottom text-sm">{children}</table></div>;
}

// TableHeader
interface TableHeaderProps { children: ReactNode; className?: string; }
export function TableHeader({ children, className }: TableHeaderProps) {
  return <thead className={cn("[&_tr]:border-b sticky top-0 z-10 bg-[#f1f5f9]", className)}>{children}</thead>;
}

// TableBody
interface TableBodyProps { children: ReactNode; className?: string; }
export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>;
}

// TableRow
interface TableRowProps { children: ReactNode; className?: string; onClick?: () => void; }
export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn("border-b border-[var(--color-surface-border)] transition-colors hover:bg-[#f8fafc] data-[state=selected]:bg-[var(--color-surface-container)]", onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

// TableHead
interface TableHeadProps { children: ReactNode; className?: string; }
export function TableHead({ children, className }: TableHeadProps) {
  return <th className={cn("h-10 px-4 text-left align-middle text-[var(--font-size-label-bold)] font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider", className)}>{children}</th>;
}

// TableCell
interface TableCellProps { children: ReactNode; className?: string; }
export function TableCell({ children, className }: TableCellProps) {
  return <td className={cn("p-[var(--spacing-table-cell)] align-middle text-[var(--font-size-body-md)]", className)}>{children}</td>;
}

// TablePagination
interface TablePaginationProps { page: number; totalPages: number; onPageChange: (page: number) => void; }
export function TablePagination({ page, totalPages, onPageChange }: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <span className="text-sm text-[var(--color-on-surface-variant)]">Page {page} of {totalPages}</span>
      <div className="flex gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="h-8 px-3 text-sm rounded-[var(--radius-default)] border border-[var(--color-surface-border)] disabled:opacity-50 hover:bg-[var(--color-surface-container-low)]">Prev</button>
        <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="h-8 px-3 text-sm rounded-[var(--radius-default)] border border-[var(--color-surface-border)] disabled:opacity-50 hover:bg-[var(--color-surface-container-low)]">Next</button>
      </div>
    </div>
  );
}

// TableEmpty
interface TableEmptyProps { message?: string; colSpan: number; }
export function TableEmpty({ message = "No data found", colSpan }: TableEmptyProps) {
  return <tr><td colSpan={colSpan} className="h-24 text-center text-[var(--color-on-surface-variant)]">{message}</td></tr>;
}

// TableSkeleton
interface TableSkeletonProps { rows?: number; cols?: number; }
export function TableSkeleton({ rows = 5, cols = 5 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-[var(--color-surface-border)]">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="p-[var(--spacing-table-cell)]"><div className="h-4 animate-pulse rounded bg-[var(--color-surface-container)]" /></td>
          ))}
        </tr>
      ))}
    </>
  );
}
