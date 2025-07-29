# 智能数据分析仪表板

一个基于 React + TypeScript + Tailwind CSS 的现代化数据分析仪表板系统，提供全面的数据可视化和实时监控功能。

## 🚀 在线演示

访问地址：https://knightmdy.github.io/react-dash-board-learn/

## 🚀 项目特色

- **现代化技术栈**: React 18, TypeScript, Vite, Tailwind CSS
- **完全响应式**: 移动优先设计，完美适配所有设备尺寸
- **数据可视化**: 基于 Recharts 的丰富交互式图表
- **实时监控**: 系统状态和性能实时监控
- **模块化架构**: 清晰的代码结构和组件复用
- **用户体验**: 现代化UI设计，支持深色/浅色主题
- **国际化支持**: 中文界面和本地化数据处理

## 📱 响应式设计

项目采用移动优先的响应式设计策略：

### 断点设计
- **移动端** (< 768px): 单列布局，抽屉式侧边栏
- **平板端** (768px - 1024px): 双列布局，可折叠侧边栏  
- **桌面端** (> 1024px): 多列布局，完整功能展示

### 关键响应式功能
- **智能导航**: 桌面显示完整侧边栏，移动端使用Sheet抽屉
- **自适应搜索**: 大屏显示搜索框，小屏显示搜索按钮
- **弹层优化**: 使用Popover组件避免下拉菜单重叠
- **内容自适应**: 图表和表格在不同屏幕尺寸下智能调整
- **触摸优化**: 移动端优化的交互体验和手势支持

## 📊 功能模块

### 1. 总览仪表板 (/)
- 核心业务指标展示
- 实时数据统计
- 趋势分析图表
- 快速操作入口

### 2. 销售分析 (/sales)
- 销售数据可视化
- 销售趋势分析
- 产品销售排行
- 区域销售对比

### 3. 用户管理 (/users)
- 用户数据统计
- 用户行为分析
- 用户增长趋势
- 用户分布图表

### 4. 图表分析 (/charts)
- 多维度数据图表
- 自定义图表配置
- 数据导出功能
- 交互式图表操作

### 5. 地理分析 (/geographic)
- 地理位置数据可视化
- 区域数据分析
- 热力图展示
- 地理趋势分析

### 6. 实时监控 (/realtime)
- 系统状态监控
- 性能指标实时展示
- 事件日志记录
- 告警管理系统

### 7. 报表管理 (/reports)
- 报表生成和导出
- 自定义报表配置
- 历史报表查看
- 报表分享功能

### 8. 系统设置 (/settings)
- 系统配置管理
- 用户偏好设置
- 主题切换
- 数据源配置

## 🏗️ 项目结构

```
src/
├── components/          # 组件库
│   ├── ui/             # 基础UI组件 (shadcn/ui)
│   │   ├── button.tsx  # 按钮组件
│   │   ├── avatar.tsx  # 头像组件  
│   │   ├── popover.tsx # 弹出层组件
│   │   ├── sheet.tsx   # 抽屉组件
│   │   └── ...         # 其他UI组件
│   ├── common/         # 通用业务组件
│   │   ├── MetricCard.tsx      # 指标卡片
│   │   ├── DataCard.tsx        # 数据卡片
│   │   └── TimeRangeSelector.tsx # 时间选择器
│   ├── charts/         # 图表组件
│   │   ├── SalesChart.tsx      # 销售图表
│   │   ├── UserDistributionChart.tsx # 用户分布图
│   │   └── ...         # 其他图表组件
│   └── dashboard/      # 仪表板布局组件
│       ├── Sidebar.tsx         # 桌面端侧边栏
│       ├── MobileSidebar.tsx   # 移动端抽屉导航
│       ├── TopBar.tsx          # 响应式顶部导航
│       └── DashboardLayout.tsx # 自适应布局容器
├── pages/              # 页面组件
│   ├── Index.tsx       # 首页总览
│   ├── Sales.tsx       # 销售数据页
│   ├── Settings.tsx    # 系统设置页
│   └── ...            # 其他功能页面
├── hooks/              # 自定义Hooks
│   ├── useTimeRange.ts # 时间范围Hook
│   ├── useDataExport.ts # 数据导出Hook
│   └── use-toast.ts    # Toast通知Hook
├── data/               # 数据源和模拟数据
│   └── dashboardData.ts # 统一数据源
├── lib/                # 工具函数库
│   └── utils.ts        # 通用工具函数
└── index.css           # 设计系统和全局样式
```

### 组件设计原则

1. **响应式优先**: 所有组件都支持多屏幕尺寸
2. **无障碍访问**: 遵循ARIA标准，支持键盘导航
3. **性能优化**: 懒加载和代码分割
4. **主题一致**: 基于设计令牌的一致性设计
5. **类型安全**: 完整的TypeScript类型定义

