import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ScatterChart, Scatter, ComposedChart
} from 'recharts';
import { Globe, MapPin, TrendingUp, Users, DollarSign, Activity, Download, Filter } from 'lucide-react';

// 模拟地理数据
const regionData = [
  { region: '华东', users: 2800, revenue: 1250000, orders: 4200, growth: 15.2 },
  { region: '华南', users: 2200, revenue: 980000, orders: 3400, growth: 12.8 },
  { region: '华北', users: 1900, revenue: 850000, orders: 2900, growth: 8.5 },
  { region: '华中', users: 1500, revenue: 680000, orders: 2300, growth: 18.7 },
  { region: '西南', users: 1200, revenue: 520000, orders: 1800, growth: 22.3 },
  { region: '东北', users: 800, revenue: 350000, orders: 1200, growth: 5.9 },
  { region: '西北', users: 600, revenue: 280000, orders: 900, growth: 14.1 }
];

const cityData = [
  { city: '上海', users: 1200, revenue: 520000, lat: 31.23, lng: 121.47, level: 'T1' },
  { city: '北京', users: 1100, revenue: 480000, lat: 39.90, lng: 116.40, level: 'T1' },
  { city: '深圳', users: 980, revenue: 450000, lat: 22.54, lng: 114.05, level: 'T1' },
  { city: '广州', users: 850, revenue: 380000, lat: 23.12, lng: 113.23, level: 'T1' },
  { city: '杭州', users: 720, revenue: 320000, lat: 30.27, lng: 120.15, level: 'T2' },
  { city: '成都', users: 680, revenue: 290000, lat: 30.57, lng: 104.06, level: 'T2' },
  { city: '南京', users: 620, revenue: 270000, lat: 32.06, lng: 118.78, level: 'T2' },
  { city: '武汉', users: 580, revenue: 250000, lat: 30.52, lng: 114.31, level: 'T2' }
];

const trafficSourceData = [
  { source: '直接访问', users: 3200, percentage: 32, color: '#8884d8' },
  { source: '搜索引擎', users: 2800, percentage: 28, color: '#82ca9d' },
  { source: '社交媒体', users: 2200, percentage: 22, color: '#ffc658' },
  { source: '推荐链接', users: 1200, percentage: 12, color: '#ff7300' },
  { source: '邮件营销', users: 600, percentage: 6, color: '#00C49F' }
];

const monthlyTrend = [
  { month: '1月', users: 8200, revenue: 3200000 },
  { month: '2月', users: 8800, revenue: 3600000 },
  { month: '3月', users: 9200, revenue: 3900000 },
  { month: '4月', users: 9800, revenue: 4200000 },
  { month: '5月', users: 10200, revenue: 4500000 },
  { month: '6月', users: 10000, revenue: 4350000 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F'];

export default function Geographic() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  const totalUsers = regionData.reduce((sum, item) => sum + item.users, 0);
  const totalRevenue = regionData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = regionData.reduce((sum, item) => sum + item.orders, 0);
  const avgGrowth = (regionData.reduce((sum, item) => sum + item.growth, 0) / regionData.length).toFixed(1);

  return (
    <DashboardLayout title="地理分布">
      <div className="space-y-6">
        {/* 顶部筛选控制 */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择区域" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部区域</SelectItem>
                {regionData.map(item => (
                  <SelectItem key={item.region} value={item.region}>{item.region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">最近7天</SelectItem>
                <SelectItem value="30d">最近30天</SelectItem>
                <SelectItem value="90d">最近90天</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
        </div>

        {/* 地理概览统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">总用户数</p>
                  <p className="text-3xl font-bold text-foreground">{totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+{avgGrowth}% 增长</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">总收入</p>
                  <p className="text-3xl font-bold text-foreground">¥{(totalRevenue/1000000).toFixed(1)}M</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% 增长</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">订单总数</p>
                  <p className="text-3xl font-bold text-foreground">{totalOrders.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+8.9% 增长</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">覆盖区域</p>
                  <p className="text-3xl font-bold text-foreground">{regionData.length}</p>
                  <p className="text-sm text-blue-600 mt-1">全国覆盖</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细分析标签页 */}
        <Tabs defaultValue="region" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="region">区域分析</TabsTrigger>
            <TabsTrigger value="city">城市分布</TabsTrigger>
            <TabsTrigger value="traffic">流量来源</TabsTrigger>
            <TabsTrigger value="trend">地域趋势</TabsTrigger>
            <TabsTrigger value="map">地图视图</TabsTrigger>
          </TabsList>

          <TabsContent value="region" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>区域用户分布</CardTitle>
                  <CardDescription>各区域用户数量对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value.toLocaleString(), '用户数']} />
                      <Bar dataKey="users" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>区域收入分布</CardTitle>
                  <CardDescription>各区域收入贡献占比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ region, value }) => `${region}: ¥${((value as number)/10000).toFixed(0)}万`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`¥${((value as number)/10000).toFixed(1)}万`, '收入']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>区域增长率对比</CardTitle>
                <CardDescription>各区域用户增长趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="users" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#ff7300" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="city" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>重点城市表现</CardTitle>
                  <CardDescription>主要城市用户和收入数据</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cityData.map((city, index) => (
                      <div key={city.city} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{city.city}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {city.level}级城市
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{city.users.toLocaleString()}用户</p>
                          <p className="text-sm text-muted-foreground">¥{(city.revenue/10000).toFixed(1)}万</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>城市分布散点图</CardTitle>
                  <CardDescription>用户数量与收入关系</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={cityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="users" name="用户数" />
                      <YAxis dataKey="revenue" name="收入" />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'users' ? value.toLocaleString() : `¥${((value as number)/10000).toFixed(1)}万`,
                          name === 'users' ? '用户数' : '收入'
                        ]}
                        labelFormatter={(label, payload) => payload?.[0]?.payload?.city || ''}
                      />
                      <Scatter dataKey="revenue" fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>流量来源分析</CardTitle>
                  <CardDescription>不同渠道用户分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ source, percentage }) => `${source}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="users"
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), '用户数']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>渠道用户质量</CardTitle>
                  <CardDescription>各渠道用户价值对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trafficSourceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value.toLocaleString(), '用户数']} />
                      <Bar dataKey="users" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trend" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>地域增长趋势</CardTitle>
                <CardDescription>各地区用户和收入月度变化</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="users" 
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#ff7300" 
                      strokeWidth={3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>地图视图</CardTitle>
                <CardDescription>地理位置可视化分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">地图组件</p>
                    <p className="text-sm text-muted-foreground/70">
                      可集成百度地图、高德地图或Mapbox展示地理数据
                    </p>
                    <Button variant="outline" className="mt-4">
                      配置地图服务
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}