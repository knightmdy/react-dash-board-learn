import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MobileSidebar } from './MobileSidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Download,
  UserCircle,
  Shield,
  HelpCircle
} from 'lucide-react';

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  const navigate = useNavigate();

  const handleProfileView = () => {
    // 这里可以打开个人资料模态框或跳转到个人资料页面
    console.log('查看个人资料');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleLogout = () => {
    // 这里可以添加登出逻辑
    console.log('退出登录');
  };

  return (
    <header className="h-16 bg-card border-b border-border px-3 sm:px-6 flex items-center justify-between">
      {/* Mobile sidebar and Title */}
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
        <MobileSidebar />
        <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">{title}</h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search - 在小屏幕上隐藏或缩小 */}
        <div className="relative w-32 sm:w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索数据..."
            className="pl-10 w-full"
          />
        </div>

        {/* 移动端搜索按钮 */}
        <Button variant="outline" size="icon" className="md:hidden">
          <Search className="h-4 w-4" />
        </Button>

        {/* Export Button - 小屏幕隐藏文字 */}
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <Download className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">导出数据</span>
        </Button>

        {/* Notifications with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                3
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-3">通知中心</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">新用户注册</p>
                    <p className="text-xs text-muted-foreground">张三刚刚注册了账户</p>
                    <p className="text-xs text-muted-foreground">2分钟前</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                  <div className="h-2 w-2 bg-warning rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">销售目标提醒</p>
                    <p className="text-xs text-muted-foreground">本月销售额已达成80%</p>
                    <p className="text-xs text-muted-foreground">1小时前</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                  <div className="h-2 w-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">系统更新</p>
                    <p className="text-xs text-muted-foreground">数据分析模块已更新</p>
                    <p className="text-xs text-muted-foreground">3小时前</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                查看全部通知
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu with Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="用户头像" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  管理
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-0" align="end" sideOffset={8}>
            {/* 用户信息头部 */}
            <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="用户头像" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg">
                    管理
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">管理员</p>
                  <p className="text-xs text-muted-foreground">admin@dashboard.com</p>
                  <p className="text-xs text-muted-foreground">超级管理员</p>
                </div>
              </div>
            </div>
            
            <div className="py-2">
              <DropdownMenuItem onClick={handleProfileView} className="px-4 py-2">
                <UserCircle className="mr-3 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">个人资料</p>
                  <p className="text-xs text-muted-foreground">查看和编辑个人信息</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="px-4 py-2">
                <Shield className="mr-3 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">账户安全</p>
                  <p className="text-xs text-muted-foreground">密码和安全设置</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleSettings} className="px-4 py-2">
                <Settings className="mr-3 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">系统设置</p>
                  <p className="text-xs text-muted-foreground">配置系统参数</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="px-4 py-2">
                <HelpCircle className="mr-3 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">帮助中心</p>
                  <p className="text-xs text-muted-foreground">使用帮助和支持</p>
                </div>
              </DropdownMenuItem>
            </div>
            
            <DropdownMenuSeparator />
            
            <div className="py-2">
              <DropdownMenuItem onClick={handleLogout} className="px-4 py-2 text-destructive focus:text-destructive">
                <LogOut className="mr-3 h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}