// 统一的数据管理文件 - 确保各模块数据一致性

// 基础指标数据
export const baseMetrics = {
  totalSales: 2345678,
  totalUsers: 156890,
  newUsers: 2680,
  activeUsers: 14200,
  totalOrders: 567,
  conversionRate: 3.24,
  averageOrderValue: 456,
  userRetentionRate: 68.5,
  pageViews: 45672,
  onlineUsers: 8945
};

// 时间序列数据 - 销售趋势
export const salesTrendData = [
  { month: '1月', sales: 1850000, target: 2000000, profit: 320000 },
  { month: '2月', sales: 2100000, target: 2200000, profit: 380000 },
  { month: '3月', sales: 1950000, target: 2100000, profit: 350000 },
  { month: '4月', sales: 2250000, target: 2300000, profit: 420000 },
  { month: '5月', sales: 2400000, target: 2400000, profit: 450000 },
  { month: '6月', sales: 2345678, target: 2500000, profit: 435000 }
];

// 用户增长数据
export const userGrowthData = [
  { month: '1月', 新用户: 1200, 活跃用户: 8500, 留存用户: 7800 },
  { month: '2月', 新用户: 1580, 活跃用户: 9200, 留存用户: 8300 },
  { month: '3月', 新用户: 1890, 活跃用户: 10100, 留存用户: 9100 },
  { month: '4月', 新用户: 2100, 活跃用户: 11500, 留存用户: 10200 },
  { month: '5月', 新用户: 2380, 活跃用户: 12800, 留存用户: 11600 },
  { month: '6月', 新用户: 2680, 活跃用户: 14200, 留存用户: 13100 }
];

// 用户分布数据
export const userDistributionData = [
  { name: '新用户', value: 35, fill: 'hsl(var(--chart-1))' },
  { name: '活跃用户', value: 45, fill: 'hsl(var(--chart-2))' },
  { name: '回流用户', value: 15, fill: 'hsl(var(--chart-3))' },
  { name: '流失用户', value: 5, fill: 'hsl(var(--chart-4))' }
];

// 产品收入数据
export const revenueData = [
  { category: '电子产品', revenue: 850000, cost: 520000, profit: 330000 },
  { category: '服装配饰', revenue: 620000, cost: 380000, profit: 240000 },
  { category: '家居用品', revenue: 450000, cost: 290000, profit: 160000 },
  { category: '运动健身', revenue: 380000, cost: 240000, profit: 140000 },
  { category: '美妆护肤', revenue: 320000, cost: 200000, profit: 120000 },
  { category: '图书文具', revenue: 180000, cost: 120000, profit: 60000 }
];

// 流量数据
export const trafficData = [
  { time: '00:00', visitors: 1200, pageViews: 3600 },
  { time: '02:00', visitors: 800, pageViews: 2400 },
  { time: '04:00', visitors: 600, pageViews: 1800 },
  { time: '06:00', visitors: 1800, pageViews: 5400 },
  { time: '08:00', visitors: 4200, pageViews: 12600 },
  { time: '10:00', visitors: 5800, pageViews: 17400 },
  { time: '12:00', visitors: 6900, pageViews: 20700 },
  { time: '14:00', visitors: 7200, pageViews: 21600 },
  { time: '16:00', visitors: 6800, pageViews: 20400 },
  { time: '18:00', visitors: 8200, pageViews: 24600 },
  { time: '20:00', visitors: 9100, pageViews: 27300 },
  { time: '22:00', visitors: 7800, pageViews: 23400 }
];

// 地理分布数据
export const geographicData = [
  { region: '华东地区', users: 45230, orders: 12560, revenue: 8520000 },
  { region: '华南地区', users: 38920, orders: 10840, revenue: 7380000 },
  { region: '华北地区', users: 42150, orders: 11230, revenue: 7950000 },
  { region: '华中地区', users: 28690, orders: 7890, revenue: 5420000 },
  { region: '西南地区', users: 22340, orders: 6120, revenue: 4280000 },
  { region: '东北地区', users: 18760, orders: 5180, revenue: 3650000 },
  { region: '西北地区', users: 15280, orders: 4220, revenue: 2980000 }
];

