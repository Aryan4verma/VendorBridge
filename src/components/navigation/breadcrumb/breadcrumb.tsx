import Link from "next/link";

interface BreadcrumbProps { pathname: string; }

const pathLabels: Record<string, string> = {
  dashboard: "Dashboard",
  vendors: "Vendors",
  new: "New",
  edit: "Edit",
  rfqs: "RFQs",
  ai: "AI Generator",
  compare: "Compare",
  quotations: "Quotations",
  approvals: "Approvals",
  "purchase-orders": "Purchase Orders",
  invoices: "Invoices",
  analytics: "Analytics",
  "activity-logs": "Activity Logs",
  admin: "Admin",
  users: "Users",
  vendor: "Vendors",
  rfq: "RFQs",
  quote: "Submit Quotation",
};

export function Breadcrumb({ pathname }: BreadcrumbProps) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0 || segments[0] === "dashboard") {
    return <h1 className="text-lg font-semibold text-[var(--color-on-surface)]">Dashboard</h1>;
  }

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link href="/dashboard" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]">Home</Link>
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const label = pathLabels[segment] || segment.replace(/-/g, " ");
        const isLast = i === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-1">
            <span className="text-[var(--color-outline)]">/</span>
            {isLast ? (
              <span className="font-medium text-[var(--color-on-surface)] capitalize">{label}</span>
            ) : (
              <Link href={href} className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] capitalize">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
