import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DataCard } from '@/components/common/DataCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Database,
  Palette,
  Globe,
  Shield,
  Mail,
  Save
} from 'lucide-react';

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // 系统设置状态
  const [systemSettings, setSystemSettings] = useState({
    siteName: '数据仪表盘',
    siteDescription: '企业级数据分析平台',
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    theme: 'light'
  });

  // 通知设置状态
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    reportReminders: true,
    alertThreshold: 80
  });

  // 安全设置状态
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  });

  // 数据设置状态
  const [dataSettings, setDataSettings] = useState({
    dataRetention: 365,
    autoBackup: true,
    backupFrequency: 'daily',
    exportFormat: 'json'
  });

  const handleSaveSettings = async (section: string) => {
    setLoading(true);
    try {
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "设置已保存",
        description: `${section}设置已成功更新`,
      });
    } catch (error) {
      toast({
        title: "保存失败",
        description: "设置保存过程中发生错误",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="系统设置">
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">系统设置</h2>
            <p className="text-muted-foreground mt-1">管理和配置系统参数</p>
          </div>
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {/* 设置面板 */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">常规设置</TabsTrigger>
            <TabsTrigger value="notifications">通知设置</TabsTrigger>
            <TabsTrigger value="security">安全设置</TabsTrigger>
            <TabsTrigger value="data">数据管理</TabsTrigger>
            <TabsTrigger value="appearance">外观设置</TabsTrigger>
          </TabsList>

          {/* 常规设置 */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataCard 
                title="基本信息" 
                description="系统基本配置信息"
                onExport={() => handleSaveSettings('基本信息')}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">站点名称</Label>
                    <Input
                      id="siteName"
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">站点描述</Label>
                    <Textarea
                      id="siteDescription"
                      value={systemSettings.siteDescription}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">系统语言</Label>
                    <Select value={systemSettings.language} onValueChange={(value) => 
                      setSystemSettings(prev => ({ ...prev, language: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                        <SelectItem value="ja-JP">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">时区设置</Label>
                    <Select value={systemSettings.timezone} onValueChange={(value) => 
                      setSystemSettings(prev => ({ ...prev, timezone: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">北京时间 (UTC+8)</SelectItem>
                        <SelectItem value="America/New_York">纽约时间 (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">伦敦时间 (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={() => handleSaveSettings('基本信息')} disabled={loading} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? '保存中...' : '保存设置'}
                  </Button>
                </div>
              </DataCard>

              <DataCard title="系统状态" description="当前系统运行状态">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">系统版本</span>
                    <span className="text-sm font-medium">v2.1.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">运行时间</span>
                    <span className="text-sm font-medium">23天 14小时</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">数据库状态</span>
                    <span className="text-sm font-medium text-success">正常</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">最后备份</span>
                    <span className="text-sm font-medium">2小时前</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    系统诊断
                  </Button>
                </div>
              </DataCard>
            </div>
          </TabsContent>

          {/* 通知设置 */}
          <TabsContent value="notifications">
            <DataCard 
              title="通知设置" 
              description="配置系统通知和提醒方式"
              onExport={() => handleSaveSettings('通知设置')}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">邮件通知</Label>
                      <p className="text-sm text-muted-foreground">接收重要事件的邮件通知</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">推送通知</Label>
                      <p className="text-sm text-muted-foreground">浏览器推送通知</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">报表提醒</Label>
                      <p className="text-sm text-muted-foreground">定时报表生成完成提醒</p>
                    </div>
                    <Switch
                      checked={notificationSettings.reportReminders}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, reportReminders: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alertThreshold">告警阈值 (%)</Label>
                  <Input
                    id="alertThreshold"
                    type="number"
                    value={notificationSettings.alertThreshold}
                    onChange={(e) => setNotificationSettings(prev => ({ 
                      ...prev, 
                      alertThreshold: parseInt(e.target.value) 
                    }))}
                  />
                  <p className="text-xs text-muted-foreground">系统指标超过此阈值时发送告警</p>
                </div>

                <Button onClick={() => handleSaveSettings('通知设置')} disabled={loading} className="w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  {loading ? '保存中...' : '保存通知设置'}
                </Button>
              </div>
            </DataCard>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security">
            <DataCard 
              title="安全设置" 
              description="系统安全和访问控制配置"
              onExport={() => handleSaveSettings('安全设置')}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">双因素认证</Label>
                    <p className="text-sm text-muted-foreground">启用额外的安全验证</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">会话超时 (分钟)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ 
                        ...prev, 
                        sessionTimeout: parseInt(e.target.value) 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">最大登录尝试次数</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ 
                        ...prev, 
                        loginAttempts: parseInt(e.target.value) 
                      }))}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSaveSettings('安全设置')} disabled={loading} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  {loading ? '保存中...' : '保存安全设置'}
                </Button>
              </div>
            </DataCard>
          </TabsContent>

          {/* 数据管理 */}
          <TabsContent value="data">
            <DataCard 
              title="数据管理" 
              description="数据存储和备份配置"
              onExport={() => handleSaveSettings('数据管理')}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">数据保留期 (天)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={dataSettings.dataRetention}
                    onChange={(e) => setDataSettings(prev => ({ 
                      ...prev, 
                      dataRetention: parseInt(e.target.value) 
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">自动备份</Label>
                    <p className="text-sm text-muted-foreground">定期自动备份系统数据</p>
                  </div>
                  <Switch
                    checked={dataSettings.autoBackup}
                    onCheckedChange={(checked) => 
                      setDataSettings(prev => ({ ...prev, autoBackup: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">备份频率</Label>
                  <Select value={dataSettings.backupFrequency} onValueChange={(value) => 
                    setDataSettings(prev => ({ ...prev, backupFrequency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">每小时</SelectItem>
                      <SelectItem value="daily">每日</SelectItem>
                      <SelectItem value="weekly">每周</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={() => handleSaveSettings('数据管理')} disabled={loading} className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  {loading ? '保存中...' : '保存数据设置'}
                </Button>
              </div>
            </DataCard>
          </TabsContent>

          {/* 外观设置 */}
          <TabsContent value="appearance">
            <DataCard 
              title="外观设置" 
              description="自定义系统界面外观"
              onExport={() => handleSaveSettings('外观设置')}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">主题模式</Label>
                  <Select value={systemSettings.theme} onValueChange={(value) => 
                    setSystemSettings(prev => ({ ...prev, theme: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">浅色模式</SelectItem>
                      <SelectItem value="dark">深色模式</SelectItem>
                      <SelectItem value="auto">跟随系统</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">主题色预览</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {['primary', 'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'].map((color) => (
                      <div
                        key={color}
                        className={`h-12 rounded-lg bg-${color} border-2 border-transparent hover:border-foreground cursor-pointer transition-all`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <Button onClick={() => handleSaveSettings('外观设置')} disabled={loading} className="w-full">
                  <Palette className="h-4 w-4 mr-2" />
                  {loading ? '保存中...' : '保存外观设置'}
                </Button>
              </div>
            </DataCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}