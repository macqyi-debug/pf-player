# PF-Player 性能监控说明

## 📋 概述

PF-Player v4.1.5 引入了完整的性能监控模块，提供页面加载、资源加载、函数执行、动画性能、内存使用和网络请求的全面监控。

## 🚀 快速开始

### 1. 初始化性能监控

在应用启动时初始化：

```javascript
// 在 player.js 或 app.js 中
window.addEventListener('load', () => {
    // 记录页面加载时间
    PerformanceMonitor.recordPageLoad();
    
    // 启动FPS监控（可选）
    PerformanceMonitor.startFPSMonitor((fpsData) => {
        console.log('FPS:', fpsData);
    });
    
    // 启动内存监控（可选）
    PerformanceMonitor.startMemoryMonitor((memoryData) => {
        if (memoryData.percentage > 80) {
            console.warn('内存使用率过高:', memoryData.percentage);
        }
    });
    
    // 监控网络请求（可选）
    PerformanceMonitor.monitorNetwork();
});
```

### 2. 生成性能报告

```javascript
// 在控制台查看完整报告
PerformanceMonitor.printReport();

// 获取JSON格式的报告
const report = PerformanceMonitor.generateReport();
console.log(report);
```

## 📊 监控指标

### 1. 页面加载性能

```javascript
// 记录页面加载时间
PerformanceMonitor.recordPageLoad();

// 访问加载指标
console.log(PerformanceMonitor.metrics.pageLoad);
```

**指标说明：**
- `dns`: DNS解析时间 (ms)
- `tcp`: TCP连接时间 (ms)
- `ssl`: SSL连接时间 (ms)
- `request`: 请求时间 (ms)
- `response`: 响应时间 (ms)
- `domParse`: DOM解析时间 (ms)
- `domReady`: DOM就绪时间 (ms)
- `load`: 完全加载时间 (ms)
- `firstPaint`: 首次渲染时间 (ms)
- `firstContentfulPaint`: 首次内容渲染时间 (ms)

### 2. 函数执行性能

#### 手动计时

```javascript
// 开始计时
PerformanceMonitor.startMeasure('myFunction');

// 执行函数
myFunction();

// 结束计时
const duration = PerformanceMonitor.endMeasure('myFunction');
console.log(`函数执行时间: ${duration}ms`);
```

#### 自动测量（装饰器模式）

```javascript
// 同步函数
const measuredFunction = PerformanceMonitor.measure('myFunction', (arg1, arg2) => {
    // 你的函数逻辑
    return arg1 + arg2;
});

// 使用
const result = measuredFunction(1, 2);
```

#### 异步函数

```javascript
// 异步函数
const measuredAsyncFunction = PerformanceMonitor.measureAsync('fetchData', async () => {
    const response = await fetch('/api/data');
    return response.json();
});

// 使用
const data = await measuredAsyncFunction();
```

**自动统计：**
- `count`: 调用次数
- `total`: 总执行时间 (ms)
- `min`: 最短执行时间 (ms)
- `max`: 最长执行时间 (ms)
- `avg`: 平均执行时间 (ms)
- `recent`: 最近10次执行时间 (ms)

### 3. 动画性能

#### FPS监控

```javascript
// 开始FPS监控
PerformanceMonitor.startFPSMonitor((fpsData) => {
    console.log(`FPS: ${fpsData.current.toFixed(1)}`);
    console.log(`平均: ${fpsData.average.toFixed(1)}`);
    console.log(`最低: ${fpsData.min.toFixed(1)}`);
});

// 停止监控
PerformanceMonitor.stopFPSMonitor();
```

**FPS数据：**
- `current`: 当前FPS
- `average`: 平均FPS
- `min`: 最低FPS
- `max`: 最高FPS

#### 动画帧率测量

```javascript
function animate(timestamp) {
    const measureFrame = PerformanceMonitor.measureAnimationFrame('animation', () => {
        // 动画更新逻辑
        updateAnimation();
    });
    
    measureFrame(timestamp);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

**卡顿检测：**
- 如果帧时间超过16.67ms（60fps），自动记录卡顿
- 记录卡顿次数、持续时间和超过阈值的时间

### 4. 内存监控

```javascript
// 手动记录内存使用
PerformanceMonitor.recordMemory();
console.log(PerformanceMonitor.metrics.memory);

// 自动定期监控
PerformanceMonitor.startMemoryMonitor((memoryData) => {
    console.log(`内存使用: ${(memoryData.used / 1024 / 1024).toFixed(2)} MB`);
    console.log(`内存占比: ${memoryData.percentage.toFixed(1)}%`);
});

// 停止监控
PerformanceMonitor.stopMemoryMonitor();
```

**内存数据：**
- `used`: 已使用内存 (bytes)
- `total`: 总内存 (bytes)
- `limit`: 内存限制 (bytes)
- `percentage`: 内存使用率 (%)

### 5. 网络请求监控

```javascript
// 启用网络请求监控
PerformanceMonitor.monitorNetwork();

// 之后的所有fetch请求都会自动被监控
fetch('/api/songs')
    .then(res => res.json())
    .then(data => console.log(data));

