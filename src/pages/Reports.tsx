import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DataCard } from '@/components/common/DataCard';
import { MetricCard } from '@/components/common/MetricCard';
import { TimeRangeSelector } from '@/components/common/TimeRangeSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTimeRange } from '@/hooks/useTimeRange';
import { useDataExport } from '@/hooks/useDataExport';
import { baseMetrics, salesTrendData, userGrowthData, formatCurrency } from '@/data/dashboardData';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';

const reportTemplates = [
  {
    id: 1,
    name: '销售月报',
    description: '月度销售数据汇总分析',
    type: 'sales',
    frequency: '月度',
    lastGenerated: '2024-01-15',
    status: 'completed',
    size: '2.3MB'
  },
  {
    id: 2,
    name: '用户行为分析报告',
    description: '用户访问和行为数据深度分析',
    type: 'user',
    frequency: '周度',
    lastGenerated: '2024-01-22',
    status: 'generating',
    size: '1.8MB'
  },
  {
    id: 3,
    name: '财务数据报表',
    description: '收入、成本、利润综合分析',
    type: 'finance',
    frequency: '季度',
    lastGenerated: '2024-01-01',
    status: 'completed',
    size: '3.2MB'
  },
  {
    id: 4,
    name: '产品销售排行',
    description: '产品销售业绩排行榜',
    type: 'product',
    frequency: '日度',
    lastGenerated: '2024-01-25',
    status: 'completed',
    size: '1.1MB'
  }
];

const scheduledReports = [
  { name: '每日运营简报', time: '09:00', recipients: 5, status: 'active' },
  { name: '周销售汇总', time: '周一 10:00', recipients: 8, status: 'active' },
  { name: '月度业务分析', time: '每月1日 14:00', recipients: 12, status: 'active' },
  { name: '季度财务报告', time: '季末最后一天', recipients: 6, status: 'paused' }
];

export default function Reports() {
  const { selectedRange, timeRangeConfig, setTimeRange, setCustomDateRange } = useTimeRange();
  const { exportToJSON, exportToCSV, isExporting } = useDataExport();
  const [activeTab, setActiveTab] = useState('templates');

  const handleGenerateReport = (reportId: number) => {
    const report = reportTemplates.find(r => r.id === reportId);
    if (report) {
      const reportData = {
        报告名称: report.name,
        生成时间: new Date().toLocaleString(),
        数据范围: timeRangeConfig.label,
        销售数据: salesTrendData,
        用户数据: userGrowthData,
        核心指标: baseMetrics
      };
      exportToJSON(reportData, report.name);
    }
  };

  return (
    <DashboardLayout title="报表管理">
      <div className="space-y-6">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-foreground">报表中心</h2>
            <TimeRangeSelector
              selectedRange={selectedRange}
              onRangeChange={setTimeRange}
              onCustomDateRange={setCustomDateRange}
            />
          </div>
          <Button onClick={() => handleGenerateReport(1)} disabled={isExporting}>
            <FileText className="h-4 w-4 mr-2" />
            {isExporting ? '生成中...' : '新建报表'}
          </Button>
        </div>

        {/* 核心指标概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="已生成报表"
            value="156"
            change={{ value: '+12', type: 'positive' }}
            description="本月"
            icon={FileText}
            gradient="from-chart-1 to-primary-glow"
          />
          <MetricCard
            title="报表下载量"
            value="2,340"
            change={{ value: '+18.5%', type: 'positive' }}
            description="较上月"
            icon={Download}
            gradient="from-chart-2 to-accent"
          />
          <MetricCard
            title="定时报表"
            value="8"
            change={{ value: '+2', type: 'positive' }}
            description="活跃任务"
            icon={Clock}
            gradient="from-chart-3 to-success"
          />
          <MetricCard
            title="报表完成率"
            value="98.5%"
            change={{ value: '+0.3%', type: 'positive' }}
            description="系统稳定性"
            icon={CheckCircle}
            gradient="from-chart-4 to-warning"
          />
        </div>

        {/* 报表管理 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">报表模板</TabsTrigger>
            <TabsTrigger value="scheduled">定时报表</TabsTrigger>
            <TabsTrigger value="history">历史记录</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reportTemplates.map((template) => (
                <DataCard 
                  key={template.id}
                  title={template.name}
                  description={template.description}
                  onExport={() => handleGenerateReport(template.id)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={template.type === 'sales' ? 'default' : 'secondary'}>
                          {template.frequency}
                        </Badge>
                        <Badge 
                          variant={template.status === 'completed' ? 'default' : 'secondary'}
                          className={template.status === 'generating' ? 'animate-pulse' : ''}
                        >
                          {template.status === 'completed' ? '已完成' : '生成中'}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{template.size}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">最后生成:</span>
                        <span className="text-foreground">{template.lastGenerated}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">报表类型:</span>
                        <span className="text-foreground">
                          {template.type === 'sales' && '销售分析'}
                          {template.type === 'user' && '用户分析'}
                          {template.type === 'finance' && '财务分析'}
                          {template.type === 'product' && '产品分析'}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleGenerateReport(template.id)}
                        disabled={template.status === 'generating'}
                      >
                        {template.status === 'generating' ? '生成中...' : '立即生成'}
                      </Button>
                      <Button size="sm" variant="outline">
                        预览
                      </Button>
                    </div>
                  </div>
                </DataCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <DataCard title="定时报表任务" description="自动生成和发送的报表任务">
              <div className="space-y-4">
                {scheduledReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.time} • {report.recipients} 个收件人
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                        {report.status === 'active' ? '运行中' : '已暂停'}
                      </Badge>
                      <Button size="sm" variant="outline">
                        编辑
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DataCard>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <DataCard 
              title="报表生成历史" 
              description={`${timeRangeConfig.label}的报表生成记录`}
              onExport={() => exportToCSV(reportTemplates, '报表历史记录')}
            >
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{template.name}</p>
                        <p className="text-sm text-muted-foreground">生成于 {template.lastGenerated}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{template.size}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DataCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}