"use client";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartProps { data: Record<string, unknown>[]; dataKey: string; nameKey: string; height?: number; colors?: string[]; }

const DEFAULT_COLORS = ["var(--color-primary)", "var(--color-status-active)", "var(--color-status-pending)", "var(--color-status-rejected)", "var(--color-status-draft)"];

export function PieChart({ data, dataKey, nameKey, height = 300, colors = DEFAULT_COLORS }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie data={data} dataKey={dataKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={80} label>
          {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
