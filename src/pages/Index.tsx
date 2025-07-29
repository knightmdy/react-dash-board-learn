import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/common/MetricCard';
import { SalesChart } from '@/components/charts/SalesChart';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { UserDistributionChart } from '@/components/charts/UserDistributionChart';
import { TrafficChart } from '@/components/charts/TrafficChart';
import { baseMetrics, calculateChange, formatCurrency } from '@/data/dashboardData';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Eye
} from 'lucide-react';

const Index = () => {
  // 模拟历史数据计算变化率
  const salesChange = calculateChange(baseMetrics.totalSales, 2080000);
  const usersChange = calculateChange(baseMetrics.newUsers, 2470);
  const ordersChange = calculateChange(baseMetrics.totalOrders, 580);
  const conversionChange = calculateChange(baseMetrics.conversionRate, 3.19);

  return (
    <DashboardLayout title="总览仪表盘">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="总销售额"
            value={formatCurrency(baseMetrics.totalSales)}
            change={salesChange}
            description="较上月"
            icon={DollarSign}
            gradient="from-chart-1 to-primary-glow"
          />
          <MetricCard
            title="新用户"
            value={baseMetrics.newUsers.toLocaleString()}
            change={usersChange}
            description="较上周"
            icon={Users}
            gradient="from-chart-2 to-accent"
          />
          <MetricCard
            title="订单量"
            value={baseMetrics.totalOrders}
            change={ordersChange}
            description="较昨日"
            icon={ShoppingCart}
            gradient="from-chart-3 to-success"
          />
          <MetricCard
            title="转化率"
            value={`${baseMetrics.conversionRate}%`}
            change={conversionChange}
            description="较上月"
            icon={TrendingUp}
            gradient="from-chart-4 to-warning"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SalesChart />
          <UserDistributionChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrafficChart />
          <RevenueChart />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="页面浏览量"
            value={baseMetrics.pageViews.toLocaleString()}
            change={calculateChange(baseMetrics.pageViews, 39600)}
            description="今日"
            icon={Eye}
            gradient="from-chart-5 to-chart-6"
          />
          <MetricCard
            title="活跃用户"
            value={baseMetrics.onlineUsers.toLocaleString()}
            change={calculateChange(baseMetrics.onlineUsers, 8460)}
            description="在线"
            icon={Activity}
            gradient="from-accent to-chart-2"
          />
          <MetricCard
            title="平均订单价值"
            value={formatCurrency(baseMetrics.averageOrderValue)}
            change={calculateChange(baseMetrics.averageOrderValue, 441)}
            description="较上月"
            icon={DollarSign}
            gradient="from-success to-chart-3"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
