import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/common/MetricCard';
import { DataCard } from '@/components/common/DataCard';
import { TimeRangeSelector } from '@/components/common/TimeRangeSelector';
import { SalesChart } from '@/components/charts/SalesChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useTimeRange } from '@/hooks/useTimeRange';
import { useDataExport } from '@/hooks/useDataExport';
import { baseMetrics, topProductsData, salesTrendData, calculateChange, formatCurrency } from '@/data/dashboardData';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Target,
  Calendar,
  Download
} from 'lucide-react';

const Sales = () => {
  const { selectedRange, timeRangeConfig, setTimeRange, setCustomDateRange } = useTimeRange();
  const { exportToJSON, exportToCSV, isExporting } = useDataExport();

  // 基于时间范围的销售数据
  const todaySales = Math.floor(baseMetrics.totalSales / 30); // 模拟每日销售额
  const todayOrders = Math.floor(baseMetrics.totalOrders * 1.8); // 模拟今日订单数

  const handleExportSalesData = () => {
    const salesData = {
      总销售额: formatCurrency(baseMetrics.totalSales),
      今日销售: formatCurrency(todaySales),
      订单总数: baseMetrics.totalOrders,
      转化率: `${baseMetrics.conversionRate}%`,
      平均订单价值: formatCurrency(baseMetrics.averageOrderValue),
      热销产品: topProductsData,
      时间范围: timeRangeConfig.label
    };
    exportToJSON(salesData, '销售数据分析');
  };

  return (
    <DashboardLayout title="销售数据">
      <div className="space-y-6">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between">
          <TimeRangeSelector
            selectedRange={selectedRange}
            onRangeChange={setTimeRange}
            onCustomDateRange={setCustomDateRange}
          />
          <Button onClick={handleExportSalesData} variant="outline" disabled={isExporting}>
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? '导出中...' : '导出数据'}
          </Button>
        </div>

        {/* 销售概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="今日销售额"
            value={formatCurrency(todaySales)}
            change={calculateChange(todaySales, 76800)}
            description="较昨日"
            icon={DollarSign}
            gradient="from-chart-1 to-primary-glow"
          />
          <MetricCard
            title="今日订单"
            value={todayOrders}
            change={calculateChange(todayOrders, 145)}
            description="较昨日"
            icon={ShoppingCart}
            gradient="from-chart-2 to-accent"
          />
          <MetricCard
            title="转化率"
            value={`${baseMetrics.conversionRate}%`}
            change={calculateChange(baseMetrics.conversionRate, 3.35)}
            description="较昨日"
            icon={Target}
            gradient="from-chart-3 to-success"
          />
          <MetricCard
            title="平均客单价"
            value={formatCurrency(baseMetrics.averageOrderValue)}
            change={calculateChange(baseMetrics.averageOrderValue, 528)}
            description="较昨日"
            icon={TrendingUp}
            gradient="from-chart-4 to-warning"
          />
        </div>

        {/* 销售趋势分析 */}
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">日趋势</TabsTrigger>
            <TabsTrigger value="weekly">周趋势</TabsTrigger>
            <TabsTrigger value="monthly">月趋势</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    今日销售明细
                  </CardTitle>
                  <CardDescription>实时销售数据统计</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">09:00-12:00</span>
                    <span className="font-semibold text-foreground">¥23,450</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">12:00-15:00</span>
                    <span className="font-semibold text-foreground">¥31,280</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">15:00-18:00</span>
                    <span className="font-semibold text-foreground">¥28,670</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="text-sm text-primary font-medium">18:00-至今</span>
                    <span className="font-semibold text-primary">¥6,032</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>周销售趋势</CardTitle>
                <CardDescription>过去7天的销售数据分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
                    <div key={day} className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">{day}</p>
                      <p className="font-semibold text-foreground">
                        ¥{(Math.random() * 50000 + 20000).toFixed(0)}
                      </p>
                      <div className={`text-xs mt-1 ${index % 2 === 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {index % 2 === 0 ? '+' : '-'}{(Math.random() * 10 + 2).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>月销售趋势</CardTitle>
                <CardDescription>过去12个月的销售数据分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['1月', '2月', '3月', '4月', '5月', '6月'].map((month, index) => (
                    <div key={month} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium">{month}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">¥{(Math.random() * 500000 + 200000).toFixed(0)}</p>
                        <p className={`text-xs ${index % 2 === 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {index % 2 === 0 ? '+' : '-'}{(Math.random() * 20 + 5).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 热销产品 */}
        <DataCard 
          title="热销产品排行"
          description={`${timeRangeConfig.label}销售排行榜`}
          onExport={() => exportToCSV(topProductsData, '热销产品排行')}
        >
          <div className="space-y-4">
            {topProductsData.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.orders} 笔订单 • {product.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="font-semibold text-foreground">{formatCurrency(product.sales)}</span>
                    <p className="text-xs text-muted-foreground">收入: {formatCurrency(product.revenue)}</p>
                  </div>
                  {product.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </DataCard>
      </div>
    </DashboardLayout>
  );
};

export default Sales;