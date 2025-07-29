import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Globe,
  Settings,
  Home,
  Users,
  FileText
} from 'lucide-react';

const navigation = [
  { name: '总览', href: '/', icon: Home },
  { name: '销售数据', href: '/sales', icon: TrendingUp },
  { name: '用户分析', href: '/users', icon: Users },
  { name: '图表展示', href: '/charts', icon: BarChart3 },
  { name: '地理分布', href: '/geographic', icon: Globe },
  { name: '实时监控', href: '/realtime', icon: Activity },
  { name: '报表管理', href: '/reports', icon: FileText },
  { name: '系统设置', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <PieChart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">数据仪表盘</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              管理员
            </p>
            <p className="text-xs text-muted-foreground truncate">
              admin@dashboard.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}