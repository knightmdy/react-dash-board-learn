import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const revenueData = [
  { category: '电子产品', revenue: 120000, cost: 80000, profit: 40000 },
  { category: '服装配饰', revenue: 95000, cost: 60000, profit: 35000 },
  { category: '家居用品', revenue: 85000, cost: 55000, profit: 30000 },
  { category: '运动健身', revenue: 75000, cost: 45000, profit: 30000 },
  { category: '美妆护肤', revenue: 65000, cost: 40000, profit: 25000 },
  { category: '图书文具', revenue: 45000, cost: 30000, profit: 15000 }
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">产品类别收入</CardTitle>
        <p className="text-sm text-muted-foreground">各类别收入与成本分析</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="category" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
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
            <Bar 
              dataKey="revenue" 
              fill="hsl(var(--chart-1))" 
              name="收入" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="cost" 
              fill="hsl(var(--chart-4))" 
              name="成本" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="profit" 
              fill="hsl(var(--chart-3))" 
              name="利润" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}