// 查看网络请求数据
console.log(PerformanceMonitor.metrics.network);
```

**请求数据：**
- `duration`: 请求耗时 (ms)
- `status`: HTTP状态码
- `ok`: 是否成功
- `type`: 响应类型
- `timestamp`: 请求时间

## 🎨 性能报告

### 生成报告

```javascript
const report = PerformanceMonitor.generateReport();
```

**报告结构：**
```javascript
{
    timestamp: '2026-06-06T10:00:00.000Z',
    pageLoad: { /* 页面加载指标 */ },
    resourceLoad: { /* 资源加载指标 */ },
    functionExecution: { /* 函数执行统计 */ },
    animation: { /* 动画性能数据 */ },
    memory: { /* 内存使用数据 */ },
    network: { /* 网络请求数据 */ },
    summary: {
        performanceScore: 85, // 性能评分 (0-100)
        issues: [ // 发现的问题
            {
                type: 'slow_page_load',
                message: '页面加载时间过长: 3500ms',
                severity: 'high'
            }
        ]
    }
}
```

### 打印到控制台

```javascript
PerformanceMonitor.printReport();
```

**输出示例：**
```
📊 PF-Player Performance Report
├─ 页面加载
│  └─ load: 2500ms
├─ 函数执行统计
│  └─ showLyrics: avg: 15ms
├─ 动画性能
│  └─ FPS: 58.5
├─ 内存使用
│  └─ percentage: 45%
└─ 性能评分
   └─ 85/100
   └─ 问题:
      └─ [medium] 平均帧率过低: 58.5fps
```

## 📈 性能优化建议

### 1. 识别慢函数

```javascript
// 查找执行时间超过100ms的函数
Object.entries(PerformanceMonitor.metrics.functionExecution)
    .filter(([name, stats]) => stats.avg > 100)
    .forEach(([name, stats]) => {
        console.log(`${name}: ${stats.avg.toFixed(2)}ms`);
    });
```

### 2. 优化动画性能

```javascript
// 检查卡顿
if (PerformanceMonitor.metrics.animation.jank) {
    console.log('卡顿次数:', PerformanceMonitor.metrics.animation.jank.length);
}
```

### 3. 监控内存泄漏

```javascript
// 定期检查内存增长
PerformanceMonitor.startMemoryMonitor((memory) => {
    if (memory.percentage > 80) {
        console.warn('⚠️ 内存使用率过高，建议检查内存泄漏');
    }
});
```

### 4. 分析加载性能

```javascript
// 检查关键指标
const { pageLoad } = PerformanceMonitor.metrics;

if (pageLoad.firstContentfulPaint > 2000) {
    console.warn('⚠️ 首次内容渲染时间过长，建议优化');
}

if (pageLoad.load > 3000) {
    console.warn('⚠️ 页面加载时间过长，建议优化');
}
```

## 🔧 集成到现有代码

### 1. 在播放器中监控歌词更新

```javascript
// 原来的代码
function showLyrics() {
    // 歌词显示逻辑
}

// 优化后
const monitoredShowLyrics = PerformanceMonitor.measure('showLyrics', () => {
    // 歌词显示逻辑
});

// 或者使用装饰器
function showLyrics() {
    PerformanceMonitor.startMeasure('showLyrics');
    
    try {
        // 歌词显示逻辑
    } finally {
        PerformanceMonitor.endMeasure('showLyrics');
    }
}
```

### 2. 在播放控制中监控

```javascript
function togglePlay() {
    PerformanceMonitor.startMeasure('togglePlay');
    
    try {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    } finally {
        PerformanceMonitor.endMeasure('togglePlay');
    }
}
```

### 3. 在数据加载中监控

```javascript
async function loadPlaylist() {
    return PerformanceMonitor.measureAsync('loadPlaylist', async () => {
        const response = await fetch('/api/playlist');
        const data = await response.json();
        return data;
    });
}
```

## 📊 性能基准

### 推荐阈值

| 指标 | 优秀 | 良好 | 需优化 |
|------|------|------|--------|
| 页面加载 | < 1s | 1-3s | > 3s |
| 首次渲染 | < 1s | 1-2s | > 2s |
| FPS | 60 | 50-60 | < 50 |
| 内存使用 | < 50% | 50-80% | > 80% |
| 函数执行 | < 16ms | 16-100ms | > 100ms |

### 性能评分

- **90-100**: 优秀
- **70-89**: 良好
- **50-69**: 需优化
- **< 50**: 严重问题

## 🛠️ 调试工具

### 在控制台查看实时FPS

```javascript
PerformanceMonitor.startFPSMonitor((fps) => {
    console.clear();
    console.log(`FPS: ${fps.average.toFixed(1)}`);
});
```

### 生成性能快照

```javascript
// 在关键操作前后记录性能
PerformanceMonitor.recordMemory();
PerformanceMonitor.startMeasure('criticalOperation');

// 执行关键操作
criticalOperation();

PerformanceMonitor.endMeasure('criticalOperation');
PerformanceMonitor.recordMemory();

// 查看变化
console.log(PerformanceMonitor.metrics.memory);
console.log(PerformanceMonitor.metrics.functionExecution.criticalOperation);
```

## 📝 版本历史

- **v4.1.5** (2026-06-06) - 初始性能监控模块
  - ✅ 页面加载性能监控
  - ✅ 资源加载性能监控
  - ✅ 函数执行性能监控
  - ✅ 动画性能监控（FPS）
  - ✅ 内存使用监控
  - ✅ 网络请求监控
  - ✅ 性能报告生成

---

*最后更新：2026-06-06*