## 🔌 API 接口规范

### 基础配置
- **Base URL**: `https://api.yourdomain.com/v1`
- **认证方式**: Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

### 核心接口

#### 1. 仪表板数据
```typescript
GET /dashboard/overview
Response: {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  trends: Array<{date: string, value: number}>;
}
```

#### 2. 销售数据
```typescript
GET /sales/analytics?period=7d|30d|90d
Response: {
  totalSales: number;
  salesGrowth: number;
  topProducts: Array<{name: string, sales: number}>;
  salesChart: Array<{date: string, sales: number}>;
}
```

#### 3. 用户数据
```typescript
GET /users/analytics
Response: {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: Array<{date: string, users: number}>;
  userDistribution: Array<{region: string, count: number}>;
}
```

#### 4. 实时监控
```typescript
GET /monitoring/realtime
Response: {
  systemStatus: "healthy" | "warning" | "error";
  cpuUsage: number;
  memoryUsage: number;
  activeConnections: number;
  responseTime: number;
}
```

## 🛠️ 本地开发

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:8080

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🔧 Node.js Express 后端开发指南

### 项目架构结构
```
backend/
├── src/
│   ├── controllers/         # 控制器层
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── salesController.js
│   │   ├── userController.js
│   │   ├── chartController.js
│   │   ├── geographicController.js
│   │   ├── monitoringController.js
│   │   ├── reportController.js
│   │   └── settingController.js
│   ├── services/           # 服务层
│   │   ├── authService.js
│   │   ├── dashboardService.js
│   │   ├── salesService.js
│   │   ├── userService.js
│   │   ├── chartService.js
│   │   ├── geographicService.js
│   │   ├── monitoringService.js
│   │   ├── reportService.js
│   │   └── settingService.js
│   ├── routes/             # 路由层
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── sales.js
│   │   ├── users.js
│   │   ├── charts.js
│   │   ├── geographic.js
│   │   ├── monitoring.js
│   │   ├── reports.js
│   │   └── settings.js
│   ├── middleware/         # 中间件层
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── rateLimit.js
│   │   ├── cors.js
│   │   ├── logger.js
│   │   └── errorHandler.js
│   ├── models/             # 数据模型
│   │   ├── User.js
│   │   ├── Sale.js
│   │   ├── Product.js
│   │   ├── SystemMetric.js
│   │   ├── Report.js
│   │   └── Setting.js
│   ├── utils/              # 工具函数
│   │   ├── database.js
│   │   ├── validation.js
│   │   ├── jwt.js
│   │   ├── email.js
│   │   └── helper.js
│   └── config/             # 配置文件
│       ├── database.js
│       ├── server.js
│       └── constants.js
├── migrations/             # 数据库迁移
├── seeds/                  # 初始数据
├── tests/                  # 测试文件
├── package.json
├── .env.example
└── app.js                  # 应用入口
```

### 详细函数名称和功能

#### 1. 控制器层 (Controllers)

**authController.js**
```javascript
exports.login = async (req, res) => {} // 用户登录
exports.register = async (req, res) => {} // 用户注册
exports.logout = async (req, res) => {} // 用户登出
exports.refreshToken = async (req, res) => {} // 刷新Token
exports.forgotPassword = async (req, res) => {} // 忘记密码
exports.resetPassword = async (req, res) => {} // 重置密码
exports.verifyEmail = async (req, res) => {} // 邮箱验证
exports.profile = async (req, res) => {} // 获取用户信息
```

**dashboardController.js**
```javascript
exports.getOverview = async (req, res) => {} // 获取仪表板概览
exports.getRealtimeData = async (req, res) => {} // 获取实时数据
exports.getMetrics = async (req, res) => {} // 获取关键指标
exports.getTrends = async (req, res) => {} // 获取趋势数据
exports.getKPIs = async (req, res) => {} // 获取KPI数据
```

**salesController.js**
```javascript
exports.getSalesAnalytics = async (req, res) => {} // 销售分析数据
exports.getSalesChart = async (req, res) => {} // 销售图表数据
exports.getTopProducts = async (req, res) => {} // 热销产品
exports.getSalesByRegion = async (req, res) => {} // 按地区销售
exports.getSalesByCategory = async (req, res) => {} // 按分类销售
exports.getSalesGrowth = async (req, res) => {} // 销售增长
exports.exportSalesData = async (req, res) => {} // 导出销售数据
```

