"use client";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LineChartProps { data: Record<string, unknown>[]; xKey: string; yKey: string; height?: number; color?: string; }

export function LineChart({ data, xKey, yKey, height = 300, color = "var(--color-primary)" }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-border)" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
