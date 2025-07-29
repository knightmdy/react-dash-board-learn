import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SalesChart } from '@/components/charts/SalesChart';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { UserDistributionChart } from '@/components/charts/UserDistributionChart';
import { TrafficChart } from '@/components/charts/TrafficChart';
import { Download, RefreshCw, Settings, TrendingUp } from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  FunnelChart, Funnel, LabelList, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

// 趋势分析数据
const trendData = [
  { month: '1月', 访问量: 4000, 页面浏览: 2400, 转化率: 2400 },
  { month: '2月', 访问量: 3000, 页面浏览: 1398, 转化率: 2210 },
  { month: '3月', 访问量: 2000, 页面浏览: 9800, 转化率: 2290 },
  { month: '4月', 访问量: 2780, 页面浏览: 3908, 转化率: 2000 },
  { month: '5月', 访问量: 1890, 页面浏览: 4800, 转化率: 2181 },
  { month: '6月', 访问量: 2390, 页面浏览: 3800, 转化率: 2500 },
];

// 散点图数据
const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

// 雷达图数据
const radarData = [
  { subject: '性能', A: 120, B: 110, fullMark: 150 },
  { subject: '安全性', A: 98, B: 130, fullMark: 150 },
  { subject: '可用性', A: 86, B: 130, fullMark: 150 },
  { subject: '兼容性', A: 99, B: 100, fullMark: 150 },
  { subject: '用户体验', A: 85, B: 90, fullMark: 150 },
  { subject: '功能性', A: 65, B: 85, fullMark: 150 },
];

// 漏斗图数据
const funnelData = [
  { value: 100, name: '访问网站', fill: 'hsl(var(--chart-1))' },
  { value: 80, name: '浏览产品', fill: 'hsl(var(--chart-2))' },
  { value: 50, name: '加入购物车', fill: 'hsl(var(--chart-3))' },
  { value: 30, name: '开始结账', fill: 'hsl(var(--chart-4))' },
  { value: 20, name: '完成支付', fill: 'hsl(var(--chart-5))' },
];

// 对比分析数据
const comparisonData = [
  { name: '产品A', 本年: 4000, 去年: 2400, 目标: 5000 },
  { name: '产品B', 本年: 3000, 去年: 1398, 目标: 3500 },
  { name: '产品C', 本年: 2000, 去年: 9800, 目标: 3000 },
  { name: '产品D', 本年: 2780, 去年: 3908, 目标: 4000 },
  { name: '产品E', 本年: 1890, 去年: 4800, 目标: 2500 },
];

// 热力图数据
const heatmapData = [
  { hour: '00', mon: 20, tue: 15, wed: 25, thu: 18, fri: 30, sat: 35, sun: 25 },
  { hour: '02', mon: 10, tue: 8, wed: 12, thu: 9, fri: 15, sat: 20, sun: 12 },
  { hour: '04', mon: 5, tue: 3, wed: 8, thu: 4, fri: 10, sat: 15, sun: 8 },
  { hour: '06', mon: 15, tue: 12, wed: 18, thu: 14, fri: 25, sat: 30, sun: 20 },
  { hour: '08', mon: 45, tue: 40, wed: 50, thu: 48, fri: 35, sat: 25, sun: 15 },
  { hour: '10', mon: 60, tue: 58, wed: 65, thu: 62, fri: 45, sat: 40, sun: 25 },
  { hour: '12', mon: 70, tue: 68, wed: 75, thu: 72, fri: 55, sat: 50, sun: 35 },
  { hour: '14', mon: 65, tue: 62, wed: 70, thu: 68, fri: 50, sat: 45, sun: 30 },
  { hour: '16', mon: 55, tue: 52, wed: 60, thu: 58, fri: 40, sat: 35, sun: 25 },
  { hour: '18', mon: 75, tue: 72, wed: 80, thu: 78, fri: 65, sat: 60, sun: 45 },
  { hour: '20', mon: 80, tue: 78, wed: 85, thu: 82, fri: 70, sat: 75, sun: 55 },
  { hour: '22', mon: 60, tue: 55, wed: 65, thu: 62, fri: 80, sat: 85, sun: 70 },
];

