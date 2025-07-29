import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { UserDistributionChart } from '@/components/charts/UserDistributionChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users as UsersIcon, UserPlus, UserCheck, Clock, TrendingUp, Download } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// 用户增长数据
const userGrowthData = [
  { month: '1月', 新用户: 1200, 活跃用户: 8500, 留存用户: 7800 },
  { month: '2月', 新用户: 1580, 活跃用户: 9200, 留存用户: 8300 },
  { month: '3月', 新用户: 1890, 活跃用户: 10100, 留存用户: 9100 },
  { month: '4月', 新用户: 2100, 活跃用户: 11500, 留存用户: 10200 },
  { month: '5月', 新用户: 2380, 活跃用户: 12800, 留存用户: 11600 },
  { month: '6月', 新用户: 2680, 活跃用户: 14200, 留存用户: 13100 },
];

// 年龄分布数据
const ageDistributionData = [
  { name: '18-25岁', value: 2800, fill: 'hsl(var(--chart-1))' },
  { name: '26-35岁', value: 4200, fill: 'hsl(var(--chart-2))' },
  { name: '36-45岁', value: 3100, fill: 'hsl(var(--chart-3))' },
  { name: '46-55岁', value: 1800, fill: 'hsl(var(--chart-4))' },
  { name: '55岁以上', value: 900, fill: 'hsl(var(--chart-5))' },
];

// 用户行为数据
const userBehaviorData = [
  { action: '登录', 次数: 15420, 占比: '28%' },
  { action: '浏览商品', 次数: 12350, 占比: '22%' },
  { action: '搜索', 次数: 8900, 占比: '16%' },
  { action: '加入购物车', 次数: 6780, 占比: '12%' },
  { action: '下单', 次数: 4560, 占比: '8%' },
  { action: '支付', 次数: 4200, 占比: '7%' },
  { action: '评价', 次数: 2890, 占比: '5%' },
  { action: '分享', 次数: 1200, 占比: '2%' },
];

// 用户留存数据
const retentionData = [
  { day: 'Day 1', 留存率: 85 },
  { day: 'Day 3', 留存率: 72 },
  { day: 'Day 7', 留存率: 58 },
  { day: 'Day 14', 留存率: 45 },
  { day: 'Day 30', 留存率: 32 },
  { day: 'Day 60', 留存率: 28 },
  { day: 'Day 90', 留存率: 25 },
];

// 活跃时段数据
const activeTimeData = [
  { time: '00:00', users: 1200 },
  { time: '02:00', users: 800 },
  { time: '04:00', users: 600 },
  { time: '06:00', users: 1800 },
  { time: '08:00', users: 4200 },
  { time: '10:00', users: 5800 },
  { time: '12:00', users: 6900 },
  { time: '14:00', users: 7200 },
  { time: '16:00', users: 6800 },
  { time: '18:00', users: 8200 },
  { time: '20:00', users: 9100 },
  { time: '22:00', users: 7800 },
];

export default function Users() {
  const [timeRange, setTimeRange] = useState('7days');

  const handleExport = () => {
    // 模拟导出功能
    const data = {
      用户总数: '156,890',
      新增用户: '2,680',
      活跃用户: '14,200',
      用户留存率: '68.5%'
    };
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `用户分析数据_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout title="用户分析">
      <div className="space-y-6">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-foreground">用户数据概览</h2>
            <div className="flex space-x-2">
              {['7days', '30days', '90days'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                >
                  {range === '7days' && '近7天'}
                  {range === '30days' && '近30天'}
                  {range === '90days' && '近90天'}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出数据
          </Button>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="用户总数"
            value="156,890"
            change="+12.5%"
            icon={UsersIcon}
          />
          <StatCard
            title="新增用户"
            value="2,680"
            change="+8.2%"
            icon={UserPlus}
          />
          <StatCard
            title="活跃用户"
            value="14,200"
            change="+15.8%"
            icon={UserCheck}
          />
          <StatCard
            title="用户留存率"
            value="68.5%"
            change="+2.3%"
            icon={Clock}
          />
        </div>

        {/* 详细分析 */}
        <Tabs defaultValue="growth" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="growth">用户增长</TabsTrigger>
            <TabsTrigger value="demographics">用户画像</TabsTrigger>
            <TabsTrigger value="behavior">行为分析</TabsTrigger>
            <TabsTrigger value="retention">留存分析</TabsTrigger>
            <TabsTrigger value="activity">活跃时段</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>用户增长趋势</CardTitle>
                  <CardDescription>新用户、活跃用户、留存用户变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="新用户" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                      <Area type="monotone" dataKey="活跃用户" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                      <Area type="monotone" dataKey="留存用户" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <UserDistributionChart />
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>年龄分布</CardTitle>
                  <CardDescription>不同年龄段用户占比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ageDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ageDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>用户特征分析</CardTitle>
                  <CardDescription>用户群体特征统计</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-primary">62%</div>
                      <div className="text-sm text-muted-foreground">男性用户</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-primary">38%</div>
                      <div className="text-sm text-muted-foreground">女性用户</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">一线城市</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">二线城市</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">三线及以下</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>用户行为统计</CardTitle>
                <CardDescription>用户在平台上的主要行为分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userBehaviorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="action" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="次数" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="space-y-4">
                    <h4 className="font-semibold">行为转化漏斗</h4>
                    {userBehaviorData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm">{item.action}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{item.次数.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">{item.占比}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retention" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>用户留存率</CardTitle>
                <CardDescription>新用户在不同时间点的留存情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="留存率" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>用户活跃时段</CardTitle>
                <CardDescription>24小时用户活跃度分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activeTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="hsl(var(--chart-2))" 
                      fill="hsl(var(--chart-2))" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}