// 热销产品数据
export const topProductsData = [
  { 
    name: '智能手机Pro', 
    sales: 45230, 
    orders: 89, 
    trend: 'up' as const,
    category: '电子产品',
    revenue: 2260000
  },
  { 
    name: '无线耳机', 
    sales: 32150, 
    orders: 67, 
    trend: 'up' as const,
    category: '电子产品',
    revenue: 965000
  },
  { 
    name: '平板电脑', 
    sales: 28900, 
    orders: 34, 
    trend: 'down' as const,
    category: '电子产品',
    revenue: 1850000
  },
  { 
    name: '智能手表', 
    sales: 25670, 
    orders: 56, 
    trend: 'up' as const,
    category: '电子产品',
    revenue: 1280000
  },
  { 
    name: '蓝牙音箱', 
    sales: 18450, 
    orders: 78, 
    trend: 'up' as const,
    category: '电子产品',
    revenue: 560000
  }
];

// 年龄分布数据
export const ageDistributionData = [
  { name: '18-25岁', value: 2800, fill: 'hsl(var(--chart-1))' },
  { name: '26-35岁', value: 4200, fill: 'hsl(var(--chart-2))' },
  { name: '36-45岁', value: 3100, fill: 'hsl(var(--chart-3))' },
  { name: '46-55岁', value: 1800, fill: 'hsl(var(--chart-4))' },
  { name: '55岁以上', value: 900, fill: 'hsl(var(--chart-5))' }
];

// 用户行为数据
export const userBehaviorData = [
  { action: '登录', 次数: 15420, 占比: '28%' },
  { action: '浏览商品', 次数: 12350, 占比: '22%' },
  { action: '搜索', 次数: 8900, 占比: '16%' },
  { action: '加入购物车', 次数: 6780, 占比: '12%' },
  { action: '下单', 次数: 4560, 占比: '8%' },
  { action: '支付', 次数: 4200, 占比: '7%' },
  { action: '评价', 次数: 2890, 占比: '5%' },
  { action: '分享', 次数: 1200, 占比: '2%' }
];

// 用户留存数据
export const retentionData = [
  { day: 'Day 1', 留存率: 85 },
  { day: 'Day 3', 留存率: 72 },
  { day: 'Day 7', 留存率: 58 },
  { day: 'Day 14', 留存率: 45 },
  { day: 'Day 30', 留存率: 32 },
  { day: 'Day 60', 留存率: 28 },
  { day: 'Day 90', 留存率: 25 }
];

// 实时数据
export const realtimeData = {
  systemStatus: {
    cpu: 68,
    memory: 72,
    disk: 45,
    network: 234
  },
  activeAlerts: [
    { id: 1, type: 'warning', message: 'CPU使用率较高', time: '2分钟前' },
    { id: 2, type: 'info', message: '新用户注册数量激增', time: '5分钟前' },
    { id: 3, type: 'error', message: '支付接口响应超时', time: '8分钟前' }
  ],
  performanceMetrics: [
    { metric: 'API响应时间', value: 235, unit: 'ms', status: 'good' },
    { metric: '数据库查询', value: 45, unit: 'ms', status: 'excellent' },
    { metric: '页面加载', value: 1.2, unit: 's', status: 'good' },
    { metric: '错误率', value: 0.02, unit: '%', status: 'excellent' }
  ]
};

// 计算变化率的工具函数
export function calculateChange(current: number, previous: number): { 
  value: string; 
  type: 'positive' | 'negative' | 'neutral' 
} {
  if (previous === 0) return { value: '+0.0%', type: 'neutral' };
  
  const change = ((current - previous) / previous) * 100;
  const type = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
  const value = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  
  return { value, type };
}

// 格式化数字的工具函数
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// 格式化货币的工具函数
export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}