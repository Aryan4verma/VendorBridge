"use client";
import Link from "next/link";
import { StatCard } from "@/components/data-display/stat-card/stat-card";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { LoadingSpinner } from "@/components/feedback/loading-spinner/loading-spinner";
import { BarChart } from "@/components/charts/bar-chart/bar-chart";
import { LineChart } from "@/components/charts/line-chart/line-chart";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { useActivityLogs } from "@/features/activity-logs/hooks/use-activity-logs";
import { demoActivityLogs, demoRfqTrends, demoSpendByCategory } from "@/lib/demo-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Building2, FileText, CheckCircle, MessageSquare } from "lucide-react";

const quickActions = [
  { label: "Add Vendor", href: "/vendors/new", icon: Building2 },
  { label: "Create RFQ", href: "/rfqs/new", icon: FileText },
  { label: "View Approvals", href: "/approvals", icon: CheckCircle },
  { label: "View Quotations", href: "/quotations", icon: MessageSquare },
];

export default function DashboardPage() {
  const { stats, isLoading: statsLoading } = useDashboard();
  const { logs, isLoading: logsLoading } = useActivityLogs(10);

  const displayLogs = logs.length > 0 ? logs : demoActivityLogs;

  if (statsLoading) {
    return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div>
      <h1 className="text-[var(--font-size-display-lg)] font-bold text-[var(--color-on-surface)] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Vendors" value={stats?.totalVendors ?? 0} />
        <StatCard title="Total RFQs" value={stats?.totalRfqs ?? 0} />
        <StatCard title="Pending Approvals" value={stats?.pendingApprovals ?? 0} />
        <StatCard title="Total Quotations" value={stats?.totalQuotations ?? 0} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">RFQ Trends</h3></CardHeader>
          <CardBody><LineChart data={demoRfqTrends} xKey="month" yKey="count" height={220} /></CardBody>
        </Card>
        <Card>
          <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Spend by Category</h3></CardHeader>
          <CardBody><BarChart data={demoSpendByCategory} xKey="category" yKey="amount" height={220} /></CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Recent Activity</h3></CardHeader>
            <CardBody className="p-0">
              {logsLoading ? (
                <div className="flex justify-center py-8"><LoadingSpinner /></div>
              ) : (
                <Table>
                  <TableHeader><TableRow><TableHead>Action</TableHead><TableHead>Entity</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {displayLogs.slice(0, 8).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="capitalize font-medium">{log.action.replace(/_/g, " ")}</TableCell>
                        <TableCell className="capitalize text-[var(--color-on-surface-variant)]">{log.entity_type.replace(/_/g, " ")}</TableCell>
                        <TableCell className="data-mono text-[var(--color-on-surface-variant)] text-sm">{formatDateTime(log.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="mb-4">
            <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Quick Actions</h3></CardHeader>
            <CardBody>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Link key={action.href} href={action.href} className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-default)] text-sm font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors">
                    <action.icon className="h-4 w-4 text-[var(--color-primary)]" />
                    {action.label}
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Summary</h3></CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-sm text-[var(--color-on-surface-variant)]">Active Vendors</span><span className="text-sm font-semibold data-mono">{stats?.activeVendors ?? 0}</span></div>
                <div className="flex justify-between"><span className="text-sm text-[var(--color-on-surface-variant)]">Open RFQs</span><span className="text-sm font-semibold data-mono">{stats?.openRfqs ?? 0}</span></div>
                <div className="flex justify-between"><span className="text-sm text-[var(--color-on-surface-variant)]">Total Spend</span><span className="text-sm font-semibold data-mono">{formatCurrency(stats?.totalSpend ?? 0)}</span></div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
