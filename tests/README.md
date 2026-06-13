# PF-Player 测试指南

## 📦 测试框架

本项目使用 **Jest** 作为测试框架，配合 **jsdom** 模拟浏览器环境。

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 运行所有测试
```bash
npm test
```

### 运行测试并监视文件变化
```bash
npm run test:watch
```

### 生成覆盖率报告
```bash
npm run test:coverage
```

## 📝 测试文件结构

```
tests/
├── player.core.test.js      # 播放器核心功能测试
├── lyrics.sync.test.js      # 歌词同步功能测试
└── ui.interaction.test.js   # UI交互功能测试
```

## 🎯 测试覆盖范围

### 1. 播放器核心功能 (player.core.test.js)
- ✅ 播放状态管理
- ✅ 音频控制
- ✅ 进度更新
- ✅ 播放列表管理
- ✅ 最近播放记录

### 2. 歌词同步功能 (lyrics.sync.test.js)
- ✅ 歌词索引计算
- ✅ 歌词进度计算
- ✅ 歌词文本处理
- ✅ 歌词高亮状态
- ✅ 歌词滚动位置

### 3. UI交互功能 (ui.interaction.test.js)
- ✅ 播放列表面板
- ✅ 播放/暂停按钮
- ✅ 歌词显示
- ✅ 页面切换
- ✅ 模态框
- ✅ 悬浮播放器

## 📊 覆盖率目标

当前覆盖率阈值：
- 分支覆盖率: 30%
- 函数覆盖率: 30%
- 行覆盖率: 30%
- 语句覆盖率: 30%

## 🔧 编写新测试

### 基本测试结构
```javascript
describe('功能模块', () => {
    beforeEach(() => {
        // 每个测试前执行的代码
    });

    test('测试用例描述', () => {
        // 测试逻辑
        expect(actual).toBe(expected);
    });
});
```

### 示例：测试播放状态
```javascript
describe('播放状态', () => {
    test('初始状态应为暂停', () => {
        expect(isPlaying).toBe(false);
    });

    test('点击播放后状态应为播放', () => {
        play();
        expect(isPlaying).toBe(true);
    });
});
```

## 🐛 调试测试

### 查看详细输出
```bash
npm test -- --verbose
```

### 只运行特定测试文件
```bash
npm test -- player.core.test.js
```

### 只运行匹配的测试
```bash
npm test -- --testNamePattern="歌词"
```

## 📈 查看覆盖率报告

运行覆盖率测试后，报告将生成在 `coverage/` 目录：

- 文本报告：`coverage/coverage.txt`
- HTML报告：`coverage/lcov-report/index.html`
- LCOV格式：`coverage/lcov.info`

打开HTML报告查看详细覆盖情况：
```bash
open coverage/lcov-report/index.html
```

## 🎨 测试最佳实践

### 1. AAA模式
```javascript
test('示例测试', () => {
    // Arrange - 准备
    const input = 5;
    
    // Act - 执行
    const result = double(input);
    
    // Assert - 断言
    expect(result).toBe(10);
});
```

### 2. 清晰的测试名称
```javascript
// ✅ 好的
test('播放列表应能添加新歌曲', () => {});

// ❌ 不好的
test('test1', () => {});
```

### 3. 单一职责
```javascript
// ✅ 好的 - 每个测试只测一个功能
test('应能添加歌曲到播放列表', () => {});
test('应能从播放列表移除歌曲', () => {});

// ❌ 不好的 - 一个测试测多个功能
test('应能添加和移除歌曲', () => {});
```

### 4. 使用Mock避免依赖
```javascript
test('播放列表更新时应通知UI', () => {
    const updateUI = jest.fn();
    playlist.onUpdate(updateUI);
    playlist.add(song);
    expect(updateUI).toHaveBeenCalled();
});
```

## 🔄 持续集成

测试可在CI/CD流程中自动运行：

```yaml
# .github/workflows/test.yml 示例
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Upload coverage
        uses: codecov/codecov-action@v1
```

## 📚 更多资源

- [Jest 官方文档](https://jestjs.io/docs/getting-started)
- [Jest expect API](https://jestjs.io/docs/expect)
- [Jest 模拟函数](https://jestjs.io/docs/mock-functions)

---

*最后更新：2026-06-06*
