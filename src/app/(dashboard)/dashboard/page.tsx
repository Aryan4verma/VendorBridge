"use client";
import { StatCard } from "@/components/data-display/stat-card/stat-card";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { LineChart } from "@/components/charts/line-chart/line-chart";
import { DonutChart } from "@/components/charts/donut-chart/donut-chart";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { mockDashboardStats, mockRfqTrends, mockStatusDistribution, mockActivityLogs } from "@/lib/mock-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default function DashboardPage() {
  const stats = mockDashboardStats;
  return (
    <div>
      <h1 className="text-[var(--font-size-display-lg)] font-bold text-[var(--color-on-surface)] mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Spend" value={formatCurrency(stats.totalSpend)} trend={{ value: 12, isPositive: true }} />
        <StatCard title="Active RFQs" value={stats.activeRfqs} trend={{ value: 8, isPositive: true }} />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} />
        <StatCard title="Active Vendors" value={stats.activeVendors} trend={{ value: 5, isPositive: true }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">RFQ Trends</h3></CardHeader>
          <CardBody><LineChart data={mockRfqTrends} xKey="month" yKey="count" /></CardBody>
        </Card>
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Status Distribution</h3></CardHeader>
          <CardBody><DonutChart data={mockStatusDistribution} dataKey="count" nameKey="status" /></CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Recent Activity</h3></CardHeader>
        <CardBody className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Action</TableHead><TableHead>Entity</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockActivityLogs.slice(0, 5).map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="capitalize">{log.action.replace(/_/g, " ")}</TableCell>
                  <TableCell className="capitalize">{log.entity_type}</TableCell>
                  <TableCell className="data-mono text-[var(--color-on-surface-variant)]">{formatDateTime(log.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