export default function Charts() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedChart, setSelectedChart] = useState('all');

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleExport = (chartType: string) => {
    // 模拟导出功能
    const data = { 
      type: chartType, 
      timestamp: new Date().toISOString(),
      data: '图表数据' 
    };
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartType}_图表数据_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout title="图表展示">
      <div className="space-y-6">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-foreground">数据可视化图表</h2>
            <div className="flex space-x-2">
              {['all', 'trend', 'distribution', 'comparison'].map((type) => (
                <Button
                  key={type}
                  variant={selectedChart === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedChart(type)}
                >
                  {type === 'all' && '全部图表'}
                  {type === 'trend' && '趋势分析'}
                  {type === 'distribution' && '分布图表'}
                  {type === 'comparison' && '对比分析'}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              刷新数据
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              图表设置
            </Button>
          </div>
        </div>

        {/* 图表展示区域 */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">基础图表</TabsTrigger>
            <TabsTrigger value="advanced">高级图表</TabsTrigger>
            <TabsTrigger value="interactive">交互图表</TabsTrigger>
            <TabsTrigger value="comparison">对比分析</TabsTrigger>
            <TabsTrigger value="distribution">分布展示</TabsTrigger>
            <TabsTrigger value="trends">趋势预测</TabsTrigger>
          </TabsList>

          {/* 基础图表 */}
          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart />
              <RevenueChart />
              <UserDistributionChart />
              <TrafficChart />
            </div>
          </TabsContent>

          {/* 高级图表 */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 雷达图 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>产品性能雷达图</CardTitle>
                    <CardDescription>多维度产品评估</CardDescription>
                  </div>
                  <Button
                    onClick={() => handleExport('radar')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="产品A" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                      <Radar name="产品B" dataKey="B" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 散点图 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>用户行为散点图</CardTitle>
                    <CardDescription>用户活跃度与满意度关系</CardDescription>
                  </div>
                  <Button
                    onClick={() => handleExport('scatter')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={scatterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" dataKey="x" name="活跃度" stroke="hsl(var(--muted-foreground))" />
                      <YAxis type="number" dataKey="y" name="满意度" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="用户群体" dataKey="z" fill="hsl(var(--primary))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 漏斗图 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>转化漏斗图</CardTitle>
                    <CardDescription>用户转化流程分析</CardDescription>
                  </div>
                  <Button
                    onClick={() => handleExport('funnel')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <FunnelChart>
                      <Tooltip />
                      <Funnel
                        dataKey="value"
                        data={funnelData}
                        isAnimationActive
                      >
                        <LabelList position="center" fill="#fff" stroke="none" />
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 面积图 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>趋势面积图</CardTitle>
                    <CardDescription>多指标趋势对比</CardDescription>
                  </div>
                  <Button
                    onClick={() => handleExport('area')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
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
                      <Area type="monotone" dataKey="访问量" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                      <Area type="monotone" dataKey="页面浏览" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                      <Area type="monotone" dataKey="转化率" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 交互图表 */}
          <TabsContent value="interactive" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>实时交互图表</CardTitle>
                  <CardDescription>支持缩放、拖拽、筛选的动态图表</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">图表类型:</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">折线图</Button>
                        <Button variant="outline" size="sm">柱状图</Button>
                        <Button variant="outline" size="sm">面积图</Button>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={trendData}>
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
                        <Line type="monotone" dataKey="访问量" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                        <Line type="monotone" dataKey="页面浏览" stroke="hsl(var(--chart-2))" strokeWidth={3} />
                        <Line type="monotone" dataKey="转化率" stroke="hsl(var(--chart-3))" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 对比分析 */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>年度对比分析</CardTitle>
                <CardDescription>本年度与去年同期数据对比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="本年" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="去年" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="目标" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 分布展示 */}
          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>热力图分析</CardTitle>
                <CardDescription>7天24小时用户活跃度热力图</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-8 gap-1 text-xs">
                    <div></div>
                    <div className="text-center">周一</div>
                    <div className="text-center">周二</div>
                    <div className="text-center">周三</div>
                    <div className="text-center">周四</div>
                    <div className="text-center">周五</div>
                    <div className="text-center">周六</div>
                    <div className="text-center">周日</div>
                  </div>
                  {heatmapData.map((row, index) => (
                    <div key={index} className="grid grid-cols-8 gap-1">
                      <div className="text-xs text-right">{row.hour}</div>
                      {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                        <div
                          key={day}
                          className="h-8 rounded flex items-center justify-center text-xs font-medium"
                          style={{
                            backgroundColor: `hsl(var(--primary) / ${(row as any)[day] / 100})`,
                            color: (row as any)[day] > 50 ? 'white' : 'hsl(var(--foreground))'
                          }}
                        >
                          {(row as any)[day]}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 趋势预测 */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>趋势预测分析</CardTitle>
                <CardDescription>基于历史数据的未来趋势预测</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-chart-1/10 to-chart-1/5">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-chart-1" />
                      <div className="text-2xl font-bold">+23.5%</div>
                      <div className="text-sm text-muted-foreground">预期增长</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-2/5">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-chart-2" />
                      <div className="text-2xl font-bold">+18.2%</div>
                      <div className="text-sm text-muted-foreground">用户增长</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-chart-3/10 to-chart-3/5">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-chart-3" />
                      <div className="text-2xl font-bold">+15.8%</div>
                      <div className="text-sm text-muted-foreground">收入预测</div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
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
                      <Line 
                        type="monotone" 
                        dataKey="访问量" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}