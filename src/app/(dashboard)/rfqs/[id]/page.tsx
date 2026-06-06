"use client";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { DetailPanel, DetailRow } from "@/components/data-display/detail-panel/detail-panel";
import { StatusBadge } from "@/components/data-display/status-badge/status-badge";
import { Card, CardHeader, CardBody } from "@/components/cards/card/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/table/table";
import { mockRfqs, mockQuotations, mockVendors, getVendorName } from "@/lib/mock-data";

export default function RfqDetailPage() {
  const rfq = mockRfqs[0];
  const quotations = mockQuotations.filter((q) => q.rfq_id === rfq.id);
  return (
    <div>
      <PageHeader title={rfq.title} backHref="/rfqs" subtitle={`Deadline: ${rfq.deadline}`} actions={<StatusBadge status={rfq.status} />} />
      <DetailPanel className="mb-6">
        <DetailRow label="Description" value={rfq.description || "—"} />
        <DetailRow label="Quantity" value={rfq.quantity} mono />
        <DetailRow label="Deadline" value={rfq.deadline} mono />
        <DetailRow label="Status" value={<StatusBadge status={rfq.status} />} />
      </DetailPanel>
      <Card className="mb-6">
        <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Assigned Vendors</h3></CardHeader>
        <CardBody className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Vendor</TableHead><TableHead>Code</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockVendors.slice(0, 3).map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.company_name}</TableCell>
                  <TableCell className="data-mono">{v.vendor_code}</TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Card className="mb-6">
        <CardHeader><h3 className="text-[var(--font-size-title-sm)] font-semibold">Received Quotations</h3></CardHeader>
        <CardBody className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Vendor</TableHead><TableHead>Price</TableHead><TableHead>Delivery</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {quotations.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">{getVendorName(q.vendor_id)}</TableCell>
                  <TableCell className="data-mono">₹{q.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="data-mono">{q.delivery_days} days</TableCell>
                  <TableCell><StatusBadge status={q.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      {quotations.length > 0 && <Link href={`/rfqs/${rfq.id}/compare`}><Button>Compare Quotations</Button></Link>}
    </div>
  );
}