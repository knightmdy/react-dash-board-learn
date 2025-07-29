# 开发者指南

## 📋 项目概述

本项目是一个现代化的数据分析仪表板，采用 React + TypeScript + Tailwind CSS 技术栈构建。

## 🏗️ 架构设计

### 前端架构
```
Frontend (React SPA)
├── 页面路由 (React Router)
├── 状态管理 (React Query + Local State)
├── UI组件库 (shadcn/ui + 自定义组件)
├── 图表库 (Recharts)
└── 样式系统 (Tailwind CSS + CSS Variables)
```

### 数据流架构
```
API Layer → React Query Cache → Components → UI
     ↓
Mock Data (开发环境)
Real API (生产环境)
```

## 🔧 开发环境配置

### 必要工具
- Node.js 18+
- npm 9+
- VS Code (推荐)
- Git

### 推荐 VS Code 扩展
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint

### 环境变量配置
创建 `.env.local` 文件：
```bash
# API 配置
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_API_TIMEOUT=10000

# 功能开关
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_DEBUG_MODE=true

# 第三方服务
VITE_ANALYTICS_ID=your_analytics_id
```

## 📁 项目结构详解

```
src/
├── components/
│   ├── ui/                 # 基础UI组件 (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── common/             # 通用业务组件
│   │   ├── MetricCard.tsx  # 指标卡片
│   │   ├── DataCard.tsx    # 数据卡片
│   │   └── TimeRangeSelector.tsx
│   ├── charts/             # 图表组件
│   │   ├── RevenueChart.tsx
│   │   ├── SalesChart.tsx
│   │   └── ...
│   └── dashboard/          # 仪表板布局
│       ├── Sidebar.tsx
│       ├── TopBar.tsx
│       └── DashboardLayout.tsx
├── pages/                  # 页面组件
│   ├── Index.tsx          # 首页
│   ├── Sales.tsx          # 销售页面
│   └── ...
├── hooks/                  # 自定义Hook
│   ├── useTimeRange.ts    # 时间范围选择
│   ├── useDataExport.ts   # 数据导出
│   └── use-mobile.tsx     # 移动端检测
├── data/                   # 数据层
│   └── dashboardData.ts   # 模拟数据
├── lib/                    # 工具函数
│   └── utils.ts           # 通用工具
└── types/                  # TypeScript 类型定义
    ├── api.ts             # API 类型
    ├── dashboard.ts       # 仪表板类型
    └── common.ts          # 通用类型
```

## 🎨 设计系统规范

### 颜色系统
项目使用 HSL 颜色格式，所有颜色定义在 `src/index.css` 中：

```css
:root {
  /* 主色调 */
  --primary: 220 70% 50%;
  --primary-foreground: 0 0% 98%;
  
  /* 辅助色 */
  --secondary: 210 40% 95%;
  --secondary-foreground: 220 9% 46%;
  
  /* 状态色 */
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --destructive: 0 84% 60%;
}
```

### 组件变体规范
所有组件都应支持多种变体：

```typescript
// 示例：按钮组件变体
const buttonVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input",
        ghost: "hover:bg-accent",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8",
      }
    }
  }
)
```

## 🔀 Git 工作流

### 分支策略
- `main`: 主分支，用于生产环境
- `develop`: 开发分支，用于集成功能
- `feature/*`: 功能分支
- `hotfix/*`: 紧急修复分支

### 提交规范
使用 Conventional Commits 格式：

```bash
feat: 添加用户分析页面
fix: 修复图表数据显示问题
docs: 更新API文档
style: 调整按钮样式
refactor: 重构数据处理逻辑
test: 添加单元测试
chore: 更新依赖包
```

### 工作流程
1. 从 `develop` 分支创建功能分支
```bash
git checkout develop
git pull origin develop
git checkout -b feature/user-analytics
```

2. 开发完成后提交代码
```bash
git add .
git commit -m "feat: 添加用户分析功能"
git push origin feature/user-analytics
```

3. 创建 Pull Request 到 `develop` 分支

4. 代码审查通过后合并

## 🧪 测试策略

### 测试类型
- **单元测试**: 组件和函数测试
- **集成测试**: 页面和功能模块测试
- **E2E测试**: 用户场景测试

### 测试工具
- Jest: 单元测试框架
- React Testing Library: 组件测试
- Playwright: E2E测试

### 测试命令
```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- ComponentName

# 生成测试覆盖率报告
npm run test:coverage

# 运行E2E测试
npm run test:e2e
```

## 📊 性能优化

### 代码分割
```typescript
// 路由级别的代码分割
const Sales = lazy(() => import('./pages/Sales'));
const Users = lazy(() => import('./pages/Users'));

// 组件级别的代码分割
const HeavyChart = lazy(() => import('./components/charts/HeavyChart'));
```

### 图片优化
- 使用 WebP 格式
- 实现懒加载
- 响应式图片

### 缓存策略
- React Query 数据缓存
- 浏览器缓存配置
- CDN 缓存优化

## 🔌 API 集成指南

### HTTP 客户端配置
```typescript
// lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### React Query 集成
```typescript
// hooks/useUserData.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useUserData() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/users/analytics'),
    staleTime: 5 * 60 * 1000, // 5分钟
    cacheTime: 10 * 60 * 1000, // 10分钟
  });
}
```

## 🚀 部署流程

### 构建优化
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
});
```

### 环境配置
```bash
# 生产环境构建
npm run build

# 预览构建结果
npm run preview

# 分析包大小
npm run analyze
```

## 🐛 调试指南

### 开发工具
- React Developer Tools
- Redux DevTools (如果使用)
- React Query DevTools

### 日志系统
```typescript
// lib/logger.ts
export const logger = {
  debug: (message: string, data?: any) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
  },
};
```

### 错误边界
```typescript
// components/ErrorBoundary.tsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## 📚 常见问题

### Q: 如何添加新的页面？
1. 在 `src/pages/` 目录创建新组件
2. 在 `src/App.tsx` 中添加路由
3. 在侧边栏导航中添加菜单项

### Q: 如何自定义主题？
修改 `src/index.css` 中的 CSS 变量值

### Q: 如何添加新的图表类型？
1. 在 `src/components/charts/` 创建新组件
2. 使用 Recharts 库实现图表逻辑
3. 导出组件供页面使用

### Q: 如何处理 API 错误？
使用 React Query 的错误处理机制和错误边界组件

## 📖 参考资源

- [React 官方文档](https://reactjs.org/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 组件库](https://ui.shadcn.com/)
- [Recharts 图表库](https://recharts.org/)
- [React Query 文档](https://tanstack.com/query/latest)