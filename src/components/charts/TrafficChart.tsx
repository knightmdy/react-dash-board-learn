import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const trafficData = [
  { time: '00:00', visitors: 120, pageViews: 340 },
  { time: '02:00', visitors: 80, pageViews: 220 },
  { time: '04:00', visitors: 60, pageViews: 180 },
  { time: '06:00', visitors: 100, pageViews: 280 },
  { time: '08:00', visitors: 320, pageViews: 890 },
  { time: '10:00', visitors: 450, pageViews: 1200 },
  { time: '12:00', visitors: 380, pageViews: 1050 },
  { time: '14:00', visitors: 420, pageViews: 1180 },
  { time: '16:00', visitors: 350, pageViews: 980 },
  { time: '18:00', visitors: 280, pageViews: 760 },
  { time: '20:00', visitors: 240, pageViews: 650 },
  { time: '22:00', visitors: 180, pageViews: 480 }
];

export function TrafficChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">网站流量分析</CardTitle>
        <p className="text-sm text-muted-foreground">24小时访客和页面浏览量</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
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
            <Area
              type="monotone"
              dataKey="pageViews"
              stackId="1"
              stroke="hsl(var(--chart-2))"
              fillOpacity={1}
              fill="url(#colorPageViews)"
              name="页面浏览量"
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stackId="2"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorVisitors)"
              name="访客数"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}