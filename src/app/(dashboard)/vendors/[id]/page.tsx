"use client";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { useVendor } from "@/features/vendors/hooks/use-vendor";
import { useToast } from "@/providers/toast-provider";
import { vendorService } from "@/features/vendors/services/vendor.service";

export default function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { vendor, isLoading, error } = useVendor(id);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await vendorService.delete(id);
      toast("Vendor deleted", "success");
      router.push("/vendors");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete vendor", "error");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading...</div>;
  }

  if (error || !vendor) {
    return <div className="p-8 text-center text-[var(--color-error)]">{error || "Vendor not found"}</div>;
  }

  return (
    <div>
      <PageHeader
        title={vendor.company_name}
        backHref="/vendors"
        actions={
          <div className="flex gap-2">
            <Link href={`/vendors/${vendor.id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button variant="secondary" onClick={handleDelete} className="text-[var(--color-error)]">Delete</Button>
          </div>
        }
      />
      <DetailPanel>
        <DetailRow label="Category" value={vendor.category} />
        <DetailRow label="Contact Person" value={vendor.contact_person} />
        <DetailRow label="Email" value={vendor.email} />
        <DetailRow label="Phone" value={vendor.phone || "—"} />
        <DetailRow label="GST Number" value={vendor.gst_number || "—"} mono />
        <DetailRow label="Address" value={vendor.address || "—"} />
        <DetailRow label="Status" value={<StatusBadge status={vendor.status} />} />
      </DetailPanel>
    </div>
  );
}
