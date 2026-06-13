# PF-Player CSS 样式文件组织说明

## 📁 文件结构

```
styles/
├── main.css          # 主样式文件（所有样式合并）
├── extract-css.py    # CSS提取脚本
├── clean-css.py      # CSS格式清理脚本
└── remove-inline-css.py  # 删除内联CSS脚本
```

## 🎨 main.css 内容概览

### 1. 基础重置样式 (0-10行)
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
```

### 2. 页面和导航样式
- 页面容器 `.page-container`
- 页面通用样式 `.page`
- 页面头部 `.page-header`
- 页面内容 `.page-content`

### 3. 底部悬浮台样式
- 底部一体式悬浮台 `.bottom-dock`
- 底部常驻播放栏 `.bottom-player`
- 左侧信息区 `.mini-left`
- 右侧控制区 `.mini-right`

### 4. 音乐播放器核心样式
- 播放器容器 `.music-player`
- 磁带盒样式 `.cassette-box`
- 专辑封面 `.album-cover`
- 唱片转动效果 `.disc-rotate`
- 齿轮动画 `.gear-rotate`

### 5. 歌词显示样式
- 歌词容器 `.lyrics-container`
- 歌词行 `.lyrics-line`
- 歌词页全屏 `.lyrics-full-page`
- 歌词滚动容器 `.lyrics-scroll-*`

### 6. 播放控制栏样式
- 控制栏 `.control-bar`
- 播放按钮 `.control-btn`
- 播放/暂停按钮 `.play-pause-btn`
- 进度条 `.progress-bar`
- 音量控制 `.volume-control`

### 7. 播放列表样式
- 播放列表面板 `.playlist-panel`
- 播放列表项 `.playlist-item`
- 播放列表Tab `.playlist-tab`

### 8. 滑动页面样式
- 滑动容器 `.slide-container`
- 滑动页面 `.slide-page`
- 滑动指示器 `.slide-indicator`

### 9. 模态框样式
- 模态框容器 `.player-modal-content`
- 背景设置 `.bg-setting-*`
- 评论模态框 `.comment-modal`

### 10. 响应式样式
- 移动端适配
- 平板适配
- 桌面端适配

## 🔧 CSS 最佳实践

### 1. 命名规范
- 使用BEM命名法：`block__element--modifier`
- 示例：`.playlist-item__title--active`

### 2. 颜色变量
建议在未来的版本中提取颜色变量：
```css
:root {
  --color-primary: #d9ceb2;
  --color-bg: #1f6156;
  --color-text: #e8e0d0;
}
```

### 3. 媒体查询
```css
@media (max-width: 768px) { /* 平板 */ }
@media (max-width: 480px) { /* 手机 */ }
```

## 📦 未来优化计划

### v4.2.0
- [ ] 拆分为多个CSS文件（components, layouts, utilities等）
- [ ] 添加CSS变量系统
- [ ] 优化CSS选择器性能

### v4.3.0
- [ ] 添加CSS预处理器（SCSS/Less）
- [ ] 建立完整的颜色系统
- [ ] 优化动画性能

### v4.4.0
- [ ] 添加暗黑模式支持
- [ ] 实现主题切换功能
- [ ] 优化CSS代码组织

## 🛠️ 维护说明

### 如何重新提取CSS
如果需要重新从HTML中提取CSS，运行：
```bash
python3 styles/extract-css.py
```

### 如何清理CSS格式
```bash
python3 styles/clean-css.py
```

### 如何删除内联CSS
```bash
python3 styles/remove-inline-css.py
```

## ⚠️ 注意事项

1. **不要手动修改main.css** - 所有修改都会被下次提取覆盖
2. **修改HTML中的内联style** - 确保保持与main.css同步
3. **定期运行提取脚本** - 保持CSS文件最新

## 📝 版本历史

- **v4.1.5** (2026-06-06) - 初始CSS分离
- 提取了2个style标签
- 总计52,536字符
- 约1,200+ CSS规则

---

*最后更新：2026-06-06*
