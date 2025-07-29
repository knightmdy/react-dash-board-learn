# API 接口文档

## 📋 接口概述

本文档描述了数据分析仪表板系统的 RESTful API 接口规范，为后端开发提供详细的接口定义。

## 🔐 认证授权

### 认证方式
使用 JWT Bearer Token 进行身份验证。

```http
Authorization: Bearer <your_jwt_token>
```

### 获取访问令牌
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
}
```

## 📊 仪表板接口

### 获取仪表板概览数据
```http
GET /api/v1/dashboard/overview
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "totalUsers": 2420,
    "totalRevenue": 125600.50,
    "totalOrders": 892,
    "conversionRate": 3.24,
    "trends": [
      {
        "date": "2024-01-01",
        "users": 145,
        "revenue": 5200.00,
        "orders": 28
      }
    ],
    "topMetrics": {
      "dailyActiveUsers": 1250,
      "monthlyRecurringRevenue": 45000,
      "customerLifetimeValue": 520.30
    }
  }
}
```

### 获取实时统计数据
```http
GET /api/v1/dashboard/realtime
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "onlineUsers": 245,
    "activeConnections": 512,
    "requestsPerMinute": 1250,
    "errorRate": 0.02,
    "systemHealth": "healthy",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

## 💰 销售数据接口

### 获取销售分析数据
```http
GET /api/v1/sales/analytics
Authorization: Bearer <token>

Query Parameters:
- period: 7d|30d|90d|custom (默认: 30d)
- startDate: YYYY-MM-DD (period=custom时必须)
- endDate: YYYY-MM-DD (period=custom时必须)
- category: string (可选，产品分类筛选)
```

**响应**:
```json
{
  "success": true,
  "data": {
    "totalSales": 125600.50,
    "salesGrowth": 12.5,
    "orderCount": 892,
    "averageOrderValue": 140.81,
    "salesChart": [
      {
        "date": "2024-01-01",
        "sales": 5200.00,
        "orders": 28,
        "averageValue": 185.71
      }
    ],
    "topProducts": [
      {
        "id": 1,
        "name": "产品A",
        "sales": 25600.00,
        "quantity": 128,
        "growth": 15.2
      }
    ],
    "salesByCategory": [
      {
        "category": "电子产品",
        "sales": 65000.00,
        "percentage": 51.8
      }
    ],
    "salesByRegion": [
      {
        "region": "华东",
        "sales": 45000.00,
        "orders": 320,
        "growth": 8.5
      }
    ]
  }
}
```

### 获取产品销售排行
```http
GET /api/v1/sales/products/top
Authorization: Bearer <token>

Query Parameters:
- limit: number (默认: 10)
- period: 7d|30d|90d (默认: 30d)
- sortBy: sales|quantity|growth (默认: sales)
```

**响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "产品A",
      "sales": 25600.00,
      "quantity": 128,
      "growth": 15.2,
      "category": "电子产品",
      "image": "https://example.com/product-a.jpg"
    }
  ]
}
```

## 👥 用户数据接口

### 获取用户分析数据
```http
GET /api/v1/users/analytics
Authorization: Bearer <token>

Query Parameters:
- period: 7d|30d|90d (默认: 30d)
- segment: all|new|active|inactive (默认: all)
```

**响应**:
```json
{
  "success": true,
  "data": {
    "totalUsers": 2420,
    "activeUsers": 1850,
    "newUsers": 125,
    "userGrowthRate": 8.5,
    "userGrowthChart": [
      {
        "date": "2024-01-01",
        "totalUsers": 2295,
        "newUsers": 15,
        "activeUsers": 1750
      }
    ],
    "userDistribution": [
      {
        "region": "华东",
        "count": 980,
        "percentage": 40.5
      }
    ],
    "userBehavior": {
      "averageSessionDuration": 450,
      "averagePageViews": 5.2,
      "bounceRate": 35.8
    },
    "userRetention": [
      {
        "cohort": "2024-01",
        "day1": 85.5,
        "day7": 45.2,
        "day30": 23.8
      }
    ]
  }
}
```

### 获取用户详细信息
```http
GET /api/v1/users/{userId}
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "user123",
    "email": "user@example.com",
    "profile": {
      "firstName": "张",
      "lastName": "三",
      "avatar": "https://example.com/avatar.jpg",
      "phone": "+86-138-0000-0000"
    },
    "statistics": {
      "totalOrders": 15,
      "totalSpent": 2850.00,
      "lastLoginAt": "2024-01-15T09:30:00Z",
      "registeredAt": "2023-06-15T14:20:00Z"
    },
    "preferences": {
      "language": "zh-CN",
      "timezone": "Asia/Shanghai",
      "notifications": true
    }
  }
}
```

## 📈 图表数据接口

### 获取收入趋势图表
```http
GET /api/v1/charts/revenue
Authorization: Bearer <token>