**userController.js**
```javascript
exports.getUserAnalytics = async (req, res) => {} // 用户分析数据
exports.getUserList = async (req, res) => {} // 用户列表
exports.getUserDetail = async (req, res) => {} // 用户详情
exports.getUserGrowth = async (req, res) => {} // 用户增长
exports.getUserDistribution = async (req, res) => {} // 用户分布
exports.getUserBehavior = async (req, res) => {} // 用户行为
exports.getUserRetention = async (req, res) => {} // 用户留存
exports.updateUser = async (req, res) => {} // 更新用户
exports.deleteUser = async (req, res) => {} // 删除用户
```

**chartController.js**
```javascript
exports.getRevenueChart = async (req, res) => {} // 收入图表
exports.getUserChart = async (req, res) => {} // 用户图表
exports.getTrafficChart = async (req, res) => {} // 流量图表
exports.getConversionChart = async (req, res) => {} // 转化图表
exports.getPerformanceChart = async (req, res) => {} // 性能图表
exports.getCustomChart = async (req, res) => {} // 自定义图表
```

**monitoringController.js**
```javascript
exports.getSystemStatus = async (req, res) => {} // 系统状态
exports.getPerformanceMetrics = async (req, res) => {} // 性能指标
exports.getServerHealth = async (req, res) => {} // 服务器健康
exports.getErrorLogs = async (req, res) => {} // 错误日志
exports.getAlerts = async (req, res) => {} // 告警信息
exports.createAlert = async (req, res) => {} // 创建告警
```

#### 2. 服务层 (Services)

**dashboardService.js**
```javascript
exports.calculateOverviewStats = async (period) => {} // 计算概览统计
exports.getRealtimeMetrics = async () => {} // 获取实时指标
exports.aggregateData = async (type, filters) => {} // 聚合数据
exports.calculateGrowthRate = (current, previous) => {} // 计算增长率
exports.generateTrendData = async (metric, period) => {} // 生成趋势数据
```

**salesService.js**
```javascript
exports.calculateSalesMetrics = async (period, filters) => {} // 计算销售指标
exports.getProductRanking = async (period, limit) => {} // 产品排行
exports.analyzeSalesTrend = async (period) => {} // 销售趋势分析
exports.calculateConversionRate = async (period) => {} // 转化率计算
exports.generateSalesReport = async (options) => {} // 生成销售报表
```

**userService.js**
```javascript
exports.calculateUserMetrics = async (period) => {} // 用户指标计算
exports.analyzeUserBehavior = async (userId, period) => {} // 用户行为分析
exports.calculateRetentionRate = async (cohort) => {} // 留存率计算
exports.segmentUsers = async (criteria) => {} // 用户分群
exports.predictUserValue = async (userId) => {} // 用户价值预测
```

#### 3. 路由层 (Routes)

**dashboard.js**
```javascript
router.get('/overview', dashboardController.getOverview) // 概览数据
router.get('/realtime', dashboardController.getRealtimeData) // 实时数据
router.get('/metrics', dashboardController.getMetrics) // 指标数据
router.get('/trends', dashboardController.getTrends) // 趋势数据
```

**sales.js**
```javascript
router.get('/analytics', salesController.getSalesAnalytics) // 销售分析
router.get('/chart', salesController.getSalesChart) // 销售图表
router.get('/products/top', salesController.getTopProducts) // 热销产品
router.get('/regions', salesController.getSalesByRegion) // 地区销售
router.post('/export', salesController.exportSalesData) // 导出数据
```

#### 4. 中间件层 (Middleware)

**auth.js**
```javascript
exports.authenticateToken = (req, res, next) => {} // Token验证
exports.authorizeRole = (roles) => {} // 角色授权
exports.refreshTokenHandler = (req, res, next) => {} // Token刷新
```

**validation.js**
```javascript
exports.validateLogin = (req, res, next) => {} // 登录验证
exports.validateRegistration = (req, res, next) => {} // 注册验证
exports.validateQuery = (schema) => {} // 查询参数验证
exports.validateBody = (schema) => {} // 请求体验证
```

### 数据库表结构设计

#### 1. 用户相关表

**users 表**
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  avatar_url VARCHAR(255),
  phone VARCHAR(20),
  role ENUM('admin', 'manager', 'user') DEFAULT 'user',
  status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

**user_profiles 表**
```sql
CREATE TABLE user_profiles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  company VARCHAR(100),
  department VARCHAR(50),
  position VARCHAR(50),
  location VARCHAR(100),
  timezone VARCHAR(50) DEFAULT 'Asia/Shanghai',
  language VARCHAR(10) DEFAULT 'zh-CN',
  preferences JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);
```

#### 2. 产品和销售表

**products 表**
```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category_id BIGINT,
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2),
  sku VARCHAR(50) UNIQUE,
  status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active',
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_category_id (category_id),
  INDEX idx_status (status),
  INDEX idx_sku (sku)
);
```

