# 扩展图标

此Chrome扩展支持以下图标尺寸：
- icon16.png (16x16) - 扩展管理页面
- icon48.png (48x48) - 扩展管理页面
- icon128.png (128x128) - Chrome Web Store

## 创建图标

你可以使用以下方式创建图标：

1. **在线图标生成器**：访问 https://www.iconfinder.com/ 或 https://www.flaticon.com/
2. **使用设计工具**：
   - Figma (https://www.figma.com/)
   - Adobe XD
   - Sketch
3. **使用图片编辑软件**：
   - Photoshop
   - GIMP (免费)
   - Paint.NET (免费)

## 图标设计建议

- 使用简洁的设计，在小尺寸下也能清晰可见
- 建议使用与代码/复制相关的图标元素，如：
  - 剪贴板
  - 复制符号
  - 代码块
  - `{}` 符号
- 背景色建议使用蓝色或灰色系

## 测试无图标

扩展可以在没有图标的情况下正常工作。如果在开发阶段没有图标，Chrome会使用默认图标。

## 快速方案

如果需要立即使用，可以在 manifest.json 中临时移除 icons 配置：

```json
// 临时移除这部分
// "icons": {
//   "16": "icons/icon16.png",
//   "48": "icons/icon48.png",
//   "128": "icons/icon128.png"
// }
```
