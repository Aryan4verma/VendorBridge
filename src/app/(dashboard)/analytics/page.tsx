"use client";
import { StatCard } from "@/components/data-display/stat-card/stat-card";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { BarChart } from "@/components/charts/bar-chart/bar-chart";
import { LineChart } from "@/components/charts/line-chart/line-chart";
import { AreaChart } from "@/components/charts/area-chart/area-chart";
import { mockSpendByCategory, mockRfqTrends, mockTopVendors, mockApprovalTurnaround } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header/page-header";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Spend" value={formatCurrency(19075000)} trend={{ value: 12, isPositive: true }} />
        <StatCard title="Avg Approval Time" value="15.5 hrs" trend={{ value: 20, isPositive: true }} />
        <StatCard title="RFQs This Month" value="4" />
        <StatCard title="Vendor Participation" value="80%" trend={{ value: 5, isPositive: true }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Spend by Category</h3></CardHeader>
          <CardBody><BarChart data={mockSpendByCategory} xKey="category" yKey="amount" /></CardBody>
        </Card>
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">RFQ Trends</h3></CardHeader>
          <CardBody><LineChart data={mockRfqTrends} xKey="month" yKey="count" /></CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Approval Turnaround</h3></CardHeader>
          <CardBody><AreaChart data={mockApprovalTurnaround} xKey="week" yKey="hours" /></CardBody>
        </Card>
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Top Vendors by Spend</h3></CardHeader>
          <CardBody><BarChart data={mockTopVendors} xKey="name" yKey="spend" color="var(--color-status-active)" /></CardBody>
        </Card>
      </div>
    </div>
  );
}
