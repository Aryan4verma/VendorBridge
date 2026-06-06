"use client";
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AreaChartProps { data: Record<string, unknown>[]; xKey: string; yKey: string; height?: number; color?: string; }

export function AreaChart({ data, xKey, yKey, height = 300, color = "var(--color-primary)" }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-border)" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Area type="monotone" dataKey={yKey} stroke={color} fill={color} fillOpacity={0.1} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
