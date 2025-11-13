# Code Block Copy Helper

这是一个Chrome扩展，能够自动为网页上的代码块添加复制按钮。

## 功能特点

- 🔍 自动检测页面上的代码块
- 📋 为代码块添加复制按钮
- ✅ 复制成功后有视觉反馈
- 🌙 支持深色模式
- ⚡ 支持动态加载的内容（SPA）

## 支持的网站

扩展支持大多数常见的代码块格式，包括但不限于：
- GitHub
- Stack Overflow
- MDN Web Docs
- GitLab
- 各类技术博客和文档网站

## 安装步骤

### 1. 加载扩展到Chrome

1. 打开Chrome浏览器
2. 访问 `chrome://extensions/`
3. 在右上角启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择此项目文件夹

### 2. 测试扩展

1. 访问包含代码块的网站（如GitHub）
2. 找到代码块，查看右上角是否出现"复制"按钮
3. 点击按钮，代码将被复制到剪贴板
4. 按钮会显示"已复制!"反馈

## 文件结构

```
.
├── manifest.json          # 扩展配置文件
├── content.js             # 主要内容脚本
├── styles.css             # 复制按钮样式
├── icons/
│   └── README.md          # 图标说明
├── CLAUDE.md              # 开发指南
└── README.md              # 此文件
```

## 开发说明

### 核心文件

- **content.js**: 负责检测代码块、注入复制按钮、处理复制逻辑
- **styles.css**: 定义复制按钮的样式，包括悬停、成功、错误状态
- **manifest.json**: Chrome扩展配置，定义权限和注入规则

### 代码块检测

扩展使用以下选择器检测代码块：
- `pre`, `pre code`
- `.highlight`, `.code-block`
- `[class*="code-block"]`
- 以及其他常见选择器

### 复制功能

使用现代Clipboard API实现复制功能，并提供错误处理。

## 自定义配置

### 修改按钮文字

编辑 `content.js` 中的 `createCopyButton` 函数：

```javascript
button.textContent = '复制';  // 修改为其他文字
```

### 调整样式

编辑 `styles.css` 来自定义按钮外观。

## 故障排除

### 复制按钮不显示

1. 刷新页面重试
2. 检查控制台是否有错误信息
3. 确保代码块不是太小（少于10个字符）

### 复制失败

1. 确保浏览器允许剪贴板访问
2. 检查是否在HTTPS页面（HTTP页面可能受限）
3. 查看控制台错误信息

## Web Store发布

如需发布到Chrome Web Store：

1. 准备128x128图标
2. 准备截图和宣传图
3. 访问 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
4. 上传扩展包

## 许可证

MIT License
