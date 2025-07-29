import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const salesData = [
  { month: '1月', sales: 15000, target: 12000, profit: 3000 },
  { month: '2月', sales: 18000, target: 15000, profit: 4200 },
  { month: '3月', sales: 22000, target: 18000, profit: 5100 },
  { month: '4月', sales: 19000, target: 20000, profit: 4500 },
  { month: '5月', sales: 25000, target: 22000, profit: 6000 },
  { month: '6月', sales: 28000, target: 25000, profit: 7200 },
  { month: '7月', sales: 32000, target: 28000, profit: 8400 },
  { month: '8月', sales: 29000, target: 30000, profit: 7800 },
  { month: '9月', sales: 35000, target: 32000, profit: 9100 },
  { month: '10月', sales: 38000, target: 35000, profit: 10200 },
  { month: '11月', sales: 42000, target: 38000, profit: 11500 },
  { month: '12月', sales: 45000, target: 42000, profit: 12600 }
];

export function SalesChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">销售趋势分析</CardTitle>
        <p className="text-sm text-muted-foreground">月度销售额与目标对比</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
              name="实际销售额"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 3 }}
              name="销售目标"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 3 }}
              name="利润"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}