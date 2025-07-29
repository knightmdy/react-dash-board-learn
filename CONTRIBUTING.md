# 贡献指南

感谢您对本项目的关注！我们欢迎各种形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- ✨ 添加新功能

## 🚀 快速开始

### 环境准备
1. Fork 本仓库
2. 克隆到本地：`git clone https://github.com/your-username/dashboard-analytics.git`
3. 安装依赖：`npm install`
4. 启动开发服务器：`npm run dev`

### 开发流程
1. 创建功能分支：`git checkout -b feature/your-feature-name`
2. 进行开发和测试
3. 提交代码：`git commit -m "feat: 添加新功能"`
4. 推送分支：`git push origin feature/your-feature-name`
5. 创建 Pull Request

## 📋 代码规范

### 命名约定
- **组件**: 使用 PascalCase (如：`UserDashboard`)
- **文件**: 组件文件使用 PascalCase，工具文件使用 camelCase
- **变量/函数**: 使用 camelCase
- **常量**: 使用 UPPER_SNAKE_CASE
- **CSS类**: 使用 kebab-case

### 代码风格
- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件 Props 必须定义 TypeScript 接口

### 提交信息规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明**:
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `test`: 添加或修改测试
- `chore`: 构建过程或辅助工具的变动

**示例**:
```
feat(dashboard): 添加用户行为分析图表

- 增加用户访问热力图
- 添加页面停留时间统计
- 优化图表响应式布局

Closes #123
```

## 🧪 测试要求

### 单元测试
- 新功能必须包含相应的单元测试
- 测试覆盖率应保持在 80% 以上
- 使用 `npm test` 运行测试

### 测试示例
```typescript
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('应该正确显示指标数据', () => {
    render(
      <MetricCard
        title="总用户数"
        value={1234}
        change={{ value: '+12%', type: 'positive' }}
      />
    );
    
    expect(screen.getByText('总用户数')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });
});
```

## 📝 文档要求

### 组件文档
每个组件都应包含：
- TypeScript 接口定义
- 使用示例
- Props 说明

```typescript
interface MetricCardProps {
  /** 指标标题 */
  title: string;
  /** 指标数值 */
  value: string | number;
  /** 变化趋势 */
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  /** 图标组件 */
  icon?: LucideIcon;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 指标卡片组件
 * 
 * @example
 * ```tsx
 * <MetricCard
 *   title="总收入"
 *   value={125600}
 *   change={{ value: '+12%', type: 'positive' }}
 *   icon={DollarSign}
 * />
 * ```
 */
export function MetricCard(props: MetricCardProps) {
  // ...
}
```

## 🐛 问题报告

### Bug 报告模板
请使用以下模板报告 Bug：

```markdown
## 问题描述
简要描述遇到的问题

## 复现步骤
1. 打开页面...
2. 点击按钮...
3. 观察到...

## 期望行为
描述预期应该发生什么

## 实际行为
描述实际发生了什么

## 环境信息
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

## 截图
如果适用，请添加截图来说明问题
```

## 💡 功能建议

### 功能请求模板
```markdown
## 功能描述
简要描述希望添加的功能

## 使用场景
描述什么情况下会使用这个功能

## 详细设计
提供详细的功能设计思路

## 替代方案
考虑过的其他解决方案

## 附加信息
其他相关信息
```

## 📋 Pull Request 指南

### PR 检查清单
提交 PR 前请确认：

- [ ] 代码遵循项目的代码规范
- [ ] 已运行所有测试并通过
- [ ] 已添加必要的测试用例
- [ ] 已更新相关文档
- [ ] 提交信息遵循规范
- [ ] 已解决所有代码审查意见

### PR 描述模板
```markdown
## 变更说明
简要描述本次 PR 的变更内容

## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他: ___________

## 测试
- [ ] 已添加单元测试
- [ ] 已手动测试功能
- [ ] 已测试兼容性

## 相关 Issue
Closes #(issue number)

## 截图
如果适用，请添加截图展示变更效果
```

## 🏷️ 版本发布

### 版本号规范
遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**: 不兼容的 API 修改
- **次版本号**: 向下兼容的功能新增
- **修订号**: 向下兼容的问题修正

### 发布流程
1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建 Git 标签
4. 发布 GitHub Release

## 🤝 社区准则

### 行为准则
- 保持友善和专业
- 尊重不同观点
- 建设性地提供反馈
- 帮助新贡献者

### 沟通渠道
- GitHub Issues: 技术问题和功能讨论
- GitHub Discussions: 一般性讨论
- Email: 私人或敏感问题

## 📞 获取帮助

如果您在贡献过程中遇到任何问题，可以：

1. 查看现有的 Issues 和 Discussions
2. 创建新的 Issue 描述您的问题
3. 联系项目维护者

感谢您的贡献！🎉