Query Parameters:
- period: 7d|30d|90d|6m|1y (默认: 30d)
- granularity: hour|day|week|month (默认: day)
```

**响应**:
```json
{
  "success": true,
  "data": {
    "chartData": [
      {
        "date": "2024-01-01",
        "revenue": 5200.00,
        "target": 5000.00,
        "lastYear": 4800.00
      }
    ],
    "summary": {
      "totalRevenue": 125600.50,
      "averageDaily": 4186.68,
      "growth": 12.5,
      "targetAchievement": 105.2
    }
  }
}
```

### 获取用户分布图表
```http
GET /api/v1/charts/user-distribution
Authorization: Bearer <token>

Query Parameters:
- type: region|age|device|source (默认: region)
```

**响应**:
```json
{
  "success": true,
  "data": [
    {
      "name": "华东",
      "value": 980,
      "percentage": 40.5,
      "color": "#8884d8"
    },
    {
      "name": "华南",
      "value": 650,
      "percentage": 26.9,
      "color": "#82ca9d"
    }
  ]
}
```

## 🌍 地理数据接口

### 获取地理分布数据
```http
GET /api/v1/geographic/distribution
Authorization: Bearer <token>

Query Parameters:
- metric: users|sales|orders (默认: users)
- level: country|province|city (默认: province)
```

**响应**:
```json
{
  "success": true,
  "data": [
    {
      "code": "31",
      "name": "上海市",
      "value": 1250,
      "coordinates": [121.4737, 31.2304],
      "growth": 8.5
    }
  ]
}
```

## ⚡ 实时监控接口

### 获取系统状态
```http
GET /api/v1/monitoring/system
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 2592000,
    "version": "1.0.0",
    "metrics": {
      "cpuUsage": 45.2,
      "memoryUsage": 62.8,
      "diskUsage": 35.1,
      "networkIO": {
        "inbound": 1250000,
        "outbound": 850000
      }
    },
    "services": [
      {
        "name": "database",
        "status": "healthy",
        "responseTime": 12,
        "lastCheck": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 获取性能指标
```http
GET /api/v1/monitoring/performance
Authorization: Bearer <token>

Query Parameters:
- period: 1h|6h|24h|7d (默认: 1h)
- metrics: cpu,memory,network,requests (默认: all)
```

**响应**:
```json
{
  "success": true,
  "data": {
    "timeline": [
      {
        "timestamp": "2024-01-15T10:00:00Z",
        "cpu": 45.2,
        "memory": 62.8,
        "requests": 1250,
        "responseTime": 150
      }
    ],
    "averages": {
      "cpu": 42.5,
      "memory": 58.2,
      "responseTime": 145
    },
    "peaks": {
      "maxCpu": 78.5,
      "maxMemory": 82.1,
      "maxResponseTime": 850
    }
  }
}
```

## 📊 报表接口

### 生成报表
```http
POST /api/v1/reports/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "sales|users|performance",
  "period": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "format": "pdf|excel|csv",
  "filters": {
    "region": ["华东", "华南"],
    "category": ["电子产品"]
  }
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "reportId": "rpt_123456789",
    "status": "generating",
    "estimatedTime": 120,
    "downloadUrl": null
  }
}
```

### 获取报表状态
```http
GET /api/v1/reports/{reportId}/status
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "reportId": "rpt_123456789",
    "status": "completed",
    "downloadUrl": "https://api.example.com/reports/rpt_123456789/download",
    "fileSize": 2048576,
    "createdAt": "2024-01-15T10:30:00Z",
    "expiresAt": "2024-01-22T10:30:00Z"
  }
}
```

## ⚙️ 设置接口

### 获取系统设置
```http
GET /api/v1/settings
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "general": {
      "siteName": "数据分析平台",
      "timezone": "Asia/Shanghai",
      "language": "zh-CN",
      "dateFormat": "YYYY-MM-DD"
    },
    "features": {
      "realtimeMonitoring": true,
      "dataExport": true,
      "advancedCharts": true
    },
    "notifications": {
      "email": true,
      "push": false,
      "sms": true
    }
  }
}
```

### 更新系统设置
```http
PUT /api/v1/settings
Authorization: Bearer <token>
Content-Type: application/json

{
  "general": {
    "siteName": "新的平台名称",
    "timezone": "Asia/Shanghai"
  },
  "notifications": {
    "email": false
  }
}
```

## 🚨 错误处理

### 错误响应格式
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      {
        "field": "period",
        "message": "period 必须是有效的时间范围"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123456789"
}
```

### 常见错误码
- `400` - 请求参数错误
- `401` - 未授权访问
- `403` - 权限不足
- `404` - 资源不存在
- `429` - 请求频率限制
- `500` - 服务器内部错误

## 📝 数据模型

### 用户模型
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  profile: UserProfile;
  statistics: UserStatistics;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}
```

### 销售记录模型
```typescript
interface SaleRecord {
  id: number;
  userId: number;
  productId: number;
  amount: number;
  quantity: number;
  region: string;
  createdAt: string;
}
```

### 系统指标模型
```typescript
interface SystemMetrics {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: NetworkMetrics;
  requests: number;
  responseTime: number;
}
```

## 🔄 版本控制

API 版本通过 URL 路径进行控制：
- v1: `/api/v1/`
- v2: `/api/v2/` (未来版本)

每个版本的接口变更都会在此文档中详细记录。