**categories 表**
```sql
CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  parent_id BIGINT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (parent_id) REFERENCES categories(id),
  INDEX idx_parent_id (parent_id)
);
```

**sales 表**
```sql
CREATE TABLE sales (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  region VARCHAR(50),
  city VARCHAR(50),
  sales_channel ENUM('online', 'offline', 'mobile', 'api') DEFAULT 'online',
  payment_method ENUM('credit_card', 'alipay', 'wechat', 'bank_transfer') DEFAULT 'credit_card',
  status ENUM('pending', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
  sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_user_id (user_id),
  INDEX idx_product_id (product_id),
  INDEX idx_sale_date (sale_date),
  INDEX idx_region (region),
  INDEX idx_status (status)
);
```

#### 3. 系统监控表

**system_metrics 表**
```sql
CREATE TABLE system_metrics (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  server_name VARCHAR(50) NOT NULL,
  cpu_usage DECIMAL(5,2) NOT NULL,
  memory_usage DECIMAL(5,2) NOT NULL,
  disk_usage DECIMAL(5,2) NOT NULL,
  network_in_mbps DECIMAL(10,2) DEFAULT 0,
  network_out_mbps DECIMAL(10,2) DEFAULT 0,
  active_connections INT DEFAULT 0,
  response_time_ms INT DEFAULT 0,
  error_rate DECIMAL(5,4) DEFAULT 0,
  requests_per_second INT DEFAULT 0,
  status ENUM('healthy', 'warning', 'critical') DEFAULT 'healthy',
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_server_name (server_name),
  INDEX idx_recorded_at (recorded_at),
  INDEX idx_status (status)
);
```

**application_logs 表**
```sql
CREATE TABLE application_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  level ENUM('debug', 'info', 'warn', 'error', 'fatal') NOT NULL,
  message TEXT NOT NULL,
  context JSON,
  user_id BIGINT NULL,
  request_id VARCHAR(50),
  ip_address VARCHAR(45),
  user_agent TEXT,
  url VARCHAR(255),
  method VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_level (level),
  INDEX idx_created_at (created_at),
  INDEX idx_user_id (user_id),
  INDEX idx_request_id (request_id)
);
```

#### 4. 报表和设置表

**reports 表**
```sql
CREATE TABLE reports (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('sales', 'users', 'performance', 'custom') NOT NULL,
  description TEXT,
  config JSON NOT NULL,
  status ENUM('generating', 'completed', 'failed') DEFAULT 'generating',
  file_path VARCHAR(255),
  file_size BIGINT DEFAULT 0,
  generated_by BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  
  FOREIGN KEY (generated_by) REFERENCES users(id),
  INDEX idx_generated_by (generated_by),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

**system_settings 表**
```sql
CREATE TABLE system_settings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  key_name VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
  category VARCHAR(50) DEFAULT 'general',
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_key_name (key_name),
  INDEX idx_category (category)
);
```

### 推荐技术栈

**核心框架**:
- **Node.js**: >= 18.0.0
- **Express.js**: 4.18+
- **MySQL**: 8.0+ / PostgreSQL 14+
- **Redis**: 7.0+ (缓存和会话)

**重要依赖包**:
- **认证**: jsonwebtoken, bcryptjs, passport
- **数据库**: mysql2 / pg, sequelize / prisma
- **验证**: joi, express-validator
- **安全**: helmet, cors, rate-limiter
- **日志**: winston, morgan
- **测试**: jest, supertest
- **工具**: lodash, moment, nodemailer

**开发工具**:
- **代码质量**: eslint, prettier
- **API文档**: swagger-ui-express
- **进程管理**: pm2
- **容器化**: Docker, docker-compose

## 🎨 设计系统

项目采用统一的设计系统，所有颜色、字体、间距都通过 CSS 变量定义在 `src/index.css` 中。

### 主要设计令牌
- **主色调**: `--primary` (品牌主色)
- **辅助色**: `--secondary` (辅助色彩)
- **成功色**: `--success` (成功状态)
- **警告色**: `--warning` (警告状态)
- **错误色**: `--destructive` (错误状态)

### 组件变体
所有 UI 组件都支持多种变体，通过 `variant` 属性切换样式。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- 项目地址: [GitHub Repository](https://github.com/yourusername/your-repo)
- 在线演示: [Demo Link](https://your-demo-link.com)
- 问题反馈: [Issues](https://github.com/yourusername/your-repo/issues)

---

## 🔄 版本历史

### v1.0.0 (2024-01-XX)
- ✨ 初始版本发布
- 🎨 完整的仪表板功能
- 📊 8个核心功能模块
- 🎯 响应式设计支持
- 🔧 完整的组件库
