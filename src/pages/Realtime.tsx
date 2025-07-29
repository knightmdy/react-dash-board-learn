import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { 
  Activity, 
  Users, 
  TrendingUp, 
  Server, 
  Wifi, 
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Globe,
  Monitor,
  Cpu,
  HardDrive,
  MemoryStick,
  Pause,
  Play,
  RefreshCw
} from 'lucide-react';

// 模拟实时数据
const generateRealtimeData = () => {
  const now = new Date();
  return Array.from({ length: 20 }, (_, i) => ({
    time: new Date(now.getTime() - (19 - i) * 60000).toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    users: Math.floor(Math.random() * 100) + 200,
    orders: Math.floor(Math.random() * 50) + 20,
    revenue: Math.floor(Math.random() * 5000) + 10000,
    pageViews: Math.floor(Math.random() * 500) + 1000
  }));
};

const systemMetrics = [
  { name: 'CPU使用率', value: 68, status: 'normal', icon: Cpu, color: '#8884d8' },
  { name: '内存使用率', value: 45, status: 'normal', icon: MemoryStick, color: '#82ca9d' },
  { name: '磁盘使用率', value: 78, status: 'warning', icon: HardDrive, color: '#ffc658' },
  { name: '网络延迟', value: 25, status: 'normal', icon: Wifi, color: '#ff7300' }
];

const serverStatus = [
  { name: 'Web服务器', status: 'online', uptime: '99.9%', load: 'low' },
  { name: '数据库服务器', status: 'online', uptime: '99.8%', load: 'medium' },
  { name: 'Redis缓存', status: 'online', uptime: '100%', load: 'low' },
  { name: 'CDN服务', status: 'warning', uptime: '98.5%', load: 'high' }
];

const realtimeEvents = [
  { id: 1, type: 'order', message: '新订单：#12345', time: '2分钟前', severity: 'info' },
  { id: 2, type: 'user', message: '新用户注册：张三', time: '3分钟前', severity: 'success' },
  { id: 3, type: 'error', message: 'API响应超时', time: '5分钟前', severity: 'warning' },
  { id: 4, type: 'system', message: '数据库连接恢复', time: '8分钟前', severity: 'success' },
  { id: 5, type: 'security', message: '检测到异常登录', time: '12分钟前', severity: 'error' }
];

const trafficData = [
  { source: '搜索引擎', current: 320, previous: 280 },
  { source: '直接访问', current: 280, previous: 310 },
  { source: '社交媒体', current: 180, previous: 150 },
  { source: '推荐链接', current: 120, previous: 140 }
];

export default function Realtime() {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData());
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setRealtimeData(generateRealtimeData());
      setRefreshCount(count => count + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const currentUsers = realtimeData[realtimeData.length - 1]?.users || 0;
  const currentOrders = realtimeData[realtimeData.length - 1]?.orders || 0;
  const currentRevenue = realtimeData[realtimeData.length - 1]?.revenue || 0;
  const currentPageViews = realtimeData[realtimeData.length - 1]?.pageViews || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'border-l-green-500';
      case 'warning': return 'border-l-yellow-500';
      case 'error': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <DashboardLayout title="实时监控">
      <div className="space-y-6">
        {/* 监控控制栏 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={isMonitoring} 
                onCheckedChange={setIsMonitoring}
                id="monitoring-toggle"
              />
              <label htmlFor="monitoring-toggle" className="text-sm font-medium">
                {isMonitoring ? '监控中' : '已暂停'}
              </label>
              {isMonitoring && (
                <div className="flex items-center space-x-1 text-green-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs">实时更新</span>
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              更新次数: {refreshCount}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setRealtimeData(generateRealtimeData())}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              手动刷新
            </Button>
            <Button variant="outline" size="sm">
              <Monitor className="h-4 w-4 mr-2" />
              全屏监控
            </Button>
          </div>
        </div>

        {/* 实时指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">在线用户</p>
                  <p className="text-3xl font-bold text-foreground">{currentUsers}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">实时更新</span>
                  </div>
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
                  <p className="text-sm font-medium text-muted-foreground">当前订单</p>
                  <p className="text-3xl font-bold text-foreground">{currentOrders}</p>
                  <div className="flex items-center mt-1">
                    <Activity className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{Math.floor(Math.random() * 5) + 1} 新增</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">实时收入</p>
                  <p className="text-3xl font-bold text-foreground">¥{currentRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <Zap className="h-4 w-4 text-yellow-600 mr-1" />
                    <span className="text-sm text-yellow-600">每分钟更新</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">页面浏览</p>
                  <p className="text-3xl font-bold text-foreground">{currentPageViews.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <Globe className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">持续监控</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细监控标签页 */}
        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="realtime">实时数据</TabsTrigger>
            <TabsTrigger value="system">系统状态</TabsTrigger>
            <TabsTrigger value="performance">性能监控</TabsTrigger>
            <TabsTrigger value="events">事件日志</TabsTrigger>
            <TabsTrigger value="alerts">告警管理</TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>用户活跃趋势</CardTitle>
                  <CardDescription>过去20分钟在线用户变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={realtimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>订单实时统计</CardTitle>
                  <CardDescription>实时订单数量变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={realtimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>流量来源对比</CardTitle>
                <CardDescription>当前与历史数据对比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#8884d8" name="当前" />
                    <Bar dataKey="previous" fill="#82ca9d" name="历史" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>系统资源使用率</CardTitle>
                  <CardDescription>服务器资源实时监控</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {systemMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{metric.name}</span>
                          </div>
                          <span className="text-sm font-medium">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>服务状态</CardTitle>
                  <CardDescription>各服务运行状态监控</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serverStatus.map((server) => (
                      <div key={server.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <div className={`h-3 w-3 rounded-full ${
                            server.status === 'online' ? 'bg-green-500' :
                            server.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <p className="font-medium">{server.name}</p>
                            <p className="text-sm text-muted-foreground">运行时间: {server.uptime}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(server.status)}
                        >
                          {server.status === 'online' ? '在线' : server.status === 'warning' ? '警告' : '离线'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>性能指标趋势</CardTitle>
                <CardDescription>系统性能随时间变化</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={realtimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pageViews" stroke="#8884d8" strokeWidth={2} name="页面访问" />
                    <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} name="在线用户" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>实时事件日志</CardTitle>
                <CardDescription>系统事件实时监控</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {realtimeEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className={`p-4 rounded-lg border-l-4 bg-muted/30 ${getSeverityColor(event.severity)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {event.severity === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {event.severity === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                          {event.severity === 'error' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                          {event.severity === 'info' && <Activity className="h-5 w-5 text-blue-600" />}
                          <div>
                            <p className="font-medium">{event.message}</p>
                            <p className="text-sm text-muted-foreground capitalize">{event.type}</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>告警配置</CardTitle>
                <CardDescription>系统告警规则和通知设置</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">CPU使用率告警</h4>
                      <p className="text-sm text-muted-foreground mb-3">当CPU使用率超过80%时触发</p>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">内存使用率告警</h4>
                      <p className="text-sm text-muted-foreground mb-3">当内存使用率超过90%时触发</p>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">响应时间告警</h4>
                      <p className="text-sm text-muted-foreground mb-3">当响应时间超过5秒时触发</p>
                      <Switch />
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">错误率告警</h4>
                      <p className="text-sm text-muted-foreground mb-3">当错误率超过5%时触发</p>
                      <Switch defaultChecked />
                    </div>
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