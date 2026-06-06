import { Badge } from "@/components/primitives/badge/badge";

type StatusType = "active" | "inactive" | "blacklisted" | "draft" | "open" | "closed" | "awarded" | "submitted" | "shortlisted" | "selected" | "rejected" | "pending" | "approved" | "generated" | "sent" | "completed" | "paid";

const statusVariantMap: Record<string, "active" | "pending" | "rejected" | "draft" | "inactive" | "default"> = {
  active: "active", open: "active", selected: "active", approved: "active", completed: "active", paid: "active",
  pending: "pending", shortlisted: "pending", awarded: "pending", sent: "pending",
  rejected: "rejected", blacklisted: "rejected",
  draft: "draft", submitted: "draft", generated: "draft",
  inactive: "inactive", closed: "inactive",
};

interface StatusBadgeProps { status: StatusType; className?: string; }

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariantMap[status] || "default";
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge variant={variant} className={className}>{label}</Badge>;
}
