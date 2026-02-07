# PF-Player - 复古磁带风格音乐播放器

一个基于Web的复古磁带风格音乐播放器，支持自定义背景、磁带盒风格和毛玻璃效果。

## 功能特性

- 🎵 复古磁带风格的播放界面
- 🎨 自定义背景颜色和背景图片
- 🔍 支持背景图片透明度调节
- ✨ 类似iOS 26的毛玻璃效果
- 📱 响应式设计，适配不同设备
- 📦 PWA支持，可以安装到主屏幕

## 技术栈

- HTML5
- CSS3
- JavaScript
- PWA (Progressive Web App)

## 快速开始

### 本地开发

1. 克隆仓库
2. 打开 `index.html` 文件到浏览器
3. 或使用本地服务器运行：

```bash
# 使用Python 3
python3 -m http.server 8000

# 或使用Python 2
python -m SimpleHTTPServer 8000

# 然后访问 http://localhost:8000
```

### 部署

项目可以部署到任何静态网站托管服务，如：

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 项目结构

```
PF定制版player/
├── assets/            # 静态资源
│   ├── images/        # 图片资源
│   │   ├── design/    # 设计相关图片
│   │   └── icons/     # 图标资源
│   └── versions/      # 版本历史
├── docs/              # 文档
├── js/                # JavaScript文件
│   └── player.js      # 播放器核心逻辑
├── index.html         # 主页面
├── manifest.json      # PWA配置
├── service-worker.js  # PWA服务工作线程
├── README.md          # 项目说明
└── .gitignore         # Git忽略文件
```

## 自定义设置

- **界面背景风格**：可以选择背景颜色或上传背景图片
- **磁带盒风格**：可以自定义磁带盒背景、贴纸颜色和网格颜色
- **毛玻璃效果**：可以启用或禁用毛玻璃效果

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT

## 作者

- 开发者：[Your Name]
- 项目灵感：Pink Floyd - Wish You Were Here
