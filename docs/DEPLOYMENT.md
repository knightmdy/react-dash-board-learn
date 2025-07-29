# 部署指南

## GitHub Pages 部署步骤

### 1. 准备仓库
```bash
# 克隆项目
git clone https://github.com/yourusername/viz-dash-studio.git
cd viz-dash-studio

# 安装依赖
npm install
```

### 2. 配置GitHub仓库
1. 进入GitHub仓库设置
2. 找到 "Pages" 选项
3. Source 选择 "GitHub Actions"

### 3. 配置环境变量
在仓库的 Settings > Secrets and variables > Actions 中添加：
- `VITE_API_BASE_URL`: API基础URL
- 其他必要的环境变量

### 4. 部署
推送代码到main分支即可自动触发部署：
```bash
git add .
git commit -m "feat: 完善项目配置"
git push origin main
```

### 5. 访问网站
部署完成后，访问：`https://yourusername.github.io/viz-dash-studio/`

## 本地预览生产版本
```bash
npm run build:prod
npm run preview
```

## 故障排除

### 常见问题
1. **路由404问题**: 确保配置了正确的base路径
2. **资源加载失败**: 检查vite.config.ts中的base配置
3. **API请求失败**: 确认环境变量配置正确

### 调试步骤
1. 检查GitHub Actions日志
2. 验证构建产物
3. 测试本地预览版本