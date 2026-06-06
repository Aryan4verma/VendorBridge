"use client";
import { StatCard } from "@/components/data-display/stat-card/stat-card";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { BarChart } from "@/components/charts/bar-chart/bar-chart";
import { LineChart } from "@/components/charts/line-chart/line-chart";
import { AreaChart } from "@/components/charts/area-chart/area-chart";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { useRfqs } from "@/features/rfqs/hooks/use-rfqs";
import { useApprovals } from "@/features/approvals/hooks/use-approvals";
import { useVendors } from "@/features/vendors/hooks/use-vendors";
import { demoRfqTrends, demoSpendByCategory, demoTopVendors, demoApprovalTurnaround } from "@/lib/demo-data";

export default function AnalyticsPage() {
  const { stats, isLoading: statsLoading } = useDashboard();
  const { rfqs } = useRfqs();
  const { approvals } = useApprovals();
  const { vendors } = useVendors();

  if (statsLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>;

  const hasData = vendors.length > 0 || rfqs.length > 0;

  const rfqTrends = hasData
    ? (() => {
        const counts: Record<string, number> = {};
        const months = ["Jan","Feb","Mar","Apr","May","Jun"];
        for (let i = 5; i >= 0; i--) {
          counts[months[5 - i]] = 0;
        }
        rfqs.forEach((r) => {
          const m = months[new Date(r.created_at).getMonth() % 6];
          if (m in counts) counts[m]++;
        });
        return Object.entries(counts).map(([month, count]) => ({ month, count }));
      })()
    : demoRfqTrends;

  const pendingCount = approvals.filter((a) => a.status === "pending").length;

  return (
    <div>
      <PageHeader title="Analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Vendors" value={stats?.totalVendors ?? 0} />
        <StatCard title="Total RFQs" value={stats?.totalRfqs ?? 0} />
        <StatCard title="Pending Approvals" value={pendingCount || (stats?.pendingApprovals ?? 0)} />
        <StatCard title="Total Quotations" value={stats?.totalQuotations ?? 0} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Spend by Category</h3></CardHeader>
          <CardBody><BarChart data={demoSpendByCategory} xKey="category" yKey="amount" /></CardBody>
        </Card>
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">RFQ Trends</h3></CardHeader>
          <CardBody><LineChart data={rfqTrends} xKey="month" yKey="count" /></CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Approval Turnaround</h3></CardHeader>
          <CardBody><AreaChart data={demoApprovalTurnaround} xKey="week" yKey="hours" /></CardBody>
        </Card>
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Top Vendors by Spend</h3></CardHeader>
          <CardBody><BarChart data={demoTopVendors} xKey="name" yKey="spend" color="var(--color-status-active)" /></CardBody>
        </Card>
      </div>
    </div>
  );
}
